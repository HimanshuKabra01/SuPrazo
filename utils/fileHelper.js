const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/tasks.json');

function readData() {
  return new Promise((resolve, reject) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
      if(err) {
        if(err.code === 'ENOENT') {
          resolve([]);
        } else {
          reject(err);
        }
      } else {
        try {
          resolve(JSON.parse(data || '[]'));
        } catch {
          reject(parseError);
        }
      }
    });
  });
}

function writeData(content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(DATA_FILE, JSON.stringify(content, null, 2), 'utf8', (err) => {
      if(err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

module.exports = {
  readData,
  writeData
};