import SongList from './SongList';
import TopBar from './TopBar';
import RightMenu from './RightMenu';
import GeneralPlaying from './GeneralPlayin';
import { Color } from 'color-thief-react';
import { neffexStore } from '../store';
import { useState } from 'react';

export default function MainScreen() {
  const currentSong = neffexStore((state) => state.currentSong);

  const [bgColor, setBgColor] = useState(
    'linear-gradient(to right, blue, black)'
  );
  return (
    <>
      {currentSong && (
        <Color
          src={typeof currentSong.cover === 'string' ? currentSong.cover : ''}
          crossOrigin="anonymous"
          format="rgbArray">
          {({ data, loading, error }) => {
            if (loading || error || !data) {
              return null;
            }

            const color = `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
            setBgColor(`linear-gradient(to right, ${color}, rgb(34 34 34))`);

            return null;
          }}
        </Color>
      )}
      <div className="mainscreen w-full h-screen flex flex-col">
        <TopBar />
        <div
          className="main flex flex-row w-full h-full justify-center"
          style={{ background: bgColor }}>
          <SongList />
          <GeneralPlaying />
          <RightMenu />
        </div>
      </div>
    </>
  );
}
