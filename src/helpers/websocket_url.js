function defineEnvironment() {
  if (process.env.NODE_ENV == 'production')  {
    return "ws://door-monitoring.herokuapp.com";
  }
  else {
    return "ws://localhost:3000";
  }
}
export const websocket_url = defineEnvironment();