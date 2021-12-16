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
  

    matrix : number[][]= [];
    variableNames : string[] = [];

    externalnum:number=2
    coff:any=[]   
    
    solutionTypeList(){
      console.log(this.currentSolType)
      
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
      var set2 = document.createElement("div")
      set2.id = "0.5"
      for(let i = 0; i < num; i++)
      {
        
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
          set.appendChild(input)
          var p = document.createElement("p")
          var text = document.createTextNode(this.coff[j])
          p.style.marginLeft="8px"
          p.appendChild(text)
          set.appendChild(p)
          set2.appendChild(set)
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
          set.appendChild(input2) 
          set2.appendChild(set)
          document.getElementById("0")?.appendChild(set2)
      }
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