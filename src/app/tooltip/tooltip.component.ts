import { Component, OnInit, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Identifiers } from '@angular/compiler';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {

  @Input() tooltipText: string;
  @Input() tooltipId: string;
  @Input() positionRef: any;

  positionStyle={
    visibility: 'hidden',
    top: '0',
    left: '0',
  };

  constructor() { }

  ngOnInit(): void {
    setTimeout(()=>this.updatePosition(),0);
  }

  @HostListener('window:resize',[])
  onWindowResize(): void {
    this.updatePosition();
  }

  @ViewChild('tooltipElement') tooltipRef: ElementRef;

  updatePosition() {
    if(this.tooltipRef) {

      // Start from top left corner of element to be tooltipped
      let left = this.positionRef.nativeElement.offsetLeft;
      let top = this.positionRef.nativeElement.offsetTop;

      console.log(this.positionRef.nativeElement);
      console.log(this.tooltipRef.nativeElement);
      // Offset to middle of that element
      left += this.positionRef.nativeElement.clientWidth / 2;
      // top -= this.positionRef.nativeElement.clientHeight / 2;

      // Offset by size of tooltip
      left -= this.tooltipRef.nativeElement.clientWidth / 2;
      top -= this.tooltipRef.nativeElement.clientHeight + 5;
      
      this.positionStyle.left = `${left}px`;
      this.positionStyle.top = `${top}px`;

    }
  }

  show() {
    // this.hidden=false;
    this.positionStyle.visibility='visible';
  }

}
