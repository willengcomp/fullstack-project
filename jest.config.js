//arquivo que especifica caracteristicas novas para o jest
const dotEnv = require("dotenv");
dotEnv.config({
  path: ".env.development",
}); //carrega variaveis de ambiente do arquivo .env.test

const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: ".",
});
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
});

module.exports = jestConfig;
