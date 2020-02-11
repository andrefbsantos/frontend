import React, { Component, Fragment } from 'react'
import { TextField } from '@material-ui/core'
import styled from 'styled-components'
import Button from '../components/Button'
import Loader from '../components/Loader';
import Error from '../components/Error';

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { GRAINS_QUERY } from './Grains';

const Section = styled.section`
  form {
    display: flex;
    flex-direction: column;
  }
`

const CREATE_GRAIN = gql`
  mutation CREATE_GRAIN($name: String!, $ebc: Float!, $description: String!){
    createGrain(name: $name, ebc: $ebc, description: $description)
    {
      id
      name
      ebc
      description
    }
  }
`

export default class GrainsCreate extends Component {
  state = {
    name: undefined,
    ebc: undefined,
    description: undefined,
  }

  onChange = (e) => {
    e.preventDefault()
    this.setState({ [e.target.id]: e.target.type === 'number' ? Number(e.target.value) : e.target.value })
  }

  onBlur = (e) => {
    e.preventDefault()
    if (this.state[e.target.id] === undefined) {
      this.setState({ [e.target.id]: '' })
    }
  }

  hasError = (value) => value !== undefined && !value

  formIsValid = () => {
    const { name, ebc, description } = this.state
    return  !!name && !!ebc && !!description
  }

  renderContent = (onClick) => {
    const { name, ebc, description } = this.state;
    return (
      <Section>
        <form>
          <TextField
            required
            id="name"
            label="Grain name"
            margin="normal"
            variant="outlined"
            defaultValue={name}
            onChange={this.onChange}
            error={this.hasError(name)}
            onBlur={this.onBlur}
          />
          <TextField
            required
            id="ebc"
            type="number"
            label="Estimated beer color - EBC"
            margin="normal"
            variant="outlined"
            defaultValue={ebc}
            onChange={this.onChange}
            error={this.hasError(ebc)}
            onBlur={this.onBlur}
          />
          <TextField
            required
            id="description"
            label="Description"
            margin="normal"
            variant="outlined"
            multiline
            defaultValue={description}
            onChange={this.onChange}
            error={this.hasError(description)}
            onBlur={this.onBlur}
          />
        </form>
        <Button onClick={onClick} disabled={!this.formIsValid()}>CREATE</Button>
      </Section>
    )
  }

  // TODO
  renderMutation = ( ) => {
    const { name, ebc, description } = this.state;
    return <Mutation
      mutation={CREATE_GRAIN}
      variables={{name, ebc, description}}
      awaitRefetchQueries
      refetchQueries={[{ query: GRAINS_QUERY }]}
      onCompleted={({ hop }) => {
        console.log(hop)
        this.props.history.push('/grains')
      }}
    >
      {( createGrain, { loading, error } ) => {
        if (loading) return <Loader />
        if (error) return <Error error={error} />

        return this.renderContent(createGrain)
      }}
    </Mutation>
  }

  render() {
    return (
      <Fragment>
        <h2>Create Grain</h2>
        { this.renderMutation() }
      </Fragment>
    )
  }
}
