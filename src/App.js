import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import 'typeface-roboto';

import theme from './theme';
import apolloClient from './apolloClient';

import Home from './pages/Home';
import Beers from './pages/Beers';
import Header from './components/Header';
import Documentation from './pages/Documentation';
import NotFound from './pages/NotFound';
import Hops from './pages/Hops';
import Grains from './pages/Grains';
import HopsCreate from './pages/HopsCreate';
import GrainsCreate from './pages/GrainsCreate';
import HopsUpdate from './pages/HopsUpdate';
import GrainsUpdate from './pages/GrainsUpdate';
import BeerCreate from './pages/BeerCreate';
import BeerUpdate from './pages/BeerUpdate';
import Review from './pages/Review';
import Footer from './components/Footer';

const Page = styled.div`
  background-color: ${props => props.theme.lightBackgroundColor};
`

const Container = styled.div`
  max-width: ${props => props.theme.maxWidth};
  background-color: ${props => props.theme.lightBackgroundColor};
  box-shadow: ${props => props.theme.bs};
  border-radius: 0.25rem;
  margin: 8rem auto 0;
  padding: 1rem;
  min-height: calc(100vh - 14rem);
`
// UPDATE THIS CONST AND START DEVELOPMENT
export const DEVELOPMENT_IS_READY = true

class App extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <Router>
          <ThemeProvider theme={theme}>
            <Page>
            <Header disableRoutes={!DEVELOPMENT_IS_READY}/>
              <Container>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/beers' component={Beers} />
                  <Route exact path='/beers/new' component={BeerCreate} />
                  <Route exact path='/beers/:id' component={BeerUpdate} />
                  <Route exact path='/hops' component={Hops} />
                  <Route exact path='/hops/new' component={HopsCreate} />
                  <Route exact path='/hops/:id' component={HopsUpdate} />
                  <Route exact path='/grains' component={Grains} />
                  <Route exact path='/grains/new' component={GrainsCreate} />
                  <Route exact path='/grains/:id' component={GrainsUpdate} />
                  <Route exact path='/docs' component={Documentation} />
                  <Route exact path='/review' component={Review} />
                  <Route component={NotFound} />
                </Switch>
              </Container>
              <Footer />
            </Page>

          </ThemeProvider>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
