/* This example requires Tailwind CSS v2.0+ */
import React from 'react'
import Image from "next/image"
import { UploadCloud } from "@styled-icons/feather/UploadCloud"
import { Search } from "@styled-icons/boxicons-regular/Search"

export default function PageHeader() {
  return (
    <header className={"flex font-semibold border-b border-gray-200  w-full bg-white justify-center"}>
      <section className="flex flex-col md:flex-row gap-4 w-full max-w-7xl p-2">
        <a href="/" className="flex hover:opacity-60 justify-center"><Image src="/Mural.svg" width={97} height={29} /></a>
        <div className="w-full text-gray-400 flex p-3 gap-2 items-center rounded-md bg-gray-100">
          <Search size={16} />
          <input placeholder="Pesquise uma vaga" className="w-full text-gray-400 bg-gray-100" />
        </div>
        <a href="/enviar" className="flex hover:bg-opacity-60 justify-center items-center  gap-2 text-white rounded-md bg-blue-500 w-full md:w-72 text-center p-2"><UploadCloud size={20} /><span>Enviar uma vaga</span></a>
      </section>
    </header>
  )
}
