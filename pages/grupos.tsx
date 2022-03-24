
import SEO from '@/components/SEO';
import { Fragment, useEffect, useState } from 'react';
import client from '@/utils/apollo'
import { gql } from "@apollo/client";
import { Whatsapp } from "@styled-icons/bootstrap/Whatsapp"
import { Telegram } from "@styled-icons/boxicons-logos/Telegram"
import Info from '@/components/Info';
const Grupos = () => {
  const [grupos, setGrupos] = useState(null)


  async function getData() {
    const { data } = await client.query({
      query: gql`
      query {
        config {
          data {
            id
            attributes {
              Grupos (pagination:{limit:1000}){
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
      <SEO siteName="Mais Vagas ES" title="Grupos Whatsapp" description="" />
      <main className='flex flex-col w-full items-center ' >
        <section className="flex flex-col bg-white border border-gray-200 rounded-md gap-4 w-full max-w-7xl mt-4 p-4 ">
          <h1 className="mb-4 text-4xl  ">
            Grupos
          </h1>
          <span className="mb-4 w-full max-w-3xl">
            Estamos felizes em saber que você deseja participar do nosso grupo de vagas no WhatsApp.<br />
            Mas pedimos que dê preferência por entrar em nosso canal no <strong>Telegram.</strong> <br />
            Lá às vagas são postadas imediatamente assim que publicadas em nosso site.<br /> <br />

            Mas se preferir mesmo assim entrar no grupo do WhatsApp, disponibilizamos abaixo nossos grupos, caso o grupo esteja cheio, volte aqui e selecione outro grupo!<br /><br />

            <Info cor="orange" texto='É permitida somente a entrada/permanência em APENAS UM GRUPO, caso a gente entenda que você está em mais de um, nos sentimos no direito de lhe remover. O mesmo conteúdo é postado em todos os grupos'/>

          </span>

          <div className='flex'>
            <a href="https://t.me/maisvagases" target="_blank" rel="noreferrer" className="flex p-4 gap-4 text-white text-md font-semibold rounded-md items-center bg-telegram justify-between ">
              <Telegram size={35} />
              CANAL DO TELEGRAM
            </a>
          </div>



          <span className="mt-4 mb-2 ">
            <strong className="font-bold text-md">GRUPOS NO WHASTASPP</strong><br />
            Grupos em <strong className="text-red-500 font-bold  text-sm">VERMELHO</strong> estão possivelmente cheios! (com 250 pessoas ou mais)
          </span>


          <div className="grid grid-cols-4 gap-4 w-full max-w-7xl ">
            {grupos && grupos.map(grupo => (
              <a href={grupo.url} target="_blank" rel="noreferrer" className={`text-white flex gap-4 items-center p-4 rounded-lg ${!grupo.cheio ? "bg-green-500" : "bg-red-500"}`} key={grupo.titulo}>
                <Whatsapp size={35} />
                <div className='flex flex-col'>
                  <span className='font-semibold '>{grupo.titulo}</span>
                  <span className='opacity-70 -mt-1'>{!grupo.cheio ? "Disponível" : "Grupo Cheio"}</span>
                </div>
              </a>))}
          </div>
        </section>
      </main>


    </>);
}

export default Grupos;