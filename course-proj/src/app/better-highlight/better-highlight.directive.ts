import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  constructor(private elementref: ElementRef, private renderer: Renderer2) { }
  
  ngOnInit() {
    
  }
  @HostListener('mouseenter') mouseHover(eventData : Event) {
    this.renderer.setStyle(this.elementref.nativeElement,'background-color', 'blue');
  }
  
  @HostListener('mouseleave') mouseleave(eventData : Event) {
    this.renderer.setStyle(this.elementref.nativeElement,'background-color', 'transparent');
  }
  
}
