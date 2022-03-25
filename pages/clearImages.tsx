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


     
    </main>)

}