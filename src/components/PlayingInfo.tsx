import { useEffect } from 'react';
import { useAudioStore } from '../stores/useAudioStore';

export default function PlayingInfo() {
  const currentSong = useAudioStore((state) => state.currentSong);
  useEffect(() => {
    console.log('currentSong', currentSong);
  }, [currentSong]);

  return (
    <div
      className="playing-info w-full  flex flex-col justify-center items-center p-4 gap-4 "
      style={{ height: '74%' }}>
      {currentSong && (
        <>
          <img
            src={currentSong.cover}
            alt="Album cover"
            className=" glowing-border w-64 h-64 rounded-xl drop-shadow-2xl	"
          />
          <div className="song-info text-center text-white">
            <h2 className="text-2xl">{currentSong.name}</h2>
            <p className="text-lg">{currentSong.artist}</p>
          </div>
        </>
      )}
    </div>
  );
}
