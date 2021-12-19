package com.numerical.solver.linear.Controller;

import com.google.gson.Gson;
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

    ArrayList<ArrayList<BigDecimal>> generateData(BigDecimal[][] arrayData,MathContext mc){
        ArrayList<ArrayList<BigDecimal>> ret=new ArrayList<>();

        for(int i=0;i<arrayData.length;i++){
            ArrayList<BigDecimal> retRow=new ArrayList<>();
            for(int j=0;j<arrayData.length;j++){
                retRow.add(arrayData[i][j].round(mc));
            }
            ret.add(retRow);
        }
        return ret;

    }
    @PostMapping("/postProblem")
    public ArrayList<ArrayList<ArrayList<BigDecimal>>> matrixGenerator(@RequestBody String apiProblemString){
        ApiProblem apiProblem=new Gson().fromJson(apiProblemString,ApiProblem.class);
        Decomposer decomposer=new Decomposer();
        Matrix coeffMatrix =new Matrix();
        MathContext mc=new MathContext(apiProblem.getPrecision(), RoundingMode.HALF_UP);
        coeffMatrix.setData(generateData(apiProblem.getCoeff_matrix(),mc));
        ArrayList<ArrayList<ArrayList<BigDecimal>>> result=new ArrayList<ArrayList<ArrayList<BigDecimal>>>();
        if(apiProblem.getMethod().equalsIgnoreCase("Cholesky Decompostion")){
            ArrayList<Matrix>decomposed = decomposer.cholskeyDecomposition(coeffMatrix,mc);
            result.add(decomposed.get(0).getData());
            result.add(decomposed.get(1).getData());
            return result;
        }
        else if(apiProblem.getMethod().equalsIgnoreCase("Crout Decompostion")){
            ArrayList<Matrix>decomposed = decomposer.croutDecomposition(coeffMatrix,mc);
            result.add(decomposed.get(0).getData());
            result.add(decomposed.get(1).getData());
            return result;
        }
        return result;
    }
}