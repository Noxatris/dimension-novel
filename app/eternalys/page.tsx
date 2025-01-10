export default function EternalysMain() {
  return (
    <div className='w-full h-screen bg-center bg-cover bg-fixed flex justify-center pt-[9vh]' style={{ backgroundImage: 'url(/bgMain.jpg)' }}>
      <div className='w-full bg-black/55 flex flex-col items-center bg-top bg-cover' style={{ backgroundImage: 'url(cover.png)' }}>
        <div className="w-screen h-screen bg-black/80 pt-8">
          <div>
            <h1>Eternalys : Éveil et Vengeance</h1>
          </div>
          <div>
            <h2>Intrigue :</h2>
            <p>Une description géniale et captivante en devenir</p>
          </div>
        </div>
      </div>
    </div>
  );
}
