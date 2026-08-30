export const excelDataEntryProjectsData = {
  "projectCategory": "Projects_005_003",
  "subject": "Microsoft Excel Practical Workplace Modeling & Audit Lab",
  "trackCode": "EXCEL-PRO-901",
  "level": "Beginner to Advanced",
  "tools": [
    "Excel 365",
    "Excel 2021",
    "Power Query",
    "Office Online"
  ],
  "institute": {
    "author": "Sukanta Hui",
    "name": "Coder & AccoTax",
    "location": "Barrackpore & Naihati"
  },
  "projects": [
    {
      "projectId": "EX2201",
      "title": "PivotTable & Executive Data Summarization (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX2201",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2201. You must create an interactive PivotTable on tab PivotSummary_EX2201, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2201**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2201**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2201** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2202",
      "title": "PivotTable & Executive Data Summarization (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX2202",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2202. You must create an interactive PivotTable on tab PivotSummary_EX2202, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2202**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2202**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2202** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2203",
      "title": "PivotTable & Executive Data Summarization (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX2203",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2203. You must create an interactive PivotTable on tab PivotSummary_EX2203, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2203**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2203**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2203** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2204",
      "title": "PivotTable & Executive Data Summarization (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX2204",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2204. You must create an interactive PivotTable on tab PivotSummary_EX2204, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2204**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2204**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2204** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2205",
      "title": "PivotTable & Executive Data Summarization (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX2205",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2205. You must create an interactive PivotTable on tab PivotSummary_EX2205, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2205**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2205**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2205** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2206",
      "title": "PivotTable & Executive Data Summarization (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX2206",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2206. You must create an interactive PivotTable on tab PivotSummary_EX2206, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2206**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2206**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2206** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2207",
      "title": "PivotTable & Executive Data Summarization (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX2207",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2207. You must create an interactive PivotTable on tab PivotSummary_EX2207, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2207**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2207**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2207** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2208",
      "title": "PivotTable & Executive Data Summarization (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX2208",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2208. You must create an interactive PivotTable on tab PivotSummary_EX2208, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2208**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2208**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2208** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2209",
      "title": "PivotTable & Executive Data Summarization (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX2209",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2209. You must create an interactive PivotTable on tab PivotSummary_EX2209, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2209**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2209**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2209** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2210",
      "title": "PivotTable & Executive Data Summarization (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX2210",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2210. You must create an interactive PivotTable on tab PivotSummary_EX2210, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2210**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2210**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2210** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2211",
      "title": "PivotTable & Executive Data Summarization (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX2211",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2211. You must create an interactive PivotTable on tab PivotSummary_EX2211, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2211**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2211**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2211** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2212",
      "title": "PivotTable & Executive Data Summarization (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX2212",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2212. You must create an interactive PivotTable on tab PivotSummary_EX2212, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2212**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2212**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2212** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2213",
      "title": "PivotTable & Executive Data Summarization (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX2213",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2213. You must create an interactive PivotTable on tab PivotSummary_EX2213, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2213**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2213**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2213** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2214",
      "title": "PivotTable & Executive Data Summarization (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX2214",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2214. You must create an interactive PivotTable on tab PivotSummary_EX2214, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2214**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2214**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2214** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2215",
      "title": "PivotTable & Executive Data Summarization (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX2215",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2215. You must create an interactive PivotTable on tab PivotSummary_EX2215, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2215**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2215**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2215** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2216",
      "title": "PivotTable & Executive Data Summarization (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX2216",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2216. You must create an interactive PivotTable on tab PivotSummary_EX2216, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2216**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2216**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2216** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2217",
      "title": "PivotTable & Executive Data Summarization (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX2217",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2217. You must create an interactive PivotTable on tab PivotSummary_EX2217, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2217**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2217**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2217** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2218",
      "title": "PivotTable & Executive Data Summarization (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX2218",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2218. You must create an interactive PivotTable on tab PivotSummary_EX2218, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2218**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2218**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2218** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2219",
      "title": "PivotTable & Executive Data Summarization (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX2219",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2219. You must create an interactive PivotTable on tab PivotSummary_EX2219, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2219**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2219**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2219** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2220",
      "title": "PivotTable & Executive Data Summarization (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX2220",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2220. You must create an interactive PivotTable on tab PivotSummary_EX2220, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2220**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2220**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2220** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2221",
      "title": "PivotTable & Executive Data Summarization (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX2221",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2221. You must create an interactive PivotTable on tab PivotSummary_EX2221, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2221**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2221**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2221** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2222",
      "title": "PivotTable & Executive Data Summarization (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX2222",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2222. You must create an interactive PivotTable on tab PivotSummary_EX2222, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2222**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2222**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2222** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2223",
      "title": "PivotTable & Executive Data Summarization (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX2223",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2223. You must create an interactive PivotTable on tab PivotSummary_EX2223, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2223**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2223**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2223** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2224",
      "title": "PivotTable & Executive Data Summarization (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX2224",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2224. You must create an interactive PivotTable on tab PivotSummary_EX2224, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2224**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2224**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2224** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2225",
      "title": "PivotTable & Executive Data Summarization (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX2225",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2225. You must create an interactive PivotTable on tab PivotSummary_EX2225, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2225**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2225**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2225** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    }
  ]
};
export const excelModuleProjectsData = {
  "projectCategory": "Projects_005_003",
  "subject": "Microsoft Excel Practical Workplace Modeling & Audit Lab",
  "trackCode": "EXCEL-PRO-901",
  "level": "Beginner to Advanced",
  "tools": [
    "Excel 365",
    "Excel 2021",
    "Power Query",
    "Office Online"
  ],
  "institute": {
    "author": "Sukanta Hui",
    "name": "Coder & AccoTax",
    "location": "Barrackpore & Naihati"
  },
  "projects": [
    {
      "projectId": "EX2201",
      "title": "PivotTable & Executive Data Summarization (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX2201",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2201. You must create an interactive PivotTable on tab PivotSummary_EX2201, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2201**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2201**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2201** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2202",
      "title": "PivotTable & Executive Data Summarization (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX2202",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2202. You must create an interactive PivotTable on tab PivotSummary_EX2202, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2202**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2202**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2202** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2203",
      "title": "PivotTable & Executive Data Summarization (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX2203",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2203. You must create an interactive PivotTable on tab PivotSummary_EX2203, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2203**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2203**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2203** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2204",
      "title": "PivotTable & Executive Data Summarization (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX2204",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2204. You must create an interactive PivotTable on tab PivotSummary_EX2204, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2204**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2204**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2204** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2205",
      "title": "PivotTable & Executive Data Summarization (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX2205",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2205. You must create an interactive PivotTable on tab PivotSummary_EX2205, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2205**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2205**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2205** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2206",
      "title": "PivotTable & Executive Data Summarization (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX2206",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2206. You must create an interactive PivotTable on tab PivotSummary_EX2206, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2206**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2206**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2206** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2207",
      "title": "PivotTable & Executive Data Summarization (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX2207",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2207. You must create an interactive PivotTable on tab PivotSummary_EX2207, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2207**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2207**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2207** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2208",
      "title": "PivotTable & Executive Data Summarization (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX2208",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2208. You must create an interactive PivotTable on tab PivotSummary_EX2208, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2208**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2208**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2208** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2209",
      "title": "PivotTable & Executive Data Summarization (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX2209",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2209. You must create an interactive PivotTable on tab PivotSummary_EX2209, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2209**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2209**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2209** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2210",
      "title": "PivotTable & Executive Data Summarization (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX2210",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2210. You must create an interactive PivotTable on tab PivotSummary_EX2210, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2210**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2210**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2210** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2211",
      "title": "PivotTable & Executive Data Summarization (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX2211",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2211. You must create an interactive PivotTable on tab PivotSummary_EX2211, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2211**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2211**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2211** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2212",
      "title": "PivotTable & Executive Data Summarization (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX2212",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2212. You must create an interactive PivotTable on tab PivotSummary_EX2212, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2212**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2212**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2212** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2213",
      "title": "PivotTable & Executive Data Summarization (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX2213",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2213. You must create an interactive PivotTable on tab PivotSummary_EX2213, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2213**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2213**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2213** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2214",
      "title": "PivotTable & Executive Data Summarization (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX2214",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2214. You must create an interactive PivotTable on tab PivotSummary_EX2214, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2214**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2214**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2214** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2215",
      "title": "PivotTable & Executive Data Summarization (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX2215",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2215. You must create an interactive PivotTable on tab PivotSummary_EX2215, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2215**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2215**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2215** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2216",
      "title": "PivotTable & Executive Data Summarization (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX2216",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2216. You must create an interactive PivotTable on tab PivotSummary_EX2216, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2216**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2216**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2216** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2217",
      "title": "PivotTable & Executive Data Summarization (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX2217",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2217. You must create an interactive PivotTable on tab PivotSummary_EX2217, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2217**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2217**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2217** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2218",
      "title": "PivotTable & Executive Data Summarization (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX2218",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2218. You must create an interactive PivotTable on tab PivotSummary_EX2218, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2218**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2218**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2218** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2219",
      "title": "PivotTable & Executive Data Summarization (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX2219",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2219. You must create an interactive PivotTable on tab PivotSummary_EX2219, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2219**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2219**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2219** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2220",
      "title": "PivotTable & Executive Data Summarization (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX2220",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2220. You must create an interactive PivotTable on tab PivotSummary_EX2220, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2220**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2220**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2220** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2221",
      "title": "PivotTable & Executive Data Summarization (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX2221",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2221. You must create an interactive PivotTable on tab PivotSummary_EX2221, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2221**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2221**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2221** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2222",
      "title": "PivotTable & Executive Data Summarization (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX2222",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2222. You must create an interactive PivotTable on tab PivotSummary_EX2222, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2222**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2222**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2222** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2223",
      "title": "PivotTable & Executive Data Summarization (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX2223",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2223. You must create an interactive PivotTable on tab PivotSummary_EX2223, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2223**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2223**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2223** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2224",
      "title": "PivotTable & Executive Data Summarization (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX2224",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2224. You must create an interactive PivotTable on tab PivotSummary_EX2224, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2224**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2224**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2224** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX2225",
      "title": "PivotTable & Executive Data Summarization (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX2225",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX2225. You must create an interactive PivotTable on tab PivotSummary_EX2225, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX2225**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX2225**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX2225** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    }
  ]
};
