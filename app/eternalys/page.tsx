'use client'

import Aside from '@/app/(composents)/asideEternalys';
import Eternalys from '@/app/(composents)/eternalysMain';
import ListeChapter from '../(composents)/listeChapter';

export default function EternalysMain() {

  return (
    <>
      <div className='w-full flex flex-col items-center md:flex-row md:items-start md:justify-between md:min-h-[90vh]'>
        <Aside />
        <Eternalys />
        <ListeChapter />
      </div>
    </>
  );
}
