import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CatalogueService } from '../catalogue.service';
import { Product } from '../model/product.model';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClient, HttpEvent, HttpRequest, HttpResponse, HttpSentEvent, HttpEventType, HttpProgressEvent } from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

 public  currentProduct:Product;
 editPhoto:boolean=false;
 selectedFiles:any;
 progress:number=0;
 private currentFileUpload:any;
 timestamp:number=0;
 public mode:number=0;

  constructor(private router:Router, private route:ActivatedRoute,
  public catService:CatalogueService,
   public authService:AuthenticationService) { }

  ngOnInit(): void {
  let url = atob(this.route.snapshot.params['url']);
  this.catService.getProduct(url).subscribe(data=>{
  this.currentProduct = data;
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
this.editPhoto = false;
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

OnEditProduct(){
this.mode = 1;
}

onUpdateProduct(data){
}

}
