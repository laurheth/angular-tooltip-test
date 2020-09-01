import { Directive, ViewContainerRef, ComponentFactoryResolver, Input, ComponentRef, HostBinding, HostListener, ElementRef } from '@angular/core';
import { TooltipComponent } from './tooltip/tooltip.component';
import { TooltipManagerService } from './tooltip-manager.service';
import { v4 as uuidv4 } from 'uuid';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {

  componentRef: ComponentRef<TooltipComponent>;

  tooltipId: string;
  
  constructor(
    private tooltipManagerService: TooltipManagerService,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private elementRef: ElementRef
    ) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TooltipComponent);
      this.componentRef = this.viewContainerRef.createComponent(componentFactory);
      
      this.tooltipManagerService.addTooltipRef(this.componentRef);

      this.tooltipId = uuidv4();

      this.componentRef.instance.tooltipId = this.tooltipId;
      this.describedBy = this.tooltipId;
      this.componentRef.instance.positionRef = this.elementRef;
    }
    
    @Input() set appTooltip(tooltipText: string) {
      this.componentRef.instance.tooltipText = tooltipText;
    }

    @HostBinding('attr.aria-describedby') describedBy: string;
    @HostBinding('attr.hasTooltip') hasTooltip = true;

    @HostListener('click') onClick() {
      this.tooltipManagerService.openTooltip(this.componentRef);
    }

    ngOnDestroy() {
      this.tooltipManagerService.removeTooltipRef(this.componentRef);
      this.componentRef.destroy();
    }
}
