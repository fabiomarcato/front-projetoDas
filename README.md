# FrontProjetoDas

Repositório destinado a criação de um sistema para controlar o processo de pedido de produtos.
Esta aplicação pode ser visualizada online através do link: https://frontdas.netlify.app/

Neste repositório constam apenas arquivos referentes ao frontend.
Link repositório backend: https://github.com/Jorgehernandes88/ApiUfpr

## Servidor de Desenvolvimento
Execute `ng serve` para subir um servidor de desenvolvimento. Navegue para `http://localhost:4200/`. O aplicativo irá atualizar automaticamente caso os arquivos sofram alterações.

Atualmente a API do backend encontra-se na nuvem e pode ser acessada no link:  https://apiufpr2021.herokuapp.com/swagger-ui.html#/
Caso queira executar o backend localmente, é necessário atualizar as variáveis de URL que se encontram dentro dos arquivos service.ts.

Para instalação local do banco de dados Mysql é necessário alterar o arquivo application.properties incluíndo o nome do banco, usuário e senha. 
Para criação das tabelas, utilizar o script fornecido no link: https://github.com/Jorgehernandes88/ApiUfpr/tree/main/apiUfpr/script_sql.txt

## Testes unitários

Execute `ng test` para rodar os testes unitários através do navegador via [Karma](https://karma-runner.github.io).

## Ajuda

Para mais ajuda sobre Angular CLI, execute `ng help` ou visite o site oficial do framework [Angular CLI Overview and Command Reference](https://angular.io/cli).
