import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {

  data: any;
  baseImage: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.data = JSON.parse(params['data-product']);
    })
    this.baseImage = this.data.thumbnail
    console.log(this.data)
  }

  changeImage(dtImage: any)
  {
    this.baseImage = dtImage
  }

}
