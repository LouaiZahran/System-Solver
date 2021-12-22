package com.numerical.solver.linear.model;

import java.math.BigDecimal;
import java.math.MathContext;
import java.util.ArrayList;

public class Solver {
    private Matrix coeff;
    private Matrix scale;
    private Matrix constant;
    private Matrix result;
    private MathContext mc;
    private ArrayList<ArrayList<ArrayList<BigDecimal>>> steps;
    private double eps = 1e-6;

    public Solver(Matrix coeff, Matrix constant,MathContext mc) throws IllegalArgumentException{
        if(coeff.getDimension().getRow() != constant.getDimension().getRow()
                || constant.getDimension().getCol() != 1)
            throw new IllegalArgumentException("System's dimensions are not correct");
        this.setCoeff(coeff);
        this.setConstant(constant);
        this.setMc(mc);
        this.setScale(new Matrix(coeff.getDimension()));
        steps=new ArrayList<ArrayList<ArrayList<BigDecimal>>>();
    }

    public ArrayList<ArrayList<ArrayList<BigDecimal>>> getSteps() {
        return steps;
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

    public Matrix getScale(){
        return scale;
    }

    public void setScale(Matrix scale){
        this.scale=scale;
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
                    numerator = numerator.subtract(aij.multiply(Xi,mc),mc);
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
        return solveIterative(initialGuess, iterations, tolerance,false);
    }

    public Matrix GaussSeidel(Matrix initialGuess, int iterations, double tolerance){
        return solveIterative(initialGuess, iterations, tolerance, true);
    }

    private double getError(Matrix previous, Matrix current){
        int rows = previous.getDimension().getRow();
        double error = 0.0;

        for(int i=1; i<=rows; i++) {
            Dimension curPosition = new Dimension(i, 1);
            BigDecimal numerator = current.getCell(curPosition).subtract(previous.getCell(curPosition),mc).abs();
            BigDecimal denominator = current.getCell(curPosition).abs();
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
                if(Math.abs(coeff.getCell(curPosition).doubleValue()) > eps)
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
                BigDecimal newBi = bi.subtract(aij.multiply(xj,mc),mc);
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
                if(Math.abs(coeff.getCell(curPosition).doubleValue()) > eps)
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
                BigDecimal newBi = bi.subtract(aij.multiply(xj,mc),mc);
                ret.setCell(curVariablePosition, newBi);
            }
            ret.setCell(curVariablePosition, ret.getCell(curVariablePosition).divide(coeff.getCell(new Dimension(i, i)), mc));
        }

        return ret;
    }

    //Under Progress
    public void applyPivoting(Dimension pivotPosition){
        Dimension dim = coeff.getDimension();
        int rows = dim.getRow();
        int cols = dim.getCol();
        BigDecimal curMax = BigDecimal.ZERO;

        int start = pivotPosition.getRow();
        int col = pivotPosition.getCol();
        int maxIdx = start;
        for(int i = start; i<=rows; i++){
            BigDecimal curCell = coeff.getCell(new Dimension(i, col)).abs();
            if(curMax.compareTo(curCell) == -1) { //Current Maximum is smaller than current cell
                curMax = curCell;
                maxIdx = i;
            }
        }

        ArrayList<BigDecimal> maxRow = coeff.getData().get(maxIdx - 1);
        coeff.getData().add(maxIdx - 1, coeff.getData().get(start - 1));
        coeff.getData().remove(maxIdx);
        coeff.getData().add(start - 1, maxRow);
        coeff.getData().remove(start);

        ArrayList<BigDecimal> maxConstant = constant.getData().get(maxIdx - 1);
        constant.getData().add(maxIdx - 1, constant.getData().get(start - 1));
        constant.getData().remove(maxIdx);
        constant.getData().add(start - 1, maxConstant);
        constant.getData().remove(start);
    }

    //Under Progress
    public Matrix GaussElimination(boolean Jordan, boolean shouldPivot,boolean shouldSolve){
        Dimension dim = coeff.getDimension();
        Matrix scaleMatrix = new Matrix(dim);

        int rows = dim.getRow();
        int cols = dim.getCol();

        for(int i=1; i<=rows; i++){
            Dimension pivotPosition = new Dimension(i, i);
            if(shouldPivot)
                applyPivoting(pivotPosition);
            BigDecimal pivot = coeff.getCell(pivotPosition);
            if(pivot.compareTo(BigDecimal.ZERO) == 0){
                return new Matrix(); //Not a unique solution
            }

            Dimension curConstantPosition = new Dimension(i, 1);
            BigDecimal curConstant = constant.getCell(curConstantPosition);

            for(int j = Jordan?1:i+1; j<=rows; j++){
                if(j == i)
                    continue;

                Dimension curPosition = new Dimension(j, i);
                BigDecimal curCell = coeff.getCell(curPosition);
                BigDecimal scale = curCell.divide(pivot, mc);
                scaleMatrix.setCell(curPosition,scale);


                for(int k=i; k<=cols; k++){
                    Dimension pivotRowCellPosition = new Dimension(i, k);
                    BigDecimal pivotRowCell = coeff.getCell(pivotRowCellPosition);
                    Dimension otherRowCellPosition = new Dimension(j, k);
                    BigDecimal otherRowCell = coeff.getCell(otherRowCellPosition);
                    coeff.setCell(otherRowCellPosition, otherRowCell.subtract(pivotRowCell.multiply(scale,mc),mc));
                }

                Dimension otherConstantPosition = new Dimension(j, 1);
                BigDecimal otherConstant = constant.getCell(otherConstantPosition);
                constant.setCell(otherConstantPosition, otherConstant.subtract(curConstant.multiply(scale,mc),mc));
            }
            steps.add(this.coeff.getData());
            steps.add(this.constant.getData());
        }

        coeff.print();
        System.out.println("");

        if(Jordan && shouldSolve){
            for(int i=1; i<=rows; i++){
                Dimension curConstantPosition = new Dimension(i, 1);
                BigDecimal curConstant = constant.getCell(curConstantPosition);
                Dimension curPivotPosition = new Dimension(i, i);
                BigDecimal curPivot = coeff.getCell(curPivotPosition);
                constant.setCell(curConstantPosition, curConstant.divide(curPivot, mc));
                steps.add(this.coeff.getData());
                steps.add(this.constant.getData());
            }
            return constant;
        }
        setScale(scaleMatrix);
        if(shouldSolve)
            return backwardSub();
        return coeff;
    }
}