import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database";

const defaultMigrationOptions = {
  dryRun: true, // dryRun eh uma opcao que permite executar as migracoes sem realmente aplicá-las no banco de dados. Ele apenas simula a execucao das migracoes e retorna o resultado, sem modificar o estado do banco de dados
  dir: resolve("infra", "migrations"), // dir eh uma opcao que especifica o caminho para o diretorio onde estao os arquivos de migracao. Ele deve ser um caminho relativo ao arquivo que esta executando o migrationRunner
  direction: "up", // direction eh uma opcao que indica a direcao das migracoes a serem executadas. Ele pode ser "up" para aplicar as migracoes ou "down" para reverter as migracoes
  verbose: true, // verbose eh uma opcao que habilita a exibicao de mensagens detalhadas sobre a execucao das migracoes. Ele mostra informacoes sobre cada migracao, como o nome do arquivo, o status da execucao e o tempo gasto
  migrationsTable: "pgmigrations", // migrationsTable eh uma opcao que define o nome da tabela que sera usada para registrar o historico das migracoes aplicadas. Ele deve ser um nome de tabela valido no banco de dados
};

async function listPendingMigrations() {
  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const pendingMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dbClient, // dbClient eh uma variavel que representa a conexao com o banco de dados Postgres. Ele eh necessario para que o migrationRunner possa executar as migracoes no banco de dados correto
    });
    return pendingMigrations;
  } finally {
    await dbClient?.end();
  }
}

async function runPendingMigrations() {
  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const migratedMigrations = await migrationRunner({
      ...defaultMigrationOptions, //utilizando o spread operator para passar as opcoes de migracao como argumentos separados para a funcao migrationRunner. Isso permite que a funcao receba cada opcao individualmente, em vez de receber um objeto com todas as opcoes.
      dbClient, // dbClient eh uma variavel que representa a conexao com o banco de dados Postgres. Ele eh necessario para que o migrationRunner possa executar as migracoes no banco de dados correto
      dryRun: false, // dryRun eh uma opcao que permite executar as migracoes sem realmente aplicá-las no banco de dados. Ele apenas simula a execucao das migracoes e retorna o resultado, sem modificar o estado do banco de dados
    });

    return migratedMigrations;
  } finally {
    await dbClient?.end();
  }
}

const migrator = {
  listPendingMigrations,
  runPendingMigrations,
};

export default migrator;
