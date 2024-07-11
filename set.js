const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0pubmU5OXFEdUN5ZS95ajhpckdldDJKN1FRZTcwdm5Gb1F4S1hQaFJIcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiREFCZkp2VFBZWnRNWXRDS0dtd3BqamJsQVRCdkJiVzdIdWZKYnEwR3RWaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnS3o2andzdkRDcWN0amtQNXR4TjEvWVd5WENUSjFNcWE0UFRiMGhnbjNBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFUWVQd1FmcWM0MU55NEZwaEZ3cEwzMFRZdzFvQUpuYTc5akZweUFXeFhVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdIN25wTWswNHpNWXd2MVFXMHJIZ2Ztd0IzNjdCTUY5VmVjZXNUalpzVzQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVvZWpKWUo0bTV6V3h6UHo1WmJWTFplSEdHd0lPT1dydndlQy9mZVRUUnM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUo4SnJtS08yLzhkTnd6NlM1NDk2cmFERUVENEhPaURrNTl6NTh2ZW1Gcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibzhWRzluN054cEEwQUxmeDNSaVl3dEM0eEJDMHd5U2ZGNmxWaHB2TDNBZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkU2Rm56RmhJRGtiT0J6em4xOXQrNzRaRy9iQzR5WHpXQ250UW9zMjh2WGp3Wi9IVE5DS2ZOV2JjZTRtTTlURitsRThSVms2cWN6UmNtYXJkWTQycWdRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzQsImFkdlNlY3JldEtleSI6Ii9CYlJya0ZIRjNuVkhFZlVkTnJYR041K2FZQ2RPTklza3dvdjdmbXozSXc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTIzMTEyNjU3NzA1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjlEQkI4NkM0NTE4QkFFODU5MjUxQzBBRDU4QUJDMEY5In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjA2OTc2NzF9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjF4WHJ0S1d2UThTbGEyaVp6aE11X1EiLCJwaG9uZUlkIjoiYWYwOTM2MWYtOTRkNy00NTFjLWE2NDYtMjJmZWQxMGFiYmYxIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImljVUN0eWlzeWRLSjMyYWtrR0JjbHpIM3NUbz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtOFp6TTBTUDVWUTBKV0hhdno1eUNJNmpmMDA9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiTVJBM0RYQ0giLCJtZSI6eyJpZCI6IjkyMzExMjY1NzcwNToyOEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJHWFMgQkFOS0lORyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTUh2bHN3REVMV0d2N1FHR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiVklRSDdCS1hPczJieXRHY2kxRDZjcjJyUjdJcDZ6MTl5cy9TZ2xFMmF4az0iLCJhY2NvdW50U2lnbmF0dXJlIjoiVXdmNlpzdzlNb2FqQkZqdndya2NubFZxQnhKeG1tRnoxTnRoMUVyampZU2ZCQlFsNmVxUW0yemR6U29Sa0dGYUdUR0U0bTZlcnRVZHdQMWZDYnNEQ1E9PSIsImRldmljZVNpZ25hdHVyZSI6ImdVa3Z0QW82K3ZSREYrQ0Z1dW04a1ZUVHhjdUY4VEFVSjNtRTZBMVYybnMrNXNHTGZLQjc3L1dRbEtnY3lPMS9aZU1IL21vZGM0bHJYMTcyaEZGK2lRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTIzMTEyNjU3NzA1OjI4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlZTRUIrd1NsenJObThyUm5JdFErbks5cTBleUtlczlmY3JQMG9KUk5tc1oifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjA2OTc2NjYsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBUEhmIn0=',
    PREFIXE: process.env.PREFIX || "+.",
    OWNER_NAME: process.env.OWNER_NAME || "Faisal udas",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "03112657705",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    BOT : process.env.BOT_NAME || 'Faisal udas',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/56a42641b6a12a05390de.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
