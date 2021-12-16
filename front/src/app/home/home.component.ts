import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface solverType {
  type : string;
  value : number;
}
export interface decompostion {
  type : string;
  value : number;
}
@Component({
    selector: 'solve',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
  })
  export class homecomponent {
    createdIter : boolean = false;
    validFlagInput : boolean = false;
    symmFalg : boolean = false;

    DirectSolTypes : solverType[] = [
      {type : "Gauss Elmination", value : 1},
      {type : "Gauss-Jordan", value : 2},
    ]
    
    iterativeSolTypes : solverType[] = [
      {type : "Gauss-Seidil", value : 1},
      {type : "Jacobi-Iteration", value : 2}
    ]


    decompostions : decompostion[] = [
      {type : "Do Little Decompostion", value : 1},
      {type : "Crout Decompostion", value : 2},
      {type : "Cholesky Decompostion", value : 3}
    ]

   currentSolType : string = this.DirectSolTypes[0].type;
  

    matrixInput : HTMLInputElement[][]= [];
    
    variableNames : string[] = [];

    externalnum:number=2
    coff:any=[]   
    
    solutionTypeList(){
      var divOptn = document.createElement("div");
      var input = document.createElement("input");
      var input2 = document.createElement("input");
      input.value = "3";
      input.style.width="60px"
      input.style.height="40px"
      input.style.marginTop="4px"
      input.style.marginLeft="5px"
      input.style.border="1px solid black"
      input.style.borderRadius = "10px"
      input.type = "number";
      input.min = "1";
      input.step = "1";
      input.className = "matrixIn";
      input.placeholder="3";
      input.id = "iter"
      input2.style.width="60px"
      input2.style.height="40px"
      input2.style.marginTop="4px"
      input2.style.marginLeft="5px"
      input2.style.border="1px solid black"
      input2.style.borderRadius = "10px"
      input2.type = "number";
      input2.min = "1";
      input2.step = "1";
      input2.className = "matrixIn";
      input2.placeholder="3";
      input2.id = "iter2"
      var list = document.createElement("ul");
      list.id = "iterList";
      if((this.currentSolType == this.iterativeSolTypes[0].type) || (this.currentSolType == this.iterativeSolTypes[1].type)){
        if(!this.createdIter){
          document.getElementById("main")?.appendChild(input);
          document.getElementById("main")?.appendChild(input2);
          var li = document.createElement("li");


          for(let i = 0; i < this.externalnum; i++){
            var input3 = document.createElement("input");
            input3.style.width="60px"
            input3.style.height="40px"
            input3.style.marginTop="4px"
            input3.style.marginLeft="5px"
            input3.style.border="1px solid black"
            input3.style.borderRadius = "10px"
            input3.type = "number";
            input3.className = "matrixIn";
            input3.placeholder = this.coff[i];
            li.appendChild(input3);
          }
          list.appendChild(li);
          document.getElementById("main")?.appendChild(list);
          this.createdIter = true;
          
        }
      }
      else{
      
        this.createdIter = false;
        document.getElementById("iter")?.remove();
        document.getElementById("iter2")?.remove();
        document.getElementById("iterList")?.remove();
      }
      
    }
    validateInput(){
      for(let i = 0; i < this.matrixInput.length; i++){
        for(let j = 0; j < this.matrixInput[i].length; j++){
          var input = <HTMLInputElement>this.matrixInput[i][j];
          var value = input.value;
          console.log(value)
          if(value == ""){
            input.style.borderColor = "red"
            this.validFlagInput = false; 
          }
          else{
            input.style.borderColor = "black"
            this.validFlagInput = true;
          }
        
        }
      }
      if(this.createdIter){
        var iter = <HTMLInputElement>document.getElementById("iter")
        var valueIter = iter?.value;
        if(valueIter == ""){
          this.validFlagInput = false;
          iter.style.borderColor = "red";
        }
        else{
          this.validFlagInput = true;
          iter.style.borderColor = "black";
        }
        var iter2 = <HTMLInputElement>document.getElementById("iter2")!
        var valueIter2 = iter2?.value;
        if(valueIter2 == ""){
          this.validFlagInput = false;
          iter2.style.borderColor = "red";
        }
        else{
          this.validFlagInput = true;
          iter2.style.borderColor = "black";
        }
      }
     
    }

    validateSymmetric(){
      var symm : boolean = true;
      for(let i = 0; i < this.externalnum; i++){
        for(let j = 0; j < this.externalnum; j++){
          var input = <HTMLInputElement>this.matrixInput[i][j];
          var input2 = <HTMLInputElement>this.matrixInput[j][i];
          var value = input.value;
          var value2 = input2.value;
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
    delete(num:number)
    {

      var del =document.getElementById("0.5")
      del?.parentNode?.removeChild(del)
      this.externalnum=num
      this.set(num)
      if(this.flag==1)
      {
        this.delete2();
      }
     
      this.create();
    }
    generate(y:number)
    {

      var x = 1;
      for(let i = 0; i < y; i++)
      {
        var z = "X" + x
        this.coff[i] = z.toString()
        console.log(this.coff[i])
        x = x + 1
      }
    }
    delete2()
    {
      console.log(document.getElementById("1")?.nodeValue)
      var del = document.getElementById("2")
      del?.parentNode?.removeChild(del)
      this.flag=0
      
    }
        
    set(num:number)
    {
      document.getElementById("iter")?.remove();
      document.getElementById("iter2")?.remove();
      document.getElementById("iterList")?.remove();
      this.currentSolType = this.DirectSolTypes[0].type;
      this.createdIter = false;
      
      this.matrixInput = [];
      var set2 = document.createElement("div")
      set2.id = "0.5"
      for(let i = 0; i < num; i++)
      {
        this.matrixInput.push([]);
        var set = document.createElement("div")
        set.style.display="flex"
      
        for(let j=0;j<num;j++)
        { 
          var input = document.createElement("input") 
          input.style.width="60px"
          input.style.height="40px"
          input.style.marginTop="4px"
          input.style.marginLeft="5px"
          input.style.border="1px solid black"
          input.style.borderRadius = "10px"
          input.type = "number";
          input.className = "matrixIn";
          input.placeholder="0"
          input.id = i.toString().concat(j.toString());
          this.matrixInput[i].push(input);
          set.appendChild(input)
          var p = document.createElement("p")
          var text = document.createTextNode(this.coff[j])
          p.style.marginLeft="8px"
          p.appendChild(text)
          set.appendChild(p);
          set2.appendChild(set);
          if(j!=num-1)
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
          var text3=document.createTextNode("=")
          p3.style.marginLeft="8px"
          p3.appendChild(text3)
          set.appendChild(p3)
          var input2 =document.createElement("input") 
          input2.style.width="60px"
          input2.style.height="40px"
          input2.style.marginTop="4px"
          input2.style.marginLeft="5px"
          input2.style.border="1px solid black"
          input2.style.borderRadius = "10px"
          input2.type = "number";
          input2.className = "matrixIn";
          input2.placeholder="0"
          this.matrixInput[i].push(input2);
          set.appendChild(input2) 
          set2.appendChild(set)
          document.getElementById("0")?.appendChild(set2)
      }
      console.log(this.matrixInput)
    }
    flag:number=0
    $event:any
    create()
    {
      if(this.flag==1)
      {
        this.delete2()
        return
      }
      var set= document.createElement("div")
      set.id="2"
      set.style.display="flex"
      var x=1
      var p4=document.createElement("p")
      var text4=document.createTextNode("{")
      p4.appendChild(text4)
      set.appendChild(p4)
      for(let i=0 ;i<this.externalnum;i++)
      {
        var p=document.createElement("p")
        var text=document.createTextNode(  x +" :")
        p.style.marginLeft="5px"
        p.style.marginTop="2px"
        p.appendChild(text)
        set.appendChild(p)
        document.getElementById("1000")?.appendChild(set)
        var input =document.createElement("input") 
          input.style.width="30px"
          input.style.height="20px"
          input.style.marginLeft="5px"
          input.style.marginTop="5px"
          input.style.border="1px solid black"
          input.placeholder="x"+x 
          input.id=x.toString()    
          input.id=x.toString()
          set.appendChild(input)
          if(i!=this.externalnum-1)
          {
            var p2=document.createElement("p")
            var text2=document.createTextNode(";")
            p2.style.marginLeft="5px"
            p2.appendChild(text2)
            set.appendChild(p2)
          }
          x=x+1
      }
      var p3=document.createElement("p")
      var text3=document.createTextNode("}")
      p3.style.marginLeft="5px"
      p3.appendChild(text3)
      set.appendChild(p3)
      this.flag=1
    }
    
    
     
  }