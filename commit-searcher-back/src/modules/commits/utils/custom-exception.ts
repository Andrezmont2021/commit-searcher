export class CustomException {
  message: string;
  status: string;
  constructor(message: string, status: string) {
    this.message = message;
    this.status = status;
  }
}
