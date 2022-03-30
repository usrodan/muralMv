
import SEO from '@/components/SEO';
import { Fragment, useEffect, useState } from 'react';
import { Verified } from "@styled-icons/material-twotone/Verified"
import { Error } from"@styled-icons/material-twotone/Error"
import axios from 'axios'
import { SpinnerCircularFixed } from "spinners-react";
import { useRouter } from 'next/router';
const Pagina = () => {

  const [loading, setLoading] = useState(true)
  const [ativo, setAtivo] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (router.query.hash) {
      axios.get(`/api/validar/${router.query.hash}`).then(response => {
        if (response.data == "Conta ativada com sucesso") {
          setTimeout(() => {
            setLoading(false)
            setAtivo(true)
          }, 2000);

          setTimeout(() => {
            router.push("/enviar")
          }, 4000);
        }
        else {
          setTimeout(() => {
            setLoading(false)
            setAtivo(false)
          }, 2000);
        }
      })
    }
  }, [router])



  return (
    <>
      <SEO siteName="Mais Vagas ES" title="Validar E-mail" description="" />
      <main className='flex flex-col w-full items-center ' >

        {loading &&
          <section className="flex flex-col items-center p-20 justify-center  rounded-md gap-4 w-full max-w-7xl mt-4  ">
            <SpinnerCircularFixed size={100} thickness={180} speed={150} color="#2563EB" secondaryColor="rgba(255, 255, 255, 0.15)" />
            <span className='text-2xl mt-4 font-bold text-blue-500'>Validando conta ...</span>
          </section>
        }
        {!loading && ativo &&
          <section className="flex flex-col items-center p-20 justify-center  rounded-md gap-4 w-full max-w-7xl mt-4  ">
            <Verified className='text-green-500' size={150} />
            <span className='text-2xl mt-4 font-bold text-green-500'>Conta validada com sucesso!</span>
          </section>
        }

        {!loading && !ativo &&
          <section className="flex flex-col items-center p-20 justify-center  rounded-md gap-4 w-full max-w-7xl mt-4  ">
            <Error className='text-orange-500' size={150} />
            <span className='text-2xl mt-4 font-bold text-orange-500'>Código de validação inválido!</span>
          </section>
        }
      </main>


    </>);
}

export default Pagina;