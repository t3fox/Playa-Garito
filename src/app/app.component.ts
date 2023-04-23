import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  cuts:boolean = true; // si hay rebajas 
  
  path:string = "assets/images/"; // imagen dinamica
  title = 'playa-garito';

  noempty:boolean = true;
  itemprice:number = 125;

  item_product:any;
  cartopen:boolean = false;


  totitems:any = 0;
  totcart:any = 0;

  totprice:any = 0;

  imgposition:any = 0;

  @ViewChild('mobileImg') produc_img?: ElementRef;
  constructor(
    private storage:StorageService,
    private rederer:Renderer2){
  }
  ngOnInit(){

    this.item_product = 'image-product-1.jpg';
    document.querySelector('.modal-images')?.setAttribute('style','display:none;')
    document.querySelector('.box-car_list')?.setAttribute('style','display:none;') 
    document.querySelector('.box-usr_options')?.setAttribute('style','display:none;') 
 
  }
  get car(){
    return this.storage.carlist;
  }


  carrito(){

    console.log('ok',this.cartopen);
    if(this.cartopen){
      
      document.querySelector('.box-car_list')?.setAttribute('style','display:none;')
      this.cartopen = false;
    }
    else{
      document.querySelector('.box-car_list')?.setAttribute('style','display:block;')
      this.cartopen = true;
    }
  }
  usroptions(){
    if(this.cartopen){
      
      document.querySelector('.box-usr_options')?.setAttribute('style','display:none;')
      this.cartopen = false;
    }
    else{
      document.querySelector('.box-usr_options')?.setAttribute('style','display:block;')
      this.cartopen = true;
    }
  }


  addcart(){

    if(this.totitems > 0){
      // console.log('i have: ',this.totitems);
      this.totcart = this.totitems;
      this.totprice = this.itemprice*this.totcart;
      this.noempty = false

      const schema = {
        title:'Fall Limited Edition Sneakers',
        img:'image-product-1-thumbnail.jpg',
        price:this.itemprice,
        quanto:this.totitems,
        total:this.totprice,
        itmid:'sneaker_420'
      }

      this.storage.setCarList(schema);

      console.log('in:',this.car);
    }
    else{
      return;
    }
  }
  delitem(ref:any){
    console.log('ref: ',ref);

    this.storage.carlist.forEach(e =>{
      if(e.itmid.includes(ref)){
        this.storage.purgeList()
      }

      this.totcart = this.car.length
    })

    // display usr tools /css
    // update solution to frontend mentor / web search
  }

  total(val:string){

    if(val == 'up'){
      // console.log(this.totitems)
      this.totitems++;
      document.querySelector('.item-num')?.setAttribute('value',this.totitems.toString())    
    }
    else if(val == 'dw'){
      
      if( this.totitems == 0){        
        return;
      }
      else{
        // console.log(this.totitems)
          this.totitems--;
          document.querySelector('.item-num')?.setAttribute('value',this.totitems.toString())
      }
      
    }
  }

  menu(index:string){
    
  }


  imgWatcher(img:any){
    this.item_product = img;

    document.querySelector('.modal-images')?.setAttribute('style','display:block;');
    document.querySelector('.box-modalone')?.setAttribute('src',img)
  }

  imgModalWatcher(img:any){
    
    document.querySelector('.box-modalone')?.setAttribute('src','assets/images/'+img);
  }


  closeElement(element:HTMLElement){
    this.rederer.removeClass(element,'active')
  }   
  OpenElement(element:HTMLElement){    
    this.rederer.addClass(element,'active')
  }


  before(){

    const images = ['image-product-1.jpg','image-product-2.jpg','image-product-3.jpg','image-product-4.jpg'];
    if(this.imgposition === 0){
      this.imgposition = images.length - 1;
    }
    else{
      this.imgposition--;
      console.log('back');
      this.rederer.setAttribute(this.produc_img?.nativeElement,'src','assets/images/'+images[this.imgposition])      
    }

  }

  after(){

    const images = ['image-product-1.jpg','image-product-2.jpg','image-product-3.jpg','image-product-4.jpg'];
    if(this.imgposition === images.length - 1){
      this.imgposition = 0;
    }
    else{
      this.imgposition++;
      console.log('next');
      this.rederer.setAttribute(this.produc_img?.nativeElement,'src','assets/images/'+images[this.imgposition])      
    }
  }




  // MODAL CONTROLS
  closeModal(){
    document.querySelector('.modal-images')?.setAttribute('style','display:none;');
  }


  prev(){

    const images = ['image-product-1.jpg','image-product-2.jpg','image-product-3.jpg','image-product-4.jpg'];
    if(this.imgposition === 0){
      this.imgposition = images.length - 1;
    }
    else{
      this.imgposition--;
      document.querySelector('.box-modalone')?.setAttribute('src','assets/images/'+images[this.imgposition]);
    }
  }
  next(){
    const images = ['image-product-1.jpg','image-product-2.jpg','image-product-3.jpg','image-product-4.jpg'];
    if(this.imgposition === images.length - 1){
      this.imgposition = 0;
    }
    else{
      this.imgposition++
      document.querySelector('.box-modalone')?.setAttribute('src','assets/images/'+images[this.imgposition]);
    }
  }
}
