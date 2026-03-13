// Games Rules Map
const GAME_RULES = {
    "9-ball": { ballValue: (n) => (n === 9 ? 2 : 1), moneyBall: 9, maxBalls: 9, rackValue: 10 },
    "8-ball": { ballValue: (n) => (n === 8 ? 1 : 0), moneyBall: 8, maxBalls: 15, rackValue: 1 },
    "10-ball": { ballValue: (n) => (n === 8 ? 1 : 0), moneyBall: 10, maxBalls: 10, rackValue: 1 }
};

// Game Win Map
const WIN_CHARTS = {
    "9-ball": { 1: 14, 2: 19, 3: 25, 4: 31, 5: 38, 6: 46, 7: 55, 8: 65, 9: 75 },
    "8-ball": { 1: 2, 2: 2, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8 },
    "10-ball": { 1: 2, 2: 2, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8 }
};