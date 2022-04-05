import { useRouter } from "next/router"
import { Configs } from '@/configs'


const DoLogout = () =>  { 
    localStorage.removeItem("SessionMural")
    Configs.update(s => {
      s.loggedUser = {
        nome: "",
        id: 0,
        ativo: false,
        email: "",
        cnpj: "",
        empresa: "",
        blocked: false,
        username: "",
        whatsapp: "", 
        imagem:{
          id:0,
          url:""
        }
      }
    })
    Configs.update(s => {
      s.menuIsOpen = false
    }) 
}

export default DoLogout