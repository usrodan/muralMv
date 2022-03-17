
import SEO from '@/components/SEO';
import { SendPlane } from "@styled-icons/remix-fill/SendPlane"
import { AddPhotoAlternate } from "@styled-icons/material-outlined/AddPhotoAlternate"
import { Trash } from "@styled-icons/boxicons-regular/Trash"
import Dropzone from 'react-dropzone-uploader'
import { useState } from 'react';
import Image from 'next/image'

const EnviarPage = () => {
  const [image, setImage] = useState(null)
  const [cargo, setCargo] = useState(null)
  const [cidade, setCidade] = useState(null)
  const [tipo, setTipo] = useState(null)
  const [uploading, setUploading] = useState(false)

  const getUploadParams = () => {
    return { url: '/api/up' }
  }


  const handleChangeStatus = ({ meta, file, xhr }, status) => {
    setUploading(true)
    if (status === 'done') {
      console.log(JSON.parse(xhr.response))
      setImage(JSON.parse(xhr.response)[0])
      setTimeout(() => { 
        setUploading(false)
      }, 2000);
    }
  }


  return (
    <>
      <SEO siteName="Mais Vagas ES" title="Enviar Vaga" description="" />
      <main className="flex w-full justify-center">
        <div className="flex flex-col gap-4 w-full max-w-7xl p-4  border-t-2 border-white">
          <section className="grid md:grid-cols-12 py-8 gap-8 ">
            <div className="md:col-span-4">
              <span className="text-blue-500 font-bold text-lg ">CARGO</span>
              <div className='mt-3 p-2 px-4 bg-white rounded-lg border border-gray-300'>
                <input className="" type="text" placeholder="Auxiliar Administrativo" name="" id="" />
              </div>
            </div>

            <div className="md:col-span-4">
              <span className="text-blue-500 font-bold text-lg">CIDADE</span>
              <div className='mt-3 p-2 px-4 bg-white rounded-lg border border-gray-300'>
                <input className="" type="text" placeholder="Serra" name="" id="" />
              </div>
            </div>

            <div className="md:col-span-4">
              <span className="text-blue-500 font-bold text-lg">TIPO DE VAGA</span>
              <div className='mt-3 p-2 px-4 bg-white rounded-lg border border-gray-300'>
                <input className="" type="text" placeholder="Efetivo" name="" id="" />
              </div>
            </div>

            <div className="md:col-span-12 border-2 p-4 flex justify-center rounded-lg border-dashed border-gray-300">
              {image && !uploading ?
                <div className='flex flex-col gap-2' >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="rounded-md" src={image.url} width={200} height={200} alt="Prévia de Imagem" />
                  <button onClick={()=>setImage(false)} className='p-2 rounded-md cursor-pointer font-bold text-sm hover:bg-opacity-80 px-4 bg-orange-500 text-white'><Trash size={25} /> Remover Imagem </button>
                </div> :
                <Dropzone
                  getUploadParams={getUploadParams}
                  //@ts-ignore
                  onChangeStatus={handleChangeStatus}
                  maxFiles={1}
                  multiple={false}
                  canCancel={false}
                  accept="image/*"
                  inputContent={
                    <div className="flex text-blue-500 text-base font-semibold justify-center text-center flex-col">
                      <AddPhotoAlternate className="w-full" size={64} />
                      <span className="text-gray-800 mt-8">Arraste a imagem para cá</span>
                      <span className="text-gray-800">ou</span>
                      <span className="">Selecione uma imagem</span>
                    </div>
                  }
                  styles={{
                    dropzone: { height: 300 },
                    dropzoneActive: { borderColor: 'green' },
                  }}
                />
              }
            </div>
            <span className="md:col-span-12 text-sm">Arquivos aceitos: .JPG; .JPEG; .PNG e .BMP de até 5MB  </span>
            <div className="md:col-span-12 flex items-center text-lg gap-2 justify-center text-center font-semibold text-white p-2 rounded-lg bg-blue-500 hover:bg-opacity-60" ><SendPlane size={20} />Enviar vaga</div>

          </section>
        </div>
      </main >
    </>);
}

export default EnviarPage;