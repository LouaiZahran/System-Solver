import * as math from "mathjs"

export class SecantMathod{
    private xCurr:number;
  private xPrev:number;
  private tolerance:number;
  private precision:number;
  private expression:string;
  private maxIterations:number;

  constructor(xCurr:number,xPrev:number,tolerance:number,precision:number,expression:string,maxIterations:number){
    this.xCurr = xCurr
    this.xPrev = xPrev
    this.tolerance = tolerance
    this.precision = precision
    this.expression = expression
    this.maxIterations = maxIterations
  }
  public getXCurr():number{
    return this.xCurr
  }
  public getXPrev():number{
    return this.xPrev
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
  public setXCurr(x:number):void{
    this.xCurr = x
  }
  public setXPrev(x:number):void{
    this.xPrev = x
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
    public applySecantMethod():number{
        var iteration_counter = 0
        var xCurr = this.getXCurr()
        var xPrev = this.getXPrev()
        var eps = this.getTolerance()
        var maxIterations = this.getMaxIterations()
        var xTemp:number;
        var fcurr:number;
        var fprev:number;
        
        while ((math.abs(xCurr -xPrev) > eps) && (iteration_counter < maxIterations)){
            
            fprev = this.substitute(xPrev);
          fcurr = this.substitute(xCurr);
          xTemp = this.precise(xCurr-
                    this.precise( fcurr* 
                        this.precise(    
                            (this.precise(xCurr-xPrev)
                            /this.precise(fcurr-fprev)
                            )
                        )
                    )
                );
            xPrev=xCurr;
            xCurr=xTemp;
            iteration_counter = iteration_counter + 1;
        }
    
        return xCurr;
    
      }
    }
    export default SecantMathod
