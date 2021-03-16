import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  
  @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent'; 
  
  constructor(private elementref: ElementRef, private renderer: Renderer2) { }
  
  ngOnInit() {
    
  }
  @HostListener('mouseenter') mouseHover(eventData : Event) {
    this.backgroundColor = 'blue';
  }
  
  @HostListener('mouseleave') mouseleave(eventData : Event) {
    this.backgroundColor = 'transparent';
  }

}
