import React from 'react'
import { withRouter } from 'react-router-dom'

import Table from '../components/Table'
import Error from '../components/Error'
import Button from '../components/Button';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Loader from '../components/Loader';

export const HOPS_QUERY = gql`
  query HOPS_QUERY {
    hopses {
      id
      name
      alphaAcids
      description
    }
  }
`

const HEADERS = [{ key: 'name', name: 'Hop Name' }, { key: 'alphaAcids', name: 'Alpha Acids' }, { key: 'description', name: 'Description' }]

function Hops({ history }) {
    /**
   * args
   *   headers: [{ key: string, name: string }, ...]
   *   rows: [{ id: string, name: string, alphaAcids: number, description: string }, ...]
   *
   * headers | array of objects containing the object key for the value as a string and the name to be displayed in the table header
   * rows | array of objects containing the keys with the needed values for the table body PLUS an id
   */
  const renderContent = (headers, rows) => {
    if (!headers || !Array.isArray(headers)) {
      return <Error error={{ message: 'Headers is not a array'}}><code>typeof of headers is: {typeof headers}</code></Error>
    } else if (!rows || !Array.isArray(rows)) {
      return <Error error={{ message: 'Rows is not a array'}}><code>typeof of rows is: {typeof rows}</code></Error>
    }

    return <Table headers={headers} rows={rows} onRowClick={rowTableOnClick} />
  }

  const rowTableOnClick = (id) => {
    history.push(`/hops/${id}`)
  }

  const onClick = (e) => {
    e.preventDefault()
    history.push('/hops/new')
  }

  const renderQuery = () => {
    return (
      <Query query={HOPS_QUERY}>
        {
          ({ loading, error, data }) => {
            if (loading) return <Loader />
            if (error) return <Error error={error} />

            return renderContent(HEADERS, data.hopses)
          }
        }
      </Query>
    )
  }

  return (
    <section>
      <h2>Hops</h2>
      { renderQuery() }
      <Button onClick={onClick}>NEW HOP</Button>
    </section>
  )
}

export default withRouter(Hops)
