const localhost = 'http://localhost/'
const site = 'wp-restapi/'
const api = 'wp-json/wp/v2/'
const auth = 'wp-json/jwt-auth/v1/token'

export const EMB = '?_embed=1'
export const POSTS_URL = `${localhost}${site}${api}posts`
export const CATEGORIES_URL = `${localhost}${site}${api}categories`
export const AUTH_LOGIN = `${localhost}${site}${auth}`
export const AUTH_SIGNUP = `${localhost}${site}${api}users/register`