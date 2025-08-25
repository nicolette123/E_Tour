import React from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import './whyechoes.scss';

function WhyEchoes() {
  return (
    <section className="why-echoes">
      <div className="container">
        <p className="section-subtitle">Why Use Echoes of Rwanda?</p>
        <h2 className="section-title">Because you deserve more than<br />copy paste travel advice.</h2>
        <p className="section-description">
          Most trip planners rely on generic lists. Echoes of Rwanda goes deeper. Every <br /> recommendation is proximity-aware and culturally grounded
          so you’re not just <br /> moving from point A to B, but understanding the story of each stop.<br />It’s a system made for explorers.
        </p>

        <div className="features">
          <div className="feature-item">
            <div className="check">
              <Check size={16} />
            </div>
            <p>Smart itinerary generator</p>
          </div>
          <div className="feature-item">
            <div className="check">
              <Check size={16} />
            </div>
            <p>Interactive route maps</p>
          </div>
          <div className="feature-item">
            <div className="check">
              <Check size={16} />
            </div>
            <p>Offline export to PDF</p>
          </div>
          <div className="feature-item">
            <div className="check">
              <Check size={16} />
            </div>
            <p>Curated local experiences</p>
          </div>
        </div>

        <Link href="/about" className="learn-more-btn">Learn More</Link>
      </div>
    </section>
  )
}

export default WhyEchoes