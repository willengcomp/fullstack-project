export class InternalServerError extends Error {
  constructor({ cause , statusCode}) {
    super("Um erro interno ocorreu no servidor.", {
      cause,
    });
    this.name = "InternalServerError";
    this.action = "entre em contato com o administrador";
    this.statusCode = statusCode || 500;
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

export class ServiceError extends Error {
  constructor({ cause, message }) {
    super(message || "Serviço indisponível no momento.", {
      cause,
    });
    this.name = "ServiceError";
    this.action = "Verifique se o serviço está disponível.";
    this.statusCode = 503;
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


export class MethodNotAllowedError extends Error {
  constructor() {
    super("Método não permitido para este endpoint.");
    this.name = "Method Not Allowed";
    this.action = "Verifique se o método HTTP utilizado é o válido para este endpoint.";
    this.statusCode = 405;
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

