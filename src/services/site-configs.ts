import boargamearenaIcon from '../icons/boargamearena.jpg';
import yucataIcon from '../icons/yucata.jpg';
import boiteajeuxIcon from '../icons/boiteajeux.jpg';
import boardgamecoreIcon from '../icons/boardgamecore.png';
import boardgamersspaceIcon from '../icons/boardgamersspace.svg';
import mattleIcon from '../icons/mattle.png';
import brettspielweltIcon from '../icons/brettspielwelt.jpg';
import boardspaceIcon from '../icons/boardspace.jpg';
import happyMeeple from '../icons/happymeeple.png';
import sovrantiIcon from '../icons/sovranti.avif';
import tabletopiaIcon from '../icons/tabletopia.png';
import androidIcon from '../icons/android.svg';
import iosIcon from '../icons/ios.png';
import steamIcon from '../icons/steam.png';
import desktopIcon from '../icons/desktop.png';
import webIcon from '../icons/web.webp';

export const SELECT_ALL = 'Select all';
export const ALSO_SHOW_GAMES_WITHOUT_IMPLEMENTATION =
  'Also, show the games without implementation on selected sites';
export const ALSO_SHOW_GAMES_WITHOUT_IMPLEMENTATION_ID = 'sa';

export const siteConfigs = [
  {
    title: 'Board Game Arena',
    urlParts: ['boardgamearena.com'],
    icon: boargamearenaIcon,
    id: 'ba',
  },
  {
    title: 'Yucata',
    urlParts: ['yucata.de'],
    icon: yucataIcon,
    id: 'yu',
  },
  {
    title: 'Boite a Jeux',
    urlParts: ['boiteajeux.net'],
    icon: boiteajeuxIcon,
    id: 'bj',
  },
  {
    title: 'Board Game Core',
    urlParts: ['boardgamecore.net'],
    icon: boardgamecoreIcon,
    id: 'bc',
  },
  {
    title: 'Board Games Space',
    urlParts: ['boardgamers.space'],
    icon: boardgamersspaceIcon,
    id: 'bs',
  },
  {
    title: 'Happy Meeple',
    urlParts: ['happymeeple.com'],
    icon: happyMeeple,
    id: 'hm',
  },
  {
    title: 'Brettspiel Welt',
    urlParts: ['brettspielwelt.de'],
    icon: brettspielweltIcon,
    id: 'bw',
  },
  {
    title: 'Board Space',
    urlParts: ['boardspace.net'],
    icon: boardspaceIcon,
    id: 'bp',
  },
  {
    title: 'Mattle',
    urlParts: ['mattle.online'],
    icon: mattleIcon,
    id: 'ma',
  },
  {
    title: 'Sovranti',
    urlParts: ['sovranti.com'],
    icon: sovrantiIcon,
    id: 'so',
  },
  {
    title: 'Tabletopia',
    urlParts: ['tabletopia.com'],
    icon: tabletopiaIcon,
    id: 'tt',
  },
  {
    title: 'Android',
    urlParts: ['play.google.com'],
    icon: androidIcon,
    id: 'an',
  },
  {
    title: 'iOS',
    urlParts: ['apps.apple.com'],
    icon: iosIcon,
    id: 'io',
  },
  {
    title: 'Steam',
    urlParts: ['store.steampowered.com'],
    icon: steamIcon,
    id: 'st',
  },
  {
    title: 'Desktop',
    urlParts: ['keldon.net', 'lantsev1981.pro', 'boardgamegeek.com/guild/1733'],
    icon: desktopIcon,
    id: 'de',
  },
  {
    title: 'Web',
    urlParts: ['http'],
    icon: webIcon,
    id: 'we',
  },
] as const;

const siteTitles = siteConfigs.map(({ title }) => title);

export type SiteTitle = (typeof siteTitles)[number];
