import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import LocationPicker from './LocationPicker'
import Test from './Test'

const MerchantRegister = () => {

    const RegisterForm = {
        maxWidth: "500px",
        padding: "15px",
        margin: "auto",
        marginTop: "50px",
      };
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [phone, setPhone] = useState("");
      const [city, setCity] = useState("");
      const [state, setState] = useState("");
      const [pincode, setPincode] = useState("");
      const [address, setAddress] = useState("");
      const [latitude, setLatitude] = useState("");
      const [longitude, setLongitude] = useState("");

      const [merchant, setMerchant] = useState({
        name: "",
        email: "",
        phone:"",
        city:"",
        state:"",
        pincode:"",
        address:"",
        latitude:"",
        longitude:"",
      });

      const [lng, setLng] = useState("");
      const [lat, setLat] = useState("");
      
      const abcd  = (coordinates) => {
        console.log(coordinates)
        setLatitude(coordinates.lat);
        setLongitude(coordinates.lng);
      } 
    
      const onChange1 = (e) =>{
          setName(e.target.value);
      }
      const onChange2 = (e) =>{
        setEmail(e.target.value);
    }
    const onChange3 = (e) =>{
      setPhone(e.target.value);
  }
  const onChange4 = (e) =>{
    setCity(e.target.value);
}
const onChange5 = (e) =>{
  setState(e.target.value);
}
const onChange6 = (e) =>{
  setPincode(e.target.value);
}
 
const onChange7 = (e) =>{
  setAddress(e.target.value);
}
    
      // useEffect(_=>console.log('useeffect mer', merchant), [merchant])
      const onSubmit = async (e) => {
        e.preventDefault();
        //console.log(merchant)
        
        setMerchant({name: name, email: email, phone: phone, city: city, state: state, pincode: pincode, address: address, latitude: latitude, longitude: longitude})
        console.log(merchant)
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          try {
            const res = await axios.post(
              "http://localhost:5000/api/merchant/register",
              merchant,
              config
            );
            console.log(res);
          } catch (err) {
            console.log(err);
          }
        }

    return (
        <div style={RegisterForm}>
          <h1 style={{ textAlign: "center" }}>
            Merchant <span className="text-primary">Register</span>
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                class="form-control"
                type="text"
                name="name"
                value={name}
                onChange={onChange1}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                class="form-control"
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={onChange2}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Contact Number</label>
              <input
                class="form-control"
                id="phone"
                type="text"
                name="phone"
                value={phone}
                onChange={onChange3}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                class="form-control"
                id="city"
                type="text"
                name="city"
                value={city}
                onChange={onChange4}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                class="form-control"
                id="state"
                type="text"
                name="state"
                value={state}
                onChange={onChange5}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="pincode">Pincode</label>
              <input
                class="form-control"
                id="pincode"
                type="text"
                name="pincode"
                value={pincode }
                onChange={onChange6}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                class="form-control"
                id="address"
                type="text"
                name="address"
                value={address}
                onChange={onChange7}
                required
              />
            </div>
            
            
            <button type="submit" className="btn btn-primary mt-3" value="Register">
              Register
            </button>
          </form>

          {/* Map Location Picker
          */}
          {/* <LocationPicker latitude = {latitude} longitude = {longitude}/> */}
          <Test abcd={abcd}/>
        </div>
      );
}

export default MerchantRegister

