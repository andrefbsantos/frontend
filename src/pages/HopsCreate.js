import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { TextField } from '@material-ui/core'
import styled from 'styled-components'
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import Button from '../components/Button'
import Loader from '../components/Loader';
import Error from '../components/Error';
import { HOPS_QUERY } from './Hops';

const Section = styled.section`
  form {
    display: flex;
    flex-direction: column;
  }
`

const CREATE_HOP = gql`
  mutation CREATE_HOP_MUTATION ($data: HopsCreateInput!) {
    createHops(data: $data) {
      id
      name
      alphaAcids
      description
    }
  }
`

function HopsCreate({ history }) {
  const [state, setState] = useState({
    name: undefined,
    alphaAcids: undefined,
    description: undefined,
  })

  const onChange = (e) => {
    e.preventDefault()
    setState({
      ...state,
      [e.target.id]: e.target.type === 'number' ? Number(e.target.value) : e.target.value
    })
  }

  const onBlur = (e) => {
    e.preventDefault()
    if (state[e.target.id] === undefined) {
      setState({
        ...state,
        [e.target.id]: ''
      })
    }
  }

  const hasError = (value) => value !== undefined && !value

  const formIsValid = () => {
    const { name, alphaAcids, description } = state
    return  !!name && !!alphaAcids && !!description
  }

  const renderContent = (onClick) => {
    const { name, alphaAcids, description } = state;
    return (
      <Section>
        <form>
          <TextField
            required
            id="name"
            label="Hop name"
            margin="normal"
            variant="outlined"
            defaultValue={name}
            onChange={onChange}
            error={hasError(name)}
            onBlur={onBlur}
          />
          <TextField
            required
            id="alphaAcids"
            type="number"
            label="Alpha acids (%)"
            margin="normal"
            variant="outlined"
            defaultValue={alphaAcids}
            onChange={onChange}
            error={hasError(alphaAcids)}
            onBlur={onBlur}
          />
          <TextField
            required
            id="description"
            label="Description"
            margin="normal"
            variant="outlined"
            multiline
            defaultValue={description}
            onChange={onChange}
            error={hasError(description)}
            onBlur={onBlur}
          />
        </form>
        <Button disabled={!formIsValid()} onClick={onClick}>CREATE</Button>
      </Section>
    )
  }

  const renderMutation = () => {
    return (
      <Mutation
        mutation={CREATE_HOP}
        variables={{ data: { ...state } }}
        refetchQueries={[{ query: HOPS_QUERY }]}
        awaitRefetchQueries
        onCompleted={({ hop }) => {
          console.log(hop)
          history.push('/hops')
        }}
      >
        {( createHops, { loading, error }) => {
          if (loading) return <Loader />
          if (error) return <Error error={error} />

          return renderContent(createHops)
        }}
      </Mutation>
    )
  }

  return (
    <Fragment>
      <h2>Create Hop</h2>
      { renderMutation() }
    </Fragment>
  )
}

export default withRouter(HopsCreate)
