import { Directive, ViewContainerRef, ComponentFactoryResolver, Input, ComponentRef, HostBinding, HostListener, ElementRef } from '@angular/core';
import { TooltipComponent } from './tooltip/tooltip.component';
import { v4 as uuidv4 } from 'uuid';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {

  componentRef: ComponentRef<TooltipComponent>;

  tooltipId: string;
  
  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private elementRef: ElementRef
    ) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TooltipComponent);
      this.componentRef = this.viewContainerRef.createComponent(componentFactory);
      
      this.tooltipId = uuidv4();

      this.componentRef.instance.tooltipId = this.tooltipId;
      this.describedBy = this.tooltipId;
      this.componentRef.instance.positionRef = this.elementRef;
    }
    
    @Input() set appTooltip(tooltipText: string) {
      this.componentRef.instance.tooltipText = tooltipText;
    }

    @HostBinding('attr.aria-describedby') describedBy: string;

    @HostListener('click') onClick() {
      this.componentRef.instance.show();
    }

    ngOnDestroy() {
      this.componentRef.destroy();
    }
}
