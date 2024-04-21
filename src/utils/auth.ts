import Cookies from 'js-cookie'

const COOKIESETTING = {
  expires: 7,
  secure: true,
  sameSite: 'strict',
}

export const logout = () => {
  Cookies.remove('uid')
  Cookies.remove('client')
  Cookies.remove('access-token')
}

export const login = (uid: string, client: string, accessToken: string) => {
  Cookies.set('uid', uid, COOKIESETTING)
  Cookies.set('client', client, COOKIESETTING)
  Cookies.set('access-token', accessToken, COOKIESETTING)
}
