---
title: Inverted pendulums, single to triple
short: IP
summary: A series of cart-pendulum simulations built from symbolic Lagrangian derivations, with energy-shaping swing-up and LQR/iLQR stabilization.
discipline: Dynamics & control
# role: Sole developer
timeline: 2026
tools: [MATLAB, Symbolic Math Toolbox, App Designer]
order: 5
# cover: cover.gif     # an animated GIF of the swing-up makes a great cover
---

## Overview

I built up from a single pendulum on a cart to double and triple configurations, deriving each set of equations of motion symbolically so the same pipeline scales with the number of links.

{# Embed an animation here:
   ![](triple-swingup.mp4 "Triple pendulum swing-up and catch")
#}

## Equations of motion

For the single pendulum (cart mass $M$, point mass $m$ on a rod of length $l$, angle $\theta$ from upright):

$$
\mathcal{L} = \tfrac12 (M+m)\dot x^2 + m l \dot x \dot\theta \cos\theta + \tfrac12 m l^2 \dot\theta^2 - m g l \cos\theta
$$

The Euler–Lagrange equations are generated symbolically in MATLAB and converted to numeric functions for simulation.

## Control

- **Swing-up:** an energy-shaping controller pumps energy into the pendulum until it nears the upright orbit.
- **Catch and balance:** LQR (and later iLQR) takes over near the top.
- **Real limits:** actuator saturation is modeled, which changes how aggressive the swing-up can be.

## Debugging notes

Some of the more instructive bugs along the way:

- a sign error from mixing $\sin$/$\cos$ conventions in the energy-shaping law
- LQR gains computed for parameters that didn't match the simulated plant
- substitution-array bugs that caused dimension mismatches in the multi-link simulator

## Interactive app

I also built a MATLAB App Designer application for the double pendulum with multi-tab plots and animation playback.

{# Screenshot of the app:
   ![](app.png "Double pendulum app")
#}
