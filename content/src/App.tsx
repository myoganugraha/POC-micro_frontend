import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import PopularMoviesComponent from './components/popularMovies'

const Popular = () => (
  <div className="container">
    <PopularMoviesComponent/>
  </div>
)
const rootElement = document.getElementById('popular')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(<Popular />)