export const GameManager = {
    async getGames() {
        const headers = {
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        }
        const res = await fetch("http://localhost:8000/games", headers)
        return await res.json()
    },
    async getSingleGame(id) {
        const headers = {
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        }
        const res = await fetch(`http://localhost:8000/games/${id}`, headers)
        return await res.json()
    },
    async createGame(new_game) {
        const fetchOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(new_game)
        }
        const res = await fetch("http://localhost:8000/games", fetchOptions)
        return await res.json()
    },
    async updateGame(id, edited_game) {
        const fetchOptions = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(edited_game)
        }
        const res = await fetch(`http://localhost:8000/games/${id}`, fetchOptions)
        return res
    },
    async deleteGame(id) {
        const fetchOptions = {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        }
        return fetch(`http://localhost:8000/games/${id}`, fetchOptions)
    }
}