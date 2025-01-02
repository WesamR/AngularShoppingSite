import { Routes } from '@angular/router';
import {CartpageComponent} from "./cartpage/cartpage.component";
import {AttributionpageComponent} from "./attributionpage/attributionpage.component";
import {ErropageComponent} from "./erropage/erropage.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {SignuppageComponent} from "./signuppage/signuppage.component";
import {LoginpageComponent} from "./loginpage/loginpage.component";
import {CheckoutpageComponent} from "./checkoutpage/checkoutpage.component";
import {StorespageComponent} from "./storespage/storespage.component";

import {ActivatedRoute} from "@angular/router";
import {AddInventoryComponent} from "./add-inventory/add-inventory.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {StoreLocationsPageComponent} from "./store-locations-page/store-locations-page.component";
import {ModifyDetailsComponent} from "./modify-details/modify-details.component";
import {CameraComponent} from "./camera/camera.component";
import {ThankYouPageComponent} from "./thank-you-page/thank-you-page.component";

export const routes: Routes = [
  {path: "cart",data:{ title:"Cart"}, component:CartpageComponent},
  {path: "attribute",data:{ title:"Attribute"}, component:AttributionpageComponent},
  {path: "home", data:{ title:"Home"}, component: HomepageComponent},
  {path: "signup",data:{ title:"Signup"}, component: SignuppageComponent},
  {path: "login",data:{ title:"Login"}, component: LoginpageComponent},
  {path: "checkout",data:{ title:"Checkout"}, component:CheckoutpageComponent},
  {path: "store", data:{title: "Store"}, component: StorespageComponent},
  {path: "inventory", data:{title: "Inventory"}, component: AddInventoryComponent},
  {path: "locations", data:{title: "Map"}, component: StoreLocationsPageComponent},
  {path: "camera", data:{title: "Camera"}, component: CameraComponent},
  {path: "editDetails/:id", data:{title: "Edit Details"}, component: ModifyDetailsComponent},
  {path: "thankYou", data:{title: "Thank You!"}, component:ThankYouPageComponent},
  {path: "details/:id", data:{title:"Details"}, component: ProductDetailsComponent},
  {path: "*", component:ErropageComponent},
  {path: "", redirectTo: "home", pathMatch: "full"},

];
