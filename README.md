## Java Recrutamento Interno


<p align="center">
  <img width="704.4" height="462" src="/src/video.gif">
</p>

## 📋 Prerequisites
```
Java 17
Angular 13
Node
IDE
Docker(opcional)
```

## 🐋🚢 Executando com Docker

Compose está configurado para rodar o backend na porta 8081, o frontend na porta 9000 e o banco de dados na 5432. Se você quiser mudar, altere o arquivo logistics/src/docker/***[docker-compose.yml](src/docker/docker-compose.yml)***.

O Docker Hub para o projeto é [Docker-hub-link](https://hub.docker.com/repository/docker/victormachado38/logistics/general)

Para rodar o Docker, execute o comando:
```
docker-compose up
```
Em seguida, abra o navegador e digite [***localhost:9000***](http://localhost:9000/).

## 🔧 Instalação

#### Angular
Instale o node e o npm [clique aqui para aprender](https://nodejs.org/pt-br/download/package-manager)
```
npm i @angular/cli@13.3.11
```
Install the project dependencies in the ***logistics/src/angular/*** directory, run the command:
```
npm install
```
To run the project, run the command:
```
ng serve
```
## Java
Instale o Java 17 [clique aqui para aprender](https://www.oracle.com/br/java/technologies/javase-jdk17-downloads.html)

Para rodar o projeto, execute este [arquivo](src/main/java/com/br/internalrecruitment/LogisticsApplication.java) localizado em "***src/main/java/com/br/logistics/LogisticsApplication.java***"

## 🛠️ Construído com

* [Angular](https://www.npmjs.com/package/@angular/cli/v/13.3.11) - Framework
* [Maven](https://maven.apache.org/) - Gerenciador de Dependências
* [Java](https://www.java.com/pt-BR/) - Linguagem de Programação para o backend
* [Docker](https://www.docker.com/) - Contêiner para o banco de dados, backend e frontend (TUDO)
* [PostgreSQL](https://www.postgresql.org/) - Banco de Dados
* [Spring](https://spring.io/) - Framework para o backend
* [Hibernate](https://hibernate.org/) - Framework para o backend
* [Lombok](https://projectlombok.org/) - Framework para o backend

## 📌 Versão

Padrão [git](https://git-scm.com/) para controle de versão.

## ✒️ Autores

* **Victor Augusto** - *Desenvolvimento* - [Linkedin](https://www.linkedin.com/in/victormachado38/)