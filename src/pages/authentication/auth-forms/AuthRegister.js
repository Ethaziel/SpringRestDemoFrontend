import React, {useEffect, useState} from 'react';
import {
  Button,
  Container,
  TextField,
  MenuItem, 
  Typography,
  Box, 
} from "@mui/material";
import { fetchPostData } from 'client/client';
import { useNavigate } from 'react-router-dom';


const AuthRegister = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",           // NEW
    job: "",            // NEW
    age: "",            // NEW
    personalInfo: "",   // NEW
    male: true,         // NEW (default male)
  });
  /* const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); */
  const [errors, setErrors] = useState({ email: '', password: ''});
  const [registerError, setRegisterError] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const isLoggedIn = localStorage.getItem('token');
    if (isLoggedIn){
      navigate('/');
      window.location.reload();
    }
  }, []);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(formData.email);
  };

  const validatePassword = () => {
    return formData.password.length >= 6 && formData.password.length <= 15;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const handleRegister = async () => {
    // reset previous errors
    setErrors({email: '', password: ''});

    // validation
    if (!validateEmail()){
      setErrors((prevErrors) => ({...prevErrors, email: 'Invalid email'}));
      return;
    }
    if (!validatePassword()){
      setErrors((prevErrors) => ({...prevErrors, password: 'Password must be 6-15 characters long'}));
      return;
    }

    // login logic here
    fetchPostData("/auth/users/add", formData)
      .then(() => {
        setRegisterError('');
        navigate('/login'); // relocates to home page
        window.location.reload();
      }) .catch((error) => {
        console.error('Login error: ', error);
        setRegisterError("An error occurred during registration");
      });


    

  }

    return (
      <Container component="main" maxWidth="xs">
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}> 
          <TextField
            label="Email"
            name="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          
          <TextField
            label="Name"
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            label="Job"
            name="job"
            fullWidth
            value={formData.job}
            onChange={handleChange}
          />
          <TextField
            label="Age"
            name="age"
            type="number"
            fullWidth
            value={formData.age}
            onChange={handleChange}
          />
          <TextField
            label="Personal Info"
            name="personalInfo"
            fullWidth
            multiline
            minRows={3}
            value={formData.personalInfo}
            onChange={handleChange}
          />
          <TextField
            select
            label="Gender"
            name="male"
            fullWidth
            value={formData.male}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                male: e.target.value === "true",
              }))
            }
          >
            <MenuItem value={"true"}>Male</MenuItem>
            <MenuItem value={"false"}>Female</MenuItem>
          </TextField>

          <Button variant="contained" color="primary" onClick={handleRegister}>
            Register
          </Button>
          {registerError && (
            <Typography color="error">{registerError}</Typography> 
          )}
        </Box>
      </Container>
    );
};

export default AuthRegister;
