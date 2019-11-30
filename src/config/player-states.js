import StandState from '../states/player/stand';
import WalkState from '../states/player/walk';
import FallState from '../states/player/fall';
import DeadState from '../states/player/dead';

const playerStates = {
  stand: StandState,
  walk: WalkState,
  fall: FallState,
  dead: DeadState,
};

export default playerStates;
