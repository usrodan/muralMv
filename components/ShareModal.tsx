import { Fragment} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { Configs } from '@/configs'
import { useClipboard } from 'use-clipboard-copy';

import { Facebook } from "@styled-icons/boxicons-logos/Facebook"
import { Twitter } from "@styled-icons/boxicons-logos/Twitter"
import { Linkedin } from "@styled-icons/boxicons-logos/Linkedin"
import { Whatsapp } from "@styled-icons/bootstrap/Whatsapp"
import { Telegram } from "@styled-icons/boxicons-logos/Telegram"
import { toast } from 'react-toastify';

interface Props {
    url: string;
    cargo:string
}
const ShareModal: React.FC<Props> = ({ url,cargo }: Props) => {
    const ConfigsStore = Configs.useState()
    const clipboard = useClipboard()

    const shareIconsClasses = "flex justify-center  transition-all duration-500 ease-in-out items-center rounded-full border hover:border-2 border-gray-200 h-12 w-12"
    const shareIconsSize = 24
    const shareText = "Veja essa vaga que encontrei no Mural do Mais Vagas ES. Quem sabe este não será seu próximo emprego: "

    function close() {
        Configs.update(s => {
            s.shareModalIsOpen = false
        })
    }

    function handleCopyClipboard() {
        clipboard.copy()
    
        toast.success('Link copiado para o área de transferência!', {
          position: "bottom-center",
        })
      }
    return (
        <Transition.Root show={ConfigsStore.shareModalIsOpen} as={Fragment}>
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
                            <div className="flex flex-col px-4 gap-2">

                                <strong className='text-lg'>Compartilhe essa vaga</strong>
                                <div className='flex gap-2 md:gap-5 my-3'>
                                    <a rel="noreferrer" href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${cargo}&summary=${shareText}&source=https://mural.maisvagas.com.br`} target="_blank" className={`text-[#0072b1] hover:border-[#0072b1] ${shareIconsClasses}`}>
                                        <Linkedin size={shareIconsSize} />
                                    </a>
                                    <a rel="noreferrer" href={`https://api.whatsapp.com/send?text=${shareText} ${url} `} target="_blank" className={`text-[#128C7E] hover:border-[#128C7E] ${shareIconsClasses}`}>
                                        <Whatsapp size={shareIconsSize} />
                                    </a>
                                    <a rel="noreferrer" href={`https://telegram.me/share/url?url=${url}&text=${shareText}`} target="_blank" className={`text-[#229ED9] hover:border-[#229ED9] ${shareIconsClasses}`}>
                                        <Telegram size={shareIconsSize} />
                                    </a>
                                    <a rel="noreferrer" href={`https://www.facebook.com/sharer/sharer.php?kid_directed_site=0&sdk=joey&u=${url}&display=popup&p[summary]=${shareText}`} target="_blank" className={`text-[#4267B2] hover:border-[#4267B2] ${shareIconsClasses}`}>
                                        <Facebook size={shareIconsSize} />
                                    </a>
                                    <a rel="noreferrer" href={`http://www.twitter.com/share?url=${url}&text=${shareText}`} target="_blank" className={`text-[#1DA1F2] hover:border-[#1DA1F2] ${shareIconsClasses}`}>
                                        <Twitter size={shareIconsSize} />
                                    </a>
                                </div>
                                <span className='text-sm'>Ou copie o link </span>
                                <div className='flex border rounded-md border-gray-200'>
                                    <input type="text" disabled className='px-4 text-gray-500 text-sm' value={url} />
                                    <span onClick={handleCopyClipboard} className='px-4 py-2 text-sm cursor-pointer transition-all duration-500 ease-in-out hover:bg-gray-800 bg-blue-500 text-white rounded-r-lg'>Copiar</span>
                                </div>
                                <input className="hidden" ref={clipboard.target} type="text" readOnly value={`${shareText} ${url}`} id="CopytoClipboard"></input>

                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ShareModal