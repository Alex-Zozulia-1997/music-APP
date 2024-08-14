import { useRef } from 'react';
import { useSongsStore } from '../stores/useSongsListStore';
import { useAudioStore } from '../stores/useAudioStore';

export const useAudio = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const setNewTime = useAudioStore((state) => state.actions.setNewTime);
  const currentSong = useAudioStore((state) => state.currentSong);
  const isCurrentSongPlaying = useAudioStore(
    (state) => state.isCurrentSongPlaying
  );
  const songDuration = useAudioStore((state) => state.currentSongDuration);
  const currtnSongTime = useAudioStore((state) => state.currentSongTime);

  const loop = useAudioStore((state) => state.isCurrentLooping);
  const setSong = useAudioStore((state) => state.actions.setCurrentSong);
  const togglePlayPause = useAudioStore(
    (state) => state.actions.togglePlayPause
  );
  const initialSongs = useSongsStore((state) => state.initialSongs);

  const handleNext = () => {
    if (!currentSong) return;
    if (loop && currtnSongTime === songDuration) return;
    if (!isCurrentSongPlaying) togglePlayPause();

    if (currentSong.id === initialSongs.length) {
      const newSong = initialSongs.find((song) => song.id === 1);
      if (!newSong) return;
      setSong(newSong);
      setNewTime(0);
      return;
    }
    const newSong = initialSongs.filter(
      (song) => song.id === currentSong.id + 1
    )[0];
    setSong(newSong);
    setNewTime(0);
    // console.log('playing' + isCurrentSongPlaying);
  };

  const handleBack = () => {
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
  };

  return {
    audioRef,
    handleNext,
    handleBack,
  };
};
