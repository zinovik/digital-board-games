import boargamearenaIcon from '../icons/boargamearena.jpg';
import yucataIcon from '../icons/yucata.jpg';
import boiteajeuxIcon from '../icons/boiteajeux.jpg';
import mattleIcon from '../icons/mattle.png';
import brettspielweltIcon from '../icons/brettspielwelt.jpg';
import happyMeeple from '../icons/happymeeple.png';
import tabletopiaIcon from '../icons/tabletopia.png';
import androidIcon from '../icons/android.svg';
import iosIcon from '../icons/ios.png';
import steamIcon from '../icons/steam.png';
import desktopIcon from '../icons/desktop.png';
import webIcon from '../icons/web.webp';

export const SELECT_ALL = 'Select All';
export const SHOW_ALL_GAMES = 'Show All Games in the List';
export const SHOW_ALL_GAMES_ID = 'sa';

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
    title: 'Mattle',
    urlParts: ['mattle.online'],
    icon: mattleIcon,
    id: 'ma',
  },
  {
    title: 'Brettspiel Welt',
    urlParts: ['brettspielwelt.de'],
    icon: brettspielweltIcon,
    id: 'bw',
  },
  {
    title: 'Happy Meeple',
    urlParts: ['happymeeple.com'],
    icon: happyMeeple,
    id: 'hm',
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

export type SiteTitle = typeof siteTitles[number];
