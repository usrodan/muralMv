
import SEO from '@/components/SEO';
import { Fragment, useEffect, useState } from 'react';
import { Whatsapp } from "@styled-icons/bootstrap/Whatsapp"
import { Telegram } from "@styled-icons/boxicons-logos/Telegram"
import Info from '@/components/Info';
const Pagina = () => {
  return (
    <>
      <SEO siteName="Mais Vagas ES" title="Contato" description="" />
      <main className='flex flex-col w-full items-center ' >
        <section className="flex flex-col bg-white border border-gray-200 rounded-md gap-4 w-full max-w-7xl mt-4  ">
          <div className="xl:container xl:mx-auto py-12 lg:py-0">
            <div className="flex flex-col lg:flex-row justify-center items-center items-strech h-full ">
              <div className="lg:w-full 2xl:w-3/5 p-8">
                <h1 className="text-3xl lg:text-5xl font-bold text-gray-800 w-11/12">Entre em contato</h1>
                <p className="mt-3 lg:mt-4 text-base leading-normal text-gray-600 md:w-8/12 flex flex-col gap-5 ">
                  <span>Entre em contato conosco caso haja críticas, sugestões e elogios serão sempre bem-vindos!</span>

                 <Info cor="orange" texto='Pedimos encarecidamente para que não use este formulário para envio de currículo, nem tanto solicitação de vagas de emprego.'/> 
                 <span> Se você deseja divulgar/publicar uma vaga, <a className='underline font-semibold' href="/enviar">clique aqui</a>.</span>
                 
                </p>
              </div>
              <div className="lg:w-full 2xl:w-2/5 flex w-full bg-gray-50  flex-col justify-center px-5 py-5 md:px-7 md:py-7 lg:py-12 lg:px-20 mt-2 md:mt-6 lg:mt-0">
                <h2 className="text-lg font-semibold text-gray-800">Envie-nos uma mensagem</h2>
                <div className='rounded-md border border-gray-300 mt-4 md:mt-6'><input className=" rounded-md p-4 text-base text-gray-600 " type="text" aria-label="Nome" placeholder="Seu Nome" /></div>
                <div className='rounded-md border border-gray-300 mt-4 md:mt-6'><input className="rounded-md p-4 text-base text-gray-600 " type="email" aria-label="Email" placeholder="Seu E-mail" /></div>
                <textarea name="" id="" aria-label="Your message" placeholder="Message" className="w-full h-48 lg:h-36 xl:h-48 2xl:h-56 mt-4 md:mt-6 p-4 rounded-md border border-gray-300 resize-none text-base text-gray-600 focus:outline-none focus:border-gray-700"></textarea>
                <button className="bg-blue-500 hover:bg-blue-600 rounded-md mt-4 md:mt-5 leading-4 p-4 text-base font-medium text-white ">Enviar</button>
              </div>
            </div>
          </div>
        </section>
      </main>


    </>);
}

export default Pagina;