import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { ChatProvider } from './components/context/ChatProvider.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <ChatProvider>
      <ChakraProvider>
      <App />
    </ChakraProvider>
    </ChatProvider>
  
  </React.StrictMode>,
)
