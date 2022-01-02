import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-plotter',
  templateUrl: './plotter.component.html',
  styleUrls: ['./plotter.component.css']
})
export class PlotterComponent implements OnInit {
  expression:String="x+2"; //should carry the mathmatical function that should be sent from rootFinding component
  constructor() { }

  ngOnInit(): void {
    this.draw();
  }

  setFunction(exp:String):void{
    this.expression = exp;
  }

  getFunction():String{
    return this.expression;
  }

  substitute(x:number):number{
    var substitution:String = this.expression;
    return eval(substitution.replace("x",x.toString()));
  }

  draw() {
    var canvas = <HTMLCanvasElement>document.getElementById("canvas");
    if (null==canvas || !canvas.getContext) return;
    var axes:any={};
    var ctx=canvas.getContext("2d");
    axes.x0 = .5 + .5*canvas.width;  // x0 pixels from left to x=0
    axes.y0 = .5 + .5*canvas.height; // y0 pixels from top to y=0
    axes.scale = 1;                 // 40 pixels from x=0 to x=1
    axes.doNegativeX = true;
    this.setFunction(this.expression)
    this.showAxes(ctx,axes);
    this.setGraph(ctx,axes,"rgb(255,255,255)",1);
  }

  setGraph (ctx:CanvasRenderingContext2D ,axes:any,color:string,thick:number) {
    var xx, yy, dx=4, x0=axes.x0, y0=axes.y0, scale=axes.scale;
    var iMax = Math.round((ctx.canvas.width-x0)/dx);
    var iMin = axes.doNegativeX ? Math.round(-x0/dx) : 0;
    ctx.beginPath();
    ctx.lineWidth = thick;
    ctx.strokeStyle = color;
    for (var i=iMin;i<=iMax;i++) {
      xx = dx*i; yy = scale*this.substitute(xx/scale);
      if (i==iMin){
        ctx.moveTo(x0+xx,y0-yy);
      }else{
        ctx.lineTo(x0+xx,y0-yy);
      }
    }
    ctx.stroke();
  }
  showAxes(ctx:CanvasRenderingContext2D,axes:any) {
    var x0=axes.x0, w=ctx.canvas.width;
    var y0=axes.y0, h=ctx.canvas.height;
    var xmin = axes.doNegativeX ? 0 : x0;
    ctx.beginPath();
    ctx.strokeStyle = "rgb(128,128,128)";
    ctx.moveTo(xmin,y0);
    ctx.lineTo(w,y0);  // X axis
    ctx.moveTo(x0,0);
    ctx.lineTo(x0,h);  // Y axis
    ctx.stroke();
  }

}
