import { Game } from "@/types";

const catPrefixes: Record<string, { titles: string[]; descs: string[]; controls: string[]; hows: string[]; tags: string[] }> = {
  racing: {
    titles: [
      "Speed Rush", "Turbo Drive", "Velocity X", "Drift Kings", "Street Blaze",
      "Nitro Boost", "Asphalt Assault", "Midnight Run", "Road Champion", "Gear Shift",
      "Racing Fury", "Track Dominator", "Burn Rubber", "Pedal to Metal", "Speed Demon",
      "Lap Legend", "Circuit Breaker", "Pit Stop Pro", "Drag Wars", "Turbo Charged",
      "Street Storm", "Drift Master", "Rally Racer X", "Grand Prix Hero", "Speed Circuit",
      "Velocity Racer", "Nightspeed", "Road Blitz", "Formula Fire", "Kart Clash",
      "Street Outlaw", "Racing Spirit", "Drift Zone", "Turbo Track", "Burnout City",
      "Highway Hunter", "Moto GP Racer", "Street Heat", "Drag King", "Track Titan",
      "Racing Legend", "Drift Arena", "Nitro Nights", "Asphalt King", "Street Fury",
      "Speed Craze", "Turbo Storm", "Road Rage", "Circuit King", "Gear Master",
    ],
    descs: [
      "Race through neon-lit streets at breakneck speeds. Dodge traffic and collect boost power-ups.",
      "Master the art of drifting through challenging mountain passes. Style points for every drift.",
      "Take on rugged terrain in this off-road racing simulation. Mud, rocks, and steep hills await.",
      "Professional street racing in underground circuits. Customize your ride and dominate the streets.",
      "Futuristic space racing across alien planets with anti-gravity vehicles and spectacular tracks.",
    ],
    controls: ["Arrow Keys to steer, Space to brake, Shift for boost", "WASD to drive, Space for handbrake, Z/X for gear shift", "Arrow Keys to drive, W to lean, S to lean back"],
    hows: ["Navigate through traffic while maintaining top speed. Use boost strategically to gain an edge.", "Approach corners at high speed and tap the handbrake to initiate drifts for maximum points.", "Race across challenging terrain while managing your vehicle's momentum and traction."],
    tags: ["racing", "speed", "cars", "drift", "turbo", "competition", "vehicles"],
  },
  action: {
    titles: [
      "Shadow Strike", "Cyber Assault", "Stealth Ops", "Combat Zone", "Ninja Revenge",
      "Elite Force", "Dark Warrior", "Strike Back", "Phantom Squad", "Rogue Agent",
      "Battle Surge", "Metal Storm", "Vengeance", "Commando X", "Urban Warfare",
      "Ghost Unit", "Thunder Strike", "Iron Fist", "Quick Shot", "Sniper Elite",
      "Black Hawk", "Storm Front", "Silent Blade", "Shadow Soldier", "Night Ops",
      "Desert Storm", "Arctic Strike", "Jungle Fury", "City Siege", "Rebel Force",
      "Wolf Pack", "Deathmatch", "Headshot Pro", "Combat Master", "War Machine",
      "Steel Warriors", "Blood Strike", "Dark Ops", "Firestorm", "Hit Squad",
      "Renegade X", "Apache Strike", "Viper Unit", "Hammer Down", "Overwatch",
      "Locked Loaded", "First Blood", "Counter Strike", "Battle Born", "War Zone",
    ],
    descs: [
      "Tactical military operations with stealth elements. Complete missions behind enemy lines.",
      "Cyberpunk ninja action through a futuristic metropolis. Wall-run, slash, and stealth-kill.",
      "Survive waves of enemies in an urban apocalypse. Build defenses and find weapons.",
      "Battle arena where warriors fight for glory. Choose your champion and defeat all challengers.",
      "Fight against alien hordes in this fast-paced sci-fi shooter. Heavy weapons and big explosions.",
    ],
    controls: ["WASD to move, Mouse to aim, Left Click to shoot, Space to cover", "WASD to move, J to attack, K to block, Space to dodge", "WASD to move, Left Click to shoot, R to reload, Shift to sprint"],
    hows: ["Complete mission objectives while staying undetected. Use cover and plan your approach.", "Master combat techniques and combos. Time your attacks and blocks perfectly.", "Survive increasingly difficult waves. Collect power-ups and upgrade your weapons."],
    tags: ["action", "combat", "shooter", "stealth", "battle", "missions", "warfare"],
  },
  puzzle: {
    titles: [
      "Logic Master", "Brain Teaser", "Crystal Quest", "Mind Bender", "Puzzle Storm",
      "Number Crunch", "Word Wizard", "Color Match", "Shape Shifter", "Pattern Pro",
      "Riddle Me", "Block Puzzle", "Sudoku Sage", "Memory Match", "Tile Twist",
      "Code Breaker", "Maze Runner", "Jigsaw Joy", "Logic Gates", "Match Three",
      "Hex Genius", "Flow Free", "Pipe Puzzle", "Gem Crush", "Bubble Pop",
      "Brain Storm", "Puzzle Dash", "Smart Moves", "IQ Challenge", "Think Fast",
      "Puzzle Fever", "Mind Maze", "Logic Pro", "Cipher Hunt", "Block Stack",
      "Sort Puzzle", "Merge Mania", "Slide Puzzle", "Knot Untie", "Pixel Puzzle",
      "Cross Logic", "Word Search", "Number Link", "Fit Block", "Rolling Ball",
      "Light Bot", "Color Sort", "Jigsaw Blitz", "Puzzle Arena", "Brain Gym",
    ],
    descs: [
      "Challenge your intellect with increasingly complex puzzles. Match, combine, and solve your way up.",
      "Virtual escape rooms with intricate puzzles. Find clues and solve riddles before time runs out.",
      "Navigate through mind-bending maze puzzles with new mechanics introduced at every level.",
      "Magical word puzzle game. Form words from letters to cast spells and defeat monsters.",
      "Classic block matching puzzle with a modern twist and unique mechanics.",
    ],
    controls: ["Mouse Click to select and interact, Drag to match items", "Click to select tiles, R to restart, H for hint", "Mouse to interact with puzzle elements, Space to confirm"],
    hows: ["Analyze patterns and use logic to solve each puzzle. Plan your moves carefully.", "Find hidden clues and combine items to solve escape room challenges.", "Match colors, shapes, or numbers to clear the board and advance."],
    tags: ["puzzle", "logic", "brain", "matching", "strategy", "thinking", "challenge"],
  },
  sports: {
    titles: [
      "Soccer Pro", "Basketball Stars", "Tennis Ace", "Golf Master", "Hockey Rush",
      "Volleyball Spike", "Baseball Hit", "Bowling Strike", "Pool Master", "Darts Champ",
      "Boxing King", "Wrestling Star", "Ski Champion", "Snowboard Pro", "Surf Rider",
      "Cycling Sprint", "Track Star", "Football TD", "Cricket Pro", "Rugby Tackle",
      "Badminton Ace", "Table Tennis", "Handball Pro", "Field Goal", "Home Run",
      "Slam Dunk", "Goal Keeper", "Free Kick", "Penalty Pro", "Putt Master",
      "Curling Stone", "Fencing Duel", "Karate Champ", "Judo Master", "Taekwondo Pro",
      "Archery Aim", "Fishing Pro", "Billiards Ace", "Skateboard Pro", "Roller Derby",
      "Triathlon Pro", "Marathon Run", "High Jump", "Long Jump", "Discus Pro",
      "Javelin Champ", "Relay Race", "Water Polo", "Kayak Rush", "Rowing Pro",
    ],
    descs: [
      "Fast-paced soccer with intuitive controls. Compete in tournaments and climb the ranks.",
      "Arcade basketball with incredible dunks and 3-point shots. Time your shots perfectly.",
      "Realistic tennis simulation with topspin, slice, and powerful serves. Grand Slam action.",
      "Premium golf game with beautiful courses. Wind, terrain, and club selection matter.",
      "Step into the ring as a professional boxer. Jab, hook, and uppercut your way to glory.",
    ],
    controls: ["Arrow Keys to move, Space to kick, Z to pass, X to tackle", "Arrow Keys to move, Space to jump, J to shoot, Hold for power", "WASD to move, J for forehand, K for backhand, Hold for power"],
    hows: ["Control your team and score goals. Pass to create openings and defend strategically.", "Time your jumps and releases for perfect shots. Learn the mechanics of each sport.", "Master the techniques of each sport. Practice makes perfect."],
    tags: ["sports", "competition", "ball", "team", "athletic", "tournament", "game"],
  },
  arcade: {
    titles: [
      "Space Blaster", "Galaxy Defender", "Alien Attack", "Star Fighter", "Cosmic War",
      "Asteroid Field", "Laser Storm", "Pixel Hero", "Retro Racer", "Classic Clash",
      "Bit Blast", "8-Bit Hero", "Neon Rider", "Wave Surfer", "Brick Buster",
      "Pong Master", "Breakout Pro", "Galaga Fury", "Centipede War", "Frogger Cross",
      "Donkey Climb", "Mario Runner", "Sonic Dash", "Mega Jump", "Turbo Turtle",
      "Bubble Shooter", "Pinball Pro", "Air Hockey", "Whack Attack", "Carnival King",
      "Snake Battle", "Pac Runner", "Tetris Blitz", "Candy Crunch", "Jewel Quest",
      "Bubble Trouble", "Space Invade", "Laser Maze", "Pixel Dungeon", "Retro Jump",
      "Neon Blast", "Arcade Hero", "Coin Eater", "Ghost Chase", "Mega Blaster",
      "Turbo Pac", "Space Fury", "Pixel Race", "Block Breaker", "Classic Hero",
    ],
    descs: [
      "Classic arcade shooter reimagined for modern browsers. Wave after wave of alien attackers.",
      "The legendary maze chase game with new mazes and modern visuals. Eat dots and avoid ghosts.",
      "The addictive side-scrolling challenge. Tap to fly through pipes and beat your high score.",
      "The block-stacking phenomenon with new game modes, graphics, and challenges.",
      "Destroy asteroids in this explosive arcade shooter. Split and destroy them all.",
    ],
    controls: ["Arrow Keys to move, Space to shoot, Shift for special weapon", "Arrow Keys to move Pac through the maze", "Space or Click to flap, Navigate through pipes"],
    hows: ["Shoot enemies while avoiding their attacks. Collect power-ups for stronger weapons.", "Eat all dots while avoiding enemies. Power pellets let you eat ghosts for bonus points.", "Keep the action going. Each level gets harder. Aim for the high score."],
    tags: ["arcade", "classic", "retro", "action", "fast-paced", "score", "challenge"],
  },
  adventure: {
    titles: [
      "Dragon Quest", "Mystic Forest", "Crystal Cave", "Lost Temple", "Pirate Bay",
      "Jungle Explorer", "Desert Trek", "Ice Mountain", "Volcano Run", "Ocean Deep",
      "Sky Islands", "Magic Realm", "Dark Dungeon", "Enchanted Land", "Safari Run",
      "Treasure Hunt", "Mystery Island", "Ancient Ruins", "Forbidden City", "Golden Trail",
      "Cursed Castle", "Dragon Lair", "Wizard Tower", "Fairy Glen", "Goblin Mine",
      "Phantom Ship", "Haunted Manor", "Secret Garden", "Lost City", "Crystal Realm",
      "Star Quest", "Moon Walker", "Space Ranger", "Time Traveler", "Dimension Jump",
      "Wild West", "Cowboy Trail", "Saloon Showdown", "Gold Rush", "Frontier Life",
      "Viking Raid", "Nordic Quest", "Saga Lands", "Rune Master", "Valhalla Call",
      "Samurai Path", "Shogun Wars", "Ninja Trail", "Dragon Scroll", "Honor Bound",
    ],
    descs: [
      "Embark on an epic quest through mystical forests and ancient ruins. Discover hidden treasures.",
      "Explore a mysterious island filled with puzzles and secrets. Uncover its ancient mysteries.",
      "Navigate through dangerous dungeons filled with traps and monsters. Find the exit to survive.",
      "Travel across magical realms on a quest to save the kingdom from darkness.",
      "Pilot your ship through treacherous waters to discover new lands and buried treasure.",
    ],
    controls: ["WASD to move, Space to jump, E to interact, I for inventory", "Arrow Keys to move, Z to attack, X to use item, C to jump", "Click to move, Space to interact, 1-4 for items"],
    hows: ["Explore every corner of the world. Talk to characters and solve quests to progress.", "Collect items and use them to solve environmental puzzles.", "Battle monsters, level up your character, and discover the story."],
    tags: ["adventure", "exploration", "quest", "fantasy", "story", "discovery", "rpg"],
  },
  shooting: {
    titles: [
      "Sniper Shot", "Target Practice", "Sharp Shooter", "Deadly Aim", "Bullseye Pro",
      "Trigger Happy", "Gun Range", "Shotgun Blast", "Pistol Duel", "Rapid Fire",
      "Sniper Elite X", "Shooting Range", "Zombie Aim", "Alien Shooter", "Space Sniper",
      "Western Duel", "Cowboy Shot", "Quick Draw", "Gunslinger", "Frontier Shot",
      "FPS Arena", "Deathmatch Pro", "Combat Shot", "War Front", "Battle Scope",
      "Target Master", "Ace Shooter", "Precision Pro", "Marksman", "Sharpshooter",
      "Headshot HQ", "Sniper Camp", "Long Range", "Night Scope", "Thermal Shot",
      "Paintball War", "Laser Tag", "Toy Gun Battle", "Water Gun Fight", "Nerf Blast",
      "Space Marine", "Star Sniper", "Galaxy Guard", "Cosmos Shot", "Nebula Strike",
      "Golden Gun", "Silver Bullet", "Magnum Force", "Desert Eagle", "Pistol Pro",
    ],
    descs: [
      "Test your aim in this precision shooting gallery. Hit targets and beat your high score.",
      "Sniper simulation with realistic bullet physics. Wind, distance, and breathing matter.",
      "Fast-paced shooting range with moving targets. Speed and accuracy are key.",
      "Western-themed quick-draw duels. Be the fastest gun in the wild west.",
      "FPS combat training mode. Improve your reflexes and accuracy under pressure.",
    ],
    controls: ["Mouse to aim, Left Click to shoot, R to reload, Right Click for scope", "WASD to move, Mouse to aim, Click to fire, 1-3 for weapons", "Mouse to aim, Click to shoot, Hold breath with Shift"],
    hows: ["Line up your shots carefully. Account for wind and distance when sniping.", "Stay calm and focus on accuracy. Speed comes with practice.", "Track moving targets and lead your shots for maximum accuracy."],
    tags: ["shooting", "sniper", "aim", "targets", "precision", "fps", "action"],
  },
  strategy: {
    titles: [
      "Empire Builder", "Kingdom Rise", "War Command", "Tactical Move", "Base Defense",
      "Star General", "Battle Plan", "Siege Master", "Conquest War", "Crystal Army",
      "Fortress War", "Tower Command", "Army Builder", "War Room", "Tactics Pro",
      "City Planner", "Nation Rise", "Colony War", "Resource War", "Trade Empire",
      "Chess Master", "Checkmate Pro", "Board Control", "King's Gambit", "Queen's Game",
      "Tower Attack", "Castle Defense", "Wall Builder", "Arrow Tower", "Canon Siege",
      "Plant vs Zombies", "Garden War", "Farm Defense", "Home Guard", "Village Protect",
      "Space Colony", "Mars Base", "Moon Settlement", "Star Empire", "Galaxy Rule",
      "Medieval King", "Feudal Lord", "Castle Lord", "Knight's Honor", "Crusader",
      "Warrior Clan", "Barbarian Horde", "Viking Conquest", "Spartan War", "Phalanx",
    ],
    descs: [
      "Build and manage your own empire. Gather resources, train armies, and expand your territory.",
      "Tactical strategy game where every move counts. Outsmart your opponents to win.",
      "Defend your base against waves of enemies. Build towers and upgrade defenses.",
      "Command armies in epic battles. Position your troops and use terrain to your advantage.",
      "City-building simulation with strategic resource management. Grow your civilization.",
    ],
    controls: ["Mouse to select and place, 1-5 for units, Space to pause", "Click to select units, Right Click to move, A for attack", "Mouse to build and manage, Number keys for shortcuts"],
    hows: ["Plan your strategy carefully. Build a strong economy to fund your army.", "Position units strategically and use their strengths against enemy weaknesses.", "Balance offense and defense. Scout your enemy and adapt your strategy."],
    tags: ["strategy", "tactics", "building", "management", "war", "defense", "planning"],
  },
  simulation: {
    titles: [
      "City Builder", "Farm Life", "Airline CEO", "Restaurant Rush", "Hotel Tycoon",
      "Zoo Keeper", "Aquarium Pro", "Park Manager", "Store Empire", "Mall Builder",
      "Construction Sim", "House Flipper", "Interior Pro", "Garden Designer", "Landscape Co",
      "Flight Sim", "Pilot Pro", "Air Traffic", "Helicopter Fly", "Space Pilot",
      "Train Driver", "Subway Metro", "Bus Driver", "Truck Haul", "Ship Captain",
      "Fishing Boat", "Mining Co", "Oil Tycoon", "Factory Line", "Car Mechanic",
      "Pet Salon", "Dog Walker", "Cat Café", "Pet Shop", "Animal Shelter",
      "School Run", "Hospital Pro", "Doctor Care", "Vet Clinic", "Dental Pro",
      "Fashion Star", "Model Walk", "Design Studio", "Makeup Pro", "Hair Salon",
      "Cooking Craze", "Bakery Pro", "Pizza Maker", "Sushi Chef", "Ice Cream Shop",
    ],
    descs: [
      "Build and manage your dream city. Zone areas, manage resources, and keep citizens happy.",
      "Run your own farm. Plant crops, raise animals, and sell produce at the market.",
      "Manage your own airline. Schedule flights, maintain planes, and keep passengers happy.",
      "Build and manage a successful restaurant. Design menus, hire staff, and serve customers.",
      "Create and manage a zoo. Build habitats, care for animals, and attract visitors.",
    ],
    controls: ["Mouse to build and manage, Scroll to zoom, Click to select", "Click to interact with objects, Drag to place items", "WASD to navigate, Mouse to interact, E to use"],
    hows: ["Start small and grow your business. Reinvest profits to expand operations.", "Keep your customers happy and manage your resources wisely.", "Balance income and expenses to build a profitable enterprise."],
    tags: ["simulation", "management", "building", "tycoon", "business", "creative", "casual"],
  },
  horror: {
    titles: [
      "Dark Corridor", "Shadow House", "Ghost Manor", "Cursed Asylum", "Night Terror",
      "Blood Moon", "Grave Yard", "Undead Rising", "Zombie Horde", "Infected Zone",
      "Dark Forest", "Witch Woods", "Cabin Fear", "Lake Horror", "Swamp Thing",
      "Abandoned", "Empty Ward", "Cell Block", "Prison Fear", "Death Row",
      "Screams", "Whisper Hall", "Door Creak", "Floor Board", "Dark Room",
      "Clown Fear", "Doll House", "Toy Terror", "Puppet Master", "Marionette",
      "Vampire Night", "Bat Castle", "Blood Thirst", "Dark Kiss", "Eternal Night",
      "Werewolf Howl", "Full Moon", "Beast Within", "Pack Hunt", "Alpha Strike",
      "Deep Sea", "Ocean Fear", "Below Zero", "Abyss Drop", "Dark Water",
    ],
    descs: [
      "Explore a haunted mansion where every shadow hides a secret. Can you survive the night?",
      "Survive the zombie apocalypse. Scavenge for supplies and fight off the undead horde.",
      "Investigate paranormal activity in an abandoned asylum. Evidence of supernatural forces.",
      "Escape from a cursed town where night brings unspeakable horrors to the streets.",
      "Deep space survival horror. Something is aboard your ship and it's hunting the crew.",
    ],
    controls: ["WASD to move, E to interact, Space to run, Ctrl to hide", "Mouse to look, Click to interact, Shift to sprint, R to reload", "WASD to move, F to use flashlight, Space to interact, Q to quick turn"],
    hows: ["Stay in the light and avoid the darkness. Listen for audio cues to detect threats.", "Conserve your resources. Ammo and health are scarce. Run when you can't fight.", "Solve puzzles to progress while avoiding or defeating enemies."],
    tags: ["horror", "survival", "scary", "zombie", "dark", "thriller", "mystery"],
  },
  fighting: {
    titles: [
      "Knockout King", "Fury Fist", "Iron Fist", "Brawl Masters", "Street Brawl",
      "Ring Champion", "Boxing Legend", "Heavy Weight", "Lightning Punch", "Jab Cross",
      "Dragon Fist", "Tiger Claw", "Crane Style", "Snake Strike", "Mantis Punch",
      "Karate Champ", "Kick Master", "Roundhouse", "Side Kick", "Spin Hook",
      "WWE Rumble", "Smack Down", "Body Slam", "Suplex City", "Submission Pro",
      "Mortal Kombat", "Fatal Blow", "Finish Move", "Fatality Pro", "Brutality",
      "Samurai Duel", "Katana Clash", "Blade Master", "Sword Fight", "Steel Cross",
      "Pirate Duel", "Cutlass War", "Parley Crash", "Boarding Party", "Sea Brawl",
      "Robot Wars", "Mech Brawl", "Steel Fist", "Iron Giant", "Titan Clash",
    ],
    descs: [
      "Step into the ring and battle opponents in intense boxing matches. Jab, hook, and uppercut.",
      "Martial arts tournament where only the strongest survive. Master different fighting styles.",
      "Street brawling action game. Fight your way through gangs to become the city champion.",
      "Epic boss battles against giant monsters. Dodge, attack, and use special moves.",
      "Sword fighting duels in a medieval setting. Parry, riposte, and claim victory.",
    ],
    controls: ["WASD to move, J to punch, K to kick, L for special, Block with Space", "Arrow Keys to move, A/S/D for attacks, Q/W/E for specials", "WASD to move, Mouse Click to attack, Right Click to block, Space to dodge"],
    hows: ["Master your character's move set. Learn combos for maximum damage.", "Study opponent patterns and find openings. Block and counterattack.", "Manage your stamina. Don't waste energy on blocked attacks."],
    tags: ["fighting", "combat", "martial-arts", "boxing", "brawl", "versus", "action"],
  },
  platformer: {
    titles: [
      "Jump King", "Pixel Run", "Super Dash", "Mega Jump", "Sky Hopper",
      "Cloud Runner", "Star Platform", "Moon Jumper", "Space Leap", "Galaxy Hop",
      "Lava Leap", "Fire Jump", "Ice Run", "Snow Slide", "Glacier Climb",
      "Jungle Swing", "Vine Jump", "Tree Hop", "Canopy Run", "Forest Sprint",
      "City Parkour", "Rooftop Run", "Wall Jump", "Urban Leap", "Street Vault",
      "Cave Runner", "Mine Cart", "Underground", "Crystal Cavern", "Gem Rush",
      "Castle Climb", "Tower Ascent", "Spire Leap", "Rampart Run", "Keep Jump",
      "Desert Hop", "Oasis Run", "Sand Leap", "Pyramid Climb", "Dune Dash",
      "Candy Land", "Sweet Run", "Gummy Jump", "Lollipop Hop", "Candy Cane",
    ],
    descs: [
      "Run and jump through colorful levels filled with obstacles, coins, and hidden secrets.",
      "Precision platforming at its finest. Time your jumps perfectly to reach the exit.",
      "Speedrun through levels collecting coins and avoiding traps. Beat the clock.",
      "Vertical climbing platformer. Jump your way up an endless tower of challenges.",
      "Parkour adventure through a vibrant city. Wall-run, slide, and leap between rooftops.",
    ],
    controls: ["Arrow Keys to move, Space to jump, Down to slide, Up to climb", "WASD to move, Space to jump, Shift to sprint, S to drop through platforms", "Arrow Keys to move, Z to jump, X to attack, C to slide"],
    hows: ["Time your jumps carefully. Some platforms move or disappear.", "Collect coins and power-ups to help you on your journey.", "Find hidden areas for bonus rewards and shortcuts."],
    tags: ["platformer", "jump", "run", "precision", "adventure", "retro", "action"],
  },
  rpg: {
    titles: [
      "Dragon Soul", "Hero's Quest", "Dark Realm", "Magic World", "Legend Reborn",
      "Sword & Magic", "Wizard's Codex", "Dungeon Crawl", "Monster Hunt", "Epic Saga",
      "Shadow Realm", "Light Bearer", "Destiny Call", "Fate Weaver", "Chronicles",
      "Kingdom Hearts", "Royal Blood", "Crown Wars", "Throne Seekers", "Noble Rise",
      "Elemental Force", "Fire Mage", "Water Spirit", "Earth Guardian", "Wind Walker",
      "Dark Knight", "Paladin Oath", "Ranger Path", "Druid Circle", "Bard Song",
      "Goblin Slayer", "Orc Bane", "Dwarf Mine", "Elven Wood", "Halfling Feast",
      "Astral Plane", "Ethereal", "Spirit Realm", "Soul Keeper", "Ghost Walker",
      "Alchemist Lab", "Potion Brew", "Enchant Shop", "Rune Craft", "Spell Book",
    ],
    descs: [
      "Epic RPG adventure with deep character progression. Level up, learn skills, and explore.",
      "Choose your class and embark on a quest to save the kingdom from darkness.",
      "Dungeon crawling RPG. Descend into dangerous dungeons, fight monsters, and find treasure.",
      "Open-world fantasy RPG. Explore a vast world, complete quests, and discover secrets.",
      "Turn-based RPG with strategic combat. Build your party and defeat powerful bosses.",
    ],
    controls: ["WASD to move, Click to attack, 1-5 for skills, I for inventory", "Arrow Keys to move, Z to confirm, X to cancel, A for attack menu", "Mouse to navigate menus, WASD to move, Space to interact"],
    hows: ["Level up your character by gaining experience from battles and quests.", "Choose your skills and equipment wisely to match your playstyle.", "Explore everywhere - hidden paths often contain the best treasure."],
    tags: ["rpg", "fantasy", "leveling", "quests", "magic", "adventure", "characters"],
  },
  music: {
    titles: [
      "Beat Master", "Rhythm Rush", "Dance Floor", "Groove Machine", "Tempo Run",
      "Music Dash", "Note Perfect", "Melody Maker", "Sound Wave", "Piano Tiles",
      "Drum Hero", "Guitar Star", "Bass Line", "DJ Mixer", "Electronic Pro",
      "Sing Along", "Karaoke King", "Voice Star", "Mic Drop", "Song Bird",
      "Beat Saber", "Light Dash", "Neon Rhythm", "Pulse Game", "Flash Beat",
      "Orchestra Pro", "Violin Virtuoso", "Cello Master", "Flute Pro", "Trumpet King",
      "Marching Band", "Drum Line", "Brass Squad", "Wind Ensemble", "String Theory",
      "Disco Fever", "Retro Wave", "Synth Pop", "Electro Swing", "House Party",
      "Classical Pro", "Mozart Run", "Beethoven Beat", "Bach Rock", "Chopin Keys",
    ],
    descs: [
      "Tap to the rhythm in this addictive music game. Follow the beat and score big.",
      "Create your own melodies in this music sandbox. Compose, record, and share.",
      "Dance battle game where you match moves to the music. Perfect your routine.",
      "Rhythm-based platformer where the level moves to the beat of the music.",
      "DJ mixing simulator. Blend tracks, add effects, and create the perfect set.",
    ],
    controls: ["Click or tap tiles in time with the music, Space for pause", "Arrow Keys for notes, A/S/D/J/K/L for chords, Space for special", "Mouse to mix tracks, Number keys for effects, Space to play/pause"],
    hows: ["Follow the rhythm and hit notes in time with the music. Accuracy is key.", "Practice harder songs to improve your timing and score.", "Create your own music by combining different instruments and effects."],
    tags: ["music", "rhythm", "beat", "dance", "creative", "audio", "fun"],
  },
  educational: {
    titles: [
      "Math Genius", "Number Quest", "Count Master", "Times Table", "Math Dash",
      "Word Builder", "Spelling Bee", "Grammar Pro", "Vocabulary", "Language Arts",
      "Science Lab", "Chemisty Pro", "Physics Fun", "Bio Explorer", "Space Science",
      "Geo Genius", "Map Master", "Country Quest", "Capital Quiz", "Flag Finder",
      "History Quest", "Timeline Pro", "Ancient World", "Civilization", "Famous Faces",
      "Typing Pro", "Keyboard Master", "Type Fast", "Key Board", "Finger Dance",
      "Code Learner", "Logic Bots", "Programmer", "HTML Hero", "CSS Star",
      "Color Theory", "Art Basics", "Draw Master", "Shape Pro", "Design 101",
      "Trivia Champ", "Quiz Master", "Brain Battle", "Fact or Fake", "Smart Quiz",
    ],
    descs: [
      "Fun math games that make learning numbers exciting. Addition, multiplication, and more.",
      "Build your vocabulary with word games and spelling challenges for all ages.",
      "Explore the world of science through interactive experiments and quizzes.",
      "Geography quiz game. Learn countries, capitals, flags, and landmarks.",
      "Learn to type faster with fun keyboard challenges and typing races.",
    ],
    controls: ["Mouse to select answers, Keyboard to type, Enter to confirm", "Click to choose, Type your answer, Space to continue", "Mouse to interact with lessons, Keyboard for input"],
    hows: ["Learn at your own pace. Each level introduces new concepts gradually.", "Practice regularly to improve your skills and knowledge.", "Challenge yourself with harder levels as you progress."],
    tags: ["educational", "learning", "math", "words", "science", "quiz", "brain"],
  },
  card: {
    titles: [
      "Solitaire Pro", "Klondike King", "Spider Solitaire", "Free Cell", "Pyramid Sol",
      "Poker Star", "Texas Holdem", "Omaha Pro", "Five Card Draw", "Stud Poker",
      "Blackjack Ace", "21 Pro", "Card Counter", "Dealer's Hand", "Bust House",
      "Hearts Master", "Spades Queen", "Bridge Champ", "Euchre Pro", "Pinochle King",
      "Rummy Pro", "Gin Rummy", "Canasta Star", "Mahjong Solitaire", "Tile Match",
      "Speed Card", "War Card", "Slap Jack", "Crazy Eights", "Uno Spin",
      "Memory Cards", "Match Pair", "Concentration", "Card Recall", "Flip Match",
      "Go Fish", "Old Maid", "Snap", "Beggar My Neighbour", "Cheat Card",
      "Patience", "Clock Solitaire", "Tri Peaks", "Golf Solitaire", "Pyramid",
    ],
    descs: [
      "Classic solitaire card game. Arrange cards in sequence and clear the board.",
      "Poker game with multiple variations. Bluff, bet, and win the pot.",
      "Blackjack strategy game. Beat the dealer without going over 21.",
      "Memory card game. Flip cards and find matching pairs to win.",
      "Classic rummy card game. Form sets and runs to go out first.",
    ],
    controls: ["Click to select cards, Drag to move, Double-click to auto-move", "Click to select, Right Click to hold, Drag to arrange", "Click cards to play them, Click deck to draw new cards"],
    hows: ["Learn the rules of each card game. Strategy varies by game type.", "In solitaire, plan your moves ahead to avoid getting stuck.", "In poker, know when to hold, fold, and bluff your opponents."],
    tags: ["card", "solitaire", "poker", "classic", "strategy", "casual", "table"],
  },
  board: {
    titles: [
      "Chess Master", "Grand Chess", "Knight's Move", "Pawn Power", "Rook Attack",
      "Checkers Pro", "Draughts King", "Jump Master", "Crown Me", "Board Control",
      "Backgammon", "Acey Deucy", "Bear Off", "Doubling Cube", "Points Game",
      "Monopoly Dash", "Property Tycoon", "Boardwalk", "Go Direct", "Pass Go",
      "Scrabble Star", "Word Tile", "Letter Rack", "Triple Score", "Bingo Pro",
      "Ludo King", "Parcheesi Pro", "Home Run", "Safe Zone", "Dice Roll",
      "Snakes Ladders", "Chute Slide", "Dice Hop", "Lucky Roll", "Board Jump",
      "Battleship", "Fleet Command", "Sea War", "Sink Ship", "Naval Battle",
      "Connect Four", "Four in Row", "Drop Disc", "Vertical Win", "Grid Drop",
    ],
    descs: [
      "Classic chess with multiple difficulty levels. Challenge AI or play with friends.",
      "Checkers game with beautiful graphics. Jump your way to victory.",
      "Backgammon strategy board game. Roll the dice and move your pieces wisely.",
      "Word board game. Place tiles to form words and score maximum points.",
      "Classic racing board game. Roll the dice and race to the finish line.",
    ],
    controls: ["Click to select piece, Click destination to move", "Drag pieces to move them to valid positions", "Click dice to roll, Click pieces to move them"],
    hows: ["Think several moves ahead. Board games are about strategy and planning.", "Learn the rules and develop your own winning strategies.", "Practice against AI before challenging human opponents."],
    tags: ["board", "chess", "checkers", "strategy", "classic", "tabletop", "game"],
  },
  casual: {
    titles: [
      "Bubble Pop", "Balloon Burst", "Match Color", "Gem Dash", "Jewel Fever",
      "Cookie Click", "Tap Away", "Fruit Slice", "Juice Drop", "Smoothie Mix",
      "Paint Bucket", "Color Fill", "Art Splash", "Draw Path", "Line Art",
      "Pop Star", "Star Crush", "Planet Match", "Comet Dash", "Nebula Pop",
      "Ball Bounce", "Paddle Play", "Keep Up", "Volley Ball", "Bounce Pro",
      "Fish Feed", "Aquarium Life", "Turtle Swim", "Jelly Float", "Coral Reef",
      "Bird Fly", "Flap Happy", "Wing It", "Sky Glide", "Feather Touch",
      "Rolling Ball", "Marble Maze", "Sphere Run", "Gravity Ball", "Tilt Maze",
      "Paper Plane", "Fold Fly", "Glide Master", "Soar High", "Wind Rider",
    ],
    descs: [
      "Relaxing bubble pop game. Match colors and clear the board in this soothing puzzle.",
      "Simple but addictive tap game. Keep tapping to build your score and unlock rewards.",
      "Fruit slicing action. Swipe to slice fruit but avoid the bombs.",
      "Color matching puzzle. Fill the board with color in as few moves as possible.",
      "Endless ball bouncing game. Keep the ball in the air and beat your high score.",
    ],
    controls: ["Click to pop bubbles, Match 3 or more to clear them", "Click or tap to interact, Swipe to slice", "Mouse to move paddle, Click to launch ball"],
    hows: ["Easy to learn, hard to master. Simple mechanics with increasing difficulty.", "Perfect for short gaming sessions. Play for a minute or an hour.", "Relax and enjoy the satisfying gameplay loops."],
    tags: ["casual", "relaxing", "simple", "addictive", "fun", "easy", "pick-up"],
  },
  multiplayer: {
    titles: [
      "Battle Arena", "Squad Clash", "Team Fight", "Group Battle", "Crew Wars",
      "Race Together", "Multi Kart", "Party Racers", "Group Drift", "Team Track",
      "Word Duel", "Quiz Battle", "Trivia Fight", "Brain Clash", "Smart Duel",
      "Tower Team", "Duo Defense", "Squad Protect", "Group Guard", "Team Tower",
      "Pong Online", "Net Pong", "Online Tennis", "Cyber Pong", "Digital Duel",
      "Snake Online", "Multi Snake", "Group Slither", "Team Worm", "Squad Snake",
      "Bomber Buddies", "Bomb Squad", "Team Blast", "Group Explode", "Boom Together",
      "Chess Online", "Net Chess", "Live Chess", "Real-Time Chess", "Quick Chess",
      "Cards Online", "Multi Card", "Table Together", "Group Cards", "Squad Poker",
    ],
    descs: [
      "Real-time multiplayer battle arena. Compete against players from around the world.",
      "Team-based multiplayer action. Coordinate with your squad to defeat the enemy team.",
      "Multiplayer racing game. Race against real players in real-time.",
      "Online quiz battle. Challenge friends or random opponents in trivia.",
      "Cooperative tower defense. Team up with friends to defend against waves.",
    ],
    controls: ["WASD to move, Mouse to aim, Click to attack, Chat with T", "Arrow Keys to move, Space to use item, Tab for scoreboard", "Same as single-player but against real opponents"],
    hows: ["Connect with players worldwide. Matchmaking finds opponents at your skill level.", "Communication is key in team games. Coordinate with your teammates.", "Practice to improve your rank on the global leaderboard."],
    tags: ["multiplayer", "online", "pvp", "versus", "real-time", "competitive", "social"],
  },
  io: {
    titles: [
      "Agar Clone", "Cell Eat", "Bio Mass", "Split Feed", "Merge Cells",
      "Slither Snake", "Worm Eat", "Long Crawl", "Grow Snake", "Length Battle",
      "Paper Io", "Territory War", "Land Grab", "Color Conquer", "Map Paint",
      "Surviv Io", "Last Stand", "Battle Royale", "Solo Win", "Final Circle",
      "Zombie Io", "Undead Survive", "Infected Zone", "Virus Outbreak", "Plague Io",
      "Star Io", "Galaxy Grab", "Space Eat", "Cosmos Grow", "Nebula Merge",
      "Tank Io", "Turret Battle", "Shell Shock", "Armor War", "Cannon Fight",
      "Diep Clone", "Shape Shoot", "Polygon War", "Geometric", "Angle Attack",
      "Worm Io", "Dirt Crawl", "Underground", "Soil Fight", "Earth Worm",
    ],
    descs: [
      "Popular .io game where you grow by consuming smaller cells. Avoid bigger ones.",
      "Snake battle royale. Eat food to grow and trap other snakes to eliminate them.",
      "Territory control game. Claim land by circling it and expanding your area.",
      "Last player standing battle royale. Collect weapons and be the final survivor.",
      "Tank battle game. Destroy other tanks and collect their resources to upgrade.",
    ],
    controls: ["Mouse to move, Space to split, W to eject mass", "Arrow Keys to steer your snake, Space to boost", "WASD to move, Mouse to aim, Click to shoot, 1-5 for weapons"],
    hows: ["Start small and avoid bigger players. Grow by collecting resources.", "Use strategy to trap opponents and take their resources.", "Stay alert - other players can attack at any moment."],
    tags: ["io", "multiplayer", "online", "battle-royale", "competitive", "addictive", "fun"],
  },
};

