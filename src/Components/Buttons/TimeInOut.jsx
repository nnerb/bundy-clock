import moment from 'moment'
import React from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { UserAuth } from '../../Contexts/AuthContext'
import Loading from './Loading'

const TimeInOut = ({clockState,
                    employee,
                    handleTimeIn,
                    timeOutLoading,
                    handleTimeOut,
                    loading,
                    handleYesterday,
                    dayPassed,
                    sameDay,
                    later,
                    buttonDisabled
                }) => {

              
  const lastLoginIn = employee?.slice(-1)[0]

  return (
    <div className='w-full flex items-center flex-col pt-[7rem] pb-10'> 
          <div className='flex flex-col items-center'>
            <div className='font-bold text-white text-center time'> {moment().format('HH:mm:ss A')}</div>
            <div className='font-bold text-gray-300 sm:mt-[-20px] text-center date'> {moment().format('MMMM DD, YYYY')}</div>
          </div>
          { loading ? <ThreeDots color='white' ariaLabel='loading' /> : 
            <div>
              { (employee === undefined || loading) || buttonDisabled === undefined   ? 
                <ThreeDots color='white' ariaLabel='loading' /> :
                  <div className='flex flex-col items-center gap-3'> 
                  <div className='flex gap-4'>
                    { 
                      <button onClick={handleTimeIn}
                        className={`mt-2 bg-green-500 px-3 rounded text-white py-1 hover:bg-green-700 duration-300
                        ${((!lastLoginIn?.timeIn && !employee.length) || dayPassed) && !buttonDisabled ? "pointer-events-auto" : "pointer-events-none bg-red-600"}  `}>
                        Time in
                      </button>                     
                    }  
                    { (timeOutLoading || timeOutLoading === undefined) && employee === undefined ? 
                      <Loading/> : 
                      <button onClick={() => handleTimeOut()} 
                        className={`mt-2 px-3 rounded py-1 duration-300
                        ${(!timeOutLoading || timeOutLoading === undefined) &&
                        (lastLoginIn?.dateIn !== clockState?.currentDate || !lastLoginIn?.dateIn !== handleYesterday) && lastLoginIn?.status && !lastLoginIn.timeOut && !buttonDisabled ? "pointer-events-auto bg-blue-300 text-black hover:cursor-pointer hover:bg-blue-500" : "pointer-events-none bg-red-600 text-white"}`}>
                        Time out
                      </button>
                    }
                    </div>
          {sameDay && <div className='text-gray-100 italic'> Please be back by 8am tomorrow. </div> }
           { later && <div className='text-gray-100 italic'> Please be back by 8am. </div> }
                  </div>
                }
            </div>
          }
        </div>
  )
}

export default TimeInOut