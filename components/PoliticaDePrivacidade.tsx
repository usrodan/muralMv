/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { EyeOffIcon } from '@heroicons/react/outline'
import CookieConsent from "react-cookie-consent";
import { Configs } from '@/configs';


const PoliticaDePrivacidade: React.FC = () => {
  const [open, setOpen] = useState(false)
  const localConfigs = Configs.useState()
  //CHANGE THIS IF NEEDED
  const urlSite = localConfigs.urlSite
  const nomeSite = localConfigs.siteTitle
  const cookieBarBgColor = localConfigs.cookieBarBgColor

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" static className="fixed z-50 p-4 inset-0 overflow-y-auto" open={open} onClose={setOpen}>
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
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
                <div>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <EyeOffIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 w-full   sm:mt-5"> 
                    <div className="mt-2 w-full"> 
                      <h2>Política Privacidade</h2>
                      <p>A sua privacidade é importante para nós.É política do {nomeSite} respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site <a href={urlSite}>{nomeSite}</a>, e outros sites que possuímos e operamos.</p>
                      <p>Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço.Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento.Também informamos por que estamos coletando e como será usado.</p>
                      <p>Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado.Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.</p>
                      <p>Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.</p>
                      <p>O nosso site pode ter links para sites externos que não são operados por nós.Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas  políticas de privacidade.</p>
                      <p>Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.</p>
                      <p>O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais.Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contacto connosco.</p>
                      <h2>Política de Cookies {nomeSite}</h2>
                      <h3>O que são cookies?</h3>
                      <p>Como é prática comum em quase todos os sites profissionais, este site usa cookies, que são pequenos arquivos baixados no seu computador, para melhorar sua experiência.Esta página descreve quais informações eles coletam, como as usamos e por que às vezes precisamos armazenar esses cookies.Também compartilharemos como você pode impedir que esses cookies sejam armazenados, no entanto, isso pode fazer o downgrade ou 'quebrar' certos elementos da funcionalidade do site.</p>
                      <h3>Como usamos os cookies?</h3>
                      <p>Utilizamos cookies por vários motivos, detalhados abaixo.Infelizmente, na maioria dos casos, não existem opções padrão do setor para desativar os cookies sem desativar completamente a funcionalidade e os recursos que eles adicionam a este site.É recomendável que você deixe todos os cookies se não tiver certeza se precisa ou não deles, caso sejam usados ​​para fornecer um serviço que você usa.</p>
                      <h3>Desativar cookies</h3>
                      <p>Você pode impedir a configuração de cookies ajustando as configurações do seu navegador (consulte a Ajuda do navegador para saber como fazer isso).Esteja ciente de que a desativação de cookies afetará a funcionalidade deste e de muitos outros sites que você visita.A desativação de cookies geralmente resultará na desativação de determinadas funcionalidades e recursos deste site.Portanto, é recomendável que você não desative os cookies.</p>
                      <h3>Cookies que definimos</h3>
                      <ul>
                        <li> Cookies relacionados à conta<br /><br /> Se você criar uma conta connosco, usaremos cookies para o gerenciamento do processo de inscrição e administração geral.Esses cookies geralmente serão excluídos quando você sair do sistema, porém, em alguns casos, eles poderão permanecer posteriormente para lembrar as preferências do seu site ao sair.<br /><br /> </li>
                        <li> Cookies relacionados ao login<br /><br /> Utilizamos cookies quando você está logado, para que possamos lembrar dessa ação.Isso evita que você precise fazer login sempre que visitar uma nova página.Esses cookies são normalmente removidos ou limpos quando você efetua logout para garantir que você possa acessar apenas a recursos e áreas restritas ao efetuar login.<br /><br /> </li>
                        <li> Cookies relacionados a boletins por e-mail<br /><br /> Este site oferece serviços de assinatura de boletim informativo ou e-mail e os cookies podem ser usados ​​para lembrar se você já está registrado e se deve mostrar determinadas notificações válidas apenas para usuários inscritos / não inscritos.<br /><br /> </li>
                        <li> Pedidos processando cookies relacionados<br /><br /> Este site oferece facilidades de comércio eletrônico ou pagamento e alguns cookies são essenciais para garantir que seu pedido seja lembrado entre as páginas, para que possamos processá-lo adequadamente.<br /><br /> </li>
                        <li> Cookies relacionados a pesquisas<br /><br /> Periodicamente, oferecemos pesquisas e questionários para fornecer informações interessantes, ferramentas úteis ou para entender nossa base de usuários com mais precisão.Essas pesquisas podem usar cookies para lembrar quem já participou numa pesquisa ou para fornecer resultados precisos após a alteração das páginas.<br /><br /> </li>
                        <li> Cookies relacionados a formulários<br /><br /> Quando você envia dados por meio de um formulário como os encontrados nas páginas de contacto ou nos formulários de comentários, os cookies podem ser configurados para lembrar os detalhes do usuário para correspondência futura.<br /><br /> </li>
                        <li> Cookies de preferências do site<br /><br /> Para proporcionar uma ótima experiência neste site, fornecemos a funcionalidade para definir suas preferências de como esse site é executado quando você o usa.Para lembrar suas preferências, precisamos definir cookies para que essas informações possam ser chamadas sempre que você interagir com uma página for afetada por suas preferências.<br /> </li>
                      </ul>
                      <h3>Cookies de Terceiros</h3>
                      <p>Em alguns casos especiais, também usamos cookies fornecidos por terceiros confiáveis.A seção a seguir detalha quais cookies de terceiros você pode encontrar através deste site.</p>
                      <ul>
                        <li> Este site usa o Google Analytics, que é uma das soluções de análise mais difundidas e confiáveis ​​da Web, para nos ajudar a entender como você usa o site e como podemos melhorar sua experiência.Esses cookies podem rastrear itens como quanto tempo você gasta no site e as páginas visitadas, para que possamos continuar produzindo conteúdo atraente.</li>
                      </ul>
                      <p>Para mais informações sobre cookies do Google Analytics, consulte a página oficial do Google Analytics.</p>
                      <ul>
                        <li> As análises de terceiros são usadas para rastrear e medir o uso deste site, para que possamos continuar produzindo conteúdo atrativo.Esses cookies podem rastrear itens como o tempo que você passa no site ou as páginas visitadas, o que nos ajuda a entender como podemos melhorar o site para você.</li>
                        <li> Periodicamente, testamos novos recursos e fazemos alterações subtis na maneira como o site se apresenta.Quando ainda estamos testando novos recursos, esses cookies podem ser usados ​​para garantir que você receba uma experiência consistente enquanto estiver no site, enquanto entendemos quais otimizações os nossos usuários mais apreciam.</li>
                        <li> À medida que vendemos produtos, é importante entendermos as estatísticas sobre quantos visitantes de nosso site realmente compram e, portanto, esse é o tipo de dados que esses cookies rastrearão.Isso é importante para você, pois significa que podemos fazer previsões de negócios com precisão que nos permitem analizar nossos custos de publicidade e produtos para garantir o melhor preço possível.</li>
                      </ul>
                      <h3>Compromisso do Usuário</h3>
                      <p>O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o {nomeSite} oferece no site e com caráter enunciativo, mas não limitativo: </p>
                      <ul>
                        <li>A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública; </li>
                        <li>B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica,  jogos de hoje  ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos; </li>
                        <li>C) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do {nomeSite}, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.</li>
                      </ul>
                      <h3>Mais informações</h3>
                      <p>Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.</p>
                      <p>Esta política é efetiva a partir de <strong>Março</strong>/<strong>2022</strong>.</p>

                      <h2>1. Termos</h2>
                      <p>Ao acessar ao site <a href={urlSite}>{nomeSite}</a>, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum                desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.</p>
                      <h2>2. Uso de Licença</h2>
                      <p>É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site {nomeSite} , apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e,                sob esta licença, você não pode: </p>
                      <ol>
                        <li>modificar ou copiar os materiais;  </li>
                        <li>usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);  </li>
                        <li>tentar descompilar ou fazer engenharia reversa de qualquer software contido no site {nomeSite};  </li>
                        <li>remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou  </li>
                        <li>transferir os materiais para outra pessoa ou 'espelhe' os materiais em qualquer outro servidor.</li>
                      </ol>
                      <p>Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá ser rescindida por {nomeSite} a qualquer momento. Ao encerrar a visualização desses materiais ou após o término desta licença, você deve apagar todos os materiais                baixados em sua posse, seja em formato eletrónico ou impresso.</p>
                      <h2>3. Isenção de responsabilidade</h2>
                      <ol>
                        <li>Os materiais no site da {nomeSite} são fornecidos 'como estão'. {nomeSite} não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização,            adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos. </li>
                        <li>Além disso, o {nomeSite} não garante ou faz qualquer representação relativa à precisão, aos resultados prováveis ​​ou à confiabilidade do uso dos            materiais em seu site ou de outra forma relacionado a esses materiais ou em sites vinculados a este site.</li>
                      </ol>
                      <h2>4. Limitações</h2>
                      <p>Em nenhum caso o {nomeSite} ou seus fornecedores serão responsáveis ​​por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em {nomeSite},                mesmo que {nomeSite} ou um representante autorizado da {nomeSite} tenha sido notificado oralmente ou por escrito da possibilidade de tais danos. Como algumas jurisdições não permitem limitações em garantias implícitas, ou limitações de responsabilidade                por danos conseqüentes ou incidentais, essas limitações podem não se aplicar a você.</p>
                      <h2>5. Precisão dos materiais</h2>
                      <p>Os materiais exibidos no site da {nomeSite} podem incluir erros técnicos, tipográficos ou fotográficos. {nomeSite} não garante que qualquer material em seu site seja preciso, completo ou atual. {nomeSite} pode fazer alterações nos materiais contidos em seu                site a qualquer momento, sem aviso prévio. No entanto, {nomeSite} não se compromete a atualizar os materiais.</p>
                      <h2>6. Links</h2>
                      <p>O {nomeSite} não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por {nomeSite} do site. O uso de qualquer site vinculado é por conta e risco do usuário.</p>
                      <h3>Modificações</h3>
                      <p>O {nomeSite} pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.</p>
                      <h3>Lei aplicável</h3>
                      <p>Estes termos e condições são regidos e interpretados de acordo com as leis do {nomeSite} e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white   sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root >

      <CookieConsent
        location="bottom"
        buttonText="CONTIUNAR"
        cookieName="PoliticaPrivacidadeOliveira"
        style={{ background: "#383838", fontSize: "12px", zIndex: "40" }}
        buttonStyle={{ borderRadius: "10px", background: "#E8F1F2", color: "#383838", fontSize: "13px" }}
        expires={150}
      >
        Nós usamos cookies e outras tecnologias semelhantes para melhorar a sua experiência em nossos serviços, personalizar publicidade e recomendar conteúdo de seu interesse.<br />
        Ao utilizar nossos serviços, você concorda com tal monitoramento. Veja nossa <span className="text-gray-300 cursor-pointer" onClick={() => setOpen(true)}> Política de Privacidade.</span>{" "}

      </CookieConsent>
    </>)

}

export default PoliticaDePrivacidade