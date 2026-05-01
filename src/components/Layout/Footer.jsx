import React from 'react';

export default function Footer({ setView, setPolicyType }) {
  const handlePolicy = (type) => {
    setView('policy');
    setPolicyType(type);
  };

  return (
    <footer className="footer">
      <div className="footer-links">
        <span className="footer-link" onClick={() => handlePolicy('about')}>About Us</span>
        <span className="footer-link" onClick={() => handlePolicy('privacy')}>Privacy Policy</span>
        <span className="footer-link" onClick={() => handlePolicy('terms')}>Terms & Conditions</span>
        <span className="footer-link" onClick={() => handlePolicy('refund')}>Refund & Cancellation</span>
        <span className="footer-link" onClick={() => handlePolicy('contact')}>Contact Us</span>
      </div>
      <p style={{ marginTop: '10px', fontSize: '0.8rem', opacity: 0.6 }}>
        © 2025 Bizzcards. All rights reserved.
      </p>
    </footer>
  );
}
