import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    @Output() componentSelected = new EventEmitter<string>();
    collapsed = true;
    
    onSelect(component : string){
        this.componentSelected.emit(component);
    }

}