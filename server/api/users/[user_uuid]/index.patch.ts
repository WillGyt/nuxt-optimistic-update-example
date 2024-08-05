import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/database.types'
import z from 'zod'

export default defineEventHandler(async (event) => {
  // This simulates delay in the server
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Uncomment this to simulate an error in the server
  // throw Error('Fake error')

  const params = await getValidatedRouterParams(event, (params) =>
    z.object({ user_uuid: z.string().uuid() }).parse(params)
  )

  const client = await serverSupabaseClient<Database>(event)

  const body = await readValidatedBody(event, (body) =>
    z
      .object({
        favorite_color: z.string().optional(),
      })
      .parse(body)
  )

  await client
    .from('users')
    .update(body)
    .eq('user_uuid', params.user_uuid)
    .select()
    .single()
    .throwOnError()
})
