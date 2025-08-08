import React from 'react'
import '../Footer/Footer.css';
import Link from 'next/link';
function Footer() {
  return (
    <footer className="footer">
        <div className="footer-column brand">
          <img src="/images/logos/the logo.png" alt="Echoes of Rwanda" className="footer-logo" />
          <h3 className="footer-tagline">Explore vibrant cities, cultural <br /> gems, and nature escapes</h3>
          <Link href="/login">
          <button className="footer-button">Get started</button></Link>
        </div>

        <div className="footer-column links">
          <h4>Useful Link</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">Terms of service</Link></li>
            <li><Link href="tour-packages">Tour Booking Now</Link></li>
          </ul>
        </div>

        <div className="footer-column contact">
          <h4>Contacts</h4>
          <ul>
            <li><span>📞</span> +250 345 896</li>
            <li><span>✉</span> echoesofrwanda@gmail.com</li>
            <li><span>🔗</span> echoesofrwanda@gmail.com</li>
          </ul>
        </div>
        {/* <div className="footers">© Echoes of Rwanda 2025</div> */}
      </footer>
  )
}

export default Footer