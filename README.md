## Cidade Alta RP (EMBLEMAS)

Projeto desenvolvido com typescript e NestJS para listagem e atribuições de emblemas para usuários.

## Índice 

1. [Instalação](#instalação)
2. [Como Usar](#como-usar)
2. [Documentação Swagger](#documentação-swagger)
3. [Considerações](#considerações)

## Instalação

1. Clone o repositorio:
```bash
git clone git@github.com:gustavomfranzin/cidadealtarp.git

```
2. Instale as dependências:
```bash
pnpm install
```
3. Crie um arquivo .env e preencha de acordo com o .env.sample
```bash
MYSQL_DATABASE=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_ROOT_PASSWORD=
PMA_HOST=
PMA_PORT=
API_PORT=
```
4. Execute o banco de dados mysql através do docker:
```bash
docker compose up
```
5. Realize o build do projeto:
```bash
pnpm build
```

## Como Usar

1. Execute o projeto rodando um dos comandos abaixo:
```bash
pnpm start:dev 
pnpm start:debug
pnpm start:prod
```

Pronto, o projeto vai estar escutando na porta configurada através da porta fornecida na variável API_PORT;

## Documentação Swagger

Abaixo estão instruções sobre como acessar a documentação da API deste projeto.

### Acesso à Documentação

Acesse a documentação da API Swagger para explorar endpoints e realizar testes:

[Swagger API Documentation](http://localhost:API_PORT/api/docs#/)

### O que você pode encontrar na documentação?

- Lista de todos os endpoints da API
- Descrição detalhada de cada endpoint, incluindo parâmetros, respostas e exemplos
- Opções para testar cada endpoint diretamente através da interface Swagger

## Considerações

O docker compose irá iniciar o serviço de banco de dados e phpadmin, também irá realizar a criação das tabelas e inserção dos dados abaixo:

## Emblemas

```csv
Id,Slug,Name,Image
1,cda,Cidade Alta,https://cidadealtarp.com/imagens/challenge/cidade-alta.png
2,cda-valley,Cidade Alta Valley,https://cidadealtarp.com/imagens/challenge/cidade-alta-valley.png
3,policia,Policia do Cidade Alta,https://cidadealtarp.com/imagens/challenge/policia.png
4,hospital,Hospital do Cidade Alta,https://cidadealtarp.com/imagens/challenge/hospital.png
5,mecanica,Mecânica do Cidade Alta,https://cidadealtarp.com/imagens/challenge/mecanica.png
6,taxi,Taxi do Cidade Alta,https://cidadealtarp.com/imagens/challenge/taxi.png
7,curuja,Coruja,https://cidadealtarp.com/imagens/challenge/coruja.png
8,hiena,Hiena,https://cidadealtarp.com/imagens/challenge/hiena.png
9,gato,Gato,https://cidadealtarp.com/imagens/challenge/gato.png
10,urso,Urso,https://cidadealtarp.com/imagens/challenge/urso.png
```

## Usuários

## Id será sequencial de 1 a 10 

```csv
Name,Email,Password
User 1,user1@example.com,password1
User 2,user2@example.com,password2
User 3,user3@example.com,password3
User 4,user4@example.com,password4
User 5,user5@example.com,password5
User 6,user6@example.com,password6
User 7,user7@example.com,password7
User 8,user8@example.com,password8
User 9,user9@example.com,password9
User 10,user10@example.com,password10
```


