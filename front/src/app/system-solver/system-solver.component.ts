import { I18nPluralPipe } from '@angular/common';
import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { from } from 'rxjs';
import { SystemSolverService } from './system-solver.service';

//-------------------------------------------------------------------------------//

export interface solverType {
  type : string;
  value : number;
}
//-------------------------------------------------------------------------------//

export interface decompostion {
  type : string;
  value : number;
}
//-------------------------------------------------------------------------------//

export interface properties {
  coeff_matrix :number[][];
  constants_matrix :number[];
  precision :number;
  errorValue : number;
  numofIterations: number;
  arrofInitList:number[];
  method :string;
}
//-------------------------------------------------------------------------------//

class problem implements properties{
  errorValue : number = 0;
  numofIterations: number = 0;
  arrofInitList:number[] = [];
  numberofUnkown : number = 0;
  coeff_matrix :number[][] = [];
  constants_matrix :number[] = [];
  precision :number = 0;
  method :string = "";

  constructor(numberofUnkown : number, coeff_matrix:number[][],constants_matrix :number[], precision :number, numofIterations : number, arrofInitList : number[], errorValue:number,method :string){
    this.errorValue = errorValue;
    this.numberofUnkown = numberofUnkown;
    this.coeff_matrix = coeff_matrix;
    this.constants_matrix = constants_matrix;
    this.precision = precision;
    this.numofIterations = numofIterations;
    this.arrofInitList = arrofInitList;
    this.method = method
  }
}
//-------------------------------------------------------------------------------//

@Component({
    selector: 'app-system-solver',
    templateUrl: './system-solver.component.html',
    styleUrls: ['./system-solver.component.css']
  })
export class SystemSolverComponent {


  constructor(private server : SystemSolverService){}
//-------------------------------------------------------------------------------//

  DirectSolTypes : solverType[] = [
    {type : "Gauss Elmination", value : 1},
    {type : "Gauss-Jordan", value : 2},
  ]

  iterativeSolTypes : solverType[] = [
    {type : "Gauss-Seidel", value : 1},
    {type : "Jacobi-Iteration", value : 2}
  ]


  decompostions : decompostion[] = [
    {type : "Doo Little Decompostion", value : 1},
    {type : "Crout Decompostion", value : 2},
    {type : "Cholesky Decompostion", value : 3}
  ]

//-------------------------------------------------------------------------------//
  createdIter : boolean = false;
  validInput : boolean = true;
  symmFalg : boolean = false;
  diagonallyDomminantFlag:boolean =false;
  squareFlag : boolean =false;
  InsideValid : boolean = false;
  InsideInvalid : boolean = false;
  currentSolType : string = this.DirectSolTypes[0].type;
  variableNames : string[] = [];
  externalnum:number=2
  coff:any=[
    "X1", "X2"
  ]
  flag:number=0
  $event:any
  significant_figure:number = 1
  coeff_matrix :number[][] = [];
  constants_matrix :number[] = [];
  unknowns_matrix :string[] = [];
  numberofUnkowns : number = 1;
  systemInput : string;
  funcInput : string;
  solution :number[][][] = [];
  arrofInitList : number[] = [];
  numofIterations : number = 0;
  inputNumofIter : HTMLInputElement = null;
  errorValue : number = 0;
  runTime :number = 0;
  inputErrorValue : HTMLInputElement = null;
  arrofInputInitList : HTMLInputElement[] = [];
//-------------------------------------------------------------------------------//

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
    var arrofCoffsNums : number[][][] = this.solution;
    var variableNames : string[] = this.unknowns_matrix;
    if(this.currentSolType=="Gauss Elmination" || this.currentSolType=="Gauss-Jordan" || this.currentSolType=="Gauss-Seidel" || this.currentSolType=="Jacobi-Iteration")
    {
        for(let j=0;j<arrofCoffsNums[0].length;j++)
        {
          for(let k=0;k<arrofCoffsNums[0][j].length;k++)
          {
            var p =document.createElement("h3")
            var text =document.createTextNode(variableNames[j] + "=" + arrofCoffsNums[0][j][k].toString())
            p.appendChild(text)
            p.style.marginLeft="100px"
            div2.appendChild(p)
            set2?.appendChild(div2)
            indiv?.appendChild(set2)
          }
        }
    }
    else
    {

      var div=document.createElement("div")
      div.style.display="flex"
      div.style.marginTop="20px"
      div.style.marginLeft="150PX"
      for(let i=0 ;i<arrofCoffsNums.length;i++)
      {
        if(i!=arrofCoffsNums.length-1)
        {
        if(i==0)
        {
          var p =document.createElement("h3")
          var text =document.createTextNode("L = " )
          p.appendChild(text)
          div.appendChild(p)
        }
        else
        {
          var p2 =document.createElement("h3")
          var text =document.createTextNode("U = " )
          p2.appendChild(text)
          p2.style.marginLeft="30px"
          div.appendChild(p2)
        }
        var width2 = variableNames.length*40;
        var table2 =document.createElement("table")

        table2.style.marginLeft="20px"
        table2.width=width2.toString()
        table2.border="2"
        for(let j=0;j<arrofCoffsNums[i].length;j++)
        {
          var tr=document.createElement("tr")
          for(let k=0;k<arrofCoffsNums[i][j].length;k++)
          {

            var td= document.createElement("td")
            td.innerHTML=arrofCoffsNums[i][j][k].toString()

            tr.appendChild(td)

          }
          table2.appendChild(tr)
        }
        div.appendChild(table2)
        div2.appendChild(div)
        set2?.appendChild(div2)
        indiv?.appendChild(set2)
      }
      else
      {
        var div2=document.createElement("div")
        div2.style.display="flex"
        div2.style.marginTop="20px"
        div2.style.marginLeft="60px"
        for(let j=0;j<arrofCoffsNums[i].length;j++)
        {
          for(let k=0;k<arrofCoffsNums[i][j].length;k++)
          {
            var p =document.createElement("h3")
            var text =document.createTextNode(variableNames[j] + "=" + arrofCoffsNums[i][j][k].toString())
            p.appendChild(text)
            p.style.marginLeft="100px"
            div2.appendChild(p)
            set2?.appendChild(div2)
            indiv?.appendChild(set2)
          }
        }
      }
    }
  }

  }
