import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataService } from '../../../services/data.service';
import { ProductModel } from '../../../models/product.model';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
})
export class ProductsPageComponent implements OnInit {
  public $products: Observable<ProductModel[]>;

  constructor(private readonly data: DataService) {}

  ngOnInit() {
    this.$products = this.data.getProducts()
  }
}
