export default function Home() {
  return (
    <div className="w-screen overflow-x-hidden">
      <div className="w-full h-screen bg-center bg-cover relative" style={{ backgroundImage: 'url(/bgMain.jpg)' }}>
        <div className="w-full h-screen bg-center bg-cover animate-[blurEffectSide_4s_ease-in-out_infinite_alternate] absolute" style={{ backgroundImage: 'url(/bgOverSide.png)' }}></div>
        <div className="w-full h-screen bg-center bg-cover animate-[blurEffectMiddle_4s_ease-in-out_infinite_alternate] absolute" style={{ backgroundImage: 'url(/bgOverMiddle.png)' }}></div>
        <div>
          <h1>Dimension Novel</h1>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
}
