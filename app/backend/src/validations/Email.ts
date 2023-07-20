export default class Email {
  private static _emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  static validate(email: string):boolean {
    return Email._emailRegex.test(email);
  }
}
