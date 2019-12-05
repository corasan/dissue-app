import { BrowserWindow, ipcMain } from 'electron'
import fetch from 'electron-fetch'
import Store from 'electron-store'
import querystring from 'querystring'
import { CLIENT_ID, CLIENT_SECRET } from '../../env'
import '../../server'

const store = new Store()

export default function authModal(mainWindow) {
  const authUrl = `https://github.com/login/oauth/authorize?scope=user:email&client_id=${CLIENT_ID}`
  const modal = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    show: false
  })

  modal.loadURL(authUrl)
  ipcMain.on('open-auth', () => {
    modal.webContents.closeDevTools()
    modal.show()
  })

  modal.webContents.on('did-navigate', (event, url) => {
    const rawCode = /code=([^&]*)/.exec(url) || null
    const code = rawCode && rawCode.length > 1 ? rawCode[1] : null

    if (code) {
      getAccessToken(code)
    }
  })
}

async function getAccessToken(code, modal) {
  console.log('code received', code)
  const query = querystring.stringify({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code
  })

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Content-Length': query.length
    }
  }

  try {
    const res = await fetch(
      `https://github.com/login/oauth/access_token?${query}`,
      options
    )
    const { access_token: accessToken } = await res.json()
    store.set('accessToken', accessToken)
    modal.close()
  } catch (err) {
    console.log(err)
    modal.close()
  }
}
