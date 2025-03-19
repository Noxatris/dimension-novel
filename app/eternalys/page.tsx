'use client'

import Eternalys from '@/app/(composents)/eternalysMain';
import ListeChapter from '../(composents)/listeChapter';
import Footer from '../(composents)/footer';
import Header from '../(composents)/header';

export default function EternalysMain() {

  return (
    <div>
      <Header />
      <div className='w-full flex flex-col items-center md:flex-row md:items-start md:justify-between xl:bg-[url(/eternalysBg.png)] shadowTest bg-center bg-cover'>
        <div className='flex flex-col md:flex-row md:justify-between'>
          <Eternalys />
          <ListeChapter />
        </div>
      </div>
      <Footer />
    </div>
  );
}