const thumbnails = [
  "https://placehold.co/400x250/1e293b/00d4ff",
  "https://placehold.co/400x250/0f172a/7c3aed",
  "https://placehold.co/400x250/1e293b/ec4899",
  "https://placehold.co/400x250/0f172a/10b981",
  "https://placehold.co/400x250/1e293b/f59e0b",
  "https://placehold.co/400x250/0f172a/ef4444",
  "https://placehold.co/400x250/1e293b/06b6d4",
  "https://placehold.co/400x250/0f172a/8b5cf6",
  "https://placehold.co/400x250/1e293b/14b8a6",
  "https://placehold.co/400x250/0f172a/f43f5e",
];

function generateGames(): Game[] {
  const games: Game[] = [];
  let id = 1;
  const categoryKeys = Object.keys(catPrefixes);

  for (const catKey of categoryKeys) {
    const cat = catPrefixes[catKey];
    const baseId = categoryKeys.indexOf(catKey) * 50;

    for (let i = 0; i < 50; i++) {
      const title = cat.titles[i % cat.titles.length];
      const uniqueSuffix = i >= cat.titles.length ? `-${Math.floor(i / cat.titles.length) + 1}` : "";
      const slug = `${title.toLowerCase().replace(/\s+/g, "-")}${uniqueSuffix}`;
      const descIndex = i % cat.descs.length;
      const controlIndex = i % cat.controls.length;
      const howIndex = i % cat.hows.length;
      const tagCount = cat.tags.length;
      const usedTags = [
        cat.tags[i % tagCount],
        cat.tags[(i + 1) % tagCount],
        cat.tags[(i + 2) % tagCount],
      ];
      const featured = i < 3;
      const trending = i >= 3 && i < 8;

      games.push({
        id,
        slug: `${slug}`,
        title: `${title}${uniqueSuffix ? ` ${uniqueSuffix.replace("-", "#")}` : ""}`,
        description: cat.descs[descIndex],
        thumbnail: `${thumbnails[id % thumbnails.length]}?text=${encodeURIComponent(title.slice(0, 15))}`,
        category: catKey as any,
        tags: usedTags,
        featured,
        trending,
        iframe_url: `https://example.com/game/${slug}`,
        controls: cat.controls[controlIndex],
        how_to_play: cat.hows[howIndex],
      });
      id++;
    }
  }
  return games;
}

