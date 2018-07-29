import * as assert from 'assert';
import {Request} from './index';
import {Database} from "./index";

describe('get Url function', () => {
  let request: any
  beforeEach(() => {
    request = new Request();
  })
  afterEach(() => {
    request = undefined
  })
  it('should fetch details based on url', async function () {
    const url = 'http://test.com/path'
    const result = request.get(url);
    assert(result[0].url === url)
  });
})
describe('Database save', () => {
  let db: any, car: any
  beforeEach(() => {
    db = new Database();
    car = {
      brand: 'site1',
      color: 'Red',
      engineSize: 100,
      drive: '2wd'
    }
  })
  afterEach(() => {
    db = undefined
    car = undefined
  })
  it('should add car to database', async function () {
    db.save(car)
    const savedObject = db.get()[0];
    assert(savedObject !== undefined)
    let matching = true;
    Object.keys(car).forEach(item => car[item] !== savedObject[item] ? matching = false : matching = true);
    assert(matching)
  });
})