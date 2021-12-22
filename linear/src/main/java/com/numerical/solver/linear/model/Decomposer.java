package com.numerical.solver.linear.model;

import java.math.BigDecimal;
import java.math.MathContext;
import java.util.ArrayList;

public class Decomposer {
    private Matrix coeff;
    private Matrix constant;
    private Matrix result;
    private long duration;



    public Matrix getCoeff() {
        return coeff;
    }

    public long getDuration() {
        return duration;
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

    public ArrayList<Matrix> cholskeyDecomposition(Matrix matrix,Matrix constant,MathContext mc)
    {
        int rows=matrix.getDimension().getRow();
        Matrix lower= new Matrix(matrix.getDimension());
        ArrayList<Matrix> ret=new ArrayList<Matrix>();

        Solver solver=new Solver(matrix,constant,mc);
        solver.GaussElimination(false,true,false);
        for(int i=1;i<rows;i++)
        {
            if(solver.getCoeff().getCell(new Dimension(i,i)).compareTo(BigDecimal.ZERO)==-1)
                return ret;
        }

        this.duration=System.nanoTime();
        for (int i = 1; i <= rows; i++) {
            for (int j = 1; j <= i; j++) {
                BigDecimal sum = new BigDecimal(0);
                if (j == i) {
                    for (int k = 1; k < j; k++) {
                        sum=sum.add(lower.getCell(new Dimension(j, k)).round(mc)
                                .multiply(lower.getCell(new Dimension(j, k)).round(mc)).round(mc));
                    }
                    lower.setCell(new Dimension(j,j),
                            matrix.getCell(new Dimension(j,j)).round(mc)
                                    .subtract(sum).round(mc).sqrt(mc));
                }
                else {
                    for (int k = 1; k < j; k++)
                        sum=sum.add(lower.getCell(new Dimension(i,k)).round(mc)
                                .multiply(lower.getCell(new Dimension(j,k)).round(mc)).round(mc));

                    lower.setCell(new Dimension(i,j),
                            matrix.getCell(new Dimension(i,j)).round(mc)
                                    .subtract(sum).round(mc)
                                    .divide(lower.getCell(new Dimension(j,j)),mc).round(mc));
                }
            }
        }
        Matrix upper= lower.transpose();
        this.duration=System.nanoTime()-this.duration;
        ret.add(lower);
        ret.add(upper);
        return ret;
    }
    public ArrayList<Matrix> croutDecomposition(Matrix matrix,MathContext mc) {
        int rows=matrix.getDimension().getRow();
        Matrix lower = new Matrix(matrix.getDimension());
        Matrix upper = new Matrix(matrix.getDimension());
        ArrayList<Matrix> ret=new ArrayList<Matrix>();
        Solver solver=new Solver(matrix,constant,mc);
        if(solver.GaussElimination(false,true,false).getData().size()==0){
            return ret;
        }

        this.duration=System.nanoTime();
        for (int i = 1; i <= rows; i++) {
            upper.setCell(new Dimension(i,i),new BigDecimal(1));
        }
        for (int j = 1; j <= rows; j++) {
            for (int i = j; i <=rows; i++) {
                BigDecimal sum = new BigDecimal(0);
                for (int k = 1; k < j; k++)
                    sum=sum.add(lower.getCell(new Dimension(i,k)).round(mc)
                            .multiply(upper.getCell(new Dimension(k,j)).round(mc)).round(mc));

                lower.setCell(new Dimension(i,j),
                        matrix.getCell(new Dimension(i,j)).round(mc)
                                .subtract(sum).round(mc));
            }
            for (int i = j; i <= rows; i++) {
                BigDecimal sum = new BigDecimal(0);
                for(int k = 1; k < j; k++)
                    sum=sum.add(lower.getCell(new Dimension(j,k)).round(mc)
                            .multiply(upper.getCell(new Dimension(k,i)).round(mc)).round(mc));

                if (lower.getCell(new Dimension(j,j)).equals(new BigDecimal(0)))
                    System.out.printf("det(L) close to 0!\n Can't divide by 0...\n");

                upper.setCell(new Dimension(j,i),
                        matrix.getCell(new Dimension(j,i)).round(mc)
                                .subtract(sum).round(mc)
                                .divide(lower.getCell(new Dimension(j,j)),mc).round(mc));
            }
        }
        this.duration=System.nanoTime()-this.duration;
        ret.add(lower);
        ret.add(upper);
        return ret;
    }

    public ArrayList<Matrix> dooLittleDecomposition(Matrix matrix,Matrix constant,MathContext mc){
        int rows=matrix.getDimension().getRow();
        Solver solver=new Solver(matrix,constant,mc);
        ArrayList<Matrix> ret=new ArrayList<Matrix>();
        this.duration=System.nanoTime();
        if(solver.GaussElimination(false,false,false).getData().size()==0)
            return ret;
        Matrix lower = solver.getScale();
        for(int i=1;i<=rows;i++)
            lower.setCell(new Dimension(i,i),new BigDecimal(1));
        Matrix upper = solver.getCoeff();
        this.duration=System.nanoTime()-this.duration;
        ret.add(lower);
        ret.add(upper);
        return ret;
    }
}