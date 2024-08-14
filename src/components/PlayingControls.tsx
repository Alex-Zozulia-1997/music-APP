import { ChangeEvent, useState } from 'react';
import ProgressBar from './ProgressBar';
import { useAudio } from '../hooks/useAudio';
import { useSongsStore } from '../stores/useSongsListStore';
import { useAudioStore } from '../stores/useAudioStore';
import { useProgressBar } from '../hooks/useProgressBar';

export default function PlayingControls() {
  const { audioRef, handleNext, handleBack } = useAudio();
  useProgressBar(audioRef);

  const currentSong = useAudioStore((state) => state.currentSong);
  const togglePlayPause = useAudioStore(
    (state) => state.actions.togglePlayPause
  );
  const isCurrentSongPlaying = useAudioStore(
    (state) => state.isCurrentSongPlaying
  );
  const addFavorite = useSongsStore((state) => state.actions.addFavList);
  const isCurrentSongLooping = useAudioStore((state) => state.isCurrentLooping);
  const toggleLooping = useAudioStore((state) => state.actions.toggleLooping);

  const [volume, setVolume] = useState(0.5);
  const [showingVolumeBar, setShowingVolumeBar] = useState(false);

  const handleVolume = (e: ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handlePlayPause = () => {
    togglePlayPause();
  };

  const handleAddToFavs = () => {
    if (currentSong) {
      addFavorite(currentSong);
    }
  };

  return (
    <div className="w-full p-2 text-white" style={{ height: '25%' }}>
      <audio
        loop={isCurrentSongLooping}
        ref={audioRef}
        src={`./audio/${currentSong?.name}.wav`}
        autoPlay={isCurrentSongPlaying}></audio>
      <div className="margin  ml-10 mr-10 mb-5">
        <div className="flex justify-between">
          <div>
            <h3 className="text-2xl text-grey-darkest font-medium">
              {currentSong ? currentSong.name : 'No song selected'}
            </h3>
            <p className="text-sm text-grey mt-1">
              {currentSong ? currentSong.artist : 'no Artist'}
            </p>
          </div>
          <div className="heart text-red-lighter" onClick={handleAddToFavs}>
            <svg
              className="w-6 h-6 cursor-pointer"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20">
              <path d="M10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z"></path>
            </svg>
          </div>
        </div>
        <div className="contols flex justify-center gap-10 items-center">
          <div
            className="volume relative"
            onMouseEnter={() => setShowingVolumeBar(true)}
            onMouseLeave={() => setShowingVolumeBar(false)}>
            <input
              id="bottom-input"
              hidden={!showingVolumeBar}
              onChange={handleVolume}
              min="0"
              max="1"
              step="0.1"
              type="range"
              className="absolute z-10"
              value={volume}
              style={{
                height: '100px',
                width: '10px',
                writingMode: 'vertical-lr',
                bottom: '100%',
                left: '50%',
                transform: 'translateX(-50%) rotate(180deg)',
              }}
            />
            <svg
              className="w-8 h-8 cursor-pointer"
              fill="currentColor"
              version="1.1"
              id="Icons"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 32 32"
              xmlSpace="preserve">
              <polyline
                className="st0"
                points="10,21 3,21 3,11 10,11 "></polyline>
              <polyline
                className="st0"
                points="10,11 20,3.8 20,28.2 10,21 "></polyline>
              <g>
                <path
                  className="st0"
                  d="M26.4,22c1.6-1.5,2.6-3.6,2.6-6c0-2.4-1-4.5-2.6-6"></path>
              </g>
              <g>
                <path
                  className="st0"
                  d="M24,18.6c0.7-0.7,1.2-1.6,1.2-2.6s-0.4-2-1.2-2.6"></path>
              </g>
            </svg>
          </div>

          <div className="left text-grey-darker" onClick={handleBack}>
            <svg
              className="w-8 h-8 cursor-pointer"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20">
              <path d="M4 5h3v10H4V5zm12 0v10l-9-5 9-5z"></path>
            </svg>
          </div>
          <div
            className=" cursor-pointer play text-white p-7 rounded-full bg-red-light shadow-lg"
            onClick={handlePlayPause}>
            {!isCurrentSongPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8 cursor-pointer">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            ) : (
              <svg
                className="w-8 h-8 cursor-pointer"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20">
                <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z"></path>
              </svg>
            )}
          </div>
          <div className="right text-grey-darker" onClick={handleNext}>
            <svg
              className="w-8 h-8 cursor-pointer"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20">
              <path d="M13 5h3v10h-3V5zM4 5l9 5-9 5V5z"></path>
            </svg>
          </div>
          <div className="loop text-grey-darker" onClick={toggleLooping}>
            {!isCurrentSongLooping ? (
              <svg
                className="w-8 h-8 cursor-pointer"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20">
                <path d="M5 4a2 2 0 0 0-2 2v6H0l4 4 4-4H5V6h7l2-2H5zm10 4h-3l4-4 4 4h-3v6a2 2 0 0 1-2 2H6l2-2h7V8z"></path>
              </svg>
            ) : (
              <svg
                className="w-8 h-8 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path d="M7,7 L17,7 L17,10 L21,6 L17,2 L17,5 L5,5 L5,11 L7,11 L7,7 Z M17,17 L7,17 L7,14 L3,18 L7,22 L7,19 L19,19 L19,13 L17,13 L17,17 Z M13,15 L13,9 L12,9 L10,10 L10,11 L11.5,11 L11.5,15 L13,15 Z"></path>
              </svg>
            )}
          </div>
        </div>
        <ProgressBar />
      </div>
    </div>
  );
}
