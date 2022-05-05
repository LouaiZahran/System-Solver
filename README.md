# System-Solver
## Table of Contents
- [Setup](#Setup)
- [Description](#Description)
- [Design Decisions](#Design-Decisions)
- [PseudoCode for the Main Algorithms](#PseudoCode-for-the-Main-Algorithms)
## Setup
- First of all: you must install the `Front-End` folder which contains angular project, using npm install just because node modules may be missing. 
- Secondly: Spring Boot folder is straight forward just open the pom file using any IDE.
- Thirdly: you run the Angular project and on localhost:4200 and the Spring Boot project on localhost:8080.
## Description
### The project was divided into two parts:
1. the first part's objective is to solve systems of linear equations using various direct 
and iterative methods, namely:
> - Gauss Elimination.
> - Gauss Jordan.
> - LU Decomposition (using Crout’s, Doolittle, and Cholesky Decompositions).
> - Gauss Seidil.
> - Jacobi Iteration.
2. the second part's objective is to extend the project’s functionality to include the 
capability of finding the roots of linear and non-linear functions using:
> - Bisection.
> - False-Position.
> - Fixed point.
> - Newton-Raphson.
> - Secant Method.

## Design Decisions
### Part One:
+ This part was chosen to be written as a web application using a MVC 
architecture so that it can be used on any platform. The backend is written in Java 
using Spring framework, and the frontend is written in TypeScript using Angular
### Part Two:
+ This part does not use the same architecture as the previous phase, instead, all 
of the computations are done in client-side to make use of the `MathJs` library as 
it is used in finding the derivative of the inputted functions.

## PseudoCode for the Main Algorithms
### Part One:
```java
solveIterative(guess, maxIterations, tolerance, applyGaussSeidel):
if(maxIterations == 0):
return guess
newGuess = iterate(guess, applyGaussSeidel)
if(getError(newGuess) < tolerance):
return newGuess
return solveIterative(newGuess, maxIterations – 1, tolerance, 
applyGaussSeidel)
```
```java
GaussElimination(Jordan, shouldPivot, shouldSolve):
for i: 1 -> rows:
if(shouldPivot):
applyPivoting(i)
if(pivot == 0):
return noUniqueSolution();
if(Jordan):
j = 1
else:
j = i+1
for j: j -> rows:
performRowOperation(i, j);
if(shouldSolve)
return backSub(System)
return coeff //After row operations
```
```java
dooLittleDecomposition(coeff, constant):
Solver solver = new Solver(coeff, constant)
solver.GaussElimination(Jordan = false, shouldPivot = false, shouldSolve = 
false)
lower = solver.getScale() //Scale[i][j] is the multiplier used in 
rowOperation(i,j)
for i: 1 -> rows:
lower[i][i] = 1
upper = solver.getCoeff()
return {lower, upper}
```
```java
choleskyDecomposition(coeff, constant):
Solver solver = new Solver(coeff, constant)
solver.GaussElimination(Jordan = false, shouldPivot = false, shouldSolve = 
false)
for i: 1 -> rows:
for j: 1 -> i:
sum = 0
for k: 1 -> j-1:
sum+= lower[i][k]*lower[j][k]
lower[i][j] = coeff[i][j] – sum 
if(i == j):
lower[i][j] = sqrt(lower[i][j])
else:
lower[i][j] /= lower[j][j]
upper = lower.transpose()
return {lower, upper}
```
```java
croutDecomposition(coeff, constant):
Solver solver = new Solver(coeff, constant)
solver.GaussElimination(Jordan = false, shouldPivot = false, shouldSolve = 
false)
for i: 1 -> rows:
upper[i][i] = 1
for j: 1 -> rows:
 for i: j -> rows
 sum = 0
 for k: 1 -> j-1:
 sum += lower[i][k]*upper[k][j]
 lower[i][j] = coeff[i][j] – sum
 for i: j -> rows:
 sum = 0
 for k: 1 -> j-1:
 sum += lower[j][k] * upper[k][i];
 upper[j][i] == (coeff[j][i] – sum)/lower[j][j];
return {lower, upper};
```
### Part Two:
```java
applyBisection():
while(abs(xu – xl) > eps && iteration_counter < maxIterations):
xr = precise((xl + xu)/2), fr = substitute(xr), fl = substitute(xl)
if(fl * fr > 0):
xl = xr
else:
xu = xr
steps.push(iteration_counter, xl, xu, fr, abs(xu – xl))
if(fr == 0):
break;
iteration_counter++
return xr
```
```java
applyFalsePosition():
while(abs(xu – xl) > eps && iteration_counter < maxIterations):
fu = substitute(xu), fl = substitute(xl)
 xr = precise(xu – fu*(xu-xl)/(fu-fl)), fr = substitute(xr)
if(fl * fr > 0):
xl = xr
else:
xu = xr
steps.push(iteration_counter, xl, xu, fr, abs(xu – xl))
if(fr == 0):
break;
iteration_counter++
return xr
applyFixedPoint():
setGX()
do:
xi = xi1
xi1 = substituteGX(xi)
steps.push(iteration_counter+1, xi, substitute(xi), abs(xi – xi1)}
iteration_counter++
while(abs(xi – xi1)>eps && iteration_counter < maxIterations)
return xi1
```
```java
applyNewtonRaphson():
derivativeNode = MathJs.derivative(getExpression(), ‘x’)
do:
xi = xi1
fxi = substitute(xi)
 dfxi = precise(derivativeNode.evaluate(xi))
xi1 = precise(xi – fxi/dfxi)
steps.push(iteration_counter+1, xi, fxi, abs(xi – xi1)}
iteration_counter++
while(abs(xi – xi1)>eps && iteration_counter < maxIterations)
return xi1
```
```java
applySecant():
while(abs(xCurr – xPrev)>eps && iteration_counter < maxIterations):
fprev = substitute(xPrev), fcurr = substitute(xCurr)
xTemp = precise(xCurr – fcurr*(xCurr-xPrev)/(fcurr-fprev))
steps.push(iteration_counter+1, xTemp, xPrev, xCurr, 
substitute(xTemp), abs(xCurr – xPrev))
iteration_counter++
return xCurr
```
