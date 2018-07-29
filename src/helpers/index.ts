import {Car} from '../interfaces';
import {carDetails} from "../data/index";

export async function fetchUrlResults(url: string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const cars = carDetails.filter((item: any) => item.url === url)
      cars.length > 0 ? resolve(cars[0]) : reject('Not Found')
    }, 1000)
  })
}


export class Database {
  data: any[]

  constructor() {
    this.data = []
  }

  //  write a function to save to to a file
  save(carObject: Car) {
    // write to database
    this.data = [...this.data, carObject]
  }

  get(): Car[] {
    return this.data
  }

  find(attr: string, what: RegExp): any[] {
    return this.data.filter(item => item.hasOwnProperty(attr) && what.test(item[attr]))
  }
}

export const initaliseDb = function () {
  const db = new Database();
  db.data = carDetails;
  return db;
}

export class Request {
  db: any;

  constructor() {
    this.db = initaliseDb();
  }

  get(url: string): Car {
    return this.db.get().filter((item: any) => item.hasOwnProperty('url') && item.url === url)
  }
}
