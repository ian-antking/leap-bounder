const playerAnimations = [
  {
    isStatic: true,
    name: 'dead',
    prefix: 'playerRed_dead',
    frameRate: 10,
  },
  {
    isStatic: true,
    name: 'duck',
    prefix: 'playerRed_duck',
    frameRate: 10,
  },
  {
    isStatic: true,
    name: 'fall',
    prefix: 'playerRed_fall',
    frameRate: 10,
  },
  {
    isStatic: true,
    name: 'hit',
    prefix: 'playerRed_hit',
    frameRate: 10,
  },
  {
    isStatic: true,
    name: 'roll',
    prefix: 'playerRed_roll',
    frameRate: 10,
  },
  {
    isStatic: true,
    name: 'stand',
    prefix: 'playerRed_stand',
    frameRate: 10,
  },
  {
    isStatic: false,
    name: 'swim',
    prefix: 'playerRed_swim',
    start: 1,
    end: 2,
    frameRate: 10,
    repeat: -1,
  },
  {
    isStatic: false,
    name: 'switch',
    prefix: 'playerRed_switch',
    start: 1,
    end: 2,
    frameRate: 10,
    repeat: -1,
  },
  {
    isStatic: false,
    name: 'up',
    prefix: 'playerRed_up',
    start: 1,
    end: 3,
    frameRate: 10,
    repeat: -1,
  },
  {
    isStatic: false,
    name: 'walk',
    prefix: 'playerRed_walk',
    start: 1,
    end: 5,
    frameRate: 10,
    repeat: -1,
  },
];

export default playerAnimations;
