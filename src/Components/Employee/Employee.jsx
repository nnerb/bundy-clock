import { addDoc, collection, doc, onSnapshot, query, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'

import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../../Contexts/AuthContext'

import { db } from '../../firebase'

/* Components */
import Navbar from './Navbar'
import EmployeeTable from './EmployeeTable'
import Loading from '../Buttons/Loading'

/* Context */
import { useFetchEmployeeContext } from '../../Contexts/FetchEmployeeContext'
import TimeInOut from '../Buttons/TimeInOut'
import Footer from './Footer'

const Employee = () => {
  const {user} = UserAuth()
  
  
  const {
    clockState,
    employee,
    timeOutLoading,
    setTimeOutLoading,
    loading,
    setLoading,
    currentData,
    index,
    isTimedIn,
    dayPassed,
    lastLogin,
    loadOnFetch,
    setLoadOnFetch
  } = useFetchEmployeeContext()
  
 
  const handleTimeIn = async (e) => {
    e.preventDefault(e)
    try {
      setLoading(true)
      await addDoc(collection(db, 'time-record'), {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      timeIn: clockState.currentTime,
      dateIn: clockState.currentDate,
      timeStamp: new Date(clockState.currentDate).getTime(),
      timeOut: "",
      dateOut: "",
      status: "Active"
    })
    setLoading(false)
    }
    catch(err){
      console.log(err)
    }
    
  }
  
  const handleTimeOut = async () => {
    setTimeOutLoading(true)
    // const index = employee.findIndex(value => value.dateIn === clockState.currentDate && value.email === user?.email)
    await updateDoc(doc(db, 'time-record', lastLogin?.id), {
      timeOut: clockState.currentTime,
      dateOut: clockState.currentDate,
      status: "Completed",
      renderedHours: clockState?.currentTime.slice(0,2) - lastLogin?.timeIn.slice(0,2),
    }) 
    setTimeOutLoading(false)
  }
  
  return (
    <div className='min-h-screen w-screen relative pb-[5rem]'>
      <Navbar/>
      { clockState === undefined ?
      <div className='flex flex-col w-full h-screen items-center justify-center'>
        <p className='text-white italic'> Loading..</p>
        <ThreeDots color='white' ariaLabel='loading' />
      </div> :
      <div className=''>
        <TimeInOut setLoadOnFetch={setLoadOnFetch} loadOnFetch={loadOnFetch} clockState={clockState} loading={loading} employee={employee} handleTimeIn={handleTimeIn} handleTimeOut={handleTimeOut} timeOutLoading={timeOutLoading} currentData={currentData} isTimedIn={isTimedIn} dayPassed={dayPassed}/>
        <EmployeeTable/>
        <Footer/>
      </div>
      }
    </div>
    
  )
}

export default Employee