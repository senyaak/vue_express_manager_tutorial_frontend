export default class Config {
  static get BudgetManagerAPI() {
    return `http://${window.location.hostname}:3001`;
  }
}
