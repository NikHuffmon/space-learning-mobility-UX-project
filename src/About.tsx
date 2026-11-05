export default function About() {
  return <main id="main" className="page about">
    <span className="eyebrow">ABOUT SLaMLab</span>
    <h1>Space, Learning,<br/>and Mobility Stories</h1>
    <h2 className="lab-heading">The <em>S</em>pace, <em>L</em>earning &amp; <em>M</em>obility Laboratory <span>at Vanderbilt University</span></h2>
    <p className="intro">Welcome to the SLaMLab at Vanderbilt University. This site is dedicated to a collection of materials used and built during research with Vanderbilt students, local schools, and a grassroots museum community partner dedicated to preserving local music history in a historically Black community in North Nashville. Our hope is that this collection of digital spatial stories (DSSLs) and the activities generated to facilitate learning with DSSLs can continue to be used for learning in the years to come.</p>
    <section className="about-section">
      <h2>Space, mobility, and learning</h2>
      <p>The SLaMLab engages faculty and graduate students in design studies of how physical and virtual spaces can better support learning. Members collaborate on research projects, design experimental teaching, and write about relations between space, mobility, and learning.</p>
      <p>An example of this work is <em>“Back in the Day” on Nashville’s Historic Jefferson Street</em> with Lorenzo Washington and Jesse Boyce of Jefferson Street Sound. Explore the personal stories through <a href="https://lab.vanderbilt.edu/slamstories/story-making/a-walk-down-jefferson-street-with-jesse-boyce-and-lorenzo-washington-2015/">Jesse &amp; Lorenzo on the original SLAM Stories site</a>.</p>
      <figure className="lab-figure"><a href="https://lab.vanderbilt.edu/slamstories/wp-content/uploads/sites/227/2018/12/interactiveGraphic.png"><img src="https://lab.vanderbilt.edu/slamstories/wp-content/uploads/sites/227/2018/12/interactiveGraphic.png" alt="Interactive graphic from SLaMLab’s Space, Learning, and Mobility Stories project" loading="lazy" onError={e=>{e.currentTarget.style.display='none';}}/></a><figcaption><a href="https://lab.vanderbilt.edu/slamstories/wp-content/uploads/sites/227/2018/12/interactiveGraphic.png">View the SLaMLab interactive graphic ↗</a><span>Source: Space, Learning, and Mobility Stories, Vanderbilt University.</span></figcaption></figure>
    </section>
    <section className="about-section">
      <h2>Project investigators</h2>
      <p>The original project introduction credits the following investigators. Affiliations below reflect that introduction.</p>
      <ul className="investigators">
        <li><a href="https://peabody.vanderbilt.edu/bio/?pid=rogers-hall">Professor Rogers Hall</a><span>Vanderbilt’s Peabody School of Education</span></li>
        <li><a href="https://peabody.vanderbilt.edu/bio/?pid=andrew-hostetler">Professor Andy Hostetler</a><span>Vanderbilt’s Peabody School of Education</span></li>
        <li><a href="https://business.vanderbilt.edu/bio/david-owens">Professor David A. Owens</a><span>Vanderbilt’s Graduate School of Management</span></li>
        <li><a href="https://www.benrydal.com/">Ben Rydal Shapiro</a><span>Post-doctoral researcher at Georgia Tech and the SLaM Lab, as credited in the original project</span></li>
      </ul>
    </section>
    <section className="about-section">
      <span className="eyebrow">NORTH NASHVILLE</span><h2>Nashville’s Historic Jefferson Street</h2>
      <p>Nashville’s Historic Jefferson Street was once home to a vibrant, economically successful, and socially cohesive Black community. Beyond three historically Black colleges and universities, an elementary and high school, innumerable businesses, and numerous civic organizations, it also starred as Nashville’s <em>original</em> music row.</p>
      <p>The neighborhood was home to hundreds of businesses, including nightclubs and music venues, from the 1930s through the 1960s. Over those years, it welcomed famous artists including Duke Ellington, Ray Charles, and Etta James, and provided venues for musicians such as Jimi Hendrix, Marion James, Gene Allison, Jessie Boyce, and more.</p>
      <p>In the late 1960s, the routing of Interstate 40 destroyed this music row and, many residents argue, the neighborhood and community. These interactive maps are a small attempt to document that history and give voice to people who once lived, worked, and played there.</p>
      <p>Use this site’s Explore page to try the map prototype. Visit the original collection for <a href="https://lab.vanderbilt.edu/slamstories/">music and civil rights history, and personal stories from past and present residents</a>.</p>
    </section>
    <p className="content-credit">Lab introduction and historical context supplied for this project and adapted from <a href="https://lab.vanderbilt.edu/slamstories/">Space, Learning, and Mobility Stories</a>.</p>
    <details className="prototype-notes"><summary>About this prototype &amp; map credits</summary><p>The map stops, sequence, coordinates, and story text are demonstration content. Dates and archival photographs are pending research. The story carousel currently uses original placeholder illustrations.</p><p>Built with React, TypeScript, Vite, and Leaflet. Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>. Tiles require an internet connection and follow the <a href="https://operations.osmfoundation.org/policies/tiles/">tile usage policy</a>.</p></details>
  </main>;
}

