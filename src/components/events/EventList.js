import moment from 'moment'
import { useHistory } from 'react-router-dom'
import { EventManager } from '../../apimanager/EventManager'
import "./EventList.css"

export const EventList = (props) => {
    const history = useHistory()

    const handleDeleteEvent = (id) => {
        EventManager.deleteEvent(id).then(props.syncEvents)
    }

    const handleJoinEvent = (id) => {
        EventManager.joinEvent(id)
            .then(props.syncEvents)
    }
    const handleLeaveEvent = (id) => {
        EventManager.leaveEvent(id)
            .then(props.syncEvents)
    }

    return (
        <>
            <h2>Events</h2>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/events/new" })
                }}
            >Create New Event</button>
            <article className="events">
                {
                    props.events.map(event => {
                        const organizerName = `${event.organizer.user.first_name} ${event.organizer.user.last_name}`
                        return (
                            <section className="event" key={`event--${event.id}`}>
                                <div className="event__description">{event.description}</div>
                                <div className="event__game">Game: {event.game.title}</div>
                                <div className="event__organizer">Organized by: {organizerName}</div>
                                <div className="event__date">Date: {moment(`${event.date} ${event.time}`, 'YYYY-MM-DD HH:mm:s').format('LLL')}</div>
                                <div className='btn-container'>
                                    {
                                        event.joined
                                            ?
                                            <button className='btn edit-btn' onClick={() => handleLeaveEvent(event.id)}>Leave event</button>
                                            :
                                            <button className='btn edit-btn' onClick={() => handleJoinEvent(event.id)}>Join event</button>
                                    }
                                    <button className='btn edit-btn' onClick={() => history.push(`/events/${event.id}/edit`)}>Edit event</button>
                                    <button className='btn edit-btn' onClick={() => handleDeleteEvent(event.id)}>Delete event</button>
                                </div>
                            </section>
                        )
                    })
                }
            </article>
        </>
    )
}