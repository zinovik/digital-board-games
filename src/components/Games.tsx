import { SiteLink } from './SiteLink';
import { Game } from '../types/game';

interface Props {
  games: Game[];
}

export const Games = ({ games }: Props) => (
  <div style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
    <div className="row header">
      <div className="cell rank">Rank</div>
      <div className="cell game">Game</div>
      <div className="cell sites">Sites</div>
    </div>

    {games.map((game) => (
      <div className="row" key={`${game.name}${game.id}`}>
        <div className="cell rank">{game.rank}</div>
        <a
          className="cell game"
          href={`https://boardgamegeek.com/${
            game.id
              ? `boardgame/${game.id}`
              : `geeksearch.php?action=search&objecttype=boardgame&q=${game.name}`
          }`}
          target="_blank"
          rel="noreferrer"
        >{`${game.name}${game.year ? ` (${game.year})` : ''}`}</a>
        <div
          className="cell"
          style={{
            fontSize: '0.7rem',
            margin: 'auto',
            fontWeight: 'bold',
            color: game.average
              ? game.average >= 8
                ? '#1d804c'
                : game.average >= 7
                  ? '#1978b3'
                  : game.average >= 5
                    ? '#5369a2'
                    : 'black'
              : 'black',
          }}
        >
          {game.average?.toFixed(3)}, {game.usersRated}k
        </div>
        <div className="cell sites">
          {game.sites.map((site) => (
            <SiteLink site={site} key={site} />
          ))}
        </div>
      </div>
    ))}
  </div>
);
