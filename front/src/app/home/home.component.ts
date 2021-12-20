import { I18nPluralPipe } from '@angular/common';
import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { from } from 'rxjs';
import { HomeService } from './home.service';

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
    selector: 'solve',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
  })
export class homecomponent {


  constructor(private server : HomeService){}
//-------------------------------------------------------------------------------//

  DirectSolTypes : solverType[] = [
    {type : "Gauss Elmination", value : 1},
    {type : "Gauss-Jordan", value : 2},
  ]

  iterativeSolTypes : solverType[] = [
    {type : "Gauss-Seidil", value : 1},
    {type : "Jacobi-Iteration", value : 2}
  ]


  decompostions : decompostion[] = [
    {type : "Doo Little Decompostion", value : 1},
    {type : "Crout Decompostion", value : 2},
    {type : "Cholesky Decompostion", value : 3}
  ]

//-------------------------------------------------------------------------------//
  createdIter : boolean = false;
  validFlagInput : boolean = false;
  symmFalg : boolean = false;
  diagonallyDomminantFlag:boolean =false;
  squareFlag : boolean =false;
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
  solution :number[][][] = [];
  steps :number[][][] = [];
  arrofInitList : number[] = [];
  numofIterations : number = 0;
  inputNumofIter : HTMLInputElement = null;
  errorValue : number = 0;
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
    if(this.currentSolType=="Gauss Elmination" || this.currentSolType=="Gauss-Jordan" || this.currentSolType=="Gauss-Seidil" || this.currentSolType=="Jacobi-Iteration")
    {
      for(let i=0 ;i<arrofCoffsNums.length;i++)
      {
        for(let j=0;j<arrofCoffsNums[i].length;j++)
        {
          for(let k=0;k<arrofCoffsNums[i][j].length;k++)
          {
            var p =document.createElement("h3")
            var text =document.createTextNode(variableNames[k] + "=" + arrofCoffsNums[i][j][k].toString())
            p.appendChild(text)
            p.style.marginLeft="100px"
            div2.appendChild(p)
            set2?.appendChild(div2)
            indiv?.appendChild(set2)
          }
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
    var button =document.createElement("button")
    var text=document.createTextNode("show steps")
    button.style.width="90px"
    button.style.backgroundColor="black"
    button.style.color="white"
    button.style.marginLeft="30px"
    button.appendChild(text)
    div2.appendChild(button)
    var steps: number[][][] = this.steps;
    button.onclick=function()
    {
      var width2 = variableNames.length*40;
      for(let i=0 ;i<steps.length;i++)
      {
        var div =document.createElement("div")
        div.style.display="flex"

        var table =document.createElement("table")
        table.style.marginTop="50px"
        table.style.marginLeft="20px"
        table.width=width2.toString()
        table.border="2"
        var tr=document.createElement("tr")
        table.appendChild(tr)
        for(let n=0;n<variableNames.length;n++)
        {

          var th=document.createElement("th")
          th.innerHTML=variableNames[n]
          tr.appendChild(th)
        }
        for(let j=0 ;j<steps[i].length;j++)
        {
          var tr=document.createElement("tr")
          for(let k=0;k<steps[i][j].length;k++)
          {
            var td= document.createElement("td")
            td.innerHTML=steps[i][j][k].toString()
            tr.appendChild(td)
          }
          table.appendChild(tr)
        }
        div.appendChild(table)
        set2?.appendChild(div)
        indiv?.appendChild(set2)
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

    var validFlag : boolean = true;
    var input = this.systemInput;
    input = input.replace(/ /g,'');
    input = input.replace(/--/g, "+");
    input = input.replace(/\+-/g, "-");
    input = input.replace(/-\+/g, "-");
    input = input.replace(/\+\+/g, "+");
    input = input.toLowerCase();

    console.log("Input = ", input);

    var arrofCoffsNums : number[][] = [];
    var arrofConstNums : number[] = [];
    var arrofCoffsNames : string[] = [];
    var arrofCoffsNames2 : string[] = [];
    var sumofNumber : number = 0;


    var rows : number = 0;
    arrofCoffsNums.push([]);

    var foundNumber : boolean = false;
    var foundEqu : boolean = false;
    var pushedCoff : boolean = false;
    var coffNum : string = "";
    var constNum : string = "";
    var coffsName : string = ""
    var numberEntered : boolean = false;
    var checkletter=false
    var tempCoffNum : number = 0;

    console.log(this.systemInput);

    var arrofMappedValues : Map<string, number>[] = []
    arrofMappedValues.push(new Map<string, number>());

    var check=false;

    for(let i = 0; i < input.length; i++){

      if(Number(input.charAt(i))
      || input.charAt(i) == "0"
      && !(input.charAt(i) == "\n")
      || input.charAt(i) == "."
      || input.charAt(i) == "-"
      || input.charAt(i) == "+"
      || input.charAt(i) == "*"
      || input.charAt(i) == "/"){
        console.log("Inside if");
        if(input.charAt(i) == "+" || input.charAt(i) == "-"){
          if(!checkletter && !foundEqu){
            if(coffNum != "" && Number(coffNum)){
              sumofNumber = sumofNumber + Number(coffNum);
              coffNum = "";
            }
          }

          numberEntered = false;
          foundNumber = false;
          if(coffsName != ""){
            if(arrofMappedValues[rows].get(coffsName)){
              arrofMappedValues[rows].set(coffsName, tempCoffNum + arrofMappedValues[rows].get(coffsName));
            }
            else{
              arrofMappedValues[rows].set(coffsName, 0);
              arrofMappedValues[rows].set(coffsName, tempCoffNum + arrofMappedValues[rows].get(coffsName));

            }
            tempCoffNum = 0;
            console.log(coffsName)
            arrofCoffsNames2.push(coffsName);
            for(let i=0;i<arrofCoffsNames.length;i++)
            {
              if(arrofCoffsNames[i]==coffsName)
              {
                  check=true;
                  break;
              }
              else
              {
                check = false;
              }
            }

            if(check!=true)
            {

              console.log(coffsName);

              if(arrofMappedValues[rows].get(coffsName)){
                arrofMappedValues[rows].set(coffsName, tempCoffNum + arrofMappedValues[rows].get(coffsName));
              }
              else{
                arrofMappedValues[rows].set(coffsName, 0);
                arrofMappedValues[rows].set(coffsName, tempCoffNum + arrofMappedValues[rows].get(coffsName));

              }
              tempCoffNum = 0;
              arrofCoffsNames.push(coffsName);
              arrofCoffsNames2.push(coffsName);
            }

            coffsName = "";
            checkletter=false
            check=false
          }
        }
        if(Number(input.charAt(i)) && checkletter==true && !foundEqu)
        {

          coffsName=coffsName.concat(input.charAt(i));
          console.log(coffsName)
        }
        if(input.charAt(i) != "+" && input.charAt(i) != "-"){
          numberEntered = true;
        }

        if(!foundEqu && checkletter==false){
          console.log(coffNum)
          coffNum = coffNum.concat(input.charAt(i));
        }
        if(foundEqu){
          console.log(input)
          constNum = constNum.concat(input.charAt(i));
          console.log(constNum)

        }
        foundNumber = true;

        if(Number(input.charAt(i)) || input.charAt(i) == "0")
        {
          console.log("shpow")
          var tempEqnNum : number = eval(constNum);
          if(Number(tempEqnNum) || tempEqnNum == 0){
            console.log(constNum)
            arrofConstNums.pop();
            arrofConstNums.push(tempEqnNum);
            arrofConstNums[arrofConstNums.length - 1] = arrofConstNums[arrofConstNums.length - 1] - sumofNumber;
          }
          else{
            validFlag = false;
          }
        }
        else{
          validFlag = false;
        }
        pushedCoff = false;


      }
      else if(   !Number(input.charAt(i))
              && !(input.charAt(i) == "+")
              && !(input.charAt(i) == "-")
              && !(input.charAt(i) == "*")
              && !(input.charAt(i) == "/")
              && !(input.charAt(i) == "=")
              && !(input.charAt(i) == "\n")
              && !(input.charAt(i) == ".")){

        console.log("Inside if 2");

        console.log("Coff Number = ", coffNum);

        console.log(foundNumber)

        if(!numberEntered){
          if(coffNum == ""){
            coffNum = "1";
          }
          else{
            coffNum = coffNum.concat("1");
          }
        }
        var enter=false;

        if(Number(coffNum) && !pushedCoff){
          arrofCoffsNums[rows].push(Number(coffNum));
          tempCoffNum = Number(coffNum);
          pushedCoff = true;
        }
        else{
          validFlag = false;
        }

        checkletter = true;

        coffsName = coffsName.concat(input.charAt(i));
        coffNum = "";
        for(let i=0;i<arrofCoffsNames.length;i++)
        {
            if(arrofCoffsNames[i]==coffsName)
            {
                check=true
                break
            }
            else
            {
              check=false
            }
        }
        numberEntered = false;
        foundNumber = false;

      }
      else if(input.charAt(i) == "="){
        foundEqu = true;
        if(!checkletter){
          if(coffNum != "" && Number(coffNum)){
            sumofNumber = sumofNumber + Number(coffNum);

          }
        }
        if(coffsName != ""  ){

          for(let i=0;i<arrofCoffsNames.length;i++)
          {
            if(arrofCoffsNames[i]==coffsName)
            {
                check=true
                break
            }
            else
            {
              check=false
            }
          }

          if(check!=true)
          {

            console.log(coffsName)
            arrofCoffsNames.push(coffsName);

          }

      }
      if(coffsName != ""){
        if(arrofMappedValues[rows].get(coffsName)){
          arrofMappedValues[rows].set(coffsName, tempCoffNum + arrofMappedValues[rows].get(coffsName));
        }
        else{
          arrofMappedValues[rows].set(coffsName, 0);
          arrofMappedValues[rows].set(coffsName, tempCoffNum + arrofMappedValues[rows].get(coffsName));

        }
        tempCoffNum = 0;
        arrofCoffsNames2.push(coffsName);

      }
      coffsName = "";
      checkletter=false
      check=false

      }
      else if(input.charAt(i) == "\n"){

        sumofNumber = 0;
        rows++;
        arrofCoffsNums.push([]);
        numberEntered = false;
        foundNumber = false;

        for(let k = 0; k < rows; k++){

          arrofCoffsNums[k] = [];
          var ctr = 0;
          for(var name of arrofCoffsNames){
            if(!arrofMappedValues[k].get(name)){
              arrofMappedValues[k].set(name, 0);
            }
            arrofCoffsNums[k][ctr] = arrofMappedValues[k].get(name)
            ctr++;
          }
          ctr = 0;

        }
        arrofMappedValues.push(new Map<string, number>());
        pushedCoff = false;
        enter=true
        arrofConstNums.push(0)
        constNum = ""
        coffNum = ""
        coffsName = ""
        foundEqu = false;
      console.log(arrofCoffsNums.length)
      console.log(arrofCoffsNums[0].length)

    /*
    var del =document.getElementById("0.5")
    del?.parentNode?.removeChild(del)
    var set2 = document.createElement("div")
    set2.id = "0.5"
    set2.style.marginLeft="290px"
    set2.style.marginTop="30px"
    for(let i = 0; i<arrofCoffsNums.length-1; i++)
    {
      var set = document.createElement("div")
      set.style.display="flex"
      for(let j=0;j<arrofCoffsNums[i].length;j++)
      {
        var inputdown = document.createElement("div")
        inputdown.style.height="30px"
        inputdown.style.border="1px solid black"
        inputdown.style.background="transparent"
        inputdown.style.border = "3px solid rgb(206, 56, 76)"
        inputdown.style.borderRadius = "5px"

        var p4 = document.createElement("p")
        var text4 = document.createTextNode(arrofCoffsNums[i][j].toString())
        p4.appendChild(text4)
        p4.style.textAlign="center"
        inputdown.appendChild(p4)
        set.appendChild(inputdown)
        var p = document.createElement("p")
        var text = document.createTextNode(arrofCoffsNames[j])
        p.style.marginLeft="8px"
        p.appendChild(text)
        set.appendChild(p);
        set2.appendChild(set);
        if(j!=arrofCoffsNums[0].length-1)
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

    var text5=document.createTextNode(arrofConstNums[i].toString())
    p5.appendChild(text5)
    p5.style.textAlign="center"
      input2.appendChild(p5)
      set.appendChild(input2)
      set2.appendChild(set)
      document.getElementById("0")?.appendChild(set2)
    }
    */
      }
    }
    while(arrofCoffsNums[arrofCoffsNums.length-1].length ==0 && arrofCoffsNums.length > 0 && arrofCoffsNums[0].length > 1){
      arrofCoffsNums.pop()
      arrofConstNums.pop()
    }
    console.log("Matrix of Coeffs = ", arrofCoffsNums);
    console.log("Vector of Constants = ", arrofConstNums);
    console.log("Vector of Coffs = ", arrofCoffsNames);
    console.log("Vector of Coffs2 = ", arrofCoffsNames2);
    console.log("Mapped Values = ", arrofMappedValues);
    console.log("Entered Values = ", sumofNumber);
    this.coeff_matrix = arrofCoffsNums;
    this.constants_matrix = arrofConstNums;
    this.unknowns_matrix = arrofCoffsNames;
    this.numberofUnkowns = arrofCoffsNames.length;
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

      }

    }
    //this.readInitList();
   // this.readError();
   // this.readNumofIter();


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
      this.currentSolType = solType;
    this.parseSystem();

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
    var text =document.createTextNode("No of itetrations:")
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
    var text2 =document.createTextNode("Error torlance:")
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
    var text =document.createTextNode("intial values :")
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
    var diagonallyDomminant : boolean = true;
    for(let i = 0; i < Math.min(this.coeff_matrix.length,this.coeff_matrix[0].length); i++){
      var sum:number=0
      var diagonal:number=0
      for(let j = 0; j < Math.min(this.coeff_matrix.length,this.coeff_matrix[0].length); j++){
        if(i==j)
          diagonal=this.coeff_matrix[i][j];
        else
          sum =sum+ this.coeff_matrix[i][j];
        }
        if(sum > diagonal){
          diagonallyDomminant = false;
          break;

      }
    }

    this.diagonallyDomminantFlag = diagonallyDomminant;
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
    if(this.currentSolType==this.iterativeSolTypes[0].type || this.currentSolType==this.iterativeSolTypes[1].type){
      this.readInitList();
      this.readNumofIter();
      this.readError();
    }
    this.validateSymmetric()
    this.validateSquare()
    if((this.currentSolType == this.iterativeSolTypes[0].type ||this.currentSolType == this.iterativeSolTypes[1].type)){
      this.validateDiagonallyDominant()

    }
    if((!(this.currentSolType == this.decompostions[2].type && !this.symmFalg)
      && this.squareFlag)){
      console.log(new problem(this.numberofUnkowns, this.coeff_matrix, this.constants_matrix, this.significant_figure,this.numofIterations, this.arrofInitList, this.errorValue,this.currentSolType))
      this.server.postProblem(new problem(this.numberofUnkowns, this.coeff_matrix, this.constants_matrix, this.significant_figure,this.numofIterations, this.arrofInitList, this.errorValue,this.currentSolType)).subscribe((response : number[][][])=>{
        this.solution = response
        this.displaySolution()
        this.arrofInitList = [];

      },(error:any)=>console.log("error in server"));


    }

  }

}


