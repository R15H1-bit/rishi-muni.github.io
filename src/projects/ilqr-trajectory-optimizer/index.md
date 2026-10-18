---
title: iLQR trajectory optimizer
short: iLQR
summary: An iterative LQR solver in MATLAB for nonlinear systems, including a fix for the mismatch between RK4-integrated dynamics and Euler-linearized Jacobians.
discipline: Dynamics & control
# role: Sole developer
timeline: 2026
status: In progress
tools: [MATLAB, Symbolic Math Toolbox]
order: 4
# cover: cover.png
# links:
#   - label: View the code
#     url: https://github.com/your-username/ilqr
---

## Overview

Iterative LQR finds a locally optimal control sequence for a nonlinear system by repeatedly linearizing the dynamics around the current trajectory, solving a time-varying LQR problem backward in time, and rolling the new controls forward through the true dynamics.

{# What systems you've run it on, and a plot of the optimized trajectory. #}

## Formulation

For discrete dynamics $x_{k+1} = f(x_k, u_k)$ the solver minimizes

$$
J = \ell_f(x_N) + \sum_{k=0}^{N-1} \ell(x_k, u_k),
$$

using the local linearization $\delta x_{k+1} \approx A_k\,\delta x_k + B_k\,\delta u_k$ in each backward pass.

## The discretization bug

The forward pass integrated the dynamics with RK4, but the backward pass used Jacobians from an Euler step. The solver was optimizing a slightly different system from the one it simulated.

The fix is to linearize the same discrete map you integrate:

$$
A_k = \frac{\partial f_{\text{RK4}}}{\partial x}\bigg|_{x_k,u_k}, \qquad
B_k = \frac{\partial f_{\text{RK4}}}{\partial u}\bigg|_{x_k,u_k}.
$$

{# Before/after plots are perfect here — put the two image lines together for a side-by-side:
   ![](cost-before.png "Cost per iteration, Euler Jacobians")
   ![](cost-after.png "Cost per iteration, RK4-consistent Jacobians")
#}

## Results

> Add your headline result, e.g. iterations to convergence before and after the fix.
