export default function EternalysMain() {
  return (
    <div className='w-full h-screen flex flex-col items-center pt-[9vh]'>
      <div className='w-full h-[50vh] bg-black/55 flex flex-col items-center bg-black/80 bg-top bg-cover' style={{ backgroundImage: 'url(coverClear.png)' }} >
        <div className="w-screen pt-8 px-4">
          <h1 className="font-[medievalSharp] text-2xl border-b-4 border-yellow-300 flex justify-center mb-8 pb-1 rounded-md">Eternalys : Éveil et Vengeance</h1>
          <div className="mb-4">
            <h2 className="ml-4 text-[1.2em] mb-1">Intrigue :</h2>
            <p>Donec nec congue urna, ut aliquam orci. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed ac molestie massa, sed gravida massa. Vestibulum vestibulum quam quis justo euismod rhoncus.</p>
          </div>
        </div>
        <a href="#" className="bg-black/80 p-2 mb-8 rounded-full border-2 border-violet-700 pointer-cursor">Univers et Personnages</a>
      </div>
      <ul className="overflow-y-scroll w-screen flex flex-col items-center bg-zinc-950">
        <h2 className="w-[90%] flex justify-center mt-4 text-[1.2em]">Liste des chapitres</h2>
        <div className="w-[50%] h-1 bg-yellow-300 rounded-full mb-2"></div>
        <div className="flex justify-around w-full my-6">
          <a href="#" className="bg-black/80 p-2 rounded-full border-2 border-violet-700 pointer-cursor">Lire le premier chapitre</a>
          <a href="#" className="bg-black/80 p-2 rounded-full border-2 border-violet-700 pointer-cursor">Lire le dernier chapitre</a>
        </div>
        <li className="border-l-4 border-violet-700 pl-2 py-2 mb-2 w-[92%]">
          <a href="#">
            <p>Chapitre 1 : Opération Interception Explosive</p>
          </a>
        </li>
        <li className="border-l-4 border-violet-800 pl-2 py-2 mb-2 w-[92%]">
          <a href="#">
            <p>Chapitre 2 : Récupération et évacuation</p>
          </a>
        </li>
        <li className="border-l-4 border-violet-800 pl-2 py-2 mb-2 w-[92%]">
          <a href="#">
            <p>Chapitre 3 : Négociation avec les Recycleurs</p>
          </a>
        </li>
      </ul>
    </div>
  );
}
