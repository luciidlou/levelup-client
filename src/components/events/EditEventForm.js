import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { EventManager } from "../../apimanager/EventManager"
import './EventForm.css'
export const EditEventForm = (props) => {
    const history = useHistory()
    const { eventId } = useParams()
    const [newEvent, updateNewEvent] = useState({
        description: "",
        date: "",
        time: "",
        gameId: 0,
        organizerId: 0
    })

    useEffect(() => {
        EventManager.getSingleEvent(eventId).then(event => updateNewEvent({
            description: event.description,
            date: event.date,
            time: event.time,
            gameId: event.game?.id,
            organizerId: parseInt(localStorage.getItem("userId"))
        }))
    }, [])

    const handleOnChange = (event) => {
        const copy = { ...newEvent }
        const key = event.target.name
        const value = event.target.value
        copy[key] = value
        updateNewEvent(copy)
    }

    const handleSubmitEvent = (evt) => {
        evt.preventDefault()

        const event = {
            description: newEvent.description,
            date: newEvent.date,
            time: newEvent.time,
            game: parseInt(newEvent.gameId),
            organizer: newEvent.organizerId
        }

        EventManager.UpdateEvent(eventId, event)
            .then(props.syncEvents)
            .then(() => history.push("/events"))
    }


    return (
        <form className="form">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Describe your event:</label>
                    <textarea
                        type="text"
                        name="description"
                        className="form-control"
                        value={newEvent.description}
                        onChange={handleOnChange}>
                    </textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Choose a game:</label>
                    <select
                        type="text"
                        name="gameId"
                        className="form-control"
                        value={newEvent.gameId}
                        onChange={handleOnChange}>
                        <option value={0}>Select a game...</option>
                        {
                            props.games.map(game => <option key={game.id} value={game.id}>{game.title}</option>)
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">What day is your event?</label>
                    <input
                        type="date"
                        name="date"
                        className="form-control"
                        value={newEvent.date}
                        onChange={handleOnChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">What time?</label>
                    <input
                        type="time"
                        name="time"
                        className="form-control"
                        value={newEvent.time}
                        onChange={handleOnChange}
                    />
                </div>
            </fieldset>
            <div className="btn-container">
                <button type="submit"
                    onClick={handleSubmitEvent}
                    className="btn btn-primary">Confirm edit</button>
                <button type="submit"
                    onClick={() => history.push('/events')}
                    className="btn btn-primary">Cancel</button>
            </div>
        </form>
    )
}