import React from 'react'

const Form = (props) => {
    
  return (
    <div>
      <div className='flex w-full justify-center items-center flex-col sm:flex-row gap-4'>
        <div className='order-2 sm:order-1 w-full'>
            <div className='text-3xl font-bold mb-2'> {props.header} </div>
            <p className=' text-gray-400'> Please {props.title} in to continue</p>
        </div>
        <img src='../assets/login/user.png' className='h-[80px] w-[80px] order-1 sm:order-2' alt=''/>
      </div>
    </div>
  )
}

export default Form