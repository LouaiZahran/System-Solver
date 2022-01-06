import * as math from "mathjs"
import {
  create,
  all
} from 'mathjs';

export class bisection{
  private xLower:number;
  private xUpper:number;
  private tolerance:number;
  private precision:number;
  private expression:string;
  private maxIterations:number;
  private steps:Array<number>;
                                                                
  constructor(xLower:number,xUpper:number,tolerance:number,precision:number,expression:string,maxIterations:number){
    this.xLower = xLower
    this.xUpper = xUpper
    this.tolerance = tolerance
    this.precision = precision
    this.expression = expression
    this.maxIterations = maxIterations
    this.steps=new Array<number>();
  }
  public getSteps():Array<number>{
    return this.steps;
  }
  public getXLower():number{
    return this.xLower
  }
  public getXUpper():number{
    return this.xUpper
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
  public setXLower(x:number):void{
    this.xLower = x
  }
  public setXUpper(x:number):void{
    this.xUpper = x
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
    const config = {
      number: 'BigNumber',
      precision: this.getPrecision()
   }
   const math = create(all, config)

    return math.simplify(math.parse(substitution).toString()).evaluate({x:x});
  }
  public precise(x:number) {
    return Number(Number.parseFloat(x.toString()).toPrecision(this.getPrecision()));
  }
  public applyBisection():number{
    var iteration_counter = 0
    var xu = this.getXUpper()
    var xl = this.getXLower()
    var eps = this.getTolerance()
    var maxIterations = this.getMaxIterations()
    var xr:number=0;
    var fr:number;
    var fl:number;
    
    if(math.abs(xu -xl) < eps) 
      return xu;
    
    while ((math.abs(xu -xl) > eps) && (iteration_counter < maxIterations)){
      xr = this.precise(this.precise(xl + xu)/2);
      fr = this.substitute(xr);
      fl = this.substitute(xl);
      if (fl*fr > 0){
        xl = xr;
      }
      else{
        xu = xr;
      }
      this.steps.push(iteration_counter+1);
      this.steps.push(xl);
      this.steps.push(xu);
      this.steps.push(fr);
      this.steps.push(math.abs(xu -xl));
      if(fr==0)
        break;
      iteration_counter = iteration_counter + 1;
    }
    return xr;
  }
}
export default bisection