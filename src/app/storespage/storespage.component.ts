import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {InventoryDalService} from "../../services/inventory-dal.service";
import {BuyingDalService} from "../../services/buying-dal.service";
import {Item} from "../../models/Item.model";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-storespage',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './storespage.component.html',
  styleUrl: './storespage.component.css'
})
export class StorespageComponent{

  title: string="Celer";
  router =inject(Router);
  inventory: Item[] = [];
  cart: Item[] = [];
  invDal = inject(InventoryDalService);
  itemDal = inject(BuyingDalService);

  constructor() {
    this.loadInventory();
    this.loadCart();
  }

  //This takes items from "inventory" and loads store page with em.
  loadInventory(){
    this.invDal.selectAll().then((data: Item[])=>{
      this.inventory = data;
      console.log("Inventory loaded successfully: ", this.inventory);
    }).catch((e) =>{
      console.error("Error loading the inventory: ", e);
    });
  }

  loadCart(): void {
    this.itemDal.itemSelectAll()
      .then((data: Item[]) => {
        this.cart = data;
      })
      .catch((e) => {
        console.error("Error loading cart:", e);
      });
  }


  //adding to cart store to be specific, and try to have the quantity decrease to stimulate decrease of inventory to make it look nicer.
  //hmmmmmmmmmm, come back to it later, for now do other parts and come back to it.
  addToCart(item: Item) {
    const howMuchToAdd = item.selectedQuantity || 1;
    const itemInCart = this.cart.find(itemInCart => itemInCart.id === item.id);
    if (itemInCart) {
      // I could not do what I wanted to, this was an easier work around. And it looked better than I thought.
      alert(`The item "${item.productName}" is already in your cart. Please remove it from the cart before adding it again, or modify order from cart (:`);
      //ah!! this "return" stops it from triggering the next "if" so the number doesnt decrease on store page. if already in cart.
      return;
    }
    if (item.quantity > 0 && howMuchToAdd <= item.quantity) {
      item.quantity -= howMuchToAdd;
      const itemToAdd = { ...item, quantity: howMuchToAdd };

      this.itemDal.itemInsert(itemToAdd)
        .then(() => {
          alert(`Item added to cart successfully:  ${itemToAdd.productName}`);
          return this.invDal.update(item);
        })
        .then(() => {
          this.loadCart();
          this.loadInventory();
        })
        .catch(e => {
          console.error("Error adding item to cart: ", e.message);
        });
    } else if (item.quantity === 0) {
      this.inventory = this.inventory.filter(inventoryItem => inventoryItem.id !== item.id);
      console.log(`The item (${item.productName}) should be removed from store, since it is "out of stock". Check db to make sure.`);
    } else {
      console.log(`We need more "${item.productName}".`);
    }
  }
}
