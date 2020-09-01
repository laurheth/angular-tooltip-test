// This service manages tooltips, to ensure only one is open at a time

import { Injectable, ComponentRef } from '@angular/core';
import { TooltipComponent } from './tooltip/tooltip.component';

@Injectable({
  providedIn: 'root'
})
export class TooltipManagerService {

  // Array of all tooltips
  tooltips: ComponentRef<TooltipComponent>[] = [];

  constructor() {
    // If the user clicks anywhere other than a tooltip or something with a tooltip, close all tooltips
    document.addEventListener('click', (event: any) => {
      if (!event.target.attributes || !event.target.attributes.hasTooltip) {
        this.closeTooltips();
      }
    });

    // If the user hits "escape", close all tooltips
    window.addEventListener('keydown',(event: KeyboardEvent) => {
      if (event.key === "Escape") {
        this.closeTooltips();
      }
    }); 
  }

  // Register a new tooltip on the tooltip array, if it isn't already there
  addTooltipRef(tooltipRef: ComponentRef<TooltipComponent>) {
    if (this.tooltips.indexOf(tooltipRef) < 0) {
      this.tooltips.push(tooltipRef);
    }
  }

  // Remove the tooltip reference (called by ngOnDestroy in the directive)
  removeTooltipRef(tooltipRef: ComponentRef<TooltipComponent>) {
    const index = this.tooltips.indexOf(tooltipRef);
    if (index >= 0) {
      this.tooltips.splice(index,1);
    }
  }

  // Open the requested tooltip
  openTooltip(tooltipRef: ComponentRef<TooltipComponent>) {
    // Add it if it isn't already on the list
    this.addTooltipRef(tooltipRef);
    // Close everything
    this.closeTooltips();
    // Open the requested tooltip
    tooltipRef.instance.show();
  }

  // Close all tooltips
  closeTooltips() {
    this.tooltips.forEach(tooltip => tooltip.instance.hide());
  }
}
