import React, { useState } from 'react'
import axios from "axios"
import ArrowRightIcon from '@heroicons/react/outline/ArrowRightIcon'
import MailIcon from '@heroicons/react/outline/MailIcon' 
import { toast } from 'react-toastify' 
import Info from '@/components/Info'
import { SpinnerCircularFixed } from "spinners-react";
import { validateEmail } from "@/utils/validateEmail"

export default function RecuperarSenhaPage() {
  const [emailEnviado, setEmailEnviado] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")

  async function recuperarSenha() {
    let error = false
    if (!loading) {
      setLoading(true)
      try {
        if (!email)
          throw "Insira seu email";
        if (email && !validateEmail(email))
          throw "Email Inválido";
      }
      catch (e) {
        toast.error(e, { position: 'bottom-center' })
        error = true
      }
      if (!error) {

        axios.get(`/api/resetPassword/${email}`).then(response => {
          if (response.data.error) {
            toast.error("Esse email não existe em nosso banco de dados", {
              position: 'bottom-center'
            })
            setLoading(false)
          } else {
            setEmailEnviado(true)
            setLoading(false)
          }
        }).catch(e => {
          setLoading(false)
          console.info(e)
          toast.error(e, {
            position: 'bottom-center'
          })
        })
      }
      else {
        setLoading(false)
      }
    }
  }



  return (
    <main className="flex flex-col gap-4 text-gray-800  md:p-8 items-center ">
      <section className=" font-dm-sans bg-slate-light">
        <div className="mx-6 max-w-default md:m-auto">
          <div className="justify-center md:flex">
            <div>
              <div className="p-6 md:p-[60px] md:max-w-3xl  lg  md:m-auto    ">
                <h2 className="my-2 font-medium text-[32px] text-center">Recuperar senha</h2>
                {emailEnviado ?
                  <div className='grid text-center gap-4 '>
                    
                    <span>Em instantes receberá um email com o link de recuperação de senha.</span>
                    <span>Não se esqueça de verificar na caixa de SPAM.</span>
                  </div>
                  :
                  <>
                    <section className='grid  gap-4 '>
                      <span className='text-center'>Digite seu email e iremos enviar um link de recuperação de senha.</span>
                      <div className="flex md:min-w-[362px] flex-col mt-2">
                        <div className="flex border-2  max-h-[55px]  rounded-lg bg-white">
                          <MailIcon className="opacity-20 w-5 ml-4 mt-4 mb-4 mr-2" />
                          <input
                            className="w-full p-3  rounded-md outline-none focus-within:outline-none focus:outline-none"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>

                    </section>
                    <div className="mt-6">
                      {!loading ?
                        <button onClick={recuperarSenha} className="flex items-center justify-center w-full px-6 py-4 space-x-2 rounded-lg transition-all duration-500 ease-in-out bg-blue-500 filter hover:bg-blue-600">
                          <span className="text-white"> Recuperar senha </span>
                          <ArrowRightIcon className="w-5 text-white" />
                        </button>
                        :
                        <button className="flex items-center cursor-not-allowed justify-center w-full px-6 py-4 space-x-2 rounded-lg transition-all duration-500 ease-in-out bg-blue-300 filter hover:bg-blue-400">
                          <span className="text-white"> Aguarde ... </span>
                          <SpinnerCircularFixed size={20} thickness={180} speed={150} color="#FFF" secondaryColor="rgba(255, 255, 255, 0.15)" />
                        </button>
                      }
                    </div>
                  </>}

                <div className="mt-4">
                  <Info texto='<a target="_blank" rel="noreferrer" href="https://api.whatsapp.com/send?phone=27992830038&text=Estou com problemas com a recuperação de senha.">Caso haja alguma dúvida sobre a recuperação de senha, entre em contato com nosso suporte clicando aqui</a>'></Info>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>)

}