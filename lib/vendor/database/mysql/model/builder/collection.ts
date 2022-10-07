class Collection {
  [key: string]: any;

  async make(data: { [key: string]: any }) {
    for await (const key of Object.getOwnPropertyNames(data)) {
      this[key] = data[key];
    }

    return this;
  }

  async save(): Promise<boolean> {
    return true;
  }
}

export default new Collection();
