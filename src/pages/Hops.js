import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Table from '../components/Table'
import Error from '../components/Error'
import Button from '../components/Button';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Loader from '../components/Loader';

export const HOPS_QUERY = gql`
  query HOPS_QUERY {
    hops {
      id
      name
      alphaAcids
      description
    }
  }
`

const HEADERS = [{ key: 'name', name: 'Hop Name' }, { key: 'alphaAcids', name: 'Alpha Acids' }, { key: 'description', name: 'Description' }]

class Hops extends Component {
    /**
   * args
   *   headers: [{ key: string, name: string }, ...]
   *   rows: [{ id: string, name: string, alphaAcids: number, description: string }, ...]
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

  rowTableOnClick = (id) => {
    this.props.history.push(`/hops/${id}`)
  }

  onClick = (e) => {
    e.preventDefault()
    this.props.history.push('/hops/new')
  }

  renderQuery = () => {
    return (
      <Query query={HOPS_QUERY}>
        {
          ({ loading, error, data }) => {
            if (loading) return <Loader />
            if (error) return <Error error={error} />

            return this.renderContent(HEADERS, data.hops)
          }
        }
      </Query>
    )
  }

  render() {
    return (
      <section>
        <h2>Hops</h2>
        { this.renderQuery() }
        <Button onClick={this.onClick}>NEW HOP</Button>
      </section>
    )
  }
}

export default withRouter(Hops)