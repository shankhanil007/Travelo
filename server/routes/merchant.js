const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../models/Merchant");
const Merchant = require("../models/Merchant");

router.post(
  "/register",
  [
    check("name", "Please add name").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      phone,
      city,
      state,
      pincode,
      address,
      latitude,
      longitude,
    } = req.body;

    try {
      let merchant = await Merchant.findOne({ email });

      if (merchant) {
        return res.status(400).json({ msg: "Merchant already exists" });
      }

      merchant = new Merchant({
        name,
        email,
        phone,
        city,
        state,
        pincode,
        address,
        latitude,
        longitude,
      });

      await merchant.save();
      const accountSid = 'AC1ad9e53e42e2ead3aeed5a46c917309c'; 
      const authToken = '55ec81f90ec34777133c6aa6e87f4f44'; 
      const client = require('twilio')(accountSid, authToken); 
       
      client.messages 
            .create({   
              body: 'Hey, Your business is registered. You can find yourself on: ',      
              from: 'whatsapp:+14155238886',
               to: 'whatsapp:+917990630623',
             }) 
            .then(message => console.log(message.sid)) 
            .done();
      

      return res.status(200).json({ msg: "Merchant Registered successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/:city/getmerchants", async (req, res) => {
  try {
    const details = await Merchant.find({ city: req.params.city });
    res.json(details);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
