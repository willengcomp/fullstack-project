test("GET to api/v1/status should return 200", async () => {
  // await soh funciona com funcao assincrona -> async
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
});
