import React, { useEffect, useState } from 'react';
import client from '@/utils/apollo'
import { gql } from "@apollo/client";
import axios from "axios"
import { format } from 'date-fns'
import { Images } from "@styled-icons/entypo/Images"
import { Trash } from "@styled-icons/bootstrap/Trash"
import { SpinnerCircularFixed } from "spinners-react";
import { HomeIcon } from '@heroicons/react/solid'

export default function Index() {
  const [items, setItems] = useState([])
  const [countImages, setCountImages] = useState(0)
  const [loadingImages, setLoadingImages] = useState(false)

  const pages = [
    { name: 'Mural', href: '/', current: false },
    { name: 'Dashboard', href: '#', current: true },
  ]

  useEffect(() => {
    getData()
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

  function apagarImage(id) {
    axios.delete(`${process.env.NEXT_PUBLIC_STRAPI}/api/upload/files/${id}/`).then(res => {
      console.log(res.data)
    })
  }

  async function getData() {

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
      console.log(i)
      if (muralsImages.indexOf(i.id) === -1 && (format(new Date(i.createdAt), "yyyy-MM-dd") != formattedHoje)) {
        notFoundImages.push(i.id)
      }
    })
    setItems(notFoundImages)
  }

  return (
    <main className="flex flex-col gap-4 p-8 items-center ">
      <div className="grid   gap-4 w-full max-w-7xl ">
        <nav className="flex" aria-label="Breadcrumb">
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
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
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
              <p className={`text-2xl font-semibold ${items.length - countImages > 0 ? "text-red-500": "text-gray-500"}`}>{items.length - countImages}</p>
              <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                {items.length - countImages > 0 ? 
                 <a href="#" onClick={apagarImagens} className="font-medium text-red-600 hover:text-red-500 flex gap-2 ">
                 {' '}

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
        </dl>

      </div>
      {
      /*
      items && items.map(i => (<span onClick={() => apagarImage(i)} className="bg-gray-500 text-white cursor-pointer w-20 flex justify-center p-2 rounded-lg" key={i}>{i}</span>))
      */}

    </main>)

}