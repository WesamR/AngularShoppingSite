import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {Item} from "../../models/Item.model";
import {BuyingDalService} from "../../services/buying-dal.service";
@Component({
  selector: 'app-cartpage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cartpage.component.html',
  styleUrl: './cartpage.component.css'
})
export class CartpageComponent {
  title="Cart";
  items:Item[] = [];
  dal = inject(BuyingDalService)
  router = inject(Router)
  constructor() {
    this.showAll();
  }
  showAll() {
    this.dal.itemSelectAll().then((data) => {
      this.items = data;
      console.log(this.items)
    }).catch((e) => {
      console.log(e);
      this.items = [];
    })
  }
  get totalCost(): number{
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
  onModifyClick(item: Item){
    this.router.navigate([`/cart/${item.id}`]);
  }
  onDeleteClick(item: Item){
    this.dal.itemDelete(item)
      .then((data)=> {
        console.log(data);
        this.showAll();
        alert("Inventory item deleted successfully");
      })
      .catch((e)=>{
        console.log(e);
      })
  }
  checkout() {
    this.dal.deleteAll()
      .then(() => {
        this.router.navigate(['/thankYou']);
      })
      .catch((e) => {
        console.error("Error deleting items:", e);
      });
  }
}
