import React, { useEffect } from 'react';

const TwitterFeed = () => {
  useEffect(() => {
    // Load Twitter widgets script
    if (!window.twttr) {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      document.body.appendChild(script);
    } else {
      window.twttr.widgets.load();
    }
  }, []);

  return (
    <div className="twitter-feed">
      <a
        className="twitter-timeline"
        data-height="400"
        href="https://twitter.com/YourCompanyTwitterHandle"
      >
        
      </a>
    </div>
  );
};

export default TwitterFeed;
