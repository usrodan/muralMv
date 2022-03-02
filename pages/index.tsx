
import React, { useEffect, useState } from 'react';
import SEO from '@/components/SEO';
import Sidebar from '@/components/Sidebar';
import CardJob from '@/components/CardJob';
import { useRouter } from 'next/router';
import { Configs } from '@/configs'
import client from '@/utils/apollo'
import { gql } from "@apollo/client";

const IndexPage = ({ buildTimestamp }) => {
  const router = useRouter()
  const ConfigsStore = Configs.useState()
  const [mural,setMural] = useState([])
  const { search, city, type } = router.query
  useEffect(() => { 
    Configs.update(s => {
      s.search = search && String(search)
      s.city = city && String(city)
      s.type = type && String(type)
    }) 
  }, [search, city, type])
 
  useEffect(() => {

    var queries = []
    ConfigsStore.search && queries.push(`"search": "${ConfigsStore.search}"`)
    ConfigsStore.city && queries.push(`"city": "${ConfigsStore.city}"`)
    ConfigsStore.type && queries.push(`"type": "${ConfigsStore.type}"`)

     
    console.log()
  

    router.push({
      pathname: '/',
      query: JSON.parse(`{${queries.join(",")}}`),
    })
    getData()
  }, [ConfigsStore])

  async function getData() {
    var allQueries = []
    ConfigsStore.search && allQueries.push(`Cargo:{contains: "${ConfigsStore.search}"}`)
    ConfigsStore.city &&  allQueries.push(`cidade:{Cidade:{eq:"${ConfigsStore.city}"}}`)
    ConfigsStore.type && allQueries.push(`tipo:{Tipo:{eq:"${ConfigsStore.type}"}}`) 
   
    const { data } = await client.query({
      query: gql` 
      query {
        murals(filters:{${allQueries.join(",")}}) {
          data {
            id
            attributes {
              Cargo
              cidade{data{attributes{Cidade}}}
              data
              Imagem{data{attributes{url}}}
              tipo{data{attributes{Tipo}}}
            }
          }
        }
      }
    `,
    });
    //console.log(data.murals.data)
    setMural(data.murals.data)
  }
  return (
    <>
      <SEO siteName="Mais Vagas ES" title="Mural" description="" />
      <main className="flex w-full justify-center">
        <div className="flex flex-col gap-4 w-full max-w-7xl p-2  border-t-2 border-white">
          <strong className="text-center w-full py-4">Viu alguma vaga por ai e deseja compartilhar com mais gente? Aqui no nosso “Mural de Vagas” você pode fazer isso rápido e fácil.</strong>

          <section className="flex flex-col md:flex-row gap-10 ">
            <Sidebar /> 
            {mural.length ? <div className="w-full gap-5 grid sm:grid-cols-2 md:grid-cols-3">
              {mural.map(item=>{
                return(<CardJob image={item.attributes.Imagem.data.attributes.url} title={item.attributes.Cargo} city={item.attributes.cidade.data.attributes.Cidade} date={item.attributes.data} type={item.attributes.tipo.data.attributes.Tipo} />)
              })} 
            </div>
            :
            <div className="w-full  ">
              <p> Nenhuma vaga encontrada com os filtros selecionados.</p>
              <strong  className="pt-4 cursor-pointer" onClick={()=>{
               Configs.update(s => {
                s.search = ""
                s.city = ""
                s.type = ""
              })
              }}>Limpar Filtros</strong>
              </div>
            }
 
            

          </section>
        </div>
      </main>
    </>);
}

export const getStaticProps = () => {
  return {
    props: {
      buildTimestamp: Date.now()
    }
  }
}
export default IndexPage;