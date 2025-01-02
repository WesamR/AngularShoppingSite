import { Component, inject } from '@angular/core';
import { GeoService } from "../../services/geo.service";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterOutlet } from "@angular/router";

declare const H: any;

@Component({
  selector: 'app-store-locations-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './store-locations-page.component.html',
  styleUrl: './store-locations-page.component.css'
})
export class StoreLocationsPageComponent {
  title = "Store Locations";
  geoService = inject(GeoService);
  position: any = undefined;
  error: any = undefined;
  lat: any;
  lon: any;
  getLocation() {
    this.geoService.getCurrentLocation().then(data => {
      console.log(data);
      this.position = data;
      // @ts-ignore
      this.lat = data.lat;
      // @ts-ignore
      this.lon = data.lon;
      this.error = "";
      this.showMap();
    }).catch(e => {
      console.log(e);
      this.error = e;
    });
  }
  public showMap() {
    console.log("showing map:");
    document.getElementById('mapContainer')!.innerHTML = "";
    var platform = new H.service.Platform({
      'apikey': 'UnHXb2mpj8Dua8DcxG_5D_7VDkQSHQhSE82VEXA-Bfk'
    });
    var maptypes = platform.createDefaultLayers();
    var options = {
      zoom: 15,
      center: {
        lat: this.lat,
        lng: this.lon
      }
    };
    var map = new H.Map(
      document.getElementById("mapContainer"),
      maptypes.vector.normal.map,
      options
    );
    // The marker is not working, I think it is because it is being
    //added as or before map is even loaded, hoping this line, makes it so
    // map loads first.
    map.addEventListener("mapviewchangeend", () => {
      console.log("map loaded");
      var iconSize = { width: 55, height: 55 };
      var icon = new H.map.Icon("assets/img/walmart.png", iconSize);
      var marker = new H.map.Marker({
        lat: this.lat,
        lng: this.lon
      }, {icon: icon});
      map.addObject(marker);
    });
    //This line below is the coolest thing on this entire site hahahha, I love playing with it.
    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  }
    constructor()
    {
      this.getLocation();
    }
}
