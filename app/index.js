import React, { Fragment } from 'react'
import { render } from 'react-dom'
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import { ipcRenderer } from 'electron'
import Root from './containers/Root'
import { configureStore, history } from './store/configureStore'
import './app.global.css'

const store = configureStore()
const token = ipcRenderer.sendSync('get-access-token')

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    authorization: token ? `Bearer ${token}` : ''
  }
})

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer

render(
  <AppContainer>
    <ApolloProvider client={client}>
      <Root store={store} history={history} />
    </ApolloProvider>
  </AppContainer>,
  document.getElementById('root')
)
