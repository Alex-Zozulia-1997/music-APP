import { useEffect, useState } from 'react';
import { neffexStore } from '../store';
import SongItem from './SongItem';

export default function SongList() {
  const fetchSongs = neffexStore((state) => state.fetchSongs);
  const listOfSongs = neffexStore((state) => state.initialSongs);
  const [search, setSearch] = useState('');
  console.log('listOfSongs', listOfSongs);
  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  return (
    <>
      <div className="overflow-auto bg-neutral-900 bg-opacity-15  options-menu w-3/12 min-w-72 h-full flex flex-col justify-start p-4 gap-4">
        <input
          onChange={(e) => {
            setSearch(e.target.value);
            console.log('search', search);
          }}
          className="opacity-90 h-12 w-full  rounded-lg bg-gradient-to-r from-neutral-400 p-3 to-transparent bg-transparent text-white text-xl"
          type="text"
          placeholder="Look for your song"
        />
        <div className="overflow-auto flex gap-2 flex-col">
          {listOfSongs
            .filter((song) =>
              song.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((song) => (
              <SongItem
                key={song.id}
                id={song.id}
                name={song.name}
                artist={song.artist}
                duration={song.duration}
                cover={song?.cover}
              />
            ))}
        </div>
      </div>
    </>
  );
}
