import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
    try {
        const { password } = await req.json()
        const secret = Deno.env.get('CLANCY_SECRET')

        if (password === secret) {
            return new Response(
                JSON.stringify({ access: true, token: 'valid-session' }),
                { headers: { "Content-Type": "application/json" } },
            )
        } else {
            return new Response(
                JSON.stringify({ error: 'Invalid credentials' }),
                { status: 401, headers: { "Content-Type": "application/json" } },
            )
        }
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } },
        )
    }
})
