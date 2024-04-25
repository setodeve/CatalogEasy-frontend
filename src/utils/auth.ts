import Cookies from 'js-cookie'

export const logout = () => {
  Cookies.remove('uid')
  Cookies.remove('client')
  Cookies.remove('access-token')
}

export const login = (uid: string, client: string, accessToken: string) => {
  Cookies.set('uid', uid, {
    expires: 7,
    secure: true,
    sameSite: 'strict',
  })
  Cookies.set('client', client, {
    expires: 7,
    secure: true,
    sameSite: 'strict',
  })
  Cookies.set('access-token', accessToken, {
    expires: 7,
    secure: true,
    sameSite: 'strict',
  })
}
