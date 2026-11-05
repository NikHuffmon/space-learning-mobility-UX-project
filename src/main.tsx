import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './style.css';
import { stops, type Stop } from './stories';
import About from './About';

const num = (i: number) => String(i + 1).padStart(2, '0');
const route = () => location.hash.split('?')[0].replace('#', '') || '/';
function MapView({active, select, reset}: {active:number; select:(i:number)=>void; reset:number}) {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markers = useRef<L.Marker[]>([]);
  const selectRef = useRef(select); selectRef.current = select;
  const [tileError,setTileError] = useState(false);
  useEffect(() => {
    if (!container.current) return;
    const instance = L.map(container.current, {zoomControl:false, scrollWheelZoom:true}).setView([36.167,-86.790],14);
    map.current = instance;
    L.control.zoom({position:'topright'}).addTo(instance);
    // Labels sit below the markers so they can never obscure a numbered stop.
    instance.createPane('storyLabels').style.zIndex = '590';
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom:19, attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).on('tileerror',()=>setTileError(true)).addTo(instance);
    L.polyline(stops.map(s=>s.coordinates),{color:'#a04432',weight:3,opacity:.7,dashArray:'6 9'}).addTo(instance);
    markers.current = stops.map((s,i)=>L.marker(s.coordinates,{keyboard:true,title:`Stop ${i+1}: ${s.location}`,icon:L.divIcon({className:'story-marker',html:`<span>${num(i)}</span>`,iconSize:[40,40],iconAnchor:[20,20]})}).addTo(instance).on('click',()=>selectRef.current(i)));
    const updateLabels = () => {
      // Keep the zoomed-out overview clear; reveal names on hover/focus.
      // At street level there is enough room for persistent place names.
      const permanent = instance.getZoom() >= 16;
      markers.current.forEach((marker, i) => {
        marker.unbindTooltip();
        marker.bindTooltip(`${num(i)} · ${stops[i].location}`, {
          permanent, direction:'top', offset:[0,-22], className:'map-label',
          pane:'storyLabels', interactive:false
        });
      });
    };
    instance.on('zoomstart',()=>markers.current.forEach(marker=>marker.closeTooltip()));
    instance.on('zoomend',updateLabels);
    updateLabels();
    const observer = new ResizeObserver(()=>instance.invalidateSize()); observer.observe(container.current);
    return ()=>{observer.disconnect();instance.remove();map.current=null;markers.current=[];};
  },[]);
  useEffect(()=>{
    markers.current.forEach((marker,i)=>{marker.getElement()?.classList.toggle('selected',i===active);marker.setZIndexOffset(i===active?1000:0);});
    map.current?.flyTo(stops[active].coordinates,14,{duration:window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:.8});
  },[active]);
  useEffect(()=>{map.current?.fitBounds(L.latLngBounds(stops.map(s=>s.coordinates)).pad(.3));},[reset]);
  return <><div className="map" ref={container} aria-label="Draggable map of Nashville with four sample story locations"/>{tileError && <div className="map-warning">Map background unavailable. Story stops still work; check your internet connection.</div>}</>;
}
function Carousel({stop}: {stop:Stop}) {
  const [index,setIndex] = useState(0);
  const [playing,setPlaying] = useState(false);
  const [hovered,setHovered] = useState(false);
  const [focused,setFocused] = useState(false);
  useEffect(()=>{setIndex(0);setPlaying(!matchMedia('(prefers-reduced-motion: reduce)').matches);},[stop.id]);
  useEffect(()=>{
    if (!playing || hovered || focused || stop.photos.length<2) return;
    const timer = window.setInterval(()=>setIndex(i=>(i+1)%stop.photos.length),6000);
    return ()=>clearInterval(timer);
  },[playing,hovered,focused,stop.photos.length]);
  const photo = stop.photos[index];
  return <div className="carousel" onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} onFocusCapture={()=>setFocused(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node))setFocused(false);}} aria-label={`Photos for ${stop.location}`}>
    <img src={photo.src} alt={photo.alt}/><span className="placeholder-tag">ILLUSTRATIVE PLACEHOLDER</span>
    <div className="photo-bar"><button aria-label="Previous photo" onClick={()=>setIndex(i=>(i-1+stop.photos.length)%stop.photos.length)}>←</button><span>{index+1} / {stop.photos.length}</span><button aria-label={playing?'Pause photo slideshow':'Play photo slideshow'} onClick={()=>setPlaying(p=>!p)}>{playing?'Pause':'Play'}</button><button aria-label="Next photo" onClick={()=>setIndex(i=>(i+1)%stop.photos.length)}>→</button></div>
    <p className="caption">{photo.caption}</p>
  </div>;
}
function Explore() {
  const initial = stops.findIndex(s=>s.id===new URLSearchParams(location.hash.split('?')[1]).get('stop'));
  const [active,setActive] = useState(initial<0?0:initial);
  const [reset,setReset] = useState(0);
  const [tab,setTab] = useState('story');
  const select = (i:number)=>{setActive(i);history.replaceState(null,'',`#/explore?stop=${stops[i].id}`);};
  const stop=stops[active];
  return <main id="main" className="explorer"><div className="map-shell"><MapView active={active} select={select} reset={reset}/><div className="map-intro"><span className="eyebrow">CHAPTER 01</span><h1>The Nashville movement</h1><p>Four places. A story taking shape.</p></div><button className="reset" onClick={()=>setReset(n=>n+1)}>↗ View all stops</button><div className="map-note">Drag to explore · scroll or use + / − to zoom<br/>Hover or focus a stop for its name · dashed line = story sequence</div></div>
    <section className="story-panel" aria-label="Selected story stop"><div className="story-heading"><span className="eyebrow">STOP {num(active)} OF {num(stops.length-1)}</span><span className="draft">DRAFT CONTENT</span></div><Carousel key={stop.id} stop={stop}/><div className="story-copy"><p className="eyebrow date">{stop.date}</p><h2>{stop.title}</h2><p className="location">{num(active)} / {stop.location}</p><div className="tabs" role="tablist" aria-label="Stop details" onKeyDown={e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const next=e.key==='Home'?'story':e.key==='End'?'sources':tab==='story'?'sources':'story';setTab(next);document.getElementById(`tab-${next}`)?.focus();}}>{['story','sources'].map(t=><button id={`tab-${t}`} key={t} role="tab" aria-selected={tab===t} aria-controls={`panel-${t}`} onClick={()=>setTab(t)}>{t==='story'?'The story':'Sources & notes'}</button>)}</div><div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} tabIndex={0}><p className="body-copy">{tab==='story'?stop.text:'Research pending. Add your historical citations, image creator, collection, date, permissions, and archive links here. All current images are original placeholder illustrations. Map coordinates are approximate sample locations.'}</p></div><div className="story-navigation"><button disabled={active===0} onClick={()=>select(active-1)}>← Previous stop</button><button disabled={active===stops.length-1} onClick={()=>select(active+1)}>Next stop →</button></div><p className="selection-status" role="status">Selected stop {active+1}: {stop.location}</p></div></section>
    <nav className="timeline" aria-label="Story stops"><span className="timeline-label">FOLLOW THE STORY <small>Sample sequence · dates pending</small></span>{stops.map((s,i)=><button key={s.id} aria-current={i===active?'step':undefined} onClick={()=>select(i)}><span className="stop-number">{num(i)}</span><span><strong>{s.title}</strong><small>{s.location}</small></span></button>)}</nav></main>;
}
function Home(){return <main id="main" className="home"><div className="home-copy"><span className="eyebrow">NASHVILLE, TENNESSEE · A STUDENT STORYTELLING PROJECT</span><h1>A movement.<br/>A city.<br/><em>Many voices.</em></h1><p>Discover the places behind a story of collective action. Explore Nashville one stop at a time.</p><a className="primary" href="#/explore">Explore the movement <span>↗</span></a><p className="fine">Interactive prototype · historical content and imagery pending research</p></div><div className="home-art"><img src={`${import.meta.env.BASE_URL}images/street.svg`} alt="Stylized illustration of a Nashville street, used as a placeholder"/><div className="art-caption"><span>01 / THE NASHVILLE MOVEMENT</span><h2>History happens<br/>in places.</h2><a href="#/stories">Browse the stories →</a></div></div></main>}
function Stories(){return <main id="main" className="page"><span className="eyebrow">THE STORY COLLECTION</span><h1>Places become stories.</h1><p className="intro">Begin with our first chapter. More stories can be added as the project grows.</p><a className="chapter-card" href="#/explore"><img src={`${import.meta.env.BASE_URL}images/gathering.svg`} alt="Placeholder illustration of a community gathering place"/><div><span className="eyebrow">CHAPTER 01 · INTERACTIVE MAP</span><h2>The Nashville movement</h2><p>Four sample stops exploring the shape of a movement.</p><span>Open chapter ↗</span></div></a></main>}

