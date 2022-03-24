import { Linkedin } from "@styled-icons/boxicons-logos/Linkedin"
import { Instagram } from "@styled-icons/boxicons-logos/Instagram"
import { FacebookCircle } from "@styled-icons/boxicons-logos/FacebookCircle"
export default function Footer() {
  /* This example requires Tailwind CSS v2.0+ */
  const navigation = {
    main: [
      { name: 'Mural', href: '/' },
      { name: 'Política de Privacidade', href: 'politica-de-privacidade' },
      { name: 'Termos de Uso', href: 'termos-de-uso' },
      { name: 'Quem somos', href: '/quem-somos' },
      { name: 'Contato', href: '/contato' },
    ],
    social: [

      {
        name: 'Linkedin',
        href: 'https://www.linkedin.com/company/maisvagases/',
        icon: (props) => (
          <Linkedin size={24} />
        ),
      },
      {
        name: 'Instagram',
        href: 'https://www.instagram.com/maisvagases/',
        icon: (props) => (
          <Instagram size={24} />
        ),
      },

      {
        name: 'Facebook',
        href: 'https://www.facebook.com/maisvagases',
        icon: (props) => (
          <FacebookCircle size={24} />
        ),
      },
    ],
  }


  return (
    <footer className="bg-white flex w-full border-t border-gray-300 mt-4">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          {navigation.main.map((item) => (
            <div key={item.name} className="px-5 py-2">
              <a href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <div className="mt-8 flex justify-center space-x-6">
          {navigation.social.map((item) => (
            <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <p className="mt-8 text-center text-base text-gray-400">&copy; 2022 MaisVagasES - Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}