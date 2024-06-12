import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import axios from 'axios'
import { getServerSession } from 'next-auth'

const ApiServer = () => {
  const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL })
  instance.interceptors.request.use(async request => {
    const session = await getServerSession(authOptions)

    if (session) {
      request.headers['x-access-token'] = `${session.user.accessToken}`
    }
    return request
  })

  instance.interceptors.response.use(
    response => {
      return response
    },
    error => {
      console.log(`error`, error)
    }
  )

  return instance
}

export default ApiServer()
