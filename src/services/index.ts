import { BGGGame, getBGGGamesRanks } from './bgg-games-ranks';
import { getDigitalBoardGames, NAME_ID_SEPARATOR } from './digital-board-games';
import { Game } from '../types/game';
import { siteConfigs, SiteTitle } from './site-configs';
import { FilterState } from '../types/filter-state';

const getNameAndId = (fullName: string): [string, string | undefined] => {
  const [name, id] = fullName.split(NAME_ID_SEPARATOR);

  return name ? [name, id] : ['', undefined];
};

const isSameGame = (
  bggGame: { id?: string; name: string },
  name: string,
  id: string | undefined
) => (id ? bggGame.id === id : bggGame.name === name);

const sortByRank = (
  { rank: rank1, name: name1 }: { rank: number; name: string },
  { rank: rank2, name: name2 }: { rank: number; name: string }
) => {
  if (!rank1 && !rank2) return name1.localeCompare(name2);
  if (!rank1) return 1;
  if (!rank2) return -1;

  return rank1 - rank2;
};

const mergeGames = (bggGames: BGGGame[], games: Game[]) =>
  bggGames.reduce(
    (acc, bggGame) =>
      acc.some(({ name, id }) => isSameGame(bggGame, name, id))
        ? acc
        : [
            ...acc,
            {
              ...bggGame,
              sites: [],
            },
          ],
    games
  );

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

  const digitalGames: Game[] = Object.entries(digitalBoardGames).map(
    ([key, value]): Game => {
      const [name, id] = getNameAndId(key);
      const sites = value.filter(
        (site) => filter.sites[getSiteData(site).title]
      );

      const bggGame = bggGamesRanks.games.find((bggGame) =>
        isSameGame(bggGame, name, id)
      );

      return {
        ...(bggGame ? bggGame : { rank: 0, name, id }),
        sites,
      };
    }
  );

  const games = filter.isWithoutImplementation
    ? mergeGames(bggGamesRanks.games, digitalGames)
    : digitalGames;

  return {
    ranks: bggGamesRanks.games.length,
    games: games.sort(sortByRank),
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
