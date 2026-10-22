export class InternalServerError extends Error {
  constructor({ cause }) {
    super("Um erro interno ocorreu no servidor.", {
      cause,
    });
    this.name = "InternalServerError";
    this.action = "entre em contato com o administrador";
    this.statusCode = 500;
  }
  //declaracao de um metodo que diz o que sera feito caso o objeto seja transformado para JSON
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      statusCode: this.statusCode,
    };
  }
}
