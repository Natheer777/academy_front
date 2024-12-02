import React from 'react';

const VideoCalls = ({ videoRef, autoPlay = true, muted = true, label }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden aspect-video">
      <video
        ref={videoRef}
        autoPlay={autoPlay}
        playsInline
        muted={muted}
        className="w-full h-full object-cover"
      />
      {label && <p className=" text-center py-2">{label}</p>}
    </div>
  );
};

export default VideoCalls;