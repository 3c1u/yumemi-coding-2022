import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { App } from '~/providers/App'
import '~/styles/global.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
