export default function ({  req, res }) {
  if (process.client === false) {
    // lowdb
    const low = require('lowdb');
    const FileSync = require('lowdb/adapters/FileSync');
    const adapter = new FileSync('../db.json');
    const db = low(adapter);

    if (req.path === '/events') {
      let evs = db.get('events').value();
      res.json(evs)
    }
  }
}
