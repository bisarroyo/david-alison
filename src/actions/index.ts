import { turso } from '@/lib/turso'

import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'

export const server = {
    sendForm: defineAction({
        input: z.object({
            name: z.string().min(3),
            attendance: z.enum(['1', '0'])
        }),
        handler: async (input) => {
            const confirmation = input.attendance === '1' ? 1 : 0
            const name = input.name.trim()
            const message = 'Hello'
            const data = await turso.execute({
                sql: `INSERT INTO attendance (name, message, confirmation) VALUES (?, ?, ?)`,
                args: [name, message, confirmation]
            })
            console.log(data)
            return 'success'
        }
    })
}
