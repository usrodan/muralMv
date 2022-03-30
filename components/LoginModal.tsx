import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react' 
import { Configs } from '@/configs' 


import React, { useEffect, useState } from 'react';
import axios from "axios" 
import ArrowRightIcon from '@heroicons/react/outline/ArrowRightIcon';
import MailIcon from '@heroicons/react/outline/MailIcon';
import KeyIcon from '@heroicons/react/outline/KeyIcon';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { MD5 } from "crypto-js"

interface Props {
    url?: string;
}
const LoginModal: React.FC<Props> = ({ url = "" }: Props) => {
    const ConfigsStore = Configs.useState()

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const router = useRouter()

    function fazerLogin() {
        if (email && senha) {
            axios.post(`${process.env.NEXT_PUBLIC_STRAPI}/api/auth/local`, {
                identifier: email,
                password: senha
            }).then(response => {
                if (response.data.error) {
                    toast.error(response.data.error.name, {
                        position: 'bottom-center'
                    })
                }
                if (response.data.user) {
                    toast.success("Logado com sucesso.", {
                        position: 'bottom-center'
                    })
                    localStorage.setItem("SessionMural", JSON.stringify({ token: String(MD5(response.data.user.username + response.data.user.id + response.data.user.email)), user: response.data.user }))
                    setEmail("")
                    setSenha("")
                    Configs.update(s=>{s.loginModalIsOpen=false}) 
                    router.reload()
                }

            }).catch(e => {
                toast.error("Email ou senha inválidos.", {
                    position: 'bottom-center'
                })
            })
        }
        else {
            toast.error("Preencha todos os campos", {
                position: 'bottom-center'
            })
        }
    }


    function close() {
        Configs.update(s => {
            s.loginModalIsOpen = false
        })
    }

    return (
        <Transition.Root show={ConfigsStore.loginModalIsOpen} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={close}>
                <div className="flex items-center text-gray-800 justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-white backdrop-blur-sm bg-opacity-75 transition-opacity" />
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
                        <div className="inline-block align-bottom  bg-white border border-gray-200 rounded-lg px-4 md:px-20 md:py-10 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-lg   w-full sm:p-6">
                            <h2 className="my-2 font-medium text-[32px] text-center">Fazer Login</h2>


                            <div className="flex md:min-w-[362px] flex-col mt-6">
                                <label className="text-base font-medium text-slate-body"> </label>

                                <div className="flex border-2 max-h-[55px] rounded-lg">
                                    <MailIcon className="opacity-20 w-5 ml-4 mt-4 mb-4 mr-2" />
                                    <input
                                        className="w-full p-3 rounded-md outline-none focus-within:outline-none focus:outline-none"
                                        placeholder="Email ou Nome de Usuário"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex md:min-w-[362px] flex-col mt-6">
                                <label className="text-base font-medium text-slate-body"> </label>

                                <div className="flex border-2  max-h-[55px] rounded-lg">
                                    <KeyIcon className="opacity-20 w-5 ml-4 mt-4 mb-4 mr-2" />
                                    <input
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                        className="w-full rounded-md p-3 outline-none focus-within:outline-none focus:outline-none"
                                        type="password"
                                        placeholder="Senha"
                                    />
                                </div>
                            </div>


                            <div className="mt-6 w-full flex">
                                <button onClick={fazerLogin} className="transition-all duration-500 ease-in-out flex items-center justify-center w-full px-6 py-4 space-x-2 rounded-lg bg-blue-500 filter hover:bg-blue-600">
                                    <span className="text-white"> Fazer Login </span>
                                    <ArrowRightIcon className="w-5 text-white" />
                                </button>
                            </div>
                            <div className="mt-4 text-center flex w-full">
                                <a href="/cadastro" className="transition-all duration-500 ease-in-out flex items-center justify-center w-full px-6 py-4 space-x-2 rounded-lg border text-blue-500 border-blue-500 filter hover:border-blue-500 hover:bg-gray-50 hover:text-blue-600">
                                    <span>  Não possuo conta</span>
                                </a>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default LoginModal