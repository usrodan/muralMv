import React, { Fragment, useEffect, useState } from 'react';
import slugify from "@/utils/slugify"
import client from '@/utils/apollo'
import { zonedTimeToUtc } from 'date-fns-tz';
import { gql } from "@apollo/client";
import axios from "axios"
import { format } from 'date-fns'
import { Images } from "@styled-icons/entypo/Images"
import { Trash } from "@styled-icons/bootstrap/Trash"
import { SpinnerCircularFixed } from "spinners-react";
import { HomeIcon } from '@heroicons/react/solid'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Show } from "@styled-icons/boxicons-regular/Show"
import { Hide } from "@styled-icons/boxicons-regular/Hide"
import Image from 'next/image'
import { LogOut } from "@styled-icons/entypo/LogOut"
import { List } from "@styled-icons/entypo/List"
import ArrowRightIcon from '@heroicons/react/outline/ArrowRightIcon';
import MailIcon from '@heroicons/react/outline/MailIcon';
import KeyIcon from '@heroicons/react/outline/KeyIcon';
import MD5 from "crypto-js/md5"
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { timezoneBrazil } from '@/utils/timezoneBrazil';
import SEO from '@/components/SEO';
import SidebarLogged from '@/components/SidebarLogged';

export default function Index() {
  const [items, setItems] = useState([])
  const [countImages, setCountImages] = useState(0)
  const [loadingImages, setLoadingImages] = useState(false)
  const [displayList, setDisplayList] = useState(false)
  const [userLogged, setUserLogged] = useState({ id: 0, nome: "", ativo: false, blocked: false })

  const [murais, setMurais] = useState([{ cargo: "mural.attributes.cargo", tipo: "mural.attributes.tipo", id: 0, date: "formatedData" }])
  const [dias, setDias] = useState([])
  const [counter, setCounter] = useState(0)

  const router = useRouter()

  useEffect(() => {
    let CookieSession = JSON.parse(localStorage.getItem("SessionMural"))
    CookieSession && CookieSession.token == String(MD5(CookieSession.user.username + CookieSession.user.id + CookieSession.user.email)) ? setUserLogged(CookieSession.user) : setUserLogged({ ativo: false, blocked: false, nome: "", id: 0 })
  }, [router])

  useEffect(() => {
    console.log(userLogged)
  }, [userLogged])

  function titleize(str) {
    return str.replace(/\w\S*/g, function (str) {
      return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
    });
  }
  async function getDataMuralList() {
    var posts = []
    var resultdias = []
    const { data } = await client.query({
      query: gql` 
        query {
          murals(pagination:{limit:200},sort: ["createdAt:desc"]) {
            data {
              id 
              attributes {
                cargo 
                createdAt 
                tipo{data{attributes{tipo}}}
              }
            }
          }
        }
      `,
    });
    data.murals.data.forEach(mural => {
      let formatedData = timezoneBrazil(mural.attributes.createdAt)
      posts.push({ cargo: mural.attributes.cargo, tipo: mural.attributes.tipo.data.attributes.tipo, id: mural.id, date: formatedData })
      if (!resultdias.includes(formatedData)) {
        resultdias.push(formatedData);
      }
    })
    setDias(resultdias)
    setMurais(posts)
  }

  const [selected, setSelected] = useState()

  const pages = [
    { name: 'Mural', href: '/', current: false },
    { name: 'Dashboard', href: '#', current: true },
  ]

  useEffect(() => {
    setSelected(dias[0])
  }, [dias])

  useEffect(() => {
    var count = 0
    murais.forEach(mural => {
      mural.date == selected && count++
    })
    setCounter(count)
  }, [selected])

  useEffect(() => {
    getDataNotUsedImages()
    getDataMuralList()
  }, [])

  function apagarImagens() {
    if (!loadingImages) {
      setLoadingImages(true)
      items.forEach((i, index) => {
        setTimeout(() => {
          apagarImage(i)
          setCountImages(index + 1)
          if (index + 1 == items.length) {
            setLoadingImages(false)
            setItems([])
            setCountImages(0)
          }
        }, index * 1000);
      })
    }
  }
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  function apagarImage(id) {
    //axios.delete(`${process.env.NEXT_PUBLIC_STRAPI}/api/upload/files/${id}/`)
  }

  async function getDataNotUsedImages() {

    const { data } = await client.query({
      query: gql`  
          query {
            uploadFiles(pagination:{limit:1000}){ 
              data{
                id
                attributes{ 
                  createdAt
                }
              }
            }
            murals(pagination:{limit:1000}) {
              data {
                id
                attributes {
                  imagem {
                    data {
                      id
                    }
                  }
                }
              }
            }
          }
        `,
    })

    var imgs = []
    var muralsImages = []

    var formattedHoje = format(new Date(), "yyyy-MM-dd")
    data.uploadFiles.data.map(u => {
      imgs.push({ id: u.id, createdAt: u.attributes.createdAt })
    })

    data.murals.data.map(u => {
      muralsImages.push(u.attributes.imagem.data.id)
    })

    var notFoundImages = []
    imgs.forEach(i => {
      if (muralsImages.indexOf(i.id) === -1 && (format(new Date(i.createdAt), "yyyy-MM-dd") != formattedHoje)) {
        notFoundImages.push(i.id)
      }
    })
    setItems(notFoundImages)
  }

  return (
    <main className="flex flex-col gap-4  items-center ">
      <SEO siteName="Mais Vagas ES" title="Dashboard" notIndexPage description="" />
      {(userLogged.id == 10 || userLogged.id == 12 || userLogged.id == 8) ?


        <section className='flex flex-col  w-full items-center ' >
          <div className='grid md:grid-cols-12 gap-4 w-full max-w-7xl'>
            <div className="hidden md:flex col-span-3 w-full">
              <SidebarLogged />
            </div>

            <div className='col-span-9 w-full min-h-full p-4 md:pt-10 md:pl-8 md:mb-10'>

              <div className="grid   gap-4 w-full max-w-7xl ">

                <nav className="flex justify-between" aria-label="Breadcrumb">
                  <ol role="list" className="flex items-center space-x-4">
                    <li>
                      <div>
                        <a href="#" className="text-gray-400 hover:text-gray-500">
                          <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                          <span className="sr-only">Home</span>
                        </a>
                      </div>
                    </li>
                    {pages.map((page) => (
                      <li key={page.name}>
                        <div className="flex items-center">
                          <svg
                            className="flex-shrink-0 h-5 w-5 text-gray-300"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                          </svg>
                          <a
                            href={page.href}
                            className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                            aria-current={page.current ? 'page' : undefined}
                          >
                            {page.name}
                          </a>
                        </div>
                      </li>
                    ))}
                  </ol>
                </nav>

                <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                  <div
                    className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg "
                  >
                    <dt>
                      <div className="absolute bg-blue-500 rounded-md p-3">
                        {loadingImages ?
                          <SpinnerCircularFixed size={24} thickness={180} speed={150} color="#FFF" secondaryColor="rgba(255, 255, 255, 0.15)" />
                          :
                          <Images className="h-6 w-6 text-white" aria-hidden="true" />
                        }

                      </div>
                      <p className="ml-16 text-sm font-medium text-gray-500 truncate">Imagens não utlizadas</p>
                    </dt>
                    <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                      <p className={`text-2xl font-semibold ${items.length - countImages > 0 ? "text-red-500" : "text-gray-500"}`}>{items.length - countImages}</p>
                      <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                        <div className="text-sm">
                          {items.length - countImages > 0 ?
                            <a href="#" onClick={apagarImagens} className="font-medium text-red-600 hover:text-red-500 flex gap-2 ">
                              <Trash size={20} />
                              Remover<span className="sr-only"> Remover</span>
                            </a>
                            :
                            <a href="#" className="font-medium text-gray-600 hover:text-gray-500 flex gap-2 ">
                              Nenhuma ação necessária<span className="sr-only"> Nenhuma ação necessária</span>
                            </a>}
                        </div>
                      </div>
                    </dd>
                  </div>

                  <div
                    className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg"
                  >
                    <dt>
                      <div className="absolute bg-blue-500 rounded-md p-3">
                        <List className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      <p className="ml-16 text-sm font-medium text-gray-500 truncate">Quantidade de Murais</p>
                    </dt>
                    <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                      <p className={`text-2xl font-semibold text-gray-500`}>{counter}</p>
                      <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-2 sm:px-6">
                        <div className="text-sm flex items-center justify-between">

                          <a href="#" onClick={() => setDisplayList(!displayList)} className="font-medium text-gray-600 hover:text-gray-500 flex items-center gap-2 ">
                            {displayList ? <><Hide size={24} /> Ocultar</> : <><Show size={24} /> Exibir</>}
                          </a>
                          <Listbox value={selected} onChange={setSelected}>
                            {({ open }) => (
                              <>
                                <div className="mt-1 relative">
                                  <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                                    <span className="block truncate">{selected}</span>
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                      <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </span>
                                  </Listbox.Button>
                                  <Transition
                                    show={open}
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                  >
                                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                      {dias.map((dia) => (
                                        <Listbox.Option
                                          key={dia}
                                          className={({ active }) =>
                                            classNames(
                                              active ? 'text-white bg-blue-600' : 'text-gray-900',
                                              'cursor-default select-none relative py-2 pl-3 pr-9'
                                            )
                                          }
                                          value={dia}
                                        >
                                          {({ selected, active }) => (
                                            <>
                                              <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                {dia}
                                              </span>

                                              {selected ? (
                                                <span
                                                  className={classNames(
                                                    active ? 'text-white' : 'text-blue-600',
                                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                                  )}
                                                >
                                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                      ))}
                                    </Listbox.Options>
                                  </Transition>
                                </div>
                              </>
                            )}
                          </Listbox>
                        </div>
                      </div>
                    </dd>
                  </div>
                </dl>
                {displayList && dias && dias.map(a => {
                  if (a == selected)
                    return (
                      <section className="" key={a}>
                        <span className="text-xl mt-20 font-bold text-blue-500 mb-0" >{a}</span>
                        {murais && murais.map(i => (a == i.date && <div key={i.id}>Cargo: {titleize(i.cargo)}<br />Tipo: {i.tipo}<br />Link: http://mural.maisvagases.com.br/{i.id}-{slugify(i.cargo)}<br /><br /></div>))}
                      </section>)
                }
                )}
              </div>

            </div>
          </div>
        </section>


        : <section className=" font-dm-sans bg-slate-light">
          <div className="mx-6 max-w-default md:m-auto py-20">
            <h1>Área restrita </h1>
            <span>Faça login para continuar</span>
          </div>
        </section>
      }
    </main>)

}