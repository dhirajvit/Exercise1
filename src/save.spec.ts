import * as assert from 'assert';
import {Database} from './helpers';
import * as sinon from 'sinon';
import {fetchUrlData, findAllNonAWDCars} from "./save";

describe('fetchUrlData function - Exercise 1: Requirement 2 & 3', () => {
  let urlArray: string[], logger: any
  beforeEach(() => {
    urlArray = [
      'http://site1.com/path',
      'http://site2.com/path',
      'http://site3.com/path',
      'http://test.com/path'
    ]
    logger = require('bunyan').createLogger({name: 'index'})
    logger.info = sinon.fake();
  })
  afterEach(() => {
    urlArray = undefined
  })
  it('should fetch data from all url and insert and log for test.com', async function () {
    try {
      const db = new Database()
      await fetchUrlData({db, logger});
      const carDetails = db.get()
      assert(carDetails.length === 4)
      assert(logger.info.called)
    } catch (e) {
      assert(false)
    }
  });
  it('should fetch data for few url and insert and no logger', async function () {
    try {
      urlArray = [
        'http://site1.com/path'
      ]
      const db = new Database()
      await fetchUrlData({db, urlArray, logger});
      const carDetails = db.get()
      assert(carDetails.length === 1)
      assert(!logger.info.called)
    } catch (e) {
      console.log(e);
      assert(false)
    }
  });
  it('should fetch data for few url and insert and logger', async function () {
    try {
      urlArray = [
        'http://test.com/path'
      ]
      const db = new Database()
      await fetchUrlData({db, urlArray, logger});
      const carDetails = db.get()
      assert(carDetails.length === 1)
      assert(logger.info.called)
    } catch (e) {
      console.log(e);
      assert(false)
    }
  });
});
describe('findAllNonAWDCars function - Exercise 1: Requirement 4', () => {
  let urlArray: string[], logger: any
  beforeEach(() => {
    urlArray = [
      'http://site1.com/path',
      'http://site2.com/path',
      'http://site3.com/path',
      'http://test.com/path'
    ]
    logger = require('bunyan').createLogger({name: 'index'})
    logger.info = sinon.fake();
  })
  afterEach(() => {
    urlArray = undefined
  })
  it('should find details based on parameters', async function () {
    try {
      const result = await findAllNonAWDCars('drive', /(2|4)wd/);
      assert(result.filter(item => item.drive === 'awd').length === 0)
    } catch (e) {
      assert(false)
    }
  });
});

