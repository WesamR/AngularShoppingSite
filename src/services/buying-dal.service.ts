import {inject, Injectable} from '@angular/core';
import {DatabaseService} from "./database.service";
import {Inventory} from "../models/Inventory.model";
import {Item} from "../models/Item.model";
@Injectable({
  providedIn: 'root'
})
export class BuyingDalService {
  //Just follow teachers example code for this I think.
  database = inject(DatabaseService)

  constructor() {
  }

  itemInsert(item: Item): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["item"], "readwrite");
      transaction.oncomplete = (event: any) => {
        console.log("Success: itemInsert transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in itemInsert transaction: " + event);
      };
      const itemStore = transaction.objectStore("item");
      const req = itemStore.add(item);
      req.onsuccess = (event: any) => {
        console.log(`Success: book added successfully ${event.target.result}`);
        resolve(event.target.result);
      };
      req.onerror = (event: any) => {
        console.log("Error: error in add: " + event);
        reject(event);
      };
    });
  }

  itemSelectAll(): Promise<Item[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["item"]); //readonly
      transaction.oncomplete = (event: any) => {
        console.log("Success: itemSelectAll transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in itemSelectAll transaction: " + event);
      };
      const itemStore = transaction.objectStore("item");
      const req = itemStore.getAll();
      req.onsuccess = (event: any) => {
        resolve(event.target.result);
      };
      req.onerror = (event: any) => {
        console.log("Error: error in itemSelect: " + event);
        reject(event);
      };
    });
  }

  itemSelect(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["item"]); //readonly
      transaction.oncomplete = (event: any) => {
        console.log("Success: itemSelect transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in itemSelect transaction: " + event);
      };
      const itemStore = transaction.objectStore("item");
      const req = itemStore.get(id);
      req.onsuccess = (event: any) => {
        event.target.result ? resolve(event.target.result) : resolve(null);
      };
      req.onerror = (event: any) => {
        console.log("Error: error in itemSelect: " + event);
        reject(event);
      };
    });
  }

  itemUpdate(item: Item): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["item"], "readwrite");
      transaction.oncomplete = (event: any) => {
        console.log("Success: itemUpdate transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in itemUpdate transaction: " + event);
      };
      const itemStore = transaction.objectStore("item");
      const reqUpdate = itemStore.put(item);
      reqUpdate.onsuccess = (event: any) => {
        console.log(`Success: data updated successfully: ${event}`);
        resolve(event);
      };
      reqUpdate.onerror = (event: any) => {
        console.log(`Error: failed to update: ${event}`);
        reject(event)
      };
    });
  }

  itemDelete(item: Item): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["item"], "readwrite");
      transaction.oncomplete = (event: any) => {
        console.log("Success: itemDelete transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in itemDelete transaction: " + event);
      };
      const itemStore = transaction.objectStore("item");
      if (item.id) {
        const reqDelete = itemStore.delete(item.id);
        reqDelete.onsuccess = (event: any) => {
          console.log(`Success: data deleted successfully: ${event}`);
          resolve(event);
        };
        reqDelete.onerror = (event: any) => {
          console.log(`Error: failed to delete: ${event}`);
          reject(event);
        };
      } else {
        reject("inventory Item does not have id")
      }
    });
  }
  deleteAll(): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["item"], "readwrite");
      transaction.oncomplete = () => {
        console.log("Success: deleteAll transaction successful");
        resolve();
      };
      transaction.onerror = (event: Event) => {
        console.error("Error: error in deleteAll transaction", event);
        reject(event);
      };
      const itemStore = transaction.objectStore("item");
      const req = itemStore.clear();
      req.onsuccess = () => {
        console.log("Success: all items deleted");
      };
      req.onerror = (event: Event) => {
        console.error("Error: failed to delete all items", event);
        reject(event);
      };
    });
  }





}
