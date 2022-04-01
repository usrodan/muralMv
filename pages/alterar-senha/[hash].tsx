
import SEO from '@/components/SEO'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ArrowRightIcon from '@heroicons/react/outline/ArrowRightIcon'
import { SpinnerCircularFixed } from "spinners-react"
import { forcaSenha } from "@/utils/forcaSenha"
import KeyIcon from '@heroicons/react/outline/KeyIcon'
import { EyeOff } from "@styled-icons/fluentui-system-regular/EyeOff"
import { EyeShow } from "@styled-icons/fluentui-system-regular/EyeShow"
import { useRouter } from 'next/router';
import { toast } from 'react-toastify'
import { MD5 } from "crypto-js"
const Pagina = () => {

  const [loading, setLoading] = useState(false)
  const [ativo, setAtivo] = useState(false)
  const router = useRouter()

  const [passwordTip, setPasswordTip] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [medidorSenha, setMedidorSenha] = useState(0)

  useEffect(() => {
    setMedidorSenha(forcaSenha(senha))
  }, [senha])

  async function updatePassword() {
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

      }
      catch (e) {
        toast.error(e, { position: 'bottom-center' })
        error = true
      }
      if (!error) {

        axios.post(`/api/updatePasswordByHash`, {
          password: senha,
          hash: router.query.hash
        }).then(response => {
          if (response.data.error) {
            toast.error("Não foi possivel alterar sua senha com o código informado. Tente outra vez", {
              position: 'bottom-center'
            })
            setLoading(false)
          }
          if (response.data.updatedAt) {
            setLoading(false)
            toast.success("Senha Alterada com sucesso", { position: 'bottom-center' })

            setSenha("")
            setConfirmarSenha("")
            localStorage.setItem("SessionMural", JSON.stringify({ token: String(MD5(response.data.username + response.data.id + response.data.email)), user: response.data }))

            router.push("/")
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
    <>
      <SEO siteName="Mais Vagas ES" title="Alterar Senha" description="" />
      <main className='flex flex-col w-full items-center'>

        <section className='w-full flex flex-col max-w-xl gap-4 items-center py-[60px] p-4'>
        <h2 className="my-2 font-medium text-[32px] text-center">Recuperar senha</h2>
          <div className="flex md:min-w-[362px] w-full flex-col mt-2">
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


          <div className="flex md:min-w-[362px] w-full flex-col md:mt-2">
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
          {!loading ?
            <button onClick={updatePassword} className="flex items-center justify-center w-full px-6 py-4 space-x-2 rounded-lg transition-all duration-500 ease-in-out bg-blue-500 filter hover:bg-blue-600">
              <span className="text-white"> Atualizar Senha </span>
              <ArrowRightIcon className="w-5 text-white" />
            </button>
            :
            <button className="flex items-center cursor-not-allowed justify-center w-full px-6 py-4 space-x-2 rounded-lg transition-all duration-500 ease-in-out bg-blue-300 filter hover:bg-blue-400">
              <span className="text-white"> Atualizar Senha  ... </span>
              <SpinnerCircularFixed size={20} thickness={180} speed={150} color="#FFF" secondaryColor="rgba(255, 255, 255, 0.15)" />
            </button>
          }

        </section>

      </main>


    </>);
}

export default Pagina;