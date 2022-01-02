import { PlotterComponent } from './plotter/plotter.component';
import { SystemSolverComponent } from './system-solver/system-solver.component';
import { homecomponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootFindingComponent } from './root-finding/root-finding.component';

const routes: Routes = [
  {path:"",component:homecomponent},
  {path:"systemSolver",component:SystemSolverComponent},
  {path:"rootFinding",component:RootFindingComponent},
  {path:"plotter",component:PlotterComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
