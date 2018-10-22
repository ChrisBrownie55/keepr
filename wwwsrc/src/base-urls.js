const baseURL = process.env.NODE_ENV === 'production'
  ? '//keepr1.herokuapp.com/'
  : '//localhost:5000/'

export default {
  accountURL: baseURL + 'account/',
  authenticateURL: baseURL + 'account/authenticate/',
  vaultsURL: baseURL + 'api/vaults/',
  keepsURL: baseURL + 'api/keeps/'
}