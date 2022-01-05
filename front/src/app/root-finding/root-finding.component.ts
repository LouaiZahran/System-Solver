import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlotterComponent } from '../plotter/plotter.component';
import * as math from 'mathjs';
import { and, derivative, im, number } from 'mathjs';
import bisection from './bisection'
import FalsePosition from './FalsePosition'
import  FixedPoint  from './FixedPoint';
import   NewtonRaphson from './NewtonRaphson'
import  SecantMathod from './SecantMethod'
export interface solverType2 {
  type : string;
  value : number;
}
//-------------------------------------------------------------------------------//
export interface decompostion2 {
  type : string;
  value : number;
}
@Component({
  selector: 'app-root-finding',
  templateUrl: './root-finding.component.html',
  styleUrls: ['./root-finding.component.css']
})
export class RootFindingComponent implements OnInit {
  runTime :number = 0;
  funcInput:string="";
  deravtitve2:string
  initalvalue1:string="0"
  initalvalue2:string="0"
  precision:string="0.00001"
  significant_figure:number = 1
  iterations:string="50"
  solution:string;
  inputVerify : boolean = false;

  DirectSolTypes : solverType2[] = [
    {type : "Bisection Method", value : 1},
    {type : "False Position", value : 2},
  ]
  decompostions : decompostion2[] = [
    {type : "Fixed Point", value : 1},
    {type : "Newton Raphson Method", value : 2},
    {type : "Secant Method", value : 3}
  ]
  currentSolType : string = this.DirectSolTypes[0].type;
  constructor(private router:Router) {
  }
  ngOnInit(): void {
  }
  solutionTypeList(solType : string)
  {
      this.currentSolType = solType;
      console.log(this.currentSolType)
  }
  verify()
  {
    this.funcInput = this.funcInput.replace(/ /g, "");
    var tempStck : string[] = [];

    var inputSplit = this.funcInput.split("");

    var foundSign : boolean = false;
    var signPos : number = 0;
    for(let i = 0; i < inputSplit.length; i++){
      if(inputSplit[i] == "."){
        console.log("INSIDE IF");
        tempStck.push(inputSplit[i]);
        if(tempStck.length > 1){
          inputSplit[i] = "";
        }
      }
      else{
        tempStck = [];
      }
    }
    tempStck = [];

    for(let i = 0; i < inputSplit.length; i++){

      if(this.funcInput.charAt(i) == "+" || this.funcInput.charAt(i) == "-"){
        tempStck.push(this.funcInput.charAt(i));
        if(!foundSign){
          signPos = i;
        }
        if(tempStck.length > 1){
          inputSplit[i] = "";
        }
        foundSign = true;

      }
      else{
        if(foundSign){
          var signArr : string[] = [];
          signArr = tempStck.filter(value => value == "-");
          if(signArr.length % 2 == 0){
            inputSplit[signPos] = "+";
          }
          else{
            inputSplit[signPos] = "-";
          }
        }
        tempStck = [];
        foundSign = false;
      }
    }

    tempStck = [];


    this.funcInput= inputSplit.join("");

    var regexp = new RegExp('(?:[0-9-+*/^()x.]|e|a?(?:sin|cos|tan)h?)+')
    var test1;
    test1 = this.funcInput.match(regexp);



    if(test1 != null){
      if((test1?.input != test1[0]) || test1 == null)
      {
        //alert("input error")
        console.log("INSIDE FALSE");
        this.inputVerify = false;

      }
      else
      {

        console.log("INSIDE TRUE");
        this.inputVerify = true;

        console.log(this.funcInput)
      }
    }
    else{
        //alert("input error")
        console.log("INSIDE FALSE");
        this.inputVerify = false;

    }

    if(this.funcInput.indexOf("x") == -1){
      this.inputVerify = false;
    }

    try{
      console.log(math.parse(this.funcInput).toString());
      console.log(math.simplify(this.funcInput).toString());
      console.log(math.parse(this.funcInput).evaluate({x:1}));

    }
    catch(e){
      this.inputVerify = false;
    }

    for(let i = 0; i < this.funcInput.length; i++){
      if(this.funcInput.charAt(i) == "^" && this.funcInput.charAt(i - 1) == "x" && this.funcInput.charAt(i + 1) == "x"){
        this.inputVerify = false;
      }
    }
    if(this.inputVerify){
      document!.getElementById("textinput").style.borderWidth = "0px"
    }
    else{
      document!.getElementById("textinput").style.borderRadius = "15px";
      document!.getElementById("textinput").style.borderColor = "red";
      document!.getElementById("textinput").style.borderWidth = "6px";
    }
    console.log(test1);
    console.log(math.derivative(this.funcInput, "x").toString());



  }

