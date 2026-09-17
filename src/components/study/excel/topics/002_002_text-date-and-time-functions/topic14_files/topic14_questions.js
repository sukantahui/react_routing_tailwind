// Topic 14 Questions
const topic14Questions = [
  {
    "id": "t14_q1",
    "question": "In Capstone Project 1 (Automated Invoicing Engine), how do you calculate the payment due date as Net-30 business days excluding holidays?",
    "shortAnswer": "=WORKDAY(Invoice_Date, 30, Holiday_Table[Date]).",
    "explanation": "WORKDAY advances exactly 30 business days (skipping weekends and specified holidays) from the invoice issue date.",
    "hint": "WORKDAY(Issue_Date, 30, Holidays).",
    "level": "Basic",
    "codeExample": "=WORKDAY([@InvoiceDate], 30, Holidays[Date])"
  },
  {
    "id": "t14_q2",
    "question": "In Capstone Project 2 (Customer ETL Pipeline), how do you parse mixed address strings into Street, City, State, and Zip code columns?",
    "shortAnswer": "Use TEXTSPLIT with comma delimiter, then TRIM and slice state/zip using TEXTBEFORE and TEXTAFTER.",
    "explanation": "A multi-stage LET formula splits by comma, trims whitespace, and separates the 2-letter state code from the 5-digit zip code.",
    "hint": "TEXTSPLIT by comma and parse last segment.",
    "level": "Intermediate",
    "codeExample": "=LET(\n  parts, TRIM(TEXTSPLIT([@FullAddress], \",\")),\n  street, INDEX(parts, 1),\n  city, INDEX(parts, 2),\n  state_zip, INDEX(parts, 3),\n  HSTACK(street, city, TEXTBEFORE(state_zip,\" \"), TEXTAFTER(state_zip,\" \"))\n)"
  },
  {
    "id": "t14_q3",
    "question": "In Capstone Project 3 (HR Payroll & Overtime Engine), how are California 8-hour daily and 40-hour weekly overtime rules harmonized?",
    "shortAnswer": "Calculate daily OT first; weekly OT is calculated as total hours minus 40, minus already-paid daily OT hours.",
    "explanation": "To prevent double-counting overtime pay, weekly overtime only applies to regular hours that exceeded 40 without already receiving daily overtime rates.",
    "hint": "Deduct daily OT hours from weekly OT calculation.",
    "level": "Advanced",
    "codeExample": "=LET(\n  tot, SUM([@Hours]),\n  daily_ot, SUM([@DailyOT]),\n  reg_hrs, tot - daily_ot,\n  weekly_ot, MAX(0, reg_hrs - 40),\n  weekly_ot\n)"
  },
  {
    "id": "t14_q4",
    "question": "In Capstone Project 4 (SLA & Helpdesk Ticket Audit), how do you calculate business resolution hours between two timestamps within 08:00-18:00 M-F windows?",
    "shortAnswer": "Combine NETWORKDAYS.INTL for full business days with boundary time adjustments.",
    "explanation": "Multiply intervening full business days by 10 hours/day (08:00 to 18:00), and add actual fractional business hours worked on start and end days.",
    "hint": "Calculate whole day business hours + start/end day fractions.",
    "level": "Advanced",
    "codeExample": "=LET(\n  s, [@Created], e, [@Resolved],\n  full_days, MAX(0, NETWORKDAYS(s, e, Holidays) - 2),\n  full_hrs, full_days * 10,\n  // Add clamped start day + end day hours\n  full_hrs\n)"
  },
  {
    "id": "t14_q5",
    "question": "In Capstone Project 5 (Subscription & ARR Forecasting), how do you calculate remaining days in a subscriber's monthly billing cycle?",
    "shortAnswer": "=EOMONTH(Billing_Date, 0) - Billing_Date.",
    "explanation": "EOMONTH(Billing_Date, 0) gives the last day of the current billing month. Subtracting the current billing date returns remaining days.",
    "hint": "EOMONTH(date, 0) - date.",
    "level": "Basic",
    "codeExample": "=EOMONTH([@RenewalDate], 0) - [@RenewalDate]"
  },
  {
    "id": "t14_q6",
    "question": "In Capstone Project 6 (Financial Bond & Loan Amortization), how do you calculate exact fraction of year using Actual/360 bond conventions?",
    "shortAnswer": "=YEARFRAC(Issue_Date, Settlement_Date, 2).",
    "explanation": "The 3rd argument basis=2 specifies the Actual/360 money market day count convention used in treasury and commercial lending.",
    "hint": "YEARFRAC with basis = 2.",
    "level": "Intermediate",
    "codeExample": "=YEARFRAC([@IssueDate], [@SettlementDate], 2)"
  },
  {
    "id": "t14_q7",
    "question": "In Capstone Project 7 (Flight & Logistics Schedule Tracker), how do you calculate arrival local time across different time zones?",
    "shortAnswer": "=Departure_UTC + Flight_Duration + (Dest_UTC_Offset / 24).",
    "explanation": "Time zones are 24-hour fractions. Adding destination offset divided by 24 to UTC arrival time gives exact local arrival time.",
    "hint": "Add destination UTC offset / 24 to UTC arrival datetime.",
    "level": "Intermediate",
    "codeExample": "=[@DepUTC] + [@FlightDuration] + ([@DestOffset] / 24)"
  },
  {
    "id": "t14_q8",
    "question": "In Capstone Project 8 (Healthcare Appointment Scheduling), how do you find the next available appointment slot on a 30-minute grid avoiding lunch (12:00-13:00)?",
    "shortAnswer": "Use CEILING for 30-minute intervals and wrap with IF to push appointments starting between 12:00-13:00 to 13:00.",
    "explanation": "Round raw request time up using CEILING(time, '0:30'). If the time falls between 12:00 and 12:59, bump it to 13:00.",
    "hint": "CEILING to 30 mins + IF condition for lunch block.",
    "level": "Advanced",
    "codeExample": "=LET(\n  slot, CEILING([@ReqTime], TIME(0,30,0)),\n  IF(AND(slot>=TIME(12,0,0), slot<TIME(13,0,0)), TIME(13,0,0), slot)\n)"
  },
  {
    "id": "t14_q9",
    "question": "In Capstone Project 9 (Real Estate Lease Expiration Engine), how do you calculate the exact date of a 3-year lease renewal notice due 90 days before expiration?",
    "shortAnswer": "=EDATE(Lease_Start, 36) - 90.",
    "explanation": "EDATE(Start, 36) adds 36 calendar months (3 years) to get expiration date. Subtracting 90 days gives notice deadline.",
    "hint": "EDATE(start, 36) - 90.",
    "level": "Intermediate",
    "codeExample": "=EDATE([@LeaseStart], 36) - 90"
  },
  {
    "id": "t14_q10",
    "question": "In Capstone Project 10 (E-Commerce Product SKU Generator), how do you build standard SKUs like 'CAT-PRD-2026-US' from category, name, and country?",
    "shortAnswer": "=UPPER(LEFT(Category,3) & \"-\" & LEFT(Product,3) & \"-\" & YEAR(ReleaseDate) & \"-\" & CountryCode).",
    "explanation": "Concatenate abbreviated uppercase strings with year and country codes to generate standardized unique SKU strings.",
    "hint": "Concatenate UPPER(LEFT) codes with YEAR.",
    "level": "Basic",
    "codeExample": "=UPPER(LEFT([@Category],3) & \"-\" & LEFT([@Product],3) & \"-\" & YEAR([@Date]) & \"-\" & [@Country])"
  },
  {
    "id": "t14_q11",
    "question": "In Capstone Project 11 (Manufacturing Equipment Maintenance Scheduler), how do you calculate next preventive maintenance date based on 500 operating hours at 16 hrs/day?",
    "shortAnswer": "=WORKDAY(Last_Maint_Date, CEILING(500 / 16, 1), Factory_Holidays).",
    "explanation": "500 operating hours / 16 hours/day = 31.25 operating days (CEILING -> 32 days). WORKDAY adds 32 factory working days.",
    "hint": "WORKDAY with operating days count.",
    "level": "Intermediate",
    "codeExample": "=WORKDAY([@LastService], CEILING(500 / 16, 1), FactoryHolidays[Date])"
  },
  {
    "id": "t14_q12",
    "question": "In Capstone Project 12 (Social Media Campaign Performance Tracker), how do you extract campaign hashtags and calculate engagement per day live?",
    "shortAnswer": "Extract hashtags with TEXTAFTER/TEXTSPLIT; calculate live days as =TODAY() - Launch_Date.",
    "explanation": "Isolate tags with text splitting formulas, and calculate elapsed campaign days to compute daily average impressions.",
    "hint": "Divide total engagement by (TODAY() - Launch_Date).",
    "level": "Intermediate",
    "codeExample": "=[@TotalEngagements] / MAX(1, TODAY() - [@LaunchDate])"
  },
  {
    "id": "t14_q13",
    "question": "In Capstone Project 13 (Hotel Night Audit & Room Booking Engine), how do you calculate total room charges for bookings spanning weekday and weekend rate tiers?",
    "shortAnswer": "Generate date sequence of stay, calculate WEEKDAY per day, and sum corresponding rates with SUMPRODUCT/XLOOKUP.",
    "explanation": "SEQUENCE(Nights, 1, CheckIn) creates an array of stay dates. Check WEEKDAY >= 6 for weekend rates and sum total charges.",
    "hint": "Generate SEQUENCE of stay dates and match rates per day.",
    "level": "Advanced",
    "codeExample": "=LET(\n  dates, SEQUENCE([@Nights], 1, [@CheckIn]),\n  SUM(IF(WEEKDAY(dates,2)>=6, $WeekendRate, $WeekdayRate))\n)"
  },
  {
    "id": "t14_q14",
    "question": "In Capstone Project 14 (Fleet Vehicle Fuel Efficiency & Mileage Log), how do you calculate days between consecutive fill-ups and MPG?",
    "shortAnswer": "Days: =[@OdometerDate] - PriorDate; MPG: =([@Odometer] - PriorOdo) / [@Gallons].",
    "explanation": "Structured table offset referencing calculates miles driven and days between fuel stops to compute fuel economy trends.",
    "hint": "Delta odometer divided by gallons filled.",
    "level": "Basic",
    "codeExample": "=([@Odometer] - OFFSET([@Odometer],-1,0)) / [@Gallons]"
  },
  {
    "id": "t14_q15",
    "question": "In Capstone Project 15 (Legal Case Management & Court Deadline Calculator), how do you calculate a court response deadline of 21 days where day 21 rolling onto a weekend moves to Monday?",
    "shortAnswer": "=WORKDAY(Filing_Date + 21 - 1, 1, Court_Holidays).",
    "explanation": "Add 21 calendar days first. If day 21 falls on a weekend or court holiday, WORKDAY(..., 1) automatically rolls it to next valid court business day.",
    "hint": "Calendar days + 21, then roll to next court day via WORKDAY.",
    "level": "Advanced",
    "codeExample": "=WORKDAY([@FilingDate] + 20, 1, CourtHolidays[Date])"
  },
  {
    "id": "t14_q16",
    "question": "In Capstone Project 16 (Supply Chain Lead Time & Purchase Reorder Alert), how do you calculate reorder trigger date to maintain safety stock?",
    "shortAnswer": "=Expected_Stockout_Date - Lead_Time_Days.",
    "explanation": "Subtract vendor lead time days (calculated via WORKDAY for supplier factory schedules) from projected inventory stockout date.",
    "hint": "Stockout date minus supplier lead time.",
    "level": "Intermediate",
    "codeExample": "=WORKDAY([@StockoutDate], -[@LeadTimeDays], SupplierHolidays[Date])"
  },
  {
    "id": "t14_q17",
    "question": "In Capstone Project 17 (Employee Tenure & Retirement Milestone Tracker), how do you calculate the exact date an employee achieves Rule of 85 (Age + Service = 85)?",
    "shortAnswer": "=Birth_Date + ((85*365.25 + Hire_Date - Birth_Date) / 2).",
    "explanation": "Because Age and Service both increase at 1 day per calendar day, total points increase at 2 points per year. Algebraic midpoint solves the exact date.",
    "hint": "Algebraic midpoint calculation where points accrue at rate 2.0x.",
    "level": "Advanced",
    "codeExample": "=LET(\n  target_days, 85 * 365.25,\n  [@HireDate] + (target_days - ([@HireDate] - [@BirthDate])) / 2\n)"
  },
  {
    "id": "t14_q18",
    "question": "In Capstone Project 18 (Banking Transaction Categorization Engine), how do you match messy memo strings against a master keyword taxonomy?",
    "shortAnswer": "Use XLOOKUP with wildcard searches: =XLOOKUP(\"*\" & Keyword & \"*\", Memo_Range, Category_Range, \"Uncategorized\", 2).",
    "explanation": "XLOOKUP with match_mode=2 enables wildcards (*), matching keywords (e.g. '*UBER*') inside transaction description strings.",
    "hint": "XLOOKUP with wildcard match_mode = 2.",
    "level": "Advanced",
    "codeExample": "=XLOOKUP(\"*\" & Taxonomy[Keyword] & \"*\", [@Memo], Taxonomy[Category], \"Other\", 2)"
  },
  {
    "id": "t14_q19",
    "question": "In Capstone Project 19 (University Academic Course Schedule Matrix), how do you detect classroom scheduling conflicts across time and day ranges?",
    "shortAnswer": "Use SUMIFS or FILTER to count overlapping times in the same room on the same day code (e.g. 'MWF').",
    "explanation": "Check if Room = Target_Room, Day = Target_Day, and MAX(Start1, Start2) < MIN(End1, End2). If count > 1, conflict exists.",
    "hint": "Count overlaps where MAX(Start) < MIN(End) in same room.",
    "level": "Advanced",
    "codeExample": "=IF(COUNTIFS(Rooms, [@Room], Days, [@Day], Starts, \"<\" & [@End], Ends, \">\" & [@Start]) > 1, \"CONFLICT\", \"OK\")"
  },
  {
    "id": "t14_q20",
    "question": "In Capstone Project 20 (Master Executive KPI Dashboard), how do you build dynamic MTD (Month-to-Date) and YTD (Year-to-Date) revenue metrics?",
    "shortAnswer": "MTD: SUMIFS where Date >= 1st of current month and <= TODAY(); YTD: SUMIFS where Date >= Jan 1 of current year and <= TODAY().",
    "explanation": "Use DATE(YEAR(TODAY()), 1, 1) as lower bound for YTD and EOMONTH(TODAY(), -1) + 1 for MTD with upper bound TODAY().",
    "hint": "SUMIFS with dynamic EOMONTH and DATE lower bounds.",
    "level": "Intermediate",
    "codeExample": "// MTD Revenue:\n=SUMIFS(Sales[Amount], Sales[Date], \">=\" & (EOMONTH(TODAY(),-1)+1), Sales[Date], \"<=\" & TODAY())\n// YTD Revenue:\n=SUMIFS(Sales[Amount], Sales[Date], \">=\" & DATE(YEAR(TODAY()),1,1), Sales[Date], \"<=\" & TODAY())"
  },
  {
    "id": "t14_q21",
    "question": "How do you ensure capstone project workbooks maintain maximum performance when calculating thousands of text/date formulas?",
    "shortAnswer": "Use Excel Tables, avoid volatile functions (NOW, TODAY, OFFSET) in large grid calculations, and use LET to eliminate redundant calculations.",
    "explanation": "Volatile functions force whole-sheet recalculation on every edit. Placing single static cells for TODAY() or using LET dramatically speeds up calculation engines.",
    "hint": "Limit volatile functions and leverage LET efficiency.",
    "level": "Intermediate",
    "codeExample": "// Good practice: Reference a single date parameter cell $Z$1 containing =TODAY()"
  },
  {
    "id": "t14_q22",
    "question": "How do you automate dynamic status badges ('\ud83d\udfe2 Active', '\ud83d\udfe1 Expiring Soon', '\ud83d\udd34 Expired') in project milestone dashboards?",
    "shortAnswer": "=IFS(Expiry < TODAY(), \"\ud83d\udd34 Expired\", Expiry <= TODAY()+30, \"\ud83d\udfe1 Expiring Soon\", TRUE, \"\ud83d\udfe2 Active\").",
    "explanation": "IFS evaluates milestone conditions in sequential order, displaying visual emoji alerts based on days remaining.",
    "hint": "Use IFS with threshold conditions.",
    "level": "Basic",
    "codeExample": "=IFS([@Expiry] < TODAY(), \"\ud83d\udd34 Expired\", [@Expiry] <= TODAY()+30, \"\ud83d\udfe1 Expiring Soon\", TRUE, \"\ud83d\udfe2 Active\")"
  },
  {
    "id": "t14_q23",
    "question": "How do you build a dynamic project Gantt chart schedule using REPT and string formulas in Excel?",
    "shortAnswer": "=REPT(\" \", Start_Offset) & REPT(\"\u2588\", Duration_Days).",
    "explanation": "REPT generates in-cell bar charts without requiring complex conditional formatting or add-ins.",
    "hint": "REPT with unicode block characters.",
    "level": "Intermediate",
    "codeExample": "=REPT(\" \", [@StartOffset]) & REPT(\"\u2588\", [@Duration])"
  },
  {
    "id": "t14_q24",
    "question": "How do you format project completion percentages dynamically with progress bars using formulas?",
    "shortAnswer": "=REPT(\"\u25a0\", INT(Progress * 10)) & REPT(\"\u25a1\", 10 - INT(Progress * 10)) & \" \" & TEXT(Progress, \"0%\").",
    "explanation": "Generates a 10-block visual progress bar showing completed and remaining blocks alongside percentage text.",
    "hint": "REPT filled squares + empty squares + TEXT(pct, '0%').",
    "level": "Intermediate",
    "codeExample": "=REPT(\"\u25a0\", INT([@Pct]*10)) & REPT(\"\u25a1\", 10 - INT([@Pct]*10)) & \" \" & TEXT([@Pct], \"0%\")"
  },
  {
    "id": "t14_q25",
    "question": "How do you parse nested JSON responses imported into Excel cells without external add-ins?",
    "shortAnswer": "Use TEXTBEFORE, TEXTAFTER, and TEXTBETWEEN targeting JSON key strings.",
    "explanation": "=TEXTBETWEEN(A1, '\"status\":\"', '\"') extracts string values from standardized JSON key-value payloads.",
    "hint": "TEXTBETWEEN with key markers.",
    "level": "Advanced",
    "codeExample": "=TEXTBETWEEN([@JSON], \"\"\"status\"\": \"\"\", \"\"\"\")"
  },
  {
    "id": "t14_q26",
    "question": "How do you create an automated audit log tracking user changes with timestamps in Excel?",
    "shortAnswer": "Use VBA Worksheet_Change events to write static =NOW() timestamps into an audit log sheet.",
    "explanation": "Formulas recalculate dynamically, so capturing fixed point-in-time audit records requires VBA or Office Scripts to paste static values.",
    "hint": "Use VBA/Office Scripts for immutable audit timestamps.",
    "level": "Advanced",
    "codeExample": "Target.Offset(0, 1).Value = Now"
  },
  {
    "id": "t14_q27",
    "question": "How do you calculate currency exchange rate conversions applied on historical transaction dates?",
    "shortAnswer": "=Amount * XLOOKUP(Transaction_Date, Rate_Table[Date], Rate_Table[Rate], , -1).",
    "explanation": "XLOOKUP with match_mode=-1 (exact match or next smaller item) matches the latest applicable exchange rate on or prior to the transaction date.",
    "hint": "XLOOKUP with match_mode = -1 on date tables.",
    "level": "Intermediate",
    "codeExample": "=[@AmountUSD] * XLOOKUP([@TxDate], FXTable[Date], FXTable[EUR_Rate], , -1)"
  },
  {
    "id": "t14_q28",
    "question": "How do you build a dynamic recurring monthly calendar grid using SEQUENCE and date formulas?",
    "shortAnswer": "Use SEQUENCE(6, 7, Start_Calendar_Date, 1) formatted as 'd'.",
    "explanation": "A 6-row by 7-column SEQUENCE starting on the Sunday on or before the 1st of the month generates a complete interactive monthly calendar grid.",
    "hint": "SEQUENCE(6, 7, first_sunday, 1).",
    "level": "Advanced",
    "codeExample": "=LET(\n  m_start, DATE(YearVal, MonthVal, 1),\n  cal_start, m_start - WEEKDAY(m_start) + 1,\n  SEQUENCE(6, 7, cal_start, 1)\n)"
  },
  {
    "id": "t14_q29",
    "question": "How do you calculate weighted average tenure across an organization's active staff?",
    "shortAnswer": "=SUMPRODUCT(YEARFRAC(Hire_Date_Range, TODAY()), Salary_Range) / SUM(Salary_Range).",
    "explanation": "YEARFRAC computes tenure in years, and SUMPRODUCT weights tenure by employee salary or headcount weighting factor.",
    "hint": "SUMPRODUCT(tenures, weights) / SUM(weights).",
    "level": "Intermediate",
    "codeExample": "=SUMPRODUCT(YEARFRAC(Staff[HireDate], TODAY()), Staff[Salary]) / SUM(Staff[Salary])"
  },
  {
    "id": "t14_q30",
    "question": "What is the hallmark of a production-grade enterprise Excel solution?",
    "shortAnswer": "Clear separation of raw data, calculation modeling, and presentation layers; robust error handling; structured tables; and clear documentation.",
    "explanation": "Enterprise workbooks separate Raw Data (Tables), Calculations (Formulas/LAMBDA), and Dashboard UI, using explicit names, zero magic numbers, and rigorous IFERROR protection.",
    "hint": "Modular 3-tier architecture: Data, Logic, Presentation.",
    "level": "Advanced",
    "codeExample": "// Enterprise Pattern:\n// 1. Data_Table -> 2. Model_Logic (LET/LAMBDA) -> 3. Executive_Dashboard"
  }
];

export default topic14Questions;
