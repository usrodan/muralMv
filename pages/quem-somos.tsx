
import SEO from '@/components/SEO';
import { Fragment, useEffect, useState } from 'react';
import { Whatsapp } from "@styled-icons/bootstrap/Whatsapp"
import { Telegram } from "@styled-icons/boxicons-logos/Telegram"
import Image from 'next/image';
const Pagina = () => {

  const people = [
    {
      name: 'Ronaldo Rangel',
      role: 'Fundador / UI Designer',
      place: "Serra / Brasil",
      imageUrl:
        '/ronaldo.png',
      bio:
        'Há mais de 5 anos desenvolvendo interfaces amigáveis pelo ES',
      twitterUrl: '#',
      linkedinUrl: 'https://www.linkedin.com/in/ronaldojrangel/',
    },
    {
      name: 'Danilo Facco',
      role: 'Frontend Developer',
      place: "Lisboa / Portugal",
      imageUrl:
        '/danilo.jpg',
      bio:
        'Há mais de 13 anos desenvolvendo sites incríveis pelo mundo (literalmente 😄).',
      twitterUrl: '#',
      linkedinUrl: 'https://www.linkedin.com/in/danilofacco/',
    }, 
  ]

  return (
    <>
      <SEO siteName="Mais Vagas ES" title="Quem Somos" description="" />
      <main className='flex flex-col w-full items-center ' > 
        <section className="flex flex-col bg-white border border-gray-200 rounded-md gap-4 w-full max-w-7xl mt-4 p-4 "> 

          <div className="bg-white">
            <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
              <div className="space-y-12 lg:grid lg:grid-cols-4 lg:gap-8 lg:space-y-0">
                <div className="space-y-5 col-span-2 sm:space-y-4">
                  <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Quem somos</h2>
                  <p className="text-xl text-gray-500">
                  O Mais Vagas ES é uma plataforma oferecida gratuitamente com o intuito de ajudar a todos conseguirem seu primeiro emprego ou a se recolocar no mercado de trabalho.<br/><br/>
                  Por isso nossa missão é garantir diariamente a divulgação de vagas de emprego, concursos e estágios em todo o Espírito Santo.<br/><br/>
                  </p>
                  <Image   alt="Mais Vagas ES" width={200} height={37} src="/maisvagases.svg"/>
                </div>
                <div className="lg:col-span-2 relative pt-8 lg:-top-20">
                  <ul

                    className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:gap-x-8"
                  >
                    {people.map((person) => (
                      <li key={person.name}>
                        <div className="space-y-4">
                          <div className="aspect-w-3 aspect-h-2">
                            <Image className="object-cover shadow-lg rounded-lg" height={500} width={500} src={person.imageUrl} alt={person.name} />
                          </div>
                          <div className="text-lg leading-6 font-medium ">
                            <h3 className='text-2xl -mb-0.5'>{person.name}</h3>
                           
                            <p className="text-blue-600 -mb-0.5">{person.role}</p>
                            <span className="text-gray-400 text-sm   ">{person.place}</span>
                            
                          </div>
                          <div className="text-lg">
                            <p className="text-gray-500">{person.bio}</p>
                          </div>

                          <ul className="flex space-x-5">
                             
                            <li>
                              <a href={person.linkedinUrl} className="text-gray-400 hover:text-gray-500">
                                <span className="sr-only">LinkedIn</span>
                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div> 
        </section>
      </main>


    </>);
}

export default Pagina;