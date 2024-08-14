import { useCallback, useEffect } from 'react';
import { useInputStore } from '../stores/useInoutStore';
import { useAudioStore } from '../stores/useAudioStore';
import { useAudio } from './useAudio';

export const useKeyboardControls = () => {
  const togglePlayPause = useAudioStore(
    (state) => state.actions.togglePlayPause
  );
  const { handleNext, handleBack } = useAudio();
  const isInputFocused = useInputStore((state) => state.foucsedInput);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (isInputFocused) return;

      if (event.key === 'ArrowRight') {
        handleNext();
      } else if (event.key === 'ArrowLeft') {
        handleBack();
      } else if (event.key === ' ') {
        togglePlayPause();
      }
    },
    [togglePlayPause, handleNext, handleBack, isInputFocused]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);
};
