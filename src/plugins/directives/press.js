let press = {
  bind() {
    console.log("bind");
  },
  update(el, binding, vnode) {
    console.log("update", binding);
  },
  inserted() {
    console.log("inserted");
  },
};

export default press;
