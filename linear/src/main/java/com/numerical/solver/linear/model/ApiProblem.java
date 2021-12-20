package com.numerical.solver.linear.model;

import java.math.BigDecimal;

public class ApiProblem {
    private int numberofUnknown;
    private BigDecimal[][] coeff_matrix;
    private BigDecimal[] constants_matrix;
    private BigDecimal[] arrofInitList;
    private int precision;
    private String method;
    private int errorValue;
    private int numofIterations;
    public ApiProblem(){}
    public ApiProblem(int numberofUnknown, BigDecimal[][] coeff_matrix, BigDecimal[] constant_matrix,
               int precision,int errorValue,int numofIterations,BigDecimal[] arrofInitList,String method){
        this.numberofUnknown=numberofUnknown;
        this.coeff_matrix=new BigDecimal[numberofUnknown][numberofUnknown];
        this.constants_matrix=new BigDecimal[numberofUnknown];
        for(int i=0;i<coeff_matrix.length;i++){
            for(int j=0;j<coeff_matrix.length;j++){
                this.coeff_matrix[i][j]=coeff_matrix[i][j];
            }
        }
        for(int i=0;i<constant_matrix.length;i++){
            this.constants_matrix[i]=constant_matrix[i];
        }
        for(int i=0;i<arrofInitList.length;i++){
            this.arrofInitList[i] = arrofInitList[i];
        }

        this.precision=precision;
        this.errorValue=errorValue;
        this.numofIterations=numofIterations;
        this.numberofUnknown=numberofUnknown;
        this.method=method;
    }
    public int getNumberofUnknown(){
        return this.numberofUnknown;
    }
    public BigDecimal[][] getCoeff_matrix(){
        return this.coeff_matrix;
    }
    public BigDecimal[] getConstants_matrix(){
        return this.constants_matrix;
    }

    public int getPrecision(){
        return this.precision;
    }
    public String getMethod(){
        return this.method;
    }
    public int getErrorValue(){
        return this.errorValue;
    }
    public int getNumofIterations(){
        return this.numofIterations;
    }
    public BigDecimal[] getArrofInitList(){
        return this.arrofInitList;
    }

    public void setCoeff_matrix(BigDecimal[][] coeff_matrix) {
        this.coeff_matrix = coeff_matrix;
    }

    public void setConstants_matrix(BigDecimal[] constant_matrix) {
        this.constants_matrix = constant_matrix;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public void setNumberofUnknown(int numberofUnknown) {
        this.numberofUnknown = numberofUnknown;
    }

    public void setPrecision(int precision) {
        this.precision = precision;
    }

    public void setArrofInitList(BigDecimal[] arrofInitList) {
        this.arrofInitList = arrofInitList;
    }

    public void setErrorValue(int errorValue) {
        this.errorValue = errorValue;
    }

    public void setNumofIterations(int numofIterations) {
        this.numofIterations = numofIterations;
    }
}
