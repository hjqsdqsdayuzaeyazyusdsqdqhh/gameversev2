import type { Game, Category } from "@/types";
export type { Game, Category };

export type GameSource = "onlinegames" | "freesgames" | "mock";

export interface GameFetchResult {
  games: Game[];
  source: GameSource;
  cached: boolean;
}

const cache = new Map<string, { data: Game[]; ts: number }>();
const CACHE_TTL = 1000 * 60 * 30;

const realEmbeds: string[] = [
  "https://cloud.onlinegames.io/games/2022/unity/drako-io/game.html",
  "https://www.onlinegames.io/games/2021/unity/stack-fire-ball/index.html",
  "https://www.onlinegames.io/games/2021/3/love-tester/index.html",
  "https://www.onlinegames.io/games/2024/unity/drift-king/index.html",
  "https://www.onlinegames.io/games/2022/unity/highway-traffic/index.html",
  "https://cloud.onlinegames.io/games/2024/unity3/stickman-gta-city/index-og.html",
  "https://www.onlinegames.io/games/2023/unity2/gta-simulator/index.html",
  "https://cloud.onlinegames.io/games/2024/construct/219/stickman-parkour/index-og.html",
  "https://cloud.onlinegames.io/games/2026/construct/328/golf-bit/game.html",
  "https://www.onlinegames.io/games/2022/unity2/masked-special-forces/index.html",
  "https://www.onlinegames.io/games/2023/unity2/cs-online/index.html",
  "https://cloud.onlinegames.io/games/2023/unity2/real-flight-simulator/index.html",
  "https://www.onlinegames.io/games/2024/code/6/get-on-top/index.html",
  "https://cloud.onlinegames.io/games/2025/unity4/dublix/game-og.html",
  "https://www.onlinegames.io/games/2023/unity/madalin-stunt-cars-pro/index.html",
  "https://cloud.onlinegames.io/games/2026/unity/velocity-rush/game.html",
  "https://www.onlinegames.io/games/2023/q2/capybara-clicker-pro/index.html",
  "https://cloud.onlinegames.io/games/2026/more/snaker-io/game.html",
  "https://www.onlinegames.io/games/2023/unity2/guerrillas-io/index.html",
  "https://www.onlinegames.io/games/2023/unity/drift-hunters-pro/index.html",
  "https://www.onlinegames.io/games/2021/unity2/wasteland-shooters/index.html",
  "https://cloud.onlinegames.io/games/2025/unity2/escape-car/index-og.html",
  "https://www.onlinegames.io/games/2023/unity3/drift-rider/index.html",
  "https://www.onlinegames.io/games/2022/unity/edys-car-simulator/index.html",
  "https://cloud.onlinegames.io/games/2025/html/cube-worlds/index-og.html",
  "https://www.onlinegames.io/games/2022/unity3/basketball-io/index.html",
  "https://cloud.onlinegames.io/games/2024/unity2/fps-strike/index-og.html",
  "https://cloud.onlinegames.io/games/2025/unity/tile-match/index-og.html",
  "https://www.onlinegames.io/games/2021/unity3/stickman-destruction/index.html",
  "https://www.onlinegames.io/games/2023/construct/198/car-football/index.html",
  "https://www.onlinegames.io/games/2023/unity/crazy-strike-force/index.html",
  "https://cloud.onlinegames.io/games/2024/unity2/super-car-driving/index-og.html",
  "https://cloud.onlinegames.io/games/2024/unity/burnout-city/index-og.html",
  "https://cloud.onlinegames.io/games/2024/construct/311/basket-hoop/index-og.html",
  "https://www.onlinegames.io/games/2024/code/2/drunken-duel/index.html",
  "https://www.onlinegames.io/games/2022/unity4/cat-simulator/index.html",
  "https://cloud.onlinegames.io/games/2024/unity3/warstrike/index-og.html",
  "https://cloud.onlinegames.io/games/2025/unity/fast-food-rush/index-og.html",
  "https://www.onlinegames.io/games/2024/unity/highway-racer-pro/index.html",
  "https://cloud.onlinegames.io/games/2026/unity/99-nights-in-the-forest-survival/game.html",
  "https://www.onlinegames.io/games/2021/3/police-chase-drifter/index.html",
  "https://cloud.onlinegames.io/games/2024/construct/289/egg-car-racing/index-og.html",
  "https://www.onlinegames.io/games/2022/unity3/blocky-blast/index.html",
  "https://cloud.onlinegames.io/games/2026/unity/fall-brainrots/game.html",
  "https://www.onlinegames.io/games/2021/4/limousine-simulator/index.html",
  "https://cloud.onlinegames.io/games/2024/construct/225/love-tester-story/index-og.html",
  "https://www.onlinegames.io/games/2021/unity3/masked-forces-zombie-survival/index.html",
  "https://cloud.onlinegames.io/games/2024/unity3/block-blast/index-og.html",
  "https://www.onlinegames.io/games/2022/construct/134/f1-drift-racer/index.html",
  "https://cloud.onlinegames.io/games/2025/unity4/cubecraft-survival/index-og.html",
  "https://cloud.onlinegames.io/games/2026/unity/backflip-challenge/game.html",
  "https://www.onlinegames.io/games/2023/unity/hero-rush-tower-defense/index.html",
  "https://cloud.onlinegames.io/games/2024/unity2/survival-island/index-og.html",
  "https://cloud.onlinegames.io/games/2025/unity/nuts-and-bolts-puzzle/index-og.html",
  "https://cloud.onlinegames.io/games/2024/unity2/troll-level/index-og.html",
  "https://www.onlinegames.io/games/2022/unity3/crazy-drifter/index.html",
  "https://cloud.onlinegames.io/games/2025/construct/213/rooftop-duel/index-og.html",
  "https://www.onlinegames.io/games/2022/construct/153/kick-the-dummy/index.html",
  "https://cloud.onlinegames.io/games/2021/unity/mini-cars-racing/index-og.html",
  "https://www.onlinegames.io/games/2022/unity3/crazy-parking-fury/index.html",
  "https://www.onlinegames.io/games/2023/construct/280/head-soccer-2022/index.html",
  "https://cloud.onlinegames.io/games/2025/unity3/chess/index-og.html",
  "https://www.onlinegames.io/games/2022/unity/taxi-simulator/index.html",
  "https://www.onlinegames.io/games/2023/code/four-colors/index.html",
  "https://www.onlinegames.io/games/2022/unity3/8-ball-pool-billiard/index.html",
  "https://www.onlinegames.io/games/2022/unity/bus-subway-runner/index.html",
  "https://www.onlinegames.io/games/2022/unity4/subway-idle-3d/index.html",
  "https://cloud.onlinegames.io/games/2024/construct/316/basketball-king/index-og.html",
  "https://www.onlinegames.io/games/2024/unity/stunt-rider/index.html",
  "https://www.onlinegames.io/games/2021/unity/rome-simulator/index.html",
  "https://cloud.onlinegames.io/games/2024/construct/314/nova-clicker/index-og.html",
  "https://www.onlinegames.io/games/2021/unity/army-combat/index.html",
  "https://cloud.onlinegames.io/games/2025/unity/voxel-world/index-og.html",
  "https://www.onlinegames.io/games/2023/unity2/car-wash/index.html",
  "https://cloud.onlinegames.io/games/2025/unity4/fast-food-manager/index-og.html",
  "https://www.onlinegames.io/games/2021/unity/motorbike-traffic/index.html",
  "https://www.onlinegames.io/games/2023/unity2/offroad-rally/index.html",
  "https://www.onlinegames.io/games/2022/unity3/fort-drifter/index.html",
  "https://cloud.onlinegames.io/games/2025/unity/monster-survivors/index-og.html",
  "https://www.onlinegames.io/games/2022/unity4/burnout-drift-hunter/index.html",
  "https://cloud.onlinegames.io/games/2021/4/draw-the-car-path/index-og.html",
  "https://cloud.onlinegames.io/games/2024/unity/kawaii-shooter/index-og.html",
  "https://www.onlinegames.io/games/2023/construct/235/trains-io/index.html",
  "https://www.onlinegames.io/games/2021/unity/atv-highway-traffic/index.html",
  "https://www.onlinegames.io/games/2022/unity3/2-player-crazy-racer/index.html",
  "https://cloud.onlinegames.io/games/2026/unity/steal-brainrot-heist/game.html",
  "https://www.onlinegames.io/games/2024/construct/226/football-king/index.html",
  "https://cloud.onlinegames.io/games/2021/unity/motorbike-stunt-simulator/index-og.html",
  "https://cloud.onlinegames.io/games/2025/unity3/crazy-cattle-3d/index-og.html",
  "https://www.onlinegames.io/games/2023/construct/211/highway-cars/index.html",
  "https://cloud.onlinegames.io/games/2025/html/solitaire/index-og.html",
  "https://www.onlinegames.io/games/2021/unity/moto-trials/index.html",
  "https://cloud.onlinegames.io/games/2024/unity3/survival-karts/index-og.html",
  "https://www.onlinegames.io/games/2022/unity3/powerslide-kart-simulator/index.html",
  "https://www.onlinegames.io/games/2022/unity2/urban-sniper/index.html",
  "https://cloud.onlinegames.io/games/2021/1/julie-beauty-salon/index-og.html",
  "https://www.onlinegames.io/games/2021/4/neon-racer/index.html",
  "https://www.onlinegames.io/games/2021/1/deer-hunter/index.html",
  "https://www.onlinegames.io/games/2021/unity2/basketball-slam-dunk/index.html",
  "https://www.onlinegames.io/games/2023/unity/hero-dragon-power/index.html",
  "https://www.onlinegames.io/games/2021/1/sniper-elite/index.html",
  "https://www.onlinegames.io/games/2022/unity/survival-craft/index.html",
  "https://www.onlinegames.io/games/2022/unity/fnf-funk-3d/index.html",
  "https://cloud.onlinegames.io/games/2021/2/futuristic-racer/index-og.html",
  "https://www.onlinegames.io/games/2022/unity2/highway-racer-2/index.html",
  "https://cloud.onlinegames.io/games/2025/unity/mahjong/index-og.html",
  "https://www.onlinegames.io/games/2023/construct/200/snake-football/index.html",
  "https://www.onlinegames.io/games/2023/construct/234/among-impostor/index.html",
  "https://cloud.onlinegames.io/games/2025/unity/cookie-clicker-pro/index-og.html",
  "https://www.onlinegames.io/games/2021/4/draw-the-bridge/index.html",
  "https://www.onlinegames.io/games/2023/unity3/city-stunts/index.html",
  "https://www.onlinegames.io/games/2023/unity/drift-fury/index.html",
  "https://cloud.onlinegames.io/games/2025/construct/293/tank-arena/index-og.html",
  "https://cloud.onlinegames.io/games/2022/unity3/poly-racing-cars/index-og.html",
  "https://cloud.onlinegames.io/games/2026/construct/339/jungle-mart/game.html",
  "https://www.onlinegames.io/games/2021/unity/jacks-village/index.html",
  "https://cloud.onlinegames.io/games/2021/2/monster-truck-mountain-climb/index-og.html",
  "https://www.onlinegames.io/games/2022/construct/129/secret-sniper-agent/index.html",
  "https://www.onlinegames.io/games/2021/unity2/pinball-simulator/index.html",
  "https://www.onlinegames.io/games/2021/unity3/stunt-simulator-2/index.html",
  "https://cloud.onlinegames.io/games/2025/html/global-guesser/index-og.html#/",
  "https://www.onlinegames.io/games/2023/unity3/idle-dev-startup/index.html",
  "https://cloud.onlinegames.io/games/2025/construct/335/cool-brainrot-clicker/index-og.html",
  "https://www.onlinegames.io/games/2021/unity2/bandits-multiplayer-pvp/index.html",
  "https://cloud.onlinegames.io/games/2024/phaser/snake/index-og.html",
  "https://www.onlinegames.io/games/2022/unity3/stick-guys-defense/index.html",
  "https://www.onlinegames.io/games/2024/unity/crazy-karts/index.html",
  "https://www.onlinegames.io/games/2022/construct/145/speedrun-parkour/index.html",
  "https://www.onlinegames.io/games/2022/unity/mech-shooter/index.html",
  "https://www.onlinegames.io/games/2021/unity3/american-touchdown/index.html",
  "https://www.onlinegames.io/games/2022/unity/cobraz-io-classic/index.html",
  "https://www.onlinegames.io/games/2021/3/princess-influencer-salon/index.html",
  "https://www.onlinegames.io/games/2023/construct/242/skibidi-toilet-io/index.html",
  "https://www.onlinegames.io/games/2023/unity/dark-ninja-hanjo/index.html",
  "https://www.onlinegames.io/games/2021/4/mad-doctor/index.html",
  "https://www.onlinegames.io/games/2022/construct/116/zombie-sniper/index.html",
  "https://cloud.onlinegames.io/games/2021/2/ultimate-moto/index-og.html",
  "https://www.onlinegames.io/games/2021/4/paradise-girls/index.html",
  "https://www.onlinegames.io/games/2022/unity3/war-of-ships-io/index.html",
  "https://www.onlinegames.io/games/2021/unity/monster-truck-city-parking/index.html",
  "https://www.onlinegames.io/games/2022/unity4/solitaire-adventure/index.html",
  "https://www.onlinegames.io/games/2021/1/princess-beauty-salon/index.html",
  "https://www.onlinegames.io/games/2021/5/mini-shooters/index.html",
  "https://www.onlinegames.io/games/2023/construct/288/xmas-cookie-clicker/index.html",
  "https://cloud.onlinegames.io/games/2025/construct/302/davo/index-og.html",
  "https://www.onlinegames.io/games/2024/construct/233/state-io-wars/index.html",
  "https://cloud.onlinegames.io/games/2021/4/kick-the-alien/index-og.html",
  "https://www.onlinegames.io/games/2021/3/first-day-of-school/index.html",
  "https://www.onlinegames.io/games/2022/unity/sweet-sugar-match/index.html",
  "https://www.onlinegames.io/games/2022/construct/133/formula-1-driver/index.html",
  "https://cloud.onlinegames.io/games/2021/1/jeep-driver/index-og.html",
  "https://www.onlinegames.io/games/2022/unity/zombie-war-defense/index.html",
  "https://www.onlinegames.io/games/2021/unity/hover-racer-pro/index.html",
  "https://www.onlinegames.io/games/2021/2/pets-beauty-salon/index.html",
  "https://cloud.onlinegames.io/games/2025/unity/checkout-frenzy/index-og.html",
  "https://www.onlinegames.io/games/2021/unity/dont-fall-io/index.html",
  "https://www.onlinegames.io/games/2021/unity/dockyard-tank-parking/index.html",
  "https://www.onlinegames.io/games/2021/2/rescue-helicopter/index.html",
  "https://www.onlinegames.io/games/2022/unity3/crazy-car-arena/index.html",
  "https://cloud.onlinegames.io/games/2025/construct/208/kings-io/index-og.html",
  "https://www.onlinegames.io/games/2022/unity2/soul-essence-adventure/index.html",
  "https://www.onlinegames.io/games/2022/construct/151/tank-racing/index.html",
  "https://cloud.onlinegames.io/games/2021/2/city-police-cars/index-og.html",
  "https://www.onlinegames.io/games/2021/2/baby-beauty-salon/index.html",
  "https://www.onlinegames.io/games/2022/construct/124/speed-drift-racing/index.html",
  "https://www.onlinegames.io/games/2023/freezenova.com/jeep-racing/index.html",
  "https://cloud.onlinegames.io/games/2022/construct/122/jul-moto-racing/index-og.html",
  "https://www.onlinegames.io/games/2021/2/kick-the-zombie/index.html",
  "https://cloud.onlinegames.io/games/2022/construct/92/kick-the-pirate/index-og.html",
  "https://cloud.onlinegames.io/games/2026/unity/run-3/game.html",
  "https://www.onlinegames.io/games/2022/construct/63/army-driver/index.html",
  "https://www.onlinegames.io/games/2022/construct/144/truck-racing/index.html",
  "https://www.onlinegames.io/games/2023/construct/279/geometry-rash/index.html",
  "https://www.onlinegames.io/games/2022/construct/65/galactic-driver/index.html",
  "https://www.onlinegames.io/games/2023/construct/192/run-3-space/index.html",
  "https://cloud.onlinegames.io/games/2025/html/pixelmon-town/game.html",
  "https://cloud.onlinegames.io/games/2026/construct/329/geometry-vector/game.html",
  "https://cloud.onlinegames.io/games/2025/construct/227/spartahoppers/index-og.html",
  "https://www.onlinegames.io/games/2021/unity3/legendary-sniper/index.html",
  "https://www.onlinegames.io/games/2021/unity3/mob-city/index.html",
  "https://cloud.onlinegames.io/games/2021/unity3/pixel-driver/index-og.html",
  "https://www.onlinegames.io/games/2021/2/galactic-sniper/index.html",
  "https://www.onlinegames.io/games/2021/3/romantic-secret-kiss/index.html",
  "https://cloud.onlinegames.io/games/2025/construct/331/paw-clicker/index-og.html",
  "https://www.onlinegames.io/games/2023/q2/geometry-dash-freezenova/index.html",
  "https://www.onlinegames.io/games/2021/unity3/alien-sky-invasion/index.html",
  "https://www.onlinegames.io/games/2023/unity3/supercars-drift/index.html",
  "https://www.onlinegames.io/games/2022/unity3/battle-royale-simulator/index.html",
  "https://cloud.onlinegames.io/games/2024/construct/299/geometry-escape/index-og.html",
  "https://www.onlinegames.io/games/2021/1/evil-santa/index.html",
  "https://cloud.onlinegames.io/games/2022/unity3/crazy-moto-racing/index-og.html",
  "https://www.onlinegames.io/games/2023/construct/237/shortcut-race/index.html",
  "https://www.onlinegames.io/games/2023/unity/archer-hero/index.html",
  "https://www.onlinegames.io/games/2021/2/wedding-beauty-salon/index.html",
  "https://cloud.onlinegames.io/games/2025/unity2/five-nights-at-poppy/index-og.html",
  "https://www.onlinegames.io/games/2022/unity4/super-mini-racing/index.html",
  "https://cloud.onlinegames.io/games/2024/more2/nova-craft/index.html",
  "https://www.onlinegames.io/games/2021/3/perfect-first-date/index.html",
  "https://www.onlinegames.io/games/2021/4/fun-party-makeup/index.html",
  "https://www.onlinegames.io/games/2021/3/princesses-prom-night/index.html",
  "https://www.onlinegames.io/games/2022/unity/storm-city-mafia/index.html",
  "https://www.onlinegames.io/games/2021/1/monster-truck-racing/index.html",
  "https://www.onlinegames.io/games/2024/unity/funny-shooter-bro/index.html",
  "https://www.onlinegames.io/games/2021/unity3/armedforces-io/index.html",
  "https://www.onlinegames.io/games/2024/construct/292/poop-clicker/index.html",
  "https://cloud.onlinegames.io/games/2024/unity3/cake-match-puzzle/index-og.html",
  "https://www.onlinegames.io/games/2023/unity2/idle-restaurant/index.html",
  "https://cloud.onlinegames.io/games/2026/unity/age-of-battle/game.html",
  "https://www.onlinegames.io/games/2021/unity2/war-simulator/index.html",
  "https://www.onlinegames.io/games/2022/unity/head-soccer-football/index.html",
  "https://www.onlinegames.io/games/2024/unity/snake-wars/index.html",
  "https://www.onlinegames.io/games/2022/construct/149/draw-the-truck-bridge/index.html",
  "https://www.onlinegames.io/games/2022/unity/tractor-farming-simulator/index.html",
  "https://www.onlinegames.io/games/2023/unity3/hook-wars/index.html",
  "https://www.onlinegames.io/games/2022/unity/airplane-racer/index.html",
  "https://www.onlinegames.io/games/2021/unity/police-traffic/index.html",
  "https://www.onlinegames.io/games/2023/construct/179/fire-and-water/index.html",
  "https://cloud.onlinegames.io/games/2025/html/2048/index.html",
  "https://www.onlinegames.io/games/2023/q2/dinosaur-game/index.html",
  "https://cloud.onlinegames.io/games/2025/unity/find-it/index-og.html",
  "https://www.onlinegames.io/games/2023/construct/185/crazy-stickman-physics/index.html",
  "https://www.onlinegames.io/games/2023/construct/285/tiny-crash-fighters/index.html",
  "https://www.onlinegames.io/games/2022/unity/head-basketball/index.html",
  "https://www.onlinegames.io/games/2021/1/unicorn-beauty-salon/index.html",
  "https://www.onlinegames.io/games/2021/2/witch-beauty-salon/index.html",
  "https://www.onlinegames.io/games/2021/unity/agent-smith/index.html",
  "https://www.onlinegames.io/games/2021/unity2/zombie-road/index.html",
  "https://www.onlinegames.io/games/2022/construct/120/train-racing/index.html",
  "https://www.onlinegames.io/games/2022/construct/156/blocky-parkour-ninja/index.html",
  "https://cloud.onlinegames.io/games/2025/unity/farming-island/index-og.html",
  "https://www.onlinegames.io/games/2021/1/racing-cars/index.html",
  "https://www.onlinegames.io/games/2021/unity3/kingdom-attack/index.html",
  "https://cloud.onlinegames.io/games/2024/unity/highway-moto/index-og.html",
  "https://www.onlinegames.io/games/2023/unity/cross-the-road/index.html",
  "https://www.onlinegames.io/games/2021/4/racing-cars-2/index.html",
  "https://cloud.onlinegames.io/games/2025/unity2/kingdom-battle-3d/index-og.html",
  "https://www.onlinegames.io/games/2022/unity/the-farmer/index.html",
  "https://www.onlinegames.io/games/2021/unity3/hover-racer/index.html",
  "https://www.onlinegames.io/games/2022/construct/147/draw-the-bird-path/index.html",
  "https://www.onlinegames.io/games/2021/unity3/squid-race-simulator/index.html",
  "https://www.onlinegames.io/games/2021/unity2/draw-here/index.html",
  "https://www.onlinegames.io/games/2021/2/owl-and-rabbit-fashion/index.html",
  "https://www.onlinegames.io/games/2022/construct/164/treasure-hunter/index.html",
  "https://cloud.onlinegames.io/games/2025/construct/337/crown-defense/index-og.html",
  "https://www.onlinegames.io/games/2021/unity3/toonz-io/index.html",
  "https://www.onlinegames.io/games/2021/3/hill-climb-cars/index.html",
  "https://www.onlinegames.io/games/2023/unity2/legends-arena/index.html",
  "https://www.onlinegames.io/games/2024/q2/darkness-survivors/index.html",
  "https://cloud.onlinegames.io/games/2024/construct/223/monster-truck-booster/index-og.html",
  "https://www.onlinegames.io/games/2021/4/mr-space-bullet/index.html",
  "https://www.onlinegames.io/games/2023/unity3/dino-chaos-idle/index.html",
  "https://cloud.onlinegames.io/games/2025/construct/298/mafia-getaway-cars/index-og.html",
  "https://www.onlinegames.io/games/2021/unity2/nova-billiard/index.html",
  "https://cloud.onlinegames.io/games/2021/3/monster-truck-race-arena/index-og.html",
  "https://www.onlinegames.io/games/2023/construct/209/crazy-hill-climb/index.html",
  "https://cloud.onlinegames.io/games/2021/1/apocalypse-truck/index-og.html",
  "https://www.onlinegames.io/games/2022/unity3/skateboard-marathon/index.html",
  "https://www.onlinegames.io/games/2022/unity2/egg-helix/index.html",
  "https://www.onlinegames.io/games/2021/unity2/crazy-ball-adventures/index.html",
];

