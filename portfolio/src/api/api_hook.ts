import { useEffect, useRef } from 'react';

export const useVisitorTracking = () => {
  const hasTracked = useRef(false);

  const generateSessionId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const trackVisitor = async (data: { page: string; sessionId: string }) => {
    try {
      const response = await fetch('/api/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Tracking failed');
      }

      const result = await response.json();
      console.log('Visit tracked successfully:', result);
    } catch (error) {
      console.error('Failed to track visitor:', error);
    }
  };

  useEffect(() => {
    if (hasTracked.current) return;

    // Get or create session ID
    let sessionId = sessionStorage.getItem('portfolio_session_id');
    if (!sessionId) {
      sessionId = generateSessionId();
      sessionStorage.setItem('portfolio_session_id', sessionId);
    }

    trackVisitor({
      page: window.location.pathname,
      sessionId
    });

    hasTracked.current = true;
  }, []);

  return {};
};