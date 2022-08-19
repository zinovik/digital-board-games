import boargamearenaIcon from '../icons/boargamearena.jpg';
import yucataIcon from '../icons/yucata.jpg';
import boiteajeuxIcon from '../icons/boiteajeux.jpg';
import mattleIcon from '../icons/mattle.png';
import brettspielweltIcon from '../icons/brettspielwelt.jpg';
import happyMeeple from '../icons/happymeeple.png';
import tabletopiaIcon from '../icons/tabletopia.png';
import tabletopSimulatorIcon from '../icons/tabletopsimulator.png';
import androidIcon from '../icons/android.svg';
import iosIcon from '../icons/ios.png';
import steamIcon from '../icons/steam.png';
import desktopIcon from '../icons/desktop.png';
import webIcon from '../icons/web.webp';

export const siteConfigs = [
  {
    title: 'Board Game Arena',
    urlParts: ['boardgamearena.com'],
    icon: boargamearenaIcon,
  },
  {
    title: 'Yucata',
    urlParts: ['yucata.de'],
    icon: yucataIcon,
  },
  {
    title: 'Boite a Jeux',
    urlParts: ['boiteajeux.net'],
    icon: boiteajeuxIcon,
  },
  {
    title: 'Mattle',
    urlParts: ['mattle.online'],
    icon: mattleIcon,
  },
  {
    title: 'Brettspiel Welt',
    urlParts: ['brettspielwelt.de'],
    icon: brettspielweltIcon,
  },
  {
    title: 'Happy Meeple',
    urlParts: ['happymeeple.com'],
    icon: happyMeeple,
  },
  {
    title: 'Tabletopia',
    urlParts: ['tabletopia.com'],
    icon: tabletopiaIcon,
  },
  {
    title: 'Tabletop Simulator',
    urlParts: ['/Tabletop_Simulator__', 'steamcommunity.com/sharedfiles'],
    icon: tabletopSimulatorIcon,
  },
  {
    title: 'Android',
    urlParts: ['play.google.com'],
    icon: androidIcon,
  },
  {
    title: 'iOS',
    urlParts: ['apps.apple.com'],
    icon: iosIcon,
  },
  {
    title: 'Steam',
    urlParts: ['store.steampowered.com'],
    icon: steamIcon,
  },
  {
    title: 'Desktop',
    urlParts: ['keldon.net', 'lantsev1981.pro', 'boardgamegeek.com/guild/1733'],
    icon: desktopIcon,
  },
  {
    title: 'Web',
    urlParts: ['http'],
    icon: webIcon,
  },
] as const;

export const siteTitles = siteConfigs.map(({ title }) => title);
export type SiteTitle = typeof siteTitles[number];
