function defineEnvironment() {
  if (process.env.NODE_ENV == 'production')  {
    return "https://door-monitoring.herokuapp.com/";
  }
  else {
    return "http://localhost:3000";
  }
}
export const api_url = defineEnvironment();