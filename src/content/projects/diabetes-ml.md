---
title: 'Progressione del Diabete — Regressione Regolarizzata'
description: >-
  Modello di regressione per prevedere la progressione del diabete a un anno
  dal baseline (442 pazienti, 10 variabili cliniche): diagnosi della
  multicollinearità dei marker sierici (VIF, mutual information), Ridge
  Regression con tuning via Repeated K-Fold CV (10 split × 3 ripetizioni).
  R² ≈ 0,49 su test set con gap train/test del 2% — nessun overfitting;
  driver principali: BMI e marker sierico s5.
tags: ['ml']
githubUrl: 'https://github.com/Valvln/project_ML'
linkedinUrl: 'https://www.linkedin.com/in/valerio-quaranta-873a512ba/'
pdfPresentation:
  file: '/pdf/diabetes-ml.pdf'
  label: 'View presentation'
order: 4
---

Oltre alla performance predittiva, il progetto verifica la validità statistica
del modello: test di Breusch-Pagan per l'eteroschedasticità, Q-Q plot per la
normalità dei residui e analisi della precisione per i pazienti ad alto rischio
(target > 150), dove il modello risulta più accurato — la fascia più rilevante
per uno screening clinico.