  displaySolution()
  {
    if(this.inputVerify){
      if(this.currentSolType=="Bisection Method" )
      {

        console.log("inital value1"+this.initalvalue1)
        console.log("inital value2"+this.initalvalue2)
        var bisect:any = new bisection(Number(this.initalvalue1),Number(this.initalvalue2),Number(this.precision),Number(this.significant_figure),this.funcInput,Number(this.iterations))
        var start = new Date().getTime()
        this.solution=bisect.applyBisection().toString()
        var end = new Date().getTime()
        var delta = end-start
        this.runTime=delta
      }
      else if(this.currentSolType=="False Position")
      {
        var falsePosition:any = new FalsePosition(Number(this.initalvalue1),Number(this.initalvalue2),Number(this.precision),Number(this.significant_figure),this.funcInput,Number(this.iterations))
        var start = new Date().getTime()
        this.solution= falsePosition.applyFalsePosition().toString()
        var end = new Date().getTime()
        var delta = end-start
        this.runTime=delta

      }
      else if(this.currentSolType=="Fixed Point")
      {
          var fixedpoint = new FixedPoint(Number(this.initalvalue1),Number(this.precision),Number(this.significant_figure),this.funcInput,Number(this.iterations))
          var start = new Date().getTime()
          this.solution=fixedpoint.applyFixedPoint().toString()
          var end = new Date().getTime()
          var delta = end-start
          this.runTime=delta
      }
      else if(this.currentSolType=="Newton Raphson Method")
      {

          var newtonRaphson = new NewtonRaphson(Number(this.initalvalue1),Number(this.precision),Number(this.significant_figure),this.funcInput,Number(this.iterations))
          var start = new Date().getTime()
          this.solution=newtonRaphson.applyNewtonRaphson().toString()
          var end = new Date().getTime()
          var delta = end-start
          this.runTime=delta
      }
      else
      {
          var secant = new SecantMathod (Number(this.initalvalue1),Number(this.initalvalue2),Number(this.precision),Number(this.significant_figure),this.funcInput,Number(this.iterations))
          var start = new Date().getTime()
          this.solution= secant.applySecantMethod().toString()
          var end = new Date().getTime()
          var delta = end-start
          this.runTime=delta
      }
      var indiv=document.getElementById("5000")
      var del2 =document.getElementById("soln")
      del2?.parentNode?.removeChild(del2)
      var set2 = document.createElement("div")
      set2.id = "soln"
      var div2=document.createElement("div")
      var p =document.createElement("h1")
      var text =document.createTextNode("Solution")
      indiv?.appendChild(set2)
      p.appendChild(text)
      p.style.marginLeft="280px"
      p.style.marginTop="20px"
      div2.appendChild(p)
      document.getElementById("soln")?.appendChild(div2)
      var div3=document.createElement("div")
      div3.style.marginTop="30px"
      div3.style.display="flex"
      for(let j=0;j<1;j++)
      {
        for(let k=0;k<1;k++)
        {
          var p =document.createElement("h3")
          var text =document.createTextNode("x" + "=" + this.solution)
          p.appendChild(text)
          p.style.marginLeft="100px"
          p.style.marginTop="20px"
          div3.appendChild(p)
          div2.appendChild(div3)
          set2?.appendChild(div2)
          indiv?.appendChild(set2)
        }
      }
      var button=document.createElement("button")
      var text4=document.createTextNode("plot graphically")
      button.appendChild(text4)
      var router3=this.router
      var sol=this.currentSolType

      var exp=""
      var fn=this.funcInput
      var exp1=this.initalvalue1
      var exp2=this.initalvalue2
      if(this.currentSolType=="False Position" || this.currentSolType=="Bisection Method" )
      {
        exp=this.funcInput
      }
      else if(this.currentSolType=="Fixed Point")
      {
        exp=this.funcInput+"+"+"x"
        exp=math.simplify(exp).toString()
        console.log(exp)
      }
      else
      {
        console.log("lol")
        console.log(this.deravtitve2)
        exp=derivative(this.funcInput,"x").toString()
      }
      button.addEventListener("click",function():any{
        PlotterComponent.expression1=exp
        PlotterComponent.method=sol
        if(sol=="Bisection Method" || sol=="False Position")
        {
          console.log("all")
          PlotterComponent.xmax=Number(exp2)
          PlotterComponent.xmin=Number(exp1)
        }
        router3.navigate(["/plotter"])
        console.log(sol)
        console.log(exp)

      })
      button.style.marginLeft="400px"
      button.style.width="110px"
      button.style.height="70px"
      button.style.backgroundColor="black"
      button.style.color="white"
      button.style.borderRadius="15px"
      div3.appendChild(button)
      div2.appendChild(div3)
      set2.appendChild(div2)
      indiv?.appendChild(set2)
    }

  }
    read()
    {
      if(this.inputVerify){
        var text=<HTMLInputElement>document.getElementById("intial1")
        this.initalvalue1=text.value
        if(this.flag==1)
        {
          var text2=<HTMLInputElement>document.getElementById("intial2")
          this.initalvalue2=text2.value
          if(this.initalvalue2<this.initalvalue1)
          {
            var temp = this.initalvalue1
            this.initalvalue1=this.initalvalue2
            this.initalvalue2=temp
          }
        }
        var text3=<HTMLInputElement>document.getElementById("precision")
        if(text3.value!="")
        {
          this.precision=text3.value
        }

        var text4=<HTMLInputElement>document.getElementById("iterations")
        if(text4.value!="")
        {
          this.iterations=text4.value
        }
        console.log(this.initalvalue1)
        console.log(this.initalvalue2)
        console.log(this.precision)
        console.log(this.iterations)
      }

    }
    flag:number=1
    change()
    {
      console.log("a7a")
      if((this.currentSolType=="False Position" || this.currentSolType=="Bisection Method" ||this.currentSolType=="Secant Method") &&this.flag==0 )
      {
          this.flag=1
          var div=document.getElementById("yes")
          var input =document.createElement("input")
          input.id="intial2"
          input.type="number"
          input.style.width="50px"
          input.style.marginTop="20px"
          input.style.borderRadius="10px"
          input.required
          input.style.backgroundColor="rgb(251, 197, 161)"
          div?.appendChild(input)
      }
      else if((this.currentSolType=="Newton Raphson Method" || this.currentSolType=="Fixed Point") &&this.flag==1)
      {
        this.flag=0
        var input2=document.getElementById("main")
        var input3=document.getElementById("intial2")
        input3?.remove()
      }
    }
  }

