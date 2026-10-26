import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});
describe("POST /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving current system status", async () => {
      // await soh funciona com funcao assincrona -> async
      const response = await fetch("http://localhost:3000/api/v1/status", {
        method: "POST",
      });
      
      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "Method Not Allowed", 
        message: "Método não permitido para este endpoint.",
        action: "Verifique se o método HTTP utilizado é o válido para este endpoint.",
        statusCode: 405,
      })
    });
  });
});
