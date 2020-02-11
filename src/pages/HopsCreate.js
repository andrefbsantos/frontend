import React, { Component, Fragment } from 'react'
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

class HopsCreate extends Component {
  state = {
    name: undefined,
    alphaAcids: undefined,
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
    const { name, alphaAcids, description } = this.state
    return  !!name && !!alphaAcids && !!description
  }

  renderContent = (onClick) => {
    const { name, alphaAcids, description } = this.state;
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
            onChange={this.onChange}
            error={this.hasError(name)}
            onBlur={this.onBlur}
          />
          <TextField
            required
            id="alphaAcids"
            type="number"
            label="Alpha acids (%)"
            margin="normal"
            variant="outlined"
            defaultValue={alphaAcids}
            onChange={this.onChange}
            error={this.hasError(alphaAcids)}
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
        <Button disabled={!this.formIsValid()} onClick={onClick}>CREATE</Button>
      </Section>
    )
  }

  renderMutation = () => {
    return (
      <Mutation
        mutation={CREATE_HOP}
        variables={{ data: { ...this.state } }}
        refetchQueries={[{ query: HOPS_QUERY }]}
        awaitRefetchQueries
        onCompleted={({ hop }) => {
          console.log(hop)
          this.props.history.push('/hops')
        }}
      >
        {( createHops, { loading, error }) => {
          if (loading) return <Loader />
          if (error) return <Error error={error} />

          return this.renderContent(createHops)
        }}
      </Mutation>
    )
  }

  render() {
    return (
      <Fragment>
        <h2>Create Hop</h2>
        { this.renderMutation() }
      </Fragment>
    )
  }
}

export default withRouter(HopsCreate)
