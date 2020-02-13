import React, { Fragment, useState } from 'react'
import { TextField } from '@material-ui/core'
import styled from 'styled-components'
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import InputLabel from '@material-ui/core/InputLabel';
import gql from "graphql-tag"

import Button from '../components/Button'
import { Mutation, Query } from 'react-apollo';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { BEERS_QUERY } from './Beers'
import { withRouter } from 'react-router-dom';

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

const HOPSES_GRAINS_QUERY = gql`
  query {
    hopses {
      id
      name
    }
    grains {
      id
      name
    }
  }
`

const CREATE_BEER = gql`
  mutation CREATE_BEER(
    $type: String!
    $brewery: String!
    $name: String!
    $description: String!
    $abv: Float!
    $ibu: Float
    $ebc: Float
    $grains: [String]!
    $hopses: [String]!
  ) {
    createBeer(
      type: $type
      brewery: $brewery
      name: $name
      description: $description
      abv: $abv
      ibu: $ibu
      ebc: $ebc
      grains: $grains
      hopses: $hopses
    ){
      id
      name
    }
  }
`

// MOCK DATA, REPLACE WITH DATA FROM YOGA SERVER!!!
const HOPS_LIST = [{id: 'asdbas', name: 'Citra'} , { id: 'aksdansj', name: 'Simcoe' }]
const GRAINS_LIST = [{ id: 123, name: 'Pils' }, { id: 12312, name: 'Pale Ale'}]
function BeerCreate({ history }) {
  const [state, setState] = useState({
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
  let hopsDict = {}
  let grainsDict = {}

  const updateDictionaries = (hopsList, grainsList) => {
    hopsDict = hopsList.reduce((acc, item) => {
      acc[item.id] = item.name
      return acc
    }, {})

    grainsDict = grainsList.reduce((acc, item) => {
      acc[item.id] = item.name
      return acc
    }, {})
  }

  updateDictionaries(HOPS_LIST, GRAINS_LIST)

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
    return  !!type && !!brewery && !!name && !!description && !!abv && !!hops && hops.length > 0 && !!grains && grains.length > 0
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
              {selected.map(value => <Chip key={value} label={name==="hops" ? hopsDict[value]: grainsDict[value]} color="secondary" />)}
            </div>
          )}
        >
          {opt.map(el => (
            <MenuItem key={el.id} value={el.id} >
              {el.name}
            </MenuItem>
          ))}
        </Select>
        <Label htmlFor="hops">The specially selected {upperCaseName}</Label>
      </Fragment>
    )
  }

  const renderContent = (hopsList = HOPS_LIST, grainsList = GRAINS_LIST, onClick) => {
    const { type, brewery, name, description, hops, grains, abv, ibu, ebc } = state;
    return (
      <Section>
        <form>
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
            type="number"
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
        <Button onClick={onClick} disabled={!formIsValid()}>CREATE</Button>
      </Section>
    )
  }

  // TODO
  const renderQuery = () => {
    return (
      <Query query={HOPSES_GRAINS_QUERY}>
        {
            ({ loading, error, data }) => {
            if (loading) return <Loader />
            if (error) return <Error error={error} />

            updateDictionaries(data.hopses, data.grains)
            return renderMutation(data.hopses, data.grains)
          }
        }
      </Query>
    )
  }

  // TODO
  const renderMutation = (hopsesList, grainsList) => {
    const {
      type,
      brewery,
      name,
      description,
      abv,
      ibu,
      ebc,
      hops: hopses,
      grains,
    } = state

    return (
      <Mutation
      mutation={CREATE_BEER}
      awaitRefetchQueries
      variables={{ type, brewery, name, description, abv, ebc, ibu, hopses, grains }}
      refetchQueries={[{ query: BEERS_QUERY}]}
      onCompleted={() => {
        history.push('/beers')
      }}>
        {(createBeer, { loading, error })=>{
          if (loading) return <Loader />
          if (error) return <Error error={error} />
          return renderContent(hopsesList, grainsList, createBeer)
        }}

      </Mutation>
    )
  }

  return (
    <Fragment>
      <h2>Create Beer</h2>
      { renderQuery() }
    </Fragment>
  )
}


export default withRouter(BeerCreate)
