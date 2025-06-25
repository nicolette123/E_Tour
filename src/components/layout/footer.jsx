import React from 'react'
import '@/styles/footer.scss';

function Footer() {
  return (
    <footer className="footer">
        <div className="footer-column brand">
          <img src="/images/logos.png" alt="Echoes of Rwanda" className="footer-logo" />
          <h3 className="footer-tagline">Explore vibrant cities, cultural <br /> gems, and nature escapes</h3>
          <button className="footer-button">Get started</button>
        </div>

        <div className="footer-column links">
          <h4>Useful Link</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Terms of service</a></li>
            <li><a href="#">Tour Booking Now</a></li>
          </ul>
        </div>

        <div className="footer-column contact">
          <h4>Contacts</h4>
          <ul>
            <li><span>📞</span> +250 345 896</li>
            <li><span>✉️</span> echoesofrwanda@gmail.com</li>
            <li><span>🔗</span> echoesofrwanda@gmail.com</li>
          </ul>
        </div>
        <div className="footers">© Echoes of Rwanda 2025</div>
      </footer>
  )
}

export default Footer