import React from "react";

export default function Custom404() {
    return <div className="flex text-secondary gap-3 items-start w-full py-32 justify-center ">
        <span className="font-bold text-primary text-7xl mt-2">404</span>
        <div className="h-20 w-0.5 bg-gray-400" />
        <section className="flex flex-col">
            <span className="text-4xl font-bold">Página não encontrada</span>
            <span className="text-gray-400">Por favor cheque o endereço digitado e tente novamente.</span>
            <div className="flex text-sm gap-2 mt-6">
                
                <a href="/" className="bg-primary  text-white rounded-md p-2">Voltar para home</a>
                 
                <a href="/contato" className="bg-primary bg-opacity-30 text-primary rounded-md p-2">Entrar em contato</a>
                 
            </div>

        </section>
    </div>
}