import {Database, fetchUrlResults, initaliseDb} from "./helpers/index";
import {Car} from "./interfaces/index";

const loggerobj = require('bunyan').createLogger({name: 'index'})

const urlList = [
  'http://site1.com/path',
  'http://site2.com/path',
  'http://site3.com/path',
  'http://test.com/path'
]

export const fetchUrlData = async function ({db = new Database(), urlArray = urlList, logger = loggerobj}) {
  // Database is for saving any type of object to database
  try {
    const allPromises = urlArray.map(fetchUrlResults)
    const combinedPromise = Promise.all(allPromises)
    const details = await combinedPromise;
    for (const item of details) {
      db.save(<Car>item)
      if (((<Car>item).url !== undefined) && (<Car>item).url.split('/')[2] === 'test.com') {
        logger.info(item)
      }
    }
  } catch (e) {
    logger.error(e);
    throw e;
  }
};
export const findAllNonAWDCars = function (color: string, what: RegExp) {
  const db = initaliseDb();
  return db.find(color, what)
}

