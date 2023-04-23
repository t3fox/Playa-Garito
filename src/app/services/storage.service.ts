import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _carrito:any[] = [];

  constructor() { }

  get carlist(){
    return [...this._carrito]
  }
  setCarList(val:any){
    this._carrito = [val,...this._carrito];
  }

  purgeList(){
    this._carrito.pop()

  }


}
