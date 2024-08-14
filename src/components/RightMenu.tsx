import { useEffect } from 'react';
import { useSongsStore } from '../stores/useSongsListStore';
import TrendingItem from './TrendingItem';

export default function RightMenu() {
  const favList = useSongsStore((state) => state.favList);
  const addFavList = useSongsStore((state) => state.actions.addFavList);
  const initialSongs = useSongsStore((state) => state.initialSongs);

  useEffect(() => {
    if (initialSongs.length > 0) {
      addFavList(initialSongs[0]);
    }
  }, [initialSongs, addFavList]);

  return (
    <div className="flex flex-col bg-neutral-600 bg-opacity-5	 w-2/12 min-w-64 h-full p-1 gap-3 ">
      <h1 className="text-4xl pt-5 pb-5 text-white text-center">
        &#x1f525;PICKS&#x1f525;
      </h1>
      <div className=" no-scrollbar flex flex-col items-center h-11/12 gap-5 overflow-scroll">
        {favList.map((song) => (
          <TrendingItem
            key={song.id}
            id={song.id}
            name={song.name}
            cover={song.cover}
            artist={song.artist}
          />
        ))}
      </div>
    </div>
  );
}
