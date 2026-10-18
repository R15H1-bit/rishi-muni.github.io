---
# 1. Make a new folder:  src/projects/your-project-name/
# 2. Copy this file into it and rename it to  index.md
# 3. Put the project's images and videos in the same folder.
# Lines starting with # are ignored. Delete any field you don't need.

title: Project title
short: ABC                     # 2–4 letters shown on the thumbnail until you add a cover
summary: One sentence on what you built and why it matters.
discipline: Propulsion & structures   # must match a name in src/_data/site.json
team: Team or lab name
role: What you personally did
timeline: Jan – May 2026
status: In progress            # delete when finished
tools: [MATLAB, SolidWorks, ANSYS]
order: 7                       # position on the home page (lower = higher)
cover: cover.jpg               # file in this folder
cover_caption: Optional caption under the cover image.
links:
  - label: View the code
    url: https://github.com/you/repo
  - label: Read the report
    url: report.pdf            # a PDF in this folder
# draft: true                  # hides the project until you're ready
---

## Overview

Plain paragraphs are just text. **Bold**, *italic*, [links](https://example.com).

## Images

One image on its own line becomes a full-width figure. The text in quotes is the caption:

![FEA stress plot](stress.png "Von Mises stress at proof pressure")

Several images on consecutive lines become a side-by-side gallery:

![](before.png "Before")
![](after.png "After")

Videos use the same syntax:

![](test-fire.mp4 "Static fire, 2026-03-14")

## Equations

Inline: $F = \dot m v_e + (p_e - p_a) A_e$

Display:

$$
I_{sp} = \frac{F}{\dot m g_0}
$$

## Tables

| Case | Load (kN) | Margin |
|---|---|---|
| Proof | 12.4 | 0.42 |
| Burst | 18.6 | 0.11 |

## Callout

> A blockquote becomes a highlighted key result.

## Code

```matlab
[t, y] = ode45(@(t,y) dynamics(t,y,p), tspan, y0);
```

{# Notes like this one are hidden from the site. #}
