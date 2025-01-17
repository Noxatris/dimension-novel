import LandingContent from './(composents)/landingContent'
import Actualite from './(composents)/actualite'
import ListeNovels from './(composents)/listeNovel'
import AuteurInfo from './(composents)/auteurInfo';
import Avenir from './(composents)/avenir';

export default function Home() {
  return (
    <div className="w-screen overflow-x-hidden relative">
      <div className="w-full bg-center bg-cover sticky md:relative shadow-shadowInset" style={{ backgroundImage: 'url(/bgMain.jpg)' }}>
        <div className="hidden md:flex w-full bg-center bg-cover animate-[blurEffectSide_4s_ease-in-out_infinite_alternate] absolute" style={{ backgroundImage: 'url(/bgOverSide.png)' }}></div>
        <div className="hidden md:flex w-full bg-center bg-cover animate-[blurEffectMiddle_4s_ease-in-out_infinite_alternate] absolute" style={{ backgroundImage: 'url(/bgOverMiddle.png)' }}></div>
        <LandingContent />
        <Actualite />
        <ListeNovels />
        <AuteurInfo />
        <Avenir />
        <footer className='bg-gray-950 w-screen h-[12vh] mt-8'></footer>
      </div>
    </div>
  );
}
