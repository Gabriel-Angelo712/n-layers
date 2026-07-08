# n-layers CLI

`n-layers` é uma ferramenta de linha de comando para criar a estrutura de diretórios padrão de um projeto em camadas (n-layers). Ela verifica se o caminho informado é um diretório válido, testa permissões de leitura e escrita e cria pastas que estejam faltando.

## Instalação

1. Certifique-se de ter o Node.js instalado.
2. No diretório do projeto, instale as dependências locais ou torne a ferramenta executável globalmente:

```bash
npm install
npm link
```

## Uso

Execute a CLI informando o diretório onde a estrutura deve ser criada:

```bash
n-layers ./
```

O primeiro argumento deve ser um caminho para um diretório existente.

## Estrutura criada

A CLI garante que os seguintes diretórios existam, criando-os quando necessário:

- `./src/entities`
- `./src/factories`
- `./src/services`
- `./src/repositories`
- `./src/utils`
- `./docs`
- `./database`

## Responsabilidades

- `Entities: objetos de domínio puros, sem dependências.`
- `Repositories: abstraem a persistência (manipulação de banco de dados e APIs externas).`
- `Services: orquestram as entidades e repositórios, contendo a lógica de negócio.`
- `Factories: centralizam a criação de objetos complexos.`
- `Utils: funções genéricas e reutilizáveis.`

## Comportamento

Ao executar a CLI:

- o caminho informado é verificado como diretório existente
- são verificadas permissões de leitura e escrita
- diretórios ausentes são criados automaticamente
- mensagens de status são exibidas no console
