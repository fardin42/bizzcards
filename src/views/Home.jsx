import React, { useState, useEffect } from 'react';
import mockupImg from "../assets/images/mocup.png";
export default function Home({ setView }) {
  const [walletCards, setWalletCards] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('bizzcards_wallet');
    if (saved) {
      try {
        setWalletCards(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return (
    <div className="landing-page">
      {/* Top Navigation */}
      <nav className="main-nav">
        <a href="#" className="nav-logo">Biz<span>Pocket</span></a>
        <div className="nav-links">
          <a href="#products">Products</a>
          <a href="#pricing">Pricing</a>
          <a href="#enterprise">Enterprise</a>
          <a href="#about">About</a>
        </div>
        <div className="nav-actions">
          <button className="nav-login" onClick={() => setView('admin')}>Login</button>
          <button className="nav-get-started" onClick={() => setView('checkout')}>Get Started</button>
        </div>
      </nav>

      {walletCards.length > 0 && (
        <div 
          onClick={() => setView('wallet')}
          className="wallet-floating-btn"
        >
          <div className="wallet-avatars">
            {walletCards.slice(0, 3).map((card, idx) => (
              <img 
                key={card.id} 
                src={card.avatar} 
                alt="card" 
                className="wallet-avatar-img"
                style={{ marginLeft: idx === 0 ? '0' : '-10px' }} 
              />
            ))}
          </div>
          <span className="wallet-btn-text">My Wallet ➔</span>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Your Premium Digital Card, <br/><span className="text-gradient">Set Up by Experts.</span></h1>
          <p className="hero-subtitle">
            We build your professional digital identity so you don’t have to. Get a high-performance BizPocket card tailored to your industry.
          </p>
          <div className="hero-actions" style={{ display: 'flex', gap: '16px' }}>
            <button className="btn-primary btn-large" onClick={() => setView('checkout')}>
              Choose Your Plan
            </button>
            <button className="btn-primary btn-large outline" onClick={() => document.getElementById('features').scrollIntoView({behavior: 'smooth'})}>
              See How It Works
            </button>
          </div>
        </div>
        <div className="hero-preview-container">
          <div className="hero-preview-wrapper">
             <img src={mockupImg} alt="BizPocket Digital Card Mockup" className="hero-mockup-img" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-header">
          <h2>A Flawless First Impression</h2>
          <p>Every Bizzpocket card comes pre-configured with everything you need to connect.</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">👆</div>
            <h3>One-Tap Actions</h3>
            <p>Instant Call, WhatsApp, Email, and Google Maps directly from your card.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Verified Badge</h3>
            <p>Build trust instantly with a verified professional badge/license display.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Services List</h3>
            <p>A clean, visual breakdown of exactly what you offer to clients.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⏱️</div>
            <h3>Business Hours</h3>
            <p>Clearly communicate when you’re available for calls or meetings.</p>
          </div>
        </div>
      </section>

      {/* Wallet Section */}
      <section className="wallet-highlight-section">
        <div className="wallet-content">
          <h2>Built-in Card Management</h2>
          <p>Every card you share can be saved into our <b>Digital Wallet</b>. No app required.</p>
          <ul className="wallet-benefits">
            <li>✓ <b>Zero App Installs:</b> Your clients save your card to their phone's local storage with one click.</li>
            <li>✓ <b>Offline Ready:</b> They can access your contact details even without an internet connection.</li>
            <li>✓ <b>Always Updated:</b> Changes you make sync automatically.</li>
          </ul>
        </div>
      </section>

      {/* Value Prop / Managed Service */}
      <section className="managed-service-section">
        <div className="section-header">
          <h2>We Handle the Technicals. You Handle the Business.</h2>
          <p>Stop fighting with DIY builders. We provide a fully managed service.</p>
        </div>
        <div className="managed-grid">
           <div className="managed-item">
              <span className="m-icon">🚀</span>
              <h4>Custom Hosting</h4>
              <p>Your card is hosted on a professional, high-speed URL.</p>
           </div>
           <div className="managed-item">
              <span className="m-icon">🎯</span>
              <h4>Zero Learning Curve</h4>
              <p>No complicated editors to master. We deliver a polished card.</p>
           </div>
           <div className="managed-item">
              <span className="m-icon">🔒</span>
              <h4>Secure & Reliable</h4>
              <p>Powered by a robust backend to ensure your card is online 24/7.</p>
           </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <div className="section-header">
          <h2>Scale your network, not your costs.</h2>
          <p>Choose the perfect plan for your professional journey. Annual billing.</p>
        </div>
        
        <div className="pricing-cards">
          {/* Tier 1 */}
          <div className="price-card">
            <div className="price-header">
              <h3>Professional</h3>
              <p>Best for Individuals & Freelancers</p>
            </div>
            <div className="price-amount">
              <span className="strike-price">₹2,999</span>
              <span className="current-price">₹1,999<span className="period">/yr</span></span>
              <span className="monthly-eq">~ ₹167 / mo</span>
            </div>
            <ul className="price-features">
              <li>✓ Custom URL</li>
              <li>✓ 1 Premium Theme</li>
              <li>✓ Unlimited Taps & Shares</li>
              <li>✓ Quick Action Buttons</li>
              <li>✓ Digital Wallet</li>
              <li>✓ Standard Analytics</li>
            </ul>
            <button className="btn-primary outline" onClick={() => setView('checkout')}>Get Started</button>
          </div>

          {/* Tier 2 */}
          <div className="price-card popular">
            <div className="popular-badge">Most Popular</div>
            <div className="price-header">
              <h3>Premium / Business</h3>
              <p>Best for Growth & Personal Branding</p>
            </div>
            <div className="price-amount">
              <span className="strike-price">₹4,999</span>
              <span className="current-price">₹2,999<span className="period">/yr</span></span>
              <span className="monthly-eq">~ ₹250 / mo</span>
            </div>
            <ul className="price-features">
              <li>✓ <b>Everything in Professional</b></li>
              <li>✓ White Labeling</li>
              <li>✓ Media Kit (Video & Gallery)</li>
              <li>✓ Lead Capture Form</li>
              <li>✓ Social Suite</li>
              <li>✓ Priority Support</li>
            </ul>
            <button className="btn-primary" onClick={() => setView('checkout')}>Start Premium</button>
          </div>

          {/* Tier 3 */}
          <div className="price-card">
            <div className="price-header">
              <h3>Enterprise</h3>
              <p>Best for Agencies & Teams</p>
            </div>
            <div className="price-amount">
              <span className="strike-price">₹24,999</span>
              <span className="current-price">₹14,999<span className="period">/yr</span></span>
              <span className="monthly-eq">~ ₹1,250 / mo</span>
            </div>
            <ul className="price-features">
              <li>✓ <b>Everything in Premium</b></li>
              <li>✓ Up to 10 Managed Cards</li>
              <li>✓ Central Admin Dashboard</li>
              <li>✓ Bulk Contact Updates</li>
              <li>✓ Corporate Branding & Assets</li>
              <li>✓ Priority Support & Account Manager</li>
            </ul>
            <button className="btn-primary outline" onClick={() => setView('checkout')}>Contact Sales</button>
          </div>
        </div>
        
        <div className="enterprise-scale">
           <h4>Need more than 10 cards?</h4>
           <p>Scale your team dynamically with our flexible per-seat model.</p>
           <div className="scale-tiers">
              <div><span>11-50 Cards:</span> +₹1,299/card</div>
              <div><span>51-100+ Cards:</span> +₹999/card</div>
           </div>
        </div>
      </section>
      
      {/* Footer CTA */}
      <section className="cta-section">
        <h2>Ready to Upgrade Your First Impression?</h2>
        <p>Join professionals who have already switched to Bizzpocket.</p>
        <button className="btn-primary btn-large" onClick={() => setView('checkout')}>
          Claim Your Custom URL Today
        </button>
      </section>

    </div>
  );
}
