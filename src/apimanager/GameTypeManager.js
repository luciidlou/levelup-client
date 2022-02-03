export const GameTypeManager = {
    async getGameTypes() {
        const headers = { headers: { 'Authorization': `Token ${localStorage.getItem('lu_token')}` } }
        const res = await fetch('http://localhost:8000/gametypes', headers)
        return await res.json()
    }
}