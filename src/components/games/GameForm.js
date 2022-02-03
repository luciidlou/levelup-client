import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { GameManager } from "../../apimanager/GameManager.js"
import { GameTypeManager } from "../../apimanager/GameTypeManager.js"


export const GameForm = (props) => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])
    const currentUserId = localStorage.getItem('userId')
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })

    useEffect(() => {
        GameTypeManager.getGameTypes().then(setGameTypes)
    }, [])

    const changeGameState = (event) => {
        const copy = { ...currentGame }
        const key = event.target.name
        const value = event.target.value
        copy[key] = value
        setCurrentGame(copy)
    }

    const handleSubmitGame = (evt) => {
        // Prevent form from being submitted
        evt.preventDefault()

        const game = {
            maker: currentGame.maker,
            title: currentGame.title,
            number_of_players: parseInt(currentGame.numberOfPlayers),
            skill_level: parseInt(currentGame.skillLevel),
            game_type: parseInt(currentGame.gameTypeId),
            gamer: parseInt(currentUserId)
        }

        // Send POST request to your API
        GameManager.createGame(game)
            .then(props.syncGames)
            .then(() => history.push("/games"))
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number Of Players: </label>
                    <input min={1} max={100} type="number" name="numberOfPlayers" required className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level (1-10): </label>
                    <input min={1} max={10} type="number" name="skillLevel" required className="form-control"
                        value={currentGame.skillLevel}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Skill Level: </label>
                    <select name="gameTypeId" required className="form-control"
                        value={currentGame.gameTypeId}
                        onChange={changeGameState}>
                        <option value={0}>Choose a game type...</option>
                        {
                            gameTypes.map(gameType => {
                                return (
                                    <option key={gameType.id} value={gameType.id}>{gameType.label}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </fieldset>
            <button type="submit"
                onClick={handleSubmitGame}
                className="btn btn-primary">Create</button>
        </form>
    )
}