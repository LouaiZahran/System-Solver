package com.numerical.solver.linear.model;

public class Dimension {
    private int row;
    private int col;

    public Dimension(){
        this.row = 0;
        this.col = 0;
    }
    public Dimension(int row, int col) {
        setRow(row);
        setCol(col);
    }

    public int getRow() {
        return row;
    }

    public void setRow(int row) throws IllegalArgumentException {
        if(row <= 0)
            throw new IllegalArgumentException("Number of rows must be positive");
        this.row = row;
    }

    public int getCol() {
        return col;
    }

    public void setCol(int col) {
        if(col <= 0)
            throw new IllegalArgumentException("Number of columns must be positive");
        this.col = col;
    }

    @Override
    public boolean equals(Object other){
        Dimension otherDimension = (Dimension)other;
        return this.row == otherDimension.getRow() && this.col == otherDimension.getCol();
    }

    public void print(){
        System.out.println("(" + String.valueOf(row) + ", " + String.valueOf(col)+ ")");
    }
}
