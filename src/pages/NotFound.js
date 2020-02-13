import React from 'react'
import { Link } from 'react-router-dom'

import Button from '../components/Button'

export default function NotFound() {
  return (
    <div>
      <h2>PAGE NOT FOUND</h2>
      <Link to="/"><Button>HOME</Button></Link>
    </div>
  )
}
