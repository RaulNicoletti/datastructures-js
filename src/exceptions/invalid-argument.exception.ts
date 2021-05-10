export class InvalidArgumentException extends Error {
  constructor(message?: string) {
    super();
    this.message = message || 'Invalid argument type';
    this.stack = new Error().stack;
    this.name = 'InvalidArgumentException';
  }
}
