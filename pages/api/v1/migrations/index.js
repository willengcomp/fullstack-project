import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

export default async function status(request, response) {
  const dbClient = await database.getNewClient();

  const defaultMigrationOptions = {
    dbClient: dbClient, // dbClient eh uma variavel que representa a conexao com o banco de dados Postgres. Ele eh usado para executar as migracoes e registrar o historico das migracoes aplicadas
    dryRun: true, // dryRun eh uma opcao que permite executar as migracoes sem realmente aplicá-las no banco de dados. Ele apenas simula a execucao das migracoes e retorna o resultado, sem modificar o estado do banco de dados
    dir: join("infra", "migrations"), // dir eh uma opcao que especifica o caminho para o diretorio onde estao os arquivos de migracao. Ele deve ser um caminho relativo ao arquivo que esta executando o migrationRunner
    direction: "up", // direction eh uma opcao que indica a direcao das migracoes a serem executadas. Ele pode ser "up" para aplicar as migracoes ou "down" para reverter as migracoes
    verbose: true, // verbose eh uma opcao que habilita a exibicao de mensagens detalhadas sobre a execucao das migracoes. Ele mostra informacoes sobre cada migracao, como o nome do arquivo, o status da execucao e o tempo gasto
    migrationsTable: "pgmigrations", // migrationsTable eh uma opcao que define o nome da tabela que sera usada para registrar o historico das migracoes aplicadas. Ele deve ser um nome de tabela valido no banco de dados
  };

  if (request.method === "GET") {
    console.log("GET request received");
    //migrationRunner eh uma variavel que eh um cliente do node-pg-migrate, que eh uma biblioteca para gerenciar migracoes de banco de dados no Postgres. Ele permite executar scripts de migracao, criar e atualizar tabelas, colunas e outros objetos do banco de dados de forma programatica
    const pendingMigrations = await migrationRunner(defaultMigrationOptions);
    await dbClient.end(); // fechando a conexao com o banco de dados apos a execucao das migracoes
    return response.status(200).json(pendingMigrations);
  }

  if (request.method === "POST") {
    console.log("POST request received");
    //migrationRunner eh uma variavel que eh um cliente do node-pg-migrate, que eh uma biblioteca para gerenciar migracoes de banco de dados no Postgres. Ele permite executar scripts de migracao, criar e atualizar tabelas, colunas e outros objetos do banco de dados de forma programatica
    const migratedMigrations = await migrationRunner({
      ...defaultMigrationOptions, //utilizando o spread operator para passar as opcoes de migracao como argumentos separados para a funcao migrationRunner. Isso permite que a funcao receba cada opcao individualmente, em vez de receber um objeto com todas as opcoes.
      dryRun: false, // dryRun eh uma opcao que permite executar as migracoes sem realmente aplicá-las no banco de dados. Ele apenas simula a execucao das migracoes e retorna o resultado, sem modificar o estado do banco de dados
    });

    await dbClient.end(); // fechando a conexao com o banco de dados apos a execucao das migracoes

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }

    return response.status(200).json(migratedMigrations);
  }

  return response.status(405).json({ message: "Method not allowed" }).end();
}
