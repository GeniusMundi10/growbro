import React, { useEffect, useRef } from 'react';

const CLIENT_ID = '893131989691-t47d7m4gd8u8st7ok4b900ae36ru5c9a.apps.googleusercontent.com';

export default function GoogleSignInButton({ onSuccess, onError }) {
  const buttonDiv = useRef(null);

  useEffect(() => {
    // Load Google Identity script if not already present
    if (!window.google && !document.getElementById('google-identity')) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.id = 'google-identity';
      document.body.appendChild(script);
      script.onload = renderButton;
    } else {
      renderButton();
    }

    function renderButton() {
      if (window.google && window.google.accounts && buttonDiv.current) {
        window.google.accounts.id.initialize({
          client_id: CLIENT_ID,
          callback: (response) => {
            if (onSuccess) onSuccess(response);
          },
          ux_mode: 'popup',
        });
        window.google.accounts.id.renderButton(buttonDiv.current, {
          theme: 'outline',
          size: 'large',
          shape: 'pill',
          logo_alignment: 'center',
          width: 280,
        });
      }
    }
  }, [onSuccess]);

  return (
    <div className="google-signin-premium">
      <div ref={buttonDiv}></div>
    </div>
  );
}
