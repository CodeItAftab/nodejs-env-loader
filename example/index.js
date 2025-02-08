const { load } = require("nodejs-env");

const result = load();
console.log(result); // Check if .env file was loaded successfully
console.log(process.env.URL); // Check loaded environment variables
console.log(process.env.MY_KEY); // Check loaded environment variables
