'use client'

import Eternalys from '@/app/(composents)/eternalysMain';
import ListeChapter from '../(composents)/listeChapter';

export default function EternalysMain() {

  return (
    <div>
      <div className='w-full'>
        <div className='w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 bg-gradient-to-b from-gray-800 to-indigo-600' style={{backgroundImage: 'url(/eternalysBg.png)'}}>
          <Eternalys />
          <ListeChapter />
        </div>
      </div>
    </div>
  );
}
