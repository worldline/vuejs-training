import { api } from '@/services/api.js'

export default {
  register (credentials) {
    return api('/user/register', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
  },
  login (credentials) {
    return api('/user/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
  },
  user () {
    return api('/user')
  }
}
