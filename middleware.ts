//@ts-nocheck
import { NextResponse } from 'next/server'


import withAuth from 'next-auth/middleware'

export const config = {
  matcher: ['/api/v1/:path*'],
}

export default withAuth(
  function middleware(req) {
    console.log(req.nextauth, 'NextAuth')
    // If logged in - add x-access-token
    if (req.nextauth && req.nextauth.token != null && req.nextauth.token?.accessToken) {
      const modifiedHeaders = new Headers(req.headers)
      modifiedHeaders.set('x-access-token', req.nextauth.token?.accessToken || '')
      return NextResponse.next({
        headers: modifiedHeaders,
      })
    } else {
      console.log('anonnymous request to backend')
      // If not logged in - pass as anonnymous
      return NextResponse.next()
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        return true
      },
    },
  }
)

// export async function middleware(request: NextRequest) {
//   const session = await getServerSession(authOptions)
//   console.log("req", request)
//   if (session?.user) {
//     const modifiedHeaders = new Headers(request.headers)
//     modifiedHeaders.set('x-access-token', session?.user?.accessToken || '')

//     console.log('Middleware ', session?.user?.accessToken)

//     return NextResponse.next({
//       headers: modifiedHeaders,
//     })
//   }
// }
