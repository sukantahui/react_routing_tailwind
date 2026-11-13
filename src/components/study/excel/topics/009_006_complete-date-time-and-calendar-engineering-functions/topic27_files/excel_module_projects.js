export const excelModuleProjectsData = {
  "projectCategory": "Date, Time & Calendar Engineering: 25 Real-World Workplace Capstone Projects",
  "subject": "Complete Date, Time & Calendar Engineering Functions",
  "trackCode": "EXCEL-PRO-901 / MOD-009-006",
  "level": "Beginner to Advanced Enterprise Modeling",
  "tools": [
    "Excel 365",
    "Excel 2021",
    "Power Query",
    "Excel Online"
  ],
  "institute": {
    "author": "Sukanta Hui",
    "name": "Coder & AccoTax",
    "location": "Barrackpore & Naihati"
  },
  "projects": [
    {
      "projectId": "PRJ-DTC-01",
      "title": "Multi-Country Working Days SLA & International Weekend Matrix",
      "difficulty": "beginner",
      "sheetName": "PRJ_DTC_01",
      "formula": "=NETWORKDAYS.INTL(B4, C4, \"0000011\", Holidays!$B$4:$B$25)",
      "description": "As an International Logistics Operations Analyst at Coder & AccoTax Global Freight, you are auditing cross-border carrier delivery performance. Western corridors follow Saturday/Sunday weekends ('0000011'), whereas Middle East GCC corridors follow Friday/Saturday weekends ('0000110'). Calculate the exact business transit days between departure date (Column B) and port customs clearance date (Column C), accounting for statutory national holidays on the Holidays tab.",
      "requirements": [
        "Open worksheet **PRJ_DTC_01** and locate shipment records in range **B4:C25**.",
        "In cell **D4**, enter formula `=NETWORKDAYS.INTL(B4, C4, \"0000011\", Holidays!$B$4:$B$25)`.",
        "Lock the holiday parameter range with absolute references (**$B$4:$B$25**) so the formula copies safely.",
        "Double-click the fill handle to populate the formula down through row 25.",
        "Verify that weekend days and bank holidays are properly deducted from transit day counts."
      ],
      "stepByStep": "1. **Select Target Cell D4**: Click cell D4 on sheet **PRJ_DTC_01**.\n2. **Type the Formula**: Enter `=NETWORKDAYS.INTL(B4, C4, \"0000011\", Holidays!$B$4:$B$25)`.\n3. **Lock External Range**: Highlight `Holidays!B4:B25` and press **F4** to apply absolute locks.\n4. **Execute & Propagate**: Press **Enter**, then double-click the fill handle at the bottom-right corner of D4.\n5. **Audit Weekend Alignment**: Verify that shipments spanning a weekend reflect the exact 5-day workweek.",
      "rawMemoryVsRendered": {
        "raw": "18",
        "mask": "General / Integer",
        "rendered": "18 Working Days"
      },
      "expectedOutput": "| Tracking ID | Origin Departure (B) | Customs Clearance (C) | Applied Formula | Net Working Days (D) | Status |\n| ----------- | -------------------- | --------------------- | --------------- | -------------------- | ------ |\n| SHP-9011    | 05-Jan-2026          | 29-Jan-2026           | `=NETWORKDAYS.INTL(B4,C4,\"0000011\",Holidays!$B$4:$B$25)` | 18 | SLA Compliant |\n| SHP-9012    | 12-Jan-2026          | 04-Feb-2026           | `=NETWORKDAYS.INTL(B5,C5,\"0000011\",Holidays!$B$4:$B$25)` | 17 | SLA Compliant |",
      "proTip": "The 7-character string parameter ('0000011') represents Monday through Sunday in order (1 = non-working day, 0 = working day). For a 6-day workweek with Sunday off, use '0000001'!"
    },
    {
      "projectId": "PRJ-DTC-02",
      "title": "Precision Employee Service Tenure & Statutory Gratuity Tier Engine",
      "difficulty": "beginner",
      "sheetName": "PRJ_DTC_02",
      "formula": "=DATEDIF(B4, TODAY(), \"Y\") & \" Yrs \" & DATEDIF(B4, TODAY(), \"YM\") & \" Mos \" & DATEDIF(B4, TODAY(), \"MD\") & \" Days\"",
      "description": "As an HR Compensation & Benefits Manager at AccoTax Solutions, you need to calculate exact employee service tenures from their joining dates (Column B) to the current date. Furthermore, under the Payment of Gratuity Act 1972, employees completing 5 or more full years of service ('Y' >= 5) are eligible for statutory gratuity. Assemble a human-readable service tenure string and verify statutory eligibility.",
      "requirements": [
        "Access worksheet **PRJ_DTC_02** containing employee joining dates in range **B4:B30**.",
        "In cell **C4**, write a compound formula using **DATEDIF** with interval codes `\"Y\"`, `\"YM\"`, and `\"MD\"`.",
        "Concatenate the values with descriptive strings: `\" Yrs \"`, `\" Mos \"`, and `\" Days\"`.",
        "In cell **D4**, evaluate gratuity eligibility using `=IF(DATEDIF(B4, TODAY(), \"Y\") >= 5, \"ELIGIBLE\", \"INELIGIBLE\")`.",
        "Fill formulas down across all active employee rows."
      ],
      "stepByStep": "1. **Navigate to Cell C4**: Click cell C4 on sheet **PRJ_DTC_02**.\n2. **Construct Years Segment**: Type `=DATEDIF(B4, TODAY(), \"Y\") & \" Yrs \"`.\n3. **Append Months Segment**: Add `& DATEDIF(B4, TODAY(), \"YM\") & \" Mos \"`.\n4. **Append Days Segment**: Add `& DATEDIF(B4, TODAY(), \"MD\") & \" Days\"`.\n5. **Configure Eligibility in D4**: In cell D4, input `=IF(DATEDIF(B4, TODAY(), \"Y\") >= 5, \"ELIGIBLE\", \"INELIGIBLE\")`.\n6. **Copy Downward**: Select C4:D4 and double-click the fill handle.",
      "rawMemoryVsRendered": {
        "raw": "6 Yrs 4 Mos 18 Days",
        "mask": "Text String",
        "rendered": "6 Yrs 4 Mos 18 Days"
      },
      "expectedOutput": "| Emp ID | Joining Date (B) | Full Service Tenure (C) | Gratuity Status (D) |\n| ------ | ---------------- | ----------------------- | ------------------- |\n| EMP-101 | 15-Jul-2019      | 7 Yrs 3 Mos 28 Days     | ELIGIBLE            |\n| EMP-102 | 01-Feb-2023      | 3 Yrs 9 Mos 11 Days     | INELIGIBLE          |",
      "proTip": "DATEDIF is an undocumented Excel compatibility function inherited from Lotus 1-2-3. It will not show parameter tooltips in the Formula Bar, so memorize its 6 interval flags: 'Y', 'M', 'D', 'YM', 'YD', and 'MD'!"
    },
    {
      "projectId": "PRJ-DTC-03",
      "title": "24/7 Overnight Factory Shift Duration & Night Differential Payroll",
      "difficulty": "beginner",
      "sheetName": "PRJ_DTC_03",
      "formula": "=MOD(C4 - B4, 1) * 24 - D4",
      "description": "In industrial 24/7 manufacturing plants, graveyard shifts typically start at 22:00 (10:00 PM) and end at 06:30 (6:30 AM) the next calendar day. A simple subtraction `(End - Start)` returns a negative serial number, causing Excel to render a `#####` error. Use the modulo operator `MOD(..., 1)` to normalize midnight-crossing shift spans into clean decimal hours, and deduct unpaid meal break durations (Column D).",
      "requirements": [
        "Open worksheet **PRJ_DTC_03** with shift start times in **B4:B30** and end times in **C4:C30**.",
        "In cell **E4**, apply `=MOD(C4 - B4, 1) * 24 - D4` to calculate net payable production hours.",
        "In cell **F4**, compute night differential pay by multiplying hours worked between 22:00 and 06:00 by 1.5x basic wage.",
        "Format Column E as `0.00` (Number with 2 decimal places).",
        "Validate that both day shifts (08:00 to 17:00) and overnight shifts (22:00 to 06:30) calculate accurately."
      ],
      "stepByStep": "1. **Select Cell E4**: Click cell E4 on sheet **PRJ_DTC_03**.\n2. **Apply Modulo Math**: Enter `=MOD(C4 - B4, 1)` to wrap negative serial fractions into positive 24-hour cycles.\n3. **Scale to Hours**: Multiply by `24` e.g. `(MOD(C4 - B4, 1) * 24)`.\n4. **Subtract Break**: Append `- D4` where D4 contains break hours (e.g. 0.50 for 30 mins).\n5. **Format Result**: Press **Ctrl + 1**, select **Number**, and set Decimal Places to `2`.\n6. **Double-click Fill Handle**: Propagate down to row 30.",
      "rawMemoryVsRendered": {
        "raw": "8.0",
        "mask": "0.00",
        "rendered": "8.00 Hours"
      },
      "expectedOutput": "| Shift Code | Shift Start (B) | Shift End (C) | Break (D) | Net Payable Hours (E) | Shift Type |\n| ---------- | --------------- | ------------- | --------- | --------------------- | ---------- |\n| SHIFT-A    | 22:00           | 06:30         | 0.50      | 8.00                  | Overnight  |\n| SHIFT-B    | 08:30           | 17:00         | 0.50      | 8.00                  | Day        |",
      "proTip": "In Excel, 1 whole integer equals 24 hours. Because time is a positive fraction between 0.0 and 0.99999, MOD(negative_fraction, 1) mathematical identity automatically returns the correct elapsed time forward across midnight!"
    },
    {
      "projectId": "PRJ-DTC-04",
      "title": "Multi-Jurisdiction Fiscal Year & Tax Quarter Allocator",
      "difficulty": "intermediate",
      "sheetName": "PRJ_DTC_04",
      "formula": "=\"FY \" & IF(MONTH(B4)>=4, YEAR(B4) & \"-\" & RIGHT(YEAR(B4)+1, 2), (YEAR(B4)-1) & \"-\" & RIGHT(YEAR(B4), 2)) & \" | Q\" & CHOOSE(MONTH(B4), 4, 4, 4, 1, 1, 1, 2, 2, 2, 3, 3, 3)",
      "description": "Corporate financial statements in India, the UK, and Japan follow fiscal years that do not align with calendar years. In India, the Fiscal Year runs from April 1 to March 31. An invoice dated 15-Feb-2026 belongs to FY 2025-26 (Q4), while an invoice dated 10-May-2026 belongs to FY 2026-27 (Q1). Build an automated financial period mapping formula for general ledger auditing.",
      "requirements": [
        "Open worksheet **PRJ_DTC_04** with transaction voucher dates in **B4:B40**.",
        "In cell **C4**, write a dynamic formula combining **MONTH**, **YEAR**, and **CHOOSE** to output the Indian Fiscal Year and Quarter.",
        "Ensure months 1, 2, 3 map to Q4 of the previous year's cohort.",
        "Ensure months 4, 5, 6 map to Q1, months 7, 8, 9 to Q2, and months 10, 11, 12 to Q3.",
        "Fill formula across all ledger rows and verify fiscal quarter boundary integrity."
      ],
      "stepByStep": "1. **Navigate to C4**: Click cell C4 on worksheet **PRJ_DTC_04**.\n2. **Assemble FY Prefix**: Type `=\"FY \" & IF(MONTH(B4)>=4, YEAR(B4) & \"-\" & RIGHT(YEAR(B4)+1, 2), (YEAR(B4)-1) & \"-\" & RIGHT(YEAR(B4), 2))`.\n3. **Map Quarters with CHOOSE**: Append `& \" | Q\" & CHOOSE(MONTH(B4), 4, 4, 4, 1, 1, 1, 2, 2, 2, 3, 3, 3)`.\n4. **Press Enter & Audit**: Test with dates in January, April, July, and October.\n5. **Fill Column C**: Double-click fill handle to populate through C40.",
      "rawMemoryVsRendered": {
        "raw": "FY 2025-26 | Q4",
        "mask": "Text String",
        "rendered": "FY 2025-26 | Q4"
      },
      "expectedOutput": "| Voucher No | Voucher Date (B) | Fiscal Period Allocation (C) | Audit Bucket |\n| ---------- | ---------------- | ---------------------------- | ------------ |\n| VCH-501    | 14-Feb-2026      | FY 2025-26 | Q4              | Annual Close |\n| VCH-502    | 22-Apr-2026      | FY 2026-27 | Q1              | Q1 Advance Tax |",
      "proTip": "CHOOSE(MONTH(B4), 4,4,4, 1,1,1, 2,2,2, 3,3,3) is faster and much cleaner than nesting multiple IF statements. It directly maps month index 1 through 12 to its corresponding quarter number!"
    },
    {
      "projectId": "PRJ-DTC-05",
      "title": "Commercial Banking EMI Amortization & Holiday-Adjusted Repayment Scheduler",
      "difficulty": "intermediate",
      "sheetName": "PRJ_DTC_05",
      "formula": "=WORKDAY.INTL(EDATE($B$4, A4), 0, 1, Holidays!$B$4:$B$25)",
      "description": "Commercial term loans require monthly EMI debit schedules. When an EMI scheduled due date lands on a second/fourth Saturday, a Sunday, or an RBI clearing holiday, banking clearing mandates require the debit date to roll to the next valid business day. Using initial loan disbursal date in $B$4 and month index in Column A, generate exact compliant repayment dates.",
      "requirements": [
        "Open worksheet **PRJ_DTC_05** with loan disbursal date in **$B$4** and repayment month numbers (1 to 60) in **A4:A63**.",
        "In cell **B4**, verify loan disbursal date format is `DD-MMM-YYYY`.",
        "In cell **C4**, write `=WORKDAY.INTL(EDATE($B$4, A4), 0, 1, Holidays!$B$4:$B$25)`.",
        "Observe how `WORKDAY.INTL(..., 0, ...)` dynamically verifies if the date is a holiday or weekend and advances it to the next valid working day if needed.",
        "Populate the schedule through month 60."
      ],
      "stepByStep": "1. **Select Cell C4**: Click cell C4 on sheet **PRJ_DTC_05**.\n2. **Offset Monthly Date**: Input `=EDATE($B$4, A4)` to calculate raw calendar anniversary.\n3. **Wrap with WORKDAY.INTL**: Wrap the raw date inside `=WORKDAY.INTL(EDATE($B$4, A4), 0, 1, Holidays!$B$4:$B$25)`.\n4. **Verify Behavior**: Note that adding 0 working days evaluates whether the date itself is valid; if not, it automatically shifts to the next working day.\n5. **Apply Date Formatting**: Format column C as `DD-MMM-YYYY`.\n6. **Copy Downward**: Double-click fill handle down to row 63.",
      "rawMemoryVsRendered": {
        "raw": "46055",
        "mask": "DD-MMM-YYYY",
        "rendered": "02-Feb-2026"
      },
      "expectedOutput": "| Installment # (A) | Raw Month Due | Adjusted Clearing Date (C) | Day of Week | Holiday Note |\n| ----------------- | ------------- | -------------------------- | ----------- | ------------ |\n| 1                 | 01-Feb-2026   | 02-Feb-2026                | Monday      | Sun Rolled   |\n| 2                 | 01-Mar-2026   | 02-Mar-2026                | Monday      | Sun Rolled   |",
      "proTip": "Passing 0 as the second argument to WORKDAY.INTL is a brilliant Excel trick: if the date is a weekend or holiday, Excel moves it forward to the earliest valid business day!"
    },
    {
      "projectId": "PRJ-DTC-06",
      "title": "ISO 8601 Supply Chain Week Code & Production Batch Identifier",
      "difficulty": "intermediate",
      "sheetName": "PRJ_DTC_06",
      "formula": "=YEAR(B4) & \"-W\" & TEXT(ISOWEEKNUM(B4), \"00\") & \"-\" & WEEKDAY(B4, 2)",
      "description": "International retail giants (such as Walmart, Amazon, and IKEA) track manufacturing production lots using ISO 8601 week stamps (`YYYY-Www-D`). Standard WEEKNUM fails because it starts Week 1 on January 1 regardless of day of week. ISOWEEKNUM strictly implements ISO 8601, where Week 1 is the week containing the first Thursday of the year. Build an automated batch code generator.",
      "requirements": [
        "Open worksheet **PRJ_DTC_06** with plant packaging timestamps in **B4:B35**.",
        "In cell **C4**, generate the ISO week number using `ISOWEEKNUM(B4)`.",
        "In cell **D4**, construct the complete composite batch serial code `=YEAR(B4) & \"-W\" & TEXT(ISOWEEKNUM(B4), \"00\") & \"-\" & WEEKDAY(B4, 2)`.",
        "Format week numbers with leading zeros so single-digit weeks appear as `W01` through `W09`.",
        "Fill formula across all rows and cross-check year-boundary edge cases."
      ],
      "stepByStep": "1. **Navigate to Cell D4**: Click cell D4 on sheet **PRJ_DTC_06**.\n2. **Extract Year**: Type `=YEAR(B4)`.\n3. **Add ISO Week Marker**: Concatenate `& \"-W\"`.\n4. **Format ISO Week**: Add `& TEXT(ISOWEEKNUM(B4), \"00\")`.\n5. **Append Day Index**: Add `& \"-\" & WEEKDAY(B4, 2)` where `2` designates Monday as day 1.\n6. **Deploy**: Double-click fill handle down through row 35.",
      "rawMemoryVsRendered": {
        "raw": "2026-W05-1",
        "mask": "Text String",
        "rendered": "2026-W05-1"
      },
      "expectedOutput": "| Lot No | Production Date (B) | ISO Week (C) | Batch Code (D) | Production Day |\n| ------ | ------------------- | ------------ | -------------- | -------------- |\n| LOT-881 | 26-Jan-2026         | 5            | 2026-W05-1     | Monday         |\n| LOT-882 | 27-Jan-2026         | 5            | 2026-W05-2     | Tuesday        |",
      "proTip": "In ISO 8601, if January 1 falls on a Friday, Saturday, or Sunday, it belongs to Week 52 or 53 of the previous year! Always use ISOWEEKNUM for European and global enterprise data."
    },
    {
      "projectId": "PRJ-DTC-07",
      "title": "Fixed Income Bond Accrued Interest & Day-Count Convention Engine",
      "difficulty": "advanced",
      "sheetName": "PRJ_DTC_07",
      "formula": "=YEARFRAC(B4, C4, D4) * E4 * F4",
      "description": "In corporate treasury and debt securities trading, calculating accrued interest requires exact financial day-count conventions. US Corporate Bonds use 30/360 (basis 0), Government Sovereign Gilts use Actual/Actual (basis 1), Money Market Instruments use Actual/360 (basis 2), and Eurobonds use Actual/365 (basis 3). Build a dynamic interest valuation engine.",
      "requirements": [
        "Open worksheet **PRJ_DTC_07** containing coupon settlement dates in **B4:B30**, maturity dates in **C4:C30**, basis codes in **D4:D30**, face value in **E4:E30**, and annual coupon rate in **F4:F30**.",
        "In cell **G4**, write `=YEARFRAC(B4, C4, D4) * E4 * F4`.",
        "In cell **H4**, calculate the annual fraction to 6 decimal places using `=YEARFRAC(B4, C4, D4)`.",
        "Format accrued interest in Column G as currency `₹#,##0.00`.",
        "Compare interest amounts between basis 0 (30/360) and basis 1 (Actual/Actual) to evaluate basis risk."
      ],
      "stepByStep": "1. **Select Cell G4**: Click cell G4 on sheet **PRJ_DTC_07**.\n2. **Apply YEARFRAC**: Type `=YEARFRAC(B4, C4, D4)`.\n3. **Multiply by Face Value**: Append `* E4`.\n4. **Multiply by Coupon Rate**: Append `* F4`.\n5. **Format Currency**: Press **Ctrl + 1**, select **Currency**, symbol `₹`, decimals `2`.\n6. **Copy Down**: Drag fill handle down to G30.",
      "rawMemoryVsRendered": {
        "raw": "41250.00",
        "mask": "₹#,##0.00",
        "rendered": "₹41,250.00"
      },
      "expectedOutput": "| Security Name | Issue Date (B) | Settlement Date (C) | Basis (D) | Face Value (E) | Coupon Rate (F) | Accrued Interest (G) |\n| ------------- | -------------- | ------------------- | --------- | -------------- | --------------- | -------------------- |\n| 8.25% GOI 2030 | 15-Jan-2026   | 15-Jul-2026         | 1         | 10,00,000      | 8.25%           | ₹41,250.00           |\n| T-Bill 91D     | 01-Jan-2026   | 02-Apr-2026         | 2         | 50,00,000      | 6.80%           | ₹85,944.44           |",
      "proTip": "Basis 0: 30/360 US (NASD). Basis 1: Actual/Actual (Government Bonds). Basis 2: Actual/360 (Commercial Paper & Money Market). Basis 3: Actual/365 (UK/Commonwealth Bonds). Basis 4: European 30/360."
    },
    {
      "projectId": "PRJ-DTC-08",
      "title": "Industrial Equipment Lead-Time & Guaranteed Dispatch Forecaster",
      "difficulty": "intermediate",
      "sheetName": "PRJ_DTC_08",
      "formula": "=WORKDAY.INTL(B4, C4, 11, Holidays!$B$4:$B$25)",
      "description": "Heavy engineering manufacturing plants operate on a 6-day workweek with Sunday as the sole non-working day. When a customer places a customized machinery order on date B4 with manufacturing lead time of C4 business days, compute the legally guaranteed dispatch milestone date, skipping Sundays (weekend code 11) and statutory plant maintenance shutdown dates listed on the Holidays tab.",
      "requirements": [
        "Access worksheet **PRJ_DTC_08** with purchase order dates in **B4:B30** and lead days in **C4:C30**.",
        "In cell **D4**, enter `=WORKDAY.INTL(B4, C4, 11, Holidays!$B$4:$B$25)`.",
        "Verify that the weekend code `11` represents Sunday-only non-working schedule.",
        "Format column D as `DD-MMM-YYYY`.",
        "Populate through row 30 and ensure no computed dispatch dates fall on a Sunday or holiday."
      ],
      "stepByStep": "1. **Select Cell D4**: Click cell D4 on sheet **PRJ_DTC_08**.\n2. **Type WORKDAY.INTL**: Enter `=WORKDAY.INTL(B4, C4, 11, Holidays!$B$4:$B$25)`.\n3. **Lock Shutdown List**: Ensure `Holidays!$B$4:$B$25` is locked with dollar signs.\n4. **Format Result**: Press **Ctrl + Shift + 3** to apply date formatting `DD-MMM-YYYY`.\n5. **Audit Output**: Confirm that lead times spanning 2 weeks calculate exactly 12 working days (skipping 2 Sundays).",
      "rawMemoryVsRendered": {
        "raw": "46067",
        "mask": "DD-MMM-YYYY",
        "rendered": "14-Feb-2026"
      },
      "expectedOutput": "| Order ID | Order Received (B) | Lead Days (C) | Weekend Code | Promised Dispatch (D) | Dispatch Day |\n| -------- | ------------------ | ------------- | ------------ | ---------------------- | ------------ |\n| PO-7701  | 02-Jan-2026        | 15            | 11 (Sun)     | 20-Jan-2026            | Tuesday      |\n| PO-7702  | 15-Jan-2026        | 24            | 11 (Sun)     | 13-Feb-2026            | Friday       |",
      "proTip": "WORKDAY.INTL weekend codes: 1=Sat/Sun, 2=Sun/Mon, 3=Mon/Tue, 4=Tue/Wed, 5=Wed/Thu, 6=Thu/Fri, 7=Fri/Sat. Single-day codes: 11=Sun only, 12=Mon only, 13=Tue only, 14=Wed only, 15=Thu only, 16=Fri only, 17=Sat only."
    },
    {
      "projectId": "PRJ-DTC-09",
      "title": "IT Helpdesk 4-Hour SLA Business-Hours Breach Monitor",
      "difficulty": "advanced",
      "sheetName": "PRJ_DTC_09",
      "formula": "=LET(startD, B4, endD, C4, daysCount, NETWORKDAYS(startD, endD, Holidays!$B$4:$B$25), IF(INT(startD)=INT(endD), (MOD(endD,1)-MOD(startD,1))*24, (daysCount-2)*9 + (TIME(18,0,0)-MOD(startD,1))*24 + (MOD(endD,1)-TIME(9,0,0))*24))",
      "description": "Enterprise ITIL Level-3 incident response agreements mandate resolving critical server outages within 4 business hours. Business support operates strictly from 09:00 AM to 06:00 PM (9 business hours daily), excluding weekends and public holidays. Calculate the exact business working hours elapsed between incident ticket logging timestamp (B4) and incident resolution timestamp (C4).",
      "requirements": [
        "Open worksheet **PRJ_DTC_09** with ticket open timestamps in **B4:B30** and resolution timestamps in **C4:C30**.",
        "In cell **D4**, enter the business-hours LET calculation model.",
        "Handle same-day resolution vs multi-day business resolution logic.",
        "In cell **E4**, flag breach status: `=IF(D4 > 4.0, \"SLA BREACHED\", \"MET SLA\")`.",
        "Apply conditional formatting: Soft red fill for `SLA BREACHED`, soft emerald fill for `MET SLA`."
      ],
      "stepByStep": "1. **Navigate to D4**: Click cell D4 on sheet **PRJ_DTC_09**.\n2. **Input Formula**: Type the nested LET formula calculating elapsed business hours.\n3. **Set Threshold in E4**: Type `=IF(D4 > 4.0, \"SLA BREACHED\", \"MET SLA\")`.\n4. **Format Numbers**: Format column D as `0.00` decimal hours.\n5. **Fill Records**: Drag formula down to row 30.\n6. **Validate Weekend Invariance**: Confirm tickets logged Friday 5 PM and resolved Monday 10 AM show only 2 business hours!",
      "rawMemoryVsRendered": {
        "raw": "3.25",
        "mask": "0.00",
        "rendered": "3.25 Hours"
      },
      "expectedOutput": "| Incident # | Ticket Open (B) | Ticket Resolved (C) | Elapsed Biz Hours (D) | SLA Target | Compliance Status (E) |\n| ---------- | --------------- | ------------------- | --------------------- | ---------- | --------------------- |\n| INC-4001   | 16-Jan-2026 16:30 | 19-Jan-2026 10:15 | 2.75                  | 4.00 Hours | MET SLA               |\n| INC-4002   | 20-Jan-2026 10:00 | 20-Jan-2026 15:30 | 5.50                  | 4.00 Hours | SLA BREACHED          |",
      "proTip": "By multiplying elapsed serial time by 24, Excel converts days into decimal hours. Subtracting non-business night hours (6 PM to 9 AM = 15 hours) ensures only contracted support window time counts."
    },
    {
      "projectId": "PRJ-DTC-10",
      "title": "Universal UTC/ISO 8601 Timestamp to Local IST Timezone Parser",
      "difficulty": "intermediate",
      "sheetName": "PRJ_DTC_10",
      "formula": "=DATEVALUE(LEFT(B4, 10)) + TIMEVALUE(MID(B4, 12, 8)) + (5.5 / 24)",
      "description": "Cloud database audit logs (AWS CloudTrail, GitHub Webhooks, Stripe API) export timestamps in standard ISO 8601 UTC format e.g. `2026-02-15T18:45:30Z`. Excel treats these raw strings as plain text. Parse the ISO string into native serial date and time numbers, and adjust for Indian Standard Time (IST = UTC + 5 hours 30 minutes).",
      "requirements": [
        "Open worksheet **PRJ_DTC_10** containing raw UTC strings in range **B4:B30**.",
        "In cell **C4**, parse the date component using `DATEVALUE(LEFT(B4, 10))`.",
        "Parse the time component using `TIMEVALUE(MID(B4, 12, 8))`.",
        "Add the IST offset of `(5.5 / 24)` to convert UTC to IST.",
        "Format column C as `YYYY-MM-DD HH:MM:SS` and verify midnight rollover changes the date correctly."
      ],
      "stepByStep": "1. **Select Cell C4**: Click cell C4 on sheet **PRJ_DTC_10**.\n2. **Extract Date Serial**: Enter `DATEVALUE(LEFT(B4, 10))`.\n3. **Extract Time Serial**: Add `+ TIMEVALUE(MID(B4, 12, 8))`.\n4. **Apply Timezone Shift**: Add `+ (5.5 / 24)`.\n5. **Apply Custom Formatting**: Press **Ctrl + 1**, select **Custom**, enter `yyyy-mm-dd hh:mm:ss`.\n6. **Double-click Fill Handle**: Propagate down to row 30.",
      "rawMemoryVsRendered": {
        "raw": "46069.01076",
        "mask": "yyyy-mm-dd hh:mm:ss",
        "rendered": "2026-02-16 00:15:30"
      },
      "expectedOutput": "| Event ID | Raw UTC String (B) | Converted Local IST (C) | Day Shift Note |\n| -------- | ------------------ | ----------------------- | -------------- |\n| EVT-101  | 2026-02-15T18:45:30Z | 2026-02-16 00:15:30    | Next Day Rolled |\n| EVT-102  | 2026-02-15T04:20:10Z | 2026-02-15 09:50:10    | Same Day       |",
      "proTip": "5 hours 30 minutes in Excel serial time is exactly 5.5 / 24 = 0.2291667. For US Eastern Time (UTC - 5), subtract (5 / 24)!"
    },
    {
      "projectId": "PRJ-DTC-11",
      "title": "Commercial Real Estate Lease Renewal & Escalation Notice Alert",
      "difficulty": "intermediate",
      "sheetName": "PRJ_DTC_11",
      "formula": "=LET(exp, EDATE(B4, C4), daysLeft, exp - TODAY(), IF(daysLeft < 0, \"EXPIRED\", IF(daysLeft <= 30, \"CRITICAL: RENEW NOW\", IF(daysLeft <= 90, \"UPCOMING EXPIRY\", \"ACTIVE\"))))",
      "description": "Property management firms manage multi-year commercial tenancy contracts. Each lease commences on date B4 for a term of C4 months. Standard legal lease agreements require serving tenant renewal or rent escalation notices 90 days prior to lease termination. Build an automated lease expiration date generator and dynamic notice urgency classifier.",
      "requirements": [
        "Access worksheet **PRJ_DTC_11** with lease commencement dates in **B4:B30** and tenure in months in **C4:C30**.",
        "In cell **D4**, compute the contract expiry date using `=EDATE(B4, C4)`.",
        "In cell **E4**, write `=D4 - TODAY()` to compute days remaining until termination.",
        "In cell **F4**, classify notice urgency into `EXPIRED`, `CRITICAL: RENEW NOW`, `UPCOMING EXPIRY`, or `ACTIVE`.",
        "Format Column D as `DD-MMM-YYYY` and fill formulas down through row 30."
      ],
      "stepByStep": "1. **Navigate to D4**: Click cell D4 on sheet **PRJ_DTC_11**.\n2. **Type EDATE**: Enter `=EDATE(B4, C4)`.\n3. **Compute Remaining Days in E4**: Type `=D4 - TODAY()`.\n4. **Classify in F4**: Type `=IF(E4<0, \"EXPIRED\", IF(E4<=30, \"CRITICAL: RENEW NOW\", IF(E4<=90, \"UPCOMING EXPIRY\", \"ACTIVE\")))`.\n5. **Format Columns**: Set column D to Date, column E to Number `0`.\n6. **Populate Schedule**: Drag D4:F4 down to row 30.",
      "rawMemoryVsRendered": {
        "raw": "24",
        "mask": "General",
        "rendered": "CRITICAL: RENEW NOW"
      },
      "expectedOutput": "| Unit No | Lease Start (B) | Term Mos (C) | Expiration Date (D) | Days Left (E) | Notice Status (F) |\n| ------- | --------------- | ------------ | ------------------- | ------------- | ----------------- |\n| STE-401 | 01-Jan-2024     | 24           | 01-Jan-2026         | -42           | EXPIRED           |\n| STE-402 | 15-Mar-2023     | 36           | 15-Mar-2026         | 31            | UPCOMING EXPIRY   |",
      "proTip": "EDATE automatically handles months with varying day counts (28, 30, 31 days) and leap years. If you add 12 months to 29-Feb-2024, EDATE returns 28-Feb-2025!"
    },
    {
      "projectId": "PRJ-DTC-12",
      "title": "Hospital Inpatient Length of Stay (LOS) & ICU Fractional Day Billing",
      "difficulty": "intermediate",
      "sheetName": "PRJ_DTC_12",
      "formula": "=INT(C4 - B4) + IF(MOD(C4 - B4, 1) > 0.5, 1, 0.5)",
      "description": "Hospital billing systems compute bed occupancy charges based on patient admission timestamp (B4) and discharge timestamp (C4). Patients discharged within 12 hours of their last full day are billed an additional half-day rate (0.5 day), while stays exceeding 12 hours bill a full day rate (1.0 day). Model exact billable inpatient days for insurance TPA claims.",
      "requirements": [
        "Open worksheet **PRJ_DTC_12** with admission timestamps in **B4:B30** and discharge timestamps in **C4:C30**.",
        "In cell **D4**, calculate raw elapsed calendar days using `=C4 - B4`.",
        "In cell **E4**, enter formula `=INT(C4 - B4) + IF(MOD(C4 - B4, 1) > 0.5, 1, 0.5)` to determine billable days.",
        "In cell **F4**, multiply billable days by the daily ICU room tariff in Column G.",
        "Verify that a stay of 3 days and 14 hours bills as 4.0 days, while 3 days and 6 hours bills as 3.5 days."
      ],
      "stepByStep": "1. **Select Cell E4**: Click cell E4 on sheet **PRJ_DTC_12**.\n2. **Extract Whole Days**: Enter `INT(C4 - B4)`.\n3. **Evaluate Remaining Fraction**: Add `+ IF(MOD(C4 - B4, 1) > 0.5, 1, 0.5)`.\n4. **Format Number**: Set format to Number `0.0`.\n5. **Compute Bill in F4**: Type `=E4 * G4` where G4 is Room Rate.\n6. **Copy Downward**: Double-click fill handle down to row 30.",
      "rawMemoryVsRendered": {
        "raw": "3.5",
        "mask": "0.0",
        "rendered": "3.5 Billable Days"
      },
      "expectedOutput": "| Patient ID | Admission (B) | Discharge (C) | Raw Stay Days | Billable Days (E) | Daily Tariff | Total Room Bill |\n| ---------- | ------------- | ------------- | ------------- | ----------------- | ------------ | --------------- |\n| PAT-901    | 10-Feb-2026 09:00 | 13-Feb-2026 14:00 | 3.21 | 3.5 | ₹6,000 | ₹21,000.00 |\n| PAT-902    | 12-Feb-2026 11:30 | 16-Feb-2026 23:45 | 4.51 | 5.0 | ₹8,500 | ₹42,500.00 |",
      "proTip": "INT strips the decimal fraction and returns only whole days. MOD(datetime, 1) isolates the fractional day portion (e.g. 0.5 = 12 hours)."
    },
    {
      "projectId": "PRJ-DTC-13",
      "title": "Warehouse Inventory FIFO Ageing Buckets & Obsolescence Risk",
      "difficulty": "beginner",
      "sheetName": "PRJ_DTC_13",
      "formula": "=IF((TODAY()-B4)<=30, \"0-30 Days\", IF((TODAY()-B4)<=60, \"31-60 Days\", IF((TODAY()-B4)<=90, \"61-90 Days\", IF((TODAY()-B4)<=180, \"91-180 Days\", \"180+ Days (OBSOLETE)\"))))",
      "description": "Retail and manufacturing inventory must be classified into standard ageing brackets to calculate write-down provisions under accounting standard Ind AS 2 / IAS 2. Using receipt date (Column B), calculate exact shelf age in days and assign stock into 0-30, 31-60, 61-90, 91-180, or 180+ Days (Obsolete) provision tiers.",
      "requirements": [
        "Access worksheet **PRJ_DTC_13** with goods received dates in **B4:B35**.",
        "In cell **C4**, calculate age in days using `=TODAY() - B4`.",
        "In cell **D4**, write the nested IF formula assigning the inventory ageing tier.",
        "In cell **E4**, calculate obsolescence provision rate: `180+ Days` = 100%, `91-180 Days` = 50%, `61-90 Days` = 20%, others = 0%.",
        "Populate formula down across all inventory items."
      ],
      "stepByStep": "1. **Navigate to C4**: Click cell C4 on sheet **PRJ_DTC_13**.\n2. **Type Age Formula**: Enter `=TODAY() - B4`.\n3. **Configure Ageing Tier in D4**: Input `=IF(C4<=30, \"0-30 Days\", IF(C4<=60, \"31-60 Days\", IF(C4<=90, \"61-90 Days\", IF(C4<=180, \"91-180 Days\", \"180+ Days (OBSOLETE)\"))))`.\n4. **Set Provision in E4**: Type `=IF(C4>180, 1.0, IF(C4>90, 0.5, IF(C4>60, 0.2, 0)))`.\n5. **Format Column E**: Format as Percentage `0.0%`.\n6. **Fill Range**: Drag C4:E4 down to row 35.",
      "rawMemoryVsRendered": {
        "raw": "91-180 Days",
        "mask": "Text String",
        "rendered": "91-180 Days"
      },
      "expectedOutput": "| SKU Code | Goods Receipt Date (B) | Age in Days (C) | Ageing Bracket (D) | Provision Rate (E) |\n| -------- | ---------------------- | --------------- | ------------------ | ------------------ |\n| SKU-108  | 15-Nov-2025            | 89              | 61-90 Days         | 20.0%              |\n| SKU-109  | 01-Jul-2025            | 226             | 180+ Days (OBSOLETE) | 100.0%           |",
      "proTip": "TODAY() recalculates dynamically every time the workbook opens or calculates, keeping the inventory ageing schedule perpetually up to date without manual adjustments!"
    },
    {
      "projectId": "PRJ-DTC-14",
      "title": "Airline Flight Turnaround & Ground Handling Delay Penalizer",
      "difficulty": "intermediate",
      "sheetName": "PRJ_DTC_14",
      "formula": "=MAX(0, (MOD(C4 - B4, 1) * 1440) - D4)",
      "description": "Airport ground operations teams must turn around narrow-body commercial passenger aircraft within 45 minutes of touchdown. When actual chocks-on timestamp is recorded in B4 and pushback clearance timestamp is in C4, compute exact elapsed turnaround time in minutes (handling overnight flights across midnight), and calculate chargeable delay minutes beyond target turnaround SLA (D4).",
      "requirements": [
        "Open worksheet **PRJ_DTC_14** with arrival chocks-on times in **B4:B30** and pushback times in **C4:C30**.",
        "In cell **E4**, calculate actual turnaround duration in minutes using `=MOD(C4 - B4, 1) * 1440`.",
        "In cell **F4**, determine chargeable delay minutes using `=MAX(0, E4 - D4)` where D4 is target SLA (e.g. 45 mins).",
        "In cell **G4**, compute penalty charges at ₹1,500 per delay minute.",
        "Format columns E and F as integer numbers (`0`)."
      ],
      "stepByStep": "1. **Select Cell E4**: Click cell E4 on sheet **PRJ_DTC_14**.\n2. **Type Minute Calculation**: Enter `=MOD(C4 - B4, 1) * 1440` (since 24 hours * 60 minutes = 1440 minutes/day).\n3. **Compute Penalty Delay in F4**: Type `=MAX(0, E4 - D4)`.\n4. **Compute Fine in G4**: Type `=F4 * 1500`.\n5. **Format Currency**: Format G4 as `₹#,##0`.\n6. **Populate Downward**: Double-click fill handle down to row 30.",
      "rawMemoryVsRendered": {
        "raw": "17",
        "mask": "0",
        "rendered": "17 Mins Delay"
      },
      "expectedOutput": "| Flight No | Chocks-On (B) | Pushback (C) | Target Turnaround (D) | Actual Mins (E) | Delay Mins (F) | Penalty Fine (G) |\n| --------- | ------------- | ------------ | --------------------- | --------------- | -------------- | ---------------- |\n| 6E-204    | 23:50         | 00:52        | 45                    | 62              | 17             | ₹25,500          |\n| AI-884    | 14:10         | 14:50        | 45                    | 40              | 0              | ₹0               |",
      "proTip": "Multiply Excel serial time differences by 1440 to get total minutes, or by 86400 to get total seconds. Wrapping in MAX(0, ...) gracefully eliminates negative variance when operations finish early!"
    },
    {
      "projectId": "PRJ-DTC-15",
      "title": "Construction Project CPM Schedule Float & Critical Path Variance Tracker",
      "difficulty": "intermediate",
      "sheetName": "PRJ_DTC_15",
      "formula": "=NETWORKDAYS.INTL(B4, C4, 1, Holidays!$B$4:$B$25) - D4",
      "description": "In EPC infrastructure projects (metro rail, bridge, highway construction), project managers monitor task duration variances against baseline contractual work schedules. When actual site start date is in B4 and finish date is in C4, calculate actual net working days elapsed excluding Sundays/holidays, and compare against baseline planned working days (D4) to identify critical path slippages.",
      "requirements": [
        "Access worksheet **PRJ_DTC_15** containing construction task logs in **B4:D30**.",
        "In cell **E4**, write `=NETWORKDAYS.INTL(B4, C4, 1, Holidays!$B$4:$B$25)`.",
        "In cell **F4**, calculate schedule variance `=E4 - D4` (positive values indicate schedule delay; negative indicates ahead of schedule).",
        "In cell **G4**, assign status: `=IF(F4>5, \"CRITICAL SLIPPAGE\", IF(F4>0, \"MINOR DELAY\", \"ON SCHEDULE\"))`.",
        "Apply conditional formatting: soft amber for Minor Delay, soft red for Critical Slippage."
      ],
      "stepByStep": "1. **Navigate to E4**: Click cell E4 on sheet **PRJ_DTC_15**.\n2. **Calculate Working Days**: Type `=NETWORKDAYS.INTL(B4, C4, 1, Holidays!$B$4:$B$25)`.\n3. **Compute Variance in F4**: Type `=E4 - D4`.\n4. **Assign Health in G4**: Type `=IF(F4>5, \"CRITICAL SLIPPAGE\", IF(F4>0, \"MINOR DELAY\", \"ON SCHEDULE\"))`.\n5. **Format Columns**: Format E4:F4 as Integer numbers.\n6. **Copy Down**: Drag fill handle down through row 30.",
      "rawMemoryVsRendered": {
        "raw": "8",
        "mask": "+0;-0;0",
        "rendered": "+8 Days Slippage"
      },
      "expectedOutput": "| WBS Code | Task Name | Actual Start (B) | Actual Finish (C) | Planned Days (D) | Actual Days (E) | Variance (F) | Health (G) |\n| -------- | --------- | ---------------- | ----------------- | ---------------- | --------------- | ------------ | ---------- |\n| WBS-1.1  | Piling    | 05-Jan-2026      | 30-Jan-2026       | 15               | 20              | +5           | MINOR DELAY |\n| WBS-1.2  | Pier Cap  | 02-Feb-2026      | 05-Mar-2026       | 18               | 26              | +8           | CRITICAL SLIPPAGE |",
      "proTip": "In Gantt chart and CPM schedules, tracking working days rather than raw calendar days ensures project float is not distorted by festive shutdown weeks."
    },
    {
      "projectId": "PRJ-DTC-16",
      "title": "E-Commerce 30-Day Return & Restocking Eligibility Verifier",
      "difficulty": "beginner",
      "sheetName": "PRJ_DTC_16",
      "formula": "=IF(TODAY() <= (B4 + 30), \"ELIGIBLE FOR RETURN\", \"RETURN WINDOW CLOSED\")",
      "description": "An online fashion marketplace guarantees a 30-calendar-day doorstep return and refund window commencing from order delivery date (Column B). Customer service representatives require a real-time validation formula that calculates the exact return expiry deadline, compares against TODAY(), and validates return eligibility.",
      "requirements": [
        "Open worksheet **PRJ_DTC_16** with customer order delivery dates in **B4:B30**.",
        "In cell **C4**, calculate the last eligible return date using `=B4 + 30`.",
        "In cell **D4**, calculate days remaining in the return window using `=C4 - TODAY()`.",
        "In cell **E4**, assign eligibility status using `=IF(D4>=0, \"ELIGIBLE FOR RETURN\", \"RETURN WINDOW CLOSED\")`.",
        "Format column C as `DD-MMM-YYYY` and fill down to row 30."
      ],
      "stepByStep": "1. **Select Cell C4**: Click cell C4 on sheet **PRJ_DTC_16**.\n2. **Add 30 Days**: Enter `=B4 + 30`.\n3. **Compute Days Left in D4**: Enter `=C4 - TODAY()`.\n4. **Determine Status in E4**: Enter `=IF(D4>=0, \"ELIGIBLE FOR RETURN\", \"RETURN WINDOW CLOSED\")`.\n5. **Format Dates**: Press **Ctrl + Shift + 3** on column C.\n6. **Copy Downward**: Double-click fill handle down to row 30.",
      "rawMemoryVsRendered": {
        "raw": "ELIGIBLE FOR RETURN",
        "mask": "Text String",
        "rendered": "ELIGIBLE FOR RETURN"
      },
      "expectedOutput": "| Order # | Delivered On (B) | Return Deadline (C) | Days Left (D) | Return Status (E) |\n| ------- | ---------------- | ------------------- | ------------- | ----------------- |\n| ORD-442 | 25-Jan-2026      | 24-Feb-2026         | 12            | ELIGIBLE FOR RETURN |\n| ORD-443 | 01-Jan-2026      | 31-Jan-2026         | -12           | RETURN WINDOW CLOSED |",
      "proTip": "Because Excel dates are sequential serial integers, adding simple integers (such as + 30) directly advances calendar days without needing any special date functions!"
    },
    {
      "projectId": "PRJ-DTC-17",
      "title": "Preventive Maintenance Recurring Cycle & Weekend Snapping Engine",
      "difficulty": "intermediate",
      "sheetName": "PRJ_DTC_17",
      "formula": "=LET(rawDue, EDATE(B4, C4), wd, WEEKDAY(rawDue, 2), IF(wd=6, rawDue-1, IF(wd=7, rawDue-2, rawDue)))",
      "description": "Industrial plant machinery requires periodic preventive maintenance (PM) every 3, 6, or 12 months. Maintenance engineers only work Monday through Friday. If a scheduled recurring maintenance due date lands on a Saturday or Sunday, safety compliance requires the maintenance inspection to be brought forward to the immediate preceding Friday.",
      "requirements": [
        "Access worksheet **PRJ_DTC_17** with last maintenance dates in **B4:B30** and PM interval months in **C4:C30**.",
        "In cell **D4**, compute raw recurring date using `=EDATE(B4, C4)`.",
        "In cell **E4**, use the LET formula to snap Saturday dates to Friday (-1 day) and Sunday dates to Friday (-2 days).",
        "In cell **F4**, display the day of the week using `=TEXT(E4, \"dddd\")` to verify no weekend dates exist.",
        "Format Column E as `DD-MMM-YYYY`."
      ],
      "stepByStep": "1. **Select Cell E4**: Click cell E4 on sheet **PRJ_DTC_17**.\n2. **Input Formula**: Type `=LET(rawDue, EDATE(B4, C4), wd, WEEKDAY(rawDue, 2), IF(wd=6, rawDue-1, IF(wd=7, rawDue-2, rawDue)))`.\n3. **Inspect Day in F4**: Type `=TEXT(E4, \"dddd\")`.\n4. **Format Result**: Format column E as `DD-MMM-YYYY`.\n5. **Audit Weekend Snapping**: Confirm that a due date falling on Sunday 15-Feb snaps to Friday 13-Feb.\n6. **Fill Column**: Double-click fill handle through row 30.",
      "rawMemoryVsRendered": {
        "raw": "46066",
        "mask": "DD-MMM-YYYY",
        "rendered": "13-Feb-2026"
      },
      "expectedOutput": "| Asset Tag | Last Serviced (B) | Cycle Mos (C) | Raw Due Date | Adjusted PM Date (E) | Scheduled Day (F) |\n| --------- | ----------------- | ------------- | ------------ | -------------------- | ----------------- |\n| PUMP-01   | 15-Aug-2025       | 6             | 15-Feb-2026  | 13-Feb-2026          | Friday (Snapped)  |\n| COMP-04   | 01-Jan-2026       | 3             | 01-Apr-2026  | 01-Apr-2026          | Wednesday         |",
      "proTip": "WEEKDAY(date, 2) maps Monday=1 through Sunday=7. Checking wd=6 identifies Saturday (subtract 1) and wd=7 identifies Sunday (subtract 2) to snap to Friday."
    },
    {
      "projectId": "PRJ-DTC-18",
      "title": "Biometric Attendance Swipe In/Out Grace Period & Penalty Auditor",
      "difficulty": "intermediate",
      "sheetName": "PRJ_DTC_18",
      "formula": "=LET(swipe, MOD(B4, 1), graceLimit, TIME(9, 15, 0), normalStart, TIME(9, 0, 0), IF(swipe > graceLimit, (swipe - normalStart) * 1440, 0))",
      "description": "A corporate office biometric attendance system records morning employee swipe-in timestamps. Standard office hours begin at 09:00 AM, with a 15-minute grace period allowed until 09:15 AM. Any employee swiping after 09:15 AM loses the grace period and is penalized for all minutes elapsed from the 09:00 AM benchmark. Build an automated late-coming penalty engine.",
      "requirements": [
        "Open worksheet **PRJ_DTC_18** with morning swipe timestamps in **B4:B30**.",
        "In cell **C4**, extract the time portion using `=MOD(B4, 1)` and format as `hh:mm:ss AM/PM`.",
        "In cell **D4**, enter the LET late calculation formula.",
        "In cell **E4**, assign penalty action: `=IF(D4>60, \"HALF-DAY DEDUCTION\", IF(D4>0, \"LATE MARK\", \"ON TIME\"))`.",
        "Verify that an employee swiping at 09:14 AM has 0 penalty minutes, but one swiping at 09:22 AM has 22 penalty minutes."
      ],
      "stepByStep": "1. **Navigate to D4**: Click cell D4 on sheet **PRJ_DTC_18**.\n2. **Type the Formula**: Enter `=LET(swipe, MOD(B4, 1), graceLimit, TIME(9, 15, 0), normalStart, TIME(9, 0, 0), IF(swipe > graceLimit, (swipe - normalStart) * 1440, 0))`.\n3. **Set Penalty in E4**: Enter `=IF(D4>60, \"HALF-DAY DEDUCTION\", IF(D4>0, \"LATE MARK\", \"ON TIME\"))`.\n4. **Format Minutes**: Format D4 as an Integer Number (`0`).\n5. **Fill Records**: Drag D4:E4 down to row 30.",
      "rawMemoryVsRendered": {
        "raw": "22",
        "mask": "0",
        "rendered": "22 Mins Late"
      },
      "expectedOutput": "| Staff ID | Swipe Timestamp (B) | Swipe Time (C) | Late Minutes (D) | Attendance Status (E) |\n| -------- | ------------------- | -------------- | ---------------- | --------------------- |\n| ACC-101  | 16-Feb-2026 09:12   | 09:12:00 AM    | 0                | ON TIME (Grace Used)  |\n| ACC-102  | 16-Feb-2026 09:22   | 09:22:00 AM    | 22               | LATE MARK             |",
      "proTip": "TIME(9, 15, 0) constructs the exact serial time fraction for 09:15:00 AM (0.385417). Comparing MOD(B4, 1) against this fractional constant avoids text parsing errors!"
    },
    {
      "projectId": "PRJ-DTC-19",
      "title": "Container Port Demurrage & Free Time Expiry Tracker",
      "difficulty": "intermediate",
      "sheetName": "PRJ_DTC_19",
      "formula": "=WORKDAY.INTL(B4, C4, 1, Holidays!$B$4:$B$15) + D4",
      "description": "At maritime container ports (such as JNPT Mumbai or Kolkata Port), ocean carriers grant import consignees a contractual 'free time' of C4 business days (excluding port weekend non-working days) to clear containers, plus a statutory customs clearance buffer (D4 days). If containers remain beyond the free time date, punitive demurrage charges accrue daily. Calculate free time expiry dates.",
      "requirements": [
        "Access worksheet **PRJ_DTC_19** with container discharge dates in **B4:B30**, free days in **C4:C30**, and buffer days in **D4:D30**.",
        "In cell **E4**, write `=WORKDAY.INTL(B4, C4, 1, Holidays!$B$4:$B$15) + D4`.",
        "In cell **F4**, determine days until demurrage penalties commence: `=E4 - TODAY()`.",
        "In cell **G4**, alert status: `=IF(F4<0, \"DEMURRAGE ACCRUING\", IF(F4<=2, \"EXPIRING IMMINENTLY\", \"FREE TIME ACTIVE\"))`.",
        "Format column E as `DD-MMM-YYYY`."
      ],
      "stepByStep": "1. **Select Cell E4**: Click cell E4 on sheet **PRJ_DTC_19**.\n2. **Type WORKDAY.INTL**: Enter `=WORKDAY.INTL(B4, C4, 1, Holidays!$B$4:$B$15) + D4`.\n3. **Compute Days Left in F4**: Type `=E4 - TODAY()`.\n4. **Configure Alert in G4**: Type `=IF(F4<0, \"DEMURRAGE ACCRUING\", IF(F4<=2, \"EXPIRING IMMINENTLY\", \"FREE TIME ACTIVE\"))`.\n5. **Apply Date Format**: Set E4 format to `DD-MMM-YYYY`.\n6. **Copy Down**: Drag fill handle down to row 30.",
      "rawMemoryVsRendered": {
        "raw": "46059",
        "mask": "DD-MMM-YYYY",
        "rendered": "06-Feb-2026"
      },
      "expectedOutput": "| Container # | Discharge Date (B) | Free Days (C) | Buffer (D) | Expiry Date (E) | Demurrage Status (G) |\n| ----------- | ------------------ | ------------- | ---------- | --------------- | -------------------- |\n| MSCU-8821   | 20-Jan-2026        | 7             | 2          | 02-Feb-2026     | DEMURRAGE ACCRUING   |\n| MAEU-4410   | 08-Feb-2026        | 7             | 2          | 20-Feb-2026     | FREE TIME ACTIVE     |",
      "proTip": "Container lines bill demurrage in USD per TEU per day. Preventing even a single day of demurrage through automated Excel alerts saves thousands of dollars per shipment!"
    },
    {
      "projectId": "PRJ-DTC-20",
      "title": "Life & Health Insurance 30-Day Grace Period & Policy Lapse Forecaster",
      "difficulty": "beginner",
      "sheetName": "PRJ_DTC_20",
      "formula": "=EDATE(B4, 12) + 30",
      "description": "Under IRDAI insurance guidelines, annual premium paying life insurance policies allow a statutory 30-day grace period following the renewal premium due date before the insurance policy terminates or enters lapsed status. When policy commencement date is in B4, compute the annual policy renewal anniversary and the final lapse cutoff date.",
      "requirements": [
        "Open worksheet **PRJ_DTC_20** with policy commencement dates in **B4:B30**.",
        "In cell **C4**, calculate the next annual renewal anniversary using `=EDATE(B4, 12)`.",
        "In cell **D4**, calculate the final statutory policy lapse date using `=C4 + 30`.",
        "In cell **E4**, flag status: `=IF(TODAY() > D4, \"POLICY LAPSED\", IF(TODAY() > C4, \"IN GRACE PERIOD\", \"CURRENT\"))`.",
        "Format columns C and D as `DD-MMM-YYYY`."
      ],
      "stepByStep": "1. **Navigate to C4**: Click cell C4 on sheet **PRJ_DTC_20**.\n2. **Type Anniversary**: Enter `=EDATE(B4, 12)`.\n3. **Compute Lapse Cutoff in D4**: Enter `=C4 + 30`.\n4. **Set Policy Health in E4**: Enter `=IF(TODAY() > D4, \"POLICY LAPSED\", IF(TODAY() > C4, \"IN GRACE PERIOD\", \"CURRENT\"))`.\n5. **Format Columns**: Set date format `DD-MMM-YYYY` on C4:D4.\n6. **Populate Range**: Double-click fill handle down through row 30.",
      "rawMemoryVsRendered": {
        "raw": "IN GRACE PERIOD",
        "mask": "Text String",
        "rendered": "IN GRACE PERIOD"
      },
      "expectedOutput": "| Policy No | Policy Date (B) | Renewal Date (C) | Lapse Cutoff (D) | Policy Status (E) |\n| --------- | --------------- | ---------------- | ---------------- | ----------------- |\n| POL-9921  | 15-Jan-2025     | 15-Jan-2026      | 14-Feb-2026      | IN GRACE PERIOD   |\n| POL-9922  | 01-Jun-2025     | 01-Jun-2026      | 01-Jul-2026      | CURRENT           |",
      "proTip": "EDATE(B4, 12) adds exactly one full calendar year, accurately handling leap years and varying month lengths without day drift."
    },
    {
      "projectId": "PRJ-DTC-21",
      "title": "1900 vs 1904 Date System Multi-Platform Reconciliation Matrix",
      "difficulty": "advanced",
      "sheetName": "PRJ_DTC_21",
      "formula": "=IF(B4 < 40000, B4 + 1462, B4)",
      "description": "Historically, Macintosh Excel used the 1904 Date System (starting January 1, 1904) to avoid the early Mac OS 1900 leap-year bug, whereas Windows Excel uses the 1900 Date System (starting January 1, 1900). Copying unformatted serial numbers from a 1904 workbook into a 1900 workbook causes every date to appear exactly 4 years and 1 day (1,462 days) earlier. Build an automated reconciliation auditor.",
      "requirements": [
        "Access worksheet **PRJ_DTC_21** with raw imported serial timestamps in **B4:B30**.",
        "Identify dates that were imported from legacy 1904 Mac spreadsheets.",
        "In cell **C4**, write `=IF(B4 < 40000, B4 + 1462, B4)` to normalize 1904 serial values to 1900 serial values.",
        "Format column C as `DD-MMM-YYYY`.",
        "Verify that legacy Mac date `01-Jan-2020` (serial 42369) reconciles to true Windows serial 43831."
      ],
      "stepByStep": "1. **Select Cell C4**: Click cell C4 on sheet **PRJ_DTC_21**.\n2. **Type Normalization Formula**: Enter `=IF(B4 < 40000, B4 + 1462, B4)`.\n3. **Format Date**: Press **Ctrl + 1**, select **Date**, choose `DD-MMM-YYYY`.\n4. **Audit Variance**: Verify that the reconciled date matches the true transaction date.\n5. **Fill Column**: Double-click fill handle down to C30.",
      "rawMemoryVsRendered": {
        "raw": "43831",
        "mask": "DD-MMM-YYYY",
        "rendered": "01-Jan-2020"
      },
      "expectedOutput": "| Record ID | Raw Imported Serial (B) | Unadjusted Date | Normalized Serial (C) | True Reconciled Date |\n| --------- | ----------------------- | --------------- | --------------------- | -------------------- |\n| MAC-01    | 42369                   | 31-Dec-2015     | 43831                 | 01-Jan-2020          |\n| WIN-02    | 46050                   | 28-Jan-2026     | 46050                 | 28-Jan-2026          |",
      "proTip": "To check which date system your workbook is using: go to File > Options > Advanced > scroll to 'When calculating this workbook' > check 'Use 1904 date system'. Never mix systems without standardizing!"
    },
    {
      "projectId": "PRJ-DTC-22",
      "title": "Nth Business Day of the Month Dynamic Scheduler (Payroll Cut-off)",
      "difficulty": "advanced",
      "sheetName": "PRJ_DTC_22",
      "formula": "=WORKDAY.INTL(EOMONTH(B4, -1), 15, 1, Holidays!$B$4:$B$20)",
      "description": "Corporate HR policies often declare that monthly payroll cut-off occurs strictly on the '15th business working day' of the current month, or vendor invoices are settled on the '3rd working day' following month-end. Writing static formulas fails when calendar days fall on weekends or holidays. Build a dynamic Nth-business-day scheduler.",
      "requirements": [
        "Open worksheet **PRJ_DTC_22** with reference month dates in **B4:B20** and target business day ordinal in **C4:C20** (e.g. 15 for 15th working day).",
        "In cell **D4**, find the last day of the prior month using `EOMONTH(B4, -1)`.",
        "In cell **E4**, write `=WORKDAY.INTL(EOMONTH(B4, -1), C4, 1, Holidays!$B$4:$B$20)`.",
        "In cell **F4**, display day of week `=TEXT(E4, \"dddd\")` to verify no weekend collisions.",
        "Format Column E as `DD-MMM-YYYY`."
      ],
      "stepByStep": "1. **Navigate to E4**: Click cell E4 on sheet **PRJ_DTC_22**.\n2. **Type the Nested Formula**: Enter `=WORKDAY.INTL(EOMONTH(B4, -1), C4, 1, Holidays!$B$4:$B$20)`.\n3. **Inspect Day of Week in F4**: Type `=TEXT(E4, \"dddd\")`.\n4. **Apply Date Format**: Set format to `DD-MMM-YYYY` on E4.\n5. **Audit Working Day**: Verify that adding 15 business days to January 31 correctly leaps across 4 Saturdays, 4 Sundays, and Republic Day holiday.\n6. **Copy Down**: Drag fill handle down to row 20.",
      "rawMemoryVsRendered": {
        "raw": "46074",
        "mask": "DD-MMM-YYYY",
        "rendered": "20-Feb-2026"
      },
      "expectedOutput": "| Month Period | Reference Date (B) | Target Biz Day Ordinal (C) | Dynamic Scheduled Date (E) | Day of Week (F) |\n| ------------ | ------------------ | -------------------------- | -------------------------- | --------------- |\n| Jan 2026     | 01-Jan-2026        | 15                         | 22-Jan-2026                | Thursday        |\n| Feb 2026     | 01-Feb-2026        | 15                         | 20-Feb-2026                | Friday          |",
      "proTip": "EOMONTH(B4, -1) steps backwards to the final second of the previous month. WORKDAY.INTL then steps forward from day 1 of the target month, precisely counting only valid working days!"
    },
    {
      "projectId": "PRJ-DTC-23",
      "title": "Interbank Call Money & Repo Overnight Interest Accrual",
      "difficulty": "advanced",
      "sheetName": "PRJ_DTC_23",
      "formula": "=C4 * D4 * (DAYS360(A4, B4, FALSE) / 360)",
      "description": "Bank treasuries lend surplus liquidity in overnight call money and collateralized repurchase (repo) markets. Under money market conventions, interest is accrued on a 360-day commercial year basis using DAYS360 US NASD method (or Actual/360). When loan start date is in A4, maturity date is in B4, principal loan is in C4, and annual repo rate is in D4, compute exact accrued interest.",
      "requirements": [
        "Access worksheet **PRJ_DTC_23** with overnight money market loan records in **A4:D25**.",
        "In cell **E4**, calculate 360-day interest using `=C4 * D4 * (DAYS360(A4, B4, FALSE) / 360)`.",
        "In cell **F4**, calculate Actual/360 interest using `=C4 * D4 * (YEARFRAC(A4, B4, 2))`.",
        "In cell **G4**, compute the basis variance difference `=F4 - E4`.",
        "Format columns E, F, and G as currency `₹#,##0.00`."
      ],
      "stepByStep": "1. **Select Cell E4**: Click cell E4 on sheet **PRJ_DTC_23**.\n2. **Type DAYS360 Accrual**: Enter `=C4 * D4 * (DAYS360(A4, B4, FALSE) / 360)`.\n3. **Type Actual/360 in F4**: Enter `=C4 * D4 * YEARFRAC(A4, B4, 2)`.\n4. **Calculate Variance in G4**: Type `=F4 - E4`.\n5. **Format Currency**: Press **Ctrl + 1**, select Currency `₹` with 2 decimals.\n6. **Copy Downward**: Drag fill handle down to row 25.",
      "rawMemoryVsRendered": {
        "raw": "56666.67",
        "mask": "₹#,##0.00",
        "rendered": "₹56,666.67"
      },
      "expectedOutput": "| Repo Ref # | Borrow Date (A) | Maturity Date (B) | Principal (C) | Repo Rate (D) | DAYS360 Accrual (E) | Actual/360 Accrual (F) |\n| ---------- | --------------- | ----------------- | ------------- | ------------- | ------------------- | ---------------------- |\n| REPO-101   | 01-Jan-2026     | 31-Jan-2026       | ₹1,00,00,000  | 6.80%         | ₹56,666.67          | ₹56,666.67             |\n| REPO-102   | 01-Feb-2026     | 28-Feb-2026       | ₹5,00,00,000  | 6.75%         | ₹2,53,125.00        | ₹2,53,125.00           |",
      "proTip": "In DAYS360, setting the 3rd argument to FALSE applies the US NASD method (if start date is last day of month, it becomes 30th). Setting it to TRUE applies the European method!"
    },
    {
      "projectId": "PRJ-DTC-24",
      "title": "Multi-Tier Overtime & Statutory Double-Time Holiday Payroll Engine",
      "difficulty": "advanced",
      "sheetName": "PRJ_DTC_24",
      "formula": "=LET(hrs, MOD(C4-B4, 1)*24, isHol, ISNUMBER(MATCH(INT(B4), Holidays!$B$4:$B$25, 0)), IF(isHol, hrs * 2.0 * D4, (MIN(8, hrs) + MAX(0, hrs - 8) * 1.5) * D4))",
      "description": "Under the Factories Act 1948 and state labor laws, ordinary work up to 8 hours is paid at 1.0x base hourly rate (D4), overtime beyond 8 hours is paid at 1.5x overtime rate, and work performed on statutory national holidays is compensated at 2.0x double-time rate. Model an automated payroll gross wage calculator for factory shifts.",
      "requirements": [
        "Open worksheet **PRJ_DTC_24** with shift start timestamps in **B4:B30**, shift end timestamps in **C4:C30**, and basic hourly wage in **D4:D30**.",
        "In cell **E4**, enter the multi-tier overtime LET calculation formula.",
        "Verify that shift hours spanning past midnight are normalized via `MOD(..., 1)`.",
        "Ensure holiday matching via `ISNUMBER(MATCH(INT(B4), Holidays!$B$4:$B$25, 0))` detects statutory holidays.",
        "Format Column E as `₹#,##0.00` and copy down across all worker shifts."
      ],
      "stepByStep": "1. **Navigate to E4**: Click cell E4 on sheet **PRJ_DTC_24**.\n2. **Type the Formula**: Enter `=LET(hrs, MOD(C4-B4, 1)*24, isHol, ISNUMBER(MATCH(INT(B4), Holidays!$B$4:$B$25, 0)), IF(isHol, hrs * 2.0 * D4, (MIN(8, hrs) + MAX(0, hrs - 8) * 1.5) * D4))`.\n3. **Inspect Logic**: On a normal 10-hour day, worker gets 8 hrs at 1.0x + 2 hrs at 1.5x = 11 paid hours.\n4. **Format Currency**: Press **Ctrl + 1**, select Currency `₹`, 2 decimals.\n5. **Fill Column**: Double-click fill handle down to row 30.",
      "rawMemoryVsRendered": {
        "raw": "2750.00",
        "mask": "₹#,##0.00",
        "rendered": "₹2,750.00"
      },
      "expectedOutput": "| Worker ID | Shift Start (B) | Shift End (C) | Base Hourly Rate (D) | Shift Hours | Holiday? | Gross Payable Wage (E) |\n| --------- | --------------- | ------------- | -------------------- | ----------- | -------- | ---------------------- |\n| WRK-501   | 16-Feb-2026 08:00 | 16-Feb-2026 18:00 | ₹250.00 | 10.0 | No | ₹2,750.00 |\n| WRK-502   | 26-Jan-2026 08:00 | 26-Jan-2026 16:00 | ₹250.00 | 8.0  | Yes (Republic Day) | ₹4,000.00 |",
      "proTip": "INT(B4) extracts just the integer serial date from a date-time timestamp, allowing clean matching against a pure date list in the Holidays table!"
    },
    {
      "projectId": "PRJ-DTC-25",
      "title": "Executive Reporting Dashboard: MTD Working Days Elapsed & Run-Rate Forecaster",
      "difficulty": "advanced",
      "sheetName": "PRJ_DTC_25",
      "formula": "=LET(startM, EOMONTH(TODAY(), -1) + 1, endM, EOMONTH(TODAY(), 0), totBiz, NETWORKDAYS(startM, endM, Holidays!$B$4:$B$25), elapsedBiz, NETWORKDAYS(startM, TODAY(), Holidays!$B$4:$B$25), B4 / elapsedBiz * totBiz)",
      "description": "In corporate executive dashboards (CFO/VP Sales), tracking Month-to-Date (MTD) revenue pacing requires normalizing revenue earned against working days elapsed versus total working days available in the month. A simple calendar day average is misleading because weekends and holidays produce zero revenue. Calculate the projected full-month run-rate revenue dynamically.",
      "requirements": [
        "Access worksheet **PRJ_DTC_25** containing sales team MTD actual revenues in **B4:B20**.",
        "In cell **C4**, write `=NETWORKDAYS(EOMONTH(TODAY(), -1) + 1, TODAY(), Holidays!$B$4:$B$25)` to get elapsed business days.",
        "In cell **D4**, write `=NETWORKDAYS(EOMONTH(TODAY(), -1) + 1, EOMONTH(TODAY(), 0), Holidays!$B$4:$B$25)` to get total business days.",
        "In cell **E4**, apply `=B4 / C4 * D4` to compute forecasted month-end run-rate revenue.",
        "In cell **F4**, compare against quota in Column G: `=IF(E4>=G4, \"ON TARGET\", \"BEHIND PACING\")`."
      ],
      "stepByStep": "1. **Select Cell C4**: Click cell C4 on sheet **PRJ_DTC_25**.\n2. **Compute Elapsed Working Days**: Enter `=NETWORKDAYS(EOMONTH(TODAY(), -1) + 1, TODAY(), Holidays!$B$4:$B$25)`.\n3. **Compute Total Working Days in D4**: Enter `=NETWORKDAYS(EOMONTH(TODAY(), -1) + 1, EOMONTH(TODAY(), 0), Holidays!$B$4:$B$25)`.\n4. **Compute Run-Rate in E4**: Enter `=B4 / C4 * D4`.\n5. **Determine Target Pacing in F4**: Enter `=IF(E4>=G4, \"ON TARGET\", \"BEHIND PACING\")`.\n6. **Format Currency**: Format columns B, E, G as `₹#,##0`.\n7. **Copy Downward**: Drag fill handle down to row 20.",
      "rawMemoryVsRendered": {
        "raw": "4500000",
        "mask": "₹#,##0",
        "rendered": "₹45,00,000"
      },
      "expectedOutput": "| Territory | MTD Actual Sales (B) | Biz Days Elapsed (C) | Total Biz Days (D) | Forecast Run-Rate (E) | Monthly Quota (G) | Pacing Status (F) |\n| --------- | -------------------- | -------------------- | ------------------ | --------------------- | ----------------- | ----------------- |\n| North     | ₹21,00,000           | 10                   | 21                 | ₹44,10,000            | ₹40,00,000        | ON TARGET         |\n| South     | ₹15,00,000           | 10                   | 21                 | ₹31,50,000            | ₹35,00,000        | BEHIND PACING     |",
      "proTip": "Forecasting based on business days rather than calendar days prevents panic early in months that start with long holiday clusters or weekends, providing accurate executive run-rates!"
    }
  ]
};
