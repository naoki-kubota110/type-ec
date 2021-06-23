export interface navItem {
  name: string,
  icon: string,
  link: string
}

export interface itemList {
  description: string,
  id : number,
  imagePath: string,
  name: string,
  priceL: number,
  priceM: number,
}

export interface toppingList{
  id:number,
  name: string,
  price:number
}

export interface itemInfo{
  itemId:number,
  name:string,
  price: number,
  num: number,
  size: string,
  imagePath: string,
  toppings: any[]
}

export interface newCart{
  id: string,
  status: number,
  itemInfo:itemInfo[] 
}

export interface addCart{
  id: string,
  orderId:string,
  status: number,
  itemInfo:itemInfo[]
}