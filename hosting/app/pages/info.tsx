// src/InfoPage.tsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function InfoPage() {
  return (
    <div>
      <Header />
      <div style={{ padding: '20px' }}>
        <h1>General Information</h1>
        <p>Here you can provide definitions, explanations of tests, and other relevant information for users.</p>
        <h2>Definitions</h2>
        <p>...</p>
        <h2>Explanations of Tests</h2>
        <p>...</p>
        {/* Add more content as needed */}
      </div>
      <Footer />
    </div>
  );
}
