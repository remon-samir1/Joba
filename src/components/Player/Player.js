// import "./Player.css"; 
// import React, { useEffect, useRef, useState } from "react";
// import Plyr from "plyr-react";
// import "plyr-react/plyr.css";
// import gsap from "gsap";

// const getPlyrSource = (url) => {
//   if (url.includes("youtube.com") || url.includes("youtu.be")) {
//     const id = url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
//     return {
//       type: "video",
//       sources: [{ src: id, provider: "youtube" }],
//     };
//   }

//   return {
//     type: "video",
//     sources: [{ src: url, type: "video/mp4" }],
//   };
// };

// const Player = ({ url, setPlay }) => {
//   const videoRef = useRef();
//   const containerRef = useRef();
//   const [isClosing, setIsClosing] = useState(false);
//   const [source , setSource] = useState(getPlyrSource(url))
//   useEffect(()=>{
    
//     if (url.includes("youtube.com") || url.includes("youtu.be")) {
//       setTimeout(() => {
      
//         setSource( getPlyrSource(url))
//         }, 3000);

//     }
//     setSource( getPlyrSource(url))

//   },[])

//   useEffect(() => {
//     gsap.fromTo(
//       videoRef.current,
//       { scale: 0.8, opacity: 0 },
//       {
//         scale: 1,
//         opacity: 1,
//         duration: 0.5,
//         ease: "power3.out",
//       }
//     );
//   }, []);

//   const handleClose = () => {
//     if (isClosing) return;
//     setIsClosing(true);
//     gsap.to(videoRef.current, {
//       scale: 0.8,
//       opacity: 0,
//       duration: 0.4,
//       ease: "power2.inOut",
//       onComplete: () => {
//         setPlay(false);
//       },
//     });
//   };

//   return (
//     <div
//       ref={containerRef}
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 "
//       onClick={handleClose}
//       style={{ willChange: "opacity, transform" }}
//     >
//       <div
//         ref={videoRef}
//         className="w-[90%] max-w-4xl aspect-video rounded-xl overflow-hidden"
//         onClick={(e) => e.stopPropagation()} 
//       >
//         <Plyr  source={source} />
//       </div>
//     </div>
//   );
// };

// export default Player;
import "./Player.css";
import React, { useEffect, useRef, useState } from "react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import gsap from "gsap";

// استخراج ID من YouTube
const extractYouTubeId = (url) => {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.slice(1);
    }
    if (parsedUrl.hostname.includes("youtube.com")) {
      return parsedUrl.searchParams.get("v");
    }
    return null;
  } catch {
    return null;
  }
};

// استخراج ID من Vimeo
const extractVimeoId = (url) => {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname.includes("vimeo.com")) {
      const id = parsedUrl.pathname.split("/").filter(Boolean).pop();
      return /^\d+$/.test(id) ? id : null;
    }
    return null;
  } catch {
    return null;
  }
};

// تجهيز المصدر بناءً على نوع الرابط
const getPlyrSource = (url) => {
  if (!url) return null;

  const youTubeId = extractYouTubeId(url);
  if (youTubeId) {
    return {
      type: "video",
      sources: [{ src: youTubeId, provider: "youtube" }],
    };
  }

  const vimeoId = extractVimeoId(url);
  if (vimeoId) {
    return {
      type: "video",
      sources: [{ src: vimeoId, provider: "vimeo" }],
    };
  }

  // دعم فيديوهات MP4, WebM, OGG
  if (/\.(mp4|webm|ogg)$/i.test(url)) {
    return {
      type: "video",
      sources: [{ src: url, type: "video/mp4" }],
    };
  }

  return null; // غير مدعوم
};

const Player = ({ url, setPlay }) => {
  const videoRef = useRef();
  const containerRef = useRef();
  const [isClosing, setIsClosing] = useState(false);
  const [source, setSource] = useState(null);
  const [error, setError] = useState(false);

  // تحميل المصدر ومعالجة الأخطاء
  useEffect(() => {
    if (!url) {
      setError(true);
      return;
    }

    const sourceData = getPlyrSource(url);
    if (!sourceData) {
      setError(true);
    } else {
      setError(false);
      setSource(sourceData);
    }
  }, [url]);

  // أنيميشن عند الظهور
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

  // إغلاق الفيديو
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

  // إعادة المحاولة
  const handleRetry = () => {
    setError(false);
    const sourceData = getPlyrSource(url);
    if (!sourceData) {
      setError(true);
    } else {
      setSource(sourceData);
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={handleClose}
      style={{ willChange: "opacity, transform" }}
    >
      <div
        ref={videoRef}
        className="w-[90%] max-w-4xl aspect-video rounded-xl overflow-hidden bg-black flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {error ? (
          <div className="text-white text-center px-6">
            <p className="mb-4 text-lg font-semibold">
              Can't Play This Video
            </p>
            <button
              onClick={handleRetry}
              className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300 transition"
            >
              Try Again
            </button>
          </div>
        ) : (
          <Plyr source={source} options={{ ratio: "4:3" }} />
        )}
      </div>
    </div>
  );
};

export default Player;

