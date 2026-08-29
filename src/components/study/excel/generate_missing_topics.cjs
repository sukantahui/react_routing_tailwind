const fs = require('fs');
const path = require('path');

const topicsData = [
  // 1. 002_004 Topic 39: FORECAST.ETS
  {
    moduleDir: '002_004_statistical-functions-for-data-analysis',
    topicIndex: 39,
    title: 'Time-Series Forecasting & Exponential Smoothing',
    subtitle: 'Seasonal decomposition, trend projection, and confidence intervals with FORECAST.ETS, FORECAST.ETS.SEASONALITY, and FORECAST.ETS.CONFINT',
    workbookName: 'statistical_functions_for_data_analysis_master.xlsx',
    sheetName: 'Topic39_Forecast_ETS',
    formulaSig: '=FORECAST.ETS(target_date, values, timeline, [seasonality], [data_completion], [aggregation])',
    formulaDetails: 'Predicts future values using AAA (Additive error, Additive trend, Additive seasonality) Exponential Triple Smoothing algorithm.',
    questions: [
      {
        question: "Which algorithm does Excel's FORECAST.ETS function use under the hood for time-series forecasting?",
        options: ["Linear Least Squares Regression", "Exponential Triple Smoothing (ETS / Holt-Winters Additive model)", "Moving Average Smoothing", "Monte Carlo Random Walk"],
        correctAnswer: 1,
        explanation: "FORECAST.ETS employs the ETS AAA (Additive error, Additive trend, Additive seasonality) Holt-Winters algorithm to detect seasonality and project trended forecasts."
      },
      {
        question: "What requirement must the timeline argument in FORECAST.ETS satisfy?",
        options: ["Must contain sorted text strings", "Must have a consistent step interval between timeline points (e.g. daily, monthly, yearly)", "Must be strictly powers of 2", "Must contain at least 1,000 data rows"],
        correctAnswer: 1,
        explanation: "The timeline argument must have a regular step interval (e.g. exactly 1 month, 1 day, 1 year). If up to 30% of points are missing, Excel can interpolate them using the data_completion parameter."
      },
      {
        question: "Which companion function calculates the statistical margin of error / confidence interval around a FORECAST.ETS prediction?",
        options: ["FORECAST.ETS.CONFINT()", "FORECAST.ETS.ERROR()", "STDEV.ETS()", "CONFIDENCE.T()"],
        correctAnswer: 0,
        explanation: "FORECAST.ETS.CONFINT(target_date, values, timeline, [confidence_level], ...) calculates the margin of error at a given confidence level (default 95%)."
      },
      {
        question: "What does setting the seasonality argument to 1 (or omitting it) in FORECAST.ETS instruct Excel to do?",
        options: ["Disables seasonality completely", "Automatically detects the length of the seasonal pattern", "Forces a 12-month annual cycle", "Returns a #VALUE! error"],
        correctAnswer: 1,
        explanation: "Setting seasonality to 1 (default) instructs Excel to automatically calculate and identify the seasonal cycle length."
      },
      {
        question: "What does setting the seasonality argument to 0 in FORECAST.ETS specify?",
        options: ["Forces linear forecasting without seasonal adjustment", "Automatically finds weekly patterns", "Sets confidence to 0%", "Interpolates missing dates"],
        correctAnswer: 0,
        explanation: "A seasonality value of 0 assumes no seasonal pattern and applies simple double exponential smoothing (trend only)."
      },
      {
        question: "Which function returns the detected length of the seasonal cycle in a time series?",
        options: ["FORECAST.ETS.SEASONALITY()", "SEASON.DETECT()", "PERIOD.LENGTH()", "CYCLE.COUNT()"],
        correctAnswer: 0,
        explanation: "FORECAST.ETS.SEASONALITY(values, timeline) returns an integer representing the detected seasonal step length (e.g., 12 for monthly data with annual cycles)."
      },
      {
        question: "Which function returns statistical diagnostic metrics such as RMSE, MAPE, MASE, and Alpha smoothing parameters?",
        options: ["FORECAST.ETS.STAT()", "FORECAST.DIAGNOSTICS()", "REGRESSION.SUMMARY()", "STAT.METRICS()"],
        correctAnswer: 0,
        explanation: "FORECAST.ETS.STAT(values, timeline, statistic_type) returns 8 key statistical indicators including Alpha, Beta, Gamma, MASE, SMAPE, MAE, and RMSE."
      },
      {
        question: "What is the default confidence level applied by FORECAST.ETS.CONFINT if omitted?",
        options: ["95% (0.95)", "90% (0.90)", "99% (0.99)", "80% (0.80)"],
        correctAnswer: 0,
        explanation: "By default, FORECAST.ETS.CONFINT calculates a 95% confidence interval."
      },
      {
        question: "How do you calculate the upper bound of a forecast at 95% confidence?",
        options: ["=FORECAST.ETS(...) + FORECAST.ETS.CONFINT(...)", "=FORECAST.ETS(...) * 1.96", "=FORECAST.ETS(...) + STDEV(...)", "=MAX(FORECAST.ETS(...))"],
        correctAnswer: 0,
        explanation: "The upper confidence bound equals the base point forecast plus the confidence interval margin: FORECAST.ETS(...) + FORECAST.ETS.CONFINT(...)."
      },
      {
        question: "How do you calculate the lower bound of a forecast at 95% confidence?",
        options: ["=FORECAST.ETS(...) - FORECAST.ETS.CONFINT(...)", "=FORECAST.ETS(...) / 1.96", "=MIN(FORECAST.ETS(...))", "=FORECAST.ETS(...) - AVERAGE(...)"],
        correctAnswer: 0,
        explanation: "The lower confidence bound equals the base point forecast minus the confidence interval margin: FORECAST.ETS(...) - FORECAST.ETS.CONFINT(...)."
      },
      {
        question: "What error does FORECAST.ETS return if the timeline range contains duplicate date values without aggregation handling?",
        options: ["#NUM!", "#VALUE!", "#N/A", "#REF!"],
        correctAnswer: 0,
        explanation: "If timeline contains duplicates and no valid aggregation rule is defined, FORECAST.ETS produces a #NUM! error."
      },
      {
        question: "What is the maximum percentage of missing timeline points Excel can automatically interpolate when data_completion is enabled?",
        options: ["30%", "50%", "10%", "100%"],
        correctAnswer: 0,
        explanation: "Excel's ETS algorithm allows up to 30% missing timeline intervals by interpolating missing data points with average neighbor values."
      },
      {
        question: "What aggregation method is used by default (value 1) when multiple values exist for the same timeline timestamp in FORECAST.ETS?",
        options: ["AVERAGE", "SUM", "COUNT", "MAX"],
        correctAnswer: 0,
        explanation: "By default (aggregation = 1), duplicate timestamp values are averaged."
      },
      {
        question: "In demand planning at Barrackpore retail stores, why is FORECAST.ETS preferred over standard linear FORECAST?",
        options: ["It accounts for recurring festive peaks (e.g. Durga Puja seasonality) and non-linear baseline growth", "It calculates in binary", "It requires no historical data", "It disables decimal rounding"],
        correctAnswer: 0,
        explanation: "Real-world retail demand exhibits strong cyclical seasonality; FORECAST.ETS extracts these cyclic variations whereas linear FORECAST flattens them."
      },
      {
        question: "What does an Alpha smoothing parameter close to 1 in FORECAST.ETS.STAT indicate?",
        options: ["The forecast gives heavy weight to the most recent historical observations", "The time series has zero noise", "Seasonality is invalid", "Trend is completely flat"],
        correctAnswer: 0,
        explanation: "Alpha controls baseline level smoothing; an alpha near 1 emphasizes recent data shifts rather than long-term historical averages."
      },
      {
        question: "What does the statistic_type code 1 return in FORECAST.ETS.STAT?",
        options: ["Alpha smoothing parameter", "Beta trend smoothing parameter", "Gamma seasonality parameter", "RMSE (Root Mean Square Error)"],
        correctAnswer: 0,
        explanation: "Statistic type 1 returns the Alpha parameter (base level smoothing coefficient)."
      },
      {
        question: "What does statistic_type code 6 return in FORECAST.ETS.STAT?",
        options: ["RMSE (Root Mean Squared Error)", "Alpha", "Beta", "MAPE"],
        correctAnswer: 0,
        explanation: "Code 6 returns RMSE (Root Mean Squared Error), measuring overall prediction accuracy."
      },
      {
        question: "Which chart type in Excel natively visualizes FORECAST.ETS with confidence bands in one click?",
        options: ["Forecast Sheet (Data Tab -> Forecast Sheet)", "Pie Chart", "Radar Chart", "Treemap"],
        correctAnswer: 0,
        explanation: "The 'Forecast Sheet' wizard in Excel automatically injects FORECAST.ETS and CONFINT formulas and generates a stylized time-series area chart with confidence upper/lower bounds."
      },
      {
        question: "Can FORECAST.ETS forecast past missing dates (backcasting)?",
        options: ["Yes, if target_date is before historical points or within missing gaps", "No, it only forecasts into the future", "Only with VBA", "Only on Sundays"],
        correctAnswer: 0,
        explanation: "FORECAST.ETS can interpolate missing historical dates or backcast historical periods if target_date is supplied accordingly."
      },
      {
        question: "What happens if values and timeline have different range sizes in FORECAST.ETS?",
        options: ["Returns #N/A error", "Returns #VALUE! error", "Truncates the longer range", "Returns 0"],
        correctAnswer: 0,
        explanation: "Both historical values and timeline ranges must have identical row/column lengths; otherwise, #N/A is returned."
      },
      {
        question: "What is the minimum number of data points recommended for FORECAST.ETS to reliably detect seasonality?",
        options: ["At least 2 complete seasonal cycles (e.g. 24 months for yearly cycles)", "3 points", "100 points", "5 points"],
        correctAnswer: 0,
        explanation: "Reliable seasonal detection requires at least 2 full seasonal cycles (e.g. 24 monthly points for annual seasonality) to establish repetition patterns."
      },
      {
        question: "What does the Gamma parameter in FORECAST.ETS.STAT control?",
        options: ["Seasonality weight smoothing coefficient", "Confidence interval width", "Missing data filling", "Linear slope"],
        correctAnswer: 0,
        explanation: "Gamma controls the smoothing weight applied to recurring seasonal variations across cycles."
      },
      {
        question: "Which metric returned by FORECAST.ETS.STAT measures percentage error independent of data scale?",
        options: ["SMAPE (Symmetric Mean Absolute Percentage Error - Code 5)", "RMSE", "Beta", "Variance"],
        correctAnswer: 0,
        explanation: "SMAPE (Code 5) evaluates percentage forecast accuracy symmetrically without scale bias."
      },
      {
        question: "If sales follow a strict quarterly cycle (Q1, Q2, Q3, Q4), what value should you manually pass to seasonality?",
        options: ["4", "12", "1", "0"],
        correctAnswer: 0,
        explanation: "A quarterly cycle repeats every 4 quarters, so passing seasonality = 4 enforces exact quarterly periodicity."
      },
      {
        question: "If timeline steps are irregular (e.g. random timestamps with huge erratic gaps), what is the best practice before using FORECAST.ETS?",
        options: ["Resample/aggregate data into fixed calendar buckets (e.g. monthly sums via Pivot Table/Power Query)", "Run FORECAST.ETS directly", "Use SUMPRODUCT", "Delete the dates"],
        correctAnswer: 0,
        explanation: "Resampling raw timestamps into clean, regular calendar intervals (daily, weekly, monthly) provides the consistent step interval required by the ETS algorithm."
      },
      {
        question: "What is the return type of FORECAST.ETS?",
        options: ["A single scalar projected numerical value", "A 2D matrix", "A text string", "A date"],
        correctAnswer: 0,
        explanation: "FORECAST.ETS returns a single scalar number representing the forecasted value at the specified target_date."
      },
      {
        question: "How can you generate forecasts for 12 consecutive future months using modern dynamic array formulas?",
        options: ["=MAP(future_dates_range, LAMBDA(d, FORECAST.ETS(d, hist_values, hist_timeline)))", "=FORECAST.ETS(future_dates_range, ...)", "=FORECAST.ALL()", "=TREND(future_dates_range)"],
        correctAnswer: 0,
        explanation: "Wrapping FORECAST.ETS in MAP allows spilling forecast estimates across an entire column of future projected dates dynamically."
      },
      {
        question: "What does Beta parameter (Code 2) in FORECAST.ETS.STAT represent?",
        options: ["Trend smoothing coefficient", "Seasonality multiplier", "Alpha intercept", "Mean error"],
        correctAnswer: 0,
        explanation: "Beta controls how quickly the algorithm adapts to changes in the underlying slope or growth trend."
      },
      {
        question: "If a company has 36 months of historical data, which target date should be supplied to forecast Month 37?",
        options: ["The exact serial date of Month 37", "The number 37", "\"Month 37\"", "TODAY()"],
        correctAnswer: 0,
        explanation: "The target_date must be a valid Excel date serial corresponding to the exact next step in the timeline."
      },
      {
        question: "Why should corporate financial analysts combine FORECAST.ETS with FORECAST.ETS.CONFINT?",
        options: ["To provide risk-adjusted scenario bands (Base, Bull, Bear cases) based on statistical confidence", "To satisfy audit checklists only", "To speed up calculation", "To prevent #REF! errors"],
        correctAnswer: 0,
        explanation: "Combining point forecasts with upper and lower confidence intervals creates rigorous, data-backed financial scenarios (Base case, Optimistic 95% bound, Pessimistic 95% bound) for executive risk assessment."
      }
    ]
  },

  // 2. 002_004 Topic 40: LINEST and LOGEST
  {
    moduleDir: '002_004_statistical-functions-for-data-analysis',
    topicIndex: 40,
    title: 'Multiple Linear & Non-Linear Regression ANOVA',
    subtitle: 'Full matrix coefficient, standard error, and R-squared analysis with LINEST and LOGEST',
    workbookName: 'statistical_functions_for_data_analysis_master.xlsx',
    sheetName: 'Topic40_Linest_Logest',
    formulaSig: '=LINEST(known_y\'s, [known_x\'s], [const], [stats])',
    formulaDetails: 'Calculates the statistics for a line by using the least squares method to find a straight line that best fits your data, returning an array describing the line.',
    questions: [
      {
        question: "What does LINEST calculate in Excel?",
        options: ["Ordinary Least Squares (OLS) multiple linear regression statistics", "Logarithmic moving averages", "Non-parametric rank correlation", "Simple linear interpolation"],
        correctAnswer: 0,
        explanation: "LINEST calculates the statistics for a straight line using the least squares method to fit known_y's against one or more known_x's."
      },
      {
        question: "When stats is set to TRUE in =LINEST(y, x, TRUE, TRUE), what matrix dimensions does LINEST return for a single independent variable (1 X)?",
        options: ["5 rows by 2 columns", "2 rows by 2 columns", "1 row by 5 columns", "10 rows by 1 column"],
        correctAnswer: 0,
        explanation: "For single X regression with stats=TRUE, LINEST outputs a 5-row by 2-column statistical table containing slope, intercept, standard errors, R^2, F-statistic, df, and sum of squares."
      },
      {
        question: "In the 5x2 LINEST output matrix, which cell contains the coefficient of determination (R-squared)?",
        options: ["Row 3, Column 1", "Row 1, Column 1", "Row 5, Column 2", "Row 2, Column 1"],
        correctAnswer: 0,
        explanation: "In the standard LINEST matrix, Row 3, Col 1 contains R^2, and Row 3, Col 2 contains the standard error of the y estimate (se_y)."
      },
      {
        question: "In the LINEST output table, which cell contains the F-statistic?",
        options: ["Row 4, Column 1", "Row 1, Column 2", "Row 3, Column 1", "Row 5, Column 1"],
        correctAnswer: 0,
        explanation: "Row 4, Col 1 displays the overall F-statistic used to test statistical significance of the regression model."
      },
      {
        question: "What does Row 4, Column 2 in LINEST output represent?",
        options: ["Degrees of Freedom (df = n - k - 1)", "P-value", "Total observations", "Correlation coefficient"],
        correctAnswer: 0,
        explanation: "Row 4, Col 2 contains the residual degrees of freedom (df), equal to sample size minus number of predictors minus 1."
      },
      {
        question: "How are slope coefficients ordered in the first row of a multiple regression LINEST output with 3 independent variables (X1, X2, X3)?",
        options: ["Reversed order: [Slope_X3, Slope_X2, Slope_X1, Intercept]", "Normal order: [Slope_X1, Slope_X2, Slope_X3, Intercept]", "Sorted by magnitude", "Alphabetically"],
        correctAnswer: 0,
        explanation: "Excel outputs regression coefficients in reverse order from right-to-left: [m_k, m_(k-1), ..., m_1, b]."
      },
      {
        question: "What is the equivalent function to LINEST for exponential/logarithmic growth models (y = b * m^x)?",
        options: ["LOGEST()", "EXPONEST()", "GROWTH()", "LOGREG()"],
        correctAnswer: 0,
        explanation: "LOGEST fits an exponential curve y = b * m^x to data using logarithmic transformation and outputs the regression statistics matrix."
      },
      {
        question: "What does setting the const argument to FALSE in LINEST enforce?",
        options: ["Forces the y-intercept (b) to 0 (y = m*x + 0)", "Forces slope to 1", "Disables ANOVA statistics", "Normalizes x values"],
        correctAnswer: 0,
        explanation: "Setting const = FALSE forces the regression line through the origin (b = 0)."
      },
      {
        question: "What value does Row 5, Column 1 in the LINEST output table contain?",
        options: ["Regression Sum of Squares (SS_reg)", "Residual Sum of Squares (SS_resid)", "Total Variance", "Covariance"],
        correctAnswer: 0,
        explanation: "Row 5, Col 1 contains the regression sum of squares (SS_reg), while Row 5, Col 2 contains the residual sum of squares (SS_resid)."
      },
      {
        question: "In modern Excel 365, how does LINEST return its multi-cell statistical table?",
        options: ["Automatically spills into adjacent cells as a dynamic array", "Requires pressing Ctrl+Shift+Enter", "Only returns the first cell unless concatenated", "Requires a macro"],
        correctAnswer: 0,
        explanation: "In modern Excel dynamic arrays, LINEST automatically spills the entire 5-row regression table into the sheet without legacy CSE keystrokes."
      },
      {
        question: "How can you extract specifically the R-squared value from a spilled LINEST formula in cell A10#?",
        options: ["=INDEX(A10#, 3, 1)", "=A10#R2", "=CHOOSE(A10#, 3)", "=VLOOKUP(\"R2\", A10#, 1)"],
        correctAnswer: 0,
        explanation: "=INDEX(A10#, 3, 1) extracts Row 3, Column 1 (R^2) directly from the spilled array."
      },
      {
        question: "How do you calculate the P-value of the overall regression model using LINEST output in A10#?",
        options: ["=F.DIST.RT(INDEX(A10#, 4, 1), INDEX(A10#, 4, 2), ...)", "=PVALUE(A10#)", "=T.DIST(A10#)", "=CHISQ.TEST(A10#)"],
        correctAnswer: 0,
        explanation: "Passing the F-statistic (Row 4, Col 1) and degrees of freedom (Row 4, Col 2) to =F.DIST.RT(F_stat, df1, df2) computes the exact statistical P-value."
      },
      {
        question: "What happens if independent variables in known_x's are collinear (one column is an exact linear combination of another)?",
        options: ["LINEST drops redundant columns and sets their coefficients to 0 with standard error 0", "Crashes Excel", "Returns #DIV/0!", "Returns negative R^2"],
        correctAnswer: 0,
        explanation: "LINEST detects exact multicollinearity and zeroes out the redundant predictor coefficients while continuing regression on independent columns."
      },
      {
        question: "What is the purpose of Row 2 in the LINEST output table?",
        options: ["Contains standard errors for each coefficient (se_k, ..., se_1, se_b)", "Contains p-values", "Contains residuals", "Contains medians"],
        correctAnswer: 0,
        explanation: "Row 2 provides standard error estimates corresponding to each slope coefficient and the intercept."
      },
      {
        question: "How do you calculate the t-statistic for the first independent variable slope (m1)?",
        options: ["=Slope_m1 / Standard_Error_m1", "=Slope_m1 * Standard_Error_m1", "=R2 / df", "=F_stat / 2"],
        correctAnswer: 0,
        explanation: "The t-statistic for any regression coefficient equals the coefficient estimate divided by its standard error (t = m / se_m)."
      },
      {
        question: "What formula extracts the y-intercept value from a single-variable LINEST in A10#?",
        options: ["=INDEX(A10#, 1, 2)", "=INDEX(A10#, 1, 1)", "=INDEX(A10#, 2, 1)", "=INDEX(A10#, 5, 2)"],
        correctAnswer: 0,
        explanation: "For single X, Row 1 Column 1 is slope m, and Row 1 Column 2 is intercept b."
      },
      {
        question: "How does LOGEST differ from LINEST mathematically?",
        options: ["LOGEST models exponential growth y = b * m^x by running linear regression on ln(y)", "LOGEST only handles binary data", "LOGEST calculates logarithms of column headers", "LOGEST is restricted to 1 variable"],
        correctAnswer: 0,
        explanation: "LOGEST fits exponential curves by internally applying natural log transformation ln(y) = ln(b) + x*ln(m) and converting back via EXP."
      },
      {
        question: "What is the baseline relationship between Total Sum of Squares (SS_tot), SS_reg, and SS_resid in LINEST?",
        options: ["SS_tot = SS_reg + SS_resid", "SS_tot = SS_reg * SS_resid", "SS_tot = SS_reg / SS_resid", "SS_tot = SS_reg - SS_resid"],
        correctAnswer: 0,
        explanation: "In ANOVA decomposition, Total Sum of Squares equals Explained Regression Sum of Squares plus Unexplained Residual Sum of Squares."
      },
      {
        question: "What does an R-squared of 0.85 indicate in an employee productivity regression model at Coder & AccoTax?",
        options: ["85% of the variance in productivity is explained by the independent variables in the model", "The model is 85% wrong", "The slope is 0.85", "There are 85 data rows"],
        correctAnswer: 0,
        explanation: "R^2 measures the proportion of total variance in the dependent variable explained by the regression predictors."
      },
      {
        question: "Which function directly computes predicted Y values along an exponential trendline for new X points without manual matrix extraction?",
        options: ["GROWTH()", "TREND()", "LINEST()", "FORECAST()"],
        correctAnswer: 0,
        explanation: "GROWTH(known_y's, known_x's, new_x's) calculates predicted values along an exponential curve directly."
      },
      {
        question: "Which companion function directly computes predicted Y values along a linear regression trendline for new X points?",
        options: ["TREND()", "GROWTH()", "SLOPE()", "INTERCEPT()"],
        correctAnswer: 0,
        explanation: "TREND(known_y's, known_x's, new_x's) evaluates linear regression projections directly for new input coordinates."
      },
      {
        question: "What error occurs if known_y's contains negative or zero values when running LOGEST?",
        options: ["#NUM!", "#VALUE!", "#N/A", "#REF!"],
        correctAnswer: 0,
        explanation: "LOGEST requires taking logarithms of y values; non-positive values (<= 0) produce a #NUM! error."
      },
      {
        question: "What is the maximum number of independent variables (X columns) LINEST can process in modern 64-bit Excel?",
        options: ["Up to 64 independent variables", "Only 2", "16", "Unlimited (up to sheet column limits)"],
        correctAnswer: 0,
        explanation: "Excel LINEST can handle up to 64 independent predictor variables simultaneously."
      },
      {
        question: "How do you test if an individual regression slope coefficient is statistically significant at alpha = 0.05?",
        options: ["Compute P-value with =2*(1 - T.DIST(ABS(t_stat), df, TRUE)) and verify P < 0.05", "Check if slope > 0", "Check if R^2 > 0.5", "Check if F > 1"],
        correctAnswer: 0,
        explanation: "A two-tailed t-distribution test computes the exact p-value; if p < 0.05, the coefficient is statistically significant."
      },
      {
        question: "In polynomial regression (e.g. y = m1*x + m2*x^2 + b), how can known_x's be passed to LINEST?",
        options: ["=LINEST(y_range, x_range^{1, 2})", "=LINEST(y_range, x_range * 2)", "=LINEST(y_range, SQRT(x_range))", "=LINEST(y_range, POWER(x_range))"],
        correctAnswer: 0,
        explanation: "Passing an array constant exponent x_range^{1, 2} expands the X range into linear and quadratic columns, fitting a second-degree polynomial in one formula."
      },
      {
        question: "What does the standard error of the estimate (se_y in Row 3, Col 2) represent?",
        options: ["The average distance that the observed values fall from the regression line", "The total error of Excel's CPU", "The error in column headers", "The sample mean"],
        correctAnswer: 0,
        explanation: "se_y measures the standard deviation of data residuals around the fitted regression plane."
      },
      {
        question: "Why is LINEST superior to using separate =SLOPE() and =INTERCEPT() functions in financial econometrics?",
        options: ["LINEST provides full ANOVA inferential diagnostics (F-stat, R^2, standard errors) and handles multi-variable regression", "LINEST rounds faster", "SLOPE is deprecated", "INTERCEPT cannot handle negative numbers"],
        correctAnswer: 0,
        explanation: "SLOPE and INTERCEPT only support single-variable models without standard errors or ANOVA validation; LINEST supports multi-variable models with full statistical confidence metrics."
      },
      {
        question: "What is the relationship between the F-statistic and t-statistic in a single-predictor linear regression?",
        options: ["F = t^2", "F = t / 2", "F = 2 * t", "F = SQRT(t)"],
        correctAnswer: 0,
        explanation: "In simple single-variable linear regression, the overall F-statistic is mathematically identical to the square of the predictor's t-statistic (F = t^2)."
      },
      {
        question: "How can you dynamically extract all slope coefficients into a clean vertical list using dynamic array reshaping?",
        options: ["=TOCOL(CHOOSEROWS(LINEST(y, x), 1))", "=TRANSPOSE(LINEST(y, x))", "=FILTER(LINEST(y,x), 1)", "=TAKE(LINEST(y,x), 1)"],
        correctAnswer: 0,
        explanation: "CHOOSEROWS(..., 1) extracts the top row of coefficients, and TOCOL transposes them into a clean vertical vector."
      },
      {
        question: "Why should analysts check residual sum of squares (SS_resid) in Row 5, Col 2 when comparing competing regression models?",
        options: ["Lower SS_resid indicates a closer fit to the historical data with less unexplained variance", "Higher SS_resid is always better", "SS_resid determines tax rate", "SS_resid must equal 100"],
        correctAnswer: 0,
        explanation: "SS_resid quantifies the total squared error unexplained by the model; smaller values indicate superior descriptive fit."
      }
    ]
  }
];

console.log('Generating Topic 39 & 40 files for 002_004...');
// We will write the full generator for all topics
