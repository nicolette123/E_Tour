import React from 'react'
import './whyechoes.scss';
import Link from 'next/link';
function WhyEchoes() {
  return (
      <section className="why-echoes">
        <p className="section-subtitle">Why Use Echoes of Rwanda?</p>
        <h2 className="section-title">Because you deserve more than<br />copy paste travel advice.</h2>
        <p className="section-description">
          Most trip planners rely on generic lists. Echoes of Rwanda goes deeper. Every <br /> recommendation is proximity-aware and culturally grounded
          so you’re not just <br /> moving from point A to B, but understanding the story of each stop.<br />It’s a system made for explorers.
        </p>

        <div className="features">
          <div className="feature-item">
            <span className="check">✔</span>
            <p>Smart itinerary<br />generator</p>
          </div>
          <div className="feature-item">
            <span className="check">✔</span>
            <p>Interactive<br />route maps</p>
          </div>
          <div className="feature-item">
            <span className="check">✔</span>
            <p>Offline export<br />to PDF</p>
          </div>
          <div className="feature-item">
            <span className="check">✔</span>
            <p>Curated local<br />experiences</p>
          </div>
        </div>
       <Link href="/tour-packages">
        <button className="learn-more-btn">Learn More</button></Link>
      </section>
  )
}

export default WhyEchoes