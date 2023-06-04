const client = require("../controllers/redisController");

const setKey = (data) => JSON.stringify(data);

const saveMultiple = async (data, key, saveNormal = true) => {
  client.set(key, JSON.stringify(data));
  if (Array.isArray(data)) {
    data.forEach((ele) => {
      if (saveNormal) client.set(setKey(ele._id), ele);
      else client.set(setKey(ele._id), JSON.stringify(ele));
    });
  }
};

const saveSingle = async (data, key, saveNormal = true) => {
  if (Array.isArray(data)) {
    const rData = JSON.stringify(data);
    client.set(key, rData);
  }
  client.set(key, data);
};

module.exports = { setKey, saveMultiple, saveSingle };
