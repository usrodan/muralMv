
import SEO from '@/components/SEO';
import { Fragment, useEffect, useState } from 'react';
import client from '@/utils/apollo'
import { gql } from "@apollo/client";
import { Whatsapp } from "@styled-icons/bootstrap/Whatsapp"
import { Telegram } from "@styled-icons/boxicons-logos/Telegram"
const Grupos = () => {
  const [grupos, setGrupos] = useState(null)


  async function getData() {
    const { data } = await client.query({
      query: gql`query {
        config {
          data {
            id
            attributes {
              Grupos {
                titulo
                url
                cheio
              }
            }
          }
        }
      }
      `,
    });
    console.log(data.config.data.attributes.Grupos)
    setGrupos(data.config.data.attributes.Grupos)

  }

  useEffect(() => {
    getData()
  }, [])


  return (
    <>
      <SEO siteName="Mais Vagas ES" title="Enviar Vaga" description="" />
      <main className='flex flex-col w-full items-center ' >
        <section className="flex flex-col bg-white border border-gray-200 rounded-md gap-4 w-full max-w-7xl mt-4 p-4 ">
          <h1 className="mb-4 text-4xl  ">
            Grupos
          </h1>
          <span className="mb-4 w-full max-w-3xl">
            Ficamos felizes em saber que você deseja participar do nosso grupo de vagas no WhatsApp.<br />
            Mas pedimos que dê preferência por entrar em nosso canal no <strong>Telegram.</strong> <br />
            Lá às vagas são postadas <strong>imediatamente</strong> assim que publicadas em nosso site.<br /> <br />

            Mas se preferir mesmo assim entrar no grupo do WhatsApp, disponibilizamos abaixo nossos grupos, caso o grupo esteja cheio, volte aqui e selecione outro grupo!
          </span>

          <div className='flex'>
            <a href="https://t.me/maisvagases" target="_blank" rel="noreferrer" className="flex p-4 gap-4 text-white text-md font-semibold rounded-md items-center bg-telegram justify-between ">
              <Telegram size={35} />
              CANAL DO TELEGRAM
            </a>
          </div>



          <span className="mt-4 mb-2 ">
            <strong className="font-bold text-md">GRUPOS NO WHASTASPP</strong><br />
            Grupos em <strong className="text-red-500 font-bold  text-sm">VERMELHO</strong> estão possivelmente cheios!<br />
            [98% ocupados]
          </span>


          <div className="grid grid-cols-4 gap-4 w-full max-w-7xl ">
            {grupos && grupos.map(grupo => (
              <a href={grupo.url} target="_blank" rel="noreferrer" className={`text-white flex gap-4 items-center p-4 rounded-lg ${grupo.cheio ? "bg-green-500" : "bg-red-500"}`} key={grupo.titulo}>
                <Whatsapp size={35} />
                <div className='flex flex-col'>
                  <span className='font-semibold '>{grupo.titulo}</span>
                  <span className='opacity-70 -mt-1'>{grupo.cheio ? "Disponível" : "Grupo Cheio"}</span>
                </div>
              </a>))}
          </div>
        </section>
      </main>


    </>);
}

export default Grupos;