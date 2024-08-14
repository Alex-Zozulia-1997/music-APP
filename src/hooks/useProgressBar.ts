import { useEffect } from 'react';
import { useAudioStore } from '../stores/useAudioStore';
import { useAudio } from './useAudio';

export const useProgressBar = (audioRef: React.RefObject<HTMLAudioElement>) => {
  console.log('useProgressBar');
  const { handleNext } = useAudio();
  const isCurrentSongPlaying = useAudioStore(
    (state) => state.isCurrentSongPlaying
  );
  const newTime = useAudioStore((state) => state.newTime);
  const setCurrentSongTime = useAudioStore(
    (state) => state.actions.setCurrentSongTime
  );
  const setDuration = useAudioStore(
    (state) => state.actions.setCurrentSongDuration
  );
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = newTime;
  }, [audioRef, newTime]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.onloadedmetadata = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
      }
    };
  }, [audioRef, setDuration]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const handleTimeUpdate = () => {
      if (!audioRef.current) return;
      setCurrentSongTime(Math.floor(audioRef.current.currentTime));
    };

    audioElement.addEventListener('timeupdate', handleTimeUpdate);
    audioElement.addEventListener('ended', handleNext);

    return () => {
      audioElement.removeEventListener('timeupdate', handleTimeUpdate);
      audioElement.removeEventListener('ended', handleNext);
    };
  }, [audioRef, handleNext, setCurrentSongTime]);

  useEffect(() => {
    if (isCurrentSongPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [audioRef, isCurrentSongPlaying]);
};
