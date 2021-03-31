import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { AuthRouterModule } from "./auth-router.module";
import { AuthComponent } from "./auth.component";

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        FormsModule,
        SharedModule,
        AuthRouterModule
    ]
})

export class AuthModule {}