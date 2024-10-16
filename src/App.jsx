import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import DefaultComponent from './Views/DefaultComponents/DefaultComponent'

function App() {
  const [count, setCount] = useState(0)

  return (

<DefaultComponent/>

  )
}

export default App
