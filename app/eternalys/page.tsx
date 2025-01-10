export default function EternalysMain() {
  return (
    <div className='w-full h-screen flex justify-center pt-[9vh]'>
      <div className='w-full bg-black/55 flex flex-col items-center bg-top bg-cover' style={{ backgroundImage: 'url(cover.png)' }}>
        <div className="w-screen h-[20vh] bg-black/80 pt-8">
          <div>
            <h1>Eternalys : Éveil et Vengeance</h1>
          </div>
          <div>
            <h2>Intrigue :</h2>
            <p>Une description géniale et captivante en devenir</p>
          </div>
        </div>
        <ul className="overflow-y-scroll h-[40vh] bg-black/80 w-screen flex flex-col items-center">
          <h2 className="w-[90%] flex justify-center">Liste des chapitres</h2>
          <div className="w-[50%] h-1 bg-yellow-300 rounded-full mb-2"></div>
          <li className="border-l-4 border-violet-700 pl-2 py-2 mb-2 w-[92%]">
            <a href="#">
              <p>Chapitre 1 : Opération Interception Explosive</p>
            </a>
          </li>
          <li className="border-l-4 border-violet-800 pl-2 py-2 mb-2 w-[92%]">
            <a href="#">
              <p>Chapitre 2 : Opération Interception Explosive</p>
            </a>
          </li>
          <li className="border-l-4 border-violet-800 pl-2 py-2 mb-2 w-[92%]">
            <a href="#">
              <p>Chapitre 3 : Opération Interception Explosive</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
