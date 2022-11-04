class ResponseJsonSerialize {
  async serialize(data: any) {
    if (Array.isArray(data)) {
      const arr1: any[] = [];
      for await (const d of data) {
        if (d.$_MySql != null) {
          arr1.push(await this.mysql(d));
        } else {
          arr1.push(d);
        }
      }

      return arr1;
    }

    if (data.$_MySql != null) {
      delete data.$_MySql;
      if (data.data != null) {
        if (Array.isArray(data.data)) {
          for (let index = 0; index < data.data.length; index++) {
            data.data[index] = await this.mysql(data.data[index]);
          }
        }
      }

      if (data.$_attributes != null) {
        return await this.mysql(data);
      }
    }

    return data;
  }
  async mysql(data: { [key: string]: any }) {
    const keys = Object.getOwnPropertyNames(data.$_attributes);

    for await (const k of keys) {
      if (data.hidden.includes(k)) {
        delete data.$_attributes[k];
      }
    }

    return data.$_attributes;
  }
}

export default new ResponseJsonSerialize();
