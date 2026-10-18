---
title: Multi-objective sizing for the GTXR solid motor
short: GTXR
summary: Using a genetic algorithm to map the trade-off between specific impulse and chamber pressure, so motor geometry is chosen from a Pareto front instead of by hand.
discipline: Propulsion & structures
team: GTXR
# role: Your role on the team
timeline: 2026
status: In progress
tools: [Python, pymoo, NSGA-II]
order: 1
# cover: cover.png        # drop an image in this folder and uncomment
# cover_caption: Pareto front of Isp against MEOP across N generations.
---

{# Everything between these brace-hash marks is a note to you and never appears on the site. #}

## The problem

A solid motor's grain geometry sets both how efficiently it burns and how hard it pushes on the case. Higher specific impulse usually wants higher chamber pressure — but the maximum expected operating pressure (MEOP) drives casing wall thickness, mass and test requirements. Sizing by hand means picking one point on that trade-off without seeing the rest of it.

## Approach

I set the sizing up as a two-objective optimization and solved it with NSGA-II in pymoo:

$$
\min_{\mathbf{x}} \;\big[\, -I_{sp}(\mathbf{x}),\;\; \mathrm{MEOP}(\mathbf{x}) \,\big]
\quad \text{s.t.} \quad g_i(\mathbf{x}) \le 0
$$

{# Fill in:
   - what's in x (grain length, port diameter, throat diameter, number of segments…)
   - the constraints g_i (envelope, burn time, Kn limits, erosive burning…)
   - how Isp and MEOP are evaluated for each candidate (internal ballistics model)
   - population size / generations #}

## Results

{# Add the Pareto front plot, then explain which design you picked and why.
   Two plots side by side? Put the image lines directly under each other:

   ![](pareto.png "Pareto front after 200 generations")
   ![](pressure-trace.png "Chamber pressure for the selected design")
#}

> Add your headline result here, e.g. the selected design's Isp and MEOP and how it compares to the baseline.

## What I'd do next

{# One or two honest sentences: model fidelity, validation against a static fire, etc. #}