function App(){const [page,setPage]=useState(route);useEffect(()=>{const header=document.querySelector('header');if(!header)return;const observer=new ResizeObserver(()=>document.documentElement.style.setProperty('--header-height',`${header.getBoundingClientRect().height}px`));observer.observe(header);return()=>observer.disconnect();},[]);useEffect(()=>{const update=()=>{setPage(route());window.scrollTo(0,0);};window.addEventListener('hashchange',update);return()=>window.removeEventListener('hashchange',update);},[]);useEffect(()=>{document.title=`${page==='/explore'?'Explore':page==='/stories'?'Stories':page==='/about'?'About':'Home'} · Nashville Stories`;},[page]);return <><a className="skip" href="#main" onClick={e=>{e.preventDefault();const main=document.getElementById('main');main?.setAttribute('tabindex','-1');main?.focus();}}>Skip to content</a><header><a className="brand" href="#/"><span className="brand-mark">N</span><span>Nashville<small>STORIES OF A MOVEMENT</small></span></a><a className="lab-credit" href="#/about" aria-label="About SLaMLab, the Space, Learning and Mobility Laboratory at Vanderbilt University"><strong>SLaMLab <span>· Vanderbilt University</span></strong><small>Space, Learning &amp; Mobility Laboratory</small></a><nav aria-label="Main navigation">{[['/','Home'],['/explore','Explore'],['/stories','Stories'],['/about','About']].map(([url,label])=><a key={url} href={`#${url}`} aria-current={page===url?'page':undefined}>{label}</a>)}</nav></header>{page==='/'?<Home/>:page==='/explore'?<Explore/>:page==='/stories'?<Stories/>:page==='/about'?<About/>:<main id="main" className="page"><h1>Page not found</h1><a href="#/">Return home →</a></main>}</>}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);

