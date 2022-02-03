import './EventList.css'

export const EventList = (props) => {
    return (
        <>
        <h2>Events</h2>
        <article className="events">
            {
                props.events.map(event => {
                    const organizerName = `${event.organizer.user.first_name} ${event.organizer.user.last_name}`
                    return (
                        <section className="event" key={`event--${event.id}`}>
                            <div className="event__description">{event.description}</div>
                            <div className="event__game">Game: {event.game.title}</div>
                            <div className="event__organizer">Organized by: {organizerName}</div>
                        </section>
                    )
                })
            }
        </article>
        </>
    )
}