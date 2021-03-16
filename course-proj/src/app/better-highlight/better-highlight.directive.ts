import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string = 'transparent';
  @Input() highlightColor: string = 'blue';

  @HostBinding('style.backgroundColor') backgroundColor: string; 
  
  constructor(private elementref: ElementRef, private renderer: Renderer2) { }
  
  ngOnInit() {
    this.backgroundColor =  this.defaultColor;
  }
  @HostListener('mouseenter') mouseHover(eventData : Event) {
    this.backgroundColor =  this.highlightColor;
  }
  
  @HostListener('mouseleave') mouseleave(eventData : Event) {
    this.backgroundColor =  this.defaultColor;
  }

}
