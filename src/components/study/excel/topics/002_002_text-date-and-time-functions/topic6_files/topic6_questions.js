// Topic 6 Questions
const topic6Questions = [
  {
    "id": "t6_q1",
    "question": "What is the syntax of the undocumented DATEDIF function in Excel, and why is it not listed in the standard formula autocomplete dropdown?",
    "shortAnswer": "Syntax: =DATEDIF(start_date, end_date, unit). It is kept unlisted for legacy compatibility with Lotus 1-2-3.",
    "explanation": "DATEDIF is a legacy compatibility function. It calculates the difference between two dates in specified units: \"Y\" (complete years), \"M\" (complete months), \"D\" (days), \"YM\" (months excluding years), \"YD\" (days excluding years), and \"MD\" (days excluding months and years).",
    "hint": "Units: \"Y\", \"M\", \"D\", \"YM\", \"YD\", \"MD\".",
    "level": "Beginner",
    "codeExample": "=DATEDIF(A2, B2, \"Y\")  ' Completed years"
  },
  {
    "id": "t6_q2",
    "question": "Why does Microsoft officially caution against using the \"MD\" unit in the DATEDIF function?",
    "shortAnswer": "The \"MD\" unit contains a known calculation bug that can return negative numbers, zero, or incorrect day counts when month lengths vary.",
    "explanation": "When calculating the remaining days ignoring months (unit \"MD\"), differences between 28/29, 30, and 31-day months frequently produce erroneous results. Microsoft recommends using DAY arithmetic or DATE subtractions instead of unit \"MD\".",
    "hint": "Avoid unit \"MD\" in DATEDIF due to historical calculation bugs.",
    "level": "Intermediate",
    "codeExample": "=DATEDIF(A2, B2, \"YM\")  ' Safe for months; avoid \"MD\""
  },
  {
    "id": "t6_q3",
    "question": "What is the YEARFRAC function, and what does the optional [basis] argument control?",
    "shortAnswer": "YEARFRAC calculates the exact fractional proportion of a year between two dates using specific financial day-count conventions.",
    "explanation": "Syntax: =YEARFRAC(start_date, end_date, [basis]). Basis values: 0 (or omitted) = US (NASD) 30/360; 1 = Actual/actual; 2 = Actual/360; 3 = Actual/365; 4 = European 30/360. Basis 1 is standard for bond pricing and exact annualized returns.",
    "hint": "Basis 1 = Actual/Actual (standard financial precision).",
    "level": "Intermediate",
    "codeExample": "=YEARFRAC(A2, B2, 1)  ' Exact fractional years"
  },
  {
    "id": "t6_q4",
    "question": "How do you calculate a formatted tenure string showing years and months (e.g. \"5 Years, 3 Months\") using DATEDIF?",
    "shortAnswer": "Concatenate DATEDIF with unit \"Y\" and DATEDIF with unit \"YM\".",
    "explanation": "=DATEDIF(A2, B2, \"Y\") & \" Years, \" & DATEDIF(A2, B2, \"YM\") & \" Months\". This displays full completed years followed by the remaining completed months.",
    "hint": "Combine \"Y\" and \"YM\" units.",
    "level": "Beginner",
    "codeExample": "=DATEDIF(A2, TODAY(), \"Y\") & \" Yrs, \" & DATEDIF(A2, TODAY(), \"YM\") & \" Mos\""
  },
  {
    "id": "t6_q5",
    "question": "What happens in DATEDIF if start_date is greater than end_date?",
    "shortAnswer": "DATEDIF throws a #NUM! error.",
    "explanation": "Unlike simple subtraction (which returns negative numbers), DATEDIF strictly requires start_date <= end_date. If reversed, Excel throws #NUM!. To prevent errors, sort dates or use =DATEDIF(MIN(A2,B2), MAX(A2,B2), \"Y\").",
    "hint": "DATEDIF requires start <= end, otherwise throws #NUM!.",
    "level": "Beginner",
    "codeExample": "=DATEDIF(MIN(A2, B2), MAX(A2, B2), \"Y\")"
  },
  {
    "id": "t6_q6",
    "question": "How do you calculate exact age in decimal format (e.g. 28.42 years) using YEARFRAC?",
    "shortAnswer": "Use =YEARFRAC(birth_date, TODAY(), 1).",
    "explanation": "Basis 1 (Actual/Actual) computes the exact day fraction over 365 or 366 days, providing high-precision decimal age for actuarial, insurance, and medical calculations.",
    "hint": "=YEARFRAC(DOB, TODAY(), 1)",
    "level": "Beginner",
    "codeExample": "=ROUND(YEARFRAC(tblPatients[DOB], TODAY(), 1), 2)"
  },
  {
    "id": "t6_q7",
    "question": "What is the difference between DATEDIF(start, end, \"M\") vs (YEAR(end)-YEAR(start))*12 + MONTH(end)-MONTH(start)?",
    "shortAnswer": "DATEDIF counts full completed calendar months based on day of month; mathematical year/month subtraction ignores day of month.",
    "explanation": "From Jan 31 to Feb 28: DATEDIF(\"M\") returns 0 because a full month has not elapsed. The math formula returns (2024-2024)*12 + (2-1) = 1 month. DATEDIF is strictly anniversary-based.",
    "hint": "DATEDIF is anniversary-accurate; math subtraction ignores day of month.",
    "level": "Intermediate",
    "codeExample": "=DATEDIF(A2, B2, \"M\")  ' Anniversary-based full months"
  },
  {
    "id": "t6_q8",
    "question": "How do you calculate annualized compound investment return (CAGR) using YEARFRAC?",
    "shortAnswer": "Use the CAGR formula: =(EndValue / StartValue) ^ (1 / YEARFRAC(StartDate, EndDate, 1)) - 1.",
    "explanation": "YEARFRAC computes the precise elapsed years N. The standard CAGR formula is (Ending Value / Beginning Value)^(1/N) - 1.",
    "hint": "CAGR = (EndVal / StartVal)^(1 / YEARFRAC(start, end, 1)) - 1",
    "level": "Advanced",
    "codeExample": "=(B2 / A2) ^ (1 / YEARFRAC(C2, D2, 1)) - 1"
  },
  {
    "id": "t6_q9",
    "question": "How do you calculate remaining months in the current year using DATEDIF?",
    "shortAnswer": "Use =DATEDIF(TODAY(), DATE(YEAR(TODAY()), 12, 31), \"M\").",
    "explanation": "This computes full completed months between today and December 31 of the current year.",
    "hint": "=DATEDIF(TODAY(), DATE(YEAR(TODAY()), 12, 31), \"M\")",
    "level": "Beginner",
    "codeExample": "=DATEDIF(TODAY(), DATE(YEAR(TODAY()), 12, 31), \"M\")"
  },
  {
    "id": "t6_q10",
    "question": "What does unit \"YM\" calculate in DATEDIF?",
    "shortAnswer": "The difference between the months in start_date and end_date, as if the dates were in the same year.",
    "explanation": "If start date is May 10, 2020 and end date is August 15, 2024, unit \"YM\" ignores the 4-year difference and computes completed months from May to August = 3 months.",
    "hint": "\"YM\" = Months difference ignoring years.",
    "level": "Intermediate",
    "codeExample": "=DATEDIF(DATE(2020,5,10), DATE(2024,8,15), \"YM\")  ' Returns 3"
  },
  {
    "id": "t6_q11",
    "question": "What does unit \"YD\" calculate in DATEDIF?",
    "shortAnswer": "The difference between the days in start_date and end_date, as if the dates were in the same year.",
    "explanation": "It calculates elapsed days ignoring the year component. For example, from Jan 1, 2020 to Feb 1, 2024, unit \"YD\" evaluates Jan 1 to Feb 1 = 31 days.",
    "hint": "\"YD\" = Days difference ignoring years.",
    "level": "Intermediate",
    "codeExample": "=DATEDIF(A2, B2, \"YD\")"
  },
  {
    "id": "t6_q12",
    "question": "How do you calculate employee gratuity eligibility (minimum 5 continuous completed years) using DATEDIF?",
    "shortAnswer": "Use =IF(DATEDIF(joining_date, exit_date, \"Y\") >= 5, \"Eligible for Gratuity\", \"Not Eligible\").",
    "explanation": "Under Indian labor law, gratuity requires 5 complete years of service. DATEDIF(\"Y\") verifies completed years accurately against the employee's joining anniversary.",
    "hint": "=IF(DATEDIF(join, exit, \"Y\") >= 5, \"Eligible\", \"Not Eligible\")",
    "level": "Beginner",
    "codeExample": "=IF(DATEDIF(tblStaff[JoinDate], tblStaff[ExitDate], \"Y\")>=5, \"Eligible\", \"Ineligible\")"
  },
  {
    "id": "t6_q13",
    "question": "How do you calculate equipment depreciation for partial years using YEARFRAC?",
    "shortAnswer": "Multiply annual depreciation rate by YEARFRAC(asset_start_date, period_end_date, 1).",
    "explanation": "=AssetCost * DepreciationRate * YEARFRAC(PurchaseDate, FiscalYearEnd, 1). This allocates pro-rata straight-line depreciation for assets placed in service mid-year.",
    "hint": "Pro-rata Depreciation = Annual Depreciation * YEARFRAC(start, end, 1).",
    "level": "Intermediate",
    "codeExample": "=tblAssets[Cost] * tblAssets[Rate] * YEARFRAC(tblAssets[PurchaseDate], $B$1, 1)"
  },
  {
    "id": "t6_q14",
    "question": "What is the difference between YEARFRAC basis 0 (30/360 US) and basis 4 (30/360 European)?",
    "shortAnswer": "Basis 0 adjusts dates falling on the 31st according to US NASD rules; Basis 4 treats all 31st dates as the 30th per European convention.",
    "explanation": "In US 30/360 (basis 0), if start date is 31st, it becomes 30th; if end date is 31st and start date < 30th, end date stays 31st. In European 30/360 (basis 4), any 31st is unconditionally treated as 30th.",
    "hint": "Basis 0 = US 30/360; Basis 4 = European 30/360.",
    "level": "Advanced",
    "codeExample": "=YEARFRAC(A2, B2, 0)  ' US vs =YEARFRAC(A2, B2, 4) ' European"
  },
  {
    "id": "t6_q15",
    "question": "How do you calculate customer churn cohort intervals (e.g. 0-30 days, 31-60 days, 61-90 days, >90 days)?",
    "shortAnswer": "Subtract last active date from TODAY() and categorize using IFS or VLOOKUP.",
    "explanation": "=IFS(TODAY()-A2<=30, \"0-30 Days\", TODAY()-A2<=60, \"31-60 Days\", TODAY()-A2<=90, \"61-90 Days\", TRUE, \">90 Days\").",
    "hint": "Subtract date from TODAY() inside IFS.",
    "level": "Beginner",
    "codeExample": "=IFS(TODAY()-A2<=30, \"0-30 Days\", TODAY()-A2<=60, \"31-60 Days\", TRUE, \">60 Days\")"
  },
  {
    "id": "t6_q16",
    "question": "How do you calculate how many full quarters have elapsed between two dates?",
    "shortAnswer": "Use =INT(DATEDIF(start_date, end_date, \"M\") / 3).",
    "explanation": "DATEDIF with \"M\" returns complete elapsed months. Dividing by 3 and applying INT() returns the exact count of full 3-month quarters completed.",
    "hint": "=INT(DATEDIF(start, end, \"M\") / 3)",
    "level": "Intermediate",
    "codeExample": "=INT(DATEDIF(A2, B2, \"M\") / 3)"
  },
  {
    "id": "t6_q17",
    "question": "How do you safely replace the buggy DATEDIF \"MD\" unit to calculate remaining days in a completed year/month/day tenure string?",
    "shortAnswer": "Subtract the anniversary date computed via EDATE from the end date.",
    "explanation": "Formula for remaining days: =B2 - EDATE(A2, DATEDIF(A2, B2, \"M\")). This adds all completed months to start date A2 using EDATE, and subtracts that exact milestone from end date B2, guaranteeing zero bugs.",
    "hint": "Remaining Days = EndDate - EDATE(StartDate, DATEDIF(\"M\")).",
    "level": "Advanced",
    "codeExample": "=B2 - EDATE(A2, DATEDIF(A2, B2, \"M\"))"
  },
  {
    "id": "t6_q18",
    "question": "How do you calculate annualized portfolio volatility using daily standard deviation and YEARFRAC?",
    "shortAnswer": "Multiply daily standard deviation by the square root of annual trading days (typically SQRT(252)).",
    "explanation": "=STDEV.S(tblReturns[Daily]) * SQRT(252). In financial modeling, 252 represents standard annual trading days.",
    "hint": "Annualized Volatility = Daily StDev * SQRT(252).",
    "level": "Advanced",
    "codeExample": "=STDEV.S(A2:A250) * SQRT(252)"
  },
  {
    "id": "t6_q19",
    "question": "How can you check if an employee's work anniversary is occurring in the current calendar month?",
    "shortAnswer": "Use =MONTH(joining_date) = MONTH(TODAY()).",
    "explanation": "Extracting MONTH(A2) and comparing with MONTH(TODAY()) identifies all employees who joined in the current month across any previous year.",
    "hint": "=MONTH(JoinDate) = MONTH(TODAY())",
    "level": "Beginner",
    "codeExample": "=IF(MONTH(A2)=MONTH(TODAY()), \"Anniversary This Month\", \"\")"
  },
  {
    "id": "t6_q20",
    "question": "How do you calculate the exact date of a person's upcoming next birthday?",
    "shortAnswer": "Construct a date using current year, and if already passed, advance to next year.",
    "explanation": "=LET(thisBday, DATE(YEAR(TODAY()), MONTH(A2), DAY(A2)), IF(thisBday >= TODAY(), thisBday, DATE(YEAR(TODAY()) + 1, MONTH(A2), DAY(A2)))).",
    "hint": "Check IF(thisBday >= TODAY, thisBday, nextYearBday).",
    "level": "Intermediate",
    "codeExample": "=LET(b, DATE(YEAR(TODAY()), MONTH(A2), DAY(A2)), IF(b>=TODAY(), b, DATE(YEAR(TODAY())+1, MONTH(A2), DAY(A2))))"
  },
  {
    "id": "t6_q21",
    "question": "How do you calculate how many days remain until a person's next birthday?",
    "shortAnswer": "Subtract TODAY() from the computed next birthday date.",
    "explanation": "=LET(b, DATE(YEAR(TODAY()), MONTH(A2), DAY(A2)), nextB, IF(b>=TODAY(), b, DATE(YEAR(TODAY())+1, MONTH(A2), DAY(A2))), nextB - TODAY()).",
    "hint": "Next Birthday - TODAY()",
    "level": "Intermediate",
    "codeExample": "=LET(b, DATE(YEAR(TODAY()), MONTH(A2), DAY(A2)), IF(b>=TODAY(), b, DATE(YEAR(TODAY())+1, MONTH(A2), DAY(A2))) - TODAY())"
  },
  {
    "id": "t6_q22",
    "question": "How do you calculate lease expiration notices 90 days before lease end date?",
    "shortAnswer": "Use =lease_end_date - 90 <= TODAY().",
    "explanation": "If lease end date minus 90 days is less than or equal to today, the lease has entered the 90-day renewal notice window.",
    "hint": "=A2 - 90 <= TODAY()",
    "level": "Beginner",
    "codeExample": "=IF(A2-90<=TODAY(), \"Renewal Notice Due\", \"Active\")"
  },
  {
    "id": "t6_q23",
    "question": "Why does DATEDIF(\"2024-01-31\", \"2024-02-29\", \"M\") return 0 while DATEDIF(\"2024-01-31\", \"2024-03-01\", \"M\") returns 1?",
    "shortAnswer": "DATEDIF requires a full calendar month rollover to reach the same day of the month; Feb 29 does not reach day 31.",
    "explanation": "Because January has 31 days and February ends on the 29th, DATEDIF considers the 1-month milestone unfulfilled until March 1.",
    "hint": "DATEDIF month calculation requires exact day matching.",
    "level": "Advanced",
    "codeExample": "=DATEDIF(DATE(2024,1,31), DATE(2024,3,1), \"M\")  ' Returns 1"
  },
  {
    "id": "t6_q24",
    "question": "How do you calculate weighted average maturity (WAM) of a loan portfolio using YEARFRAC?",
    "shortAnswer": "Use SUMPRODUCT of loan balances and YEARFRAC maturities divided by total portfolio balance.",
    "explanation": "=SUMPRODUCT(tblLoans[Balance], YEARFRAC(TODAY(), tblLoans[MaturityDate], 1)) / SUM(tblLoans[Balance]). This computes portfolio WAM in years.",
    "hint": "WAM = SUMPRODUCT(Balance, YEARFRAC) / SUM(Balance).",
    "level": "Expert",
    "codeExample": "=SUMPRODUCT(A2:A50, YEARFRAC(TODAY(), B2:B50, 1)) / SUM(A2:A50)"
  },
  {
    "id": "t6_q25",
    "question": "How do you calculate milestone achievement speed (days taken vs allocated target days)?",
    "shortAnswer": "Subtract actual start from actual completion, and divide by target days.",
    "explanation": "=(ActualEnd - ActualStart) / TargetDays. Values < 100% mean finished ahead of schedule; > 100% mean delayed.",
    "hint": "Speed Ratio = Actual Days / Target Days.",
    "level": "Beginner",
    "codeExample": "=TEXT((C2-B2)/D2, \"0.0%\")"
  },
  {
    "id": "t6_q26",
    "question": "How do you convert total elapsed days into a human-readable \"X Years, Y Weeks, Z Days\" string?",
    "shortAnswer": "Use integer division and MOD operators on total days.",
    "explanation": "=LET(d, B2 - A2, yrs, INT(d / 365), remD, MOD(d, 365), wks, INT(remD / 7), days, MOD(remD, 7), yrs & \" Yrs, \" & wks & \" Wks, \" & days & \" Days\").",
    "hint": "Use INT and MOD with 365 and 7.",
    "level": "Intermediate",
    "codeExample": "=LET(d, B2-A2, INT(d/365) & \" Y, \" & INT(MOD(d,365)/7) & \" W, \" & MOD(d,7) & \" D\")"
  },
  {
    "id": "t6_q27",
    "question": "What is the return type of YEARFRAC?",
    "shortAnswer": "A floating-point decimal number (numeric data type).",
    "explanation": "YEARFRAC returns numbers like 2.7534, making it immediately usable in multiplication, discounting, and financial NPV formulas.",
    "hint": "YEARFRAC returns numeric float.",
    "level": "Beginner",
    "codeExample": "=YEARFRAC(A2, B2) * 365  ' Approximate days"
  },
  {
    "id": "t6_q28",
    "question": "How do you calculate bond accrued interest using YEARFRAC?",
    "shortAnswer": "Multiply coupon rate, par value, and YEARFRAC from last coupon date to settlement date.",
    "explanation": "=ParValue * CouponRate * YEARFRAC(LastCouponDate, SettlementDate, BondBasis). This accurately computes accrued interest liability.",
    "hint": "Accrued Interest = Par * Coupon * YEARFRAC(last_coupon, settlement, basis).",
    "level": "Advanced",
    "codeExample": "=1000000 * 0.075 * YEARFRAC(A2, B2, 1)"
  },
  {
    "id": "t6_q29",
    "question": "How do you calculate compound interest with daily compounding over fractional years using YEARFRAC?",
    "shortAnswer": "Use =Principal * (1 + Rate/365) ^ (YEARFRAC(start, end, 3) * 365).",
    "explanation": "Basis 3 (Actual/365) accurately computes the exact day count for daily compounding over multi-year terms.",
    "hint": "Formula: P * (1 + r/365)^(YEARFRAC * 365)",
    "level": "Advanced",
    "codeExample": "=A2 * (1 + B2/365) ^ (YEARFRAC(C2, D2, 3) * 365)"
  },
  {
    "id": "t6_q30",
    "question": "What is the best formula pattern for complete tenure breakdown: \"X Years, Y Months, Z Days\" with 100% mathematical accuracy?",
    "shortAnswer": "Combine DATEDIF(\"Y\"), DATEDIF(\"YM\"), and EDATE subtraction for days.",
    "explanation": "=LET(y, DATEDIF(A2, B2, \"Y\"), m, DATEDIF(A2, B2, \"YM\"), d, B2 - EDATE(A2, DATEDIF(A2, B2, \"M\")), y & \" Years, \" & m & \" Months, \" & d & \" Days\"). This avoids the \"MD\" bug completely.",
    "hint": "Use LET with \"Y\", \"YM\", and EDATE for days.",
    "level": "Expert",
    "codeExample": "=LET(y, DATEDIF(A2,B2,\"Y\"), m, DATEDIF(A2,B2,\"YM\"), d, B2-EDATE(A2, DATEDIF(A2,B2,\"M\")), y & \" Y, \" & m & \" M, \" & d & \" D\")"
  }
];

export default topic6Questions;
