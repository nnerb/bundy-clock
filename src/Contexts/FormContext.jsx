import React, { createContext, useContext, useState } from 'react'

export const formDataContext = createContext({})
export const formDataUpdateContext = createContext()
export const handleChangeContext = createContext()

export const formDataSignUpContext = createContext({})
export const formDataSignUpUpdateContext = createContext()
export const handleSignUpChangeContext = createContext()


export const useFormDataContext = () => useContext(formDataContext)
export const useFormDataUpdateContext = () => useContext(formDataUpdateContext)
export const useHandleChangeContext = () => useContext(handleChangeContext)

export const useFormDataSignUpContext = () => useContext(formDataSignUpContext)
export const useFormDataSignUpUpdateContext = () => useContext(formDataSignUpUpdateContext)
export const useHandleSignUpChangeContext = () => useContext(handleSignUpChangeContext)


const FormContextProvider = ({children}) => {
    
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })
    
    const handleChange = (event) => {
        const {name, value } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }
    const [SignUpFormData, setSignUpFormData] = useState({
        username: "",
        password: "",
    })
    
    const handleSignUpChange = (event) => {
        const {name, value } = event.target
        setSignUpFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

  return (
    <formDataContext.Provider value={formData}>
        <formDataUpdateContext.Provider value = {setFormData}>
            <handleChangeContext.Provider value={(event) => handleChange(event)}>
                <formDataSignUpContext.Provider value={SignUpFormData}>
                    <formDataSignUpUpdateContext.Provider value={setSignUpFormData}>
                        <handleSignUpChangeContext.Provider value={(event) => handleSignUpChange(event)}>
                            {children}
                        </handleSignUpChangeContext.Provider>
                    </formDataSignUpUpdateContext.Provider>
                </formDataSignUpContext.Provider>
            </handleChangeContext.Provider>
        </formDataUpdateContext.Provider>
    </formDataContext.Provider>
  )
}

export default FormContextProvider