export const games = generateGames();

export const categories = [
  { name: "racing" as const, label: "Racing", icon: "🏎️", description: "High-speed racing games for adrenaline junkies" },
  { name: "action" as const, label: "Action", icon: "🎯", description: "Thrilling action games packed with excitement" },
  { name: "puzzle" as const, label: "Puzzle", icon: "🧩", description: "Brain-teasing puzzles to challenge your mind" },
  { name: "sports" as const, label: "Sports", icon: "⚽", description: "Sports simulations and arcade sports action" },
  { name: "arcade" as const, label: "Arcade", icon: "🕹️", description: "Classic arcade games with modern twists" },
  { name: "adventure" as const, label: "Adventure", icon: "🗺️", description: "Epic adventures and exploration games" },
  { name: "shooting" as const, label: "Shooting", icon: "🔫", description: "Action-packed shooting and FPS games" },
  { name: "strategy" as const, label: "Strategy", icon: "♟️", description: "Strategic thinking and tactical warfare games" },
  { name: "simulation" as const, label: "Simulation", icon: "🏙️", description: "Realistic simulation and management games" },
  { name: "horror" as const, label: "Horror", icon: "👻", description: "Spooky horror and thriller games" },
  { name: "fighting" as const, label: "Fighting", icon: "🥊", description: "Head-to-head combat and fighting games" },
  { name: "platformer" as const, label: "Platformer", icon: "🏃", description: "Jump-and-run platforming adventures" },
  { name: "rpg" as const, label: "RPG", icon: "⚔️", description: "Role-playing games with deep progression" },
  { name: "music" as const, label: "Music", icon: "🎵", description: "Rhythm and music-based games" },
  { name: "educational" as const, label: "Educational", icon: "📚", description: "Fun learning games for all ages" },
  { name: "card" as const, label: "Card", icon: "🃏", description: "Classic card games and solitaire" },
  { name: "board" as const, label: "Board", icon: "🎲", description: "Digital board games for everyone" },
  { name: "casual" as const, label: "Casual", icon: "☕", description: "Relaxing casual games to unwind" },
  { name: "multiplayer" as const, label: "Multiplayer", icon: "👥", description: "Play with friends online" },
  { name: "io" as const, label: "IO Games", icon: "🌐", description: "Popular .io browser games" },
];

export const featuredGames = games.filter((g) => g.featured);
export const trendingGames = games.filter((g) => g.trending);
export const recentGames = [...games].slice(-40).reverse();

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}

export function getGamesByCategory(category: string): Game[] {
  return games.filter((g) => g.category === category);
}

export function getGamesByTag(tag: string): Game[] {
  return games.filter((g) => g.tags.includes(tag));
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  games.forEach((g) => g.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

export function getRelatedGames(game: Game, count = 12): Game[] {
  return games
    .filter((g) => g.id !== game.id && (g.category === game.category || g.tags.some((t) => game.tags.includes(t))))
    .slice(0, count);
}

export function searchGames(query: string): Game[] {
  const q = query.toLowerCase();
  return games.filter(
    (g) =>
      g.title.toLowerCase().includes(q) ||
      g.description.toLowerCase().includes(q) ||
      g.tags.some((t) => t.toLowerCase().includes(q)) ||
      g.category.toLowerCase().includes(q)
  );
}
