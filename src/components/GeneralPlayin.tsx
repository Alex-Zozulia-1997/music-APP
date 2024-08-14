import { useEffect, useRef } from 'react';
import PlayingControls from './PlayingControls';
import PlayingInfo from './PlayingInfo';

export default function GeneralPlaying() {
  const scrollingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToElement = () => {
      if (scrollingRef.current) {
        scrollingRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };

    setTimeout(scrollToElement, 100);
  }, []);

  return (
    <div className="canvas w-9/12 h-full overflow-auto no-scrollbar">
      <PlayingInfo />
      <PlayingControls />
      <div ref={scrollingRef}></div>
    </div>
  );
}
