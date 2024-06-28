# syntax=docker/dockerfile:1

FROM eclipse-temurin:17-jdk-jammy


COPY ./internalrecruitment-0.0.1-SNAPSHOT.jar .

# CASO PRECISE ja ta no esqueleto
#ENV DATABASE_URL=jdbc:postgresql://172.18.0.2:5432/postgres
#ENV DATABASE_URL=jdbc:postgresql://Banco-de-Dados:5432/postgres
#ENV DATABASE_USERNAME=postgres
#ENV DATABASE_PASSWORD=admin

ENTRYPOINT ["java","-jar","internalrecruitment-0.0.1-SNAPSHOT.jar"]