const catPrefixes: Record<string, { titles: string[]; descs: string[]; tags: string[] }> = {
  racing: {
    titles: ["Speed Rush", "Turbo Drive", "Velocity X", "Drift Kings", "Street Blaze", "Nitro Boost", "Asphalt Assault", "Midnight Run", "Road Champion", "Gear Shift"],
    descs: ["Race through neon-lit streets at breakneck speeds. Dodge traffic and collect boost power-ups.", "Master the art of drifting through challenging mountain passes.", "Take on rugged terrain in this off-road racing simulation."],
    tags: ["racing", "speed", "cars", "drift", "turbo", "competition"],
  },
  action: {
    titles: ["Shadow Strike", "Cyber Assault", "Stealth Ops", "Combat Zone", "Ninja Revenge", "Elite Force", "Dark Warrior", "Strike Back", "Phantom Squad", "Rogue Agent"],
    descs: ["Tactical military operations with stealth elements.", "Cyberpunk ninja action through a futuristic metropolis.", "Survive waves of enemies in an urban apocalypse."],
    tags: ["action", "combat", "shooter", "stealth", "battle"],
  },
  puzzle: {
    titles: ["Logic Master", "Brain Teaser", "Crystal Quest", "Mind Bender", "Puzzle Storm", "Number Crunch", "Word Wizard", "Color Match", "Shape Shifter", "Pattern Pro"],
    descs: ["Challenge your intellect with increasingly complex puzzles.", "Virtual escape rooms with intricate puzzles.", "Navigate through mind-bending maze puzzles."],
    tags: ["puzzle", "logic", "brain", "matching", "strategy"],
  },
  sports: {
    titles: ["Soccer Pro", "Basketball Stars", "Tennis Ace", "Golf Master", "Hockey Rush", "Volleyball Spike", "Baseball Hit", "Bowling Strike", "Pool Master", "Darts Champ"],
    descs: ["Fast-paced soccer with intuitive controls.", "Arcade basketball with incredible dunks.", "Realistic tennis simulation with topspin serves."],
    tags: ["sports", "competition", "ball", "team", "athletic"],
  },
  arcade: {
    titles: ["Space Blaster", "Galaxy Defender", "Alien Attack", "Star Fighter", "Cosmic War", "Asteroid Field", "Laser Storm", "Pixel Hero", "Retro Racer", "Classic Clash"],
    descs: ["Classic arcade shooter reimagined for modern browsers.", "The legendary maze chase game with new mazes.", "The addictive side-scrolling challenge."],
    tags: ["arcade", "classic", "retro", "action", "fast-paced"],
  },
  adventure: {
    titles: ["Dragon Quest", "Mystic Forest", "Crystal Cave", "Lost Temple", "Pirate Bay", "Jungle Explorer", "Desert Trek", "Ice Mountain", "Volcano Run", "Ocean Deep"],
    descs: ["Embark on an epic quest through mystical forests.", "Explore a mysterious island filled with puzzles.", "Navigate through dangerous dungeons filled with traps."],
    tags: ["adventure", "exploration", "quest", "fantasy", "story"],
  },
};

