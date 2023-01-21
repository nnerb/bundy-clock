import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormDataContext, useFormDataUpdateContext, useHandleChangeContext } from '../Contexts/FormContext'

import Form from './Form'

/* Google button */
import GoogleButton from 'react-google-button'
import { UserAuth } from '../Contexts/AuthContext'

/* Loading */
import { ThreeDots } from 'react-loader-spinner'


const Login = () => {

  const {googleSignIn, user } = UserAuth()

  const navigate = useNavigate()

  const handleGoogleSignIn = async () => {
    try{
      
      await googleSignIn()
    }
    catch(err){ 
      console.log(err)
    }
  }

  useEffect(() => {
      if(user != null){
          navigate('/employee')
      }
  },[user])
  // const currentUser = useAuth()

  // const navigate = useNavigate()

  // useEffect(() => {
  //   if(currentUser?.email){
  //     navigate('/employee')
  //     return
  //   }    
  // },[currentUser])

    const [isValid, setIsValid] = useState(null)
    const [employee, setEmployee] = useState([])

    const formData = useFormDataContext()
    const setFormData = useFormDataUpdateContext()
    const handleChange = useHandleChangeContext()

  return (
   <div className='grid place-items-center px-4 h-screen'>
    { user === null ? (
      <div className='max-w-[400px] mx-4 flex justify-center flex-col
        w-full border-solid border-[1px] bg-white rounded border-gray-300 p-8 shadow-md'
        >
            <form autoComplete='off' className='flex flex-col gap-4'>
              <Form header="Login" title="sign in" formData={formData} handleChange={handleChange} email={formData.username} password={formData.password}/>
                <div className='flex flex-col gap-4'>
                  <GoogleButton onClick={handleGoogleSignIn} style={{width: "100%", overflow: "hidden"}}/>
                </div>
            </form>  
        </div>
        ) : (
          <div className='w-screen h-screen grid place-items-center'>
            <ThreeDots color='white' ariaLabel='loading' />
          </div>
          
    )
       
    }
   
   </div>   
  )
}
export default Login