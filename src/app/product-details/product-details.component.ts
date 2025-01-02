import { Component } from '@angular/core';
import {Inventory} from "../../models/Inventory.model";
import {ActivatedRoute} from "@angular/router";
import {InventoryDalService} from "../../services/inventory-dal.service";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  id: number | null = null;
  item: Inventory | null = null;

  constructor(
    private route: ActivatedRoute,
    private inventoryDalService: InventoryDalService
  ) {
    this.route.params.subscribe(params => {
      this.id = +params['id'];

      if (this.id) {
        this.inventoryDalService.select(this.id)
          .then(product => {
            this.item = product;
          })
          .catch(error => {
            console.error('Error getting product details:', error);
          });
      }
    });
  }
}
