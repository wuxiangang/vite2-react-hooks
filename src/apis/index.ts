const modules = import.meta.globEager("./modules/*.ts");

const Apis: { [key: string]: any } = {};

Object.keys(modules).forEach((key) => {
  if (key.includes("_")) return;
  Apis[key.replace(/(.*\/)*([^.]+).*/gi, "$2")] = modules[key];
});

export default Apis;
