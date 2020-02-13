import React from 'react'
import { withRouter } from "react-router-dom";

import Table from '../components/Table'
import Error from '../components/Error';
import Button from '../components/Button';

import Loader from '../components/Loader';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export const GRAINS_QUERY = gql`
  query {
    grains {
      id
      name
      ebc
      description
    }
  }
`

const HEADERS = [{ key: 'name', name: 'Grain Name' }, {key: 'ebc', name: 'EBC' }, { key: 'description', name: 'Description' }]
// MOCK DATA!!
// const MOCK_ROWS = [{ id: 'adnsandajs', name: 'Pils', ebc: 2, description: 'Very delicate malt to do pilsner and lighter beers' }]

function Grains({ history }) {
  /**
   * args
   *   headers: [{ key: string, name: string }, ...]
   *   rows: [{ id: string, name: string, ebc: number, description: string }, ...]
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
    history.push(`/grains/${id}`)
  }

  const onClick = (e) => {
    e.preventDefault()
    history.push('/grains/new')
  }

  // TODO
  const renderQuery = () => {
    return <Query query={GRAINS_QUERY}>
      {
        ({ loading, error, data }) => {
          if (loading) return <Loader />
          if (error) return <Error error={error} />

          return renderContent(HEADERS, data.grains)
        }
      }
    </Query>
  }

  return (
    <section>
      <h2>Grains</h2>
      { renderQuery() }
      <Button onClick={onClick}>NEW GRAIN</Button>
    </section>
  )
}


export default withRouter(Grains)
