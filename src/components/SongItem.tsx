import { useEffect, useState } from 'react';
import { neffexStore } from '../store';
import { song } from '../types';
import classNames from 'classnames';

export default function SongItem({ id, name, artist, duration, cover }: song) {
  const currentSong = neffexStore((state) => state.currentSong);
  const isCurrentSong = neffexStore((state) => state.currentSong?.id === id);
  const setCurrentSong = neffexStore((state) => state.setCurrentSong);

  const setIsCurrentSongPlaying = neffexStore(
    (state) => state.setIsCurrentSongPlaying
  );

  const togglePlayPause = neffexStore((state) => state.togglePlayPause);

  const [isSeleceted, setIsSelected] = useState(false);
  useEffect(() => {
    if (!currentSong) return;
    if (id === currentSong.id) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [currentSong, id]);

  const handlePlayPause = () => {
    if (isCurrentSong) {
      togglePlayPause();
    }

    if (!isCurrentSong) {
      setCurrentSong({ id, name, artist, duration, cover });
      setIsCurrentSongPlaying(true);
    }
  };

  return (
    <div
      onClick={handlePlayPause}
      className={classNames(
        'song-item bg-neutral-700		opacity-85 bg-opacity-60 w-full h-1/12 flex flex-row items-center justify-between p-4 rounded-xl',
        { 'glowing-border': isSeleceted }
      )}>
      <div className="flex gap-2">
        <img src={cover} alt="Album cover" className="w-16 h-16" />
        <div className="song-info flex flex-col">
          <span className="text-neutral-100 font-bold">{name}</span>
          <span className="text-neutral-200">{artist}</span>
        </div>
      </div>
      <span className="text-neutral-200">{duration}</span>
    </div>
  );
}
