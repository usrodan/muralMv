
import { Configs } from '@/configs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { SpinnerCircularFixed } from "spinners-react";

const NotLoggedAdvice: React.FC = () => {
    const router = useRouter()
    const ConfigsState = Configs.useState()  

    function openLogin() {
        Configs.update(s => {
            s.loginModalIsOpen = true
        })
    }

    function goToHomePage() {
        router.push("/")
    }


    return (
        <div>
            <div className="flex flex-col items-center justify-center py-24 lg:py-12 md:px-16 px-4">
                {ConfigsState.loading ? 
                  <SpinnerCircularFixed size={25} thickness={180} speed={150} color="#3b82f6" secondaryColor="rgba(255, 255, 255, 0.15)" />
                    
                :
                <>
                <h1 className="text-7xl font-bold text-blue-500 pb-2">Ops!</h1>
                <h2 className="lg:text-5xl md:text-4xl text-2xl font-bold text-gray-800 py-2">Acesso não autorizado</h2>
                <p className="text-base text-gray-600 py-2 text-center">Descuple! Parece que não possui acessos suficientes para acessar essa página.</p>
                <div className="flex md:flex-row flex-col items-center justify-center md:gap-8 mt-4 mb-12 w-full">
                    <button onClick={goToHomePage} className="p-4 text-base text-center text-white md:w-auto md:mb-0 mb-4 w-full bg-blue-500 border rounded-md hover:bg-blue-600">Voltar para página inicial</button>
                    <button onClick={openLogin} className="p-4 text-base font-semibold text-center md:w-auto w-full bg-white text-blue-500 border border-blue-500 rounded-md hover:bg-gray-200">Fazer login</button>
                </div>
                </>}
            </div>

        </div>
    )
}

export default NotLoggedAdvice