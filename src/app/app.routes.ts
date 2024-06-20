import { Routes } from '@angular/router';
import { LoginComponent } from './features/user/components/login/login.component';
import { HomeComponent } from './features/sections/components/home/home.component';
import { AuthGuard, LoggedInGuard } from './core/guards/auth.guard';
import { RawMaterialsCatalogComponent } from './features/sections/components/raw-materials-catalog/raw-materials-catalog.component';
import { ProductsCatalogComponent } from './features/sections/components/products-catalog/products-catalog.component';
import { PartnersComponent } from './features/sections/components/partners/partners.component';
import { ProvidersCatalogComponent } from './features/sections/components/providers-catalog/providers-catalog.component';
import { BranchesCatalogComponent } from './features/sections/components/branches-catalog/branches-catalog.component';
import { PurchasesComponent } from './features/sections/components/purchases/purchases.component';
import { RawMaterialsLabourComponent } from './features/sections/components/raw-materials-labour/raw-materials-labour.component';
import { ProductsLabourComponent } from './features/sections/components/products-labour/products-labour.component';
import { AccountingComponent } from './features/sections/components/accounting/accounting.component';
import { SalesComponent } from './features/sections/components/sales/sales.component';
import { MainSectionComponent } from './features/sections/components/main-section/main-section.component';
import { StorageComponent } from './features/sections/components/storage/storage.component';

export const routes: Routes = [
    {
        path: 'login',
        // canActivate: [LoggedInGuard],
        component: LoginComponent
    },
    {
        path: '',
        redirectTo: 'sections',
        pathMatch: 'full'
    },
    {
        path: 'sections',
        // canActivate: [AuthGuard],
        component: MainSectionComponent,
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'raw-materials-catalog',
                component: RawMaterialsCatalogComponent
            },
            {
                path: 'products-catalog',
                component: ProductsCatalogComponent
            },
            {
                path: 'providers-catalog',
                component: ProvidersCatalogComponent
            },
            {
                path: 'branches-catalog',
                component: BranchesCatalogComponent
            },
            {
                path: 'partners',
                component: PartnersComponent
            },
            {
                path: 'purchases',
                component: PurchasesComponent
            },
            {
                path: 'raw-materials-labour',
                component: RawMaterialsLabourComponent
            },
            {
                path: 'products-labour',
                component: ProductsLabourComponent
            },
            {
                path: 'accounting-book',
                component: AccountingComponent
            },
            {
                path: 'storage',
                component: StorageComponent
            },
            {
                path: 'sales',
                component: SalesComponent
            }
        ],
    },
];
