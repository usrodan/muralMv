import { Fragment, useEffect, useState } from 'react'
import { Configs } from '@/configs'
import client from '@/utils/apollo'
import { gql } from "@apollo/client";
import { useRouter } from 'next/router'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { SearchAlt } from "@styled-icons/boxicons-regular/SearchAlt"

const Sidebar: React.FC = () => {
  const router = useRouter()
  const [cidades, setCidades] = useState([])
  const [tipos, setTipos] = useState([])
  const configsState = Configs.useState()

  const [searchCity, setSearchCity] = useState("")
  const [cidade, setCidade] = useState({ id: 0, attributes: { cidade: "Selecione uma cidade", slug: "" } })
  const [tipo, setTipo] = useState({ id: 0, attributes: { tipo: "Selecione um tipo", slug: "" } })

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  useEffect(() => {
    cidade.id && changeCity(cidade.attributes.cidade)
  }, [cidade])

  useEffect(() => {
    tipo.id && changeType(tipo.attributes.tipo)
  }, [tipo])

  async function getData() {
    const { data } = await client.query({
      query: gql` 
      query {
        cidades( sort: "cidade:asc", pagination:{limit:1000}) {
          data {
            id
            attributes {
              cidade
              murais {
                data {
                  id
                }
              }
            }
          }
        }
        tipos( sort: "tipo:asc") {
          data {
            id
            attributes {
              tipo
            }
          }
        }
      }
      
    `,
    });
    setTipos(data.tipos.data)
    setCidades(data.cidades.data)
  }
  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    router.pathname == "/" && refreshPage()
  }, [configsState.type, configsState.city])

  function removeAcento(text) {       
    text = text.toLowerCase();                                                         
    text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    text = text.replace(new RegExp('[Ç]','gi'), 'c');
    return text;                 
}
  function changeCity(str) {
    Configs.update(s => { s.city = str })
    router.pathname != "/" && router.push(`/?city=${str}`)
  }

  function clearFilters() {
   setCidade({ id: 0, attributes: { cidade: "Selecione uma cidade", slug: "" } })
   setTipo({ id: 0, attributes: { tipo: "Selecione um tipo", slug: "" } })
   
  }

  function changeType(str) {
    Configs.update(s => { s.type = str })
    router.pathname != "/" && router.push(`/?type=${str}`)
  }

  function refreshPage() {
    var queries = []
    configsState.search && queries.push(`"search": "${configsState.search}"`)
    configsState.city && queries.push(`"city": "${configsState.city}"`)
    configsState.type && queries.push(`"type": "${configsState.type}"`)

    router.push({
      pathname: '/',
      query: JSON.parse(`{${queries.join(",")}}`),
    })
  }


  return (
    <div className="flex-col gap-8">
      <div id="AvisoResponsabilidade" className="hidden md:flex flex flex-col bg-blue-500 rounded-lg">
        <strong className="text-white text-center text-2xl p-4">⚠️ AVISO</strong>
        <p className="bg-white bg-opacity-60 font-semibold text-black p-4 text-center">Não somos responsáveis pelas
          vagas publicadas.<br />
          Confira mais vagas em <a href="https://www.maisvagases.com.br">maisvagases.com.br</a>
        </p>
      </div>

      <div id="FiltrosDesktop" className="hidden md:flex  flex-col gap-8 font-semibold ">
        <section>
          <strong className="text-blue-500 text-lg">CIDADE</strong>
          <ul className="pl-2 mt-2 overflow-auto h-52 ">
            {cidades.map(cidade => cidade.attributes.murais.data.length != 0 && <li key={cidade.attributes.cidade} onClick={() => changeCity(cidade.attributes.cidade)} className={`rounded-lg cursor-pointer p-2 uppercase hover:ml-2 transition-all duration-500 ease-in-out ${configsState.city == cidade.attributes.cidade ? "bg-gray-300" : ""}`}>{cidade.attributes.cidade}</li>)}
          </ul>
        </section>
        <section>
          <strong className="text-blue-500 text-lg">TIPO DE VAGA</strong>
          <ul className="pl-2 mt-2  h-52 overflow-auto ">
            {tipos.map(tipo => <li key={tipo.attributes.tipo} onClick={() => changeType(tipo.attributes.tipo)} className={`rounded-lg cursor-pointer p-2 uppercase hover:ml-2 transition-all duration-500 ease-in-out ${configsState.type == tipo.attributes.tipo ? "bg-gray-300" : ""}`}>{tipo.attributes.tipo}</li>)}
          </ul>
        </section>

      </div>

      {configsState.filterIsOpen && <div id="FiltrosMobile" className="flex   flex-col gap-2 font-semibold ">

        <div className='flex justify-between items-center'>
        <span className="text-blue-500 font-bold text-lg">Cidade</span>
        <span  onClick={clearFilters} className="text-gray-400 cursor-pointer underline font-bold text-sm">Limpar filtros ativos</span>
          </div>

        <Listbox value={cidade} onChange={setCidade}>
          {({ open }) => (
            <>
              <div className="flex relative">
                <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-lg shadow-sm  p-2 px-4   text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ">
                  <span className="block truncate">{cidade.attributes.cidade}</span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >

                  <Listbox.Options className="absolute z-10  w-full p-2 bg-white shadow-lg rounded-lg   ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">

                    <div className='flex p-2 rounded-lg w-full  border text-gray-800 border-gray-300'>
                      <input value={searchCity} onChange={(e) => setSearchCity(e.target.value)} className='text-gray-800' />
                      <SearchAlt className="text-gray-300" size="24" />

                    </div>
                    <div className='overflow-auto mt-2 max-h-60'>
                      {cidades.map((person) => {
                        var exibir = true
                        if (searchCity) {
                          if (String(removeAcento(person.attributes.cidade.toLowerCase()))
                            .includes(String(removeAcento(searchCity.toLowerCase())))
                          ) {
                            exibir = true
                          }
                          else {
                            exibir = false
                          }
                        }

                        return (exibir && <Listbox.Option
                          key={person.slug}
                          className={({ active }) =>
                            classNames(
                              active ? 'text-white bg-blue-600 ' : 'text-gray-900',
                              'cursor-default select-none rounded-md relative py-2 pl-3 pr-9 '
                            )
                          }
                          value={person}
                        >
                          {({ selected, active }) => (
                            <>
                              <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                {person.attributes.cidade}
                              </span>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? 'text-white' : 'text-blue-600',
                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                  )}
                                >
                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>)
                      })}
                    </div>

                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>




        <span className="text-blue-500 font-bold mt-3 text-lg">Tipo de Vaga</span>
        <Listbox value={tipo} onChange={setTipo}>
          {({ open }) => (
            <>
              <div className="flex relative">
                <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-lg shadow-sm p-2 px-4   text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ">
                  <span className="block truncate">{tipo.attributes.tipo}</span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 w-full p-2 bg-white shadow-lg max-h-60 rounded-lg   ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {tipos.map((person) => (
                      <Listbox.Option
                        key={person.slug}
                        className={({ active }) =>
                          classNames(
                            active ? 'text-white bg-blue-600' : 'text-gray-900',
                            'cursor-default rounded-md select-none relative py-2 pl-3 pr-9'
                          )
                        }
                        value={person}
                      >
                        {({ selected, active }) => (
                          <>
                            <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                              {person.attributes.tipo}
                            </span>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? 'text-white' : 'text-blue-600',
                                  'absolute inset-y-0 right-0 flex items-center pr-4'
                                )}
                              >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>

      </div>}

    </div>
  )
}

export default Sidebar

function removeAcento(arg0: any) {
  throw new Error('Function not implemented.');
}
