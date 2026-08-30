export const excelModuleProjectsData = {
  "projectCategory": "Projects_002_006",
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
      "projectId": "EX1101",
      "title": "PivotTable & Executive Data Summarization (Task 1)",
      "difficulty": "beginner",
      "sheetName": "EX1101",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX1101. You must create an interactive PivotTable on tab PivotSummary_EX1101, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX1101**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX1101**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX1101** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX1102",
      "title": "PivotTable & Executive Data Summarization (Task 2)",
      "difficulty": "beginner",
      "sheetName": "EX1102",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX1102. You must create an interactive PivotTable on tab PivotSummary_EX1102, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX1102**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX1102**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX1102** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX1103",
      "title": "PivotTable & Executive Data Summarization (Task 3)",
      "difficulty": "beginner",
      "sheetName": "EX1103",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX1103. You must create an interactive PivotTable on tab PivotSummary_EX1103, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX1103**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX1103**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX1103** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX1104",
      "title": "PivotTable & Executive Data Summarization (Task 4)",
      "difficulty": "beginner",
      "sheetName": "EX1104",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX1104. You must create an interactive PivotTable on tab PivotSummary_EX1104, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX1104**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX1104**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX1104** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX1105",
      "title": "PivotTable & Executive Data Summarization (Task 5)",
      "difficulty": "beginner",
      "sheetName": "EX1105",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX1105. You must create an interactive PivotTable on tab PivotSummary_EX1105, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX1105**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX1105**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX1105** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX1106",
      "title": "PivotTable & Executive Data Summarization (Task 6)",
      "difficulty": "beginner",
      "sheetName": "EX1106",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX1106. You must create an interactive PivotTable on tab PivotSummary_EX1106, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX1106**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX1106**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX1106** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX1107",
      "title": "PivotTable & Executive Data Summarization (Task 7)",
      "difficulty": "beginner",
      "sheetName": "EX1107",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX1107. You must create an interactive PivotTable on tab PivotSummary_EX1107, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX1107**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX1107**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX1107** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX1108",
      "title": "PivotTable & Executive Data Summarization (Task 8)",
      "difficulty": "beginner",
      "sheetName": "EX1108",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX1108. You must create an interactive PivotTable on tab PivotSummary_EX1108, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX1108**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX1108**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX1108** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX1109",
      "title": "PivotTable & Executive Data Summarization (Task 9)",
      "difficulty": "intermediate",
      "sheetName": "EX1109",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX1109. You must create an interactive PivotTable on tab PivotSummary_EX1109, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX1109**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX1109**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX1109** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX1110",
      "title": "PivotTable & Executive Data Summarization (Task 10)",
      "difficulty": "intermediate",
      "sheetName": "EX1110",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX1110. You must create an interactive PivotTable on tab PivotSummary_EX1110, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX1110**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX1110**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX1110** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX1111",
      "title": "PivotTable & Executive Data Summarization (Task 11)",
      "difficulty": "intermediate",
      "sheetName": "EX1111",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX1111. You must create an interactive PivotTable on tab PivotSummary_EX1111, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX1111**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX1111**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX1111** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX1112",
      "title": "PivotTable & Executive Data Summarization (Task 12)",
      "difficulty": "intermediate",
      "sheetName": "EX1112",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX1112. You must create an interactive PivotTable on tab PivotSummary_EX1112, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX1112**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX1112**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX1112** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX1113",
      "title": "PivotTable & Executive Data Summarization (Task 13)",
      "difficulty": "intermediate",
      "sheetName": "EX1113",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX1113. You must create an interactive PivotTable on tab PivotSummary_EX1113, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX1113**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX1113**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX1113** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX1114",
      "title": "PivotTable & Executive Data Summarization (Task 14)",
      "difficulty": "intermediate",
      "sheetName": "EX1114",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX1114. You must create an interactive PivotTable on tab PivotSummary_EX1114, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX1114**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX1114**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX1114** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX1115",
      "title": "PivotTable & Executive Data Summarization (Task 15)",
      "difficulty": "intermediate",
      "sheetName": "EX1115",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX1115. You must create an interactive PivotTable on tab PivotSummary_EX1115, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX1115**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX1115**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX1115** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX1116",
      "title": "PivotTable & Executive Data Summarization (Task 16)",
      "difficulty": "intermediate",
      "sheetName": "EX1116",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX1116. You must create an interactive PivotTable on tab PivotSummary_EX1116, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX1116**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX1116**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX1116** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX1117",
      "title": "PivotTable & Executive Data Summarization (Task 17)",
      "difficulty": "intermediate",
      "sheetName": "EX1117",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX1117. You must create an interactive PivotTable on tab PivotSummary_EX1117, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX1117**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX1117**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX1117** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX1118",
      "title": "PivotTable & Executive Data Summarization (Task 18)",
      "difficulty": "intermediate",
      "sheetName": "EX1118",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX1118. You must create an interactive PivotTable on tab PivotSummary_EX1118, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX1118**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX1118**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX1118** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX1119",
      "title": "PivotTable & Executive Data Summarization (Task 19)",
      "difficulty": "advanced",
      "sheetName": "EX1119",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX1119. You must create an interactive PivotTable on tab PivotSummary_EX1119, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX1119**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX1119**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX1119** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX1120",
      "title": "PivotTable & Executive Data Summarization (Task 20)",
      "difficulty": "advanced",
      "sheetName": "EX1120",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX1120. You must create an interactive PivotTable on tab PivotSummary_EX1120, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX1120**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX1120**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX1120** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX1121",
      "title": "PivotTable & Executive Data Summarization (Task 21)",
      "difficulty": "advanced",
      "sheetName": "EX1121",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX1121. You must create an interactive PivotTable on tab PivotSummary_EX1121, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX1121**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX1121**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX1121** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX1122",
      "title": "PivotTable & Executive Data Summarization (Task 22)",
      "difficulty": "advanced",
      "sheetName": "EX1122",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX1122. You must create an interactive PivotTable on tab PivotSummary_EX1122, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX1122**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX1122**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX1122** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX1123",
      "title": "PivotTable & Executive Data Summarization (Task 23)",
      "difficulty": "advanced",
      "sheetName": "EX1123",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX1123. You must create an interactive PivotTable on tab PivotSummary_EX1123, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX1123**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX1123**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX1123** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX1124",
      "title": "PivotTable & Executive Data Summarization (Task 24)",
      "difficulty": "advanced",
      "sheetName": "EX1124",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX1124. You must create an interactive PivotTable on tab PivotSummary_EX1124, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX1124**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX1124**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX1124** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
      "rawMemoryVsRendered": {
        "raw": "5450000",
        "mask": "Pivot Value Field",
        "rendered": "₹ 54,50,000.00"
      },
      "expectedOutput": "| Category | Q1 Sales | Q2 Sales | Total Revenue | % of Grand Total |\n| -------- | -------- | -------- | ------------- | ---------------- |\n| Enterprise Hardware | ₹ 12,00,000 | ₹ 18,50,000 | ₹ 30,50,000 | 55.96% |\n| Cloud Software | ₹ 8,00,000 | ₹ 16,00,000 | ₹ 24,00,000 | 44.04% |",
      "proTip": "Always refresh your PivotTable after updating source data by pressing Alt + F5 (or Ctrl + Alt + F5 to refresh all PivotTables in the workbook)!"
    },
    {
      "projectId": "EX1125",
      "title": "PivotTable & Executive Data Summarization (Task 25)",
      "difficulty": "advanced",
      "sheetName": "EX1125",
      "formula": "GETPIVOTDATA(\"Sales\", PivotSheet!$A$3, \"Region\", \"East\")",
      "description": "As an MIS Executive, you are tasked with summarizing a 5,000-row transaction ledger on sheet EX1125. You must create an interactive PivotTable on tab PivotSummary_EX1125, group sales dates by Month and Quarter, insert a Slicer for Regional filtering, and extract dynamic KPI values using GETPIVOTDATA.",
      "requirements": [
        "Select raw data table **A3:G5000** on sheet **EX1125**.",
        "Go to **Insert** -> **PivotTable** and choose New Worksheet named **PivotSummary_EX1125**.",
        "Drag **Region** to Filters, **Category** to Rows, and **Revenue** to Values (configured as Sum of Revenue).",
        "Right-Click Date values in Rows and group by **Months** and **Quarters**.",
        "Insert a Timeline Slicer and verify dynamic KPI card update in cell **I4**."
      ],
      "stepByStep": "1. **Highlight Raw Data**: Click inside range A3:G5000 on sheet **EX1125** and press **Ctrl + A**.\n2. **Insert PivotTable**: Click **Insert** tab -> **PivotTable** -> Click **OK**.\n3. **Configure Fields**: In PivotTable Field List, drag Category to Rows area and Revenue to Values area.\n4. **Group Dates**: Right-click any date cell in PivotTable -> select **Group...** -> choose **Months** and **Quarters**.\n5. **Add Slicer**: Click **PivotTable Analyze** tab -> **Insert Slicer** -> check Region -> Click **OK**.",
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
