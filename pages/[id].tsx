
import SEO from '@/components/SEO';
import Sidebar from '@/components/Sidebar';
import client from '@/utils/apollo'
import { gql } from "@apollo/client";
import Image from "next/image"
import { Configs } from '@/configs'
import { ShareIos } from "@styled-icons/fluentui-system-filled/ShareIos"
import { InfoCircle } from "@styled-icons/boxicons-regular/InfoCircle"
import { Telegram } from "@styled-icons/boxicons-logos/Telegram"
import { Whatsapp } from "@styled-icons/boxicons-logos/Whatsapp"
import { ExclamationOctagon } from "@styled-icons/bootstrap/ExclamationOctagon"
import { useEffect } from 'react';
import ReportModal from '@/components/ReportModal';
import ImagemModal from '@/components/ImagemModal';
import ShareModal from '@/components/ShareModal';
import slugify from '@/utils/slugify';
import Script from 'next/script';
import ReactMarkdown from 'react-markdown'
import Info from '@/components/Info';
import { timezoneBrazil } from '@/utils/timezoneBrazil';
import Tesseract from "tesseract.js"


const IndexPage = ({ buildTimestamp, mural }) => {

  let formatedData = timezoneBrazil(mural.data)
  const worker = Tesseract.createWorker();

  useEffect(()=>{ 
    //convertImageToText()
  },[mural])

  async function convertImageToText() {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    let result = await worker.recognize(mural.image);
    console.log(result.data);
    await worker.terminate();
  } 

  function openReport() {
    Configs.update(s => {
      s.reportModalIsOpen = true
    })
  }

  function openImage() {
    Configs.update(s => {
      s.imageModalIsOpen = true
    })
  }

  function openShare() {
    Configs.update(s => {
      s.shareModalIsOpen = true
    })
  }


  useEffect(() => {
    Configs.update(s => {
      s.pageType = "single"
    })
  }, [])

  return (
    <>
      <SEO siteName="Mural - MaisVagasES"
        title={mural.cargo}
        image={mural.image}
        description={mural.descricao} />

      <ReportModal id={mural.id} url={`https://mural.maisvagases.com.br/${mural.id}-${slugify(mural.cargo)}`} cargo={mural.cargo} />
      <ShareModal cargo={mural.cargo} url={`https://mural.maisvagases.com.br/${mural.id}-${slugify(mural.cargo)}`} />
      <ImagemModal alt={mural.cargo} width={mural.imgW} height={mural.imgH} src={mural.image || "https://placehold.jp/ffffff/ffffff/256x310.png?text=%20"} />

      <main className="flex w-full justify-center">
        <div className="flex flex-col gap-4 w-full max-w-7xl p-2  border-t-2 border-white">
          <div className='hidden md:flex w-full'>
            <Info texto='Viu alguma vaga por ai e deseja compartilhar com mais gente? Aqui no nosso ???Mural de Vagas??? voc?? pode fazer isso r??pido e f??cil.' />
          </div>
          <section className="grid md:grid-cols-12 gap-8 ">
            <div className="col-span-12 md:col-span-3">
              <Sidebar />
            </div>
            <div className="col-span-12 md:col-span-9 ">
              {mural ?
                <section className='flex flex-col bg-white rounded-lg border border-gray-300'>
                  <div className='flex flex-col p-5 gap-2'>
                    <strong className="text-blue-500 uppercase text-xl md:text-3xl ">{mural.cargo}</strong>
                    <span className="text-base uppercase font-semibold">{mural.cidade.replace("1. ", "").replace("2. ", "")} ??? {formatedData}</span>

                    <div><span className={`inline-flex text-sm uppercase items-center px-3 py-1 rounded-full font-medium bg-${mural.cor}-100 text-${mural.cor}-800`}>{mural.tipo}</span></div>
                    {//IMG QUADRADA OU HORIZONTAL
                      mural.imgW <= mural.imgH &&
                      <>
                        <ins className="adsbygoogle flex"
                          //style={{ display: "block" }}
                          data-ad-client="ca-pub-6873518969054710"
                          data-ad-slot="4050152967"
                          data-ad-format="auto"
                          data-full-width-responsive="true"></ins>
                        <Script id="VAGA-MURAL-SUPERIOR" >
                          {`(adsbygoogle = window.adsbygoogle || []).push({ });`}
                        </Script>
                      </>}
                  </div>
                  <div className="w-full grid sm:grid-cols-2 p-5 pt-0 gap-5 ">
                    <div className="flex flex-col">
                      <Image className="rounded-lg  cursor-pointer mb-4" onClick={openImage} alt={mural.cargo} width={mural.imgW} height={mural.imgH} src={mural.image || "https://placehold.jp/ffffff/ffffff/256x310.png?text=%20"} />
                      {mural.descricao.length > 0 &&
                        <>
                          <span className='mt-4 text-lg font-semibold text-blue-500'>Descri????o adicional</span>
                          <ReactMarkdown className=' text-gray-600  mt-4 mb-4 text-md' >{mural.descricao}</ReactMarkdown>
                        </>
                      }
                      {//IMG VERTICAL
                        mural.imgW > mural.imgH &&
                        <div className='hidden md:flex '>
                          <ins className="adsbygoogle"
                            style={{ display: "block" }}
                            data-ad-client="ca-pub-6873518969054710"
                            data-ad-slot="8180931675"
                            data-ad-format="auto"
                            data-full-width-responsive="true"></ins>
                          <Script id="VAGA-MURAL-INFERIOR" >
                            {`(adsbygoogle = window.adsbygoogle || []).push({ });`}
                          </Script>
                        </div>}
                    </div>

                    <div className="flex flex-col justify-between  ">
                      <section className="flex flex-col gap-3">

                        <div className='text-center'>
                          <ins className="adsbygoogle"
                            style={{ display: "block" }}
                            data-ad-client="ca-pub-6873518969054710"
                            data-ad-slot="4599999065"
                            data-ad-format="auto"
                            data-full-width-responsive="true"></ins>
                          <Script id="VAGA-MURAL-LATERAL " >
                            {`(adsbygoogle = window.adsbygoogle || []).push({ });`}
                          </Script>
                        </div>
                      </section>

                      <section className="flex flex-col gap-5">
                        <div onClick={openShare} className="flex mt-3 transition-all duration-500 ease-in-out  cursor-pointer gap-2 border p-2 border-gray-800 hover:border-blue-500 hover:bg-blue-500 hover:text-white rounded-lg text-center justify-center w-full">
                          <ShareIos size={24} />
                          <span className="font-semibold text-base">COMPARTILHAR ESSA VAGA</span>
                        </div>

                        <div className="w-full flex items-center">
                          <div className="flex flex-1 mr-2 h-0.5 border-t border-dashed border-gray-800" />
                          <span style={{ fontFamily: 'Pacifico' }} className="text-center text-2xl ">quer mais vagas?</span>
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
                          <a href="/grupos" className="flex bg-whatsapp transition-all duration-500 ease-in-out hover:bg-opacity-60 cursor-pointer items-center rounded-lg p-2 w-full gap-2 ">
                            <Whatsapp size={20} />
                            GRUPOS NO WHATSAPP
                          </a>

                          <a href="https://t.me/maisvagases" target="_blank" rel="noreferrer" className="flex bg-telegram transition-all duration-500 ease-in-out  hover:bg-opacity-60 cursor-pointer items-center rounded-lg p-2 w-full gap-2">
                            <Telegram size={20} />
                            CANAL NO TELEGRAM
                          </a>
                        </div>

                        <div onClick={openReport} className="text-red-500  transition-all duration-500 ease-in-out hover:opacity-60 cursor-pointer flex gap-2 font-semibold">
                          <ExclamationOctagon size={20} />
                          <span>DENUNCIAR VAGA</span>
                        </div>

                      </section>
                    </div>
                  </div>
                </section>
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

export async function getServerSideProps({ params }) {

  var newId = params.id.split("-")[0]

  const { data } = await client.query({
    query: gql` 
    query {
      mural(id: "${newId}") {
        data {
          id
          attributes {
            cargo
            createdAt
            descricao
            cidade{data{attributes{cidade}}}
            imagem{data{attributes{
              url
              height
              width
            }}}
            tipo{data{attributes{tipo,cor}}}
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
        descricao: data.mural.data.attributes.descricao,
        cidade: data.mural.data.attributes.cidade.data.attributes.cidade,
        tipo: data.mural.data.attributes.tipo.data.attributes.tipo,
        cor: data.mural.data.attributes.tipo.data.attributes.cor,
        imgH: Number(data.mural.data.attributes.imagem.data.attributes.height),
        imgW: Number(data.mural.data.attributes.imagem.data.attributes.width),
        id: data.mural.data.id,
        data: data.mural.data.attributes.createdAt
      },
      buildTimestamp: Date.now()
    }
  }
}

export default IndexPage;