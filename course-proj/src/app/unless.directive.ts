import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  @Input() set appUnless(value: boolean) {
    if (!value) {
      this.viewContainerReference.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerReference.clear();
    }
  }
  constructor(private templateRef: TemplateRef<any>, private viewContainerReference : ViewContainerRef) { }

}
