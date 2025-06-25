import React from 'react'
import '../styles/Premium.scss';

function Premium() {
  return (
    <section className="premium-section">
        <div className="premium-overlay">
          <p className="premium-subtitle">Your Journey, Made Premium</p>
          <h2 className="premium-title">Pay once or subscribe for more<br />it’s your choice.</h2>
          <p className="premium-description">
            Echoes of Rwanda is fully premium. That means no ads, no distractions —<br />just great tools and even better travel content.<br />From one-time access to unlimited use, we’ve got a plan that fits your adventure style.
          </p>

          <div className="premium-options">
            <div className="option">
              <div className="icon-circle">💳</div>
              <h4>One-Time Pass</h4>
              <p>Ideal for planning a single full trip itinerary.</p>
            </div>
            <div className="option">
              <div className="icon-circle">🔁</div>
              <h4>Subscription plan</h4>
              <p>Perfect for frequent travelers exploring often.</p>
            </div>
            <div className="option">
              <div className="icon-circle">📣</div>
              <h4>Vendor spotlight</h4>
              <p>Promote your service in curated listings.</p>
            </div>
          </div>

          <button className="get-started-btn">Get started</button>
        </div>
      </section>
  )
}

export default Premium