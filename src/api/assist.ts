import type { APIRoute } from 'astro'
import { turso } from '@/lib/turso'

type RequestData = {
    name: string
    message: string
    confirm: boolean
}

export const POST: APIRoute = async ({ request }) => {
    try {
        const data: RequestData = await request.json()
        const { name, message, confirm } = data

        if (!name || !confirm) {
            return new Response(
                JSON.stringify({ error: 'Name and confirm required' }),
                { status: 400 }
            )
        }

        await turso.execute({
            sql: `INSERT INTO contactos (name, message, confirm) VALUES (?, ?, ?)`,
            args: [name, message, confirm]
        })

        return new Response(JSON.stringify({ success: true }), { status: 200 })
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500
        })
    }
}
