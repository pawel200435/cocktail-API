 <div align="center">
  <img src="./docs/screenshots/cocktail-glass.png" width="120" alt="Cocktail Glass Logo" />

# Cocktails REST API

**REST API for cocktails, ingredients, and drink recipes.**

  <p>
    <img src="https://img.shields.io/badge/Node.js-20.x-green?logo=node.js" alt="Node.js" />
    <img src="https://img.shields.io/badge/NestJS-REST%20API-ea2845?logo=nestjs" alt="NestJS" />
    <img src="https://img.shields.io/badge/PostgreSQL-Database-4169e1?logo=postgresql" alt="PostgreSQL" />
    <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma" alt="Prisma" />
  </p>
</div>

---

Projekt rekrutacyjny na stanowisko Backend w Kole Naukowym **Solvro**.
<br>
Strona: https://solvro.pwr.edu.pl/pl/
<br>
Github: https://github.com/solvro

Aplikacja to w pełni funkcjonalne REST API do zarządzania bazą koktajli i ich składników, zaimplementowane w oparciu o framework **NestJS**, bazę danych **PostgreSQL** oraz ORM **Prisma**.
<br><br>

## Technologie

- **Framework:** NestJS
- **Baza danych:** PostgreSQL
- **ORM:** Prisma
- **Walidacja danych:** `class-validator`, `class-transformer`
- **Dokumentacja API:** Swagger / OpenAPI

<br>

## Schemat bazy danych

<img src='./docs/screenshots/coctails_DB_diagram.png' width=700></img>

<br>

## Uruchomienie projektu

### Wymagania

- Node.js (wersja 20+ zalecana)
- Zainstalowana i uruchomiona baza PostgreSQL (np. lokalnie lub w kontenerze Docker)
<br>

<br>

```bash
### 1. Klonowanie i instalacja zależności
git clone <URL_REPOZYTORIUM>
cd <NAZWA_KATALOGU>
npm install

### 2. Plik .env

DATABASE_URL="postgresql://postgres:<HASLO>@localhost:5432/cocktail_db?schema=public"

### 3. Migracja bazy danych

npx prisma migrate dev

### 4. Seedowanie bazy danych

npx prisma db seed

### 5. Start aplikacji

npm run start

### 6. Link

Aplikacja - http://localhost:3000
API DOCS - http://localhost:3000/api

```
