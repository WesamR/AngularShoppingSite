
export class Inventory{
  id: number | undefined
  productName: string="";
  price: number = 0;
  image: string = "";
  description: string="";
  quantity: number=0;

  constructor(productName:string, price: number, image: string ="",description: string="", quantity: number=0){
    this.productName = productName;
    this.price=price;
    this.image=image;
    this.description=description;
    this.quantity=quantity;

  }

}
