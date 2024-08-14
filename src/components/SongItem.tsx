import { useEffect, useState } from 'react';
import { Song } from '../types';
import classNames from 'classnames';
import { useAudioStore } from '../stores/useAudioStore';

export default function SongItem({ id, name, artist, duration, cover }: Song) {
  const currentSong = useAudioStore((state) => state.currentSong);
  const isCurrentSong = useAudioStore((state) => state.currentSong?.id === id);
  const setCurrentSong = useAudioStore((state) => state.actions.setCurrentSong);
  // const isCurrentSongPlaying = useAudioStore(
  //   (state) => state.isCurrentSongPlaying
  // );
  const setIsCurrentSongPlaying = useAudioStore(
    (state) => state.actions.setIsCurrentSongPlaying
  );

  const togglePlayPause = useAudioStore(
    (state) => state.actions.togglePlayPause
  );

  const [isSeleceted, setIsSelected] = useState(false);
  useEffect(() => {
    if (!currentSong) return;
    setIsSelected(id === currentSong.id);
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
        ' hover:brightness-200 hover:ml-1 cursor-pointer song-item bg-neutral-700		opacity-85 bg-opacity-60 w-full h-1/12 flex flex-row items-center justify-between p-4 rounded-xl',
        { 'glowing-border': isSeleceted }
      )}>
      <div className="flex flex-col w-full">
        <div className="flex gap-3">
          <img src={cover} alt="Album cover" className="w-16 h-16" />
          <div className="w-full song-info flex flex-col justify-around">
            <span className="line-clamp-2 text-neutral-100 font-bold">
              {name}
            </span>
            <div className="flex justify-between">
              <span className="text-neutral-200">{artist}</span>
              {/* {isCurrentSong && (
                <div className="">
                  <img
                    className={classNames('pulse h-7', {
                      playing: isCurrentSongPlaying,
                    })}
                    src="/neffex.svg"
                    alt=""
                  />
                </div>
              )} */}
              <span className="text-neutral-200">{duration}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
