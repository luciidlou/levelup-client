import { useHistory } from 'react-router-dom'
import './GameList.css'

export const GameList = (props) => {
    const history = useHistory()
    return (
        <>
            <h2>Games</h2>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/games/new" })
                }}
            >Register New Game</button>
            <article className="games">
                {
                    props.games.map(game => {
                        return <section key={`game--${game.id}`} className="game">
                            <div className="game__title">{game.title}</div>
                            <div className="game__dev">{game.maker}</div>
                            <div className="game__players">{game.number_of_players === 1 ? `1 player needed` : `${game.number_of_players} players needed`}</div>
                            <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        </section>
                    })
                }
            </article>
        </>
    )
}