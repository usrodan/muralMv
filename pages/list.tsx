import slugify from "@/utils/slugify"
import { format } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz';

import React, { useEffect, useState } from 'react';
import client from '@/utils/apollo'
import { gql } from "@apollo/client";

export default function Index() {
  const [items, setItems] = useState([{ cargo: "mural.attributes.cargo", tipo: "mural.attributes.tipo", id: 0, date: "formatedData" }])
  const [dias, setDias] = useState([])
  useEffect(() => {
    getData()
  }, [])

  function titleize(str) {
   //pega apenas as palavras e tira todos os espaços em branco.
 return str.replace(/\w\S*/g, function(str) {

  //passa o primeiro caractere para maiusculo, e adiciona o todo resto minusculo
  return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
 });
  }

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
      let znDate = zonedTimeToUtc(mural.attributes.createdAt, 'America/Sao_Paulo');
      let formatedData = format(znDate, "dd/MM/yyy")
 
      
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
          {items && items.map(i => (a == i.date && <div key={i.id}>Cargo: {titleize(i.cargo)}<br />Tipo: {i.tipo}<br />Link: http://mural.maisvagases.com.br/{i.id}-{slugify(i.cargo)}<br /><br /></div>))}
        </section>)
      )}

    </main>)

}