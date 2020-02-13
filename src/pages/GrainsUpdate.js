import React, { Fragment, useState } from 'react'
import { TextField } from '@material-ui/core'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import Button from '../components/Button'

const Section = styled.section`
  form {
    display: flex;
    flex-direction: column;
  }
`

function GrainsUpdate({history, match}) {
  const [state, setState] = useState({
    id: match.params.id,
    name: undefined,
    ebc: undefined,
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
    const { name, ebc, description } = state
    return  !!name || !!ebc || !!description
  }

  const renderContent = (hop, onClick) => {
    const { id, name, ebc, description } = hop;
    return (
      <Section>
        <form>
          <TextField
            id="id"
            label="ID"
            margin="normal"
            variant="outlined"
            defaultValue={id}
            disabled
          />
          <TextField
            required
            id="name"
            label="Grain name"
            margin="normal"
            variant="outlined"
            defaultValue={name}
            onChange={onChange}
            error={hasError(name)}
            onBlur={onBlur}
          />
          <TextField
            required
            id="ebc"
            type="number"
            label="Estimated beer color - EBC"
            margin="normal"
            variant="outlined"
            defaultValue={ebc}
            onChange={onChange}
            error={hasError(ebc)}
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
        <Button onClick={onClick} disabled={!formIsValid()}>UPDATE</Button>
      </Section>
    )
  }

  // TODO
  const renderQuery = () => {
  }

  // TODO
  const renderMutation = () => {
  }

  return (
    <Fragment>
      <h2>Update Grain</h2>
      { renderContent(state) }
    </Fragment>
  )
}

export default withRouter(GrainsUpdate)
