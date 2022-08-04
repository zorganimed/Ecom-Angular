import { Component,OnInit } from '@angular/core';
import { CatalogueService } from './catalogue.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { CaddyService } from './services/caddy.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{



constructor(private catService:CatalogueService,
private router:Router,
private authService:AuthenticationService,
public caddyService:CaddyService
){}






categories:any;
currentCategorie:any;
 ngOnInit(): void{
 this.authService.loadAuthenticatedUserFromLocalStorage();
 this.getCategories();
 }

 private getCategories(){
 this.catService.getResource("/categories")
  .subscribe(data=>{
  this.categories = data;
  },err=>{
  console.log(err)
  })
 }

 getProductsByCat(c:any){
 this.currentCategorie=c;
 this.router.navigateByUrl('/products/2/'+c.id);
 }

 onSelectedProducts(){
 this.currentCategorie = undefined;
 this.router.navigateByUrl("/products/1/0");
 }

 onProductsPromo(){
  this.currentCategorie = undefined;
   this.router.navigateByUrl("/products/3/0");
 }

 onProductsDispo(){
this.currentCategorie = undefined;
 this.router.navigateByUrl("/products/4/0");
 }

 onLogout(){
 this.authService.removeTokenFromLocalStorage();
 this.router.navigateByUrl('/login');
 }
}
