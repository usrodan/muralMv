import { Fragment, useEffect, useState } from 'react'
import { Dialog,  Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { Configs } from '@/configs'
import Image from 'next/image'

 interface Props{
    src:string;
    alt:string;
    width:number;
    height:number;
 }

const ReportModal: React.FC<Props> = ({src,alt,width,height}:Props) => {
    const ConfigsStore = Configs.useState()  
 
    function close() {
        Configs.update(s => {
            s.imageModalIsOpen = false
        })
    }
    return (
        <Transition.Root show={ConfigsStore.imageModalIsOpen} as={Fragment}>
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
                        <div className="inline-block align-bottom bg-black bg-opacity-75 rounded-lg  text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full ">
                            <div className="block absolute top-0 right-0 pt-3 pr-3">
                                <button
                                    type="button"
                                    className="bg-red-500 rounded-md text-white hover:text-gray-100"
                                    onClick={close}
                                >
                                    <span className="sr-only">Close</span>
                                    <XIcon className="h-7 w-7" aria-hidden="true" />
                                </button>
                            </div>
                            <div className="sm:flex sm:items-start pt-12 ">
                            <Image onClick={close} className="cursor-pointer w-full rounded-b-md " alt={alt} width={width} height={height} src={src} />
          
                            
                            </div>
                       
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ReportModal