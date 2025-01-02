import { Injectable } from '@angular/core';
import {Item} from "../models/Item.model";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  // I gave up on this, not sure how to do it, I was hoping to store a seedData to populate the store right off the bat, instead I am just gonna change the idea of the site. (: hope you accept it Sabbir.
  private seedData: Item[] = [
    {

      id: 1,
      productName: "Apple",
      price: 7,
      image: "apple.jpg",
      quantity: 44,
      description: "Crispy Apples",
      selectedQuantity:0,
    },
    {
      id: 2,
      productName: "Banana",
      price: 5,
      quantity: 33,
      description: "Yellow good stuff",
      image: "bananas.jpg",
      selectedQuantity: 0,
    },
  ];
  constructor() {

  }

  db: any

  initDatabase() {
    this.createDatabase().then(data => {
      console.log("Database created successfully: " + data)
    }).catch(e => {
      console.log("Error in database creation: " + e.message)
    })
  }

  createDatabase(): Promise<any> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("CelerStoreDB", 1);

      request.onerror = (event) => {
        console.error("Error in creating database!");
      };

      request.onsuccess = (event) => {
        console.log("onsuccess called");
        // @ts-ignore
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        console.log("onupgradeneeded called");
        // @ts-ignore
        this.db = event.target.result;
        const itemStore = this.db.createObjectStore("item",{
          keyPath: "id",
          autoIncrement: true,
        });
        const inventoryStore = this.db.createObjectStore("inventory", {
          keyPath: "id",
          autoIncrement: true,
        });
        const availableInventory = [
          {productName: "Banana", price: 2, image:"bananas.jpg", description:"Yellow and really good (:", quantity: 9},
          {productName: "Apple", price: 3, image:"apple.jpg", description:"Tim Cook", quantity: 22},
        ];
        availableInventory.forEach(item => {
          inventoryStore.add(item);
        });
      };
    });
  }
}
