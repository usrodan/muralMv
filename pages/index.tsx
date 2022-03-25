
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
import Script from 'next/script';
import Info from '@/components/Info';

const IndexPage = ({ buildTimestamp }) => {
  const router = useRouter()
  const ConfigsStore = Configs.useState()
  const [mural, setMural] = useState([])
  const [loading, setLoading] = useState(true)
  const { search, city, type } = router.query
  const limit = 9
  const [start, setStart] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    setStart(0)
    setHasMore(true)
    Configs.update(s => {
      s.search = search && String(search)
      s.city = city && String(city)
      s.type = type && String(type)
    })
  }, [search, city, type])


  useEffect(() => {
    Configs.update(s => {
      s.pageType = "home"
    })
  }, [])


  useEffect(() => {
    getData()
  }, [ConfigsStore.search, ConfigsStore.city, ConfigsStore.type, start])

  function loadMore() {
    setStart(start + limit)
  }

  async function getData() {
    setLoading(true)
    var allQueries = []
    ConfigsStore.search && allQueries.push(`cargo:{containsi: "${ConfigsStore.search}"}`)
    ConfigsStore.city && allQueries.push(`cidade:{slug:{eq:"${ConfigsStore.city}"}}`)
    ConfigsStore.type && allQueries.push(`tipo:{slug:{eq:"${ConfigsStore.type}"}}`)
    var pagination = `pagination:{limit:${limit},start:${start}} ,`

    const { data } = await client.query({
      query: gql` 
      query {
        murals(${pagination} sort: ["createdAt:desc"],filters:{${allQueries.join(",")}}) {
          data {
            id 
            attributes {
              cargo
              cidade{data{attributes{cidade}}}
              createdAt
              imagem{data{attributes{
                url
              }}}
              tipo{data{attributes{tipo,cor}}}
            }
          }
        }
      }
    `,
    });

    var newMural = start == 0 ? [] : mural

    data.murals.data.forEach(m => {
      if (newMural.indexOf(m) === -1) {
        newMural.push(m)
      }
    })

    if (data.murals.data.length < limit) {
      setHasMore(false)
    } else {
      setHasMore(true)
    }
    setMural(newMural)

    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }
  return (
    <>
      <SEO siteName="Mais Vagas ES" title="Mural" description="" />
      <main className="flex w-full justify-center">
        <div className="flex flex-col gap-4 w-full max-w-7xl p-2 ">
          <Info texto='Viu alguma vaga por ai e deseja compartilhar com mais gente? Aqui no nosso “Mural de Vagas” você pode fazer isso rápido e fácil.' />
          <section className="grid md:grid-cols-12 gap-8 ">
            <div className="md:col-span-3">
              <Sidebar />
            </div>
            <div className="md:col-span-9 ">
              {(!!ConfigsStore.search || !!ConfigsStore.city || !!ConfigsStore.type) &&
                <div className="flex flex-wrap gap-3 text-sm mb-3 items-center" >
                  <span className="">Filtros selecionados:</span>
                  {ConfigsStore.search && <button onClick={() => Configs.update(s => { s.search = "" })} className='flex gap-2 justify-between items-center bg-gray-200 rounded-lg p-1 px-2'>{ConfigsStore.search} <CloseOutline size={16} /></button>}
                  {ConfigsStore.type && <button onClick={() => Configs.update(s => { s.type = "" })} className='flex gap-2 justify-between items-center bg-gray-200 rounded-lg p-1 px-2'>{ConfigsStore.type} <CloseOutline size={16} /></button>}
                  {ConfigsStore.city && <button onClick={() => Configs.update(s => { s.city = "" })} className='flex gap-2 justify-between items-center bg-gray-200 rounded-lg p-1 px-2'>{ConfigsStore.city} <CloseOutline size={16} /></button>}
                </div>
              }
              <div className="flex md:hidden p-2 mb-4">
                <ins className="adsbygoogle"
                  style={{ display: "block" }}
                  data-ad-client="ca-pub-6873518969054710"
                  data-ad-slot="4261867962"
                  data-ad-format="auto"
                  data-full-width-responsive="true"></ins>
                <Script id={`MURAL-BLOCO-HOME-MOB`} >
                  {`(adsbygoogle = window.adsbygoogle || []).push({ });`}
                </Script>
              </div>
              {loading && start == 0 ?
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
                : mural.length ?
                  <InfiniteScroll
                    className="w-full relative gap-5 grid sm:grid-cols-2 lg:grid-cols-3 "
                    dataLength={mural.length}
                    next={loadMore}
                    hasMore={hasMore}
                    loader={
                      <div className=" col-span-1 sm:col-span-2 lg:col-span-3  flex justify-center w-full">
                        <SpinnerCircularFixed size={40} thickness={180} speed={150} color="#3B82F6" secondaryColor="rgba(255, 255, 255, 0.15)" />
                      </div>
                    }
                    endMessage={
                      <div className=" col-span-1 sm:col-span-2 lg:col-span-3  flex justify-center w-full">
                        Não há mais vagas por enquanto! Volte em breve.
                      </div>

                    }
                  > {mural.map((item, index) => {
                    return (<>
                      {item.attributes.imagem && item.attributes.cargo && item.attributes.cidade && item.attributes.cidade.data && item.attributes.tipo && item.attributes.tipo.data && item.attributes.createdAt &&
                        <CardJob key={item.id} id={item.id} image={item.attributes.imagem.data.attributes.url} title={item.attributes.cargo} city={item.attributes.cidade.data.attributes.cidade} date={item.attributes.createdAt} color={item.attributes.tipo.data.attributes.cor} type={item.attributes.tipo.data.attributes.tipo} />
                      }

                      {index == 2 && <div className='md:col-span-3'>
                        <ins className="adsbygoogle"
                          style={{ display: "block" }}
                          data-ad-client="ca-pub-6873518969054710"
                          data-ad-slot="9981136491"
                          data-ad-format="auto"
                          data-full-width-responsive="true"></ins>
                        <Script id="HOME-AFTER-3-MURALS" >
                          {`(adsbygoogle = window.adsbygoogle || []).push({ });`}
                        </Script>
                      </div>}

                      {index == 6 || index == 13 || index == 20 || index == 25 || index == 32 || index == 40 && <div className=''>
                        <ins className="adsbygoogle"
                          style={{ display: "block", width: "350px", height: "430px" }}
                          data-ad-client="ca-pub-6873518969054710"
                          data-ad-slot="5850319795"
                          data-ad-format="auto"
                          data-full-width-responsive="true"></ins>
                        <Script id={`MURAL-CARDJOBS-${index}`} >
                          {`(adsbygoogle = window.adsbygoogle || []).push({ });`}
                        </Script>
                      </div>}
                    </>)
                  })}

                  </InfiniteScroll>
                  :
                  <div className="w-full">
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