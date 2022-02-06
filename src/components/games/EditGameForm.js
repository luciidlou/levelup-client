import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { GameManager } from "../../apimanager/GameManager"
import { GameTypeManager } from "../../apimanager/GameTypeManager"
import "./GameForm.css"
export const EditGameForm = (props) => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])
    const currentUserId = localStorage.getItem('userId')
    const { gameId } = useParams()
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [editedGame, setEditedGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })

    useEffect(() => {
        GameManager.getSingleGame(gameId).then((game) => setEditedGame({
            skillLevel: game.skill_level,
            numberOfPlayers: game.number_of_players,
            title: game.title,
            maker: game.maker,
            gameTypeId: game.game_type?.id
        }))
    }, [])



    useEffect(() => {
        GameTypeManager.getGameTypes().then(setGameTypes)
    }, [])


    const changeGameState = (event) => {
        const copy = { ...editedGame }
        const key = event.target.name
        const value = event.target.value
        copy[key] = value
        setEditedGame(copy)
    }

    const handleEditGame = (evt) => {
        // Prevent form from being submitted
        evt.preventDefault()

        const game = {
            maker: editedGame.maker,
            title: editedGame.title,
            number_of_players: parseInt(editedGame.numberOfPlayers),
            skill_level: parseInt(editedGame.skillLevel),
            game_type: parseInt(editedGame.gameTypeId),
            gamer: parseInt(currentUserId)
        }

        // Send POST request to your API
        GameManager.updateGame(gameId, game)
            .then(props.syncGames)
            .then(() => history.push("/games"))
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Edit {editedGame.title}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={editedGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required className="form-control"
                        value={editedGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number Of Players: </label>
                    <input min={1} max={100} type="number" name="numberOfPlayers" required className="form-control"
                        value={editedGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level (1-10): </label>
                    <input min={1} max={10} type="number" name="skillLevel" required className="form-control"
                        value={editedGame.skillLevel}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">What type of game? </label>
                    <select name="gameTypeId" required className="form-control"
                        value={editedGame.gameTypeId}
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
            <div className="btn-container">
                <button
                    type="submit"
                    onClick={handleEditGame}
                    className="btn btn-primary">Confirm edit</button>
                <button
                    type="reset"
                    onClick={() => history.push('/games')}
                    className="btn btn-primary">Cancel</button>
            </div>
        </form>
    )
}