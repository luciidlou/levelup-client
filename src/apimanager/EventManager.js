export const EventManager = {
    async getEvents() {
        const headers = {
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        }
        const res = await fetch("http://localhost:8000/events", headers)
        return await res.json()
    },
    async getSingleEvent(id) {
        const headers = {
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        }
        const res = await fetch(`http://localhost:8000/events/${id}`, headers)
        return await res.json()
    },
    async createEvent(new_event) {
        const fetchOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(new_event)
        }
        const res = await fetch("http://localhost:8000/events", fetchOptions)
        return await res.json()
    },
    async UpdateEvent(id, edited_event) {
        const fetchOptions = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(edited_event)
        }
        const res = await fetch(`http://localhost:8000/events/${id}`, fetchOptions)
        return res
    },
    async deleteEvent(id) {
        const fetchOptions = {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        }
        return fetch(`http://localhost:8000/events/${id}`, fetchOptions)
    }
}