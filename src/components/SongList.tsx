import { useEffect, useState } from 'react';
import { useSongsStore } from '../stores/useSongsListStore';
import SongItem from './SongItem';
import { useInput } from '../hooks/useInput';

export default function SongList() {
  const fetchSongs = useSongsStore((state) => state.actions.fetchSongs);
  const listOfSongs = useSongsStore((state) => state.initialSongs);
  const { inputRef } = useInput();
  const [search, setSearch] = useState('');
  const songsLoaded = useSongsStore((state) => state.songsLoaded);
  console.log('listOfSongs', listOfSongs);
  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  return (
    <>
      <div className=" overflow-auto bg-neutral-900 bg-opacity-15  options-menu w-3/12 min-w-72 h-full flex flex-col justify-start p-4 gap-4">
        <input
          onChange={(e) => {
            setSearch(e.target.value);
            console.log('search', search);
          }}
          ref={inputRef}
          className="opacity-90 h-12 w-full  rounded-lg bg-gradient-to-r from-neutral-400 p-3 to-transparent bg-transparent text-white text-xl"
          type="text"
          id="song-search"
          placeholder="Look for your song"
        />
        <div className="no-scrollbar h-full overflow-scroll flex gap-2 flex-col ">
          {!songsLoaded && (
            <div className="flex flex-col justify-center items-center gap-10 m-10">
              <p className="text-neutral-300 text-3xl">Loading...</p>
              <div className="music-loading">
                <img src="/neffex.svg" alt="NEFFEX" />
              </div>
            </div>
          )}
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
                // isCurrent={song.isCurrent}
                // isFavorite={song.isFavorite}
              />
            ))}
          {songsLoaded &&
            listOfSongs.filter((song) =>
              song.name.toLowerCase().includes(search.toLowerCase())
            ).length === 0 && (
              <>
                <p className="text-neutral-300 text-3xl">
                  {'We do not have that song! :('}
                </p>
              </>
            )}
        </div>
      </div>
    </>
  );
}
