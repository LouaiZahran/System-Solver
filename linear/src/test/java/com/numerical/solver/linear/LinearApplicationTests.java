package com.numerical.solver.linear;

import com.numerical.solver.linear.model.Matrix;
import com.numerical.solver.linear.model.Solver;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.util.ArrayList;

@SpringBootTest
class LinearApplicationTests {

	@Test
	void contextLoads() {
		Matrix matrix = new Matrix();
		ArrayList<BigDecimal> row = new ArrayList<>();
		row.add(new BigDecimal(2));
		row.add(new BigDecimal(1));
		matrix.insertRow(row);
		row.clear();

		row.add(new BigDecimal(3));
		row.add(new BigDecimal(4));
		matrix.insertRow(row);
		row.clear();

		Matrix b = new Matrix();
		row.add(new BigDecimal(5));
		row.add(new BigDecimal(6));
		b.insertColumn(row);

		row.clear();
		row.add(BigDecimal.ZERO);
		row.add(BigDecimal.ZERO);
		Matrix guess = new Matrix();
		guess.insertColumn(row);

		Solver solver = new Solver(matrix, b);
		solver.solveIterative(guess, 100, 0.01, true);
	}

}
