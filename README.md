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
<br>

## Technologie

- **Framework:** NestJS
- **Baza danych:** PostgreSQL
- **ORM:** Prisma
- **Uwierzytelnianie i Bezpieczeństwo:** Passport, Passport-JWT, bcrypt
- **Walidacja danych:** class-validator, class-transformer
- **Dokumentacja API:** Swagger / OpenAPI

## Schemat bazy danych

<img src='./docs/screenshots/cocktails_DB_diagram.png' width=700></img>

<br>

## Funkcjonalności API

### 1. Uwietrzlnianie i autoryzacja

- <b> Rejestracja użytkowników </b> - walidacją adresu email i haszowaniem hasła poprzez bcrypt.
- <b> Logowanie użytkowników </b> - sprawdzenie hasła, generowanie tokenów JWT
- <b> Role użytkowników i autoryzacja </b> - publiczny dostępn do przeglądania (GET), dodawanie nowych koktajli tylko dla zalogowanych, powiązanie koktajlu z autorem, tylko autor lub admin mogą usuwać/edytować dany koktajl.

### 2. Zarządzanie składnikami (INGREDIENTS)

- <b> Pełny CRUD </b>
- <b> Paginacja </b>
- <b> Blokada usunięcia składnika </b> - jeśli jest on powiązany z jakimkolwiek istniejącym koktajlem
- <b> Wyszukiwanie składników po nazwie lub opisie </b>
- <b> Filtrowanie składników alkoholowych i bezalkoholowych </b>
- <b>Możliwość sortowania po nazwie lub dacie utworzenia oraz kierunku</b>
- <b> Wszystkie filtry można stosować jednocześnie </b>

### 3. Zarządzanie koktajlami i przepisami (COCKTAILS)

- <b> Pełny CRUD </b>
- <b> Paginacja </b>
- <b> Obsługa tabeli CocktailItems zawierającej amount i unit </b>
- <b> Przypisywanie tworzonego koktajlu do zalogowanego użytkownika</b>
- <b> Filtorwanie po kategorii koktajlu, nazwie lub instrukcji</b>
- <b> Filtorwanie koktajli po id lub nazwie składnika</b>
- <b> Filtorwanie koktajli alkoholowych i bezalkoholowych</b>
- <b> Filtorwanie koktajli po adresie email autora </b>
- <b> Sortowanie wyników po nazwie lub dacie utworzenia w wybranym kierunku </b>
- <b> Wszystkie filtry można stosować jednocześnie </b><br>
  `GET /cocktails?category=LONG_DRINK&ingredientName=mięta&isAlcoholic=false&authorEmail=user1@solvro.pl`

### 4. Automatyczne seedowanie bazy danych - npx prisma db seed

- 3 konta testowe: admin, user1 (autor drinków), user2
- 5 koktajli z różnymi składnikami i kategoriami
- 13 składników (zarówno alkoholowych jak i bezalkoholowych)

### 5. Dokumentacja Swagger/OpenAPI pod adresem /api z obsługą autoryzacji tokenem JWT

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
