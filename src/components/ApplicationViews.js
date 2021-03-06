import React, { useEffect, useState } from "react"
import { Route } from "react-router-dom"
import { EventManager } from "../apimanager/EventManager"
import { GameManager } from "../apimanager/GameManager"
import { GamerManager } from "../apimanager/GamerManager"
import { EditEventForm } from "./events/EditEventForm"
import { EventForm } from "./events/EventForm"
import { EventList } from "./events/EventList"
import { EditGameForm } from "./games/EditGameForm"
import { GameForm } from "./games/GameForm"
import { GameList } from "./games/GameList"

export const ApplicationViews = () => {
    const [games, setGames] = useState([])
    const [events, setEvents] = useState([])
    const [gamers, setGamers] = useState([])

    const syncGames = () => {
        GameManager.getGames().then(setGames)
    }

    const syncEvents = () => {
        EventManager.getEvents().then(setEvents)
    }

    const syncGamers = () => {
        GamerManager.getGamers().then(setGamers)
    }

    useEffect(() => {
        syncGames()
        syncEvents()
        syncGamers()
    }, [])

    return <>
        <main>
            <Route exact path={[`/`, `/games`]}>
                <GameList
                    games={games}
                    syncGames={syncGames}
                    events={events}
                    syncEvents={syncEvents}
                    gamers={gamers}
                    syncGamers={syncGamers}
                />
            </Route>
            <Route exact path="/events">
                <EventList
                    games={games}
                    syncGames={syncGames}
                    events={events}
                    syncEvents={syncEvents}
                    gamers={gamers}
                    syncGamers={syncGamers}
                />
            </Route>
            <Route exact path="/games/new">
                <GameForm
                    syncGames={syncGames}
                />
            </Route>
            <Route exact path="/games/:gameId(\d+)/edit">
                <EditGameForm
                    syncGames={syncGames}
                    games={games}
                />
            </Route>
            <Route exact path="/events/new">
                <EventForm
                    syncEvents={syncEvents}
                    games={games}
                />
            </Route>
            <Route exact path="/events/:eventId(\d+)/edit">
                <EditEventForm
                    syncEvents={syncEvents}
                    games={games}
                />
            </Route>
        </main>
    </>
}
