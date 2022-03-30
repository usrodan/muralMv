export default function Index() {
  return (
    <main className="flex flex-col gap-4  md:p-8 items-center ">
      <section className=" font-dm-sans bg-slate-light">
        <div className="mx-6 max-w-default md:m-auto">
          <div className="justify-center md:flex">
            <div>
              <div className="p-6 md:p-[60px] flex flex-col items-center justify-center">
                <h2 className="my-2 text-blue-500 font-medium text-[32px] text-center">Cadastro realizado com sucesso!</h2>
                <span>Em instantes receberá um email para validar sua conta.</span>
                <span className='text-sm'>Não se esqueça de verificar na caixa de spam.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>)
}