import LandingContent from './(composents)/landingContent'
import Actualite from './(composents)/actualite'
import ListeNovels from './(composents)/listeNovel'
import Avenir from './(composents)/avenir';
import Footer from './(composents)/footer';
import Loader from './(composents)/loader';

export default function Home() {
  return (
    <div className="w-screen overflow-x-hidden relative">
      <div className="w-full flex flex-col items-center bg-center bg-cover sticky md:relative shadow-shadowInset" style={{ backgroundImage: 'url(/bgMain.jpg)' }}>
        <div className="hidden md:flex w-full bg-center bg-cover animate-[blurEffectSide_4s_ease-in-out_infinite_alternate] absolute" style={{ backgroundImage: 'url(/bgOverSide.png)' }}></div>
        <div className="hidden md:flex w-full bg-center bg-cover animate-[blurEffectMiddle_4s_ease-in-out_infinite_alternate] absolute" style={{ backgroundImage: 'url(/bgOverMiddle.png)' }}></div>
        <div className='md:w-[80%] flex flex-col items-center'>
          <LandingContent />
          <Actualite />
          <ListeNovels />
          <div className='flex flex-col items-center xl:flex-row xl:justify-between xl:items-start'>
            <Avenir />
          </div>
        </div>
        <Footer />
      </div>
      <Loader />
    </div>
  );
}
