import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { map } from "rxjs/operators";


const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(module => module.RecipesModule) },
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule) },
    { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(module => module.ShoppingListModule) }
];
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}