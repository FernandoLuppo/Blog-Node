<div align="center">
<h1> 💻 Blog Node 💻
</div>
  
<p align="center">Olá!! Esse é um projeto de um blog onde as pessoas poderão ler noticias postadas e também procurar por um assunto especifico.
  
<br><br>
  
<p>💻 As tecnologias usadas no projeto foram:
   
<p>
<br> - JavaScript
<br> - CSS
<br> - HTML
<br> - Node.JS
<br> - MongoDB
<br> - Mongoose
<br> - Express
<br> - Passport
<br> - bcryptjs
<br> - express-session
<br> - Handlebars
</p>

<br><br>

<h2>Como Usar</h2>
   
<p>Existem três tipos e usuários:</p>
<br>

<p><strong>Usuário sem conta:</strong> Esse usuário tem um acesso limitado ao site, conseguindo acessar apenas as páginas de login, registro e a home</p>

<p>
  <strong>Usuário normal:</strong> Esse usuário já fez seu registro e com isso ganha acesso as páginas de listagem de categorias onde pode escolher um tópico, 
  assim tendo acesso as postagens relacionadas aos tópicos escolhidos
</p>

<p><strong>Usuário admin:</strong> Esse usuário tem acesso a todas as páginas do site, podendo fazer postagens e criar novos tópicos</p>

<br>

<h2>Home</h2>
<p>
  Na página Home você terá acesso a um breve resumo das postagens mais recentes e caso não tenha um cadastro ou não esteja logado terá também acesso a ambas
  páginas pela navbar, porém caso já esteja logado você poderá deslogar também pela navbar
<p>
<img src=https://user-images.githubusercontent.com/95176596/189969163-83d0ffa3-b6dc-48b9-9235-9ce6a3a0ee58.png>

<h2>login/register</h2>
<p>
  Tanto a página login quanto a página registro são validadas no back-end para que não possam ser burladas, caso o usuário preencha errado um campo ou deixa algum
  sem preencher ele será notificado, o cadastro é simples e as senhas são salvas no banco já incriptada pelo "bcryptjs"
</p>
<div align="center" display="flex">
  <img src=https://user-images.githubusercontent.com/95176596/189971382-a53622db-efd5-46cb-a300-df7eb6383d86.png>
  <img src=https://user-images.githubusercontent.com/95176596/189972171-aefb3b0c-4a3d-4bc7-a0c1-7b39c293bd3e.png>
</div>
<br>

<h2>Categorias</h2>

<p>
  A página Categorias lista todos os temas que tem no site para que o usuário possa ler postagens filtradas pelo temas escolhido, após selecionar um tema 
  você será direcionado para uma página onde terá uma lista com uma breve descrição da postagem, ao clicar em "ler mais" você será incaminhado para a postagem clicada
</p>
<img src=https://user-images.githubusercontent.com/95176596/189973765-a12da21b-13a2-44a2-a345-c2529a9491b9.png>
<div align="center" display="flex">
  <img src=https://user-images.githubusercontent.com/95176596/189974107-3b6ddb2f-aff0-4735-8db0-daa9c5ae180e.png>
  <img src=https://user-images.githubusercontent.com/95176596/189974306-d15aa6f4-c419-4dd0-abb3-ab0499d904b0.png>
</div>
<br>

<h2>Admin Categorias</h2>
<p>
  Essa página apenas pode ser acessada por um usuário admin, nela é possível visualizar as categorias que estão presentes no site, deletar, editar e 
  adicionar uma nova categoria, tanto a página de adicionar uma nova categoria quanto a página de edição tem uma validação no back-end para que os dados
  sejam tratados antes de ir para o banco
</p>
<img src=https://user-images.githubusercontent.com/95176596/189977063-2f12a70a-0cf8-4070-8a3e-10a8a53c57ea.png>
<div align="center" display="flex">
  <img src=https://user-images.githubusercontent.com/95176596/189977354-1140443a-17fb-4853-bfc8-09a90d398933.png>
  <img src=https://user-images.githubusercontent.com/95176596/189977588-6782fc08-1abd-4eab-bb43-1013b4e41d6d.png>
</div>
<br>

<h2>Admin Posts</h2>
<p>
  Essa página é muito parecida com a página Categorias, ela apenas pode ser acessado por usuários admins, em sua home voce pode deletar, editar e adicionar um
  novo post, também tem uma validação de dados nas páginas edição e criação de posts
</p>
<img src=https://user-images.githubusercontent.com/95176596/189981536-888aebb7-d465-4a4b-9fcf-0a53d6c6e7db.png>
<div align="center" display="flex">
  <img src=https://user-images.githubusercontent.com/95176596/189981788-8e139f9a-4ec5-42c3-a51e-9eecfe37400c.png>
  <img src=https://user-images.githubusercontent.com/95176596/189982152-94774906-1593-4fdb-925b-a090d7b36eab.png>
</div>
<br>

<h2>Mobile</h2>
<p>Toas as páginas são adptadas para celular, tendo um menu na navbar quando o site é aberto em um dispositivo mobile</p>
<div align="center">
  <img src=https://user-images.githubusercontent.com/95176596/189983124-9307053e-dede-46bf-aaaf-d22a33e91288.gif>
</div>














