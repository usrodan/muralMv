import { Fragment, useEffect, useState } from 'react'
import { Configs } from '@/configs'
import { useRouter } from 'next/router'
import { PersonOutline } from "@styled-icons/material-sharp/PersonOutline"
import { BriefcaseAlt } from "@styled-icons/boxicons-regular/BriefcaseAlt"
import { LockAlt } from "@styled-icons/boxicons-regular/LockAlt"
import { ShutDown as Power } from "@styled-icons/remix-line/ShutDown"
import { Dashboard } from "@styled-icons/remix-line/Dashboard"
import Image from "next/image"
import DoLogout from '@/utils/DoLogout'

const SidebarLogged: React.FC = () => {
  const router = useRouter()
  const configState = Configs.useState()

  function logout() {
    DoLogout()
    router.push("/")
  }

  function handleMenu() {
    Configs.update(s => {
      s.menuIsOpen = false
    })
  }
  return (
    <div className='py-8 md:py-20 md:px-8 gap-2 flex flex-col items-center w-full bg-white '>
      <div className='rounded-full p-1 border-2  border-blue-500  flex justify-center items-centerbg-white'>
        <Image className="rounded-full" src={configState.loggedUser.imagem.url || "/user.svg"} alt="Danilo" width={100} height={100} />
      </div>
      <h2 className='text-xl'>{configState.loggedUser.nome}</h2>
      <span className='text-sm font-regular -mt-3 text-gray-500'>{configState.loggedUser.empresa}</span>

      <nav className='flex flex-col gap-3 mt-8 md:mt-10 w-full font-medium text-gray-700 '>
        <a href="/editar-perfil"
          onClick={handleMenu} className={`${router.asPath == "/editar-perfil" && "bg-blue-100 text-blue-700"}  hover:bg-blue-100  hover:text-blue-700 w-full px-3 gap-2 py-2 flex items-center rounded-lg`}>
          <PersonOutline size="24" />
          Editar Perfil
        </a>

        <a href="/minhas-vagas"
          onClick={handleMenu} className={`${router.asPath == "/minhas-vagas" && "bg-blue-100 text-blue-700"}  hover:bg-blue-100  hover:text-blue-700 w-full px-3 gap-2 py-2 flex items-center rounded-lg`}>
          <BriefcaseAlt size="24" />
          Minhas Vagas
        </a>

        <a href="/alterar-senha"
          onClick={handleMenu} className={`${router.asPath == "/alterar-senha" && "bg-blue-100 text-blue-700"} hover:bg-blue-100  hover:text-blue-700 w-full px-3 gap-2 py-2 flex items-center rounded-lg`}>
          <LockAlt size="24" />
          Alterar Senha
        </a>

        {(configState.loggedUser.id == 10 || configState.loggedUser.id == 12 || configState.loggedUser.id == 8) &&
          <a href="/dashboard"
            onClick={handleMenu}
            className={`${router.asPath == "/dashboard" && "bg-blue-100 text-blue-700"} hover:bg-blue-100  hover:text-blue-700 w-full px-3 gap-2 py-2 flex items-center rounded-lg`}
          >
            <Dashboard size="24" />
            Dashboard
          </a>}

        <a href="#" onClick={logout} className='hover:bg-blue-100  hover:text-blue-700 w-full px-3 gap-2 py-2 flex items-center rounded-lg'>
          <Power size="24" />
          Sair
        </a>
      </nav>
    </div>
  )
}

export default SidebarLogged 