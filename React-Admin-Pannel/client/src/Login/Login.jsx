import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormControl } from '@mui/base';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  //used for redirect to another component

// TODO remove, this demo shouldn't need to reset the theme.




export default function Login() {
  const defaultTheme = useTheme();
  const navigate = useNavigate() //used for redirect to another component\
  
  const initialValues={
    email:"",
    password:""
  }

  const loginFormSchema = Yup.object().shape({
    
    email: Yup.string()
      .email('Invalid email address')
      .required('Please enter your email'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Please enter your password'),
  
  });
  

  const handleSubmit=(values)=>{
    
console.log(values)
    axios({
      method: 'post',
      url: 'http://localhost:5000/user/login',
      data: values
    }
    )
    .then(function (response) {
      console.log("data",response)
      // handle success
      console.log(response.data[0].token);
      localStorage.setItem("token", response.data[0].token);
    // console.log(userData.data[0].title);
    navigate('/')
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginFormSchema,
    onSubmit: handleSubmit, // Handle form submission
  });

  
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <FormControl onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form"  noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                 { formik.errors.email && formik.touched.email ? (<p style={{color:"red"}} className='for-error'>{formik.errors.email}</p>):null}
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  
                />
                 {formik.errors.password && formik.touched.password ? (<p style={{color:"red"}} className='for-error'>{formik.errors.password}</p>):null}
            <FormControlLabel
              control={<Checkbox value="remember" color="secondary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
             
                <Link href="#"   variant="body2" color="secondary">
                  Forgot password?
                </Link>
              
              </Grid>
              <Grid item>
                <Link href="/Registration" variant="body2" color="secondary">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        </FormControl>
      </Container>
    </ThemeProvider>
  );
}