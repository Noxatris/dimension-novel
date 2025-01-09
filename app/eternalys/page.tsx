import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'

export default function EternalysMain() {
  return (
    <div className='w-full h-[90vh] bg-center bg-cover bg-fixed flex justify-center' style={{ backgroundImage: 'url(/bgMain.jpg)' }}>
      <div className='w-[85%] bg-black/55 p-10 h-[2000px] bg-local'>
        <div>
          <h1>Eternalys : Éveil et Vengeance</h1>
        </div>
        <div>
          <h2>Intrigue :</h2>
          <p>Une description géniale et captivante en devenir</p>
        </div>
      </div>
    </div>
  );
}
