const questions = [
  {
    "question": "Which algorithm does Excel's FORECAST.ETS function use for time-series forecasting?",
    "options": [
      "Linear Regression",
      "Exponential Triple Smoothing (ETS AAA model)",
      "Moving Average",
      "Monte Carlo"
    ],
    "correctAnswer": 1,
    "explanation": "FORECAST.ETS employs the ETS AAA Holt-Winters algorithm."
  },
  {
    "question": "What requirement must the timeline argument in FORECAST.ETS satisfy?",
    "options": [
      "Sorted text",
      "Consistent step interval between timeline points",
      "Powers of 2",
      "1,000 rows minimum"
    ],
    "correctAnswer": 1,
    "explanation": "The timeline argument must have regular step intervals."
  },
  {
    "question": "Which companion function calculates confidence intervals around a forecast?",
    "options": [
      "FORECAST.ETS.CONFINT()",
      "FORECAST.ETS.ERROR()",
      "STDEV.ETS()",
      "CONFIDENCE.T()"
    ],
    "correctAnswer": 0,
    "explanation": "FORECAST.ETS.CONFINT computes the confidence interval margin."
  },
  {
    "question": "What does seasonality = 1 in FORECAST.ETS specify?",
    "options": [
      "No seasonality",
      "Automatic seasonal cycle detection",
      "12-month cycle",
      "Error"
    ],
    "correctAnswer": 1,
    "explanation": "Setting seasonality to 1 enables automatic cycle detection."
  },
  {
    "question": "What does seasonality = 0 in FORECAST.ETS specify?",
    "options": [
      "No seasonal adjustment (trend only)",
      "Daily pattern",
      "0% confidence",
      "Interpolation"
    ],
    "correctAnswer": 0,
    "explanation": "Seasonality 0 disables seasonal adjustment."
  },
  {
    "question": "Which function returns the detected length of the seasonal cycle?",
    "options": [
      "FORECAST.ETS.SEASONALITY()",
      "SEASON.DETECT()",
      "PERIOD.LENGTH()",
      "CYCLE.COUNT()"
    ],
    "correctAnswer": 0,
    "explanation": "FORECAST.ETS.SEASONALITY returns the detected seasonal pattern length."
  },
  {
    "question": "Which function returns statistical indicators like RMSE and Alpha?",
    "options": [
      "FORECAST.ETS.STAT()",
      "FORECAST.DIAG()",
      "REGRESSION.SUMMARY()",
      "STAT.METRICS()"
    ],
    "correctAnswer": 0,
    "explanation": "FORECAST.ETS.STAT returns 8 statistical diagnostic indicators."
  },
  {
    "question": "What is the default confidence level in FORECAST.ETS.CONFINT?",
    "options": [
      "95% (0.95)",
      "90%",
      "99%",
      "80%"
    ],
    "correctAnswer": 0,
    "explanation": "Default confidence level is 95%."
  },
  {
    "question": "How do you calculate the upper 95% confidence bound?",
    "options": [
      "=FORECAST.ETS(...) + FORECAST.ETS.CONFINT(...)",
      "=FORECAST.ETS(...) * 1.96",
      "=FORECAST.ETS(...) + STDEV(...)",
      "=MAX(FORECAST.ETS(...))"
    ],
    "correctAnswer": 0,
    "explanation": "Upper bound = Base forecast + confidence interval margin."
  },
  {
    "question": "How do you calculate the lower 95% confidence bound?",
    "options": [
      "=FORECAST.ETS(...) - FORECAST.ETS.CONFINT(...)",
      "=FORECAST.ETS(...) / 1.96",
      "=MIN(FORECAST.ETS(...))",
      "=FORECAST.ETS(...) - AVERAGE(...)"
    ],
    "correctAnswer": 0,
    "explanation": "Lower bound = Base forecast - confidence interval margin."
  },
  {
    "question": "What error occurs if timeline contains duplicate dates without aggregation?",
    "options": [
      "#NUM!",
      "#VALUE!",
      "#N/A",
      "#REF!"
    ],
    "correctAnswer": 0,
    "explanation": "Duplicates without aggregation produce #NUM!."
  },
  {
    "question": "What percentage of missing timeline points can Excel interpolate?",
    "options": [
      "Up to 30%",
      "50%",
      "10%",
      "100%"
    ],
    "correctAnswer": 0,
    "explanation": "Excel can interpolate up to 30% missing timeline intervals."
  },
  {
    "question": "What is the default aggregation method for duplicate timestamps?",
    "options": [
      "AVERAGE (value 1)",
      "SUM",
      "COUNT",
      "MAX"
    ],
    "correctAnswer": 0,
    "explanation": "Default aggregation averages duplicate timestamp values."
  },
  {
    "question": "Why is FORECAST.ETS preferred for retail sales at Barrackpore?",
    "options": [
      "It captures festive seasonality peaks and non-linear trends",
      "It uses binary",
      "It requires no history",
      "It disables decimals"
    ],
    "correctAnswer": 0,
    "explanation": "Retail sales exhibit cyclical seasonality that ETS models capture."
  },
  {
    "question": "What does an Alpha smoothing parameter near 1 indicate?",
    "options": [
      "Heavy weight on recent observations",
      "Zero noise",
      "Invalid seasonality",
      "Flat trend"
    ],
    "correctAnswer": 0,
    "explanation": "Alpha near 1 emphasizes recent data."
  },
  {
    "question": "What does statistic_type code 1 return in FORECAST.ETS.STAT?",
    "options": [
      "Alpha smoothing coefficient",
      "Beta trend coefficient",
      "Gamma seasonality coefficient",
      "RMSE"
    ],
    "correctAnswer": 0,
    "explanation": "Code 1 returns the Alpha parameter."
  },
  {
    "question": "What does statistic_type code 6 return in FORECAST.ETS.STAT?",
    "options": [
      "RMSE (Root Mean Square Error)",
      "Alpha",
      "Beta",
      "MAPE"
    ],
    "correctAnswer": 0,
    "explanation": "Code 6 returns RMSE."
  },
  {
    "question": "Which feature in Excel creates an automated ETS forecast with confidence bands?",
    "options": [
      "Data Tab -> Forecast Sheet",
      "Pie Chart",
      "Radar Chart",
      "Treemap"
    ],
    "correctAnswer": 0,
    "explanation": "The Forecast Sheet wizard generates ETS models and charts."
  },
  {
    "question": "Can FORECAST.ETS interpolate past missing historical dates?",
    "options": [
      "Yes, if target_date is in past gaps",
      "No",
      "Only with VBA",
      "Only on Sundays"
    ],
    "correctAnswer": 0,
    "explanation": "FORECAST.ETS can interpolate missing historical timestamps."
  },
  {
    "question": "What happens if values and timeline have unequal range sizes?",
    "options": [
      "#N/A error",
      "#VALUE!",
      "Truncates",
      "0"
    ],
    "correctAnswer": 0,
    "explanation": "Unequal ranges produce #N/A."
  },
  {
    "question": "What is the minimum recommended data for seasonal detection?",
    "options": [
      "At least 2 complete seasonal cycles",
      "3 points",
      "100 points",
      "5 points"
    ],
    "correctAnswer": 0,
    "explanation": "Reliable detection requires at least 2 full cycles."
  },
  {
    "question": "What does the Gamma parameter in FORECAST.ETS.STAT control?",
    "options": [
      "Seasonality smoothing weight",
      "Confidence width",
      "Data filling",
      "Slope"
    ],
    "correctAnswer": 0,
    "explanation": "Gamma controls seasonality smoothing."
  },
  {
    "question": "Which metric measures percentage error independent of data scale?",
    "options": [
      "SMAPE (Code 5)",
      "RMSE",
      "Beta",
      "Variance"
    ],
    "correctAnswer": 0,
    "explanation": "SMAPE measures scale-independent percentage error."
  },
  {
    "question": "If data follows a quarterly cycle, what should seasonality be set to?",
    "options": [
      "4",
      "12",
      "1",
      "0"
    ],
    "correctAnswer": 0,
    "explanation": "Quarterly cycles repeat every 4 periods."
  },
  {
    "question": "What should be done before running ETS on irregular timestamps?",
    "options": [
      "Resample/aggregate data into fixed calendar buckets",
      "Run directly",
      "Use SUMPRODUCT",
      "Delete dates"
    ],
    "correctAnswer": 0,
    "explanation": "Resampling into clean daily/monthly buckets ensures regular intervals."
  },
  {
    "question": "What is the return type of FORECAST.ETS?",
    "options": [
      "A single scalar projected numeric value",
      "2D matrix",
      "Text",
      "Date"
    ],
    "correctAnswer": 0,
    "explanation": "Returns a single forecasted scalar number."
  },
  {
    "question": "How do you spill forecasts across future dates in Excel 365?",
    "options": [
      "=MAP(future_dates, LAMBDA(d, FORECAST.ETS(d, vals, times)))",
      "=FORECAST.ETS(future_dates, ...)",
      "=FORECAST.ALL()",
      "=TREND()"
    ],
    "correctAnswer": 0,
    "explanation": "Wrapping in MAP spills forecasts across multiple target dates."
  },
  {
    "question": "What does Beta parameter (Code 2) represent?",
    "options": [
      "Trend smoothing coefficient",
      "Seasonality",
      "Intercept",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "Beta controls trend adaptation."
  },
  {
    "question": "What must target_date be?",
    "options": [
      "Valid Excel serial date",
      "Text string",
      "Row number",
      "Boolean"
    ],
    "correctAnswer": 0,
    "explanation": "target_date must be a valid date serial."
  },
  {
    "question": "Why combine FORECAST.ETS with FORECAST.ETS.CONFINT?",
    "options": [
      "To establish risk-adjusted Bull/Base/Bear scenarios",
      "To satisfy checklists",
      "To speed up Excel",
      "To prevent #REF!"
    ],
    "correctAnswer": 0,
    "explanation": "Confidence bands establish rigorous risk-adjusted scenarios."
  }
];

export default questions;
