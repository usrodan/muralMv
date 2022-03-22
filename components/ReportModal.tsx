import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon, XIcon } from '@heroicons/react/outline'
import { Configs } from '@/configs'
import axios from "axios"
import { toast } from 'react-toastify'
import { SpinnerCircularFixed } from "spinners-react";
const reasonList = [
    "A vaga não existe mais",
    "Não é uma vaga",
    "A data para se candidatar encerrou",
    "A vaga não é de uma cidade/empresa do ES",
    "Imagem imprópria",
    "Imagem ilegível",
    "Outro"
]

interface Props{
    id:string;
    cargo:string;
    url:string
} 

const ReportModal: React.FC<Props> = ({id,cargo,url}:Props) => {
    const ConfigsStore = Configs.useState()

    const [reasonOption, setReasonOption] = useState("") 
    const [reasonText, setReasonText] = useState("")
    const [finalReason, setFinalReason] = useState("")
    const [loading, setLoading] = useState(false)

     function SendReport(){
        setLoading(true)
        axios.post("/api/reportVaga/",{
            id,cargo,url,motivo:finalReason
        }).then(response=>{
            setLoading(false)
            response.data == "OK" ? toast.success("Denúncia enviada com sucesso") : toast.error("Ocorreu algum erro ao enviar sua denúncia")
        }).catch(e=>{
            setLoading(false)
            toast.error("Ocorreu algum erro ao enviar sua denúncia")
            toast.error(e)
        })
    }

    useEffect(()=>{
        reasonOption != "Outro" ? setFinalReason(reasonOption) : setFinalReason(reasonText)
    },[reasonOption])

    useEffect(()=>{
         setFinalReason(reasonText)
    },[reasonText])

    function close() {
        Configs.update(s => {
            s.reportModalIsOpen = false
        })
    }
    return (
        <Transition.Root show={ConfigsStore.reportModalIsOpen} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={close}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500"
                                    onClick={close}
                                >
                                    <span className="sr-only">Fechar</span>
                                    <XIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                        Denunciar Vaga
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Por favor escolha o motivo pelo qual está denunciando a vaga.
                                        </p>
                                    </div>

                                    <fieldset className="space-y-5">
                                        <legend className="sr-only">Motivo</legend>

                                        {reasonList.map(r => <div key={r} className="relative flex items-start">
                                            <div className="flex items-center h-5">
                                                <input 
                                                    aria-describedby="reason-description"
                                                    name="reason"
                                                    checked={r == reasonOption}
                                                    value={r}
                                                    onChange={(e)=> setReasonOption(r != reasonOption ? e.target.value : "")}
                                                    type="checkbox"
                                                    className=" h-4 w-4 cursor-pointer text-gray-600 border-gray-300 rounded"
                                                />
                                            </div>
                                            <div className="ml-3 text-left text-sm">
                                                <label htmlFor="reason" onClick={(e)=> setReasonOption(r != reasonOption ? r : "")} className="font-medium cursor-pointer text-gray-700">
                                                    {r}
                                                </label>
                                                <span id="reason-description" className="text-gray-500">
                                                    <span className="sr-only">{r}</span>
                                                </span>
                                            </div>
                                        </div>)}

                                        {reasonOption == "Outro" && <div className="w-full text-sm text-gray-400 flex p-2 gap-2 items-center rounded-md border border-gray-200 bg-gray-100"> 
                                            <input placeholder="Digite o motivo" value={reasonText} onChange={(e) => setReasonText(e.target.value)} className="w-full text-gray-400 bg-gray-100" />
                                        </div>}

                                    </fieldset>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                {finalReason && !loading ? <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700  sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={SendReport}
                                >
                                    <ExclamationIcon className="h-6 w-6 mr-2" aria-hidden="true" />
                                    Denunciar Vaga
                                </button>
                                :
                                <button
                                    type="button"
                                    className="w-full items-center cursor-not-allowed inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-200 text-base font-medium text-white    sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    {loading ?  <SpinnerCircularFixed className='mr-2' size={20} thickness={180} speed={150} color="#FFF" secondaryColor="rgba(255, 255, 255, 0.15)" />: <ExclamationIcon className="h-6 w-6 mr-2" aria-hidden="true" />}
                                    Denunciar Vaga
                                </button>
}

                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 sm:mt-0 sm:w-auto sm:text-sm"
                                    onClick={close}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ReportModal