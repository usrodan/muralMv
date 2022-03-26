
import SEO from '@/components/SEO';
import { Fragment, useEffect, useState } from 'react';
import Image from 'next/image'
import Info from '@/components/Info';
import { toast } from 'react-toastify';
import { SendPlane } from "@styled-icons/remix-fill/SendPlane"

import { SpinnerCircularFixed } from "spinners-react";
const Pagina = () => {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [mensagem, setMensagem] = useState("")
  const [loading, setLoading] = useState(false)
  const [primeiro, setPrimeiro] = useState(Math.floor(Math.random() * 10) + 1)
  const [segundo, setSegundo] = useState(Math.floor(Math.random() * 10) + 1)
  const [captcha, setCaptcha] = useState(null)

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function enviarEmail() {
    setLoading(true)

    !(nome && email && mensagem) && toast.error("Por favor preencha todos os campos!", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    primeiro + segundo != captcha && toast.error("Captcha inválido! resolva equação antes de enviar", {
      position: toast.POSITION.BOTTOM_CENTER
    })

    !validateEmail(email) && toast.error("Email inválido", {
      position: toast.POSITION.BOTTOM_CENTER
    })

    if (nome && validateEmail(email) && mensagem && (primeiro + segundo == captcha)) {
      var axios = require('axios');
      var data = JSON.stringify({
        nome: String(nome),
        email: String(email),
        mensagem: String(mensagem),
      });

      var config = {
        method: 'post',
        url: `/api/contato`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };
      axios(config)
        .then(function (response) {
          toast.success("Mensagem enviada com sucesso!", {
            position: toast.POSITION.BOTTOM_CENTER
          });
          setNome("")
          setEmail("")
          setMensagem("")
          setPrimeiro(Math.floor(Math.random() * 10) + 1)
          setSegundo(Math.floor(Math.random() * 10) + 1)
          setCaptcha(false)
          setLoading(false)
        })
        .catch(function (error) {
          toast.error("Erro ao enviar mensagem. tente novamente!", {
            position: toast.POSITION.BOTTOM_CENTER
          });
          setNome("")
          setEmail("")
          setMensagem("")
          setPrimeiro(Math.floor(Math.random() * 10) + 1)
          setSegundo(Math.floor(Math.random() * 10) + 1)
          setCaptcha(false)
          setLoading(false)
        });
    }
    else {
      setLoading(false)
    }

  }
  return (
    <>
      <SEO siteName="Mais Vagas ES" title="Contato" description="" />
      <main className='flex flex-col w-full items-center ' >
        <section className="flex flex-col bg-white border border-gray-200 rounded-md gap-4 w-full max-w-7xl mt-4  ">
          <div className="xl:container xl:mx-auto py-12 lg:py-0">
            <div className="flex flex-col lg:flex-row justify-center items-center items-strech h-full ">
              <div className="lg:w-full 2xl:w-3/5 p-8 lg:pl-12">
                <h1 className="text-3xl lg:text-5xl font-bold text-gray-800 w-11/12">Entre em contato</h1> 
                <p className="mt-3 lg:mt-4 text-base leading-normal text-gray-600   flex flex-col gap-5 ">
                  <span>Entre em contato conosco caso haja críticas, sugestões e elogios serão sempre bem-vindos!</span>
                  <Info cor="orange" texto='Pedimos encarecidamente para que não use este formulário para envio de currículo, nem tanto solicitação de vagas de emprego.' />
                  <span> Se você deseja divulgar/publicar uma vaga, <a className='underline font-semibold' href="/enviar">clique aqui</a>.</span>
                  <Image src="/contato.svg" width={300} height={300} alt="Entre em Contato" />
                </p>
              </div>
              <div className="lg:w-full 2xl:w-2/5 flex w-full   min-h-full flex-col justify-center px-5 py-5 md:px-7 md:py-7 lg:py-12 lg:px-20 mt-2 md:mt-6 lg:mt-0">
                <h2 className="text-lg font-semibold text-gray-800">Envie-nos uma mensagem</h2>
                <div className='rounded-md border border-gray-300 mt-4 md:mt-6'><input value={nome} onChange={(e) => setNome(e.target.value)} className=" rounded-md p-4 text-base text-gray-600 " type="text" aria-label="Nome" placeholder="Seu Nome" /></div>
                <div className='rounded-md border border-gray-300 mt-4 md:mt-6'><input value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-md p-4 text-base text-gray-600 " type="email" aria-label="Email" placeholder="Seu E-mail" /></div>
                <textarea name="" id="" value={mensagem} onChange={(e) => setMensagem(e.target.value)} aria-label="Sua Mensagem" placeholder="Mensagem" className="w-full h-48 lg:h-36 xl:h-48 2xl:h-56 mt-4 md:mt-6 p-4 rounded-md border border-gray-300 resize-none text-base text-gray-600 focus:outline-none focus:border-gray-700"></textarea>
                <div className='flex items-center justify-center'><span className=' mt-4 md:mt-6 pr-4 text-lg font-bold text-blue-500'>{primeiro} + {segundo} = </span><div className='rounded-md border h-16 w-20 border-gray-300 mt-4 md:mt-6'><input value={captcha} onChange={(e) => setCaptcha(e.target.value)} className="rounded-md p-4 text-base text-gray-600 decoration-non " type="number" aria-label="resultado" placeholder="" /></div>
                </div>
                <div className='fixed bottom-0  mt-4 md:mt-5 left-0 md:relative flex w-full md:col-span-12'>
                  {
                    !loading ?
                      <div onClick={enviarEmail}
                        className="flex w-full items-center cursor-pointer text-lg gap-2 justify-center text-center font-semibold text-white p-4 md:p-2 md:rounded-md bg-blue-500 hover:bg-blue-600" >
                        <SendPlane size={20} />
                        Enviar mensagem
                      </div>
                      :
                      <div className="w-full bg-opacity-70 cursor-not-allowed flex items-center  text-lg gap-2 justify-center text-center font-semibold text-white p-4 md:p-2 md:rounded-md bg-blue-500 hover:bg-blue-300 " >
                        <SpinnerCircularFixed size={20} thickness={180} speed={150} color="#FFF" secondaryColor="rgba(255, 255, 255, 0.15)" />
                        Enviando mensagem
                      </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>


    </>);
}

export default Pagina;