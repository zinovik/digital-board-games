import React from 'react';
import { SiteLink } from './SiteLink';
import { Game } from '../types/game';

interface Props {
  ranks: number;
  games: Game[];
}

export const Games = ({ ranks, games }: Props) => (
  <>
    <div className="table">
      <div className="row header">
        <div className="cell ranks">Rank</div>
        <div className="cell game">Game</div>
        <div className="cell sites">Sites</div>
      </div>

      {games.map((game) => (
        <div className="row">
          <div className="cell ranks">{game.rank || `${ranks}+`}</div>
          <div className="cell game">{game.name}</div>
          <div className="cell sites">
            {game.sites.map((site) => (
              <SiteLink site={site} />
            ))}
          </div>
        </div>
      ))}
    </div>
  </>
);