//--------------------------------------------------------------------------------//
generate()
{
  var del =document.getElementById("0.5")
  del?.parentNode?.removeChild(del)
  console.log(this.coeff_matrix)
  console.log(this.constants_matrix)
  console.log(this.unknowns_matrix)
  var set2 = document.createElement("div")
  set2.id = "0.5"
  set2.style.marginLeft="290px"
  set2.style.marginTop="30px"
  var h2=document.createElement("h5")
  var textnode=document.createTextNode("The Final Equations")
  h2.appendChild(textnode)
  set2.appendChild(h2)

  for(let i=0;i<this.coeff_matrix.length;i++)
  {
      var set = document.createElement("div")
      set.style.display="flex"
      for(let j =0 ;j<this.coeff_matrix[i].length;j++)
      {
        var inputdown = document.createElement("div")
        inputdown.style.height="30px"
        inputdown.style.border="1px solid black"
        inputdown.style.background="transparent"
        inputdown.style.border = "3px solid rgb(206, 56, 76)"
        inputdown.style.borderRadius = "5px"

        var p4 = document.createElement("p")
        var text4 = document.createTextNode(this.coeff_matrix[i][j].toString())
        p4.appendChild(text4)
        p4.style.textAlign="center"
        inputdown.appendChild(p4)
        set.appendChild(inputdown)
        var p = document.createElement("p")
        var text = document.createTextNode(this.unknowns_matrix[j])
        p.style.marginLeft="8px"
        p.appendChild(text)
        set.appendChild(p);
        set2.appendChild(set);
        if(j!=this.coeff_matrix[0].length-1)
        {
          var p2=document.createElement("p")
          var text2=document.createTextNode("+")
          p2.style.marginLeft="8px"
          p2.appendChild(text2)
          set.appendChild(p2)
          set2.appendChild(set)
          document.getElementById("0")?.appendChild(set2)
        }
      }
      var p3=document.createElement("p")
      var text3=document.createTextNode("= ")
      p3.style.marginLeft="8px"
      p3.appendChild(text3)
      set.appendChild(p3)
      var input2 =document.createElement("div")
      input2.style.height="30px"
      input2.style.border="2px solid black"
      input2.style.borderRadius = "5px"
      input2.style.backgroundColor="transparent"
      input2.style.border = "3px solid rgb(206, 56, 76)"
      input2.className = "matrixIn";
      var p5= document.createElement("p")

    var text5=document.createTextNode(this.constants_matrix[i].toString())
    p5.appendChild(text5)
    p5.style.textAlign="center"
      input2.appendChild(p5)
      set.appendChild(input2)
      set2.appendChild(set)
      document.getElementById("0")?.appendChild(set2)
    }
}

