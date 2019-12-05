// @flow
import { ipcMain } from 'electron'
import Store from 'electron-store'

const store = new Store()

ipcMain.on('get-access-token', e => {
  const token = store.get('accessToken')
  e.returnValue = token
})
