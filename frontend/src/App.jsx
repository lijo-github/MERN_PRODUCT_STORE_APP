import { Box, Button, useColorModeValue} from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import Navbar from './components/Navbar'

function App() {


  return (
    <Box minH={"100vh"}
    w='100%'
    h='200px'
    bg={useColorModeValue('gray.100', 'gray.900')}
    >
    <Navbar/>
    <Routes>
     <Route path='/' element={<HomePage/>}/>
     <Route path='/create' element={<CreatePage/>}/>

    </Routes>
    
    </Box>
  )
}

export default App
