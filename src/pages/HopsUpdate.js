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

function HopsUpdate({ history, match }) {
  const [hops, setHops] = useState({
    id: match.params.id,
    name: undefined,
    alphaAcids: undefined,
    description: undefined,
  })


  const onChange = (e) => {
    e.preventDefault()
    setHops({
      ...hops,
      [e.target.id]: e.target.type === 'number' ? Number(e.target.value) : e.target.value
    })
  }

  const onBlur = (e) => {
    e.preventDefault()
    if (hops[e.target.id] === undefined) {
     setHops({
       ...hops,
       [e.target.id]: ''
      })
    }
  }

  const hasError = (value) => value !== undefined && !value

  const formIsValid = () => {
    const { name, alphaAcids, description } = hops
    return  !!name || !!alphaAcids || !!description
  }

  const renderContent = (hop, onClick) => {
    const { id, name, alphaAcids, description } = hop;
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
        <Button onClick={onClick} disabled={!formIsValid()}>UPDATE</Button>
      </Section>
    )
  }

  // TODO
  const renderQuery = () => {}

  // TODO
  const renderMutation = () => {}

  return (
    <Fragment>
      <h2>Update Hop</h2>
      { renderContent(hops) }
    </Fragment>
  )
}

export default withRouter(HopsUpdate)
