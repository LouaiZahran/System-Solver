import * as math from "mathjs"
import { derivative } from "mathjs";

export class NewtonRaphson{
    private xi:number;
    private tolerance:number;
    private precision:number;
    private expression:string;
    private maxIterations:number;
    private steps:Array<number>;

    constructor(xi:number,tolerance:number,precision:number,expression:string,maxIterations:number){
      this.xi = xi
      this.tolerance = tolerance
      this.precision = precision
      this.expression = expression
      this.maxIterations = maxIterations
      this.steps=new Array<number>();
    }
    public getSteps():Array<number>{
      return this.steps;
    }
    public getXi():number{
      return this.xi
    }
    public getTolerance():number{
      return this.tolerance
    }
    public getPrecision():number{
      return this.precision
    }
    public getExpression():string{
      return this.expression
    }
    public getMaxIterations():number{
      return this.maxIterations
    }
    public setXi(x:number):void{
      this.xi = x
    }
    public setTolerance(tolerance :number):void{
      this.tolerance = tolerance
    }
    public setPrecision(precision:number):void{
      this.precision = precision
    }
    public setExpression(exp:string):void{
      this.expression = exp
    }
    public setMaxIterations(maxIterations:number):void{
      this.maxIterations = maxIterations
    }
    public substitute(x:number):number{
        var substitution = this.getExpression()
        return math.simplify(math.parse(substitution).toString()).evaluate({x:x}).toPrecision(this.getPrecision())
    }
    public precise(x:number) {
      return Number(Number.parseFloat(x.toString()).toPrecision(this.getPrecision()));
    }
    
    public applyNewtonRaphson():number{
        var iteration_counter = 0
        var xi = this.getXi()
        var eps = this.getTolerance()
        var maxIterations = this.getMaxIterations()
        var xi1:number=0;
        var fxi:number;
        var dfxi:number;
        var derivativeNode:math.MathNode;
        derivativeNode=derivative(this.getExpression(),'x');
        xi1=xi;
        
        while (iteration_counter==0 ||
          ((math.abs(xi -xi1) > eps) && (iteration_counter < maxIterations))){
            xi=xi1;
            fxi = this.substitute(xi);
            dfxi=derivativeNode.evaluate({x:xi}).toPrecision(this.getPrecision());
            xi1=this.precise(xi-this.precise(fxi/dfxi));
            
            this.steps.push(iteration_counter+1);
            this.steps.push(xi);
            this.steps.push(fxi);
            this.steps.push(math.abs(xi -xi1));
            iteration_counter = iteration_counter + 1;
        }
    
        return xi1;
    
      }
    }
    export default NewtonRaphson