import { useFormik } from 'formik';
import * as Yup from 'yup'
import React from 'react'
import "./login.css"
import { FormHelperText, TextField, Typography } from '@mui/material';
import useAuth from '../../hook/useAuth';
import {Link} from "react-router-dom"



const Login = () => {
  return (
    <LoginForm />
  );
};


const LoginForm = () => {

  return (
    <div id="loginform">
      <FormHeader title="Login" />
      <Form />
      <OtherMethods />
    </div>
  )
}

const FormHeader = props => (
  <h2 id="headerTitle">{props.title}</h2>
);


const Form = () => {
  const { login } = useAuth()
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required()
  })
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      await login(values)
    }
  })
  const { getFieldProps, values, errors, touched, handleSubmit } = formik
  return (
    <form onSubmit={handleSubmit}> 
      <FormInput
        description="email"
        placeholder="Enter your email"
        type="text"
        name="email"
        error={Boolean(touched.email && errors.email)}
        helperText={touched.email && errors.email}
        {...getFieldProps('email')}
      />
      <FormInput
        description="Password"
        placeholder="Enter your password"
        type="password"
        error={Boolean(touched.password && errors.password)}
        helperText={touched.password && errors.password}
        {...getFieldProps('password')} />
      <FormButton title="Login" type='submit' />
      <Link className='row' to={'./register'}>dont have account ? Signup</Link>

    </form>
  );
};

const FormButton = props => (
  <div id="button" class="row">
    <button type={props.type}>{props.title}</button>
  </div>
);

const FormInput = ({ placeholder, type, description, error, touched, helperText, name, ...props }) => (
  <div class="row">
    <label>{description}</label>
    <input type={type} name={name} placeholder={placeholder}{...props} />
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

export default Login