export default function MesNovels() {
    return (
      <div className="w-[20vw] h-[91vh] flex flex-col items-center bg-black/65 p-4 overflow-x-hidden mt-[9vh]">
          <ul>
              <li>
                  <a href="/eternalys" className='flex flex-col w-[95%] rounded-xl overflow-hidden items-center'>
                      <img src="/cover.png" alt="" className='w-full h-[300px]' />
                      <p className='p-2 bg-black/60'>Eternalys : Éveil et Vengeance</p>
                  </a>
              </li>
          </ul>
      </div>
    );
  }