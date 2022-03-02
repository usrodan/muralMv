/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from 'react'
import Image from "next/image"
import {UploadCloud} from "@styled-icons/feather/UploadCloud" 


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() { 
  return (
    <header className={"flex font-semibold  w-full bg-white justify-center"}>
      <section className="flex flex-col md:flex-row gap-4 w-full max-w-7xl p-2">
        <Image src="/Mural.svg" width={97} height={29} />
        <div className="w-full p-3 rounded-md bg-gray-100"><input className="w-full bg-gray-100"></input></div>
        <a href="#" className="flex justify-center items-center  gap-2 text-white rounded-md bg-primary w-full md:w-72 text-center p-2"><UploadCloud size={20}/><span>Enviar uma vaga</span></a>
      </section>
    </header>
  )
}
