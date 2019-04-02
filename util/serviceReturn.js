const serviceReturn = (status, msg, data) => {
  return JSON.stringify({status, msg, data});
};

module.exports.serviceReturn = serviceReturn;