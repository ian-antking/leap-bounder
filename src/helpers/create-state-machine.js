import StateMachine from '../utils/state-machine';


const createStateMaching = (scene, prefab, states) => {
  const stateMachine = new StateMachine(scene);
  Object.keys(states).forEach(stateKey => {
    stateMachine.addState(new states[stateKey](stateKey, prefab));
  });
  return stateMachine;
};

export default createStateMaching;