//-------------------------------------------------------------------------------//

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

  parseSystem(){
    document.getElementById("50")?.remove()
    document.getElementById("51")?.remove();
    console.log(document.getElementById("iter"))
    if(this.numberofUnkowns==0)
    {
      this.delete()
    }
    this.coeff_matrix = [];
    this.constants_matrix = [];
    this.unknowns_matrix = [];
    this.numberofUnkowns = 1;
    this.arrofInputInitList= [];
    this.arrofInitList = [];

    var input = this.systemInput;
    input = input.replace(/ /g,'');

    input = input.toLowerCase();
    var inputSplit = input.split("");
    console.log(inputSplit);



    var arrofCoffsNums : number[][] = [];
    var arrofCoffsNames : string[] = [];
    var arrofConstNums : number[] = [];

    var rows : number = 0;


    var arrofMappedValues : Map<string, number>[] = []
    arrofMappedValues.push(new Map<string, number>());

    var tempNum : string = "";
    var tempStr : string = "";
    var lastSign : string = "";

    var checkletter :boolean = false
    var checkNumber : boolean = false;
    var foundEqu : boolean = false;
    var inputValid : boolean = true;


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
      if(inputSplit[i] == "\n"){
        console.log("INSIDE IF");
        tempStck.push(inputSplit[i]);
        if(tempStck.length > 1){
          inputSplit[i] = "";
        }
      }
      else{
        tempStck.pop();
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
    console.log(inputSplit);

    if (inputSplit[inputSplit.length - 1] != "\n"){
      inputSplit.push("\n");
    }
    if(inputSplit[0] == "\n"){
      inputSplit[0] = "";
    }

    console.log(inputSplit);

    if(inputSplit.filter(value => value == "=").length == 0){
      inputValid = false;
    }
    else{
      inputValid = true;

    }


    input = inputSplit.join("");

    if(input.length == 0){
      inputValid = true;
    }

    console.log("VALID ==> ", inputValid);

      for(let i = 0; i < input.length; i++){
        if((Number(input.charAt(i)) || input.charAt(i) == "0" || input.charAt(i) == ".") && !checkletter){
          checkNumber = true;
          if(input.charAt(i - 1) == "+"){
            tempNum = "+".concat(tempNum)
          }
          if(input.charAt(i - 1) == "-"){
            tempNum = "-".concat(tempNum);
          }
          tempNum = tempNum.concat(input.charAt(i));

        }
        else{
          console.log("FOUND EQUAL ===>", foundEqu);
          if(input.charAt(i) == "+" || input.charAt(i) == "-" || input.charAt(i) == "=" || input.charAt(i) == "\n"){
            if(input.charAt(i) == "+" || input.charAt(i) == "-"){
              lastSign = input.charAt(i);
            }
            console.log(tempNum)
            if(Number(tempNum) || tempNum == "0" || input.charAt(i) == "+" || input.charAt(i) == "-"){
              if(checkletter){
                if(arrofCoffsNames.length > 0){
                  if(arrofCoffsNames.indexOf(tempStr) == -1){
                    arrofCoffsNames.push(tempStr);
                  }
                }
                else{
                  arrofCoffsNames.push(tempStr);
                }
                if(!foundEqu){
                  if(arrofMappedValues[rows].get(tempStr)){
                    arrofMappedValues[rows].set(tempStr, arrofMappedValues[rows].get(tempStr) + Number(tempNum));
                  }
                  else{
                    arrofMappedValues[rows].set(tempStr, 0);
                    arrofMappedValues[rows].set(tempStr, arrofMappedValues[rows].get(tempStr) + Number(tempNum));
                  }
                }
                else{
                  if(arrofMappedValues[rows].get(tempStr)){
                    arrofMappedValues[rows].set(tempStr, arrofMappedValues[rows].get(tempStr) - Number(tempNum));
                  }
                  else{
                    arrofMappedValues[rows].set(tempStr, 0);
                    arrofMappedValues[rows].set(tempStr, arrofMappedValues[rows].get(tempStr) - Number(tempNum));
                  }
                }
                checkletter = false;
              }
              else{
                if(!foundEqu){
                  if(arrofMappedValues[rows].get("const")){
                    arrofMappedValues[rows].set("const", arrofMappedValues[rows].get("const") - Number(tempNum));
                  }
                  else{
                    arrofMappedValues[rows].set("const", 0);
                    arrofMappedValues[rows].set("const", arrofMappedValues[rows].get("const") - Number(tempNum));
                  }
                }
                else{
                  if(arrofMappedValues[rows].get("const")){
                    arrofMappedValues[rows].set("const", arrofMappedValues[rows].get("const") + Number(tempNum));
                  }
                  else{
                    arrofMappedValues[rows].set("const", 0);
                    arrofMappedValues[rows].set("const", arrofMappedValues[rows].get("const") + Number(tempNum));
                  }
                }
                checkletter = false;
              }
            }
            else{
              inputValid = false;
              console.log("NOT VALID NUMBER");

              break;
            }

            tempNum = "";
            tempStr = "";
            checkNumber = false;
            if(input.charAt(i) == "="){
              if((input.charAt(i + 1) == " " )|| (i == input.length - 1) || (input.charAt(i + 1) == "\n")){
                inputValid = false;
                console.log("NOT VALID EQUAL");
                break;
              }
              lastSign = "";
              foundEqu = true;
            }
            if(input.charAt(i) == "\n"){
              foundEqu = false;
              lastSign = "";
              checkletter = false;
              checkNumber = false;
              tempNum = "";
              tempStr = "";
              rows++;
              if(i != input.length - 1){
                arrofMappedValues.push(new Map<string, number>());
              }
              arrofCoffsNums = [];
              arrofConstNums = [];
              for(let j = 0; j < rows; j++){
                for(var value of arrofCoffsNames){
                  if(!arrofMappedValues[j].get(value)){
                    arrofMappedValues[j].set(value, 0);
                  }
                  if(!arrofMappedValues[j].get("const")){
                    arrofMappedValues[j].set("const", 0);
                  }
                }
              }
              for(let j = 0; j < rows; j++){
                arrofCoffsNums.push([]);
                for(let k = 0; k < arrofCoffsNames.length; k++){
                  arrofCoffsNums[j].push(arrofMappedValues[j].get(arrofCoffsNames[k]));
                }
              }
              for(let j = 0; j < rows; j++){
                arrofConstNums.push(arrofMappedValues[j].get("const"));
              }
            }
          }
          else{
            if(!checkNumber && !checkletter){
              tempNum = lastSign.concat("1").concat(tempNum);
              console.log(tempNum)
            }
            tempStr = tempStr.concat(input.charAt(i));
            checkletter = true;
          }
        }

        this.unknowns_matrix = arrofCoffsNames;
        this.numberofUnkowns = arrofCoffsNames.length;
        this.coeff_matrix = arrofCoffsNums;
        this.constants_matrix = arrofConstNums;
        console.log(arrofMappedValues);
        console.log(this.coeff_matrix);

    }
    if((this.currentSolType == this.iterativeSolTypes[0].type) || (this.currentSolType == this.iterativeSolTypes[1].type)){
      if(!this.createdIter){
        if(this.numberofUnkowns==0)

        {
          var div =document.getElementById("50")
          div?.parentNode?.removeChild(div)

          var div2 =document.getElementById("51")
          div2?.parentNode?.removeChild(div2)
        }
        else
        {
          this.createInitList(this.numberofUnkowns);
          this.createErrorIters();
        }
        this.readInitList();
        this.readError();
        this.readNumofIter();

      }

    }

    console.log("VALID AFTER FOR", inputValid);

    if(inputSplit.filter(value =>  value == "=").length != this.coeff_matrix.length){
      inputValid = false;
    }
    if(this.coeff_matrix.length > 0){
      if(this.coeff_matrix[0].length != this.coeff_matrix.length){
        inputValid = false;
      }
    }

    if(inputValid == false){
      console.log("INSIDE FALSE");
      document!.getElementById("textinput").style.borderRadius = "15px";
      document!.getElementById("textinput").style.borderColor = "red";
      document!.getElementById("textinput").style.borderWidth = "6px";
    }
    else{
      console.log("INSIDE TRUE");
      document!.getElementById("textinput").style.borderWidth = "0px"
    }
    this.validInput = inputValid;
}
//-------------------------------------------------------------------------------//

  readInitList(){
    for(let i = 0; i < this.numberofUnkowns; i++){
      this.arrofInitList[i] = Number(this.arrofInputInitList[i].value);
    }
  }
//-------------------------------------------------------------------------------//
  readNumofIter(){
    this.numofIterations = Number(this.inputNumofIter.value)
  }
//-------------------------------------------------------------------------------//

  readError(){
    this.errorValue = Number(this.inputErrorValue.value)
  }
//-------------------------------------------------------------------------------//

  solutionTypeList(solType : string)
  {

    if(this.coeff_matrix.length!=0)
    {
      this.parseSystem();

      this.currentSolType = solType;

    if(!(this.currentSolType == this.iterativeSolTypes[0].type) && !(this.currentSolType == this.iterativeSolTypes[1].type)){
      document.getElementById("iter")?.remove();
      document.getElementById("iter2")?.remove();
      document.getElementById("iterList")?.remove();
    }
  }
  else
  {
    window.alert("please Enter Equations in text box")
  }


  }
//-------------------------------------------------------------------------------//

  createErrorIters(){

    var div=document.createElement("div")
    div.style.display="flex"
    div.style.marginTop="20px"
    div.id="50"
    var p =document.createElement("h4")
    var text =document.createTextNode("No of iterations:")
    p.appendChild(text)
    p.style.marginTop="5px"
    div.appendChild(p)
    var input = document.createElement("input");
    var input2 = document.createElement("input");
    this.inputNumofIter = input;
    this.inputErrorValue = input2;
    input.style.width="60px"
    input.style.height="40px"
    input.style.marginTop="4px"
    input.style.marginLeft="5px"
    input.style.border="3px solid black"
    input.style.borderRadius = "10px"
    input.type = "number";
    input.min = "1";
    input.step = "1";
    input.className = "matrixIn";
    div.appendChild(input)
    var p2 =document.createElement("h4")
    var text2 =document.createTextNode("Error tolerance:")
    p2.appendChild(text2)
    p2.style.marginTop="5px"
    p2.style.marginLeft="5px"
    div.appendChild(p2)
    input2.style.width="60px"
    input2.style.height="40px"
    input2.style.marginTop="4px"
    input2.style.marginLeft="5px"
    input2.style.border="3px solid black"
    input2.style.borderRadius = "10px"
    input2.type = "number";
    input2.min = "0";
    input2.className = "matrixIn";
    input2.id = "iter2";
    div.appendChild(input2)
    document.getElementById("0")?.appendChild(div);

  }

//-------------------------------------------------------------------------------//

  createInitList(num : number){

    var div = document.createElement("div");
    div.id = "51";
    div.style.display="flex"
    div.style.marginTop="5px"
    var p =document.createElement("h2")
    var text =document.createTextNode("initial values :")
    p.style.marginTop="5px"
    p.appendChild(text)
    div.appendChild(p)
    for(let i = 0; i < num; i++){
      var input3 = document.createElement("input");
      input3.style.width="60px"
      input3.style.height="40px"
      input3.style.marginTop="4px"
      input3.style.marginLeft="5px"
      input3.style.border="3px solid black"
      input3.style.borderRadius = "10px"
      input3.type = "number";
      input3.className = "matrixIn";
      input3.placeholder = this.unknowns_matrix[i];
      div.appendChild(input3);
      this.arrofInputInitList.push(input3);
    }

    document.getElementById("0")?.appendChild(div);

  }


//-------------------------------------------------------------------------------//
delete()
{
  var del2 =document.getElementById("0.5")
    del2?.parentNode?.removeChild(del2)
    var del =document.getElementById("soln")
    del?.parentNode?.removeChild(del)
}
//-------------------------------------------------------------------------------//

  validateSymmetric()
  {
    var symm : boolean = true;
    for(let i = 0; i < Math.min(this.coeff_matrix.length,this.coeff_matrix[0].length); i++){
      for(let j = 0; j < Math.min(this.coeff_matrix.length,this.coeff_matrix[0].length); j++){
        var value = this.coeff_matrix[i][j];
        var value2 = this.coeff_matrix[j][i];
        if(value != value2){
          symm = false;
          break;
        }
      }
    }

    this.symmFalg = symm;
    if(this.currentSolType == this.decompostions[2].type && !this.symmFalg){
      alert("Matrix Must be Symmetirc");

    }
  }
  //-------------------------------------------------------------------------------//

  validateDiagonallyDominant()
  {
    var diagonallyDomminant1 : boolean = false;
    var diagonallyDomminant2 :boolean =true;
    for(let i = 0; i < Math.min(this.coeff_matrix.length,this.coeff_matrix[0].length); i++){
      var sum:number=0
      var diagonal:number=0
      for(let j = 0; j < Math.min(this.coeff_matrix.length,this.coeff_matrix[0].length); j++){
        if(i==j)
          diagonal=this.coeff_matrix[i][j];
        else
          sum =sum+ this.coeff_matrix[i][j];
        }
      if(sum < diagonal && !diagonallyDomminant1)
      {
        diagonallyDomminant1=true;
      }
      else if(sum > diagonal){
        diagonallyDomminant2 = false;
        break;
      }
    }

    this.diagonallyDomminantFlag = diagonallyDomminant2 && diagonallyDomminant1;

    if((this.currentSolType == this.iterativeSolTypes[0].type ||this.currentSolType == this.iterativeSolTypes[1].type)
      && !this.diagonallyDomminantFlag){
      alert("Solution may diverge");
    }
  }
//-------------------------------------------------------------------------------//

  validateSquare()
  {
    var square : boolean = true;

    var rows = this.coeff_matrix.length;
    var cols = this.coeff_matrix[0].length;
    if(rows != cols){
      square = false;
    }

    this.squareFlag = square;
    if(!this.squareFlag){
      alert("Matrix Must be Square");

    }
  }

//-------------------------------------------------------------------------------//

  solve()
  {
    var start :number;
    console.log("INVALID IN SOLVE", this.validInput);


    if(this.validInput){
      console.log("INSIDE IF SOLVER")
      if(this.currentSolType==this.iterativeSolTypes[0].type || this.currentSolType==this.iterativeSolTypes[1].type){
        this.readInitList();
        this.readNumofIter();
        this.readError();
      }
      this.validateSymmetric()
      this.validateSquare()
      if((this.currentSolType == this.iterativeSolTypes[0].type)){
        this.validateDiagonallyDominant()
      }
      if((!(this.currentSolType == this.decompostions[2].type && !this.symmFalg)
        && this.squareFlag)){
        this.generate();
        console.log(new problem(this.numberofUnkowns, this.coeff_matrix, this.constants_matrix, this.significant_figure,this.numofIterations, this.arrofInitList, this.errorValue,this.currentSolType))
        start = new Date().getTime();
        this.server.postProblem(new problem(this.numberofUnkowns, this.coeff_matrix, this.constants_matrix, this.significant_figure,this.numofIterations, this.arrofInitList, this.errorValue,this.currentSolType)).subscribe((response : number[][][])=>{
          this.solution = response;
          if(this.currentSolType == this.decompostions[2].type && this.solution.length==0){
            alert("Matrix is not decomposable")
          }else if(this.currentSolType == this.decompostions[1].type && this.solution.length==0){
            alert("There's no unique or infinite number of solution for this system")
          }else if(this.currentSolType == this.decompostions[0].type && this.solution.length==0){
            alert("There's no Doo Little decomposition for this system")
          }else if((this.currentSolType == this.DirectSolTypes[0].type || this.currentSolType == this.DirectSolTypes[1].type) && this.solution.length==0){
            alert("There's no unique or infinite number of solution for this system")
          }else{
            this.runTime = new Date().getTime() - start;
            this.displaySolution()
            this.arrofInitList = [];


          }
        },(error:any)=>alert("Invalid Input"));


      }

    }else{
      alert("Invalid Input")
    }
    }





}
