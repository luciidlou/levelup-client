export const GamerManager = {
    async getGamers() {
        const headers = { headers: { 'Authorization': `Token ${localStorage.getItem('lu_token')}` } }
        const res = await fetch('http://localhost:8000/gamers', headers)
        return await res.json()
    }
}