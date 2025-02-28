'use client'

import Aside from '@/app/(composents)/asideEternalys';
import Eternalys from '@/app/(composents)/eternalysMain';
import ListeChapter from '../(composents)/listeChapter';
import Footer from '../(composents)/footer';
import Header from '../(composents)/header';
import AsideRight from '../(composents)/asideRightEternalys';

export default function EternalysMain() {

  return (
    <div>
      <Header />
      <div className='w-full flex flex-col items-center md:flex-row md:items-start md:justify-between md:min-h-[90vh]'>
        <Aside />
        <div className='flex flex-col xl:flex-row xl:justify-center'>
          <Eternalys />
          <ListeChapter />
        </div>
        <AsideRight />
      </div>
      <Footer />
    </div>
  );
}
