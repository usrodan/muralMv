/* This example requires Tailwind CSS v2.0+ */
import Image from "next/image"
import { UploadCloud } from "@styled-icons/feather/UploadCloud"
import { Search } from "@styled-icons/boxicons-regular/Search"
import { SearchAlt } from "@styled-icons/boxicons-regular/SearchAlt"
import { FilterAlt } from "@styled-icons/boxicons-regular/FilterAlt"
import { FilterAlt as FilterFilled } from "@styled-icons/boxicons-solid/FilterAlt"
import { Configs } from '@/configs'
import { useRouter } from "next/router"
import { useEffect, Fragment, useState } from "react"
import { MD5 } from "crypto-js"
import { Menu, Dialog, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { PersonCircle } from "@styled-icons/bootstrap/PersonCircle"
import { Menu as MenuIcon } from "@styled-icons/evaicons-solid/Menu"
import { XIcon } from '@heroicons/react/outline'
import { ChevronDown } from "@styled-icons/boxicons-solid/ChevronDown"
import { PersonFill } from "@styled-icons/bootstrap/PersonFill"
import { PersonOutline } from "@styled-icons/material-sharp/PersonOutline"
import { BriefcaseAlt } from "@styled-icons/boxicons-regular/BriefcaseAlt"
import { LockAlt } from "@styled-icons/boxicons-regular/LockAlt"
import { ShutDown as Power } from "@styled-icons/remix-line/ShutDown"
import { Dashboard } from "@styled-icons/remix-line/Dashboard"

import client from "@/utils/apollo";
import { gql } from "@apollo/client";

import LoginModal from "@/components/LoginModal"
import axios from "axios"
import { toast } from "react-toastify"
import SidebarLogged from "./SidebarLogged"
import DoLogout from "@/utils/DoLogout"

export default function PageHeader() {
  const configState = Configs.useState()
  const router = useRouter()
  const [search, setSearch] = useState(null)
  const [userLogged, setUserLogged] = useState({ nome: "", id: 0, ativo: false, imagem: { url: "" } })

  async function getUser(id) {
    const response = await client.query({
      query: gql` 
      query {
        usersPermissionsUsers(filters: { id: { eq: ${id} } }) {
          data {
            attributes {
              username
              imagem {          
                data {
                  id
                  attributes {
                    url
                  }
                }
              }
              nome
              email
              empresa
              whatsapp
              cnpj
              confirmed
              blocked
              ativo
            }
          }
        }
      }
      `,
    });
    const d = response.data.usersPermissionsUsers.data[0].attributes
    const r = {
      id,
      username: d.username,
      email: d.email,
      confirmed: d.confirmed,
      blocked: d.blocked,
      nome: d.nome,
      cnpj: d.cnpj,
      whatsapp: d.whatsapp,
      empresa: d.empresa,
      ativo: d.ativo,
      imagem: {
        id: d.imagem.data ? d.imagem.data.id : 0,
        url: d.imagem.data ? d.imagem.data.attributes.url : "",
      }
    };

    return r
  }

  function handleMenu() {
    Configs.update(s => {
      s.menuIsOpen = !configState.menuIsOpen
    })
  }

  function logout() {
    DoLogout()
    router.push("/")
  }

  function NovaValidacao() {
    axios.get(`/api/sendConfirmation/${userLogged.id}`).then(response => {
      toast.success("Link de validação de conta enviado por email", { position: 'bottom-center' })
    }).catch(e => {
      toast.error(e, { position: 'bottom-center' })
    })
  }

  useEffect(() => {
    let CookieSession = JSON.parse(localStorage.getItem("SessionMural"))
    CookieSession && CookieSession.token == String(MD5(CookieSession.user.username + CookieSession.user.id + CookieSession.user.email)) ? setUserLogged(CookieSession.user) : setUserLogged({ ativo: false, nome: "", id: 0, imagem: { url: "" } })
    if (CookieSession && CookieSession.user && CookieSession.user.id != 0) {
      getUser(CookieSession.user.id).then(response => {
        if (response) {
          Configs.update(s => {
            s.loggedUser = response
          })
          localStorage.setItem("SessionMural", JSON.stringify({ token: String(MD5(CookieSession.user.username + CookieSession.user.id + CookieSession.user.email)), user: response }))
          setTimeout(() => {
            Configs.update(s => { s.loading = false })
          }, 1500);

        } else {
          localStorage.removeItem("SessionMural")
          setTimeout(() => {
            Configs.update(s => { s.loading = false })
          }, 1500);
        }


      })
      /*
      axios.get(`/api/getUser/${CookieSession.user.id}`).then(response => {
        if (response.data) {
          Configs.update(s => {
            s.loggedUser = response.data
          })
          localStorage.setItem("SessionMural", JSON.stringify({ token: String(MD5(CookieSession.user.username + CookieSession.user.id + CookieSession.user.email)), user: response.data }))
          setTimeout(() => {
            Configs.update(s => { s.loading = false })
          }, 1500);

        } else {
          localStorage.removeItem("SessionMural")
          setTimeout(() => {
            Configs.update(s => { s.loading = false })
          }, 1500);
        }
      })
      */
    } else {
      setTimeout(() => {
        Configs.update(s => { s.loading = false })
      }, 1500);
    }
  }, [router])

  useEffect(() => {
    configState.search != undefined && setSearch(configState.search)
  }, [configState.search])

  function handleFilter() {
    Configs.update(s => {
      s.filterIsOpen = !configState.filterIsOpen
    })
  }

  function handleSearch() {
    Configs.update(s => {
      s.searchIsOpen = !configState.searchIsOpen
    })
    router.push(`/?search=${search}`)
  }

  function makeSearch(e = null) {
    //@ts-ignore
    e && e.preventDefault();
    handleSearch()
    router.push(`/?search=${search}`)
  }

  return (
    <>
      <LoginModal />
      {userLogged.id > 0 &&
        <Transition.Root show={configState.menuIsOpen} as={Fragment}>
          <Dialog as="div" className="fixed z-20 inset-0 overflow-hidden" onClose={handleMenu}>
            <div className="absolute inset-0 overflow-hidden">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full ">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <div className="pointer-events-auto relative w-screen  ">
                    <div className="absolute top-2 right-2  ">
                      <button
                        type="button"
                        className=" p-4 "
                        onClick={handleMenu}
                      >
                        <span className="sr-only">Fechar</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="flex h-full flex-col text-xl font-semibold text-gray-800 overflow-y-scroll bg-white p-6 shadow-xl">
                      <SidebarLogged />
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      }
      <header className={"flex flex-col border-b border-gray-300 items-center font-semibold  w-full bg-white justify-center"}>
        <form onSubmit={makeSearch} className="hidden md:grid grid-cols-12 gap-4 w-full justify-end max-w-7xl py-4 ">
          <div className="col-span-2 lg:col-span-3  flex text-center justify-center w-full">
            <a href="/" className=" flex hover:opacity-60  hover:-mt-2 transition-all duration-500 ease-in-out w-24 text-center justify-center">
              <Image src="/Mural.svg" className="w-24" alt="Mural MaisVagasES" width={126} height={38} />
            </a>
          </div>
          <div className="col-span-10 lg:col-span-9 w-full flex gap-3 pr-4 xl:pr-0 ">
            <div className="  w-full text-gray-400 flex p-2 gap-2 items-center rounded-l-md bg-gray-100">
              <input placeholder="Pesquise uma vaga" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full text-gray-400 bg-gray-100" />
            </div>
            <button type="submit" onClick={makeSearch} className="bg-slate-400 hover:bg-slate-500 text-white transition-all duration-500 ease-in-out flex justify-center items-center text-sm font-medium gap-2 -ml-4 rounded-r-md py-2  px-4 ">
              <Search size={16} />
              Pesquisar
            </button>
            <a href="/enviar" className="flex text-sm font-medium  transition-all duration-500 ease-in-out hover:bg-blue-600 justify-center items-center gap-1 text-white rounded-md bg-blue-500 w-72 text-center p-2">
              <UploadCloud className="ml-2" size={20} />
              <span className="w-40">
                Enviar uma vaga
              </span>
            </a>
            {userLogged.id > 0 ?
              <div className="text-right ">
                <Menu as="div" className="relative w-full inline-block text-left">
                  <Menu.Button className="inline-flex  text-blue-500 h-10 justify-center items-center w-full px-4 text-sm font-medium  border border-blue-500   rounded-md  hover:bg-blue-500 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    {/*
                    <PersonCircle
                      className="w-5 h-5 mr-2  hover:text-blue-600"
                      aria-hidden="true"
                      /> */}
                    <div className="p-0.5 rounded-full  border border-blue-500  flex bg-white ">
                      <Image className="rounded-full  " src={configState.loggedUser.imagem.url || "/user.svg"} alt="Danilo" width={30} height={30} />
                    </div>

                    <span className="ml-2 truncate w-24 ">{configState.loggedUser.nome.split(" ")[0]}</span>
                    <ChevronDown
                      size={20}
                      className="w-6 h-6 ml-2 -mr-1"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute z-[12] right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1  ">

                        <Menu.Item>
                          {({ active }) => (
                            <a href="editar-perfil"
                              className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                } group  font-medium flex rounded-md items-center w-full px-2 py-2 text-sm gap-1`}
                            >
                              <PersonOutline size={20} />
                              Editar Perfil
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a href="/minhas-vagas"
                              className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                } group  font-medium flex rounded-md items-center w-full px-2 py-2 text-sm gap-1`}
                            > <BriefcaseAlt size={20} />
                              Minhas vagas
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a href="/alterar-senha"
                              className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                } group  font-medium flex rounded-md items-center w-full px-2 py-2 text-sm gap-1`}
                            > <LockAlt size={20} />
                              Alterar Senha
                            </a>
                          )}
                        </Menu.Item>

                        {(userLogged.id == 10 || userLogged.id == 12 || userLogged.id == 8) &&
                          <Menu.Item>
                            {({ active }) => (
                              <a href="dashboard"
                                className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                  } group  font-medium  flex rounded-md items-center w-full px-2 py-2 text-sm gap-1`}
                              ><Dashboard size={20} />
                                Dashboard
                              </a>
                            )}
                          </Menu.Item>}
                      </div>
                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={logout}
                              className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                } group font-medium flex rounded-md items-center w-full px-2 py-2 text-sm gap-1`}
                            ><Power size={20} />
                              Sair
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              :
              <div className="text-right">
                <div onClick={() => Configs.update(s => { s.loginModalIsOpen = true })} className="transition-all  h-10 duration-500 ease-in-out flex items-center cursor-pointer justify-center w-full px-4 py-2 text-sm font-medium text-blue-500  border border-blue-500   rounded-md  hover:bg-blue-500 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  <PersonCircle
                    className="w-5 h-5 mr-2  hover:text-blue-100"
                    aria-hidden="true"
                  />
                  <span className="w-24">Fazer Login</span>
                </div>
              </div>
            }
          </div>

        </form>

        <section className="flex  md:hidden gap-4 w-full max-w-7xl p-4 items-center justify-between">
          <a href="/" className="flex hover:opacity-60  hover:-mt-2 transition-all duration-500 ease-in-out justify-center"><Image src="/Mural.svg" alt="Mural MaisVagasES" width={97} height={29} /></a>
          <div className='flex gap-2 text-gray-600'>
            {router.pathname == "/" && <button aria-label="Filtros" onClick={handleFilter} className='p-2' >{configState.filterIsOpen ? <FilterFilled size={32} /> : <FilterAlt size={32} />}</button>}
            <button aria-label="Pesquisar" onClick={handleSearch} className='p-2'>{configState.searchIsOpen ? <SearchAlt size={32} /> : <Search size={32} />}</button>
            {userLogged.id == 0 ?
              <button aria-label="Fazer Login" onClick={() => Configs.update(s => { s.loginModalIsOpen = true })} className='p-2  px-3   bg-gray-100 rounded-md focus:bg-gray-200 hover:bg-gray-200'>
                <PersonFill size={24} />
              </button>
              :
              <button aria-label="Abrir Menu" onClick={handleMenu} className='p-2 px-3 bg-gray-100 rounded-md focus:bg-gray-200 hover:bg-gray-200'>
                <MenuIcon size={24} />
              </button>
            }
          </div>
        </section>
        <section className="flex  md:hidden  flex-col gap-4 w-full max-w-7xl ">
          {configState.searchIsOpen && <div className="w-full px-4">
            <form onSubmit={makeSearch} className="w-full flex">
              <div className="w-full text-gray-400 flex p-3 gap-2 items-center rounded-l-md bg-gray-100">
                <input placeholder="Pesquise uma vaga" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full text-gray-400 bg-gray-100" />
              </div>
              <button type="submit" aria-label="Pesquisar" onClick={makeSearch} className="bg-slate-400 hover:bg-slate-500 text-white transition-all duration-500 ease-in-out flex justify-center items-center font-medium gap-2 -ml-4 rounded-r-md py-2  px-4 ">
                <Search size={16} />
                Pesquisar
              </button>
            </form>
          </div>
          }
          <a href="/enviar" className="flex text-xl  font-medium  transition-all duration-500 ease-in-out	 hover:bg-blue-600 justify-center items-center  gap-2 text-white  bg-blue-500 w-full md:w-72 text-center p-3">
            <UploadCloud size={30} />
            <span>Enviar uma vaga</span>
          </a>
        </section>

      </header>

      <div className="bg-yellow-100 w-full  flex flex-col  items-center justify-center">

        {userLogged.id != 0 && !userLogged.ativo && <div className=" flex text-sm flex-row gap-4 w-full max-w-7xl p-2">
          <span> Sua conta ainda não foi validada, <a href="#" onClick={NovaValidacao} className="font-bold underline">clique aqui</a> para receber um novo link de validação.</span>
        </div>
        }
      </div>
    </>
  )
}
