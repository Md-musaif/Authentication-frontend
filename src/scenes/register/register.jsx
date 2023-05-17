import { useFormik } from 'formik';
import * as Yup from 'yup'
import React from 'react'
import "./register.css"
import { FormHelperText, TextField, Typography } from '@mui/material';
import useAuth from '../../hook/useAuth';
import {Link} from "react-router-dom"


const Register = () => {
  return (
    <SignupForm />
  );
};


const SignupForm = () => {

  return (
    <div id="loginform">
      <FormHeader title="Signup" />
      <Form />
      <OtherMethods />
    </div>
  )
}

const FormHeader = props => (
  <h2 id="headerTitle">{props.title}</h2>
);


const Form = () => {
  const { register } = useAuth()
  const LoginSchema = Yup.object().shape({
    username: Yup.string().email().required(),
    password: Yup.string().required()
  })
  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      await register(values)
    }
  })
  const { getFieldProps, values, errors, touched, handleSubmit } = formik
  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        description="Username"
        placeholder="Enter your username"
        type="text"
        name="username"
        error={Boolean(touched.username && errors.username)}
        helperText={touched.username && errors.username}
        {...getFieldProps('username')}
      />
      
      <FormInput
        description="Password"
        placeholder="Enter your password"
        type="password"
        error={Boolean(touched.password && errors.password)}
        helperText={touched.password && errors.password}
        {...getFieldProps('password')} />
      <FormButton title="Signup" type='submit' />
      <Link className='row' to={'/'}>Login</Link>
      
    </form>
  );
};

const FormLink = props => (
  <div class="row">
  </div>
);
const FormButton = props => (
  <div id="button" class="row">
    <button type={props.type}>{props.title}</button>
  </div>
);

const FormInput = ({ placeholder, type, description, error, touched, helperText, name, ...props }) => (
  <div class="row">
    <label>{description}</label>
    <input type={type} name={name} placeholder={placeholder}{...props} />
    {/* <Link to={'./register'}>Register</Link> */}

    
    
    <FormHelperText error={error}>
      <Typography>
        {helperText}
      </Typography>
    </FormHelperText>
  </div>
);

const OtherMethods = props => (
  <div id="alternativeLogin">
    {/* <label>Or sign in with:</label> */}
    <div id="iconGroup">
      <Facebook />
      <Twitter />
      <Google />
    </div>
  </div>
);

const Facebook = props => (
  <a href="#" id="facebookIcon"></a>
);

const Twitter = props => (
  <a href="#" id="twitterIcon"></a>
);

const Google = props => (
  <a href="#" id="googleIcon"></a>
);

// ReactDOM.render(<App />, document.getElementById('container'));

export default Register