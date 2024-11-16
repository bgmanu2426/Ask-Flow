import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

import getOrCreateDB from './models/server/dbSetup'
import getOrCreateStorage from './models/server/storageSetup'


export async function middleware(request: NextRequest) {
    await Promise.all([
        getOrCreateDB(),
        getOrCreateStorage()
    ])
    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    /* match all request paths except for the the ones that starts with:
    - api
    - _next/static
    - _next/image
    - favicon.ico
    */
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
}