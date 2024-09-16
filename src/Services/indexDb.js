// db.js
import { openDB } from 'idb';

const dbPromise = openDB('streamvibe', 1, {
  upgrade(db) {
    db.createObjectStore('apiData');
  },
});

export const setApiData = async (key, data) => {
  const db = await dbPromise;
  await db.put('apiData', data, key);
};

export const getApiData = async (key) => {
  const db = await dbPromise;
  return await db.get('apiData', key);
};
