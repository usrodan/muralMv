
import SEO from '@/components/SEO';
import SidebarLogged from '@/components/SidebarLogged';
import { Configs } from '@/configs'
import { useRouter } from 'next/router'
import CardJob from '@/components/CardJob';
import client from '@/utils/apollo'
import { gql } from "@apollo/client";
import React, { useEffect, useState } from 'react';
import CardJobAdmin from '@/components/CardJobAdmin';
const Pagina = () => {
  const [mural, setMural] = useState([])
  const ConfigsStore = Configs.useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ConfigsStore.loggedUser.id  > 0 && getData()
  }, [ConfigsStore.loggedUser])



  async function getData() {  
  const { data } = await client.query({
    query: gql` 
    query {
      murals(pagination:{limit:9999}, sort: ["createdAt:desc"],filters:{usuario:{id:{eq:"${ConfigsStore.loggedUser.id}"}}}) {
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
        meta {
          pagination {
            page
            pageSize
            total
            pageCount
          }
        }
      }
    }
  `,
  });
  setMural(data.murals.data)

  setTimeout(() => {
    setLoading(false)
  }, 1000);
} 

  return (
    <>
      <SEO siteName="Mais Vagas ES" title="Minhas Vagas" description="" />
      <main className='flex flex-col  w-full items-center ' >
        <div className='grid md:grid-cols-12 gap-4 w-full max-w-7xl'>
        <div className="hidden md:flex col-span-3 w-full">
          <SidebarLogged />
          </div>

          <div className='col-span-9 w-full min-h-full p-4 md:pt-10 md:pl-8 md:mb-10'>

            <h1>Minhas Vagas</h1>

            <section className=' md:p-10 gap-2 flex flex-col flex-1 w-full rounded-lg md:border border-gray-200 md:bg-white  '>
            {loading ?
                <div className="w-full gap-5 grid md:grid-cols-2 lg:grid-cols-3">
                  {Array(6).fill("").map((a, i) => (
                    <section key={i}>
                    <div  className="grid grid-cols-3 md:hidden animate-pulse  border border-gray-200   font-bold   rounded-lg bg-white">
                      <div className="rounded-l-lg object-cover bg-gray-200 h-auto w-full" />
                      <div className="w-full flex text-sm flex-col  col-span-2 gap-10 p-3">
                        <div className=" bg-gray-200 h-5 w-full rounded-xl" />
                        <div className="flex uppercase justify-between items-end gap-4  w-full">
                          <span className="flex flex-col justify-between w-full gap-2">
                            <div className=" bg-gray-200 h-3 w-full rounded-xl" />
                            <div className=" bg-gray-200 h-3 w-full rounded-xl" />
                          </span>
                          <span className="bg-gray-200 h-3 w-full rounded-full" />
                        </div>
                      </div> 
                    </div>
                    <div  className="hidden md:flex  animate-pulse h-72 lg:h-80 xl:h-96 border border-gray-200   font-bold flex-col  rounded-lg bg-white">
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
                    </div>
                    </section>)
                  )}
                </div>
                : mural.length ?
                  <div
                    className="w-full relative gap-5 grid "
                  > {mural.map((item, index) => {
                    return (<div key={index}>
                      {item.attributes.imagem && item.attributes.cargo && item.attributes.cidade && item.attributes.cidade.data && item.attributes.tipo && item.attributes.tipo.data && item.attributes.createdAt &&
                        <CardJobAdmin key={item.id} id={item.id} image={item.attributes.imagem.data.attributes.url} title={item.attributes.cargo} city={item.attributes.cidade.data.attributes.cidade} date={item.attributes.createdAt} color={item.attributes.tipo.data.attributes.cor} type={item.attributes.tipo.data.attributes.tipo} />
                      }  
                    </div>)
                  })}

                  </div>
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
            </section>

          </div>


        </div>

      </main>
    </>);
}

export default Pagina;