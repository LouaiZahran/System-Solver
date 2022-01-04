import * as math from "mathjs"

export class FalsePosition{
    private xi:number;
    private tolerance:number;
    private precision:number;
    private expression:string;
    private maxIterations:number;
  
    constructor(xi:number,tolerance:number,precision:number,expression:string,maxIterations:number){
      this.xi = xi
      this.tolerance = tolerance
      this.precision = precision
      this.expression = expression
      this.maxIterations = maxIterations
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
    public getGX():string{
        return this.getExpression()+"+x";
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
    public substituteGX(x:number):number{
        var substitution = this.getGX();
        return math.simplify(math.parse(substitution).toString()).evaluate({x:x}).toPrecision(this.getPrecision())
    }
    public precise(x:number) {
        return parseInt(Number.parseFloat(x.toString()).toPrecision(this.getPrecision()));
    }
    
    public applyFixedPoint():number{ 
        var iteration_counter = 0
        var xi = this.getXi()
        var eps = this.getTolerance()
        var maxIterations = this.getMaxIterations()
        var xi1:number=0;
        if((math.abs(xi -xi1) > eps))
            xi1=500;
        while (iteration_counter==0 ||
            ((math.abs(xi -xi1) > eps) && (iteration_counter < maxIterations))){
                xi=xi1;
                xi1=this.substituteGX(xi);
                iteration_counter = iteration_counter + 1;
        }
        return xi1;
    
      }
}