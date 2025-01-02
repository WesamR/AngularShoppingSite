import {inject, Injectable} from '@angular/core';
import {DatabaseService} from "./database.service";
import {Inventory} from "../models/Inventory.model";
import {Item} from "../models/Item.model";
@Injectable({
  providedIn: 'root'
})
export class InventoryDalService {
  //follow teacher example, and that should do what we need.
  database = inject(DatabaseService)
  constructor() { }
  insert(inventory: Inventory): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["inventory"], "readwrite");
      transaction.oncomplete = (event: any) => {
        console.log("Success: insert transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in insert transaction: " + event);
      };
      const inventoryStore = transaction.objectStore("inventory");
      const req = inventoryStore.add(inventory);
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
  selectAll(): Promise<Item[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["inventory"]); // Read-only
      transaction.oncomplete = () => {
        console.log("Success: selectAll transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in selectAll transaction: " + event);
        reject(event);
      };
      const inventoryStore = transaction.objectStore("inventory");
      const req = inventoryStore.getAll();
      req.onsuccess = (event: any) => {
        const inventoryList: Inventory[] = event.target.result;
        const itemList: Item[] = inventoryList.map((inventory) => ({
          ...inventory,
          selectedQuantity: 1,
        }));
        resolve(itemList);
      };
      req.onerror = (event: any) => {
        console.log("Error: error in selectAll: " + event);
        reject(event);
      };
    });
  }
  select(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["inventory"]); //readonly
      transaction.oncomplete = (event: any) => {
        console.log("Success: select transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in select transaction: " + event);
      };
      const inventoryStore = transaction.objectStore("inventory");
      const req = inventoryStore.get(id);
      req.onsuccess = (event: any) => {
        event.target.result ? resolve(event.target.result) : resolve(null);
      };
      req.onerror = (event: any) => {
        console.log("Error: error in select: " + event);
        reject(event);
      };
    });
  }
  update(inventory: Inventory): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["inventory"], "readwrite");
      transaction.oncomplete = (event: any) => {
        console.log("Success: update transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in update transaction: " + event);
      };
      const inventoryStore = transaction.objectStore("inventory");
      const reqUpdate = inventoryStore.put(inventory);
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
  delete(inventory: Inventory): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["inventory"], "readwrite");
      transaction.oncomplete = (event: any) => {
        console.log("Success: delete transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in delete transaction: " + event);
      };
      const inventoryStore = transaction.objectStore("inventory");
      if (inventory.id) {
        const reqDelete = inventoryStore.delete(inventory.id);
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
}


