import React, { useMemo } from 'react'
import { usePagination, useTable } from 'react-table'
import { UserAuth } from '../../Contexts/AuthContext'
import { useFetchEmployeeContext } from '../../Contexts/FetchEmployeeContext'
import {COLUMNS}  from './columns'

const EmployeeTable = () => {

    const {user} = UserAuth
    const { currentData } = useFetchEmployeeContext()
    
    const columns = useMemo(() => COLUMNS, [])

    const data = useMemo(() => currentData, [currentData])

    const tableInstance = useTable({
        columns,
        data
    }, usePagination)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        prepareRow,
        pageOptions,
        state
    } = tableInstance

    const { pageIndex } = state

  return (

    <div className='mx-4 text-sm overflow-auto pb-10'>
        <div className="overflow-x-auto relative shadow-md rounded bg-white max-w-[1000px] mx-auto w-full h-full">
            <table {...getTableProps()}  className="w-full text-gray-500 border-collapse border-solid border-[1px]">
                <thead  className="text-white uppercase bg-green-500 ">
                    {
                        headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}> 
                                {headerGroup.headers.map((column) =>(
                                    <th {...column.getHeaderProps()}  className='py-4 px-6'>
                                        {column.render('Header')}
                                    </th>  
                                ))}
                            </tr>
                        ))
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        page?.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row?.getRowProps()}>
                                    {
                                        row?.cells.map((cell) => {
                                            return <td {...cell?.getCellProps()} className='py-4 px-6 text-black'>{cell?.render('Cell')}</td>
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
           
        </div>   
        <div className='flex flex-col justify-center items-center gap-2'>
            <div className='w-full flex gap-4 items-center justify-center mt-4'>
                <button className={`p-2 rounded  hover:bg-gray-200 duration-300 ${!canPreviousPage ? 'pointer-events-none bg-gray-500 text-gray-300 italic' : 'pointer-events-auto bg-gray-300'}`} onClick={() => previousPage()}>Previous</button>
                <button className={`p-2 rounded  hover:bg-gray-200 duration-300 ${!canNextPage ? 'pointer-events-none bg-gray-500 text-gray-300 italic' : 'pointer-events-auto bg-gray-300'}`} onClick={() => nextPage()}>Next</button>
            </div>
            <div className='text-white'>
                Page{' '}
                <strong>
                    {pageIndex + 1} of {pageOptions?.length}
                </strong>
            </div>
        </div>
            
    </div>
    
  )
}

export default EmployeeTable