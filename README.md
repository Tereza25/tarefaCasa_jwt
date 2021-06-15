### Turma Online 11 - Todas em Tech | Back-end | 2021 | Semana 15: Autenticação e Segurança

Olá, sejam bem-vindas a aula de autenticação e segurança! Meu nome é Tereza Oliveira (@Tereza25), e irei acompanhar vocês nessa semana.

#### Vamos preparar o ambiente!


Para executar este projeto, você deverá ter instalado o Node.js e as dependências do npm. Será necessário ter instalado o banco de dados Mongodb e suas configurações. Além disso, iremos fazer requisições na API com a plataforma Postman.

Seguiremos a ordem de instalações:

-------------------------------
$ npm init
$ npm install express --save
$ npm install nodemon --save
$ npm install mongoose
-------------------------------

Este projeto já está com o método HTTP Get organizado, e todas as rotas de integração com o banco de dados. O próximo passo agora é criar o processo de autenticação.

Segue as orientações:

1 - Instalar “jsonwebtoken” via npm install $ npm install jsonwebtoken

2 - Gerar chave pelo http://travistidwell.com/jsencrypt/demo/ e guardar a chave pública.

3-Instalar dotenv-safe $ npm install dotenv-safe

4 - Criar arquivo .env.example e env., ambos com chave chamada SECRET 
$ secret=chave_rsa_aqui_sem_aspas

5 - Carregar as variáveis de ambiente no projeto, no arquivo xxxRoute.js da pasta route. $ require(‘dontenv-safe’).config();

6 - Criar variável contendo a SECRET $ const secret = process.env.SECRET

7 - Criar método de autenticação em getAll

8 - Pegar o header de autorização e enviar uma mensagem de erro 401 vir vazio
$ const authHeader = request.get(‘authorization’);

9 - Passar bearer token no header de autenticação via postman
$ Bearer TOKEN_JWT_AQUI

10 - Verificar token JWT  e enviar uma mensagem de erro 403 caso seja inválido. $ jwt.verify(token, SECRET, (error) => {...});


#### Vamos criptografar a senha da rota colaboradoras


1 - Instalar bcrypt $ npm install bcrypt

2 - Fazer require do bcrypt no colaboradorasController.js 
   $ const bcrypt = require(‘bcryptjs’)

3 - Gerar hash com senha recebida no body da request 
$ bcrypt.hashSync(request, body, senha, 10)

4 - Criar nova colaboradora no banco com a senha hasherizada e o login(email) recebido no body da request.


#### Vamos criar a rota de login


1 - Criar a rota de login na pasta routes no arquivo colaboradoras.js
$ router.post(“/login”, controller.login);

3 - Buscar colaboradora a partir do email recebido na request, e mostrar um erro 404 caso não encontre. 
$ Colaboradoras.findOne({ email: req.body.email }, function{error, colaboradora} {...}

4 - Fazer require do plugin JWT $ const jwt = require(‘jsonwebtoken’);

5 - Importar SECRET e gerar token JWT a partir do nome e secret e devolver na request $ jwt.sign({ name:colaboradora.name }, SECRET;

6 - Bater na rota getAll via Postman com o token gerado


















