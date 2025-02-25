// LoadingMagic.tsx
import { useEffect, useState } from 'react';

export default function LoadingMagic() {
  const [text, setText] = useState('Chargement du récit...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const phrases = [
      'Chargement du récit...',
      'Préparation de l’histoire...',
      'Magie en action...',
      'Les pages se tournent...',
      'L’aventure commence...'
    ];

    let i = 0;
    const interval = setInterval(() => {
      setText(phrases[i]);
      i = (i + 1) % phrases.length;
    }, 2000); // change phrase every 2 seconds

    setTimeout(() => {
      setLoading(false); // End loading after 10 seconds
      clearInterval(interval);
    }, 10000); // simulate loading for 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container">
      {loading ? (
        <div className="magic-bar">
          <div className="magic-text">{text}</div>
        </div>
      ) : (
        <div className="completed-text">Chargement terminé, préparez-vous à explorer l’histoire !</div>
      )}
      <style jsx>{`
        .loading-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          color: #fff;
          font-family: 'Courier New', Courier, monospace;
        }
        .magic-bar {
          border: 2px solid #fff;
          border-radius: 8px;
          padding: 10px;
          width: 80%;
          text-align: center;
          animation: fadeIn 3s ease-in-out infinite;
        }
        .magic-text {
          font-size: 20px;
          letter-spacing: 1px;
        }
        .completed-text {
          font-size: 22px;
          color: #4CAF50;
        }
        @keyframes fadeIn {
          0% { opacity: 0.1; }
          50% { opacity: 1; }
          100% { opacity: 0.1; }
        }
      `}</style>
    </div>
  );
}