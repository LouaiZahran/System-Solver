package com.numerical.solver.linear.model;

import java.math.BigDecimal;

public class ApiProblem {
    private int numberofUnknown;
    private BigDecimal[][] coeff_matrix;
    private BigDecimal[] constants_matrix;
    private int precision;
    private String method;
    public ApiProblem(){}
    public ApiProblem(int numberofUnknown, BigDecimal[][] coeff_matrix, BigDecimal[] constant_matrix,
                      int precision, String method){
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
        this.precision=precision;
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
}