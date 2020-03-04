const crypto = require("crypto");
const nodemailer = require("nodemailer");
const db = require("../models/index.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  createNewUser: (req, res) => {
    console.log("Controller reached");
    console.log(req.isAuthenticated());
    console.log(req.body);

    const userData = req.body.vals; // grab onto the new user array of values
    console.log("userData");
    console.log(userData);
    bcrypt.hash(userData[3], saltRounds, (err, hash) => {
      if (err) {
        console.error(err);
      }
      // use the index of the password value to pass to bcrypt
      // Store hash in your password DB.
      userData[3] = hash; // replace plain text password with hash
      console.log(userData);
      db.User.insertOne(userData, result => {
        // save new user with hashed password to database
        res.status(200).json({ id: result.insertId });
      });
    });
  },
  getAllUsers: (req, res) => {
    db.User.selectAll(data => {
      res.status(200).json(data);
    });
  },
  getUserById: (req, res) => {
    console.log(req.isAuthenticated());
    db.User.selectOneById(req.params.id, data => {
      res.status(200).json(data);
    });
  },
  updateUserById: (req, res) => {
    console.log(req.isAuthenticated());
    const userData = req.body.vals; // grab onto the new user array of values
    bcrypt.hash(userData[1], saltRounds, (err, hash) => {
      if (err) {
        console.error(err);
      }
      // use the index of the password value to pass to bcrypt
      userData[1] = hash; // replace plain text password with hash
      console.log(userData);
      db.User.updateOne(userData, req.params.id, result => {
        if (result.changedRows === 0) {
          res.status(204).end();
        } else {
          res.status(200).end();
        }
      });
    });
  },
  deleteUserById: (req, res) => {
    console.log(req.isAuthenticated());
    db.User.deleteOne(req.params.id, data => {
      res.status(200).json(data);
    });
  },
  getUniqueValues: (req, res) => {
    console.log("Unique called");
    db.User.selectUnique(data => {
      res.status(200).json(data);
    });
  },
  updateTicketnumber: (req, res) => {
    const ticketData = req.body.vals;
    console.log(ticketData);
    db.User.updateTicketnumber(ticketData, result => {
      res.status(200).json(result);
    });
  },
  forgotPassword: (req, res) => {
    const email = req.body.vals;
    const expires = Date.now() + 36000;
    const token = crypto.randomBytes(20).toString("hex");
    const data = [token, expires, email];
    db.User.setResetPassword(data, result => {
      if (result.affectedRows) {
        const transporter = nodemailer.createTransport({
          host: "smtp.zoho.eu",
          port: 465,
          secure: true, //ssl
          auth: {
            user: process.env.RESET_PW_EMAIL,
            pass: process.env.RESET_PW_PW
          }
        });

        const mailOptions = {
          from: "Cactus Password Reset <resetpassword@cactusweb.dev>",
          to: email,
          subject: "Reset your miatzy database password",
          text:
            `Click the following link or paste it in your browser to reset your password. \n \n` +
            `http://miatzy-website.herokuapp.com/resetpassword/${token} \n \n` +
            `If you did not request to reset your password, you can ignore this email and your password will remain unchanged. \n`
        };

        transporter.sendMail(mailOptions, function(err, response) {
          if (err) throw err;
          console.log(response);
          res.send(res);
        });
      }
      res.status(200).json(result);
    });
  },
  getUserByToken: (req, res) => {
    db.User.getUserByToken(req.params.token, data => {
      res.status(200).json(data);
    });
  },
  resetPassword: (req, res) => {
    const vals = req.body.vals;
    bcrypt.hash(vals[0], saltRounds, (err, hash) => {
      if (err) {
        console.error(err);
      }
      vals[0] = hash;
      db.User.resetPassword(vals, data => {
        res.status(200).json(data);
      });
    });
  }
};
