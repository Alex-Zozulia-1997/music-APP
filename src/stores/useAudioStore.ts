import { create } from 'zustand';
import { Song } from '../types';
interface AudioStore {
  currentSong: Song;
  isCurrentSongPlaying: boolean;
  currentSongTime: number;
  currentSongDuration: number;
  newTime: number;
  isCurrentLooping: boolean;
  actions: {
    setCurrentSong: (song: Song) => void;
    setIsCurrentSongPlaying: (isPlaying: boolean) => void;
    setCurrentSongTime: (time: number) => void;
    setNewTime: (time: number) => void;
    toggleLooping: () => void;
    togglePlayPause: () => void;
    setCurrentSongDuration: (duration: number) => void;
  };
}

export const useAudioStore = create<AudioStore>((set) => ({
  currentSong: {
    id: 1,
    name: 'NEFFEX - Warrior M2',
    artist: 'MEFFEX',
    cover:
      'https://i1.sndcdn.com/artworks-eYaxv66dpl1O7z8P-iMu3Bw-t500x500.jpg',
    duration: '3:00',
  },
  isCurrentSongPlaying: false,
  currentSongTime: 0,
  currentSongDuration: 0,
  newTime: 0,
  isCurrentLooping: false,

  actions: {
    setCurrentSong: (song) => set({ currentSong: song }),
    toggleLooping: () =>
      set((state) => ({
        isCurrentLooping: !state.isCurrentLooping,
      })),
    setNewTime: (time) => set({ newTime: time }),
    setCurrentSongDuration: (duration) =>
      set({ currentSongDuration: duration }),
    setCurrentSongTime: (time) => set({ currentSongTime: time }),
    setIsCurrentSongPlaying: (isPlaying) =>
      set({ isCurrentSongPlaying: isPlaying }),
    togglePlayPause: () =>
      set((state) => ({ isCurrentSongPlaying: !state.isCurrentSongPlaying })),
  },
}));
