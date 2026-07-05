import type { Project } from '@/types'

export const PROJECTS: Project[] = [
  {
    title: 'Sistema de Autenticação',
    tag: 'React · Node · JWT',
    img: '/images/auth-project.png',
    deploy: 'https://full-stack-user-authorization-nw74.vercel.app/',
    github: 'https://github.com/Felyppe1/full-stack-user-authorization',
    pt: 'Login full-stack em React e Node.js com JSON Web Tokens e refresh token — segurança com experiência contínua e persistência de sessão.',
    en: 'Full-stack login in React and Node.js with JSON Web Tokens and refresh token — security with a seamless experience and session persistence.',
  },
  {
    title: 'Coffee Delivery',
    tag: 'React · TypeScript',
    img: '/images/coffee-delivery.png',
    deploy: 'https://coffee-delivery-seven-mu.vercel.app/',
    github: 'https://github.com/Felyppe1/coffee-delivery',
    pt: 'E-commerce de cafés proposto como desafio da Rocketseat, para fixar React com TypeScript.',
    en: 'A coffee e-commerce built as a Rocketseat challenge, to solidify React with TypeScript.',
  },
  {
    title: 'CineTicket',
    tag: 'React · Node · SOLID',
    img: '/images/movie-theater.png',
    deploy: 'https://movie-theater-rosy.vercel.app/',
    github: 'https://github.com/Felyppe1/movie-theater',
    pt: 'Site de cinema em React e Node.js seguindo SOLID, com testes automatizados e documentação de endpoints.',
    en: 'A cinema site in React and Node.js following SOLID, with automated tests and endpoint docs.',
  },
  {
    title: 'Formulário Paginado',
    tag: 'React · Zod',
    img: '/images/formulario.png',
    deploy: 'https://multi-step-form-three-gamma.vercel.app/',
    github: 'https://github.com/Felyppe1/multi-step-form',
    pt: 'Formulário multietapas para treinar validação de inputs do usuário com a biblioteca Zod.',
    en: 'A multi-step form to practice user input validation with the Zod library.',
  },
  {
    title: 'Lista de Afazeres',
    tag: 'React',
    img: '/images/lista-afazeres.png',
    deploy: 'https://lista-de-afazeres-wheat.vercel.app',
    github: 'https://github.com/Felyppe1/lista-de-afazeres',
    pt: 'App de tarefas feito no curso da Rocketseat — o meu primeiro projeto usando React.',
    en: 'A to-do app built in the Rocketseat course — my first project using React.',
  },
  {
    title: 'Calculadora',
    tag: 'JavaScript',
    img: '/images/calculadora.png',
    deploy: 'https://felyppe1.github.io/calculadora/',
    github: 'https://github.com/Felyppe1/calculadora',
    pt: 'Réplica de uma calculadora física com quase as mesmas funcionalidades. Feita para praticar JavaScript.',
    en: 'A replica of a physical calculator with nearly the same features. Built to practice JavaScript.',
  },
]

export const TECH_CHIPS = [
  { icon: '/images/typescript.svg', label: 'TypeScript', w: 30, h: 30, color: '#4a9eff' },
  { icon: '/images/nodejs.svg', label: 'Node.js', w: 30, h: 30, color: '#83cd29' },
  { icon: '/images/react.svg', label: 'React', w: 30, h: 30, color: '#61dafb' },
  { icon: '/images/python.svg', label: 'Python', w: 30, h: 30, color: '#ffd743' },
  { icon: '/images/gcp.svg', label: 'Google Cloud', w: 30, h: 30, color: '#4285f4' },
  { icon: '/images/sql.svg', label: 'Banco de Dados', w: 26, h: 30, color: '#ff8c42' },
  { icon: '/images/terraform.svg', label: 'Terraform', w: 30, h: 30, color: '#a97bff' },
]
