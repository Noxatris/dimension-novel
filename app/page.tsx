import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-cover relative" style={{ backgroundImage: 'url(/bgMain.jpg)' }}>
      <div className="w-screen h-screen bg-cover animate-[blurEffectSide_4s_ease-in-out_infinite_alternate] absolute" style={{ backgroundImage: 'url(/bgOverSide.png)' }}></div>
      <div className="w-screen h-screen bg-cover animate-[blurEffectMiddle_4s_ease-in-out_infinite_alternate] absolute" style={{ backgroundImage: 'url(/bgOverMiddle.png)' }}></div>
    </div>
  );
}
