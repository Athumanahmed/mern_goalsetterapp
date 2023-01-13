import React from 'react'
import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import {useSelector , useDispatch} from "react-redux"
import{useNavigate} from "react-router-dom"
import {toast} from "react-toastify" 
import Spinner from '../components/Spinner'
import  {register ,  reset} from "../features/auth/authSlice"
const Register = () => {

  // initial form state.......
  const [formData , setFormData] = useState({
    name:"",
    email:"",
    password:"",
    password2:"",
  })

  // dstructuring fields from the form 
  const { name , email, password , password2} = formData
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading ,isError,isSuccess,message} = useSelector((state) => state.auth)


useEffect(() => {
if(isError){
  toast.error(message)
}

if(isSuccess || user){
  navigate('/')
}

dispatch(reset())

},[user, isError, isSuccess,message,navigate,dispatch])

  // onchange function
  const onChange = (e) => {
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.name]:e.target.value,
    }))
  };

  // for submit function
  const onSubmit = (e) =>{
    e.preventDefault()

    // checking for password match
    if(password !== password2){
      toast.error("Sorry! Passwords do not match")
    }else{
      const userData = {
        name, 
        email,
        password,
      }
      dispatch(register(userData))
    }
  }

  if(isLoading){
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
      <h4>
        <FaUser /> Register
      </h4>
      <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
          <input type="text" className="form-control" 
          id='name' name='name' value={name} placeholder="Enter your name"
          onChange={onChange}/>
          </div>
          <div className="form-group">
          <input type="email" className="form-control" 
          id='email' name='email' value={email} placeholder="Enter your email"
          onChange={onChange}/>
          </div>
          <div className="form-group">
          <input type="password" className="form-control" 
          id='password' name='password' value={password} placeholder="Enter password"
          onChange={onChange}/>
          </div>
          <div className="form-group">
          <input type="password" className="form-control" 
          id='password2' name='password2' value={password2} placeholder="Confirm  password"
          onChange={onChange}/>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">Create Account</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register
