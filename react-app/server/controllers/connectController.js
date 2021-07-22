// const connectController = {};
const { Kafka } = require('kafkajs');

module.exports = {
  
  checkConnection : async (req, res, next) => {
    const { username, password, broker } = req.body;
  
    const sasl = username && password ? { username, password, mechanism: 'plain' } : null;
    const ssl = !!sasl;
  
    res.locals.connected = false;
  
    // console.log("In connect controller");
  
    try {
      const kafka = new Kafka({
        clientId: 'kafkaSentinel',
        brokers: [`${broker}`],
        ssl,
        sasl
      })

      const admin = kafka.admin()
      await admin.connect()
      await admin.listTopics()
      await admin.disconnect()
      

    }catch(err) {
      return next();
    }
    
    res.locals.connected = true;
    return next();
  }
}



// module.exports = connectController;