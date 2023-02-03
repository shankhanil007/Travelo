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

    console.log("Hello");

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
