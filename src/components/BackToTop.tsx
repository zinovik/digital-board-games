import { useState, useEffect } from 'react';

const MIN_HEIGHT = 400;

export const BackToTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > MIN_HEIGHT) setShowScroll(true);
      if (showScroll && window.pageYOffset <= MIN_HEIGHT) setShowScroll(false);
    };
    checkScrollTop();

    window.addEventListener('scroll', checkScrollTop);

    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  const handleButtonClick = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!showScroll) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '3rem',
        right: '3rem',
        cursor: 'pointer',
        fontSize: 'xxx-large',
        opacity: '0.25',
        transition: 'all 1s',
      }}
      onClick={handleButtonClick}
    >
      ⬆️
    </div>
  );
};
