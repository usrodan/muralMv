
import SEO from '@/components/SEO';

import Image from "next/image" 
import { SendPlane } from "@styled-icons/remix-fill/SendPlane"
import { AddPhotoAlternate } from "@styled-icons/material-outlined/AddPhotoAlternate"
import { format } from 'date-fns'

import Dropzone from 'react-dropzone-uploader'

const IndexPage = () => {

  const getUploadParams = () => {
    return { url: 'https://maisvagases.herokuapp.com/api/upload' }
  }

  const handleChangeStatus = ({ meta, remove }, status) => {
    if (status === 'headers_received') {
      console.log(`${meta.name} uploaded!`)
      remove()
    } else if (status === 'aborted') {
      console.log(`${meta.name}, upload failed...`)
    }
  }


  return (
    <>
      <SEO siteName="Mais Vagas ES" title="Enviar Vaga" description="" />
      <main className="flex w-full justify-center">
        <div className="flex flex-col gap-4 w-full max-w-7xl p-2  border-t-2 border-white">
          <section className="grid md:grid-cols-12 py-8 gap-8 ">
            <div className="md:col-span-4">
              <span className="text-blue-500 font-bold text-lg ">CARGO</span>
              <input className="mt-3 p-2 bg-white rounded-lg border border-gray-300" type="text" placeholder="Auxiliar Administrativo" name="" id="" />
            </div>

            <div className="md:col-span-4">
              <span className="text-blue-500 font-bold text-lg">CIDADE</span>
              <input className="mt-3 p-2 bg-white rounded-lg border border-gray-300" type="text" placeholder="Serra" name="" id="" />
            </div>

            <div className="md:col-span-4">
              <span className="text-blue-500 font-bold text-lg">TIPO DE VAGA</span>
              <input className="mt-3 p-2 bg-white rounded-lg  border-2 border-gray-300" type="text" placeholder="Efetivo" name="" id="" />
            </div>

            <div className="md:col-span-12 border-2 rounded-lg border-dashed border-gray-300">
              <Dropzone
                getUploadParams={getUploadParams}
                onChangeStatus={handleChangeStatus}
                maxFiles={1}
                multiple={false}
                canCancel={false}
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
            </div>
            <span className="md:col-span-12 text-sm">Arquivos aceitos: .JPG; .JPEG; .PNG e .BMP de até 5MB  </span>
            <div className="md:col-span-12 flex items-center text-lg gap-2 justify-center text-center font-semibold text-white p-2 rounded-lg bg-blue-500 hover:bg-opacity-60" ><SendPlane size={20}/>Enviar vaga</div>

          </section>
        </div>
      </main >
    </>);
}

export default IndexPage;