/* This example requires Tailwind CSS v2.0+ */
import { useEffect, useState } from 'react'
import { Configs } from '@/configs'
import client from '@/utils/apollo'
import { gql } from "@apollo/client";
import { useRouter } from 'next/router'

const Sidebar: React.FC = () => {
  const router = useRouter()
  const [cidades, setCidades] = useState([])
  const [tipos, setTipos] = useState([])
  const configsState = Configs.useState()

  async function getData() {
    const { data } = await client.query({
      query: gql` 
      query {
        cidades{data{attributes{cidade}}}
        tipos{data{attributes{tipo}}}
      }
    `,
    });
    setTipos(data.tipos.data)
    setCidades(data.cidades.data)
  }
  useEffect(() => {
    getData()
  }, []) 

  function changeCity(str){
    Configs.update(s => { s.city = str })
    refreshPage()
  }
  function changeType(str){
    Configs.update(s => { s.type = str })
    refreshPage()
  }

  function refreshPage(){
    var queries = []
    configsState.search && queries.push(`"search": "${configsState.search}"`)
    configsState.city && queries.push(`"city": "${configsState.city}"`)
    configsState.type && queries.push(`"type": "${configsState.type}"`)

    router.push({
      pathname: '/',
      query: JSON.parse(`{${queries.join(",")}}`),
    })
  }


  return (
    <div className="flex flex-col gap-8">
      <div id="AvisoResponsabilidade" className="flex flex-col bg-blue-500 rounded-lg">
        <strong className="text-white text-center text-2xl p-4">⚠️ AVISO</strong>
        <p className="bg-white bg-opacity-60 font-semibold text-black p-4 text-center">Não somos responsáveis pelas
          vagas publicadas.<br />
          Confira mais vagas em <a href="https://www.maisvagases.com.br">maisvagases.com.br</a>
        </p>
      </div>

      <div id="Filtros" className="flex flex-col gap-8 font-semibold ">
        <section>
          <strong className="text-blue-500 text-lg">CIDADE</strong>
          <ul className="pl-2 mt-2">
            {cidades.map(cidade => <li key={cidade.attributes.cidade} onClick={() => changeCity(cidade.attributes.cidade)} className={`rounded-lg cursor-pointer p-2 uppercase ${configsState.city == cidade.attributes.cidade ? "bg-gray-300" : ""}`}>{cidade.attributes.cidade}</li>)}
          </ul>
        </section>
        <section>
          <strong className="text-blue-500 text-lg ">TIPO DE VAGA</strong>
          <ul className="pl-2 mt-2">
            {tipos.map(tipo => <li key={tipo.attributes.tipo} onClick={() => changeType(tipo.attributes.tipo)} className={`rounded-lg cursor-pointer p-2 uppercase ${configsState.type == tipo.attributes.tipo ? "bg-gray-300" : ""}`}>{tipo.attributes.tipo}</li>)}
          </ul>
        </section>

      </div>

    </div>
  )
}

export default Sidebar