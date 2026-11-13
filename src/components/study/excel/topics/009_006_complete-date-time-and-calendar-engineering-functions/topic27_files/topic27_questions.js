// Topic 27: Date, Time & Calendar Engineering Project FAQs
const questions = [
  {
    "id": "dt_q1",
    "question": "In Project 1 (Multi-Country Working Days SLA), how does NETWORKDAYS.INTL allow custom weekend definitions like Friday-Saturday or a 6-day workweek?",
    "shortAnswer": "By passing a 7-character binary string (e.g., '0000110' for Fri/Sat or '0000001' for Sun-only), or an integer weekend code (e.g. 7 for Fri/Sat, 11 for Sun-only).",
    "explanation": "NETWORKDAYS.INTL accepts a 7-character binary mask where each character represents a day of the week from Monday to Sunday. '1' indicates a non-working weekend day, and '0' indicates a working day. For Middle Eastern corridors where Friday and Saturday are off, '0000110' sets Friday and Saturday as weekends, ensuring exact multi-national logistics SLA calculations.",
    "hint": "NETWORKDAYS.INTL(start, end, weekend_string, holidays).",
    "level": "Basic",
    "codeExample": "=NETWORKDAYS.INTL(B4, C4, \"0000110\", Holidays!$B$4:$B$25)"
  },
  {
    "id": "dt_q2",
    "question": "In Project 2 (Employee Service Tenure & Gratuity Tier), why must DATEDIF use 'Y', 'YM', and 'MD' intervals together rather than subtracting dates directly?",
    "shortAnswer": "Direct subtraction only returns total elapsed days; compounding DATEDIF with 'Y', 'YM', and 'MD' extracts the exact breakdown of completed full years, remaining months, and residual days.",
    "explanation": "DATEDIF with 'Y' calculates completed full calendar years; 'YM' calculates remaining months after subtracting whole years; and 'MD' calculates remaining days after subtracting whole months and years. This produces human-readable tenure strings (e.g. '5 Yrs 3 Mos 12 Days') necessary for statutory gratuity and pension vesting under labor laws.",
    "hint": "DATEDIF(start, end, 'Y') & ' Yrs ' & DATEDIF(start, end, 'YM') & ' Mos ' & DATEDIF(start, end, 'MD') & ' Days'.",
    "level": "Basic",
    "codeExample": "=DATEDIF(B4, TODAY(), \"Y\") & \" Yrs \" & DATEDIF(B4, TODAY(), \"YM\") & \" Mos \" & DATEDIF(B4, TODAY(), \"MD\") & \" Days\""
  },
  {
    "id": "dt_q3",
    "question": "In Project 3 (24/7 Overnight Factory Shift Duration), why does regular subtraction (End - Start) result in a ##### error, and how does MOD(End - Start, 1) fix it?",
    "shortAnswer": "Overnight shifts end after midnight, making (End - Start) negative. Excel's default 1900 date system cannot display negative times. MOD(..., 1) applies modular arithmetic to wrap negative serial fractions into positive elapsed 24-hour cycles.",
    "explanation": "When a shift starts at 22:00 (serial ~0.9167) and ends at 06:00 (serial 0.25), direct subtraction yields -0.6667. In mathematical modular arithmetic, -0.6667 MOD 1 equals +0.3333 (exactly 8 hours). Multiplying by 24 converts this serial fraction into decimal hours (8.00) without conditional IF statements.",
    "hint": "MOD(C4 - B4, 1) * 24 - Break_Hours.",
    "level": "Basic",
    "codeExample": "=MOD(C4 - B4, 1) * 24 - D4"
  },
  {
    "id": "dt_q4",
    "question": "In Project 4 (Fiscal Year & Tax Quarter Allocator), how does CHOOSE(MONTH(date), 4,4,4, 1,1,1, 2,2,2, 3,3,3) outperform nested IF statements?",
    "shortAnswer": "CHOOSE uses the month number (1–12) as a direct index to select its corresponding quarter in a single calculation step, eliminating 4 nested IF evaluations.",
    "explanation": "The Indian fiscal year starts in April (Month 4 = Q1). Months 1, 2, 3 (Jan, Feb, Mar) correspond to Q4 of the previous fiscal cohort. CHOOSE(MONTH(B4), 4,4,4, 1,1,1, 2,2,2, 3,3,3) directly maps index 1 to 4, index 2 to 4, index 4 to 1, etc., making formulas significantly faster, shorter, and less prone to syntax errors.",
    "hint": "CHOOSE(MONTH(date), Q_Jan, Q_Feb, ..., Q_Dec).",
    "level": "Intermediate",
    "codeExample": "=\"FY \" & IF(MONTH(B4)>=4, YEAR(B4)&\"-\"&RIGHT(YEAR(B4)+1,2), (YEAR(B4)-1)&\"-\"&RIGHT(YEAR(B4),2)) & \" | Q\" & CHOOSE(MONTH(B4), 4,4,4, 1,1,1, 2,2,2, 3,3,3)"
  },
  {
    "id": "dt_q5",
    "question": "In Project 5 (Banking EMI Repayment Scheduler), how does WORKDAY.INTL with 0 days offset automatically roll a holiday or weekend to the next business day?",
    "shortAnswer": "When you pass 0 as the day offset to WORKDAY.INTL, Excel evaluates if the target date is a weekend or holiday; if so, it advances forward to the earliest valid business day.",
    "explanation": "If you compute EDATE(DisbursalDate, InstallmentNumber), the anniversary might fall on a Sunday or public banking holiday. By wrapping this inside WORKDAY.INTL(..., 0, 1, Holidays), Excel checks if that date is non-working. If valid, 0 days are added (date remains unchanged). If non-working, it rolls forward to the next business day.",
    "hint": "WORKDAY.INTL(raw_anniversary, 0, 1, Holidays).",
    "level": "Intermediate",
    "codeExample": "=WORKDAY.INTL(EDATE($B$4, A4), 0, 1, Holidays!$B$4:$B$25)"
  },
  {
    "id": "dt_q6",
    "question": "In Project 6 (ISO 8601 Supply Chain Week Code), what is the technical difference between WEEKNUM and ISOWEEKNUM?",
    "shortAnswer": "WEEKNUM starts Week 1 on January 1 regardless of the day of the week, whereas ISOWEEKNUM defines Week 1 as the week containing the first Thursday of the new year.",
    "explanation": "Under the international standard ISO 8601, every week starts on Monday, and Week 1 must contain at least 4 days of the new calendar year (equivalent to containing the first Thursday). In years where January 1 falls on a Friday, Saturday, or Sunday, WEEKNUM calls it Week 1, while ISOWEEKNUM correctly assigns it to Week 52 or 53 of the prior year.",
    "hint": "Always use ISOWEEKNUM for international retail and manufacturing supply chain batch tracking.",
    "level": "Intermediate",
    "codeExample": "=YEAR(B4) & \"-W\" & TEXT(ISOWEEKNUM(B4), \"00\") & \"-\" & WEEKDAY(B4, 2)"
  },
  {
    "id": "dt_q7",
    "question": "In Project 7 (Bond Accrued Interest & Day-Count Convention), how do the 5 basis arguments in YEARFRAC affect interest calculations?",
    "shortAnswer": "Basis 0: 30/360 US; Basis 1: Actual/Actual; Basis 2: Actual/360; Basis 3: Actual/365; Basis 4: European 30/360.",
    "explanation": "YEARFRAC calculates the exact proportion of a year between two dates based on bond market standards. In money market instruments (CP, CD, T-Bills), Actual/360 (basis 2) is universally standard. In US corporate debt, 30/360 (basis 0) assumes every month has 30 days. In sovereign bonds, Actual/Actual (basis 1) uses exact days in the leap or non-leap year.",
    "hint": "YEARFRAC(start_date, end_date, [basis]) * Principal * Rate.",
    "level": "Advanced",
    "codeExample": "=YEARFRAC(B4, C4, 1) * E4 * F4"
  },
  {
    "id": "dt_q8",
    "question": "In Project 8 (Manufacturing Lead-Time & Dispatch Forecaster), how does WORKDAY.INTL handle single-day weekend operations (e.g. Sunday-only off)?",
    "shortAnswer": "Pass weekend code 11 to WORKDAY.INTL to designate Sunday as the sole non-working day of the week.",
    "explanation": "Many factories and logistics depots operate 6 days a week (Monday through Saturday) with only Sunday off. Excel provides single-day weekend numeric codes 11 through 17 (11=Sunday, 12=Monday, 13=Tuesday, 14=Wednesday, 15=Thursday, 16=Friday, 17=Saturday). Using code 11 calculates true factory lead times accurately.",
    "hint": "WORKDAY.INTL(order_date, lead_days, 11, Holidays).",
    "level": "Intermediate",
    "codeExample": "=WORKDAY.INTL(B4, C4, 11, Holidays!$B$4:$B$25)"
  },
  {
    "id": "dt_q9",
    "question": "In Project 9 (IT Helpdesk 4-Hour SLA Monitor), how do you restrict elapsed time calculations exclusively to 09:00 to 18:00 business hours across multiple days?",
    "shortAnswer": "Combine NETWORKDAYS to count intervening full business days (each contributing 9 working hours), and add clamped business hours worked on the opening day and resolution day.",
    "explanation": "If a ticket is logged at 17:00 on Friday and resolved at 10:00 on Monday, the total elapsed clock time is 65 hours. However, Friday has only 1 hour remaining before the 18:00 cutoff, the weekend contributes 0 hours, and Monday contributes 1 hour (09:00 to 10:00). The true business working SLA elapsed is exactly 2.0 hours.",
    "hint": "Calculate (Full_Days * 9) + Opening_Day_Hours + Closing_Day_Hours.",
    "level": "Advanced",
    "codeExample": "=LET(s, B4, e, C4, days, NETWORKDAYS(s, e, Holidays!$B$4:$B$25), IF(INT(s)=INT(e), (MOD(e,1)-MOD(s,1))*24, (days-2)*9 + (TIME(18,0,0)-MOD(s,1))*24 + (MOD(e,1)-TIME(9,0,0))*24))"
  },
  {
    "id": "dt_q10",
    "question": "In Project 10 (UTC/ISO 8601 Timestamp to Local IST Parser), why can't you just add 5:30 to a text timestamp string?",
    "shortAnswer": "ISO 8601 strings (e.g. '2026-02-15T18:45:30Z') are text. Adding a number directly causes a #VALUE! error until parsed with DATEVALUE and TIMEVALUE into serial numbers.",
    "explanation": "DATEVALUE(LEFT(B4, 10)) extracts the date serial number (e.g. 46068), while TIMEVALUE(MID(B4, 12, 8)) extracts the time serial fraction. Adding (5.5 / 24) shifts the timestamp forward by 5.5 hours. If the addition crosses midnight, the serial integer automatically advances to the next calendar date.",
    "hint": "DATEVALUE(date_str) + TIMEVALUE(time_str) + (hours_offset / 24).",
    "level": "Intermediate",
    "codeExample": "=DATEVALUE(LEFT(B4, 10)) + TIMEVALUE(MID(B4, 12, 8)) + (5.5 / 24)"
  },
  {
    "id": "dt_q11",
    "question": "In Project 11 (Commercial Real Estate Lease Renewal Alert), why is EDATE preferred over adding (Months * 30) days?",
    "shortAnswer": "Adding Months * 30 causes severe date drift due to 31-day months and February. EDATE maintains exact day-of-month calendar alignment across leap and non-leap years.",
    "explanation": "If a 36-month lease starts on 31-Jan-2023, adding 36 * 30 = 1,080 days results in 15-Jan-2026 (a drift of 16 days!). EDATE(31-Jan-2023, 36) returns exactly 31-Jan-2026. Furthermore, for month-ends with fewer days, EDATE automatically adjusts to the last valid day of that month.",
    "hint": "EDATE(start_date, tenure_in_months).",
    "level": "Intermediate",
    "codeExample": "=LET(exp, EDATE(B4, C4), daysLeft, exp - TODAY(), IF(daysLeft < 0, \"EXPIRED\", IF(daysLeft <= 30, \"CRITICAL: RENEW NOW\", IF(daysLeft <= 90, \"UPCOMING EXPIRY\", \"ACTIVE\"))))"
  },
  {
    "id": "dt_q12",
    "question": "In Project 12 (Hospital Inpatient Length of Stay & Billing), how does INT(Discharge - Admission) isolate whole days from fractional days?",
    "shortAnswer": "INT returns the integer portion of the date difference (full 24-hour cycles), while MOD(..., 1) extracts the remaining fractional day to apply half-day or full-day billing rules.",
    "explanation": "In Excel serial numbers, whole integers represent calendar days, and decimals represent fractional time of day. For a patient admitted at 09:00 on Monday and discharged at 15:00 on Thursday (elapsed serial = 3.25 days), INT(3.25) yields 3 full days. The remaining 0.25 (6 hours) is evaluated via IF(MOD(...) > 0.5, 1, 0.5) to add 0.5 billable day.",
    "hint": "INT(End - Start) + IF(MOD(End - Start, 1) > 0.5, 1, 0.5).",
    "level": "Intermediate",
    "codeExample": "=INT(C4 - B4) + IF(MOD(C4 - B4, 1) > 0.5, 1, 0.5)"
  },
  {
    "id": "dt_q13",
    "question": "In Project 13 (Warehouse Inventory FIFO Ageing Buckets), how does TODAY() enable perpetual dynamic inventory ageing schedules?",
    "shortAnswer": "TODAY() is a volatile function that updates to the current system date on every recalculation, ensuring inventory age (TODAY() - Receipt_Date) is always live.",
    "explanation": "Static date formulas require manual updating every month. By referencing TODAY(), stock age in days continuously increases automatically. When combined with nested IF or IFS functions, items automatically transition across ageing tiers (0-30, 31-60, 61-90, 91-180, 180+ days) and provision reserve rates update without manual intervention.",
    "hint": "TODAY() - Receipt_Date.",
    "level": "Basic",
    "codeExample": "=IF((TODAY()-B4)<=30, \"0-30 Days\", IF((TODAY()-B4)<=60, \"31-60 Days\", IF((TODAY()-B4)<=90, \"61-90 Days\", IF((TODAY()-B4)<=180, \"91-180 Days\", \"180+ Days (OBSOLETE)\"))))"
  },
  {
    "id": "dt_q14",
    "question": "In Project 14 (Airline Flight Turnaround & Ground Handling Delay), why is serial time multiplied by 1440 to compute turnaround minutes?",
    "shortAnswer": "One day consists of 24 hours * 60 minutes = 1,440 minutes. Multiplying serial time differences by 1440 converts day fractions into exact integer minutes.",
    "explanation": "Excel stores 1 hour as 1/24 (0.041667) and 1 minute as 1/1440 (0.0006944). Multiplying MOD(Pushback - ChocksOn, 1) by 1440 produces the exact duration in minutes. Wrapping with MAX(0, Actual - Target) returns 0 when aircraft turn around faster than SLA, avoiding negative penalty numbers.",
    "hint": "MOD(End - Start, 1) * 1440.",
    "level": "Intermediate",
    "codeExample": "=MAX(0, (MOD(C4 - B4, 1) * 1440) - D4)"
  },
  {
    "id": "dt_q15",
    "question": "In Project 15 (Construction Project CPM Float & Milestone Slippage), why must schedule float be measured in working days rather than calendar days?",
    "shortAnswer": "Construction crews do not work on Sundays and public holidays; measuring variance in calendar days falsely penalizes contractors for statutory non-working days.",
    "explanation": "If a milestone was scheduled for 10 working days, and heavy rains or delay cause it to take 14 working days, NETWORKDAYS.INTL calculates exactly 14 actual working days. Comparing Actual Working Days against Planned Working Days (14 - 10 = +4 days variance) provides the true contractual float slippage required under FIDIC construction contracts.",
    "hint": "NETWORKDAYS.INTL(actual_start, actual_finish, 1, Holidays) - planned_days.",
    "level": "Intermediate",
    "codeExample": "=NETWORKDAYS.INTL(B4, C4, 1, Holidays!$B$4:$B$25) - D4"
  },
  {
    "id": "dt_q16",
    "question": "In Project 16 (E-Commerce 30-Day Return Verifier), how does Excel handle simple integer date arithmetic like Date + 30?",
    "shortAnswer": "Because Excel dates are sequential serial integers (e.g. 46060 = 07-Feb-2026), adding +30 directly advances the calendar by 30 days.",
    "explanation": "There is no need for complex functions when calculating calendar day deadlines. Adding 30 to a date serial advances it across months and years automatically. Comparing TODAY() <= DeliveryDate + 30 returns TRUE when the return window is open and FALSE when it has expired.",
    "hint": "IF(TODAY() <= DeliveryDate + 30, 'ELIGIBLE', 'EXPIRED').",
    "level": "Basic",
    "codeExample": "=IF(TODAY() <= (B4 + 30), \"ELIGIBLE FOR RETURN\", \"RETURN WINDOW CLOSED\")"
  },
  {
    "id": "dt_q17",
    "question": "In Project 17 (Preventive Maintenance Weekend Snapping Engine), how do you prevent recurring maintenance due dates from landing on a weekend?",
    "shortAnswer": "Calculate the day of the week with WEEKDAY(date, 2); if Saturday (6), subtract 1 day; if Sunday (7), subtract 2 days to snap back to Friday.",
    "explanation": "Preventive maintenance schedules generated via EDATE(LastServiceDate, IntervalMonths) often land on Saturdays or Sundays. Because plant technicians work weekdays, snapping the date back ensures work is scheduled for the preceding Friday (Saturday - 1, Sunday - 2).",
    "hint": "LET(d, EDATE(B4, C4), wd, WEEKDAY(d, 2), IF(wd=6, d-1, IF(wd=7, d-2, d))).",
    "level": "Intermediate",
    "codeExample": "=LET(rawDue, EDATE(B4, C4), wd, WEEKDAY(rawDue, 2), IF(wd=6, rawDue-1, IF(wd=7, rawDue-2, rawDue)))"
  },
  {
    "id": "dt_q18",
    "question": "In Project 18 (Biometric Attendance Late Coming Grace Period), why should you penalize from the 09:00 benchmark rather than the 09:15 grace limit when grace is exceeded?",
    "shortAnswer": "Standard HR attendance rules treat grace periods as conditional allowances: if an employee arrives by 09:15, no penalty occurs; if they arrive at 09:20, they are penalized for all 20 minutes from 09:00.",
    "explanation": "Comparing MOD(SwipeTime, 1) > TIME(9, 15, 0) checks if the swipe occurred after the 15-minute grace window. If true, subtracting TIME(9, 0, 0) and multiplying by 1440 calculates the full 20 minutes late from the official shift start time.",
    "hint": "IF(swipe > TIME(9,15,0), (swipe - TIME(9,0,0))*1440, 0).",
    "level": "Intermediate",
    "codeExample": "=LET(swipe, MOD(B4, 1), IF(swipe > TIME(9,15,0), (swipe - TIME(9,0,0))*1440, 0))"
  },
  {
    "id": "dt_q19",
    "question": "In Project 19 (Container Port Demurrage & Free Time Expiry Tracker), why must port free time use business days rather than calendar days?",
    "shortAnswer": "Terminal operating agreements allow cargo clearance only on port working days; weekends and national holidays are contractually excluded from free time allowances.",
    "explanation": "Using WORKDAY.INTL(DischargeDate, FreeDays, 1, Holidays) calculates the exact terminal free time cutoff. If containers are discharged on a Thursday with 5 free days, the weekend is excluded, and free time extends until the following Thursday. Adding buffer days gives the final demurrage commencement deadline.",
    "hint": "WORKDAY.INTL(DischargeDate, FreeDays, 1, Holidays) + Buffer.",
    "level": "Intermediate",
    "codeExample": "=WORKDAY.INTL(B4, C4, 1, Holidays!$B$4:$B$15) + D4"
  },
  {
    "id": "dt_q20",
    "question": "In Project 20 (Insurance Policy Grace Period & Lapse Forecaster), how does combining EDATE and +30 ensure statutory insurance policy compliance?",
    "shortAnswer": "EDATE(CommencementDate, 12) identifies the exact annual premium renewal anniversary, and adding +30 establishes the mandatory IRDAI 30-day statutory grace period before policy lapse.",
    "explanation": "Life insurance policies lapse if renewal premiums are unpaid 30 days after the anniversary due date. Combining EDATE for the 12-month anniversary with + 30 days provides an indisputable legal cutoff date for underwriting policy reinstatement.",
    "hint": "EDATE(Start_Date, 12) + 30.",
    "level": "Basic",
    "codeExample": "=EDATE(B4, 12) + 30"
  },
  {
    "id": "dt_q21",
    "question": "In Project 21 (1900 vs 1904 Date System Multi-Platform Reconciliation), what is the origin of the 1,462-day serial difference between Windows and Mac Excel?",
    "shortAnswer": "Windows Excel starts its serial system on January 1, 1900, while legacy Mac Excel starts on January 1, 1904. The difference between those two base dates is exactly 1,462 days (4 years and 1 leap day).",
    "explanation": "If a user copies raw unformatted dates from a 1904-system workbook into a 1900-system workbook, every date appears 4 years and 1 day in the past. Checking if the serial is shifted and adding 1462 reconciles the date perfectly.",
    "hint": "Reconcile with: IF(is_1904_shifted, date + 1462, date).",
    "level": "Advanced",
    "codeExample": "=IF(B4 < 40000, B4 + 1462, B4)"
  },
  {
    "id": "dt_q22",
    "question": "In Project 22 (Nth Business Day of the Month Dynamic Scheduler), why is EOMONTH(Date, -1) used as the starting point for WORKDAY.INTL?",
    "shortAnswer": "EOMONTH(Date, -1) steps backwards to the final day of the preceding month, allowing WORKDAY.INTL to count forward starting from the very first working day of the target month.",
    "explanation": "To find the '15th business day of February 2026', you cannot start at February 15 because weekends will have occurred. By starting at January 31 (via EOMONTH(FebDate, -1)) and advancing 15 business days via WORKDAY.INTL, Excel skips all weekends and holidays in February, landing precisely on the 15th working day.",
    "hint": "WORKDAY.INTL(EOMONTH(date, -1), Nth_day, 1, Holidays).",
    "level": "Advanced",
    "codeExample": "=WORKDAY.INTL(EOMONTH(B4, -1), 15, 1, Holidays!$B$4:$B$20)"
  },
  {
    "id": "dt_q23",
    "question": "In Project 23 (Interbank Repo Interest Accrual), what is the difference between DAYS360 US NASD and European methods?",
    "shortAnswer": "In the US NASD method (FALSE), if the start date is the last day of the month, it becomes the 30th day; in the European method (TRUE), dates falling on the 31st are treated as the 30th regardless of start or end.",
    "explanation": "DAYS360 standardizes all months to 30 days for commercial paper and bond accruals. Passing FALSE applies US NASD conventions, whereas passing TRUE applies European standard ISMA rules. Comparing DAYS360 against YEARFRAC(..., 2) (Actual/360) reveals institutional interest variance.",
    "hint": "DAYS360(start, end, FALSE) for US NASD; DAYS360(start, end, TRUE) for European.",
    "level": "Advanced",
    "codeExample": "=C4 * D4 * (DAYS360(A4, B4, FALSE) / 360)"
  },
  {
    "id": "dt_q24",
    "question": "In Project 24 (Multi-Tier Overtime & Statutory Double-Time Payroll Engine), how does INT(ShiftStart) enable reliable holiday matching?",
    "shortAnswer": "Shift timestamps contain both date and time (e.g. 46048.333). INT(ShiftStart) removes the time fraction, leaving a pure integer serial date that matches the pure dates in the Holidays table.",
    "explanation": "MATCH(ShiftStart, Holidays!B4:B25, 0) fails with #N/A because 46048.333 is never equal to 46048.000. Applying INT(ShiftStart) strips the fractional hours, enabling exact MATCH lookups to trigger 2.0x double-time compensation on statutory national holidays.",
    "hint": "INT(Timestamp) removes time for clean holiday matching.",
    "level": "Advanced",
    "codeExample": "=LET(hrs, MOD(C4-B4, 1)*24, isHol, ISNUMBER(MATCH(INT(B4), Holidays!$B$4:$B$25, 0)), IF(isHol, hrs * 2.0 * D4, (MIN(8, hrs) + MAX(0, hrs - 8) * 1.5) * D4))"
  },
  {
    "id": "dt_q25",
    "question": "In Project 25 (Executive Dashboard: MTD Working Days & Run-Rate Forecaster), why is business-day pacing superior to calendar-day pacing for revenue projections?",
    "shortAnswer": "Commercial revenue is generated on working business days. Dividing revenue by elapsed business days and multiplying by total monthly business days eliminates distortions caused by weekend timing and holiday clusters.",
    "explanation": "If 10 calendar days have elapsed in a month containing 4 weekend days and 1 holiday, only 5 revenue-generating business days actually occurred. Measuring revenue per calendar day (Actual / 10 * 30) severely understates true performance by 50%. Normalizing by business days (Actual / 5 * 21) provides an accurate, reliable CFO run-rate projection.",
    "hint": "Actual_Sales / Elapsed_Biz_Days * Total_Biz_Days.",
    "level": "Advanced",
    "codeExample": "=LET(startM, EOMONTH(TODAY(), -1) + 1, endM, EOMONTH(TODAY(), 0), totBiz, NETWORKDAYS(startM, endM, Holidays!$B$4:$B$25), elapsedBiz, NETWORKDAYS(startM, TODAY(), Holidays!$B$4:$B$25), B4 / elapsedBiz * totBiz)"
  }
];

export default questions;
