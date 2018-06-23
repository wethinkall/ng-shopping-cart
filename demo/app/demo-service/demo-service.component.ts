import {Component, OnInit} from '@angular/core';
import {CartService} from '../../../src/services/cart.service';
import {DemoCartItem} from '../demo-cart-item';

@Component({
  selector: 'demo-service',
  templateUrl: './demo-service.component.html'
})
export class DemoServiceComponent implements OnInit {
  taxInvalid = false;
  shippingInvalid = false;
  tax = 0;
  shipping = 0;
  currency = 'auto';
  currencies = ['auto', '$', '€', '￥'];
  symbolDisplay = 'auto';
  symbolsDisplay = ['auto', 'code', 'symbol', 'symbol-narrow'];
  digitInfo = 'auto';
  digitsInfo = ['auto', '2.1-3', '5.0-0', '2.5-7'];
  locale = 'en-US';
  locales = ['auto', 'en-US', 'fr-FR'];
  format = 'auto:auto:auto:en-US';
  settingsCollapsed = false;

  constructor(public cartService: CartService<DemoCartItem>) {

  }

  ngOnInit(): void {
    this.tax = this.cartService.getTaxRate();
    this.shipping = this.cartService.getShipping();
  }

  update() {
    this.taxInvalid = false;
    this.shippingInvalid = false;
    const shipping = parseFloat(this.shipping.toString());
    const tax = parseFloat(this.tax.toString());
    const shippingIsNaN = Number.isNaN(shipping);
    const taxIsNaN = Number.isNaN(tax);
    if (shippingIsNaN || taxIsNaN) {
      if (shippingIsNaN) {
        this.shippingInvalid = true;
      }
      if (taxIsNaN) {
        this.taxInvalid = true;
      }
      return;
    }
    this.format = this.currency + ':' + this.symbolDisplay + ':' + this.digitInfo + ':' + this.locale;
    this.cartService.setCurrencyFormat(this.format);
    this.cartService.setShipping(shipping);
    this.shipping = this.cartService.getShipping();
    this.cartService.setTaxRate(tax);
    this.tax = this.cartService.getTaxRate();
  }

}