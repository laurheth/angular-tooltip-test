import { Component, OnInit, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Identifiers } from '@angular/compiler';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {

  // Text to show in the tooltip
  @Input() tooltipText: string;
  // ID, to match the targets "aria-describedby"
  @Input() tooltipId: string;
  // Reference to the target
  @Input() targetRef: any;

  // Styles that are updated about the tooltip
  positionStyle={
    visibility: 'hidden',
    top: '0',
    left: '0',
  };

  aboveTarget=true;
  arrowSpace=14;

  constructor() { }

  // Get an initial position
  ngOnInit(): void {
    // It seems to take at least one update for tooltip size to be accurate, so use setTimeout to make sure it is executed last
    setTimeout(()=>this.updatePosition(),0);
  }

  // Listen for scroll + window resizing
  @HostListener('window:scroll',[])
  @HostListener('window:resize',[])
  onWindowResize(): void {
    this.updatePosition();
  }

  @ViewChild('tooltipElement') tooltipRef: ElementRef;

  updatePosition() {
    if(this.tooltipRef) {
      // Start from top left corner of element to be tooltipped
      let left = this.targetRef.nativeElement.offsetLeft;
      let top = this.targetRef.nativeElement.offsetTop;
      
      // Offset to middle of that element
      left += this.targetRef.nativeElement.clientWidth / 2;
      // top -= this.targetRef.nativeElement.clientHeight / 2;
      
      // Offset by size of tooltip
      left -= this.tooltipRef.nativeElement.clientWidth / 2;
      
      // We want the tooltip to respond to page scroll, so lets figure out where the tooltip will end up
      const scrollPosition = this.targetRef.nativeElement.getBoundingClientRect().top;
      if (scrollPosition - this.arrowSpace - this.tooltipRef.nativeElement.clientHeight < 0) {
        // Below the target, move it down by arrow size + size of the target element
        top += this.arrowSpace + this.targetRef.nativeElement.clientHeight;
        this.aboveTarget=false;
      }
      else {
        // Above the target. Move up by the arrow size + tooltip height.
        top -= this.tooltipRef.nativeElement.clientHeight + this.arrowSpace;
        this.aboveTarget=true;
      }
      
      this.positionStyle.left = `${left}px`;
      this.positionStyle.top = `${top}px`;

    }
  }

  show() {
    this.updatePosition();
    this.positionStyle.visibility='visible';
  }

  hide() {
    this.positionStyle.visibility='hidden';
  }

}
