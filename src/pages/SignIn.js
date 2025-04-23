import React from 'react';
import GoogleSignInButton from '../components/GoogleSignInButton';

export default function SignIn() {
  const handleGoogleSuccess = (response) => {
    // For demo: decode JWT and show user info in console
    const decodeJwt = (token) => {
      try {
        return JSON.parse(atob(token.split('.')[1]));
      } catch {
        return null;
      }
    };
    const user = decodeJwt(response.credential);
    console.log('Google user:', user);
    alert(`Signed in as ${user?.name || 'Unknown User'}`);
  };

  return (
    <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h2 style={{ fontWeight: 800, fontSize: '2rem', marginBottom: '1.5rem', color: '#219150' }}>Sign in to Growbro.ai</h2>
      <GoogleSignInButton onSuccess={handleGoogleSuccess} />
      <p style={{ marginTop: '2rem', color: '#39543A', fontWeight: 500, fontSize: '1.1rem' }}>
        Use your Google account for secure, one-click sign in.
      </p>
    </div>
  );
}
