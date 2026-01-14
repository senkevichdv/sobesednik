import React, { useEffect, useState, useRef } from "react";

interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  onUpdate?: () => void;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  className = "",
  speed = 20,
  onUpdate,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const updateCountRef = useRef(0);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);
    setCurrentIndex(0);
    updateCountRef.current = 0;
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
        
        // Only call onUpdate every 5 characters or at word boundaries to reduce scroll jank
        updateCountRef.current++;
        const char = text[currentIndex];
        const isWordBoundary = char === ' ' || char === '\n';
        
        if (updateCountRef.current % 5 === 0 || isWordBoundary) {
          onUpdate?.();
        }
      }, speed);

      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onUpdate?.(); // Final update when complete
    }
  }, [currentIndex, text, speed, onUpdate, isComplete]);

  return (
    <div className={`typewriter ${className}`}>
      <span>{displayedText}</span>
      {!isComplete && <span className="typewriter-cursor">|</span>}
    </div>
  );
};
