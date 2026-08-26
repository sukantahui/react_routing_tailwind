const questions = [
  {
    question: "What does the TREND function do?",
    shortAnswer: "Returns predicted y‑values along a linear trend line, for one or more new x values.",
    explanation: "It fits a straight line (least squares) to known data and can output an array of fitted or forecasted values.",
    level: "basic",
    codeExample: "=TREND(B2:B11, A2:A11, C2:C4)"
  },
  {
    question: "How is TREND different from FORECAST.LINEAR?",
    shortAnswer: "FORECAST.LINEAR predicts a single y; TREND can predict multiple y's at once (as an array).",
    explanation: "TREND is the array version of linear forecasting.",
    level: "basic",
    codeExample: "TREND can handle a range of new_x's in one formula."
  },
  {
    question: "What are the required arguments of TREND?",
    shortAnswer: "Only known_y's is mandatory; known_x's is optional (if omitted, Excel uses {1,2,3,...}).",
    explanation: "For simple x, you can leave known_x's blank.",
    level: "basic",
    codeExample: "=TREND(B2:B11) assumes x = 1,2,3,..."
  },
  {
    question: "What does the `new_x's` parameter do?",
    shortAnswer: "It specifies the x-values for which you want predicted y-values.",
    explanation: "If omitted, TREND returns the fitted values for the original known_x's.",
    level: "basic",
    codeExample: "=TREND(y, x, new_x)"
  },
  {
    question: "What does the `const` argument control?",
    shortAnswer: "If TRUE (default), the line uses the calculated intercept; if FALSE, forces the line through the origin (intercept = 0).",
    explanation: "Use FALSE when you know the relationship passes through (0,0).",
    level: "intermediate",
    codeExample: "=TREND(y, x, new_x, FALSE)"
  },
  {
    question: "Does TREND work in Excel 2016 (non‑365) as a dynamic array?",
    shortAnswer: "No, in older Excel, TREND is an array formula that must be entered with Ctrl+Shift+Enter.",
    explanation: "You must select enough cells and press Ctrl+Shift+Enter to see all results.",
    level: "intermediate",
    codeExample: "Select multiple cells, type formula, press Ctrl+Shift+Enter."
  },
  {
    question: "What happens if the new_x's range is larger than the number of selected output cells in array formula?",
    shortAnswer: "Results are truncated; only the number of selected cells are filled.",
    explanation: "Always select enough cells to hold the entire TREND output.",
    level: "intermediate",
    codeExample: "If you select 3 cells but TREND returns 5 values, you see only the first 3."
  },
  {
    question: "Can TREND be used with dates?",
    shortAnswer: "Yes, dates are serial numbers, so TREND works with dates as x-values.",
    explanation: "Forecast for future dates works, but careful with formatting.",
    level: "intermediate",
    codeExample: "=TREND(sales, dates, DATE(2025,12,31))"
  },
  {
    question: "Does TREND ignore text and blanks?",
    shortAnswer: "Yes, pairwise deletion: rows with non‑numeric in known_y's or known_x's are ignored.",
    explanation: "Only complete rows are used to calculate the trend line.",
    level: "basic",
    codeExample: "Headers are safe to include."
  },
  {
    question: "What is the difference between TREND and GROWTH?",
    shortAnswer: "TREND fits a linear line (y = a + bx); GROWTH fits an exponential curve (y = b * m^x).",
    explanation: "Use GROWTH for exponential growth data (compound interest, population).",
    level: "advanced",
    codeExample: "=GROWTH(y, x, new_x) for exponential."
  },
  {
    question: "How to get the intercept and slope from TREND?",
    shortAnswer: "TREND does not directly output slope or intercept; use SLOPE and INTERCEPT or LINEST instead.",
    explanation: "LINEST returns multiple statistics including slope and intercept.",
    level: "advanced",
    codeExample: "=LINEST(known_y's, known_x's) gives slope, intercept."
  },
  {
    question: "What does TREND return if new_x's has the same shape as known_x's?",
    shortAnswer: "It returns the fitted y-values for each original x (i.e., the points on the regression line).",
    explanation: "Useful for adding a trendline to a scatter plot.",
    level: "basic",
    codeExample: "=TREND(y, x) returns the fitted values."
  },
  {
    question: "Is TREND a volatile function?",
    shortAnswer: "No, it recalculates only when input data changes.",
    explanation: "Non‑volatile, safe for large workbooks.",
    level: "basic",
    codeExample: "Safe."
  },
  {
    question: "Can TREND be used with multiple independent variables (multiple regression)?",
    shortAnswer: "Yes, known_x's can be a multi‑column range for multiple regression.",
    explanation: "TREND can handle multiple x variables (linear regression).",
    level: "expert",
    codeExample: "=TREND(y, {x1, x2}, new_x_range)"
  },
  {
    question: "What is the shape of the result from TREND when new_x's is a row vector?",
    shortAnswer: "TREND returns a row vector (horizontal spill) if known_x's was horizontal and new_x's is also horizontal.",
    explanation: "The shape matches the input new_x's orientation.",
    level: "advanced",
    codeExample: "Use TRANSPOSE if needed."
  },
  {
    question: "What error does TREND return if there are insufficient data points?",
    shortAnswer: "#N/A (needs at least two distinct points to define a line).",
    explanation: "A line requires at least two non‑identical x-values.",
    level: "basic",
    codeExample: "=TREND({5,6}, {1,1}) → #N/A"
  },
  {
    question: "How to forecast multiple future periods (e.g., months 7-12) with TREND?",
    shortAnswer: "Supply an array of new x's: =TREND(y, x, SEQUENCE(6,1,7,1)).",
    explanation: "SEQUENCE in 365 generates the future months; in older Excel, use ROW(1:6)+6.",
    level: "advanced",
    codeExample: "=TREND(B2:B7, A2:A7, ROW(7:12)) as array formula."
  },
  {
    question: "How does TREND handle non‑numeric values in new_x's?",
    shortAnswer: "It ignores them and returns #N/A for those positions.",
    explanation: "Ensure all new_x values are numeric.",
    level: "intermediate",
    codeExample: "Clean data before forecasting."
  },
  {
    question: "Can TREND return a different number of results than the number of new_x's?",
    shortAnswer: "No, the output size always matches the number of values in new_x's (or known_x's if new_x's omitted).",
    explanation: "One prediction per new x-value.",
    level: "basic",
    codeExample: "If new_x's has 5 rows, TREND returns 5 values."
  },
  {
    question: "What is the relationship between TREND and LINEST?",
    shortAnswer: "TREND = LINEST (for prediction) is essentially: =INTERCEPT + SLOPE * new_x.",
    explanation: "LINEST provides more detailed regression statistics.",
    level: "advanced",
    codeExample: "=LINEST(known_y's, known_x's, const, TRUE) returns array of stats."
  },
  {
    question: "Can TREND be used in conditional formatting to highlight deviations from trend?",
    shortAnswer: "Yes, compute residuals by subtracting TREND values from actual values, then highlight large residuals.",
    explanation: "=ABS(actual - TREND(...)) > threshold.",
    level: "expert",
    codeExample: "Use in helper column."
  },
  {
    question: "Does TREND require that known_x's and known_y's are ranges of the same size?",
    shortAnswer: "Yes, they must have the same number of rows (or columns) after ignoring non‑numeric cells.",
    explanation: "Mismatched sizes cause #REF! or #N/A.",
    level: "basic",
    codeExample: "Always keep them aligned."
  },
  {
    question: "How can you get the R² value from a TREND forecast?",
    shortAnswer: "Use RSQ(known_y's, fitted_y's) where fitted_y's = TREND(known_y's, known_x's).",
    explanation: "R² measures how well the line fits the data.",
    level: "advanced",
    codeExample: "=RSQ(B2:B11, TREND(B2:B11, A2:A11))"
  },
  {
    question: "What is the advantage of using TREND over FORECAST.LINEAR for multiple predictions?",
    shortAnswer: "TREND uses one formula, making the sheet cleaner and reducing errors.",
    explanation: "You also avoid copying formulas.",
    level: "intermediate",
    codeExample: "Less manual work."
  },
  {
    question: "Can TREND forecast only future values, or also interpolate missing past values?",
    shortAnswer: "Both. If you supply missing x's that fall within the original range, TREND interpolates.",
    explanation: "Interpolation is just forecasting within the existing range.",
    level: "intermediate",
    codeExample: "=TREND(y,x, {2.5, 4.5}) gives interpolated values."
  },
  {
    question: "What does `const = FALSE` do if the data naturally has a non‑zero intercept?",
    shortAnswer: "It forces the line through zero, which can produce biased forecasts.",
    explanation: "Use only when domain knowledge tells you the intercept must be zero.",
    level: "advanced",
    codeExample: "Example: cost = variable cost * units (fixed cost zero)."
  },
  {
    question: "Why might TREND return #DIV/0! even with valid data?",
    shortAnswer: "If known_x's has no variance (all same value), the slope is undefined.",
    explanation: "Check that x-values are not constant.",
    level: "basic",
    codeExample: "Use distinct x-values."
  },
  {
    question: "How can you use TREND to forecast based on time periods that are not equally spaced?",
    shortAnswer: "TREND works with any numeric x-values; spacing does not matter.",
    explanation: "It uses the actual x numbers, not their order.",
    level: "intermediate",
    codeExample: "x = {1.3, 2.7, 5.0, 8.2} works fine."
  },
  {
    question: "Is there an alternative to TREND in Excel 365 that also provides confidence intervals?",
    shortAnswer: "FORECAST.ETS.CONFINT works with seasonal data; for linear, you need custom formulas with LINEST.",
    explanation: "TREND itself does not give confidence bands.",
    level: "expert",
    codeExample: "Use LINEST to obtain standard errors."
  },
  {
    question: "Can TREND be used to smooth data (i.e., replace actuals with fitted values)?",
    shortAnswer: "Yes, =TREND(known_y's, known_x's) returns the fitted values, which can be used as smoothed trend.",
    explanation: "This removes some noise and highlights the underlying linear trend.",
    level: "intermediate",
    codeExample: "Useful for dashboards."
  }
];

export default questions;