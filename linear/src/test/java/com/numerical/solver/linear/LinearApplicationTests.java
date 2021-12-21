package com.numerical.solver.linear;

import com.numerical.solver.linear.model.Dimension;
import com.numerical.solver.linear.model.Matrix;
import com.numerical.solver.linear.model.Solver;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.util.ArrayList;

@SpringBootTest
class LinearApplicationTests {

	@Test
	void contextLoads() {
		Matrix matrix = new Matrix();
		ArrayList<BigDecimal> row = new ArrayList<>();

		matrix = new Matrix();

		row.add(new BigDecimal("22"));
		row.add(BigDecimal.ZERO);
		matrix.insertRow(row);
		row.clear();

		row.add(new BigDecimal("111"));
		row.add(new BigDecimal("2"));
		matrix.insertRow(row);
		row.clear();

		Matrix b = new Matrix();
		row.add(new BigDecimal(1));
		row.add(new BigDecimal(2));
		b.insertColumn(row);

		Solver solver = new Solver(matrix, b, new MathContext(10, RoundingMode.HALF_UP));
		solver.GaussElimination(true, true,true).print();
	}

}