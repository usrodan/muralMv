import React, { useEffect, useState } from 'react';
import axios from "axios"
import { HomeIcon } from '@heroicons/react/solid'
import { LogOut } from "@styled-icons/entypo/LogOut"
import ArrowRightIcon from '@heroicons/react/outline/ArrowRightIcon';
import MailIcon from '@heroicons/react/outline/MailIcon';
import KeyIcon from '@heroicons/react/outline/KeyIcon';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { MD5 } from "crypto-js"
import slugify from '@/utils/slugify';
import formatCNPJ from '@/utils/formatCNPJ';
import validarCNPJ from '@/utils/validarCNPJ';
import { Person } from "@styled-icons/bootstrap/Person"
import { Building } from "@styled-icons/bootstrap/Building"
import { Verified } from "@styled-icons/octicons/Verified"
import { Whatsapp } from "@styled-icons/bootstrap/Whatsapp"
import { EyeOff } from "@styled-icons/fluentui-system-regular/EyeOff"
import { EyeShow } from "@styled-icons/fluentui-system-regular/EyeShow"
import Info from '@/components/Info';
import { Configs } from '@/configs';
import { SpinnerCircularFixed } from "spinners-react";

export default function Index() {
  const router = useRouter()
  const [passwordTip, setPasswordTip] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [empresa, setEmpresa] = useState("")
  const [nome, setNome] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [cnpj, setCnpj] = useState("")
  const [cnpjUnformatted, setCnpjUnformatted] = useState("")
  const [whatsappUnformatted, setWhatsappUnformatted] = useState("")
  const [username, setUsername] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [medidorSenha, setMedidorSenha] = useState(0)

  useEffect(() => {
    setCnpjUnformatted(cnpj.replace(".", "").replace(".", "").replace("/", "").replace("-", ""))

  }, [cnpj])

  useEffect(() => {
    setWhatsappUnformatted(whatsapp.replace("(", "").replace(")", "").replace(" ", "").replace("-", ""))

  }, [whatsapp])

  useEffect(() => {
    if (cnpjUnformatted.length == 14) {
      validarCNPJ(cnpj) ? getCNPJ() : toast.error("CNPJ Inválido", { position: 'bottom-center' })
    }
  }, [cnpjUnformatted])


  useEffect(() => {
    empresa && setUsername(slugify(empresa))
  }, [empresa])

  useEffect(() => {
    setMedidorSenha(ForcaSenha(senha))
  }, [senha])

  function formatWhatsapp(v) {
    v = v.substring(0, 15);
    v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca prênteses em volta dos dois primeiros dígitos
    v = v.replace(/(\d)(\d{4})$/, "$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
    return v;
  }

  function validateEmail(str) {
    var lastAtPos = str.lastIndexOf('@');
    var lastDotPos = str.lastIndexOf('.');
    return (lastAtPos < lastDotPos && lastAtPos > 0 && str.indexOf('@@') == -1 && lastDotPos > 2 && (str.length - lastDotPos) > 2);
}

  function ForcaSenha(p) {
    var letrasMaiusculas = /[A-Z]/;
    var letrasMinusculas = /[a-z]/;
    var numeros = /[0-9]/;
    var caracteresEspeciais = /[!|@|#|$|%|^|&|*|(|)|-|_]/;
    var auxMaiuscula = 0;
    var auxMinuscula = 0;
    var auxNumero = 0;
    var auxEspecial = 0;
    var length = 0;
    if (p.length >= 8) {
      length = 1
    }
    for (var i = 0; i < p.length; i++) {

      if (letrasMaiusculas.test(p[i])) {
        auxMaiuscula = 1
      }
      if (letrasMinusculas.test(p[i])) {
        auxMinuscula = 1
      }

      if (numeros.test(p[i])) {
        auxNumero = 1
      }

      if (caracteresEspeciais.test(p[i])) {
        auxEspecial = 1
      }
    }
    return auxEspecial + auxNumero + auxMinuscula + auxMaiuscula + length
  }

  async function getCNPJ() {
    const consultarCNPJ = require('consultar-cnpj')
    const pj = await consultarCNPJ(cnpjUnformatted)
    setEmpresa(pj.estabelecimento && pj.estabelecimento.nome_fantasia ? pj.estabelecimento.nome_fantasia : pj.razao_social)
  }
  function fazerCadastro() {
    if (!loading) {
      setLoading(true)
      !nome && toast.error("Insira seu nome", { position: 'bottom-center' })
      cnpj.length == 0 && toast.error("Insira o CNPJ da sua empresa", { position: 'bottom-center' })
      cnpj.length > 0 && !validarCNPJ(cnpjUnformatted) && toast.error("CNPJ inválido", { position: 'bottom-center' })
      !empresa && toast.error("Insira o nome da sua empresa", { position: 'bottom-center' })
      !username && toast.error("Insira um nome de usuário", { position: 'bottom-center' })
      !email && toast.error("Insira seu email", { position: 'bottom-center' })
      email && !validateEmail(email) && toast.error("Email Inválido", { position: 'bottom-center' })
      !senha && toast.error("Insira uma senha", { position: 'bottom-center' })
      senha && ForcaSenha(senha) < 4 && toast.error("Senha Fraca ", { position: 'bottom-center' })
      senha && senha != confirmarSenha && toast.error("As senhas não são iguais", { position: 'bottom-center' })
      whatsapp.length == 0 && toast.error("Insira seu número do Whatsapp", { position: 'bottom-center' })
      whatsapp.length > 0 && whatsapp.length < 15 && toast.error("Número de Whatsapp inválido", { position: 'bottom-center' })

      if (
        email &&
        senha == confirmarSenha &&
        ForcaSenha(senha) >= 4 &&
        nome &&
        username &&
        validarCNPJ(cnpjUnformatted) &&
        whatsapp.length == 15 &&
        empresa
      ) {
        axios.post(`${process.env.NEXT_PUBLIC_STRAPI}/api/auth/local/register`, {
          email: email,
          password: senha,
          username,
          nome,
          whatsapp: whatsappUnformatted,
          cnpj: cnpjUnformatted,
          empresa
        }).then(response => {
          if (response.data.error) {
            toast.error(response.data.error.name, {
              position: 'bottom-center'
            })
          }
          if (response.data.user) {
            setLoading(false)
            toast.success("Cadastrado com sucesso", { position: 'bottom-center' })
            localStorage.setItem("SessionMural", JSON.stringify({ token: String(MD5(response.data.user.username + response.data.user.id + response.data.user.email)), user: response.data.user }))
            setEmail("")
            setSenha("")
            axios.get(`/api/sendConfirmation/${response.data.user.id}`)
            router.push("/enviar")
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
    <main className="flex flex-col gap-4  md:p-8 items-center ">
      <section className=" font-dm-sans bg-slate-light">
        <div className="mx-6 max-w-default md:m-auto">
          <div className="justify-center md:flex">
            <div>
              <div className="p-6 md:p-[60px] border-gray-200 md:border lg:rounded-lg  md:bg-white md:m-auto    ">
                <h2 className="my-2 font-medium text-[32px] text-center">Fazer Cadastro</h2>
                <section className='grid lg:grid-cols-2 gap-4 '>
                  <div className="flex md:min-w-[362px] flex-col mt-2">
                    <div className="flex border-2 rounded-lg bg-white">
                      <Person className="text-[#19313C] text-opacity-20 w-5 ml-4 mt-4 mb-4 mr-2" />
                      <input
                        className="w-full p-3  rounded-md outline-none focus-within:outline-none focus:outline-none"
                        placeholder="Nome e Sobrenome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex md:min-w-[362px] flex-col mt-2">
                    <div className="flex border-2 rounded-lg bg-white">
                      <Building className="text-[#19313C] text-opacity-20 w-5 ml-4 mt-4 mb-4 mr-2" />
                      <input
                        className="w-full p-3  rounded-md outline-none focus-within:outline-none focus:outline-none"
                        placeholder="CNPJ"
                        value={cnpj}
                        onChange={(e) => setCnpj(formatCNPJ(e.target.value))}
                      />
                    </div>
                  </div>

                  <div className="flex md:min-w-[362px] flex-col mt-2">
                    <div className="flex border-2 rounded-lg bg-white">
                      <Building className="text-[#19313C] text-opacity-20 w-5 ml-4 mt-4 mb-4 mr-2" />
                      <input
                        className="w-full p-3  rounded-md outline-none focus-within:outline-none focus:outline-none"
                        placeholder="Empresa"
                        value={empresa}
                        onChange={(e) => setEmpresa(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex md:min-w-[362px] flex-col mt-2">
                    <div className="flex border-2 rounded-lg bg-white">
                      <Verified className="text-[#19313C] text-opacity-20 w-5 ml-4 mt-4 mb-4 mr-2" />
                      <input
                        className="w-full p-3  rounded-md outline-none focus-within:outline-none focus:outline-none"
                        placeholder="Nome de Usuário"
                        value={username}
                        onChange={(e) => setUsername(slugify(e.target.value))}
                      />
                    </div>
                  </div>


                  <div className="flex md:min-w-[362px] flex-col mt-2">
                    <div className="flex border-2 rounded-lg bg-white">
                      <MailIcon className="text-[#19313C] text-opacity-20 w-5 ml-4 mt-4 mb-4 mr-2" />
                      <input
                        className="w-full p-3  rounded-md outline-none focus-within:outline-none focus:outline-none"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex md:min-w-[362px] flex-col mt-2">
                    <div className="flex border-2 rounded-lg bg-white">
                      <Whatsapp className="text-[#19313C] text-opacity-20 w-5 ml-4 mt-4 mb-4 mr-2" />
                      <input
                        className="w-full p-3  rounded-md outline-none focus-within:outline-none focus:outline-none"
                        placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(formatWhatsapp(e.target.value))}
                      />
                    </div>
                  </div>


                  <div className="flex md:min-w-[362px] flex-col mt-2">
                    <div className="flex border-2 rounded-lg bg-white">
                      <KeyIcon className="text-[#19313C] text-opacity-20 w-5 ml-4 mt-3 mb-3 mr-2 " />
                      <input
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        className="w-full p-3 outline-none focus-within:outline-none focus:outline-none"
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


                  <div className="flex md:min-w-[362px] flex-col md:mt-2">
                    <div className="flex border-2 rounded-lg bg-white">
                      <KeyIcon className="text-[#19313C] text-opacity-20 w-5 ml-4 mt-4 mb-4 mr-2" />
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
                    <button onClick={fazerCadastro} className="flex items-center justify-center w-full px-6 py-4 space-x-2 rounded-lg transition-all duration-500 ease-in-out bg-blue-500 filter hover:bg-blue-600">
                      <span className="text-white"> Cadastrar </span>
                      <ArrowRightIcon className="w-5 text-white" />
                    </button>
                    :
                    <button className="flex items-center cursor-not-allowed justify-center w-full px-6 py-4 space-x-2 rounded-lg transition-all duration-500 ease-in-out bg-blue-300 filter hover:bg-blue-400">
                      <span className="text-white"> Cadastrar ... </span>
                      <SpinnerCircularFixed size={20} thickness={180} speed={150} color="#FFF" secondaryColor="rgba(255, 255, 255, 0.15)" />
                    </button>
                  }
                </div>
                <div className="mt-4 text-center">
                  <a href="#" onClick={() => Configs.update(s => { s.loginModalIsOpen = true })} className="transition-all duration-500 ease-in-out flex items-center justify-center w-full px-6 py-4 space-x-2 rounded-lg border text-blue-500 border-blue-500 filter hover:bg-blue-500 hover:text-white">
                    <span>  Já possuo cadastro</span>
                  </a>
                </div>
                <div className="mt-4">
                  <Info texto='<a href="https://api.whatsapp.com/send?phone=27992830038&text=Estou%20com%20d%C3%BAvidas%20para%20realizar%20o%20cadastro%20no%20site.">Caso haja alguma dúvida sobre o cadastro, entre em contato com nosso suporte clicando aqui</a>'></Info>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>)

}