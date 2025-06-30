'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    _mtm?: Array<Record<string, unknown>>;
  }
}

export default function MatomoTracker(): null {
  useEffect(() => {
    if (!window._mtm) {
      window._mtm = [];
    }

    window._mtm.push({
      'mtm.startTime': new Date().getTime(),
      event: 'mtm.Start',
    });

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://cdn.matomo.cloud/tsp2kqlcvercelapp.matomo.cloud/container_XLmYx7NU.js';
    document.head.appendChild(script);

    // Nettoyage (facultatif)
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
