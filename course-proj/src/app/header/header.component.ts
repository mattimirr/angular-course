import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    isAuthenticated = false;

    constructor(private dataStorage: DataStorageService, private authService: AuthService) { }

    ngOnInit() {
        this.subscription = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user;

        });
    }

    onSaveData() {
        this.dataStorage.storeRecipes();
    }

    onFetchData() {
        this.dataStorage.fetchRecipes().subscribe();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onLogout() {
        this.authService.logout();
    }
}