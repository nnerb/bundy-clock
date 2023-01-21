import { collection, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore'
import moment from 'moment/moment'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { db } from '../firebase'
import { UserAuth } from './AuthContext'

export const fetchEmployeeContext = createContext()

export const useFetchEmployeeContext = () => useContext(fetchEmployeeContext)

const FetchEmployeeContextProvider = ({children}) => {

    const [clockState, setClockState] = useState()
    const [timeInEnabled, setTimeInEnabled] = useState()
    const [employee, setEmployee] = useState([]) 
    const [timeOutLoading, setTimeOutLoading] = useState()
    const [loading, setLoading] = useState()

    const [currentData, setCurrentData] = useState()
    const [dayPassed, setDayPassed] = useState()

    const [loadOnFetch, setLoadOnFetch ] = useState()


    const {user} = UserAuth()

    useEffect(() => {
        setInterval(() => {
          setClockState(prevDate => {
            return {
              ...prevDate,
              currentTime: moment().format('HH:mm:ss'),
              currentDate: moment().format('MMMM DD, YYYY'),
            }
          })
        },1000)      
      },[])

      const handleYesterday = () => {
        const yesterday = moment().subtract(1, 'day').format('MMMM DD, YYYY')
        return yesterday
      }

      // console.log(employee)
      const index = employee?.findIndex(value => (value.dateIn === clockState?.currentDate || value.dateIn === handleYesterday()) && value.email === user?.email && !value.timeOut && !value.dateOut) 

      useEffect (() => {
      
        const q = query(collection(db, 'time-record'), orderBy("dateIn", "asc"))
        const unsub = onSnapshot(q, (querySnapshot) => {
          setDayPassed(undefined)
          let employeeArray = []
          querySnapshot.forEach((doc) => {
            if(doc.data().uid === user.uid) {
              employeeArray.push({...doc.data(), id: doc.id}) 
            }
          })
          setEmployee(employeeArray)
          setLoadOnFetch(false)
         
        })
        return unsub
      },[])

      const unabledToTimeOut = async () => {
        setTimeOutLoading(true)
        await updateDoc(doc(db, 'time-record', lastLogin?.id), {
          timeOut: "N/A",
          dateOut: "N/A",
          status: "Unabled to timeout",
          renderedHours: 'N/A',
        }) 
        setTimeOutLoading(false)
      }

     
      const filterCurrentUser = employee?.filter(doc => doc.uid === user.uid && doc.timeIn && (doc.dateIn === clockState?.currentDate || doc.dateIn === handleYesterday()))
      const isTimedIn = filterCurrentUser?.slice(-1)[0]

      const lastLogin = employee?.slice(-1)[0]
      useEffect(() => {

          employee?.filter(doc => {
            if(doc.dateIn === clockState.currentDate && doc.email === user.email && !doc.timeOut && !doc.dateOut){
              return 
            }
          }) 
  
          const currentEmployeeData =  employee?.filter(doc => doc.uid === user.uid)
          setCurrentData(currentEmployeeData)
  
          const due = "08:00:00 AM"

          const currentDate = new Date(moment().format('MMMM DD, YYYY'))
  
          /* Check if the user timed in*/
          if((lastLogin?.dateIn === clockState?.currentDate) || (lastLogin?.dateIn === handleYesterday())){
            /* Check if user timed out from the last session */
            if(lastLogin?.timeOut){ 
              /* don't do anything if same day */
              if(lastLogin?.timeStamp === currentDate.getTime()){
                // console.log('same day poh')
                setDayPassed(false)
                return  
              }
           /* If it's a day ago from the moment user timed in, check if it's still not 8am*/
              if(clockState?.currentTime.substring(0,2) < due.substring(0,2)){
                setDayPassed(false)
                // console.log('all goods, wala pang 8am')
                return
              }
              else{
                setDayPassed(true)
                // console.log('ok na pwede na ulit time in')
                return
              }
            }
            /* if user hasnt timed out yet*/
            if(lastLogin?.timeStamp === undefined) {
              return
            } 
            /* Check if it's still the same day */
              if(lastLogin?.timeStamp === currentDate.getTime()){
                setDayPassed(false)
                return  
              }
              /* If it's a day ago from the moment user timed in, check if it's still not 8am*/
                if(clockState?.currentTime.substring(0,2) < due.substring(0,2)){
                  setDayPassed(false)
                  // console.log('all goods, wala pang 8am')
                  return
                }
                /* If it's already 8am onwards */
                else{
                  // console.log('unable to time out')
                  setDayPassed(true)
                  // unabledToTimeOut()
                  return
                }
          }
          else if(employee?.length === 0){
            return
          }
          unabledToTimeOut()
          setDayPassed(true)
          return

      },[clockState?.currentTime])

  return (
    <fetchEmployeeContext.Provider value={
        {
            clockState,
            setClockState,
            timeInEnabled,
            setTimeInEnabled,
            employee,
            setEmployee,
            timeOutLoading,
            setTimeOutLoading,
            loading,
            setLoading,
            currentData,
            index,
            handleYesterday,
            isTimedIn,
            dayPassed,
            lastLogin,
            loadOnFetch,
            setLoadOnFetch
        }
        }>
        {children}
    </fetchEmployeeContext.Provider>
  )
}

export default FetchEmployeeContextProvider