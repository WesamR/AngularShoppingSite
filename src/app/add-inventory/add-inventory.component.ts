import {Component, inject} from '@angular/core';
import {Inventory} from "../../models/Inventory.model";
import {FormsModule} from "@angular/forms";
import {CommonModule, JsonPipe} from "@angular/common";
import {InventoryDalService} from "../../services/inventory-dal.service";
import {Router, RouterLink} from "@angular/router";
import {DatabaseService} from "../../services/database.service";

@Component({
  selector: 'app-add-inventory',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './add-inventory.component.html',
  styleUrl: './add-inventory.component.css'
})
export class AddInventoryComponent {
  inventory:Inventory[] = [];

  inventoryItem: Inventory = new Inventory("Bananas", 3);
  router =inject(Router);
  dal=inject(InventoryDalService)
  db=inject(DatabaseService)
  constructor() {
    this.showAll();
  }
  showAll() {
    this.dal.selectAll().then((data) => {
      this.inventory = data;
      console.log(this.inventory)
    }).catch((e) => {
      console.log(e);
      this.inventory = [];
    })
  }

  onAddClick(){
    this.dal.insert(this.inventoryItem).then((data) =>{
      console.log(data);
      alert("Record added successfully");
      this,this.showAll();
    }).catch(e =>{
      console.log("Error " + e.message)
    })
  }

  //A little familiar to c# stuff. Always interesting to see similarities in languages.
  onImageChange(event: any): void{
    const file = event.target.files[0];
    if (file){
      const reader = new FileReader();
      reader.onload = (e: any) =>{
        this.inventoryItem.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onModifyClick(inventory: Inventory){
    this.router.navigate([`/inventory/${inventory.id}`]);
  }

  onDeleteClick(inventory: Inventory){
    this.dal.delete(inventory)
      .then((data)=> {
        console.log(data);
        this.showAll();
        alert("Inventory item delete successfully");
      })
      .catch((e)=>{
        console.log(e);
      })
  }
}
