# Brain Agriculture

Este projeto foi feito no framework Next.js, na versão 14.2.5.

## Versões

- **Next.js**: 14.2.5
- **Node.js**: 18.17.1
- **npm**: 9.6.7

## Descrição

O projeto utiliza arquivos JSON locais na pasta `src/mocks` como banco de dados, portanto, no momento só funciona localmente. Será feito posteriormente o desenvolvimento no ambiente cloud e postada a URL demo.

## Bibliotecas Utilizadas

- **Tailwind CSS**: Para estilização geral e criação de componentes customizados e reutilizáveis.
- **Chakra UI**: Uso dos componentes de Modal, Multi-select e Breadcrumb.
- **react-hook-form**: Criação e gerenciamento de formulários.
- **Zod**: Validação de dados de forma flexível e altamente customizável.
- **react-google-charts**: Para criação dos gráficos dinâmicos na dashboard.
- **react-toastify**: Para feedback de ações rápidas.
- **Tanstack/react-table**: Para agrupar e organizar os dados dos produtores de forma simples e eficaz.
- **react-icons**: Biblioteca de ícones extensa e completa.
- **Jest / react-testing-library**: Testes unitários.

## Instalação

Para rodar o projeto, siga os passos abaixo:

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Rode o projeto localmente:

   ```bash
   npm run dev
   ```

## Observação

Como melhoria/alternativa, pode ser usado o `react-query` para gerenciar as chamadas assíncronas, cache e feedback de carregamento. Será feito em um desenvolvimento futuro para demonstração.

---

Este é um projeto em constante evolução e melhorias estão sendo feitas continuamente. Fique atento para novas atualizações e funcionalidades.
