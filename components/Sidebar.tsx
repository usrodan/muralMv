/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import Image from "next/image"
import { Configs } from '@/configs'
import client from '@/utils/apollo'
import { gql } from "@apollo/client";

const Sidebar: React.FC = () => {

  const [cidades,setCidades] = useState([])
  const [tipos,setTipos] = useState([])
  const configsState = Configs.useState()

  async function getData(){
    const { data } = await client.query({
      query: gql` 
      query {
        cidades{data{attributes{Cidade}}}
        tipos{data{attributes{Tipo}}}
      }
    `,
    });
    console.log(data)
    setTipos(data.tipos.data)
    setCidades(data.cidades.data)
  } 
  useEffect(()=>{
    getData()
  },[])


  return (
    <div className="flex flex-col gap-8">
      <div id="AvisoResponsabilidade" className="flex flex-col bg-primary rounded-lg">
        <strong className="text-white text-center text-2xl p-4">AVISO</strong>
        <p className="bg-white bg-opacity-60 font-semibold text-black p-4 text-center">Não somos responsáveis pelas
          vagas publicadas.<br />
          Confira mais vagas em <a href="https://www.maisvagases.com.br">maisvagases.com.br</a>
        </p>
      </div>

      <div id="Filtros" className="flex flex-col gap-8 font-semibold ">
        <section>
          <strong className="text-primary text-lg">CIDADE</strong>
          <ul className="pl-2 mt-2">
            {cidades.map(cidade=> <li key={cidade.attributes.Cidade}  onClick={()=> Configs.update(s=> {s.city = cidade.attributes.Cidade})} className={`rounded-lg cursor-pointer p-2 uppercase ${configsState.city == cidade.attributes.Cidade ? "bg-gray-300" : "" }`}>{cidade.attributes.Cidade}</li>)}
            </ul>
        </section>
        <section>
          <strong className="text-primary text-lg ">TIPO DE VAGA</strong>
          <ul className="pl-2 mt-2">
            {tipos.map(tipo=> <li key={tipo.attributes.Tipo} onClick={()=> Configs.update(s=> {s.type = tipo.attributes.Tipo})} className={`rounded-lg cursor-pointer p-2 uppercase ${configsState.type == tipo.attributes.Tipo ? "bg-gray-300" : "" }`}>{tipo.attributes.Tipo}</li>)}
          </ul>
        </section>

      </div>

    </div>
  )
}

export default Sidebar