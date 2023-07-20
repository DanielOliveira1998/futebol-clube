import { ILogin } from '../../Interfaces/ILogin'

const validLogin: ILogin = {
  email: 'valid@email.com',
  password: 'valid-password',
}

const invalidLogin: ILogin = {
  email: 'invalid.email.com',
  password: 'valid-password'
}

const invalidPassword: ILogin = {
  email: 'invalid@email.com',
  password: 'deny'
}

export {
  validLogin,
  invalidLogin,
  invalidPassword,
}