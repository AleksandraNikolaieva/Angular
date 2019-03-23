import { Component, OnInit, ViewChild, ElementRef, NgZone, OnDestroy  } from '@angular/core';
import { Circle } from '../models';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit, OnDestroy {

  @ViewChild('canvas') canvasRef: ElementRef;
  isCanvasRunning: boolean;
  circles: Circle[] = [];
  width = window.innerWidth;
  height = window.innerHeight;

  constructor(private ngZone: NgZone) { }

  ngOnInit() {
    this.isCanvasRunning = true;
    this.ngZone.runOutsideAngular(() => this.canvasRun())
  }

  ngOnDestroy() {
    this.isCanvasRunning = false;
  }
  
  public canvasRun() {
    if(!this.isCanvasRunning) {
      return;
    }
    
    const canvas = this.canvasRef.nativeElement;

    canvas.width = this.width;
    canvas.height = this.height;

    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    this.createCircles(100);
    this.moveCircles(ctx);
  }

  private createCircles(quantity: number) {
    const colors: string[] = ['#204E5F', '#FFC6A8', '#FF8984', '#B7D7D8', '#EDF7F5'];
    for(let i = 0; i < quantity; i++) {
      let r = Math.floor(2 + Math.random() * 20);
      let x = Math.floor(Math.random() * this.width);
      let y = Math.floor(Math.random() * this.height);
      let colorIndex = Math.floor(Math.random() * colors.length);
      let color = colors[colorIndex];
      let speedX = (Math.random() - 0.5) * 1.5;
      let speedY = (Math.random() - 0.5) * 1.5;
      let circle = new Circle(x, y, r, color, speedX, speedY);
      this.circles.push(circle);
    }
  }

  private moveCircles(ctx: CanvasRenderingContext2D) {
    requestAnimationFrame(() => this.moveCircles(ctx));
    ctx.clearRect(0, 0, this.width, this.height);
    for(let i = 0; i < this.circles.length; i++) {
      this.circles[i].move(ctx)
    }
  }

  private onResize() {
    this.canvasRef.nativeElement.width = window.innerWidth;
    this.canvasRef.nativeElement.height = window.innerHeight;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }
}
