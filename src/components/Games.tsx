import { SiteLink } from './SiteLink';
import { Game } from '../types/game';

interface Props {
  ranks: number;
  games: Game[];
}

export const Games = ({ ranks, games }: Props) => (
  <div style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
    <div className="row header">
      <div className="cell rank">Rank</div>
      <div className="cell game">Game</div>
      <div className="cell sites">Sites</div>
    </div>

    {games.map((game) => (
      <div className="row">
        <div className="cell rank">{game.rank || `${ranks}+`}</div>
        <div className="cell game">
          <a
            href={`https://boardgamegeek.com/${
              game.id ? `boardgame/${game.id}` : `browse/boardgame`
            }`}
            target="_blank"
            rel="noreferrer"
          >{`${game.name}${game.year ? ` (${game.year})` : ''}`}</a>
        </div>
        <div className="cell sites">
          {game.sites.map((site) => (
            <SiteLink site={site} />
          ))}
        </div>
      </div>
    ))}
  </div>
);
