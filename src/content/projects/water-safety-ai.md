---
title: 'Water Safety AI — Classificazione Potabilità Acqua'
description: >-
  Pipeline ML "safety-first" per classificare la potabilità dell'acqua da 9
  parametri chimico-fisici (3.276 campioni): imputazione iterativa validata con
  test di Little, outlier detection con Isolation Forest, confronto Logistic
  Regression / SVC / XGBoost e calibrazione delle probabilità (Brier score).
  Modello champion: SVC ottimizzato su dataset ridotto — stessa accuratezza con
  3 variabili in meno, riducendo i costi di monitoraggio (driver: pH e solfati).
tags: ['ml']
githubUrl: 'https://github.com/Valvln/Project-Water-Safety-AI'
linkedinUrl: 'https://www.linkedin.com/in/valerio-quaranta-873a512ba/'
pdfPresentation:
  file: '/pdf/water-safety-ai.pdf'
  label: 'Visualizza presentazione'
order: 1
---

In un contesto in cui un falso positivo (acqua contaminata classificata come
potabile) ha un costo critico, il progetto privilegia affidabilità e
calibrazione rispetto alla sola accuratezza: tuning di SVC e XGBoost con
validation curve e heatmap C-gamma, valutazione con ROC-AUC e curve
precision-recall, analisi degli errori condivisi tra modelli e curve di
calibrazione per garantire stime di probabilità oneste.
