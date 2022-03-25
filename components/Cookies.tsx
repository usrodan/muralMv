import  {useEffect,useState} from "react";
import {InfoWithCircle} from "@styled-icons/entypo/InfoWithCircle"
import { useRouter } from "next/router"; 
export default function Cookies() {
  const router = useRouter()
  const [exibir,setExibir] = useState(undefined)
  
  useEffect(()=>{
    let acc = localStorage.getItem("MuralLGPD")
    acc && acc == "true" ? setExibir(false) : setExibir(true) 
  },[router])

  function aceitar(){
    localStorage.setItem("MuralLGPD", "true")
    setExibir(false)
  }

  return (<>
     {exibir && 
    <div className="flex fixed bottom-4 left-0 p-4 w-full justify-center z-40">
    <div  className=" flex flex-col md:flex-row w-full gap-4 max-w-5xl shadow-lg rounded-lg text-sm p-4 px-6  items-center border border-gray-200 bg-white">
       <InfoWithCircle className="text-blue-500 w-10 h-10" size={40}/>
       <div className="w-full">Usamos os cookies e dados de navegação visando proporcionar uma melhor experiência durante o uso do site.<br/> Ao continuar a navegar nesse site, você concorda com nossa <a href="/politica-de-privacidade" className="text-blue-500 font-semibold">Política de Privacidade</a> e <a href="termos-de-uso" className="font-semibold text-blue-500">Termos de uso</a>.</div>
      <div className="flex  justify-center gap-4">
        <div  onClick={aceitar} className="cursor-pointer bg-blue-500 hover:bg-blue-600 font-bold px-4 py-2  rounded-md text-white">Aceitar</div>
      </div>
    </div>
    </div>
    }
    </>
  )
}
