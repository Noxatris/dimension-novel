import React from 'react';

const SpotifyPlayer = () => {
  return (
    <div className='w-screen flex flex-col items-center justify-center'>
      <iframe src="https://open.spotify.com/embed/playlist/2OtXdvT9hBz95qlspH0GEp?utm_source=generator&theme=0" width="100%" height="152px" frameBorder="0" allowFullScreen={false} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </div>
  );
};

export default SpotifyPlayer;


