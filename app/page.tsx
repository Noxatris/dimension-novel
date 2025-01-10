import Actualite from './(composents)/actualite'
import ListeNovels from './(composents)/listeNovel'

export default function Home() {
  return (
    <div className="w-screen overflow-x-hidden relative">
      <div className="w-full h-screen bg-center bg-cover relative" style={{ backgroundImage: 'url(/bgMain.jpg)' }}>
        <div className="hidden md:flex w-full h-screen bg-center bg-cover animate-[blurEffectSide_4s_ease-in-out_infinite_alternate] absolute" style={{ backgroundImage: 'url(/bgOverSide.png)' }}></div>
        <div className="hidden md:flex w-full h-screen bg-center bg-cover animate-[blurEffectMiddle_4s_ease-in-out_infinite_alternate] absolute" style={{ backgroundImage: 'url(/bgOverMiddle.png)' }}></div>
        <Actualite />
        <ListeNovels />
      </div>
      <div>

      </div>
    </div>
  );
}
