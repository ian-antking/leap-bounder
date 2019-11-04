const createAmimations = (prefab, scene, animations) => {
  animations.forEach(animation => {
    const frame = animation.isStatic ?
      [{
        key: prefab.spriteKey,
        frame: animation.prefix || animation.name,
      }] : (
        scene.anims.generateFrameNames(prefab.spriteKey, {
          prefix: animation.prefix || animation.name,
          start: animation.start,
          end: animation.end,
        })
      );

    const config = {
      key: animation.name,
      frames: frame,
      frameRate: animation.frameRate,
    };

    if (animation.repeat) {
      config.repeat = animation.repeat;
    }

    scene.anims.create(config);
  });
};

export default createAmimations;
