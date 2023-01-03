import React, { useEffect } from 'react'
import { UserAuth } from '../../Contexts/AuthContext'
import { useFetchEmployeeContext } from '../../Contexts/FetchEmployeeContext'

const EmployeeTable = () => {

    const {user} = UserAuth
    const { currentData, isTimedIn } = useFetchEmployeeContext()

  return (
    <div className='mx-4 text-sm overflow-auto pb-10'>
        <div className="overflow-x-auto relative shadow-md rounded-lg bg-white max-w-[1000px] mx-auto w-full">
            <table className="w-full text-left text-gray-500 flex sm:flex-col">
                <thead className="text-gray-700 uppercase bg-gray-50">
                    <tr className='tr-header flex flex-col sm:flex-row'>
                        <th className="py-3 px-6">
                            Name
                        </th>
                        <th className="py-3 px-6">
                            Time In
                        </th>
                        <th className="py-3 px-6">
                            Date In
                        </th>
                        <th className="py-3 px-6">
                            Time Out
                        </th>
                        <th className="py-3 px-6">
                            Date Out
                        </th>
                        <th className="py-3 px-6">
                            Hours rendered
                        </th>
                        <th className="py-3 px-6">
                            Status
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {currentData?.map((item,index) => (
                    <tr key={index} className="bg-white border-b flex flex-col sm:flex-row tr-data">
                        <td className="py-3 px-6">{item.name}</td>
                        <td className="py-3 px-6">{item.timeIn}</td>
                        <td className="py-3 px-6">{item.dateIn}</td>
                        <td className="py-3 px-6">{item.timeOut}</td>
                        <td className="py-3 px-6">{item.dateOut}</td>
                        <td className="py-3 px-6">{
                            isTimedIn.timeOut === 'N/A' ? 'N/A' :
                            isTimedIn.timeOut && (item.timeOut.slice(0,2) - item.timeIn.slice(0,2))
                        }</td>
                        <td className="py-3 px-6">
                            {item.status}
                        </td>
                    </tr>
                    
                    ))}
                </tbody>
            </table>
        </div>   
    </div>
    
  )
}

export default EmployeeTable