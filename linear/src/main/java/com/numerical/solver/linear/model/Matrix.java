package com.numerical.solver.linear.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.EmptyStackException;

public class Matrix {
    private ArrayList<ArrayList<BigDecimal>> data;

    public Matrix(){
        this.data = new ArrayList<>();
    }

    public Matrix(Dimension dimension){
        int rows = dimension.getRow();
        int cols = dimension.getCol();
        ArrayList<ArrayList<BigDecimal>> dummyData = new ArrayList<>();
        for(int i = 1; i <= rows; i++){
            ArrayList<BigDecimal> dummyRow = new ArrayList<>();
            for(int j = 1; j <= cols; j++)
                dummyRow.add(new BigDecimal(0));
            dummyData.add(dummyRow);
        }
        this.setData(dummyData);
    }

    public Matrix(ArrayList<ArrayList<BigDecimal>> data) throws IllegalArgumentException{
        this.setData(data);
    }

    public Matrix(Matrix other){
        ArrayList<ArrayList<BigDecimal>> otherData = other.getData();
        ArrayList<ArrayList<BigDecimal>> thisData = new ArrayList<>();
        for(ArrayList<BigDecimal> row: otherData)
            thisData.add((ArrayList<BigDecimal>) row.clone());
        this.setData(thisData);
    }

    public ArrayList<ArrayList<BigDecimal>> getData() {
        return data;
    }

    public void setData(ArrayList<ArrayList<BigDecimal>> data) throws IllegalArgumentException{
        if(data.size()==0)
            return;
        if(data == null)
            throw new IllegalArgumentException("Empty Matrix");
        int numOfCol = data.get(0).size();
        for(ArrayList<BigDecimal> row: data)
            if(row.size() != numOfCol)
                throw new IllegalArgumentException("Some rows are longer than others");
        this.data = data;
    }

    public void insertRow(ArrayList<BigDecimal> newRow) throws IllegalArgumentException{
        if(data.size() != 0 && newRow.size() != data.get(0).size())
            throw new IllegalArgumentException("The row's dimension is different than that's of the matrix");
        data.add((ArrayList<BigDecimal>) newRow.clone());
    }

    public void deleteRow() throws EmptyStackException {
        if(data.size() == 0)
            throw new EmptyStackException();
        data.remove(data.size() - 1);
    }

    public void insertColumn(ArrayList<BigDecimal> newColumn) throws IllegalArgumentException{
        if(data.size() != 0 && newColumn.size() != data.size())
            throw new IllegalArgumentException("The column's dimension is different than that's of the matrix");
        if(data.size() == 0){
            for(int i=0; i<newColumn.size(); i++)
                data.add(new ArrayList<>());
        }
        for(int i=0; i<data.size(); i++)
            data.get(i).add(newColumn.get(i));
    }

    public void deleteColumn() throws EmptyStackException {
        if(data.size() == 0 || data.get(0).size() == 0)
            throw new EmptyStackException();
        for(int i=0; i<data.size(); i++) {
            ArrayList<BigDecimal> row = data.get(i);
            row.remove(row.size() - 1);
        }
    }

    public void setCell(Dimension position, BigDecimal newValue) throws IllegalArgumentException{
        Dimension dim = getDimension();
        if(position.getRow() <= 0 || position.getCol() <= 0 ||
                position.getRow() > dim.getRow() || position.getCol() > dim.getCol()) //1-indexed
            throw new IllegalArgumentException("Cell out of bounds");
        data.get(position.getRow() - 1).set(position.getCol() - 1, newValue);
    }

    public BigDecimal getCell(Dimension position) throws IllegalArgumentException{
        Dimension dim = getDimension();
        if(position.getRow() <= 0 || position.getCol() <= 0 ||
                position.getRow() > dim.getRow() || position.getCol() > dim.getCol()) //1-indexed
            throw new IllegalArgumentException("Cell out of bounds");
        return data.get(position.getRow() - 1).get(position.getCol() - 1);
    }

    public Matrix add(Matrix other) throws IllegalArgumentException{
        Dimension dim = getDimension();
        if(!dim.equals(other.getDimension()))
            throw new IllegalArgumentException("Dimensions don't match");

        Matrix ret = new Matrix(this);
        int rows = dim.getRow();
        int cols = dim.getCol();
        for(int i=0; i<rows; i++){
            for(int j=0; j<cols; j++){
                Dimension curPosition = new Dimension(i+1, j+1); //1-indexed
                ret.setCell(curPosition, this.getCell(curPosition).add(other.getCell(curPosition)));
            }
        }

        return ret;
    }

    public Matrix subtract(Matrix other){
        return this.add(other.multiply(new BigDecimal(-1)));
    }

    public Matrix multiply(BigDecimal scalar){
        Matrix ret = new Matrix(this);
        Dimension dim = getDimension();
        int rows = dim.getRow();
        int cols = dim.getCol();
        for(int i=0; i<rows; i++) {
            for (int j = 0; j < cols; j++) {
                Dimension curPosition = new Dimension(i + 1, j + 1); //1-indexed
                ret.setCell(curPosition, this.getCell(curPosition).multiply(scalar));
            }
        }
        return ret;
    }

    public Matrix multiply(Matrix other) throws IllegalArgumentException{
        Dimension dim = getDimension();
        if(dim.getCol() != other.getDimension().getRow())
            throw new IllegalArgumentException("Dimensions don't match");

        int rows = dim.getRow();
        int cols = other.getDimension().getCol();
        Matrix ret = new Matrix(new Dimension(rows, cols));

        for(int k=1; k <= dim.getCol(); k++) {
            for (int i = 1; i <= rows; i++) {
                for (int j = 1; j <= cols; j++) {
                    Dimension curPosition = new Dimension(i, j);
                    BigDecimal curValue = ret.getCell(curPosition);
                    BigDecimal aik = this.getCell(new Dimension(i, k));
                    BigDecimal bkj = other.getCell(new Dimension(k, j));
                    ret.setCell(curPosition, curValue.add(aik.multiply(bkj)));
                }
            }
        }

        return ret;
    }

    public Matrix transpose() {
        Dimension dim = this.getDimension();

        int rows = dim.getRow();
        int cols = this.getDimension().getCol();
        Matrix ret = new Matrix(new Dimension(rows, cols));

        for (int i = 1; i <= rows; i++) {
            for (int j = 1; j <= cols; j++) {
                ret.setCell(new Dimension(i,j),this.getCell(new Dimension(j,i)));
            }
        }
        return ret;
    }


    public Dimension getDimension(){
        Dimension dim = new Dimension();
        dim.setRow(data.size());
        if(data.size() >= 1)
            dim.setCol(data.get(0).size());
        return dim;
    }

    public void print(){
        for(ArrayList<BigDecimal> row: data)
            System.out.println(row);
    }
}