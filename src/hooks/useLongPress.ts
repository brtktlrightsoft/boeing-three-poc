import { useRef, useEffect } from "react";

const useLongPress = (callback: () => void, delay = 1000) => {
  const pressTimerRef = useRef<number | null>(null);

  const handleMouseDown = () => {
    pressTimerRef.current = setTimeout(() => {
      if (callback) callback();
    }, delay);
  };

  const handleMouseUp = () => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (pressTimerRef.current) {
        clearTimeout(pressTimerRef.current);
      }
    };
  }, []);

  return {
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseUp, // In case the mouse leaves before releasing
  };
};

export default useLongPress;