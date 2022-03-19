
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
  const [mural, setMural] = useState([])
  const [loading, setLoading] = useState(true)
  const { search, city, type } = router.query
  useEffect(() => {
    Configs.update(s => {
      s.search = search && String(search)
      s.city = city && String(city)
      s.type = type && String(type)
    })
  }, [search, city, type])

  useEffect(() => {

    getData()
  }, [ConfigsStore])

  async function getData() {
    setLoading(true)
    var allQueries = []
    ConfigsStore.search && allQueries.push(`cargo:{contains: "${ConfigsStore.search}"}`)
    ConfigsStore.city && allQueries.push(`cidade:{cidade:{eq:"${ConfigsStore.city}"}}`)
    ConfigsStore.type && allQueries.push(`tipo:{cipo:{eq:"${ConfigsStore.type}"}}`)

    const { data } = await client.query({
      query: gql` 
      query {
        murals(sort: ["createdAt:desc"],filters:{${allQueries.join(",")}}) {
          data {
            id 
            attributes {
              cargo
              cidade{data{attributes{cidade}}}
              createdAt
              imagem{data{attributes{
                url
              }}}
              tipo{data{attributes{tipo}}}
            }
          }
        }
      }
    `,
    });
    //console.log(data.murals.data)
    setMural(data.murals.data)
    setTimeout(() => { 
      setLoading(false)
    }, 1000);
  }
  return (
    <>
      <SEO siteName="Mais Vagas ES" title="Mural" description="" />
      <main className="flex w-full justify-center">
        <div className="flex flex-col gap-4 w-full max-w-7xl p-2  border-t-2 border-white">
          <strong className="text-center w-full py-4">Viu alguma vaga por ai e deseja compartilhar com mais gente? Aqui no nosso “Mural de Vagas” você pode fazer isso rápido e fácil.</strong>

          <section className="grid md:grid-cols-12 gap-8 ">
            <div className="md:col-span-3">
              <Sidebar />
            </div>
            <div className="md:col-span-9 ">
              {loading &&
                <div className="w-full gap-5 grid sm:grid-cols-2 lg:grid-cols-3">
                  {Array(6).fill("").map((a, i) => (
                    <div key={i} className="flex  animate-pulse h-72 lg:h-80 xl:h-96 border border-gray-200   font-bold flex-col  rounded-lg bg-white">
                      <div className="rounded-t-lg object-cover bg-gray-200 h-52 lg:h-72 xl:h-80 w-full" />
                      <div className="w-full flex text-sm flex-col gap-2 p-2">
                        <div className=" bg-gray-200 h-5 w-full rounded-full" />
                        <div className="flex uppercase justify-between gap-4  w-full">
                          <span className="flex flex-col justify-between w-full gap-4">
                            <div className=" bg-gray-200 h-4 w-full rounded-full" />
                            <div className=" bg-gray-200 h-4 w-full rounded-full" />
                          </span>
                          <span className="bg-gray-200 h-4 w-full rounded-full" />
                        </div>
                      </div>

                    </div>)
                  )}
                </div>
              }

              {!loading && mural.length ? <div className="w-full gap-5 grid sm:grid-cols-2 lg:grid-cols-3">
                {mural.map(item => {
                  return (<CardJob key={item.id} id={item.id} image={item.attributes.imagem.data.attributes.url} title={item.attributes.cargo} city={item.attributes.cidade.data.attributes.cidade} date={item.attributes.createdAt} type={item.attributes.tipo.data.attributes.tipo} />)
                })}
              </div>
                :
                <div className="w-full  ">
                  <p> Nenhuma vaga encontrada com os filtros selecionados.</p>
                  <strong className="pt-4 cursor-pointer" onClick={() => {
                    Configs.update(s => {
                      s.search = ""
                      s.city = ""
                      s.type = ""
                    })
                  }}>Limpar Filtros</strong>
                </div>
              }
            </div>



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