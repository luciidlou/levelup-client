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
    }
}