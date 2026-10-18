---
title: Bifurcations of a bar on a unilateral foundation
short: BIF
summary: A MATLAB app for heave–pitch bifurcation analysis of a rigid bar resting on a tensionless elastic foundation under traveling-wave forcing.
discipline: Dynamics & control
# role: Your role (e.g. undergraduate researcher)
timeline: 2026
tools: [MATLAB, App Designer, Parallel Computing Toolbox]
order: 6
# cover: bifurcation.png
---

## The system

A rigid bar sits on an elastic foundation that can push but not pull — where the bar lifts off, the foundation force drops to zero. Driven by a traveling wave, the bar's coupled heave and pitch motion is strongly nonlinear, and its response changes character as forcing parameters vary.

{# A sketch of the model with the coordinates labeled helps a lot:
   ![](model.png "Heave y and pitch θ of the bar on the foundation")
#}

## The tool

I built a MATLAB App Designer application to sweep parameters and visualize the response:

- nondimensional parameter set (wavenumber, damping, frequency baseline), shown live in the app
- parameter sweeps parallelized with `parfor`
- phase-space plots and bifurcation diagrams in separate tabs
- video export, plus a standalone animation script

## Results

{# Bifurcation diagrams side by side work well:
   ![](bif-heave.png "Heave amplitude against forcing frequency")
   ![](bif-pitch.png "Pitch amplitude against forcing frequency")
#}

> Add what the diagrams show — e.g. where the response switches from periodic to lift-off or chaotic motion.
