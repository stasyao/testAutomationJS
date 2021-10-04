export default class Logger {
    /**
     * Logs a message
     * @param {string} message The message to write in console
     */
    static info(message) {
      const msg = `[INFO] ${new Date().toLocaleTimeString()} : ${message}`;
      console.log(msg);
    }
  
    /**
     * Logs a error
     * @param {string} message The message to write in console
     */
    static error(message) {
      const msg = `[ERROR] ${new Date().toLocaleTimeString()} : ${message}`;
      console.log(msg);
    }
  };