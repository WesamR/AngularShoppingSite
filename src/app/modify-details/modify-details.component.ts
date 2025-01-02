import {Component, inject} from '@angular/core';
import {Item} from "../../models/Item.model";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Inventory} from "../../models/Inventory.model";
import {InventoryDalService} from "../../services/inventory-dal.service";
@Component({
  selector: 'app-modify-details',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './modify-details.component.html',
  styleUrl: './modify-details.component.css'
})
export class ModifyDetailsComponent {

  inventoryItem: Inventory = new Inventory("", 0, "","", 0);
  dal=inject(InventoryDalService);
  router=inject(Router);
  activatedRoute=inject(ActivatedRoute);
  constructor() {
    const itemId = this.activatedRoute.snapshot.params["id"];
    this.dal.select(itemId)
      .then((data: Item) =>{
        this.inventoryItem = data;
      }).catch((e) =>{
        console.log("Error getting item details: ", e.message);
      });
  }
  onModifyClick() {
    this.dal.update(this.inventoryItem)
      .then(() => {
        alert("Update successfull!!!!!!!!!!!!");
        this.router.navigate(['/cart']);
      })
      .catch(e => {
        console.error("Error updating item: ", e.message);
      });
  }
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.inventoryItem.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
