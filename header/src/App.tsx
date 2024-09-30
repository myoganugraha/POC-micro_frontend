import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import HeaderComponent from './components/header'

const Header = () => (
  <div className="container">
    <HeaderComponent/>
  </div>
)
const rootElement = document.getElementById('header')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(<Header />)