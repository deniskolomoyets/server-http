import { db } from "../database.js";

export const itemModel = {
  getAllItems: function () {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM items", [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },
};
