const questions = [
  {
    question: "What is an outlier?",
    shortAnswer: "A data point that differs significantly from other observations.",
    explanation: "Outliers can arise from measurement error, data entry mistakes, or genuine extreme events.",
    level: "basic",
    codeExample: "In {10,12,13,14,100}, 100 is an outlier."
  },
  {
    question: "What is the IQR method for outlier detection?",
    shortAnswer: "Flags values below Q1 − 1.5*IQR or above Q3 + 1.5*IQR.",
    explanation: "IQR = Q3 − Q1. This method is robust to non‑normal distributions.",
    level: "intermediate",
    codeExample: "Upper fence = QUARTILE.INC(data,3) + 1.5*(QUARTILE.INC(data,3)-QUARTILE.INC(data,1))"
  },
  {
    question: "What is the Z‑score method for outlier detection?",
    shortAnswer: "Flags values where (x − mean)/standard deviation exceeds a threshold (often 2 or 3).",
    explanation: "Assumes data is approximately normal. A threshold of 3 indicates values more than 3 standard deviations from the mean.",
    level: "intermediate",
    codeExample: "=ABS((A1-AVERAGE(A:A))/STDEV.P(A:A)) > 2"
  },
  {
    question: "Which outlier detection method is more robust to skewness?",
    shortAnswer: "The IQR method (based on quartiles) is more robust than the Z‑score method, which assumes normality.",
    explanation: "IQR uses percentiles and is not affected by extreme values as much as mean and stdev.",
    level: "advanced",
    codeExample: "Use IQR for income data, Z‑score for symmetric data."
  },
  {
    question: "What is the typical multiplier for IQR fences?",
    shortAnswer: "1.5 for mild outliers, 3 for extreme outliers.",
    explanation: "The 1.5*IQR rule is common in box plots. For very conservative outlier detection, use 3*IQR.",
    level: "basic",
    codeExample: "Upper fence = Q3 + 1.5*IQR."
  },
  {
    question: "How can you highlight outliers in Excel using conditional formatting?",
    shortAnswer: "Use a formula rule that compares each cell to pre‑calculated fences. Example: =A1 > $F$1 (where F1 holds upper fence).",
    explanation: "Relative references vs absolute references matter.",
    level: "intermediate",
    codeExample: "Apply to range $A$2:$A$100, formula =A2 > $D$1."
  },
  {
    question: "What is a box plot, and how does it show outliers?",
    shortAnswer: "A box plot shows median, Q1, Q3, and 'whiskers'. Points beyond 1.5*IQR from the box are plotted as individual points (outliers).",
    explanation: "Excel’s built‑in box plot (since 2016) automatically uses the IQR rule.",
    level: "basic",
    codeExample: "Insert > Statistical > Box and Whisker."
  },
  {
    question: "Why should you not automatically remove outliers?",
    shortAnswer: "Because outliers may be genuine, important information (e.g., rare disease, fraud).",
    explanation: "Only remove after investigation or if they are clearly errors.",
    level: "intermediate",
    codeExample: "Always document data cleaning steps."
  },
  {
    question: "How can you compute outlier fences without helper cells?",
    shortAnswer: "Use a single formula: =OR(A1 < (QUARTILE.INC(A:A,1)-1.5*(QUARTILE.INC(A:A,3)-QUARTILE.INC(A:A,1))), A1 > (QUARTILE.INC(A:A,3)+1.5*(QUARTILE.INC(A:A,3)-QUARTILE.INC(A:A,1))))",
    explanation: "This flags TRUE for outliers, but recomputes quartiles for each cell (slow).",
    level: "advanced",
    codeExample: "Better to use helper cells for performance."
  },
  {
    question: "Does the standard deviation method work well for small datasets?",
    shortAnswer: "No, with small n (e.g., n < 10) the standard deviation is unstable and outliers may not be detected reliably.",
    explanation: "IQR is often better for small datasets as well.",
    level: "advanced",
    codeExample: "Use at least 15‑20 points for Z‑score."
  },
  {
    question: "What does the 1.5*IQR rule assume about the data distribution?",
    shortAnswer: "It does not assume normality, but it works well for unimodal symmetric distributions. For skewed data, asymmetric fences (using percentiles) may be better.",
    explanation: "It is a heuristic, not a statistical test.",
    level: "expert",
    codeExample: "Use adjusted fences for highly skewed data."
  },
  {
    question: "How do you calculate the lower fence for outliers in Excel?",
    shortAnswer: "=QUARTILE.INC(range,1) - 1.5*(QUARTILE.INC(range,3)-QUARTILE.INC(range,1))",
    explanation: "Q1 = first quartile. This gives the lower boundary.",
    level: "basic",
    codeExample: "Any value below this fence is an outlier."
  },
  {
    question: "Can you use TRIMMEAN to ignore outliers?",
    shortAnswer: "Yes, TRIMMEAN calculates the mean after excluding a percentage of extreme values from both ends.",
    explanation: "It does not require you to identify outliers explicitly.",
    level: "intermediate",
    codeExample: "=TRIMMEAN(A2:A100, 0.1) excludes 10% of data (5% from each end)."
  },
  {
    question: "How to automatically replace outliers with the median or a capped value?",
    shortAnswer: "Use IF with the fence formulas: =IF(OR(value < lower_fence, value > upper_fence), MEDIAN(range), value).",
    explanation: "This is winsorization (capping).",
    level: "advanced",
    codeExample: "Create helper column with this formula."
  },
  {
    question: "What is the difference between univariate and multivariate outlier detection?",
    shortAnswer: "Univariate considers one variable at a time (e.g., IQR of scores). Multivariate considers interactions (e.g., a combination of age and income that is unusual).",
    explanation: "Multivariate detection is more complex; Excel alone cannot do it easily.",
    level: "expert",
    codeExample: "Use scatter plots for two variables."
  },
  {
    question: "How can you detect outliers in a time series (trended data)?",
    shortAnswer: "Fit a trend line (e.g., using FORECAST.LINEAR) and compute residuals; flag residuals with large absolute Z‑score.",
    explanation: "Outliers are large deviations from the trend.",
    level: "expert",
    codeExample: "Use LINEST to get residuals."
  },
  {
    question: "What is the effect of outliers on correlation (CORREL)?",
    shortAnswer: "A single outlier can dramatically increase or decrease the correlation coefficient.",
    explanation: "Always check scatter plots and consider robust correlation (e.g., Spearman).",
    level: "intermediate",
    codeExample: "Remove outlier and see how r changes."
  },
  {
    question: "How do you calculate the upper fence for outliers using QUARTILE.EXC?",
    shortAnswer: "=QUARTILE.EXC(range,3) + 1.5*(QUARTILE.EXC(range,3)-QUARTILE.EXC(range,1))",
    explanation: "QUARTILE.EXC may give different Q1 and Q3 than QUARTILE.INC.",
    level: "advanced",
    codeExample: "Be consistent in choosing method."
  },
  {
    question: "Why does the IQR method often use 1.5 and not another number?",
    shortAnswer: "It is an empirical convention introduced by John Tukey for box plots. It works well for normal data, where it flags about 0.7% of observations.",
    explanation: "For normal data, 1.5*IQR corresponds roughly to 2.7*σ.",
    level: "expert",
    codeExample: "You can adjust the multiplier based on your data."
  },
  {
    question: "How can you count the number of outliers in a range?",
    shortAnswer: "Use =COUNTIFS(range, \"<\"&lower_fence, range, \">\"&upper_fence) but careful: need to handle both ends. Better: =COUNTIF(range, \"<\"&lower_fence) + COUNTIF(range, \">\"&upper_fence).",
    explanation: "Pre‑compute fences in cells.",
    level: "intermediate",
    codeExample: "=COUNTIF(A2:A100, \"<\"&D1)+COUNTIF(A2:A100, \">\"&D2)"
  },
  {
    question: "What is the relationship between the Z‑score threshold and the IQR multiplier for a normal distribution?",
    shortAnswer: "For normal data, 1.5*IQR ≈ 2.7σ, which corresponds to a Z‑score threshold of about 2.7. A Z‑score threshold of 2 (flagging ~5%) is more sensitive.",
    explanation: "Different thresholds detect different percentages.",
    level: "expert",
    codeExample: "Adjust based on your false positive tolerance."
  },
  {
    question: "What is the result of =QUARTILE.INC(A2:A100,1) if the data has no outliers?",
    shortAnswer: "The first quartile (25th percentile) value, which can be a number not present in the data.",
    explanation: "It's a statistical summary, not an outlier indicator.",
    level: "basic",
    codeExample: "Use it to compute fences."
  },
  {
    question: "How do you treat outliers in a dataset that you plan to use for forecasting?",
    shortAnswer: "Investigate the cause. If they are one‑time errors, remove or winsorize them. If they are genuine rare events, keep them or use robust forecasting methods (e.g., FORECAST.ETS with outlier handling options).",
    explanation: "Outliers can distort trend lines.",
    level: "advanced",
    codeExample: "Consider using median instead of mean."
  },
  {
    question: "Can conditional formatting highlight outliers using the IQR rule directly?",
    shortAnswer: "Yes, using a formula: =A1 < (QUARTILE.INC($A$1:$A$100,1)-1.5*(QUARTILE.INC($A$1:$A$100,3)-QUARTILE.INC($A$1:$A$100,1)))",
    explanation: "Use absolute references for the range, relative for the cell.",
    level: "advanced",
    codeExample: "Apply to $A$1:$A$100."
  },
  {
    question: "What is the difference between an outlier and an inlier?",
    shortAnswer: "An outlier is an extreme point. An inlier is a point that lies inside the overall cluster but may still be anomalous. Inlier detection is less common.",
    explanation: "Inliers can be problematic for clustering algorithms.",
    level: "expert",
    codeExample: "Not covered by basic functions."
  },
  {
    question: "What visual tool in Excel is best for spotting outliers?",
    shortAnswer: "A scatter plot (for two variables) or a box plot (for one variable) are excellent.",
    explanation: "Visual inspection often reveals outliers before any formula.",
    level: "basic",
    codeExample: "Insert Scatter with markers."
  },
  {
    question: "How can the IQR method fail if the data is bimodal?",
    shortAnswer: "Bimodal data has two peaks; points between the peaks may be flagged as outliers even though they belong to a cluster.",
    explanation: "Check the distribution with histograms before applying outlier rules.",
    level: "expert",
    codeExample: "Use clustering algorithms instead."
  },
  {
    question: "What is the effect of outliers on the MEDIAN function?",
    shortAnswer: "Very little – median is robust to outliers (resistant).",
    explanation: "That's why median is often preferred for skewed data.",
    level: "basic",
    codeExample: "MEDIAN of {1,2,3,4,100} = 3, unchanged by outlier."
  },
  {
    question: "How do you exclude outliers from an AVERAGE calculation?",
    shortAnswer: "Use an array formula: =AVERAGE(IF((range>lower_fence)*(range<upper_fence), range))",
    explanation: "In 365, =AVERAGE(FILTER(range, (range>lower_fence)*(range<upper_fence)))",
    level: "advanced",
    codeExample: "Requires understanding of dynamic arrays."
  },
  {
    question: "Is it always necessary to report outliers in a summary?",
    shortAnswer: "Yes, in statistical reports, you should mention the presence of outliers and how they were handled.",
    explanation: "Transparency helps others interpret your results correctly.",
    level: "intermediate",
    codeExample: "Add a footnote in dashboards."
  }
];

export default questions;