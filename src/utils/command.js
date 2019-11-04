class Command {
  constructor(name, properties) {
    this.name = name;
    let property;
    for (property in properties) {
      this[property] = properties[property];
    }
  }
}

export default Command;
