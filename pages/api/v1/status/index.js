function status(request, response) {
  response.status(200).json({ chave: "it's working" });
}

export default status;
