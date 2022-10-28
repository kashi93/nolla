globalThis.view = (
  path: string,
  data: { [key: string]: any } = {}
): Function => {
  return () => {
    return {
      view: path,
      data,
    };
  };
};
