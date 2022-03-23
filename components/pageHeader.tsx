/* This example requires Tailwind CSS v2.0+ */
import Image from "next/image"
import { UploadCloud } from "@styled-icons/feather/UploadCloud"
import { Search } from "@styled-icons/boxicons-regular/Search"
import {SearchAlt } from "@styled-icons/boxicons-regular/SearchAlt"
import { FilterAlt } from "@styled-icons/boxicons-regular/FilterAlt"
import { FilterAlt as FilterFilled } from "@styled-icons/boxicons-solid/FilterAlt"
import { Configs } from '@/configs'
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

let timeout = null;

export default function PageHeader() {
  const configState = Configs.useState()
  const router = useRouter()
  const [search, setSearch] = useState(null)

  useEffect(()=>{
    configState.search != undefined && setSearch(configState.search)
  },[configState.search])

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

  function makeSearch(e=null) {
    //@ts-ignore
    e && e.preventDefault();
    handleSearch()
    router.push(`/?search=${search}`)
  }


  return (
    <header className={"flex flex-col items-center font-semibold z-10  w-full bg-white justify-center"}>
      <form onSubmit={makeSearch} className="hidden md:flex  flex-row gap-4 w-full max-w-7xl p-4">
        <a href="/" className="flex hover:opacity-60  hover:-mt-2 transition-all duration-500 ease-in-out justify-center"><Image src="/Mural.svg" alt="Mural MaisVagasES" width={97} height={29} /></a>
        <div className="w-full text-gray-400 flex p-3 gap-2 items-center rounded-l-md bg-gray-100">
          <input placeholder="Pesquise uma vaga" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full text-gray-400 bg-gray-100" />
        </div>
        <button type="submit" onClick={makeSearch} className="bg-slate-400 hover:bg-slate-500 text-white transition-all duration-500 ease-in-out flex justify-center items-center font-semibold gap-2 -ml-4 rounded-r-md py-2  px-4 "><Search size={16} />Pesquisar</button>
        <a href="/enviar" className="flex  transition-all duration-500 ease-in-out	 hover:bg-blue-600 justify-center items-center  gap-2 text-white rounded-md bg-blue-500 w-full md:w-72 text-center p-2"><UploadCloud size={20} /><span>Enviar uma vaga</span></a>
      </form>

      <section className="flex  md:hidden gap-4 w-full max-w-7xl p-4 items-center justify-between">
        <a href="/" className="flex hover:opacity-60  hover:-mt-2 transition-all duration-500 ease-in-out justify-center"><Image src="/Mural.svg" alt="Mural MaisVagasES" width={97} height={29} /></a>
        <div className='flex gap-2 text-gray-600'>
          {router.pathname == "/" && <button onClick={handleFilter} className='p-2' >{configState.filterIsOpen ? <FilterFilled size={32} /> : <FilterAlt size={32} />}</button>}
          <button onClick={handleSearch} className='p-2'>{configState.searchIsOpen ? <SearchAlt size={32} /> : <Search size={32} />}</button>
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
  )
}
