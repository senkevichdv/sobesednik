import React, { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  onUpdate?: () => void;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  className = "",
  speed = 30,
  onUpdate,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
        onUpdate?.(); // Call onUpdate after each character
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
      onUpdate?.(); // Call onUpdate when complete
    }
  }, [currentIndex, text, speed, onUpdate]);

  return (
    <div className={`typewriter ${className}`}>
      <span>{displayedText}</span>
      {!isComplete && <span className="typewriter-cursor">|</span>}
    </div>
  );
};
