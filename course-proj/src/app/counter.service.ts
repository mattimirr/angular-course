import { EventEmitter } from "@angular/core";


export class CounterService {
    inactiveCount = 0;
    activeCount = 0;

    inactiveUsers = new EventEmitter<number>();
    activeUsers = new EventEmitter<number>();

    addToActive() {
        this.activeCount++;
        this.activeUsers.emit(this.activeCount);
    }

    addToInactive() {
        this.inactiveCount++;
        this.inactiveUsers.emit(this.inactiveCount);
    }
    
}