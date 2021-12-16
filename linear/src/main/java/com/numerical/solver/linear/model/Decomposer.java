package com.numerical.solver.linear.model;

import java.math.BigDecimal;
import java.math.MathContext;
import java.util.ArrayList;

public class Decomposer {
    private Matrix coeff;
    private Matrix constant;
    private Matrix result;

    public Decomposer(Matrix coeff, Matrix constant) throws IllegalArgumentException{
        if(coeff.getDimension().getRow() != constant.getDimension().getRow()
                || constant.getDimension().getCol() != 1)
            throw new IllegalArgumentException("System's dimensions are not correct");
        this.setCoeff(coeff);
        this.setConstant(constant);
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

    public ArrayList<Matrix> cholskeyDecomposition(Matrix matrix)
    {
        int rows=matrix.getDimension().getRow();
        MathContext mc = new MathContext(10);
        Matrix lower= new Matrix(constant.getDimension());
        for (int i = 1; i <= rows; i++) {
            for (int j = 1; j <= i; j++) {
                BigDecimal sum = new BigDecimal(0);
                if (j == i) {
                    for (int k = 1; k < j; k++)
                        sum.add(lower.getCell(new Dimension(j,k)).multiply(lower.getCell(new Dimension(j,k))));

                    lower.setCell(new Dimension(j,j),
                            matrix.getCell(new Dimension(j,j)).subtract(sum).sqrt(mc));
                }
                else {
                    for (int k = 1; k < j; k++)
                        sum.add(lower.getCell(new Dimension(i,k)).multiply(lower.getCell(new Dimension(j,k))));

                    lower.setCell(new Dimension(i,j),
                            matrix.getCell(new Dimension(i,j)).subtract(sum).divide(lower.getCell(new Dimension(j,j))));
                }
            }
        }
        ArrayList<Matrix> ret=new ArrayList<Matrix>();
        Matrix upper= lower.transpose();
        ret.add(lower);
        ret.add(upper);
        return ret;
    }
    public ArrayList<Matrix> croutDecomposition(Matrix matrix) {
        int rows=matrix.getDimension().getRow();
        Matrix lower = new Matrix(constant.getDimension());
        Matrix upper = new Matrix(constant.getDimension());

        for (int i = 1; i <= rows; i++) {
            upper.setCell(new Dimension(i,i),new BigDecimal(1));
        }

        for (int j = 1; j <= rows; j++) {
            for (int i = j; i <=rows; i++) {
                BigDecimal sum = new BigDecimal(0);
                for (int k = 0; k < j; k++)
                    sum.add(lower.getCell(new Dimension(i,k)).multiply(upper.getCell(new Dimension(k,j))));

                lower.setCell(new Dimension(i,j),matrix.getCell(new Dimension(i,j)).subtract(sum));
            }

            for (int i = j; i <= rows; i++) {
                BigDecimal sum = new BigDecimal(0);
                for(int k = 1; k < j; k++)
                    sum.add(lower.getCell(new Dimension(j,k)).multiply(upper.getCell(new Dimension(k,i))));

                if (lower.getCell(new Dimension(j,j)).equals(new BigDecimal(0)))
                    System.out.printf("det(L) close to 0!\n Can't divide by 0...\n");

                upper.setCell(new Dimension(j,i),
                        matrix.getCell(new Dimension(j,i)).subtract(sum).divide(lower.getCell(new Dimension(j,j))));
            }
        }
        ArrayList<Matrix> ret=new ArrayList<Matrix>();
        ret.add(lower);
        ret.add(upper);
        return ret;
    }
}
