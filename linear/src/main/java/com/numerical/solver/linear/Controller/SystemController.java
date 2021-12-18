package com.numerical.solver.linear.Controller;

import com.numerical.solver.linear.model.ApiProblem;
import com.numerical.solver.linear.model.Decomposer;
import com.numerical.solver.linear.model.Matrix;
import com.numerical.solver.linear.model.Solver;
import jdk.jfr.Enabled;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.awt.desktop.ScreenSleepEvent;
import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.util.ArrayList;

@RestController
@EnableWebMvc
@CrossOrigin("http://localhost:4200")
public class SystemController {

    ArrayList<ArrayList<BigDecimal>> generateData(BigDecimal[][] arrayData,int precision){
        ArrayList<ArrayList<BigDecimal>> ret=new ArrayList<ArrayList<BigDecimal>>();

        for(int i=0;i<arrayData.length;i++){
            ret.add(new ArrayList<>());
            for(int j=0;j<arrayData.length;j++){
                ret.get(0).add(arrayData[i][j].round(new MathContext(precision, RoundingMode.HALF_UP)));
            }
        }
        return ret;
    }
    @PostMapping("/postProblem")
    public String matrixGenerator(@RequestBody ApiProblem apiProblem){
        /*
        ApiProblem problem=new ApiProblem(apiProblem.getNumberofUnknown(),apiProblem.getCoeff_matrix(),
                apiProblem.getConstant_matrix(),apiProblem.getPrecision(),apiProblem.getMethod());
        System.out.println("hello");
        Decomposer decomposer=new Decomposer();
        Matrix coeffMatrix =new Matrix();
        coeffMatrix.setData(generateData(problem.getCoeff_matrix(),problem.getPrecision()));
        if(problem.getMethod()=="Crout Decompostion"){
            return decomposer.croutDecomposition(coeffMatrix);
        }*/

        return apiProblem.getMethod();
    }
}
