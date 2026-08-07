---
title: 'Ricerca ed Energie Rinnovabili — Analisi SQL'
description: >-
  Analisi in PostgreSQL della relazione tra densità di ricercatori per milione
  di abitanti (UNESCO) e quota di energia rinnovabile (Kaggle, 2000–2022):
  8 obiettivi analitici con query dedicate, view riutilizzabili, correlazioni
  per paese e per anno e clustering dei paesi in terzili (Low/Medium/High)
  di intensità di ricerca.
tags: ['sql', 'viz']
githubUrl: 'https://github.com/Valvln/progetto_sql'
linkedinUrl: 'https://www.linkedin.com/in/valerio-quaranta-873a512ba/'
pdfPresentation:
  file: '/pdf/sql-renewables.pdf'
  label: 'View presentation'
order: 2
---

Integrazione di due dataset pubblici tramite una tabella di lookup ISO Alpha-3
curata manualmente, DDL consolidato (tabelle + view) e cronologia completa
delle indagini sui dati. I risultati di ogni obiettivo sono esportati in CSV e
visualizzati con grafici dedicati: distribuzioni globali, evoluzione temporale
2000–2022 e confronto tra paesi selezionati.
