class DbCollection {
  async make(self: any, data: { [key: string]: any }) {
    const $_attributes: { [key: string]: any } = {};
    const _self = Object.assign(
      Object.create(Object.getPrototypeOf(self)),
      self
    );
    _self.$_MySql = true;

    for await (const key of Object.getOwnPropertyNames(data)) {
      $_attributes[key] = data[key];
    }

    _self.$_attributes = $_attributes;

    return this.dataProxy(_self);
  }

  async save(): Promise<boolean> {
    return true;
  }

  dataProxy(target: any) {
    return new Proxy(target, this.proxyHandler);
  }

  proxyHandler = {
    get(target: any, name: any, receiver: any) {
      if (Reflect.has(target["$_attributes"], name)) {
        let rv = Reflect.get(target["$_attributes"], name, receiver);
        return rv;
      }

      if (Reflect.has(target, name)) {
        return name in target ? target[name] : (...args: any[]) => self;
      }
    },
  };
}

export default new DbCollection();
