import { create } from 'zustand';
import { song } from './types';

interface neffexStore {
  initialSongs: song[];
  fetchSongs: () => void;
  currentSong: song | null;
  setCurrentSong: (song: song) => void;
  isCurrentSongPlaying: boolean;
  setIsCurrentSongPlaying: (isPlaying: boolean) => void;
  togglePlayPause: () => void;
  favList: song[];
  addFavList: (song: song) => void;
  removeSongFavList: (song: song) => void;
  currentSongTime: number;
  setCurrentSongTime: (time: number) => void;
  currentSongDuration: number;
  setCurrentSongDuration: (duration: number) => void;
  newTime: number;
  setNewTime: (time: number) => void;
  isCurrentLooping: boolean;
  toggleLooping: () => void;
}
export const neffexStore = create<neffexStore>((set) => ({
  initialSongs: [],
  fetchSongs: async () => {
    try {
      const response = await fetch('/songs.json'); // Fetch from the mock API endpoint
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      set({ initialSongs: data });
      console.log('Fetched songs:', data);
    } catch (error) {
      console.error('Failed to fetch songs:', error);
    }
  },
  currentSong: {
    id: 1,
    name: 'NEFFEX - Warrior M2',
    artist: 'MEFFEX',
    cover:
      'https://i1.sndcdn.com/artworks-eYaxv66dpl1O7z8P-iMu3Bw-t500x500.jpg',
    duration: '3:00',
  },
  setCurrentSong: (song) => set({ currentSong: song }),
  isCurrentSongPlaying: false,
  setIsCurrentSongPlaying: (isPlaying) =>
    set({ isCurrentSongPlaying: isPlaying }),
  togglePlayPause: () =>
    set((state) => ({ isCurrentSongPlaying: !state.isCurrentSongPlaying })),
  favList: [],
  addFavList: (song) =>
    set((state) => {
      console.log('favs', state.favList);
      if (state.favList.find((fav) => fav.id === song.id)) {
        return state;
      }
      return { favList: [...state.favList, song] };
    }),
  removeSongFavList: (song) =>
    set((state) => {
      const updatedFavList = state.favList.filter((fav) => fav.id !== song.id);
      return { favList: updatedFavList };
    }),
  currentSongTime: 0,
  setCurrentSongTime: (time) => set({ currentSongTime: time }),
  currentSongDuration: 0,
  setCurrentSongDuration: (duration) => set({ currentSongDuration: duration }),
  newTime: 0,
  setNewTime: (time) => set({ newTime: time }),
  isCurrentLooping: false,
  toggleLooping: () =>
    set((state) => ({
      isCurrentLooping: !state.isCurrentLooping,
    })),
}));
