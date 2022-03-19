
import SEO from '@/components/SEO';
import Sidebar from '@/components/Sidebar';
import client from '@/utils/apollo'
import { gql } from "@apollo/client";
import Image from "next/image"
import { ShareIos } from "@styled-icons/fluentui-system-filled/ShareIos"
import { InfoCircle } from "@styled-icons/boxicons-regular/InfoCircle"
import { Telegram } from "@styled-icons/boxicons-logos/Telegram"
import { Whatsapp } from "@styled-icons/boxicons-logos/Whatsapp"
import { ExclamationOctagon } from "@styled-icons/bootstrap/ExclamationOctagon"
import {format} from 'date-fns'

const IndexPage = ({ buildTimestamp,mural }) => {  
  const formatedData = format(new Date(mural.data || '2022-03-03T10:00:38.765Z' ),"dd/MM/yyy")
  return (
    <>
      <SEO siteName="Mais Vagas ES" title="Mural" description="" />
      <main className="flex w-full justify-center">
        <div className="flex flex-col gap-4 w-full max-w-7xl p-2  border-t-2 border-white">
          <strong className="text-center w-full py-4">Viu alguma vaga por ai e deseja compartilhar com mais gente? Aqui no nosso “Mural de Vagas” você pode fazer isso rápido e fácil.</strong>

          <section className="grid md:grid-cols-12 gap-8 ">
            <div className="col-span-12 md:col-span-3">
              <Sidebar />
            </div>
            <div className="col-span-12 md:col-span-9 ">
              {mural ? <div className="w-full grid sm:grid-cols-2 bg-white rounded-lg border border-gray-300">
               
                  <Image className="rounded-l-lg  " alt={mural.cargo} width={mural.imgW} height={mural.imgH} src={mural.image || "https://placehold.jp/ffffff/ffffff/256x310.png?text=%20"} />
                 
                <div className="flex flex-col justify-between p-5 ">
                  <section className="flex flex-col gap-3">
                    <strong className="text-blue-500 uppercase text-3xl ">{mural.cargo}</strong>
                    <span className="text-base uppercase font-semibold">{mural.cidade} • {formatedData}</span>
                    <span className="text-base uppercase font-semibold">{mural.tipo}</span>

                    <div className="flex  hover:opacity-60 cursor-pointer gap-2 border p-2 border-gray-800 rounded-lg text-center justify-center w-full">
                      <ShareIos size={24} />
                      <span className="font-semibold text-base">COMPARTILHAR ESSA VAGA</span>
                    </div>
                  </section>

                  <section className="flex flex-col gap-5">
                    <div className="w-full flex items-center">
                      <div className="flex flex-1 mr-2 h-0.5 border-t border-dashed border-gray-800" />
                      <span style={{fontFamily: 'Pacifico'}} className="text-center text-2xl ">quer mais vagas?</span>
                      <div className="flex flex-1 ml-2 h-0.5  border-t border-dashed border-gray-800" />
                    </div>

                    <div className="bg-teal-100 border-t-4 flex p-3 text-teal-900 gap-2 border-teal-500">
                      <div className="w-8 h-8"><InfoCircle size={32} /></div>
                      <p className="flex flex-col">
                        <span className="text-sm font-bold">Fique por dentro de outras vagas de emprego</span>
                        <span className="text-xs">Entre em um de nossos grupos e saia na frente!</span>
                      </p>

                    </div>

                    <div className="grid md:grid-cols-2 gap-4 w-full text-white text-xs font-semibold text-center">
                      <div className="flex bg-whatsapp hover:bg-opacity-60 cursor-pointer items-center rounded-lg p-2 w-full gap-2 ">
                        <Whatsapp size={20} />
                        GRUPO NO WHATSAPP
                      </div>

                      <div className="flex bg-telegram  hover:bg-opacity-60 cursor-pointer items-center rounded-lg p-2 w-full gap-2">
                        <Telegram size={20} />
                        CANAL NO TELEGRAM
                      </div>
                    </div>

                    <div className="text-red-500  hover:opacity-60 cursor-pointer flex gap-2 font-semibold">
                      <ExclamationOctagon size={20} />
                      <span>DENUNCIAR VAGA</span>
                    </div>

                  </section>
                </div>
              </div>
                :
                <div className="w-full  ">
                  <p>Nenhuma vaga encontrada.</p>
                </div>
              }
            </div>




          </section>
        </div>
      </main >
    </>);
}

export async function  getServerSideProps ({ params })  {
 
  const { data } = await client.query({
    query: gql` 
    query {
      mural(id: "${params.id}") {
        data {
          id
          attributes {
            cargo
            createdAt
            cidade{data{attributes{cidade}}}
            imagem{data{attributes{
              url
              height
              width
            }}}
            tipo{data{attributes{tipo}}}
          }
        }
      }
    }
  `,
  }); 

  return {
    props: {
      mural: {
        image: data.mural.data.attributes.imagem.data.attributes.url,
        cargo: data.mural.data.attributes.cargo,
        cidade:data.mural.data.attributes.cidade.data.attributes.cidade,
        tipo: data.mural.data.attributes.tipo.data.attributes.tipo,
        imgH: Number(data.mural.data.attributes.imagem.data.attributes.height),
        imgW: Number(data.mural.data.attributes.imagem.data.attributes.width),
      },
      buildTimestamp: Date.now()
    }
  }
}
 
export default IndexPage;