import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/database.types'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)

  const { data } = await client
    .from('users')
    .select()
    .order('last_name', { ascending: true })
    .throwOnError()

  return data ?? []
})
