import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '@/env'
import { schema } from './schemas'

export const pg = postgres(env.DATABASE_URL)

pg`
  SELECT 1
`
  .then(() => {
    console.log('✅ Conectado ao PostgreSQL')
  })
  .catch(err => {
    console.error('❌ Erro ao conectar ao PostgreSQL')
    console.error(err)
  })

export const db = drizzle(pg, { schema })
