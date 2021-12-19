package com.numerical.solver.linear.model;

import java.math.BigDecimal;
import java.math.MathContext;
import java.util.ArrayList;

public class Solver {
    private Matrix coeff;
    private Matrix constant;
    private Matrix result;
    private MathContext mc;

    public Solver(Matrix coeff, Matrix constant,MathContext mc) throws IllegalArgumentException{
        if(coeff.getDimension().getRow() != constant.getDimension().getRow()
                || constant.getDimension().getCol() != 1)
            throw new IllegalArgumentException("System's dimensions are not correct");
        this.setCoeff(coeff);
        this.setConstant(constant);
        this.setMc(mc);
    }
    public MathContext getMc(){return mc;}

    public void setMc(MathContext mc){
        this.mc=mc;
    }
    public Matrix getCoeff() {
        return coeff;
    }

    public void setCoeff(Matrix coeff) {
        this.coeff = new Matrix(coeff);
    }

    public Matrix getConstant() {
        return constant;
    }

    public void setConstant(Matrix constant) {
        this.constant = new Matrix(constant);
    }

    public Matrix getResult() {
        return result;
    }

    public void setResult(Matrix result) {
        this.result = result;
    }

    public Matrix iterate(Matrix guess, boolean immediateUpdate){
        Matrix ret = new Matrix(constant.getDimension());
        Matrix guessCopy = new Matrix(guess);
        int rows = coeff.getDimension().getRow();
        int cols = coeff.getDimension().getCol();

        BigDecimal numerator = new BigDecimal(0);
        BigDecimal denominator = new BigDecimal(1);

        for(int i=1; i<=rows; i++){
            Dimension curVariablePosition = new Dimension(i, 1);
            BigDecimal Bi = constant.getCell(curVariablePosition);
            numerator = Bi;

            for(int j=1; j<=cols; j++){
                Dimension curPosition = new Dimension(i, j);
                BigDecimal aij = coeff.getCell(curPosition);
                if(i == j)
                    denominator = aij;
                else{
                    BigDecimal Xi = guessCopy.getCell(new Dimension(j, 1));
                    numerator = numerator.subtract(aij.multiply(Xi));
                }
            }

            BigDecimal newXi = numerator.divide(denominator, mc);
            ret.setCell(curVariablePosition, newXi);
            if(immediateUpdate)
                guessCopy.setCell(curVariablePosition, newXi);
        }

        return ret;
    }

    public Matrix Jacobi(Matrix initialGuess, int iterations, double tolerance){
        return solveIterative(initialGuess, iterations, tolerance, false);
    }

    public Matrix GaussSeidel(Matrix initialGuess, int iterations, double tolerance){
        return solveIterative(initialGuess, iterations, tolerance, true);
    }

    private double getError(Matrix previous, Matrix current){
        int rows = previous.getDimension().getRow();
        double error = 0.0;

        for(int i=1; i<=rows; i++) {
            Dimension curPosition = new Dimension(i, 1);
            BigDecimal numerator = current.getCell(curPosition).subtract(previous.getCell(curPosition));
            BigDecimal denominator = current.getCell(curPosition);
            if(denominator.doubleValue() == 0)
                return Double.POSITIVE_INFINITY;
            error = Math.max(error, numerator.divide(denominator, mc).doubleValue());
        }

        return error;
    }

    public Matrix solveIterative(Matrix guess, int iterations, double tolerance, boolean gaussSeidel) throws IllegalArgumentException{
        if(iterations < 0 || tolerance < 0)
            throw new IllegalArgumentException("Wrong parameters");
        if(iterations == 0)
            return guess;
        Matrix curResult = iterate(guess, gaussSeidel);
        curResult.print();
        System.out.println("");
        if(getError(guess, curResult) <= tolerance)
            return curResult;
        return solveIterative(curResult, iterations - 1, tolerance, gaussSeidel);
    }

    public Matrix forwardSub() throws IllegalArgumentException{
        Dimension dim = coeff.getDimension();
        int rows = dim.getRow();
        int cols = dim.getCol();
        for(int i=1; i<=rows; i++){
            for(int j=i+1; j<=cols; j++){
                Dimension curPosition = new Dimension(i, j);
                if(coeff.getCell(curPosition).doubleValue() != 0)
                    throw new IllegalArgumentException("Matrix is not lower triangular");
            }
        }

        Matrix ret = new Matrix(constant);
        for(int i=1; i<=rows; i++){
            Dimension curVariablePosition = new Dimension(i, 1);
            for(int j=1; j<i; j++){
                Dimension curPosition = new Dimension(i, j);
                Dimension otherVariablesPosition = new Dimension(j, 1);
                BigDecimal aij = coeff.getCell(curPosition);
                BigDecimal bi = ret.getCell(curVariablePosition);
                BigDecimal xj = ret.getCell(otherVariablesPosition);
                BigDecimal newBi = bi.subtract(aij.multiply(xj));
                ret.setCell(curVariablePosition, newBi);
            }
            ret.setCell(curVariablePosition, ret.getCell(curVariablePosition).divide(coeff.getCell(new Dimension(i, i)), mc));
        }

        return ret;
    }

    public Matrix backwardSub() throws IllegalArgumentException {
        Dimension dim = coeff.getDimension();
        int rows = dim.getRow();
        int cols = dim.getCol();
        for (int i = 1; i <= rows; i++) {
            for (int j = 1; j < i; j++) {
                Dimension curPosition = new Dimension(i, j);
                if (coeff.getCell(curPosition).doubleValue() != 0)
                    throw new IllegalArgumentException("Matrix is not upper triangular");
            }
        }

        Matrix ret = new Matrix(constant);
        for (int i = rows; i >= 1; i--) {
            Dimension curVariablePosition = new Dimension(i, 1);
            for (int j = i+1; j <= cols; j++) {
                Dimension curPosition = new Dimension(i, j);
                Dimension otherVariablesPosition = new Dimension(j, 1);
                BigDecimal aij = coeff.getCell(curPosition);
                BigDecimal bi = ret.getCell(curVariablePosition);
                BigDecimal xj = ret.getCell(otherVariablesPosition);
                BigDecimal newBi = bi.subtract(aij.multiply(xj));
                ret.setCell(curVariablePosition, newBi);
            }
            ret.setCell(curVariablePosition, ret.getCell(curVariablePosition).divide(coeff.getCell(new Dimension(i, i)), mc));
        }

        return ret;
    }

    //Under Progress
    public Matrix applyPivoting(Matrix matrix, Dimension pivotPosition){
        Dimension dim = matrix.getDimension();
        int rows = dim.getRow();
        int cols = dim.getCol();
        BigDecimal curMax = matrix.getCell(pivotPosition);


        return new Matrix();
    }

    //Under Progress
    public Matrix GaussElimination(boolean Jordan){
        Dimension dim = coeff.getDimension();
        int rows = dim.getRow();
        int cols = dim.getCol();

        Matrix cur = new Matrix(coeff);
        for(int i=1; i<=rows; i++){
            cur = applyPivoting(cur, new Dimension(i, i));

        }

        return new Matrix();
    }
}
