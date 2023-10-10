class Error {
  constructor(message) {
    this.message = message;
    this.name = 'Error'; // (name은 내장 에러 클래스마다 다릅니다.)
    // this.stack = <call stack>;  // stack은 표준은 아니지만, 대다수 환경이 지원합니다.
  }
  2;
}

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = 400;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = 401;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = 403;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = 409;
  }
}

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InternalServerError';
    this.statusCode = 500;
  }
}

module.exports = {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  InternalServerError,
};
