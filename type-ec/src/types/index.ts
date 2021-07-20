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
  toppings: string[]
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
export interface cart{
  id: string,
  itemInfo:itemInfo[],
  orderId:string,
  status: number
}
export interface orders{
  id: string,
  itemInfo:itemInfo[],
  orderId:string,
  status: number,
  orderTime: string
}

export interface userInfo{
  id: string,
  address: string,
  credit: string,
  email: string,
  name: string,
  tel: string,
  zipcode:string
}