// @flow
import React from 'react'
import { ipcRenderer } from 'electron'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import styles from './Home.css'

export default function Home() {
  const res = useQuery(gql`
    query {
      viewer {
        login
      }
    }
  `)
  console.log(res)

  const auth = e => {
    e.preventDefault()
    ipcRenderer.send('open-auth')
  }

  return (
    <div className={styles.container} data-tid="container">
      <h2>Home</h2>
      <button type="button" onClick={auth}>
        Login with github
      </button>
    </div>
  )
}
