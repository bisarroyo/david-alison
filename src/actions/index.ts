import { turso } from '@/lib/turso'

import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'

export const server = {
    sendForm: defineAction({
        input: z.object({
            name: z
                .string()
                .min(3, 'El nombre es muy corto')
                .max(50, 'El nombre es muy largo'),
            attendance: z.string().refine((val) => val === '1' || val === '0', {
                message: 'Debes seleccionar una opción de asistencia'
            })
        }),
        handler: async (input) => {
            const confirmation = input.attendance === '1' ? 1 : 0
            const name = input.name.trim()
            const data = await turso.execute({
                sql: `INSERT INTO attendance (name, confirmation) VALUES (?, ?)`,
                args: [name, confirmation]
            })
            return 'success'
        }
    })
}