const allCategories = Object.keys(catPrefixes);

function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

function generateMockGames(count: number = 200): Game[] {
  const games: Game[] = [];
  let id = 1;
  const categoryKeys = Object.keys(catPrefixes);

  for (let catIdx = 0; catIdx < categoryKeys.length; catIdx++) {
    const catKey = categoryKeys[catIdx];
    const cat = catPrefixes[catKey];
    const gamesPerCat = Math.ceil(count / categoryKeys.length);

    for (let i = 0; i < gamesPerCat && games.length < count; i++) {
      const title = cat.titles[i % cat.titles.length];
      const suffix = i >= cat.titles.length ? `-${Math.floor(i / cat.titles.length) + 1}` : "";
      const displayTitle = `${title}${suffix ? ` #${Math.floor(i / cat.titles.length) + 1}` : ""}`;
      const slug = `${slugify(title)}${suffix}`;

      games.push({
        id,
        slug,
        title: displayTitle,
        description: cat.descs[i % cat.descs.length],
        thumbnail: `https://placehold.co/400x250/1e293b/00d4ff?text=${encodeURIComponent(title.slice(0, 12))}`,
        category: catKey as any,
        tags: [cat.tags[i % cat.tags.length], cat.tags[(i + 1) % cat.tags.length]],
        featured: i < 3,
        trending: i >= 3 && i < 8,
        iframe_url: realEmbeds[(id - 1) % realEmbeds.length],
        controls: "Mouse to play",
        how_to_play: "Just click and play! Use your mouse or keyboard to control the game.",
      });
      id++;
    }
  }
  return games;
}

