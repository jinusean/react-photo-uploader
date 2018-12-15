import React from 'react'
import { render } from 'react-dom'
import PhotoUploader from '../src/index.jsx'
import './main.scss'

render(
  <div className="demo">
    <h2>React Photo Uploader Component Demo</h2>
    <PhotoUploader/>
  </div>,
  document.getElementById('app')
)