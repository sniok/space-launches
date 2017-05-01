const root = "https://launchlibrary.net/1.2";
const api = {
  launches: async () => {
    const r = await fetch(root + "/launch?mode=verbose");
    const o = await r.json();
    return o;
  },
  launch: async id => {
    const r = await fetch(root + "/launch/" + id + "?mode=verbose");
    const o = await r.json();
    return o;
  }
};

export default api;
