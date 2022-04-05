
import SEO from '@/components/SEO';
import SidebarLogged from '@/components/SidebarLogged';
import { useEffect, useState } from 'react';
import { MD5 } from "crypto-js";
import KeyIcon from '@heroicons/react/outline/KeyIcon'
import { EyeOff } from "@styled-icons/fluentui-system-regular/EyeOff"
import { EyeShow } from "@styled-icons/fluentui-system-regular/EyeShow"
import { Person } from "@styled-icons/bootstrap/Person"
import { Building } from "@styled-icons/bootstrap/Building"
import { Verified } from "@styled-icons/octicons/Verified"
import { Whatsapp } from "@styled-icons/bootstrap/Whatsapp"
import { Save } from '@styled-icons/fluentui-system-regular/Save'
import MailIcon from '@heroicons/react/outline/MailIcon'
import { Configs } from '@/configs'
import { forcaSenha } from "@/utils/forcaSenha"
import { validateEmail } from "@/utils/validateEmail"
import { SpinnerCircularFixed } from "spinners-react";
import { useRouter } from 'next/router';
import formatCNPJ from '@/utils/formatCNPJ';
import slugify from '@/utils/slugify';
import axios from 'axios'
import { toast } from 'react-toastify';

const AlterarSenha = () => {

  const router = useRouter()
  const [loading, setLoading] = useState(false) 
  const [username, setUsername] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [medidorSenha, setMedidorSenha] = useState(0)
  const [passwordTip, setPasswordTip] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)
  const configState = Configs.useState() 

  useEffect(() => {
    setMedidorSenha(forcaSenha(senha))
  }, [senha])

  async function salvarPerfil() {
    let error = false
    if (!loading) {
      setLoading(true)
      try {
        if (!senha)
          throw "Insira uma senha";
        if (senha && forcaSenha(senha) < 4)
          throw "Senha Fraca ";
        if (senha && senha != confirmarSenha)
          throw "As senhas não são iguais";
      } catch (e) {
        toast.error(e, { position: 'bottom-center' })
        error = true
      }

      if (!error) {
        axios.post("/api/updatePassword", {
          hash: String(MD5("##@@$%&" + username + "##@@$%&" + configState.loggedUser.id + "##@@$%&")),
          username,
          password:senha, 
          id: configState.loggedUser.id
        }).then(response => {
          toast.success("Senha alterada com sucesso!", { position: 'bottom-center' })
          setLoading(false)
          setSenha("")
          setConfirmarSenha("")
        }).catch(e => {
          toast.error("Erro ao alterar senha!", { position: 'bottom-center' })
          setLoading(false)
        })
      }
      else {
        setLoading(false)
      }
    }
  }
  function formatWhatsapp(v) {
    v = v.substring(0, 15);
    v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca prênteses em volta dos dois primeiros dígitos
    v = v.replace(/(\d)(\d{4})$/, "$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
    return v;
  }

  return (
    <>
      <SEO siteName="Mais Vagas ES" title="Editar Perfil" description="" />
      <main className='flex flex-col  w-full items-center ' >
        <div className='grid md:grid-cols-12 gap-4 w-full max-w-7xl'>
          <div className="hidden md:flex col-span-3 w-full">
            <SidebarLogged />
          </div>

          <div className='col-span-9 w-full min-h-full p-4 md:pt-10 md:pl-8 md:mb-10'>

            <h1>Alterar Senha</h1>

            <section className=' md:p-10 gap-2 flex flex-col flex-1 w-full rounded-lg md:border border-gray-200 md:bg-white  '>
              <h2 className='text-xl'>Altere sua senha 😄</h2>  

              <section className='grid md:grid-cols-2 gap-4 '>
             
              <div className="flex md:min-w-[302px] flex-col mt-2">
                    <div className="flex border-2  max-h-[55px]  rounded-lg bg-white">
                      <KeyIcon className="opacity-20 w-5 ml-4 mt-3 mb-3 mr-2 " />
                      <input
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        className="w-full p-3  outline-none focus-within:outline-none focus:outline-none"
                        type={showPassword ? "text" : "password"}
                        placeholder="Senha"
                      />
                      <div className='cursor-pointer  flex items-center mr-2' onClick={() => setShowPassword(!showPassword)}>{!showPassword ? <EyeShow className="text-[#19313C] text-opacity-20 w-5" /> : <EyeOff className="text-[#19313C] text-opacity-20 w-5" />}</div>
                    </div>
                    <div className='flex flex-col w-full relative'>
                      {passwordTip && <div className="absolute top-[-200px] left-0   rounded-md">
                        <div className="mx-auto container max-w-[338px] px-4 py-4 bg-blue-100 text-blue-700 rounded-md relative">
                          <p className="text-sm font-semibold leading-none  ">Dicas para uma senha forte:</p>
                          <p className=" text-xs leading-1   pt-2 pb-2">
                            - Mínimo de 8 caracteres<br />
                            - Letras maiúsculas<br />
                            - Letras mainúsculas<br />
                            - Números<br />
                            - Caracteres Especiais<br />
                          </p>
                          <svg className="absolute z-10 bottom-[-10px] " width={16} height={10} viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 10L0 0L16 1.41326e-06L8 10Z" fill="#DBEAFE" />
                          </svg>
                        </div>
                      </div>}

                      <div onMouseEnter={() => { setPasswordTip(true) }} onMouseLeave={() => { setPasswordTip(false) }} className='grid grid-cols-5 gap-2 p-2'>
                        {Array(medidorSenha).fill(medidorSenha).map((a, i) => {
                          return <div key={i} className={`h-1 w-full ${a == 1 && "bg-red-300"} ${a == 2 && "bg-orange-300"} ${a == 3 && "bg-orange-300"} ${a == 4 && "bg-green-300"} ${a == 5 && "bg-green-300"} rounded-md`}></div>
                        })}
                        {Array(medidorSenha == 0 ? 5 : 5 - medidorSenha).fill(medidorSenha).map((a, i) => {
                          return <div key={i} className={`h-1 w-full bg-gray-200 rounded-md`}></div>
                        })}
                      </div>

                    </div>

                  </div>


                  <div className="flex md:min-w-[302px] flex-col md:mt-2">
                    <div className="flex border-2  max-h-[55px]  rounded-lg bg-white">
                      <KeyIcon className="opacity-20 w-5 ml-4 mt-4 mb-4 mr-2" />
                      <input
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                        className="w-full p-3 outline-none focus-within:outline-none focus:outline-none"
                        type={showPasswordConfirmation ? "text" : "password"}
                        placeholder="Confirmar Senha"
                      />
                      <div className='cursor-pointer flex items-center mr-2' onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}>{!showPasswordConfirmation ? <EyeShow className="text-[#19313C] text-opacity-20 w-5" /> : <EyeOff className="text-[#19313C] text-opacity-20 w-5" />}</div>

                    </div>
                  </div>



              </section>

              <div className="mt-6">
                {!loading ?
                  <button onClick={salvarPerfil} className="inline-flex w-full md:w-auto items-center justify-center px-6 py-4 space-x-2 rounded-lg transition-all duration-500 ease-in-out bg-blue-500 filter hover:bg-blue-600">
                    <Save className="w-5 text-white" />
                    <span className="text-white"> Salvar </span> 
                  </button>
                  :
                  <button className="inline-flex w-full md:w-auto  items-center cursor-not-allowed justify-center px-6 py-4 space-x-2 rounded-lg transition-all duration-500 ease-in-out bg-blue-300 filter hover:bg-blue-400">
                    <SpinnerCircularFixed size={20} thickness={180} speed={150} color="#FFF" secondaryColor="rgba(255, 255, 255, 0.15)" />
                    <span className="text-white"> Salvando ... </span>
                  </button>
                }
              </div>

            </section>

          </div>


        </div>

      </main>
    </>);
}

export default AlterarSenha;