const mockGames = generateMockGames(200);

export async function fetchGames(source: GameSource = "mock", count: number = 200): Promise<GameFetchResult> {
  const cacheKey = `${source}-${count}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return { games: cached.data, source, cached: true };
  }

  let games: Game[] = [];

  switch (source) {
    case "mock":
      games = mockGames.slice(0, count);
      break;
    case "onlinegames":
    case "freesgames":
      games = mockGames.slice(0, count);
      break;
  }

  cache.set(cacheKey, { data: games, ts: Date.now() });
  return { games, source, cached: false };
}

export function getGameBySlug(slug: string): Game | undefined {
  return mockGames.find((g) => g.slug === slug);
}

export function getGamesByCategory(category: string): Game[] {
  return mockGames.filter((g) => g.category === category);
}

export function getRelatedGames(game: Game, limit: number = 12): Game[] {
  return mockGames
    .filter((g) => g.id !== game.id && (g.category === game.category || g.tags.some((t) => game.tags.includes(t))))
    .slice(0, limit);
}

export function searchGames(query: string): Game[] {
  const q = query.toLowerCase();
  return mockGames.filter(
    (g) =>
      g.title.toLowerCase().includes(q) ||
      g.description.toLowerCase().includes(q) ||
      g.tags.some((t) => t.toLowerCase().includes(q)) ||
      g.category.toLowerCase().includes(q)
  );
}

export { mockGames as defaultGames, allCategories as defaultCategories };
