import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import UseCases from './pages/UseCases';
import HowItWorks from './pages/HowItWorks';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import PremiumBlog from './pages/PremiumBlog';
import PremiumBlogPost from './pages/PremiumBlogPost';
import WhatsAppCustomerCare from './pages/WhatsAppCustomerCare';
import ThriftBooksShowcase from './pages/ThriftBooksShowcase';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppChatButton from './components/WhatsAppChatButton';
import './index.css';
import './mobile.css';
import './responsive-media.css';
import './responsive-cards.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/use-cases" element={<UseCases />} />
            <Route path="/usecases" element={<Navigate to="/use-cases" replace />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<PremiumBlog />} />
            <Route path="/blog/:slug" element={<PremiumBlogPost />} />
            <Route path="/products/sales-agent" element={<ThriftBooksShowcase />} />
            <Route path="/products/customer-care" element={<WhatsAppCustomerCare />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppChatButton />
      </div>
    </Router>
  );
}

export default App;
