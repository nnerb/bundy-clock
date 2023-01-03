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
import moment from 'moment'

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
    isTimedIn
  } = useFetchEmployeeContext()
  
  // const handleYesterday = () => {
  //   const yesterday = new Date()
  //   yesterday.setDate(yesterday.getDate() - 1)
  //   return yesterday.toLocaleDateString()
  // }

  // console.log(moment().subtract(1, 'days')._d)

  // console.log(moment().subtract(1, "days").format("MM/DD/YYYY"))
 
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

  const handleTimeOut = async (employee) => {
    setTimeOutLoading(true)
    // const index = employee.findIndex(value => value.dateIn === clockState.currentDate && value.email === user?.email)
    await updateDoc(doc(db, 'time-record', employee[index]?.id), {
      timeOut: clockState.currentTime,
      dateOut: clockState.currentDate,
      status: "Completed"
    }) 
    setTimeOutLoading(false)
  }

  return (
    <div className='h-screen w-screen'>
      <Navbar/>
      { clockState === undefined ?
      <div className='flex flex-col w-full h-full items-center justify-center'>
        <p className='text-white italic'> Loading..</p>
        <ThreeDots color='white' ariaLabel='loading' />
      </div> :
      <div>
        <TimeInOut clockState={clockState} loading={loading} employee={employee} handleTimeIn={handleTimeIn} handleTimeOut={handleTimeOut} timeOutLoading={timeOutLoading} currentData={currentData} isTimedIn={isTimedIn}/>
        <EmployeeTable/>
      </div>
      }
    </div>
    
  )
}

export default Employee