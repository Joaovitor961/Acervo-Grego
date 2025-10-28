# 🏛️ Acervo Grego

Uma aplicação web moderna e interativa para explorar a fascinante mitologia grega. Descubra informações detalhadas sobre deuses, suas histórias, poderes e relações familiares.

## 📋 Sobre o Projeto

O **Acervo Grego** é uma plataforma educacional que permite aos usuários navegarem por um vasto acervo da mitologia grega. Através de uma interface intuitiva e responsiva, os visitantes podem aprender sobre as divindades do Olimpo, heróis lendários e suas épicas aventuras.

## ✨ Funcionalidades

- 🔍 **Busca Inteligente**: Pesquise por deuses e heróis por nome
- 📚 **Listagem Completa**: Visualize todos os deuses e heróis catalogados
- 📖 **Detalhes Completos**: Acesse informações detalhadas incluindo:
  - Origem e descrição
  - Símbolos e poderes
  - Relações familiares (pais, irmãos, cônjuges)
  - Histórias e mitos associados
- 🎨 **Interface Moderna**: Design responsivo e amigável usando Bootstrap
- ⚡ **Performance**: Carregamento rápido com Vite

## 🛠️ Tecnologias Utilizadas

- **Frontend Framework**: React 19.1
- **Linguagem**: TypeScript 5.9
- **Roteamento**: React Router DOM 7.9
- **Estilização**: 
  - Bootstrap 5.3
  - Sass/SCSS
- **Build Tool**: Vite 7.1
- **Linting**: ESLint + Prettier
- **API Externa**: [The Greek Myth API](https://thegreekmythapi.vercel.app)

## 📦 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## 🚀 Instalação

1. Clone o repositório:
```bash
git clone git@github.com:Joaovitor961/Acervo-Grego.git
cd acervo-grego
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra seu navegador e acesse:
```
http://localhost:5173
```

## 📜 Scripts Disponíveis

No diretório do projeto, você pode executar:

### `npm run dev`
Inicia o servidor de desenvolvimento.
A página será recarregada automaticamente quando você fizer alterações.

### `npm run build`
Compila o TypeScript e cria a build de produção na pasta `dist`.
A build é otimizada para melhor performance.

### `npm run preview`
Visualiza localmente a build de produção.

### `npm run lint`
Executa o ESLint para verificar problemas no código.

## 📁 Estrutura do Projeto

```
acervo-grego/
├── public/              # Arquivos públicos estáticos
├── src/
│   ├── api/            # Integração com API externa
│   │   └── greekApi.ts # Funções para buscar dados da API
│   ├── assets/         # Imagens e recursos estáticos
│   ├── components/     # Componentes reutilizáveis
│   │   ├── CardItem.tsx    # Card para exibir entidades
│   │   ├── Footer.tsx      # Rodapé da aplicação
│   │   ├── NavBar.tsx      # Barra de navegação
│   │   └── SearchBar.tsx   # Componente de busca
│   ├── pages/          # Páginas da aplicação
│   │   ├── GodDetail.tsx   # Detalhes de um deus
│   │   ├── GodsList.tsx    # Lista de deuses
│   │   ├── HeroesList.tsx  # Lista de heróis
│   │   └── Home.tsx        # Página inicial
│   ├── styles/         # Estilos globais SCSS
│   │   └── main.scss
│   ├── types/          # Definições de tipos TypeScript
│   │   └── myth.ts     # Interfaces de entidades mitológicas
│   ├── App.tsx         # Componente principal
│   ├── main.tsx        # Ponto de entrada da aplicação
│   └── index.css       # Estilos globais
├── index.html          # Template HTML
├── package.json        # Dependências e scripts
├── tsconfig.json       # Configuração TypeScript
├── vite.config.ts      # Configuração Vite
└── README.md          # Este arquivo
```

## 🌐 API Utilizada

Este projeto consome dados da **[The Greek Myth API](https://thegreekmythapi.vercel.app/api)**, uma API pública que fornece informações sobre:

- Deuses (`/gods`)
- Heróis (`/heroes`)

A integração é feita através do módulo `src/api/greekApi.ts`, que inclui:
- Normalização automática de diferentes formatos de resposta
- Funções de busca por ID ou nome
- Tratamento de erros

## 🎯 Rotas da Aplicação

- `/gods` - Lista todos os deuses
- `/gods/:id` - Detalhes de um deus específico
- `/heroes` - Lista todos os heróis
- `/heroes/:id` - Detalhes de um herói

## 📝 Licença

Este projeto é de código aberto e está disponível para uso educacional.

## 👨‍💻 Autor

Desenvolvido com ❤️ para os entusiastas da mitologia grega.

---
