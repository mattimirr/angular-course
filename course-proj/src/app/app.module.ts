import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ReversePipe } from './reverse.pipe';
import { SortPipe } from './sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SortPipe,
    ReversePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [SortPipe, ReversePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
