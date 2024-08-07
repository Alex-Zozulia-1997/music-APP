import { neffexStore } from '../store';

import {
  useState,
  ChangeEvent,
  MouseEvent,
  TouchEvent,
  useEffect,
} from 'react';

export default function ProgressBar() {
  const currentSongTime = neffexStore((state) => state.currentSongTime);
  const duration = neffexStore((state) => state.currentSongDuration);
  // console.log('duration', duration);
  const setCurrentSongTime = neffexStore((state) => state.setCurrentSongTime);
  const newTime = neffexStore((state) => state.newTime);
  const setNewTime = neffexStore((state) => state.setNewTime);

  const [isInteracting, setIsInteracting] = useState(false);

  const handleMouseDown = () => {
    setIsInteracting(true);
  };

  const handleMouseUp = (
    e: MouseEvent<HTMLInputElement> | TouchEvent<HTMLInputElement>
  ) => {
    setIsInteracting(false);
    handleProgressChange(e as unknown as ChangeEvent<HTMLInputElement>);
  };

  const handleProgressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTime(Number(e.target.value));
    setCurrentSongTime(newTime);
  };
  // useEffect(() => {
  //   console.log(newTime);
  // }, [newTime]);

  const userFriendlyDuration = `${Math.floor(duration / 60)}:${Math.floor(
    duration % 60
  )
    .toString()
    .padStart(2, '0')}`;
  const [userFriendlyTime, setUserFriendlyTime] = useState('');
  useEffect(() => {
    // console.log('currentSongTime', currentSongTime);
    setUserFriendlyTime(
      `${Math.floor(currentSongTime / 60)}:${Math.floor(currentSongTime % 60)
        .toString()
        .padStart(2, '0')}`
    );
  }, [currentSongTime]);
  return (
    <>
      <input
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        onChange={(e) => {
          if (isInteracting) {
            handleProgressChange(e);
          }
        }}
        id="bottom-input"
        type="range"
        max={duration}
        min="0"
        step="1"
        value={currentSongTime}
      />
      <div className="times flex justify-between">
        <p className="current-time">{userFriendlyTime}</p>

        <p className="duration">{userFriendlyDuration}</p>
      </div>
    </>
  );
}
