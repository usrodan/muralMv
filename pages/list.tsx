import slugify from "@/utils/slugify"

import React, { useEffect, useState } from 'react';
import SEO from '@/components/SEO';
import Sidebar from '@/components/Sidebar';
import CardJob from '@/components/CardJob';
import { useRouter } from 'next/router';
import { Configs } from '@/configs'
import client from '@/utils/apollo'
import { gql } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";
import { SpinnerCircularFixed } from "spinners-react";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline"


export default function Index() {
  const [items, setItems] = useState([{ cargo: "mural.attributes.cargo", tipo: "mural.attributes.tipo", id: 0, date: "formatedData" }])
  const [dias, setDias] = useState([])
  useEffect(() => {
    getData()
  }, [])

  async function getData() {
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
      let d = mural.attributes.createdAt.split("-")
      let formatedData = `${d[2].split("T")[0]}-${d[1]}-${d[0]}`
      
      posts.push({ cargo: mural.attributes.cargo, tipo: mural.attributes.tipo.data.attributes.tipo, id: mural.id, date: formatedData })
      console.log(formatedData)
      if (!resultdias.includes(formatedData)) {
        resultdias.push(formatedData);
      }

    })
    setDias(resultdias)
    setItems(posts)
  }



  return (
    <main className="flex flex-col gap-4 p-20 ">
      {dias && dias.map(a => (
        <section key={a}>
          <span className="text-xl  mt-20 font-bold text-blue-500 mb-0" >{a}</span>
          {items && items.map(i => (a == i.date && <div key={i.id}>Cargo: {i.cargo}<br />Tipo: {i.tipo}<br />Link: http://mural.maisvagases.com.br/{i.id}-{slugify(i.cargo)}<br /><br /></div>))}
        </section>)
      )}

    </main>)

}