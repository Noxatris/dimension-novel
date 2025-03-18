import Footer from './(composents)/footer';
import Loader from './(composents)/loader';
import LandingNav from './(composents)/landingNav';
import Image from 'next/image';
import InfoBulle from './(composents)/infoBulle';

export default function Home() {
  return (
    <div className="w-screen overflow-x-hidden relative">
      <div className="w-full flex flex-col items-center bg-center bg-cover shadowTest" style={{ backgroundImage: 'url(/bgMainTest.png)' }}>
        <InfoBulle />
        <div className='flex flex-col items-center justify-center w-full mt-16 px-2'>
          <Image src="/logoAlone.png" width={300} height={300} alt='Icone grimoire' className='w-[200px] h-[200px] xl:w-[300px] xl:h-[300px]' />
          <h1 className="text-3xl xl:text-5xl text-center mt-8 md:mt-12 xl:mt-16 mb-4 md:mb-8 xl:mb-12 medievalFont">Bienvenue dans la Dimension Novel</h1>
          <p className="text-lg xl:text-2xl text-center mb-8 md:mb-12 xl:mb-16">Utiliser les grimoires pour parcourir la bibliothèque</p>
        </div>
        <LandingNav />
        <Footer />
      </div>
      <Loader />
    </div>
  );
}
