import React, { Component, Fragment } from 'react'

import { withRouter, Link } from 'react-router-dom'
import { Query } from "react-apollo"
import gql from "graphql-tag"
import styled from 'styled-components'

import Loader from '../components/Loader'
import Button from '../components/Button'
import { DEVELOPMENT_IS_READY } from '../App';
import Error from '../components/Error';
import Table from '../components/Table';


// TODO: UPDATE QUERY TO FETCH ALL REQUIRED FIELDS...
export const BEERS_QUERY = gql`
  query BEERS_QUERY {
    beers {
      id
      name
      brewery
      abv
      type
    }
  }
`

const Static = styled.div`
  code {
    display: inline-flex;
  }
`

const HEADERS = [
  { key: 'name', name: 'Name' },
  { key: 'brewery', name: 'Brewery' },
  { key: 'abv', name: 'ABV (%)' },
  { key: 'type', name: 'Beer Type' },
]

class Beers extends Component {
  /**
   * args
   *   headers: [{ key: string, name: string }, ...]
   *   rows: [{ id: string, brewery: string, name: string, abv: number, description: string }, ...]
   *
   * headers | array of objects containing the object key for the value as a string and the name to be displayed in the table header
   * rows | array of objects containing the keys with the needed values for the table body PLUS an id
   */
  renderContent = (headers, rows) => {
    if (!headers || !Array.isArray(headers)) {
      return <Error error={{ message: 'Headers is not a array'}}><code>typeof of headers is: {typeof headers}</code></Error>
    } else if (!rows || !Array.isArray(rows)) {
      return <Error error={{ message: 'Rows is not a array'}}><code>typeof of rows is: {typeof rows}</code></Error>
    }

    return <Table headers={headers} rows={rows} onRowClick={this.rowTableOnClick} />
  }

  renderStaticView = () => {
    return (
      <Static>
        <p>But why beer?</p>
        <img src="/img/homer-beer.gif" alt="homer-beer-gif" />
        <p>Because everyone loves it! We going to build a list of beer recipes, hops varieties and different grains</p>
        <p>
          With this simple example we will explore the power of GraphQL for querying and mutating data all with the easy setup of a Prisma database.
          Creating relations between tables is done adding the type Hops and Grains to the type Beers in our <code>datamodel.prisma</code> and Prisma will
          take care of creating the relations for us.
        </p>
        <p>Check the documentation to know how to do your Queries, Mutations and resolvers on your backend!</p>
        <p>
          <strong>
            After you read all the documentation change the variable <code>DEVELOPMENT_IS_READY</code> from <code>src/App.js</code> to
            true to start implementing your Queries and Mutations
          </strong>
        </p>
        <Link to="/docs"><Button>DOCUMENTATION</Button></Link>
      </Static>
    )
  }

  onClick = (e) => {
    e.preventDefault()
    this.props.history.push('/beers/new')
  }

  rowTableOnClick = (id) => {
    this.props.history.push(`/beers/${id}`)
  }

  renderQuery = () => {
    return (
      <Query query={BEERS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <Loader />
          if (error) return <Error error={error}></Error>

          // TODO: UPDATE THIS VARIABLE WHEN YOU UPDATE YOUR BACKEND RESOLVER!
          // MOCK DATA!!!
          // const beers = [{
          //   id: 'asdnasjdna',
          //   brewery: 'Dois Corvos',
          //   name: 'Fuzeta',
          //   abv: 9.1,
          //   type: 'Double IPA'
          // }]
          return this.renderContent(HEADERS, data.beers);
        }}
      </Query>
    )
  }

  render() {
    return (
      <section>
        <h2>Beers</h2>
        {
          DEVELOPMENT_IS_READY
          ?
            <Fragment>
              {this.renderQuery()}
              <Button onClick={this.onClick}>NEW BEER</Button>
            </Fragment>
          :
            this.renderStaticView() }
      </section>
    )
  }
}

export default withRouter(Beers);
