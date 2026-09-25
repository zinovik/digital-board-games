import { getBGGGamesRanks } from './bgg-games-ranks';
import { getDigitalBoardGames, NAME_ID_SEPARATOR } from './digital-board-games';
import { Game } from '../types/game';
import { siteConfigs, SiteTitle } from './site-configs';
import { FilterState } from '../types/filter-state';

const sortByRank = (
  { rank: rank1, name: name1 }: { rank: number; name: string },
  { rank: rank2, name: name2 }: { rank: number; name: string },
) => {
  if (!rank1 && !rank2) return name1.localeCompare(name2);
  if (!rank1) return 1;
  if (!rank2) return -1;

  return rank1 - rank2;
};

export const getGames = async (): Promise<Game[]> => {
  const [bggGamesRanks, digitalBoardGames] = await Promise.all([
    getBGGGamesRanks(),
    getDigitalBoardGames(),
  ]);

  const usedDigitalBoardGames = new Set();

  const games = bggGamesRanks.map((bggGame) => {
    const idKey = `${bggGame.name}${NAME_ID_SEPARATOR}${bggGame.id}`;

    const digitalBoardGame =
      digitalBoardGames[idKey] ?? digitalBoardGames[bggGame.name];

    if (digitalBoardGame) {
      usedDigitalBoardGames.add(
        digitalBoardGames[idKey] ? idKey : bggGame.name,
      );
    }

    return {
      ...bggGame,
      sites: digitalBoardGame ?? [],
    };
  });

  const unusedDigitalGames = Object.keys(digitalBoardGames).filter(
    (key) => !usedDigitalBoardGames.has(key),
  );

  return [
    ...games,
    ...unusedDigitalGames.map((key) => ({
      name: key.split(NAME_ID_SEPARATOR)[0],
      sites: digitalBoardGames[key],
      rank: 0,
    })),
  ].sort(sortByRank);
};

export const getSiteData = (
  site: string,
): { icon: string; title: SiteTitle } => {
  const siteConfig = siteConfigs.find(({ urlParts }) =>
    urlParts.some((urlPart) => site.includes(urlPart)),
  );

  if (!siteConfig) {
    throw new Error(`The site is not found: ${site}`);
  }

  return {
    icon: siteConfig.icon,
    title: siteConfig.title,
  };
};

export const filterGames = (games: Game[], filter: FilterState): Game[] => {
  const result: Game[] = [];

  for (const game of games) {
    const sites = game.sites.filter(
      (site) => filter.sites[getSiteData(site).title],
    );

    if (filter.isAlsoShowGamesWithoutImplementation || sites.length > 0) {
      result.push({
        ...game,
        sites,
      });
    }
  }

  return result;
};
