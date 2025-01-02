import {inject, Injectable} from '@angular/core';
import {DatabaseService} from "./database.service";
// I think this is useless, I was gonna use it for something, but ended up using the buying-dal.services.ts.
// but well see, might come back to it.
@Injectable({
  providedIn: 'root'
})
export class CartDalService {

  database=inject(DatabaseService)
  constructor() { }

  insert(item:any): Promise<void> {
    return new Promise((resolve, reject) =>{
      const transaction = this.database.db.transaction(["cart"],"readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: insert transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in insert transaction: " + event);
      };

      const cartStore = transaction.objectStore("cart");
      const request = cartStore.add(item);

      request.onsuccess = (event: any) =>{
        console.log(`Success: book added successfully ${event.target.result}`);
        resolve(event.target.result);
      };

      request.onerror = (event: any) =>{
        console.log("Error: error in add: " + event);
        reject(event);
      };
    });
  }
}
