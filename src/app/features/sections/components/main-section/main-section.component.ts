import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { RawMaterialsCatalogComponent } from '../raw-materials-catalog/raw-materials-catalog.component';
import { ProductsCatalogComponent } from '../products-catalog/products-catalog.component';
import { ProvidersCatalogComponent } from '../providers-catalog/providers-catalog.component';
import { BranchesCatalogComponent } from '../branches-catalog/branches-catalog.component';
import { PartnersComponent } from '../partners/partners.component';
import { PurchasesComponent } from '../purchases/purchases.component';
import { RawMaterialsLabourComponent } from '../raw-materials-labour/raw-materials-labour.component';
import { ProductsLabourComponent } from '../products-labour/products-labour.component';
import { AccountingComponent } from '../accounting/accounting.component';
import { StorageComponent } from '../storage/storage.component';
import { SalesComponent } from '../sales/sales.component';

@Component({
  selector: 'app-main-section',
  standalone: true,
  imports: [
    HomeComponent,
    RawMaterialsCatalogComponent,
    ProductsCatalogComponent,
    ProvidersCatalogComponent,
    BranchesCatalogComponent,
    PartnersComponent,
    PurchasesComponent,
    RawMaterialsLabourComponent,
    ProductsLabourComponent,
    AccountingComponent,
    StorageComponent,
    SalesComponent
  ],
  templateUrl: './main-section.component.html',
  styleUrl: './main-section.component.scss'
})
export class MainSectionComponent {

}
