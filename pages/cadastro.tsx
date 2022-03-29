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
import Info from '@/components/Info';
import { Configs } from '@/configs';


export default function Index() {
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

  function formatWhatsapp(v) {
    v = v.substring(0, 15);
    v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca prênteses em volta dos dois primeiros dígitos
    v = v.replace(/(\d)(\d{4})$/, "$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
    return  v ;
  }

  async function getCNPJ() {
    const consultarCNPJ = require('consultar-cnpj')
    const pj = await consultarCNPJ(cnpjUnformatted)
    setEmpresa(pj.estabelecimento && pj.estabelecimento.nome_fantasia ? pj.estabelecimento.nome_fantasia : pj.razao_social)
  }

  const router = useRouter()

  function fazerCadastro() {


    !email && toast.error("Insira seu email", { position: 'bottom-center' })
    !senha && toast.error("Insira uma senha", { position: 'bottom-center' })
    senha && !confirmarSenha && toast.error("As senhas não são iguais", { position: 'bottom-center' })
    !username && toast.error("Insira um nome de usuário", { position: 'bottom-center' })
    !nome && toast.error("Insira seu nome", { position: 'bottom-center' })
    cnpj.length !=18 && toast.error("Insira o CNPJ da sua empresa", { position: 'bottom-center' })
    cnpj.length > 0 && !validarCNPJ(cnpjUnformatted) && toast.error("CNPJ inválido", { position: 'bottom-center' })
    whatsapp.length !=15 && toast.error("Insira seu número do Whatsapp", { position: 'bottom-center' })

    if (email && (senha == confirmarSenha) && nome && username && validarCNPJ(cnpjUnformatted) && whatsapp) {
      axios.post(`${process.env.NEXT_PUBLIC_STRAPI}/api/auth/local/register`, {
        email: email,
        password: senha,
        username,
        nome,
        whatsapp:whatsappUnformatted,
        cnpj:cnpjUnformatted,
        empresa
      }).then(response => {
        if (response.data.error) {
          toast.error(response.data.error.name, {
            position: 'bottom-center'
          })
        }
        if (response.data.user) {
          toast.success("Cadastrado com sucesso", { position: 'bottom-center' })
          localStorage.setItem("SessionMural", JSON.stringify({ token: String(MD5(response.data.user.username + response.data.user.id + response.data.user.email)), user: response.data.user }))
          setEmail("")
          setSenha("")
          axios.get(`/api/sendConfirmation/${response.data.user.id}`)
          router.push("/enviar")
        } 
      }).catch(e => {
        console.info(e)
        toast.error(e, {
          position: 'bottom-center'
        })
      })
    }
  }



  return (
    <main className="flex flex-col gap-4  md:p-8 items-center ">
      <section className=" font-dm-sans bg-slate-light">
        <div className="mx-6 max-w-default md:m-auto">
          <div className="justify-center md:flex">
            <div>
              <div className="p-6 md:p-[60px] border-gray-200 border lg:rounded-lg  bg-white md:m-auto    ">
                <h2 className="my-2 font-medium text-[32px] text-center">Fazer Cadastro</h2>
                <section className='grid lg:grid-cols-2 gap-4 '>
                  <div className="flex md:min-w-[362px] flex-col mt-2">
                    <div className="flex border-2 rounded-lg">
                      <Person className="text-[#19313C] text-opacity-20 w-5 ml-4 mt-4 mb-4 mr-2" />
                      <input
                        className="w-full p-3 outline-none focus-within:outline-none focus:outline-none"
                        placeholder="Nome e Sobrenome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex md:min-w-[362px] flex-col mt-2">
                    <div className="flex border-2 rounded-lg">
                      <Building className="text-[#19313C] text-opacity-20 w-5 ml-4 mt-4 mb-4 mr-2" />
                      <input
                        className="w-full p-3 outline-none focus-within:outline-none focus:outline-none"
                        placeholder="CNPJ"
                        value={cnpj}
                        onChange={(e) => setCnpj(formatCNPJ(e.target.value))}
                      />
                    </div>
                  </div>

                  <div className="flex md:min-w-[362px] flex-col mt-2">
                    <div className="flex border-2 rounded-lg">
                      <Building className="text-[#19313C] text-opacity-20 w-5 ml-4 mt-4 mb-4 mr-2" />
                      <input
                        className="w-full p-3 outline-none focus-within:outline-none focus:outline-none"
                        placeholder="Empresa"
                        value={empresa}
                        onChange={(e) => setEmpresa(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex md:min-w-[362px] flex-col mt-2">
                    <div className="flex border-2 rounded-lg">
                      <Verified className="text-[#19313C] text-opacity-20 w-5 ml-4 mt-4 mb-4 mr-2" />
                      <input
                        className="w-full p-3 outline-none focus-within:outline-none focus:outline-none"
                        placeholder="Nome de Usuário"
                        value={username}
                        onChange={(e) => setUsername(slugify(e.target.value))}
                      />
                    </div>
                  </div>


                  <div className="flex md:min-w-[362px] flex-col mt-2">
                    <div className="flex border-2 rounded-lg">
                      <MailIcon className="text-[#19313C] text-opacity-20 w-5 ml-4 mt-4 mb-4 mr-2" />
                      <input
                        className="w-full p-3 outline-none focus-within:outline-none focus:outline-none"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex md:min-w-[362px] flex-col mt-2">
                    <div className="flex border-2 rounded-lg">
                      <Whatsapp className="text-[#19313C] text-opacity-20 w-5 ml-4 mt-4 mb-4 mr-2" />
                      <input
                        className="w-full p-3 outline-none focus-within:outline-none focus:outline-none"
                        placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(formatWhatsapp(e.target.value))}
                      />
                    </div>
                  </div>


                  <div className="flex md:min-w-[362px] flex-col mt-2">
                    <div className="flex border-2 rounded-lg">
                      <KeyIcon className="text-[#19313C] text-opacity-20 w-5 ml-4 mt-4 mb-4 mr-2" />
                      <input
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        className="w-full p-3 outline-none focus-within:outline-none focus:outline-none"
                        type="password"
                        placeholder="Senha"
                      />
                    </div>
                  </div>

                  <div className="flex md:min-w-[362px] flex-col mt-2">
                    <div className="flex border-2 rounded-lg">
                      <KeyIcon className="text-[#19313C] text-opacity-20 w-5 ml-4 mt-4 mb-4 mr-2" />
                      <input
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                        className="w-full p-3 outline-none focus-within:outline-none focus:outline-none"
                        type="password"
                        placeholder="Confirmar Senha"
                      />
                    </div>
                  </div>
                </section>
                <div className="mt-6">
                  <button onClick={fazerCadastro} className="flex items-center justify-center w-full px-6 py-4 space-x-2 rounded-lg transition-all duration-500 ease-in-out bg-blue-500 filter hover:bg-blue-600">
                    <span className="text-white"> Cadastrar </span>
                    <ArrowRightIcon className="w-5 text-white" />
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <a href="#" onClick={()=> Configs.update(s=>{s.loginModalIsOpen = true})} className="transition-all duration-500 ease-in-out flex items-center justify-center w-full px-6 py-4 space-x-2 rounded-lg border text-blue-500 border-blue-500 filter hover:bg-blue-500 hover:text-white">
                    <span>  Já possuo cadastro</span>
                  </a>
                </div>
                <div className="mt-4">
                  <Info texto='<a href="#">Caso haja alguma dúvida sobre o cadastro, entre em contato com nosso suporte clicando aqui</a>'></Info>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>)

}