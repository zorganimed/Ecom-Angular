import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { HttpClient, HttpEvent, HttpRequest, HttpResponse, HttpSentEvent, HttpEventType, HttpProgressEvent } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { CaddyService } from '../services/caddy.service';
import { Product } from '../model/product.model';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(public catService:CatalogueService,
  private route:ActivatedRoute, private router:Router,
  public authService:AuthenticationService,
  public caddyService:CaddyService
  ) {}
products:any;
editPhoto:boolean=false;
currentProduct:any;
selectedFiles:any;
progress:number=0;
private currentFileUpload:any;
title:string="";
timestamp:number=0;
  ngOnInit(): void {
  this.router.events.subscribe((val) => {
        if (val instanceof NavigationEnd) {
          let url = val.url;
       console.log(url);
       let p1 = this.route.snapshot.params['p1'];
        if(p1==1){
        this.title="Sélection";
        this.getProducts('/products/search/selectedProducts');
         }
         else if (p1==2){
         let idCat = this.route.snapshot.params['p2'];
         this.title="Produits de la catégorie "+idCat;
         this.getProducts('/categories/'+idCat+'/products');
         }
          else if (p1==3){
          this.title="Produits en promotion";
                  this.getProducts('/products/search/promoProducts');
                  }
           else if (p1==4){
           this.title="Produits Disponibles";
                   this.getProducts('/products/search/dispoProducts');
                  }
                 else if (p1==5){
                 this.title="Recherche";
                                     this.getProducts('/products/search/dispoProducts');
                                    }
        }
      });
      let p1 = this.route.snapshot.params['p1'];
              if(p1==1){
              this.getProducts('/products/search/selectedProducts');
               }
  }

private getProducts(url:any){
this.catService.getResource(url)
.subscribe(data=>{
this.products=data;
},err=>{
console.log(err);
})
}

onEditPhoto(p:any){
this.currentProduct = p;
this.editPhoto = true;
}

onSelectedFile(event:any){
this.selectedFiles = event.target.files;
}

uploadPhoto(){
this.progress = 0;
this.currentFileUpload =this.selectedFiles.item(0)

this.catService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id).subscribe(event=>{
if(event.type === HttpEventType.UploadProgress){
if (event.total) {
        const total: number = event.total;
        this.progress = Math.round(100 * event.loaded / total);
    }
console.log(this.progress);
}else if(event instanceof HttpResponse ){

//this.getProducts('/products/search/selectedProducts');
this.timestamp = Date.now();
}
},err=>{
alert("Problème de téléchargement...");
})

this.selectedFiles = undefined
}

getTs(){
return this.timestamp;
}

public isAdmin(){
return this.authService.isAdmin();
}

onProductDetails(p:Product){
let url = btoa(p._links.product.href);
this.router.navigateByUrl("product-details/"+url)
}

onAddProductToCaddy(p:Product){
this.caddyService.addProductToCaddy(p);
}

}
