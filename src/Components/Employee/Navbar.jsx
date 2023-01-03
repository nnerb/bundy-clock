import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../../Contexts/AuthContext'

const Navbar = () => {

    const {user, googleSignOut} = UserAuth()

    const [isHover, setIsHover] = useState(false)

    const navigate = useNavigate()

    const handleSignOut = async () => {
      try{
        await googleSignOut()
        navigate('/')
      }
      catch(err){
        console.log(err)
      }
    }
  return (
    <div className='navbar bg-violet-800 py-4 px-4 w-full flex items-center fixed z-50'>
        <h1 className='font-bold text-2xl text-white'> Bundy Clock </h1>
       <div className='ml-auto flex items-center gap-4 relative'>
            <img src={user?.photoURL} className='rounded-full h-[40px] w-[40px]' onMouseOver={()=>setIsHover(true)} onMouseOut={()=>setIsHover(false)} alt=''/>
           { isHover && <p className='absolute bottom-[-50%] translate-y-[50%] translate-x-[-35%] rounded text-black text-sm w-[150px] text-center bg-gray-400'> {user?.displayName}</p>}
        <button onClick={handleSignOut} className="hover:cursor-pointer text-white">Sign out</button>
       </div>
        
    </div>
  )
}

export default Navbar