import slugify from "@/utils/slugify"

import React, { useEffect, useState } from 'react';
import client from '@/utils/apollo'
import { gql } from "@apollo/client";
import axios from "axios"
import { uptime } from "process";

export default function Index() {
  const [items, setItems] = useState([])
  useEffect(() => {
    getData()
  }, [])

  function apagarImage(id){
    axios.delete(`${process.env.NEXT_PUBLIC_STRAPI}/api/upload/files/${id}/`).then(res=>{
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

    data.uploadFiles.data.map(u => {
      imgs.push(u.id)
    })

    data.murals.data.map(u => {
      muralsImages.push(u.attributes.imagem.data.id)
    }) 

    var notFoundImages = []
    imgs.forEach(i=>{
      if(muralsImages.indexOf(i) === -1){
        notFoundImages.push(i)
      }
    })
    setItems(notFoundImages) 
  };



  return (
    <main className="flex flex-col gap-4 p-20 ">
      {items && items.map(i=>(<span onClick={()=>apagarImage(i)}className="bg-gray-500 text-white cursor-pointer w-20 flex justify-center p-2 rounded-lg" key={i}>{i}</span>))} 


      <>
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        Badge
      </span>
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        Badge
      </span>
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        Badge
      </span>
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        Badge
      </span>
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        Badge
      </span>
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
        Badge
      </span>
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
        Badge
      </span>
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
        Badge
      </span>
    </>
    </main>)

}