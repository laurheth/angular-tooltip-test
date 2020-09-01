import { Injectable, ComponentRef } from '@angular/core';
import { TooltipComponent } from './tooltip/tooltip.component';

@Injectable({
  providedIn: 'root'
})
export class TooltipManagerService {

  tooltips: ComponentRef<TooltipComponent>[] = [];

  constructor() {
    document.addEventListener('click', (event: any) => {
      if (!event.target.attributes || !event.target.attributes.hasTooltip) {
        this.closeTooltips();
      }
    });

    window.addEventListener('keydown',(event: KeyboardEvent) => {
      if (event.key === "Escape") {
        this.closeTooltips();
      }
    }); 
  }

  addTooltipRef(tooltipRef: ComponentRef<TooltipComponent>) {
    if (this.tooltips.indexOf(tooltipRef) < 0) {
      this.tooltips.push(tooltipRef);
    }
  }

  removeTooltipRef(tooltipRef: ComponentRef<TooltipComponent>) {
    const index = this.tooltips.indexOf(tooltipRef);
    if (index >= 0) {
      this.tooltips.splice(index,1);
    }
  }

  openTooltip(tooltipRef: ComponentRef<TooltipComponent>) {
    this.addTooltipRef(tooltipRef);
    this.closeTooltips();
    tooltipRef.instance.show();
  }

  closeTooltips() {
    this.tooltips.forEach(tooltip => tooltip.instance.hide());
  }
}
