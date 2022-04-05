
import SEO from '@/components/SEO';
import SidebarLogged from '@/components/SidebarLogged';
import Image from "next/image"
import { useEffect, useState } from 'react';
import { MD5 } from "crypto-js";
import { Person } from "@styled-icons/bootstrap/Person"
import { Building } from "@styled-icons/bootstrap/Building"
import { Verified } from "@styled-icons/octicons/Verified"
import { Whatsapp } from "@styled-icons/bootstrap/Whatsapp"
import { Save } from '@styled-icons/fluentui-system-regular/Save'
import MailIcon from '@heroicons/react/outline/MailIcon'
import { Configs } from '@/configs'
import { Trash } from "@styled-icons/boxicons-regular/Trash"
import { Camera } from "@styled-icons/boxicons-regular/Camera"
import { validateEmail } from "@/utils/validateEmail"
import { formatWhatsapp } from "@/utils/formatWhatsapp"
import { SpinnerCircularFixed } from "spinners-react";
import { useRouter } from 'next/router';
import formatCNPJ from '@/utils/formatCNPJ';
import slugify from '@/utils/slugify';
import axios from 'axios'
import { toast } from 'react-toastify';
import Dropzone from 'react-dropzone-uploader';

const EditarPerfil = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [empresa, setEmpresa] = useState("")
  const [nome, setNome] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [cnpj, setCnpj] = useState("")
  const [username, setUsername] = useState("")
  const configState = Configs.useState()
  const [uploading, setUploading] = useState(false)
  const [image, setImage] = useState({ url: "",id:0 })

  const getUploadParams = () => {
    return { url: '/api/up' }
  }
  const handleChangeStatus = ({ meta, file, xhr }, status) => {
    setUploading(true)
    if (status === 'done') {
      setImage(JSON.parse(xhr.response)[0])
      setTimeout(() => {
        setUploading(false)
      }, 1000);
    }
  }

  useEffect(() => {
    setNome(configState.loggedUser.nome)
    setEmpresa(configState.loggedUser.empresa)
    setCnpj(formatCNPJ(configState.loggedUser.cnpj))
    setUsername(configState.loggedUser.username)
    setEmail(configState.loggedUser.email)
    setWhatsapp(formatWhatsapp(configState.loggedUser.whatsapp))
    setImage(configState.loggedUser.imagem)
  }, [configState])

  async function salvarPerfil() {
    let error = false
    if (!loading) {
      setLoading(true)
      try {
        if (!nome)
          throw "insira seu nome";
        if (!empresa)
          throw "Insira o nome da sua empresa";
        if (!email)
          throw "Insira seu email";
        if (email && !validateEmail(email))
          throw "Email Inválido";
        if (whatsapp.length == 0)
          throw "Insira seu número do Whatsapp";
        if (whatsapp.length > 0 && whatsapp.length < 15)
          throw "Número de Whatsapp inválido";
      } catch (e) {
        toast.error(e, { position: 'bottom-center' })
        error = true
      }
      if (!error) {
        axios.post("/api/updateUser", {
          hash: String(MD5("##@@$%&" + username + "##@@$%&" + configState.loggedUser.id + "##@@$%&")),
          username,
          empresa,
          nome,
          email,
          imagem:image.id,
          whatsapp: String(whatsapp).replace("(", "").replace(")", "").replace(" ", "").replace("-", ""),
          id: configState.loggedUser.id
        }).then(response => {
          toast.success("Dados atualizados com sucesso !", { position: 'bottom-center' })
          setLoading(false)
          router.reload()
        }).catch(e => {
          toast.error("Erro ao salvar dados!", { position: 'bottom-center' })
          setLoading(false)
        })
      }
      else {
        setLoading(false)
      }
    }
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

            <h1>Editar Perfil</h1>

            <section className=' md:p-10 gap-2 flex flex-col flex-1 w-full rounded-lg md:border border-gray-200 md:bg-white  '>
              <h2 className='text-xl'>Imagem do perfil</h2>
              {image.url && !uploading ? 
                <div className='flex gap-4  items-center'>
                  <Image className="rounded-full" src={image.url} alt="Danilo" width={100} height={100} />
                  <button onClick={() => setImage({url:"",id:0})} className='rounded-xl h-8 bg-red-100 text-sm text-red-700 p-2 px-3 flex items-center gap-2'><Trash size={16}/>Remover</button>
                </div>
                :
                <Dropzone
                  getUploadParams={getUploadParams}
                  //@ts-ignore
                  onChangeStatus={handleChangeStatus}
                  maxFiles={1}
                  multiple={false}
                  canCancel={false}
                  accept="image/*"
                  inputContent={
                    <span className='flex gap-4  items-center'>
                      <Image className="rounded-full" src="/user.svg" alt="Danilo" width={100} height={100} />
                      <div className='rounded-xl h-8 bg-blue-100 text-sm text-blue-700 p-2 px-3 flex items-center gap-2'><Camera size={16}/> Selecionar</div>
                    </span>
                  }
                  styles={{
                    dropzone: { alignItems: "start" },
                    dropzoneActive: { borderColor: 'green' },
                    inputLabel: { justifyContent: "start" }
                  }}
                />
              }

              <h2 className='text-xl mt-8'>Informações Pessoais</h2>

              <section className='grid md:grid-cols-2 gap-4 '>
                <div className="flex md:min-w-[302px] flex-col mt-2">
                  <div className="flex border-2  max-h-[55px]  rounded-lg bg-white">
                    <Person className="opacity-20 w-5 ml-4 mt-4 mb-4 mr-2" />
                    <input
                      className="w-full p-3  rounded-md outline-none focus-within:outline-none focus:outline-none"
                      placeholder="Nome e Sobrenome"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex md:min-w-[302px] flex-col mt-2">
                  <div className="flex border-2  max-h-[55px]  rounded-lg bg-gray-100">
                    <Building className="opacity-20 w-5 ml-4 mt-4 mb-4 mr-2" />
                    <input
                      className="w-full p-3  rounded-md outline-none focus-within:outline-none focus:outline-none"
                      placeholder="CNPJ"
                      disabled
                      value={cnpj}
                      onChange={(e) => setCnpj(formatCNPJ(e.target.value))}
                    />
                  </div>
                </div>

                <div className="flex md:min-w-[302px] flex-col mt-2">
                  <div className="flex border-2  max-h-[55px]  rounded-lg bg-white">
                    <Building className="opacity-20 w-5 ml-4 mt-4 mb-4 mr-2" />
                    <input
                      className="w-full p-3  rounded-md outline-none focus-within:outline-none focus:outline-none"
                      placeholder="Empresa"
                      value={empresa}
                      onChange={(e) => setEmpresa(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex md:min-w-[302px] flex-col mt-2">
                  <div className="flex border-2  max-h-[55px]  rounded-lg bg-gray-100">
                    <Verified className="opacity-20 w-5 ml-4 mt-4 mb-4 mr-2" />
                    <input
                      className="w-full p-3  rounded-md outline-none focus-within:outline-none focus:outline-none"
                      placeholder="Nome de Usuário"
                      disabled
                      value={username}
                      onChange={(e) => setUsername(slugify(e.target.value))}
                    />
                  </div>
                </div>


                <div className="flex md:min-w-[302px] flex-col mt-2">
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
                <div className="flex md:min-w-[302px] flex-col mt-2">
                  <div className="flex border-2  max-h-[55px]  rounded-lg bg-white">
                    <Whatsapp className="opacity-20 w-5 ml-4 mt-4 mb-4 mr-2" />
                    <input
                      className="w-full p-3   rounded-md outline-none focus-within:outline-none focus:outline-none"
                      placeholder="Whatsapp"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(formatWhatsapp(e.target.value))}
                    />
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

export default EditarPerfil;