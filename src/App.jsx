import { Route,Routes } from 'react-router-dom'
/* Components */
import Login from './Components/Login'
import Employee from './Components/Employee/Employee'
import Protected from './Components/Protected'

/* Contexts */
import FormContextProvider from './Contexts/FormContext'
import { AuthContextProvider } from './Contexts/AuthContext'
import FetchEmployeeContextProvider from './Contexts/FetchEmployeeContext'
import Footer from './Components/Employee/Footer'


function App() {

  return (
    <div className="app overflow-x-hidden min-h-screen">
      <AuthContextProvider>
        <FormContextProvider>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/employee'
            element={
            <Protected>
              <FetchEmployeeContextProvider>
                <Employee/>
              </FetchEmployeeContextProvider>
            </Protected>
            }
            />
          </Routes>
        </FormContextProvider>
      </AuthContextProvider>
    </div>
  )
}

export default App
