import { useState, ChangeEvent, useEffect } from 'react';
import { useAudioStore } from '../stores/useAudioStore';

export default function ProgressBar() {
  const currentSongTime = useAudioStore((state) => state.currentSongTime);
  const duration = useAudioStore((state) => state.currentSongDuration);
  // console.log('duration', duration);
  const setCurrentSongTime = useAudioStore(
    (state) => state.actions.setCurrentSongTime
  );
  const newTime = useAudioStore((state) => state.newTime);
  const setNewTime = useAudioStore((state) => state.actions.setNewTime);

  const handleProgressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTime(Number(e.target.value));
    setCurrentSongTime(newTime);
  };

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
        onChange={(e) => {
          handleProgressChange(e);
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
