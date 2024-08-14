import { useState } from 'react';
import { useSongsStore } from '../stores/useSongsListStore';
import { useAudioStore } from '../stores/useAudioStore';
import { Song } from '../types';

export default function TrendingItem({
  name,
  cover = './neffex.jpg',
  id,
  artist,
}: Song) {
  const [isHovered, setIsHovered] = useState(false);

  const play = useAudioStore((state) => state.actions.setCurrentSong);
  const setIsCurrentPlaying = useAudioStore(
    (state) => state.actions.setIsCurrentSongPlaying
  );

  const handleClick = () => {
    play({ id, cover, artist, name });
    setIsCurrentPlaying(true);
  };
  const removeFavList = useSongsStore(
    (state) => state.actions.removeSongFavList
  );
  const handleDislikeSong = () => {
    removeFavList({ id, cover, artist, name });
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-pointer hover:ml-1 hover:brightness-200	 flex justify-center w-full min-w-48 "
      onClick={handleClick}>
      <div
        className="trending-item flex flex-col justify-between gap-4 w-4/5 aspect-square  bg-cover bg-center rounded-xl"
        style={{
          backgroundImage: `url(${cover})`,
          whiteSpace: 'nowrap',
        }}>
        <div className="flex flex-row-reverse">
          <button
            className="bg-red-300 bg-opacity-50 text-white"
            onClick={handleDislikeSong}
            hidden={!isHovered}>
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              x="0px"
              y="0px"
              viewBox="0 0 55.324 55.321">
              <polygon points="47.393,0 27.677,19.709 8.531,0.563 0.602,8.491 19.752,27.635 0,47.387 7.931,55.321    27.677,35.572 46.827,54.718 54.752,46.79 35.605,27.635 55.324,7.925  " />
            </svg>
          </button>
        </div>
        <div className="song-info flex flex-col bg-black bg-opacity-75 p-2 rounded h-2/5 text-white">
          <span className="text-neutral-100 font-bold">
            {name.length > 20 ? `^${name.substring(0, 19)}...` : name}
          </span>
          <span className="text-neutral-200">{artist}</span>
        </div>
      </div>
    </div>
  );
}
