import { useCallback, useEffect, useRef } from 'react';
import { neffexStore } from './store';

export const useAudio = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const setNewTime = neffexStore((state) => state.setNewTime);
  const currentSong = neffexStore((state) => state.currentSong);
  const isCurrentSongPlaying = neffexStore(
    (state) => state.isCurrentSongPlaying
  );
  //   const setIsCurrentSongPlaying = neffexStore(
  //     (state) => state.setIsCurrentSongPlaying
  //   );
  const setDuration = neffexStore((state) => state.setCurrentSongDuration);
  const setCurrentSongTime = neffexStore((state) => state.setCurrentSongTime);
  const loop = neffexStore((state) => state.isCurrentLooping);
  const newTime = neffexStore((state) => state.newTime);
  const setSong = neffexStore((state) => state.setCurrentSong);
  const togglePlayPause = neffexStore((state) => state.togglePlayPause);
  const initialSongs = neffexStore((state) => state.initialSongs);

  const handleNext = useCallback(() => {
    if (currentSong === null) return;
    if (loop) return;
    if (!isCurrentSongPlaying) togglePlayPause();

    if (!currentSong) return;
    if (currentSong.id === initialSongs.length) {
      const newSong = initialSongs.filter((song) => song.id === 1)[0];
      setSong(newSong);
      setNewTime(0);
      return;
    }
    const newSong = initialSongs.filter(
      (song) => song.id === currentSong.id + 1
    )[0];
    setSong(newSong);
    setNewTime(0);
    console.log('playing' + isCurrentSongPlaying);
  }, [
    currentSong,
    initialSongs,
    isCurrentSongPlaying,
    loop,
    setNewTime,
    setSong,
    togglePlayPause,
  ]);
  const handleBack = useCallback(() => {
    if (!isCurrentSongPlaying) togglePlayPause();
    if (!currentSong) return;
    if (currentSong.id === 1) {
      const newSong = initialSongs.filter(
        (song) => song.id === initialSongs.length
      )[0];
      setSong(newSong);
      return;
    }
    const newSong = initialSongs.filter(
      (song) => song.id === currentSong.id - 1
    )[0];
    setSong(newSong);
  }, [
    currentSong,
    initialSongs,
    isCurrentSongPlaying,
    setSong,
    togglePlayPause,
  ]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      console.log('key pressed' + event.key);

      if (event.key === 'ArrowRight') {
        handleNext();
      } else if (event.key === 'ArrowLeft') {
        handleBack();
      } else if (event.key === ' ') {
        togglePlayPause();
      }
    },
    [togglePlayPause, handleNext, handleBack]
  );
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = newTime;
  }, [newTime]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.onloadedmetadata = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
      }
    };
  }, [setDuration]);

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
  }, [handleKeyPress, handleNext, setCurrentSongTime]);

  useEffect(() => {
    if (isCurrentSongPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isCurrentSongPlaying]);

  return { audioRef, handleNext, handleBack };
};
