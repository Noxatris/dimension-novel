'use client'

import Eternalys from '@/app/(composents)/eternalysMain';
import ListeChapter from '../(composents)/listeChapter';
import Footer from '../(composents)/footer';
import Header from '../(composents)/header';

export default function EternalysMain() {

  return (
    <div>
      <Header />
      <div className='w-full flex flex-col items-center md:flex-row md:items-start md:justify-between md:min-h-[90vh] md:bg-[url(/eternalysBg.png)] shadowTest bg-center bg-cover'>
        <div className='flex flex-col xl:flex-row xl:justify-between'>
          <Eternalys />
          <ListeChapter />
        </div>
      </div>
      <Footer />
    </div>
  );
}
