import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  funcInput:string;
  
  DirectSolTypes : solverType2[] = [
    {type : "Bisection Method", value : 1},
    {type : "False-Position", value : 2},
  ]
  decompostions : decompostion2[] = [
    {type : "Fixed Point", value : 1},
    {type : "Newton Raphson Method", value : 2},
    {type : "Secant Method", value : 3}
  ]
  constructor(private router:Router) {
  }
  ngOnInit(): void {
  }
  parseFunc(){
    var input  = this.funcInput
    input.replace(/ /g, "");
    input = input.toLowerCase();
    var inputSplit = input.split("");
    var checkletter : boolean = false;
    var checkNumber : boolean = false;
    var tempNum : string = "";
    var tempStck : string[] = [];
    var foundSign : boolean = false;
    var signPos : number = 0;
    for(let i = 0; i < inputSplit.length; i++){
      if(input.charAt(i) == "+" || input.charAt(i) == "-"){
        tempStck.push(input.charAt(i));
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
      if(inputSplit[i] == "^"){
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
    input = inputSplit.join("");
    if(input.charAt(0) != "-" && input.charAt(0) != "+"){
      input = "+".concat(input);
    }
    console.log(inputSplit.join(""));

    var arrofSigns : number[] = [];
    for(let i = 0; i < input.length; i++){
      if(((input.charAt(i) == "+" || input.charAt(i) == "-") && input.charAt(i - 1) != "^" && input.charAt(i - 1) != "(") || i == input.length - 1){
        arrofSigns.push(i);
      }
    }
    var funcMap = new Map<number, number>();
    for(let i = 0; i < arrofSigns.length - 1; i++){
      var firstIndex : number = arrofSigns[i];
      var lastIndex : number = arrofSigns[i + 1];
      var strPiece : string;
      if(i == arrofSigns.length - 2){
        strPiece = input.substring(firstIndex, lastIndex + 1);
      }
      else{
        strPiece = input.substring(firstIndex, lastIndex);
      }
      console.log(strPiece);
      var powerIndex : number;
      if(strPiece.indexOf("^") > -1){
        powerIndex = strPiece.indexOf("^");
        var coffNumStr : string = strPiece.substring(0, powerIndex - 1);
        var powerNumStr : string = strPiece.substring(powerIndex + 1);

        var coffNum = Number(coffNumStr);
        console.log(coffNumStr)
        if(coffNumStr == "" || coffNumStr == "+"){
          coffNum = 1;
        }
        if(coffNumStr == "-"){
          coffNum = -1;
        }
        var powerNum = Number(powerNumStr);

        if(!funcMap.get(powerNum)){
          funcMap.set(powerNum, 0);
        }
        funcMap.set(powerNum, funcMap.get(powerNum)  + coffNum)
      }
      else{
        if(strPiece.indexOf("x") == -1){
          var constNumStr : string = strPiece;
          var constNum : number = Number(strPiece);
          if(!funcMap.get(0)){
            funcMap.set(0, 0);
          }
          funcMap.set(0, funcMap.get(0) + constNum)
        }
        else if(strPiece.indexOf("x") > -1 && strPiece.indexOf("e") == -1){
          var xIndex : number = strPiece.indexOf("x");
          var coffNumStr : string = strPiece.substring(0, xIndex);
          var coffNumX : number = Number(coffNumStr);
          if(coffNumStr == "" || coffNumStr == "+"){
            coffNumX = 1;
          }
          if(coffNumStr == "-"){
            coffNumX = -1;
          }
          if(!funcMap.get(1)){
            funcMap.set(1, 0);
          }
          funcMap.set(1, funcMap.get(1) + coffNumX)
        }
        else if(strPiece.indexOf("sin") > -1 || strPiece.indexOf("cos") > -1){
          var sinIndex = strPiece.indexOf("sin")
        }
      }
    }
    console.log(arrofSigns);
    console.log(funcMap);
  }
  displaySolution()
  {
    
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
    var arrofCoffsNums : number[][][]
    var variableNames : string[]
    var div3=document.createElement("div")
    div3.style.marginTop="30px"
    div3.style.display="flex"

        for(let j=0;j<1;j++)
        {
          for(let k=0;k<1;k++)
          {
            var p =document.createElement("h3")
            var text =document.createTextNode("x" + "=" + "5")
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
        button.addEventListener("click",function():any{
         
         router3.navigate(["/plotter"])
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

