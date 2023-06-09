
const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  try {
    let token = req.headers["x-auth-token"];

    if (!token) {
      return res
        .status(400)
        .send({ status: false, message: "Token not present" });
    }
    // console.log(token[1])

    jwt.verify(token, "SecreateKey", async function (err, decoded) {
    
      if (err)
     
        return res.status(401).send({ status: false, message: err.message });
      else {
        req.userId = decoded.userId; // storing in req object now can use in any module of this project 

        next(); 
      }
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { authentication }; 
