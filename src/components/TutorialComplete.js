import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { DEVELOPMENT_IS_READY } from '../App';

export default function TutorialComplete() {
  return (
    <Fragment>
      <strong>You are ready to start development</strong>
      <p>Now you need to implement Querys and Mutations for each page, let's start!</p>
      { DEVELOPMENT_IS_READY ? null : <Link to="/beers"><Button>START</Button></Link>}
      <Link to="/docs"><Button>DOCUMENTATION</Button></Link>
      { DEVELOPMENT_IS_READY ? <Link to="/review"><Button>REVIEW WORKSHOP</Button></Link> : null}
    </Fragment>
  )
}
