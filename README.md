# The Friend Zone

## Beskrivning

The Friend Zone är en sida som på många sätt liknar twitter. För en vanlig användare kan man registrera ett konto, göra inlägg på en global tidslinje, ta bort samt redigera sina egna inlägg.

De användare som har administratörsstatus kan göra ovanstående på allas inlägg, men har också möjligheten att ändra administratörsstatus på användare samt ta bort användare. Detta görs via en adminpanel som endast administratörer har tillgång till.

## Tekniker och verktyg

Vi har använt oss av följande tekniker:

### Front End

- [Yup](https://github.com/jquense/yup) - Validering
- [Material UI](https://mui.com/material-ui/getting-started/overview/) Designsystem
- [Formik](https://formik.org/docs) - Formulärhantering
- [React](https://react.dev) - JavaScript-ramverk
- [React Router](https://reactrouter.com/en/main) - Routing
- [Vite](https://vitejs.dev/) - Byggverktyg

### Back End

- [Express](https://expressjs.com/) - Webbramverk
- [Mongoose](https://mongoosejs.com/) - MongoDB-objektmodellhanterare
- [MongoDB](https://www.mongodb.com/) - Dokumentdatabas
- [Yup](http://github.com/jquense/yup) - Validering
- [Cookie-Session](https://www.npmjs.com/package/cookie-session) - Sessionshantering
- [Argon2](https://www.npmjs.com/package/argon2) - Kryptering
- [Nodemon](https://www.npmjs.com/package/nodemon) - Utvecklingsverktyg

## Skapare

[Edvin Djulic](https://github.com/Edvindjulic), [Carl Hasselblad](https://github.com/lysmac), [Jesper Lindström](https://github.com/Jesper-Lindstrom), [Yehad Moussaoui](https://github.com/ye-mou)

## Kodbas

Den här kodbasen är indelad i en [klientmapp](./client/) och en [servermapp](./server/).
Servern har två miljöer konfigurerade, en för utveckling och en för testning.

Här är en lista på de olika skripten som kan köras i terminalen.

Navigera först till server mappen -`cd server` och sedan:

- `npm install` - Installerar alla NodeJS moduler (körs en gång).
- `npm run update` - Uppdaterar testerna och behöver köras om läraren har ändrat dom.
- `npm run dev` - Startar utvecklingsmiljön.
- `npm test` - Startar testmiljön så du kan jobba med kravlistan.

Efter detta kan du navigera tillbaka till root-mappen genom att skriva `cd ..` och sedan köra följande kommandon:

- `npm install` - Installerar alla NodeJS moduler (körs en gång).
- `npm run dev` - Startar utvecklingsmiljön med Vite.

När du har gjort detta kan du sedan när du står i root-mappen använda följande kommandon så du slipper navigera in i mapparna:

- `npm test` - Startar testen utan att du behöver navigera in i server-mappen.
- `npm run frontend` - Startar frontend-miljön med Vite.
- `npm run backend` - Startar backend-miljön med Nodemon.
- `npm run all`- Startar både frontend och backend samtidigt.

**Krav för godkänt:**

- [x] Git & GitHub har använts
- [x] Projektmappen innehåller en README.md fil (läs ovan för mer info)
- [x] Uppgiften lämnas in i tid!
- [x] Det ska finnas minst två stycken resurser (users & posts)
- [x] Det ska gå att registrera sig, logga in och skapa innehåll som är kopplat till inloggad användare.
- [x] Endast den inloggade användaren får lov att utföra C_UD actions på sitt innehåll.
- [x] Allt innehåll ska sparas i en MongoDB databas.

**Krav för väl godkänt:**

- [x] Alla punkter för godkänt är uppfyllda
- [x] Det ska finnas en adminroll i systemet där man som inloggad admin har rättigheten att utföra CRUD operationer på allt innehåll.
- [x] Admins ska ha tillgång till ett gränssnitt som listar alla användare och deras roller. En admin ska från gränssnittet kunna ta bort användare eller ändra dess roll.
