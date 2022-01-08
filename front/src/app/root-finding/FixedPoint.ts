import * as math from "mathjs"
import {
  create,
  all,
  bignumber
} from 'mathjs';
import { derivative } from "mathjs";
export class FixedPoint{
    private xi:number;
    private tolerance:number;
    private precision:number;
    private expression:string;
    private maxIterations:number;
    private GX:string;
    private a:number;
    private steps:Array<number>;
    constructor(xi:number,tolerance:number,precision:number,expression:string,maxIterations:number){
      this.xi = xi
      this.tolerance = tolerance
      this.precision = precision
      this.expression = expression
      this.maxIterations = maxIterations
      this.a=1;
      this.GX="";
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
    public getGX():string{
        return this.GX;
    }
    public getMaxIterations():number{
      return this.maxIterations
    }
    public getA():number{
      return this.a;
    }
    public setA(x:number):void{
      this.a=x;
    }
    
    private setGX():void {
      this.GX=this.getMultiplierForFx() +"*("+this.getExpression()+")+x";
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
    /*
    idea:
    af(x)+x=g(x)  sufficient condition g`(x)<=abs(1)
    goal to make "a" choosen to make convergence as fast as possible
    so g`(x)=0
    g`(x)=af`(x)+1  ---> af`(x)=-1
    logic: get f`x then look for a which satisify equation
    */
    public getMultiplierForFx():string{
      var derivativeNode:math.MathNode;
      derivativeNode=derivative(this.getExpression(),'x'); //f`
      var dfx=derivativeNode.evaluate({x:this.xi}).toPrecision(this.getPrecision());
      if(dfx< 1 && dfx>0)
        this.a=-1;
      else if(dfx>-1 && dfx<0)
        this.a=1;
      else
        this.a=this.precise(-1/dfx);
      return this.a.toPrecision(this.getPrecision()>14?14:this.getPrecision());
    }
    public substitute(x:number):number{
      var substitution = this.getExpression()
      const config = {
        number: 'BigNumber',
        precision: this.getPrecision()
     }
     const math = create(all, config)
  
      return math.simplify(math.parse(substitution).toString()).evaluate({x:bignumber(x)});
    }
    public substituteGX(x:number):number{
        var substitution = this.getGX();
        const config = {
            number: 'BigNumber',
            precision: this.getPrecision()
        }
        const math = create(all, config)
        return math.simplify(math.parse(substitution).toString()).evaluate({x:bignumber(x)});
    }
    public precise(x:number) {
      return Number(Number.parseFloat(x.toString()).toPrecision(this.getPrecision()));
    }
    public applyFixedPoint():number{ 
        var iteration_counter = 0
        var xi = this.getXi()
        var eps = this.getTolerance()
        var maxIterations = this.getMaxIterations()
        var xi1:number=0;
        xi1=xi;
        this.setGX();
        
        while (iteration_counter==0 ||
            ((math.abs(xi -xi1) > eps) && (iteration_counter < maxIterations))){
                xi=xi1;
                xi1=this.substituteGX(xi);
                
                this.steps.push(iteration_counter+1);
                this.steps.push(xi);
                this.steps.push(this.substitute(xi));
                this.steps.push(math.abs(xi -xi1));
                iteration_counter = iteration_counter + 1;
        }
        return xi1;
    
      }
}
export default FixedPoint