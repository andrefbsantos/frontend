import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { TextField } from '@material-ui/core'
import styled from 'styled-components'
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import InputLabel from '@material-ui/core/InputLabel';

import Button from '../components/Button'

const Section = styled.section`
  form {
    display: flex;
    flex-direction: column;
  }
`
const Label = styled(InputLabel)`
  && {
    margin-top: 0.5rem;
    font-size: 0.75rem;
  }
`

const MOCK_HOPS_LIST = [{id: 'asdbas', name: 'Citra'} , { id: 'aksdansj', name: 'Simcoe' }]
const MOCK_GRAINS_LIST = [{ id: 123, name: 'Pils' }, { id: 12312, name: 'Pale Ale'}]

function BeerUpdate({history, match}) {
  const [state, setState] = useState({
    id: match.params.id,
    type: undefined,
    brewery: undefined,
    name: undefined,
    description: undefined,
    hops: [],
    grains: [],
    abv: undefined,
    ibu: undefined,
    ebc: undefined,
  })

  // TODO: UPDATE WITH DATA FROM YOGA SERVER
  const hopsDict = MOCK_HOPS_LIST.reduce((acc, item) => {
    acc[item.id] = item.name
    return acc
  }, {})

  // TODO: UPDATE WITH DATA FROM YOGA SERVER
  const grainsDict = MOCK_GRAINS_LIST.reduce((acc, item) => {
    acc[item.id] = item.name
    return acc
  }, {})

  const onChange = (e) => {
    e.preventDefault()
    if (e.target.name && !e.target.id) {
      setState({
        ...state,
        [e.target.name]: e.target.value
      })
    } else {
      setState({
        ...state,
        [e.target.id]: e.target.type === 'number' ? Number(e.target.value) : e.target.value
      })
    }
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
    const {
      type,
      brewery,
      name,
      description,
      abv,
      hops,
      grains
    } = state
    return  !!type || !!brewery || !!name || !!description || !!abv || (!!hops && hops.length > 0) || (!!grains && grains.length > 0)
  }

  const renderSelect = (name, value, opt) => {
    const upperCaseName = name.slice(0, 1).toUpperCase() + name.slice(1, name.length)
    return (
      <Fragment>
        <h4>{upperCaseName} *</h4>
        <Select
          id={name}
          multiple
          variant="outlined"
          value={value}
          onChange={onChange}
          input={<OutlinedInput labelWidth={0} type="select" name={name} />}
          renderValue={selected => (
            <div>
              {selected.map(value => <Chip key={value} label={name === 'hops' ? hopsDict[value] : grainsDict[value]} color="secondary" />)}
            </div>
          )}
        >
          {opt.map(el => (
            <MenuItem key={el.id} value={el.id} >
              {el.name}
            </MenuItem>
          ))}
        </Select>
        <Label htmlFor="hops">The specially selected {upperCaseName} for your beer!</Label>
      </Fragment>
    )
  }

  const renderContent = (hopsList, grainsList, onClick) => {
    const { id, type, brewery, name, description, hops, grains, abv, ibu, ebc } = state;
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
            id="type"
            label="Beer type"
            margin="normal"
            variant="outlined"
            defaultValue={type}
            onChange={onChange}
            error={hasError(type)}
            onBlur={onBlur}
          />
          <TextField
            required
            id="brewery"
            label="Brewery name"
            margin="normal"
            variant="outlined"
            defaultValue={brewery}
            onChange={onChange}
            error={hasError(brewery)}
            onBlur={onBlur}
          />
          <TextField
            required
            id="name"
            label="Beer name"
            margin="normal"
            variant="outlined"
            defaultValue={name}
            onChange={onChange}
            error={hasError(name)}
            onBlur={onBlur}
          />
          <TextField
            required
            id="abv"
            label="Alcohol by volume - ABV (%)"
            margin="normal"
            variant="outlined"
            defaultValue={abv}
            onChange={onChange}
            error={hasError(abv)}
            onBlur={onBlur}
          />
          <TextField
            id="ibu"
            type="number"
            label="International bittering unit - IBU"
            margin="normal"
            variant="outlined"
            defaultValue={ibu}
            onChange={onChange}
            onBlur={onBlur}
          />
          <TextField
            id="ebc"
            type="number"
            label="Estimated beer color - EBC"
            margin="normal"
            variant="outlined"
            defaultValue={ebc}
            onChange={onChange}
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
          { renderSelect('hops', hops, hopsList) }
          { renderSelect('grains', grains, grainsList) }
        </form>
        <Button onClick={onClick} disabled={!formIsValid()}>Update</Button>
      </Section>
    )
  }

  // TODO
  const renderQuery = () => {}

  // TODO
  const renderMutation = () => {}

  return (
    <Fragment>
      <h2>Update Beer</h2>
      {/* TODO: UPDATE LISTS FOR renderContent func */}
      { renderContent(MOCK_HOPS_LIST, MOCK_GRAINS_LIST) }
    </Fragment>
  )
}

export default withRouter(BeerUpdate)
