
import SEO from '@/components/SEO';
import { SendPlane } from "@styled-icons/remix-fill/SendPlane"
import { AddPhotoAlternate } from "@styled-icons/material-outlined/AddPhotoAlternate"
import { Trash } from "@styled-icons/boxicons-regular/Trash"
import { SearchAlt } from "@styled-icons/boxicons-regular/SearchAlt"
import Dropzone from 'react-dropzone-uploader'
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios'
import { Configs } from '@/configs'
import { Listbox, Dialog, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { toast } from 'react-toastify';
import { removeAcento } from "@/utils/removeAcento"
import { SpinnerCircularFixed } from "spinners-react";
import { Info as InfoIcon } from "@styled-icons/bootstrap/Info"
import { Whatsapp } from "@styled-icons/bootstrap/Whatsapp"
import Info from '@/components/Info';
import { MD5 } from "crypto-js"
import { useRouter } from 'next/router';

const EnviarPage = () => {
  const router = useRouter()
  const [image, setImage] = useState(null)
  const [hash, setHash] = useState(null)
  const [cargo, setCargo] = useState(null)
  const [descricao, setDescricao] = useState("")
  const [searchCity, setSearchCity] = useState("")
  const [cidade, setCidade] = useState({ id: 0, attributes: { cidade: "Selecione uma cidade", slug: "" } })
  const [tipo, setTipo] = useState({ id: 0, attributes: { tipo: "Selecione um tipo", slug: "" } })
  const [cidades, setCidades] = useState([])
  const [tipos, setTipos] = useState([])
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [userLogged, setUserLogged] = useState({ id: 0, nome: "", ativo: false, blocked: false })
  const configState = Configs.useState()

  useEffect(() => {
    setTimeout(() => {
      let CookieSession = JSON.parse(localStorage.getItem("SessionMural"))
      CookieSession && CookieSession.token == String(MD5(CookieSession.user.username + CookieSession.user.id + CookieSession.user.email)) ? setUserLogged(CookieSession.user) : setUserLogged({ ativo: false, blocked: false, nome: "", id: 0 })
    }, 1000);
  }, [router])

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  useEffect(() => {
    Configs.update(s => {
      s.pageType = "send"
    })
  }, [])

  useEffect(() => {
    console.log(image)
    image && checkHash(image)
  }, [image])

  function checkHash(img) {
    axios.post("/api/checkHash", { img: image }).then(res => {
      if (res.data.error) {
        toast.error("Erro: Essa imagem já foi associada a outra vaga. Tente enviar outra imagem", {
          position: toast.POSITION.BOTTOM_CENTER
        })
        setImage(null)
        setHash(null)
      }
      else {
        setHash(res.data)
      }
    }).catch(e => {
      toast.error(e, {
        position: toast.POSITION.BOTTOM_CENTER
      })
      setImage(null)
      setHash(null)
    })
  }

  function EnviarVaga() {
    setLoading(true)
    setOpen(false)
    !cargo && toast.error("Erro: Peencha o nome do cargo!", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    !image && toast.error("Erro: Envie uma imagem!", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    !cidade.attributes.slug && toast.error("Erro: Selecione uma Cidade!!", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    !tipo.attributes.slug && toast.error("Erro: Selecione o tipo de vaga!", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    !hash && toast.error("Erro: Imagem já publicada em noso site!", {
      position: toast.POSITION.BOTTOM_CENTER
    })

    if (cargo && image && tipo.id && cidade.id && hash) {
      var axios = require('axios');
      var data = JSON.stringify({
        data: {
          cargo: String(cargo),
          imagem: [Number(image.id)],
          cidade: [Number(cidade.id)],
          tipo: [Number(tipo.id)],
          hash: String(hash),
          descricao: String(descricao),
          usuario: [Number(userLogged.id)]
        }
      });

      var config = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_STRAPI}/api/murals`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios(config)
        .then(function (response) {
          toast.success("Vaga enviada e postada no mural com sucesso !", {
            position: toast.POSITION.BOTTOM_CENTER
          });
          setImage(null)
          setHash(null)
          setCargo("")
          setCidade({ id: 0, attributes: { cidade: "Selecione uma cidade", slug: "" } })
          setTipo({ id: 0, attributes: { tipo: "Selecione um tipo", slug: "" } })
          setDescricao("")
          setLoading(false)
        })
        .catch(function (error) {
          toast.error("Erro ao enviar a vaga tente novamente!", {
            position: toast.POSITION.BOTTOM_CENTER
          });
          setImage(null)
          setHash(null)
          setCargo("")
          setCidade({ id: 0, attributes: { cidade: "Selecione uma cidade", slug: "" } })
          setTipo({ id: 0, attributes: { tipo: "Selecione um tipo", slug: "" } })
          setDescricao("")
          setLoading(false)
        });
    }
    else {
      setLoading(false)
    }
  }

  async function getData() {
    axios.get("/api/meta").then(result => {
      setTipos(result && result.data.tipos && result.data.tipos.data)
      setCidades(result && result.data.cidades && result.data.cidades.data)
    })
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    setSearchCity("")
  }, [cidade])

  const getUploadParams = () => {
    return { url: '/api/up' }
  }


  const handleChangeStatus = ({ meta, file, xhr }, status) => {
    setUploading(true)
    if (status === 'done') {
      setImage(JSON.parse(xhr.response)[0])
      setTimeout(() => {
        setUploading(false)
      }, 2000);
    }
  }

  return (
    <>
      <SEO siteName="Mais Vagas ES" title="Enviar Vaga" description="" />

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-white backdrop-blur-sm bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white border border-gray-200 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                    <InfoIcon size={30} className="h-8 w-8 text-blue-500" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Aviso
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-md text-gray-500">
                        <span>Este espaço é exclusivo para o envio de <strong className='text-gray-800 font-bold'>vagas de emprego!</strong> Currículos, divulgação de serviços, fotos, e demais coisas que não sejam vagas de emprego, serão removidos sem aviso prévio. Colabore com a comunidade, publique somente empregos 💙</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="button"
                    className="w-full inline-flex items-center gap-2 justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 sm:col-start-2 sm:text-md"
                    onClick={EnviarVaga}
                  >
                    <SendPlane size={20} /> Enviar Vaga
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:col-start-1 sm:text-md"
                    onClick={() => setOpen(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <main className="flex w-full justify-center">

        {configState.loading ?
          <div className='p-40'>
            <SpinnerCircularFixed size={30} thickness={180} speed={150} color="#3B82F6" secondaryColor="rgba(255, 255, 255, 0.15)" />
          </div>

          :
          <>

            {userLogged.id == 0 &&
              <div className="flex flex-col w-full text-center justify-center items-center max-w-7xl p-4 gap-4  border-t-2 border-white">
                <h1>Enviar Vaga</h1>
                <span>Para enviar vagas de emprego ao site é necessário fazer login.</span>
                <span>Caso não tenha uma conta, é totalmente GRATUITO.</span>
                <div className='grid grid-cols-2 justify-center  gap-4 '>
                  <div onClick={() => Configs.update(s => { s.loginModalIsOpen = true })}
                    className=" transition-all duration-500 ease-in-out px-4 flex w-full items-center cursor-pointer gap-2 justify-center text-center font-semibold text-white p-4 md:p-2 rounded-lg bg-blue-500 hover:bg-blue-600" >
                    Fazer Login
                  </div>
                  <a
                    href="/cadastro"
                    className=" transition-all duration-500 ease-in-out  flex w-full items-center cursor-pointer gap-2 justify-center text-center font-semibold text-blue-500 hover:text-blue-600 p-4 md:p-2 md:px-4 rounded-lg border border-blue-500 hover:border-blue-600" >
                    Criar uma nova conta
                  </a>
                </div>
              </div>
            }

            {userLogged.id != 0 && userLogged.blocked &&
              <div className="flex flex-col w-full text-center justify-center items-center max-w-7xl p-4 gap-4  border-t-2 border-white">
                <h1>Conta bloqueada</h1>
                <p>Sua conta foi bloqueada por infrigir as regras do site <br />
                  e não é mais possivel enviar novas vagas.<br />
                </p>
                <div className='grid   justify-center  gap-4 '>
                  <span className='text-sm font-semibold'>Caso acredite que isso foi um erro,<br /> entre em contato conosco pelo whatsapp.</span>
                  <a
                    target="_blank"
                    rel='noreferrer'
                    href="https://api.whatsapp.com/send?phone=27992830038&text=Estou%20com%20problemas%20na%20valida%C3%A7%C3%A3o%20da%20minha%20conta,%20pode%20me%20ajudar?"
                    className=" transition-all duration-500 ease-in-out flex w-full items-center cursor-pointer gap-2 justify-center text-center font-semibold text-green-500 hover:text-green-600 p-4 md:p-2 md:px-4 rounded-lg border border-green-500 hover:border-green-600" >
                    <Whatsapp size={20} />
                    Entrar em contato
                  </a>
                </div>
              </div>
            }

            {userLogged.id != 0 && !userLogged.ativo &&
              <div className="flex flex-col w-full text-center justify-center items-center max-w-7xl p-4 gap-4  border-t-2 border-white">
                <h1>Enviar Vaga</h1>
                <p>  Para enviar vagas de emprego ao site é necessário validar sua conta antes.<br />
                  Verifique no seu email <br />
                  Caso ainda não tenha recebido o link de validação,<br />
                  Clique na barra amarela acima para receber um novo código.<br /></p>
                <div className='grid   justify-center  gap-4 '>
                  <span className='text-sm font-semibold'>Caso não esteja recebendo o link de ativação,<br /> algum tenha outro problema, entre em<br /> contato conosco pelo whatsapp.</span>
                  <a
                    target="_blank"
                    rel='noreferrer'
                    href="https://api.whatsapp.com/send?phone=27992830038&text=Estou%20com%20problemas%20na%20valida%C3%A7%C3%A3o%20da%20minha%20conta,%20pode%20me%20ajudar?"
                    className=" transition-all duration-500 ease-in-out flex w-full items-center cursor-pointer gap-2 justify-center text-center font-semibold text-green-500 hover:text-green-600 p-4 md:p-2 md:px-4 rounded-lg border border-green-500 hover:border-green-600" >
                    <Whatsapp size={20} />
                    Entrar em contato
                  </a>
                </div>
              </div>
            }
            {userLogged.id != 0 && userLogged.ativo && !userLogged.blocked && <div className="flex flex-col w-full max-w-7xl p-4  border-t-2 border-white">
              <Info
                cor='orange'
                texto='Caso a vaga enviada não tiver email, site ou telefone para envio de currículo, a mesma será removida.<br />
                    Você pode utilizar o campo descrição abaixo para inserir informações complementares da oportunidade.'
              />
              <section className="grid md:grid-cols-12 py-8 gap-8 ">
                <div className="md:col-span-4">
                  <span className="text-blue-500 font-bold text-lg ">CARGO</span>
                  <div className='rounded-lg  mt-3 border border-gray-300'>
                    <input value={cargo} onChange={event => setCargo(event.target.value)} className=" p-2 px-4 bg-white   rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" type="text" placeholder="Ex: Auxiliar Administrativo" name="" id="" />
                  </div>
                </div>

                <div className="md:col-span-4">
                  <span className="text-blue-500 font-bold text-lg">CIDADE</span>

                  <Listbox value={cidade} onChange={setCidade}>
                    {({ open }) => (
                      <>
                        <div className="flex relative">
                          <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-lg shadow-sm  mt-3 p-2 px-4   text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ">
                            <span className="block truncate">{cidade.attributes.cidade.replace("1. ", "").replace("2. ", "")}</span>
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

                            <Listbox.Options className="absolute z-10 mt-2 w-full p-2 bg-white shadow-lg rounded-xl   ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                              <div className='flex p-2 rounded-lg w-full  border text-gray-800 border-gray-300'>
                                <input value={searchCity} onChange={(e) => setSearchCity(e.target.value)} className='text-gray-800' />
                                <SearchAlt className="text-gray-300" size="24" />
                              </div>
                              <div className='overflow-auto mt-2 max-h-60'>
                                {cidades.map((person) => {
                                  var exibir = true
                                  if (searchCity && !removeAcento(person.attributes.cidade.toLowerCase()).includes(removeAcento(searchCity.toLowerCase()))) {
                                    exibir = false
                                  }
                                  return (exibir && <Listbox.Option
                                    key={person.slug}
                                    className={({ active }) =>
                                      classNames(
                                        active ? 'text-white bg-blue-600 ' : 'text-gray-900',
                                        'cursor-default select-none rounded-md relative py-2 pl-3 pr-9 '
                                      )
                                    }
                                    value={person}
                                  >
                                    {({ selected, active }) => (
                                      <>
                                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                          {person.attributes.cidade.replace("1. ", "").replace("2. ", "")}
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
                                  </Listbox.Option>)
                                })}
                              </div>

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
                            <span className="block truncate">{tipo.attributes.tipo}</span>
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
                                        {person.attributes.tipo}
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


                <div className="md:col-span-6 h-full flex flex-col justify-top">
                  <span className="text-blue-500 font-bold text-lg ">IMAGEM </span>
                  <div className="md:col-span-6 h-full flex flex-col border-2 p-4 mt-3 justify-center rounded-lg border-dashed bg-white border-gray-300">

                    {image && !uploading ?
                      <div className='flex flex-col item-center text-center gap-2' >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <div className='flex w-full justify-center'><img className="rounded-lg  text-center w-60 h-60 object-contain" src={image.url} width={250} height={250} alt="Prévia de Imagem" /></div>
                        <button onClick={() => setImage(false)} className='p-2 mb-2 rounded-md cursor-pointer font-bold text-sm hover:bg-opacity-80 px-4 bg-orange-500 text-white'><Trash size={25} /> Remover Imagem </button>
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
                            <AddPhotoAlternate className="w-full" size={50} />
                            <span className="text-gray-800 mt-4">Arraste a imagem para cá</span>
                            <span className="text-gray-800  ">ou</span>
                            <span className="transition-all duration-500 ease-in-out hover:bg-blue-600 rounded-md text-white bg-blue-500 p-2 px-4 mt-2">Selecione uma imagem</span>
                          </div>
                        }
                        styles={{
                          dropzone: { height: 270 },
                          dropzoneActive: { borderColor: 'green' },
                        }}
                      />
                    }
                    <span className="md:col-span-12  w-full text-center text-sm">Arquivos aceitos: .JPG; .JPEG; .PNG e .BMP de até 5MB  </span>
                  </div>
                </div>

                <div className="md:col-span-6 flex flex-col justify-top">
                  <span className="text-blue-500 font-bold text-lg ">DESCRIÇÃO (OPCIONAL) </span>
                  <textarea rows={14} value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder={"Use este espaço para inserir informações adicionais da vaga, ou caso tenha mais de uma vaga em uma mesma imagem, insira aqui informações que possam ser pertinentes de cada vaga. \n\n Caso não tenha mais informações, deixe em branco"}
                    className='flex mt-3 p-4  text-md overflow-auto  bg-white text-gray-800 rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500' />
                </div>


                <div className='fixed bottom-0 left-0 md:relative flex w-full md:col-span-12'>
                  {!loading ?
                    <div onClick={EnviarVaga/*() => setOpen(true)*/}
                      className="transition-all duration-500 ease-in-out flex w-full items-center cursor-pointer text-lg gap-2 justify-center text-center font-semibold text-white p-4 md:p-2 md:rounded-lg bg-blue-500 hover:bg-blue-600" >
                      <SendPlane size={20} />
                      Enviar vaga
                    </div>
                    :
                    <div className="transition-all duration-500 ease-in-out flex w-full bg-opacity-70 cursor-not-allowed items-center  text-lg gap-2 justify-center text-center font-semibold text-white p-4 md:p-2 md:rounded-lg bg-blue-500 hover:bg-blue-600 " >
                      <SpinnerCircularFixed size={20} thickness={180} speed={150} color="#FFF" secondaryColor="rgba(255, 255, 255, 0.15)" />
                      Enviando vaga
                    </div>
                  }
                </div>

                <div className='flex bottom-0 left-0 md:relative md:hidden w-full md:col-span-12'>
                  {!loading ?
                    <div onClick={() => setOpen(true)}
                      className=" transition-all duration-500 ease-in-out flex w-full items-center cursor-pointer text-lg gap-2 justify-center text-center font-semibold text-white p-4 md:p-2 rounded-lg bg-blue-500 hover:bg-blue-600" >
                      <SendPlane size={20} />
                      Enviar vaga
                    </div>
                    :
                    <div className=" transition-all duration-500 ease-in-out flex w-full bg-opacity-70 cursor-not-allowed items-center  text-lg gap-2 justify-center text-center font-semibold text-white p-4 md:p-2 rounded-lg bg-blue-500 hover:bg-blue-600 " >
                      <SpinnerCircularFixed size={20} thickness={180} speed={150} color="#FFF" secondaryColor="rgba(255, 255, 255, 0.15)" />
                      Enviando vaga
                    </div>
                  }
                </div>

              </section>
            </div>}
          </>

        }


      </main >
    </>);
}

export default EnviarPage;