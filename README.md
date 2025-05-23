**eCommerce REST API**

**Projektbeskrivning**

Detta projekt är en backend-lösning för en e-handelswebbplats, byggd med Node.js och Express. Den är utformad för att hantera produkter, användare och ordrar, och erbjuder en RESTful API för att interagera med databasen. Backend-lösningen är kopplad till en NoSQL-databas (MongoDB) och följer de krav och riktlinjer som anges i uppgiftsbeskrivningen.

Frontend-delen av projektet är byggd med JavaScript, React och Tailwind CSS, och utvecklades i Visual Studio Code.

**Funktionalitet**
Backend-lösningen erbjuder följande funktioner:

*  Lista produkter: Hämta alla produkter från databasen med en GET-förfrågan.
*  Enskild produkt: Hämta en specifik produkt med en GET-förfrågan och produktens ID som parameter.
*  Lägga till produkt: Lägg till en ny produkt i databasen med en POST-förfrågan.
*  Uppdatera produkt: Uppdatera en befintlig produkt med PUT eller PATCH.
*  Ta bort produkt: Ta bort en produkt från databasen med en DELETE-förfrågan.
*  Skicka meddelande: Skicka ett meddelande med en POST-förfrågan, där fälten name, email och message valideras.
*  Registrera användare: Användare kan registrera sig med en POST-förfrågan och få tillbaka en JSON Web Token (JWT).
*  Kryptera lösenord: Lösenordet krypteras innan det sparas i databasen.
*  Logga in användare: Användare kan logga in och få tillbaka en JWT.
*  Orderhantering: Inloggade användare kan spara ordrar i databasen, där varje order innehåller en array av produkter.
*  Orderhistorik: Användare kan hämta sina tidigare lagda ordrar med en GET-förfrågan, där varje order innehåller detaljerad produktinformation.
*  Hämta och hantera alla användare
*  Uppdatera användar roll
*  Ta bort användare

**Installation**

Följ dessa steg för att installera och köra projektet lokalt:

Klona repositoryt:

git clone https://github.com/ditt-användarnamn/ditt-repo-namn.git
cd ditt-repo-namn

Skapa en .env-fil i rotmappen(backend) och lägg till dina miljövariabler, inklusive databasanslutning och JWT-hemlighet:

*  PORT=din_PORT
*  MONGODB_URI=din_mongodb_uri
*  ACCESS_TOKEN_SECRET=din_jwt_hemlighet
*  NODE_ENV = production

Kör detta kommando i terminalen för att installera nödvändiga paket:

npm run build

Starta servern:

npm start

Servern bör nu vara igång på http://localhost:din_PORT/.

**Användning**

API:et kan nås via följande endpoints:

*  GET /products - Hämta alla produkter
*  GET /products/:id - Hämta en specifik produkt
*  POST /products - Lägg till en ny produkt
*  PUT /products/:id - Uppdatera en produkt
*  PATCH /products/:id - Uppdatera en produkt
*  DELETE /products/:id - Ta bort en produkt
*  POST /message - Skicka ett meddelande
*  POST /auth/register - Registrera en ny användare
*  POST /auth/login - Logga in en användare
*  POST /order - Spara en order
*  GET /order - Hämta orderhistorik
*  GET /order/:orderId - Hämta specifik order i orderhistorik
*  POST /order/guest - Gör en order, men sparas inte i API för ej inloggda

**Källor för använda produkter**

Produkter och produktbilder som används i detta projekt har hämtats från www.komplett.se. Se till att ge korrekt kredit och följa licensvillkor för dessa resurser.

**Teknologier**

Projektet använder följande teknologier:

*  Backend: Node.js, Express
*  Frontend: JavaScript, React, Tailwind CSS
*  Databas: MongoDB
*  Utvecklingsmiljö: Visual Studio Code

**Disclaimer**

Se till att följa alla relevanta lagar och regler kring användning av produktbilder och annan information från externa källor.
