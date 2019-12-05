// @flow
import React, { useEffect } from 'react'
import { ipcRenderer } from 'electron'
import { Link } from 'react-router-dom'
import routes from '../constants/routes'
import styles from './Home.css'

export default function Home() {
  useEffect(() => {
    const token = ipcRenderer.sendSync('get-access-token')
    console.log(token)
  }, [])

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
