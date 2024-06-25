const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY1BTdDhSODZDdG5ITHpVdlZvVkpsWThLZVlhWVE1SmxoOHVMY25Jb1JGRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWEd4VDRUVGVBUWVMM0d5THhsME5vQU8wZXU1eHRJQWlnU3JKV1FFMzBRVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhRkVJQkRtS2w5bkpJVTZHV3RhRTU1OVVmd1VscDNvcGNoQkVINTFNQUhvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxWEl3TFFJVGFtZXRqYW9ERWpMVDdiVU84bjhUNW1MMi9RRWhQeC93ckFRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhKdUg1STF3dk9jMUlGYjJEeEF5V2x0cWxhNGU2ekpzbG0wcTBNdlhKR0k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJ2YlhBSVBoR2JyYk9kcXdGbWd2bTZyajJxeHBBQU8va3VvVy9EWGtYakU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUhPeU9FeVpqY3NwR015enp5M2s5dS85NEhER0s1N3YvNjc3Z3RoRnpsND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOHdvVEovUS9ZZ1NocElMTVFUUGFNOGc1SWhkUWRobkozelBoNGNiaTdIUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImI2QUVQaXVwallNT01uS0FzU3dLM2F1UzZjVXVlVkQ1OUJwUjFqS0E0amN5WVZGQTkrOFZicTZNRVN5UEpOaXo5VkxjWldRenV3WitIKzhxUXY0U0NBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzMsImFkdlNlY3JldEtleSI6IkUzRy9nUFRuMDk0WFJYVGxrQ2hITUxSeTlyWjJRbXIrTFkvc2c2d2lUdzA9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlNsRTF1VXV5UkpHaF9lSzV6ei1FS0EiLCJwaG9uZUlkIjoiZDU1Y2UwMGMtOWEyZC00MDBmLThhMjAtNjlkMjM1MGJiZGRmIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ims1cmZBbHRTU2pZWjFZdmZmOCs0VWpwVXVmdz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJadC9welJ6UTVsK0pPUjNGWXlRMUE0Y1BEbFE9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiMjlLRzFNVloiLCJtZSI6eyJpZCI6IjI1NTc0MjY5NTIxOToxM0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSUtLeFBnSEVOcUE3Yk1HR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoicVJnb0tHemE1Um9qYUgyTHhZZGFtQkZlaTZ2ZGpULzFMdkRIamdwcGUyaz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZjZEVXI0SXZPN2owWkpBY29aemtJckVsQzhWY0tBajdKT3lvcG9KVEdaMkd3WFZHaWRQK1JVUytYWUhHYmRSL0J4QkxzSXplbDFSR2o5U0xGWG9kQkE9PSIsImRldmljZVNpZ25hdHVyZSI6IkZsWjZkb2Mrb1Fjc1lKYkNIT0VjVWRrQkh3Tk9nR3BBaTYwejFGWkZoTFBLRWU3eUJzYXd3OW5GV0JrbS9PeFY4R2hjdkNNa1V3VjRkL2NoaWloaEF3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU1NzQyNjk1MjE5OjEzQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmFrWUtDaHMydVVhSTJoOWk4V0hXcGdSWG91cjNZMC85Uzd3eDQ0S2FYdHAifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MTkzNTM0NDcsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBUFU5In0=',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Raphaa",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "+255 742 695 219",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'HUNCHO MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e18441d126f37be8efbfa.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
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
