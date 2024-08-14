import { create } from 'zustand';
import { Song } from '../types';

interface useSongsStore {
  initialSongs: Song[];
  favList: Song[];
  songsLoaded: boolean;
  songsFailed: boolean;
  actions: {
    setSongsFailed: (failed: boolean) => void;
    setSongsLoaded: (loaded: boolean) => void;
    fetchSongs: () => Promise<void>;
    addFavList: (song: Song) => void;
    removeSongFavList: (song: Song) => void;
  };
}
export const useSongsStore = create<useSongsStore>((set) => ({
  initialSongs: [],

  favList: [],
  songsLoaded: false,
  songsFailed: false,
  actions: {
    setSongsFailed: (failed) => set({ songsFailed: failed }),
    setSongsLoaded: (loaded) => set({ songsLoaded: loaded }),
    fetchSongs: async () => {
      try {
        const response = await fetch('/songs.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        set({ initialSongs: data });
        set({ songsLoaded: true });
        console.log('Fetched songs:', data);
      } catch (error) {
        console.error('Failed to fetch songs:', error);
        true;
      }
    },
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
        const updatedFavList = state.favList.filter(
          (fav) => fav.id !== song.id
        );
        return { favList: updatedFavList };
      }),
  },
}));
