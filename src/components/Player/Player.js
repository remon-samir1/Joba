import "./Player.css"; 
import React, { useEffect, useRef, useState } from "react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import gsap from "gsap";

const getPlyrSource = (url) => {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const id = url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
    return {
      type: "video",
      sources: [{ src: id, provider: "youtube" }],
    };
  }

  return {
    type: "video",
    sources: [{ src: url, type: "video/mp4" }],
  };
};

const Player = ({ url, setPlay }) => {
  const videoRef = useRef();
  const containerRef = useRef();
  const [isClosing, setIsClosing] = useState(false);
  const source = getPlyrSource(url);

  useEffect(() => {
    gsap.fromTo(
      videoRef.current,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      }
    );
  }, []);

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    gsap.to(videoRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        setPlay(false);
      },
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 "
      onClick={handleClose}
      style={{ willChange: "opacity, transform" }}
    >
      <div
        ref={videoRef}
        className="w-[90%] max-w-4xl aspect-video rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()} 
      >
        <Plyr  source={source} />
      </div>
    </div>
  );
};

export default Player;
