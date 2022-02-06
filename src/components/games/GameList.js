import { useHistory } from 'react-router-dom'
import { GameManager } from '../../apimanager/GameManager'
import './GameList.css'

export const GameList = (props) => {
    const history = useHistory()

    const handleDeleteGame = (id) => {
        GameManager.deleteGame(id)
            .then(props.syncGames)
            .then(props.syncEvents)
    }

    return (
        <>
            <h2>Games</h2>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => history.push("/games/new")}>Register New Game</button>
            <article className="games">
                {
                    props.games.map(game => {
                        return <section key={`game--${game.id}`} className="game">
                            <div className="game__title">{game.title} ({game.game_type?.label})</div>
                            <div className="game__dev">{game.maker}</div>
                            <div className="game__players">{game.number_of_players === 1 ? `1 player needed` : `${game.number_of_players} players needed`}</div>
                            <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                            <div className='btn-container'>
                                <button className='btn edit-btn' onClick={() => history.push(`/games/${game.id}/edit`)}>Edit game</button>
                                <button className='btn edit-btn' onClick={() => handleDeleteGame(game.id)}>Delete game</button>
                            </div>
                        </section>
                    })
                }
            </article>
        </>
    )
}