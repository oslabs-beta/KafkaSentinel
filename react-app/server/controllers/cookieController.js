const cookieController = {};

cookieController.createCookie = (req, res, next) => {
  const { username, password, broker } = req.body;

  if(res.locals.connected == true) {
    res.cookie('username', username);
    res.cookie('password', password);
    res.cookie('broker', broker);
  }

  next();  
}

cookieController.checkCookie = (req,res,next) => {
  console.log("checkCookie time");
  const username = req.cookies.username;
  const password = req.cookies.password;
  const broker = req.cookies.broker;

  req.body.username = username;
  req.body.password = password;
  req.body.broker = broker;

  next();
}

module.exports = cookieController;