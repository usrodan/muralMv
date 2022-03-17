
import SEO from '@/components/SEO';
import { SendPlane } from "@styled-icons/remix-fill/SendPlane"
import { AddPhotoAlternate } from "@styled-icons/material-outlined/AddPhotoAlternate"
import { Trash } from "@styled-icons/boxicons-regular/Trash"
import Dropzone from 'react-dropzone-uploader'
import { Fragment, useEffect, useState } from 'react';
import client from '@/utils/apollo'
import { gql } from "@apollo/client";

import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { toast } from 'react-toastify';



const EnviarPage = () => {
  const [image, setImage] = useState(null)
  const [cargo, setCargo] = useState(null)
  const [cidade, setCidade] = useState({ id: 0, attributes:{ Cidade: "Selecione uma cidade" ,slug: ""} })
  const [tipo, setTipo] = useState({ id: 0, attributes:{ Tipo: "Selecione um tipo" ,slug: ""} })

  const [cidades, setCidades] = useState([])
  const [tipos, setTipos] = useState([])

  const [uploading, setUploading] = useState(false)

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  function EnviarVaga(){
    !cargo && toast.error("Erro: Peencha o nome do cargo!")
    !image && toast.error("Erro: Envie uma imagem!")
    !cidade.attributes.slug && toast.error("Erro: Selecione uma Cidade!!")
    !tipo.attributes.slug && toast.error("Erro: Selecione o tipo de vaga!") 

    if( cargo && image && tipo){
      var axios = require('axios');
      var data = JSON.stringify({
        data: {
          Cargo: String(cargo),
          Imagem: [ Number(image.id) ],
          cidade: [Number(cidade.id) ],
          tipo: [ Number(tipo.id) ]
        }
      });
      
      var config = {
        method: 'post',
        url: 'https://maisvagases.herokuapp.com/api/murals',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        toast.success("Vaga enviada e postada no mural com sucesso !");
        setImage(null)
        setCargo("")
        setCidade({ id: 0, attributes:{ Cidade: "Selecione uma cidade" ,slug: ""} })
        setTipo({ id: 0, attributes:{ Tipo: "Selecione um tipo" ,slug: ""} }) 
      })
      .catch(function (error) {
        toast.error("Erro ao enviar a vaga tente novamente!");
      });
      
    }
  }

  async function getData() {
    const { data } = await client.query({
      query: gql` 
      query {
        cidades{
          data{
            id
            attributes{Cidade,slug}
          }}

        tipos{
          data{
            id
            attributes{Tipo,slug}
          }}
      }
    `,
    });

    setTipos(data.tipos.data)
    setCidades(data.cidades.data)
  }
  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    console.log(image)
  }, [image])

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
              <div className='mt-3 p-2 px-4 bg-white text-gray-800 rounded-lg border border-gray-300   focus:ring-1 focus:ring-blue-500 focus:border-blue-500 '>
                <input onChange={event => setCargo(event.target.value)} className="text-gray-800 " type="text" placeholder="Ex: Auxiliar Administrativo" name="" id="" />
              </div>
            </div>

            <div className="md:col-span-4">
              <span className="text-blue-500 font-bold text-lg">CIDADE</span>

              <Listbox value={cidade} onChange={setCidade}>
                {({ open }) => (
                  <>
                    <div className="flex relative">
                      <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-lg shadow-sm  mt-3 p-2 px-4   text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ">
                        <span className="block truncate">{cidade.attributes.Cidade}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-2 w-full p-2 bg-white shadow-lg max-h-60 rounded-xl   ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                          {cidades.map((person) => (
                            <Listbox.Option
                              key={person.slug}
                              className={({ active }) =>
                                classNames(
                                  active ? 'text-white bg-blue-600 ' : 'text-gray-900',
                                  'cursor-default select-none rounded-md relative py-2 pl-3 pr-9'
                                )
                              }
                              value={person}
                            > 
                              {({ selected, active }) => (
                                <>
                                  <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                    {person.attributes.Cidade}
                                  </span>

                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active ? 'text-white' : 'text-blue-600',
                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                      )}
                                    >
                                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>

            </div>

            <div className="md:col-span-4">
              <span className="text-blue-500 font-bold text-lg">TIPO DE VAGA</span>
              <Listbox value={tipo} onChange={setTipo}>
                {({ open }) => (
                  <>
                    <div className="flex relative">
                      <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-lg shadow-sm  mt-3 p-2 px-4   text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ">
                        <span className="block truncate">{tipo.attributes.Tipo}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-2 w-full p-2 bg-white shadow-lg max-h-60 rounded-xl   ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                          {tipos.map((person) => (
                            <Listbox.Option
                              key={person.slug}
                              className={({ active }) =>
                                classNames(
                                  active ? 'text-white bg-blue-600' : 'text-gray-900',
                                  'cursor-default rounded-md select-none relative py-2 pl-3 pr-9'
                                )
                              }
                              value={person}
                            > 
                              {({ selected, active }) => (
                                <>
                                  <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                    {person.attributes.Tipo}
                                  </span>

                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active ? 'text-white' : 'text-blue-600',
                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                      )}
                                    >
                                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>

            <div className="md:col-span-12 border-2 p-4 flex justify-center rounded-lg border-dashed border-gray-300">
              {image && !uploading ?
                <div className='flex flex-col gap-2' >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="rounded-md" src={image.url} width={200} height={200} alt="Prévia de Imagem" />
                  <button onClick={() => setImage(false)} className='p-2 rounded-md cursor-pointer font-bold text-sm hover:bg-opacity-80 px-4 bg-orange-500 text-white'><Trash size={25} /> Remover Imagem </button>
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
            <div onClick={EnviarVaga} className="md:col-span-12 flex items-center cursor-pointer text-lg gap-2 justify-center text-center font-semibold text-white p-2 rounded-lg bg-blue-500 hover:bg-opacity-60" ><SendPlane size={20} />Enviar vaga</div>
          </section>
        </div>
      </main >
    </>);
}

export default EnviarPage;