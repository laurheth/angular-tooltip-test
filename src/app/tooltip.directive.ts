import { Directive, ViewContainerRef, ComponentFactoryResolver, Input, ComponentRef, HostBinding, HostListener, ElementRef, OnDestroy } from '@angular/core';
import { TooltipComponent } from './tooltip/tooltip.component';
import { TooltipManagerService } from './tooltip-manager.service';
import { v4 as uuidv4 } from 'uuid';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements OnDestroy {

  // Reference to the actual tooltip
  componentRef: ComponentRef<TooltipComponent>;

  // ID for aria-describedby
  tooltipId: string;
  
  constructor(
    private tooltipManagerService: TooltipManagerService,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private elementRef: ElementRef
    ) {
      // Generate the tooltip and attached it
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TooltipComponent);
      this.componentRef = this.viewContainerRef.createComponent(componentFactory);
      
      this.tooltipManagerService.addTooltipRef(this.componentRef);

      // Get a unique ID, to connect the two elements via aria-describedby
      this.tooltipId = uuidv4();

      // Pass some information to the tooltip
      this.componentRef.instance.tooltipId = this.tooltipId;
      this.describedBy = this.tooltipId;
      this.componentRef.instance.targetRef = this.elementRef;
    }
    
    // Tooltip text as input
    @Input() set appTooltip(tooltipText: string) {
      this.componentRef.instance.tooltipText = tooltipText;
    }

    // Hostbinding for attributes
    @HostBinding('attr.aria-describedby') describedBy: string;
    @HostBinding('attr.hasTooltip') hasTooltip = true;

    // Open tooltip on click
    @HostListener('click') onClick() {
      this.tooltipManagerService.openTooltip(this.componentRef);
    }

    // Ensure the tooltip is removed from the service, and destroyed, if this element is destroyed.
    ngOnDestroy() {
      this.tooltipManagerService.removeTooltipRef(this.componentRef);
      this.componentRef.destroy();
    }
}
