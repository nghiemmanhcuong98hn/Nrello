import {getServerSession} from '#auth'

export default defineEventHandler(async event => {
      const session = await getServerSession(event)

      const protecedRoutes = ['/api/user', '/api/board', '/api/list']

      const isProtectedRoute = protecedRoutes.some(route => getRequestURL(event).pathname.startsWith(route))

      if (!isProtectedRoute) return

      if (!session) {
            throw createError({
                  status: 403,
                  statusMessage: 'Unauthenticated!',
                  message: 'You must be logged in to access this resource!'
            })
      }
      event.context.user = session
})
