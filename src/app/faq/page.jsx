'use client';

import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Search, 
  HelpCircle,
  MapPin,
  Calendar,
  CreditCard,
  Users,
  Shield,
  Phone
} from 'lucide-react';
import './faq.css';

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFAQ, setOpenFAQ] = useState(null);

  const categories = [
    { id: 'all', label: 'All Questions', icon: HelpCircle },
    { id: 'booking', label: 'Booking & Reservations', icon: Calendar },
    { id: 'destinations', label: 'Destinations & Tours', icon: MapPin },
    { id: 'payment', label: 'Payment & Pricing', icon: CreditCard },
    { id: 'travel', label: 'Travel Information', icon: Users },
    { id: 'safety', label: 'Safety & Health', icon: Shield },
    { id: 'support', label: 'Customer Support', icon: Phone }
  ];

  const faqs = [
    {
      id: 1,
      category: 'booking',
      question: 'How do I book a tour with Echoes of Rwanda?',
      answer: 'You can book a tour through our website by selecting your preferred tour package and filling out the booking form. You can also contact us directly via phone or email. We require a deposit to confirm your booking, and full payment is due 30 days before your tour date.'
    },
    {
      id: 2,
      category: 'booking',
      question: 'Can I cancel or modify my booking?',
      answer: 'Yes, you can cancel or modify your booking. Cancellations made 60+ days before departure receive a full refund minus processing fees. Cancellations 30-59 days before departure receive a 50% refund. Cancellations less than 30 days before departure are non-refundable. Modifications are subject to availability and may incur additional fees.'
    },
    {
      id: 3,
      category: 'destinations',
      question: 'What are the must-visit destinations in Rwanda?',
      answer: 'Rwanda offers incredible destinations including Volcanoes National Park for gorilla trekking, Nyungwe Forest for canopy walks and chimpanzee tracking, Akagera National Park for safari experiences, Lake Kivu for relaxation, and Kigali city for cultural experiences and genocide memorial sites.'
    },
    {
      id: 4,
      category: 'destinations',
      question: 'What is the best time to visit Rwanda?',
      answer: 'Rwanda can be visited year-round due to its pleasant climate. The dry seasons (June-September and December-February) are ideal for gorilla trekking and wildlife viewing. The wet seasons offer lush landscapes and fewer crowds, though some roads may be challenging.'
    },
    {
      id: 5,
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept major credit cards (Visa, MasterCard, American Express), bank transfers, and mobile money payments. For international clients, we also accept PayPal and wire transfers. A deposit is required to secure your booking.'
    },
    {
      id: 6,
      category: 'payment',
      question: 'Are there any hidden fees?',
      answer: 'No, we believe in transparent pricing. All costs are clearly outlined in your booking confirmation. The only additional costs might be optional activities, personal expenses, tips, and travel insurance (which we highly recommend).'
    },
    {
      id: 7,
      category: 'travel',
      question: 'Do I need a visa to visit Rwanda?',
      answer: 'Most visitors need a visa to enter Rwanda. Citizens of some countries can get a visa on arrival, while others need to apply in advance. We recommend checking with the Rwanda Directorate General of Immigration and Emigration or your local Rwandan embassy for the most current requirements.'
    },
    {
      id: 8,
      category: 'travel',
      question: 'What should I pack for my Rwanda trip?',
      answer: 'Pack lightweight, breathable clothing in neutral colors, comfortable hiking boots, rain jacket, hat, sunscreen, insect repellent, camera, and any personal medications. For gorilla trekking, bring long pants, long sleeves, and gloves. We provide a detailed packing list upon booking.'
    },
    {
      id: 9,
      category: 'safety',
      question: 'Is Rwanda safe for tourists?',
      answer: 'Yes, Rwanda is considered one of the safest countries in Africa for tourists. The country has excellent security, low crime rates, and a stable political environment. We also provide 24/7 support during your trip and work with experienced local guides.'
    },
    {
      id: 10,
      category: 'safety',
      question: 'What health precautions should I take?',
      answer: 'We recommend consulting your doctor about vaccinations (Yellow Fever certificate may be required). Malaria prophylaxis is advised for some regions. Bring hand sanitizer, stay hydrated, and follow food safety guidelines. Travel insurance with medical coverage is highly recommended.'
    },
    {
      id: 11,
      category: 'support',
      question: 'What if I have an emergency during my trip?',
      answer: 'We provide 24/7 emergency support during your trip. You\'ll receive emergency contact numbers upon arrival. Our local team is always available to assist with any issues, medical emergencies, or unexpected situations that may arise.'
    },
    {
      id: 12,
      category: 'support',
      question: 'Can you accommodate special dietary requirements?',
      answer: 'Yes, we can accommodate various dietary requirements including vegetarian, vegan, gluten-free, and other special needs. Please inform us of any dietary restrictions when booking so we can make appropriate arrangements with our accommodation and restaurant partners.'
    },
    {
      id: 13,
      category: 'destinations',
      question: 'How physically demanding are the tours?',
      answer: 'Tour difficulty varies. Gorilla trekking can be moderately to highly challenging depending on gorilla location. City tours and cultural experiences are generally easy. We provide difficulty ratings for each tour and can customize experiences based on your fitness level and preferences.'
    },
    {
      id: 14,
      category: 'booking',
      question: 'Do you offer group discounts?',
      answer: 'Yes, we offer attractive group discounts for parties of 6 or more people. Corporate groups, families, and friends traveling together can benefit from reduced per-person rates. Contact us for a customized group quote based on your specific requirements.'
    },
    {
      id: 15,
      category: 'travel',
      question: 'What languages are spoken in Rwanda?',
      answer: 'Rwanda has four official languages: Kinyarwanda (most widely spoken), English, French, and Swahili. English is commonly used in tourism, and our guides are fluent in English. Many locals in tourist areas also speak some English.'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="faq-page">
      <div className="faq-container">
        {/* Header Section */}
        <div className="faq-header">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about traveling to Rwanda with Echoes of Rwanda</p>
        </div>

        {/* Search Bar */}
        <div className="faq-search">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search for questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="faq-categories">
          {categories.map(category => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
              >
                <IconComponent size={18} />
                {category.label}
              </button>
            );
          })}
        </div>

        {/* FAQ List */}
        <div className="faq-list">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map(faq => (
              <div key={faq.id} className="faq-item">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="faq-question"
                >
                  <span>{faq.question}</span>
                  {openFAQ === faq.id ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
                {openFAQ === faq.id && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="no-results">
              <HelpCircle size={48} />
              <h3>No questions found</h3>
              <p>Try adjusting your search terms or category filter.</p>
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="faq-cta">
          <h2>Still have questions?</h2>
          <p>Can't find what you're looking for? Our team is here to help!</p>
          <a href="/contact" className="cta-btn">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
