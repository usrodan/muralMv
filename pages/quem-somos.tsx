
import SEO from '@/components/SEO';
import { Fragment, useEffect, useState } from 'react';
import { Whatsapp } from "@styled-icons/bootstrap/Whatsapp"
import { Telegram } from "@styled-icons/boxicons-logos/Telegram"
import Info from '@/components/Info';
const Pagina = () => {
  return (
    <>
      <SEO siteName="Mais Vagas ES" title="QuemSomos" description="" />
      <main className='flex flex-col w-full items-center ' >
        <section className="flex flex-col bg-white border border-gray-200 rounded-md gap-4 w-full max-w-7xl mt-4 p-4 ">
          <h2>Quem Somos</h2>
        </section>
      </main>


    </>);
}

export default Pagina;