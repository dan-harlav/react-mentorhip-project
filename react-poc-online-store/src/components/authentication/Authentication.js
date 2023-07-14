import { useNavigate } from 'react-router-dom';
import { useState, useContext } from "react";
import axios from "axios";

import { UserContext } from "../../context/UserContextProvider";

import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import './Authentication.css';

const URL = process.env.REACT_APP_API_URL;

const Authentication = () => {
  const navigate = useNavigate();
  const { setCurrentUser, isRegistered, setIsRegistered } = useContext(UserContext);

  const [formFields, setFormFields] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
});
  const { name, email, password, confirmPassword } = formFields;
  // const [error, setError] = useState("");

  const API = axios.create({
    baseURL: `${URL}`,
    withCredentials: true,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value })
};

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        alert("password do not match");
        return;
    }
    try {
      await API.post("/sign-up", {
        name,
        email,
        password
      }).then((res) => {
        if (res?.data) {
          setFormFields({
              name: '',
              confirmPassword: ''
          });
          setIsRegistered(true);
        } else {
          alert("Something when wrong");
        }
      });
    } catch (err) {
      if (err?.response.status === 400 && err?.response?.data.message === 'User is already registered.') {
        setFormFields({
          email: '',
          password: ''
      });
        setIsRegistered(true);
      } else {
        alert(`Error occured: ${err.response.status}`);
      }
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/sign-in", {
        email,
        password,
      }).then((res) => {
        if (res?.data) {
          setFormFields({
            email: '',
            password: ''
        });
          setCurrentUser(res.data)
          navigate('/products');
        } else {
          alert("Something when wrong");
        }
      });
    } catch (err) {
      if (err?.response.status === 404 && err?.response?.data.message.contains('User email is not found')) {
        setFormFields({
          email: '',
          password: ''
      });
        setIsRegistered(false);
      } else {
        alert(`Error occured: ${err.message}`);
      }
    }
  };

  return (
    <div className="authentication-container">
      {!isRegistered ?
        (<div className="sing-up-container">
            <h2>Sing up</h2>
            <form onSubmit={handleRegisterSubmit}>
              <FormControl>
                <TextField label="Name" type="text" required placeholder="Name" name="name" onChange={handleChange} value={name}/>
                <TextField label="Email" type="email" required placeholder="Email" name="email" onChange={handleChange} value={email}/>
                <TextField label="Password" type="password" required placeholder="Password" name="password" onChange={handleChange} value={password}/>
                <TextField label="Confirm Password" type="password" required  placeholder="Confirm Password" name="confirmPassword" onChange={handleChange} value={confirmPassword}/>

                <Button type="submit">Sign up</Button>
              </FormControl>
            </form>
        </div>):
          (<div className="sing-in-container">
          <h2>Sing in</h2>
          <form onSubmit={handleLoginSubmit}>
            <FormControl>
              <TextField label="Email" type="email" required placeholder="Email" name="email" onChange={handleChange} value={email}/>
              <TextField label="Password" type="password" required placeholder="Password" name="password" onChange={handleChange} value={password}/>

              <Button type="submit">Sign in</Button>
            </FormControl>
          </form>
      </div>)
      }   
    </div>
  );
};

export default Authentication;