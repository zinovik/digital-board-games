import { getBGGGamesRanks } from './bgg-games-ranks';
import { getDigitalBoardGames } from './digital-board-games';
import { Game } from '../types/game';
import { siteConfigs, SiteTitle } from './site-configs';
import { FilterState } from '../types/filter-state';

const NAME_ID_SEPARATOR = '|';

export const getGamesData = async (
  filter: FilterState,
  isForceUpdate?: boolean
): Promise<{
  ranks: number;
  games: Game[];
  date: string;
}> => {
  const [bggGamesRanks, digitalBoardGames] = await Promise.all([
    getBGGGamesRanks(isForceUpdate),
    getDigitalBoardGames(),
  ]);

  const games: Game[] = Object.entries(digitalBoardGames)
    .map(([name, sites]): Game => {
      const bggGame = bggGamesRanks.games.find((bggGame) =>
        name.includes(NAME_ID_SEPARATOR)
          ? bggGame.id === name.slice(name.indexOf(NAME_ID_SEPARATOR) + 1)
          : bggGame.name === name
      );

      return {
        rank: Number(bggGame?.rank) || 0,
        name,
        sites: sites.filter((site) => filter.sites[getSiteData(site).title]),
        year: bggGame?.year,
        id: bggGame?.id,
      };
    })
    .sort(({ rank: rank1, name: name1 }, { rank: rank2, name: name2 }) => {
      if (!rank1 && !rank2) return name1.localeCompare(name2);
      if (!rank1) return 1;
      if (!rank2) return -1;

      return rank1 - rank2;
    });

  return {
    ranks: bggGamesRanks.games.length,
    games: filter.isWithoutImplementation
      ? games
      : games.filter((game) => game.sites.length > 0),
    date: bggGamesRanks.date,
  };
};

export const getSiteData = (
  site: string
): { icon: string; title: SiteTitle } => {
  const siteConfig = siteConfigs.find(({ urlParts }) =>
    urlParts.some((urlPart) => site.includes(urlPart))
  );

  if (!siteConfig) {
    throw new Error(`The site is not found: ${site}`);
  }

  return {
    icon: siteConfig.icon,
    title: siteConfig.title,
  };
};
