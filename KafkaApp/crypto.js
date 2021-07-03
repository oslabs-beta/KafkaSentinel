const crypto = require('crypto')
const hmac = crypto.createHmac('sha256', 'YOUR_SECRET').update('REQUEST_BODY').digest('hex')
const signature = `sha256=${hmac}`
console.log(signature);