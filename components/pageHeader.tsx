/* This example requires Tailwind CSS v2.0+ */
import Image from "next/image"
import { UploadCloud } from "@styled-icons/feather/UploadCloud"
import { Search } from "@styled-icons/boxicons-regular/Search"
import { SearchAlt } from "@styled-icons/boxicons-regular/SearchAlt"
import { FilterAlt } from "@styled-icons/boxicons-regular/FilterAlt"
import { FilterAlt as FilterFilled } from "@styled-icons/boxicons-solid/FilterAlt"
import { Configs } from '@/configs'
import { useRouter } from "next/router"
import { useEffect, useRef, Fragment, useState } from "react"
import { MD5 } from "crypto-js"
import { Menu, Dialog, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { PersonCircle } from "@styled-icons/bootstrap/PersonCircle"
import { Menu as MenuIcon } from "@styled-icons/evaicons-solid/Menu"
import { XIcon } from '@heroicons/react/outline'
import {PersonFill} from "@styled-icons/bootstrap/PersonFill"
import LoginModal from "@/components/LoginModal"
import axios from "axios"
import { toast } from "react-toastify"

export default function PageHeader() {
  const configState = Configs.useState()
  const router = useRouter()
  const [search, setSearch] = useState(null)
  const [userLogged, setUserLogged] = useState({ nome: "", id: 0, ativo: false })
  const [open, setOpen] = useState(false)

  function logout() {
    localStorage.removeItem("SessionMural")
    setUserLogged({ nome: "", id: 0, ativo: false })
    setOpen(false)
    router.reload()
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
    CookieSession && CookieSession.token == String(MD5(CookieSession.user.username + CookieSession.user.id + CookieSession.user.email)) ? setUserLogged(CookieSession.user) : setUserLogged({ ativo: false, nome: "", id: 0 })
    if (CookieSession && CookieSession.user && CookieSession.user.id != 0) {
      axios.get(`/api/getUser/${CookieSession.user.id}`).then(response => {
        if (response.data) {
          setUserLogged(response.data)
          localStorage.setItem("SessionMural", JSON.stringify({ token: String(MD5(CookieSession.user.username + CookieSession.user.id + CookieSession.user.email)), user: response.data }))
          setTimeout(() => {
            Configs.update(s => { s.loading = false })
          }, 1000);

        } else {
          localStorage.removeItem("SessionMural")
          setTimeout(() => {
            Configs.update(s => { s.loading = false })
          }, 1000);
        }
      })
    } else {
      setTimeout(() => {
        Configs.update(s => { s.loading = false })
      }, 1000);
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
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="fixed z-20 inset-0 overflow-hidden" onClose={setOpen}>
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
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <div className="pointer-events-auto relative w-screen max-w-md">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="rounded-md text-white bg-orange-500 hover:text-white focus:outline-none  "
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Fechar</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <Dialog.Title className="text-lg font-medium text-gray-900"> Olá, {userLogged.nome} </Dialog.Title>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <a onClick={()=>setOpen(false)} href="/minhas-vagas"
                          className={` group flex rounded-md items-center w-full px-2 py-2 text-md focus:text-blue-500`}
                        > 
                          Minhas vagas
                        </a>

                        <a  onClick={()=>setOpen(false)} href="/editar-perfil"
                          className={` group flex rounded-md items-center w-full px-2 py-2 text-md focus:text-blue-500`}
                        > 
                          Editar Perfil
                        </a>

                        <button  onClick={logout}
                          className={` group flex rounded-md items-center w-full px-2 py-2 text-md focus:text-blue-500`}
                        > 
                          Sair
                        </button>
                      </div>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      }
      <header className={"flex flex-col border-b border-gray-300 items-center font-semibold  w-full bg-white justify-center"}>
        <form onSubmit={makeSearch} className="hidden md:flex  flex-row gap-4 w-full max-w-7xl p-4">
          <a href="/" className="flex hover:opacity-60  hover:-mt-2 transition-all duration-500 ease-in-out w-32 justify-center"><Image src="/Mural.svg" className="w-40" alt="Mural MaisVagasES" width={126} height={38} /></a>
          <div className="w-full text-gray-400 flex p-2 gap-2 items-center rounded-l-md bg-gray-100">
            <input placeholder="Pesquise uma vaga" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full text-gray-400 bg-gray-100" />
          </div>
          <button type="submit" onClick={makeSearch} className="bg-slate-400 hover:bg-slate-500 text-white transition-all duration-500 ease-in-out flex justify-center items-center font-semibold gap-2 -ml-4 rounded-r-md py-2  px-4 "><Search size={16} />Pesquisar</button>
          <a href="/enviar" className="flex transition-all duration-500 ease-in-out hover:bg-blue-600 justify-center items-center gap-2 text-white rounded-md bg-blue-500 w-96 text-center p-2"><UploadCloud size={20} /><span className="w-40">Enviar uma vaga</span></a>

          {userLogged.id > 0 ?
            <div className="text-right">

              <Menu as="div" className="relative w-full inline-block text-left">
                <Menu.Button className="inline-flex text-blue-500  justify-center w-full px-4 py-2 text-sm font-medium  border border-blue-500   rounded-md  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  <PersonCircle
                    className="w-5 h-5 mr-2  hover:text-blue-600"
                    aria-hidden="true"
                  />
                  <span className="w-22">{userLogged.nome.split(" ")[0]}</span>
                  <ChevronDownIcon
                    className="w-5 h-5 ml-2 -mr-1  hover:text-blue-600"
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
                          <a href="/minhas-vagas"
                            className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >

                            Minhas vagas
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a href="editar-perfil"
                            className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >

                            Editar Perfil
                          </a>
                        )}
                      </Menu.Item>
                    </div>

                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={logout}
                            className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'
                              } group font-semibold flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
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
              <a href="#" onClick={() => Configs.update(s => { s.loginModalIsOpen = true })} className="transition-all duration-500 ease-in-out flex items-center cursor-pointer justify-center w-full px-4 py-2 text-sm font-medium text-blue-500  border border-blue-500   rounded-md  hover:bg-blue-500 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                <PersonCircle
                  className="w-5 h-5 mr-2  hover:text-blue-100"
                  aria-hidden="true"
                />
                <span className="w-24">Fazer Login</span>
              </a>
            </div>
          }
        </form>

        <section className="flex  md:hidden gap-4 w-full max-w-7xl p-4 items-center justify-between">
          <a href="/" className="flex hover:opacity-60  hover:-mt-2 transition-all duration-500 ease-in-out justify-center"><Image src="/Mural.svg" alt="Mural MaisVagasES" width={97} height={29} /></a>
          <div className='flex gap-2 text-gray-600'>
            {router.pathname == "/" && <button onClick={handleFilter} className='p-2' >{configState.filterIsOpen ? <FilterFilled size={32} /> : <FilterAlt size={32} />}</button>}
            <button onClick={handleSearch} className='p-2'>{configState.searchIsOpen ? <SearchAlt size={32} /> : <Search size={32} />}</button>
            {userLogged.id == 0 ?
              <button onClick={() => Configs.update(s => { s.loginModalIsOpen = true })} className='p-2  px-3   bg-gray-100 rounded-md focus:bg-gray-200 hover:bg-gray-200'>
                <PersonFill size={24} />
              </button>
              :
              <button onClick={() => setOpen(!open)} className='p-2 px-3 bg-gray-100 rounded-md focus:bg-gray-200 hover:bg-gray-200'>
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
              <button type="submit" onClick={makeSearch} className="bg-slate-400 hover:bg-slate-500 text-white transition-all duration-500 ease-in-out flex justify-center items-center font-semibold gap-2 -ml-4 rounded-r-md py-2  px-4 ">
                <Search size={16} />
                Pesquisar
              </button>
            </form>
          </div>
          }
          <a href="/enviar" className="flex text-xl  transition-all duration-500 ease-in-out	 hover:bg-blue-600 justify-center items-center  gap-2 text-white  bg-blue-500 w-full md:w-72 text-center p-3">
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
