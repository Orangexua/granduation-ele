const moment = require("moment");

module.exports = {
  formatDateTime(time) {
    return moment(time).format("YYYY-MM-DD hh:mm:ss");
  },
  formatDate(date) {
    return moment(date).format("YYYY-MM-DD");
  }
};
