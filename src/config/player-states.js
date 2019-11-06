import StandState from '../states/player/stand';
import WalkState from '../states/player/walk';
import FallState from '../states/player/fall';

const playerStates = {
  stand: StandState,
  walk: WalkState,
  fall: FallState,
};

export default playerStates;
