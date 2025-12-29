import databese from "../../../../infra/database.js";

async function status(request, response) {
  const result = await databese.query("SELECT 1 + 1 as sum;");
  console.log(result.rows);
  response.status(200).json({ chave: "it's working" });
}

export default status;
