import { NavigationExtras, Router } from '@angular/router';
import { ProductService } from './../../service/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  listProduct: any;

  constructor(private productService: ProductService, private route: Router) {}

  ngOnInit(): void {
    // this.productService.getAllUser().then(res => {
    //   this.listProduct = res;
    // })
    this.productService.getAllData().subscribe({
      next: (data) => {
        this.listProduct = data.products;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  navigateToDetail(data: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        'data-product': JSON.stringify(data),
      },
    };
    this.route.navigate(['home/product-detail'], navigationExtras);
  }
}
