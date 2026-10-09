"""
CBSE Class 11 Computer Science (083) - Unit 1 Computer Systems and Organisation
Module: Types of Software, OS Architecture & Language Processors
File: software_cost_customization_analyzer.py
Topic 3: Application Software - General Purpose vs Customized / Tailor-Made Software

Demonstrates:
1. Classification of Application Software:
   - General Purpose (Off-the-shelf: Word Processors, Spreadsheets, DBMS)
   - Customized / Tailor-Made (Bespoke: School Management, Hospital Billing, Railway Reservation)
2. Cost-Benefit & Requirement Matching Decision Matrix
"""

class ApplicationSoftwareAnalyzer:
    """Simulates enterprise software evaluation between COTS (Commercial Off-The-Shelf) and Bespoke Solutions."""
    
    CATALOG = {
        "general_purpose": [
            {"name": "LibreOffice Writer / MS Word", "domain": "Word Processing", "cost": 0, "flexibility": "Medium", "dev_time_days": 0},
            {"name": "MS Excel / Google Sheets", "domain": "Spreadsheets & Analytics", "cost": 70, "flexibility": "High", "dev_time_days": 0},
            {"name": "Adobe Photoshop / GIMP", "domain": "Digital Image Manipulation", "cost": 240, "flexibility": "High", "dev_time_days": 0}
        ],
        "customized_bespoke": [
            {"name": "Army Public School Student ERP", "domain": "School Attendance & Fee Ledger", "cost": 4500, "flexibility": "Exact Match", "dev_time_days": 90},
            {"name": "IRCTC Railway Reservation Portal", "domain": "Mass High-Concurrency Ticketing", "cost": 250000, "flexibility": "Exact Match", "dev_time_days": 365},
            {"name": "Supermarket POS Barcode Billing", "domain": "Retail Inventory & GST Invoice", "cost": 1800, "flexibility": "Exact Match", "dev_time_days": 45}
        ]
    }

    @classmethod
    def evaluate_selection(cls, user_need: str, budget_inr: float, requires_exact_workflow: bool) -> dict:
        print(f"\n[*] Evaluating Software Choice for Requirement: '{user_need}'")
        print(f"    Budget: Rs. {budget_inr:,.2f} | Exact Custom Workflow Required: {requires_exact_workflow}")

        if requires_exact_workflow and budget_inr >= 50000:
            recommendation = "Bespoke / Tailor-Made Customized Application Software"
            rationale = "Your organization has specialized business logic that off-the-shelf software cannot satisfy. Building bespoke software guarantees total workflow alignment."
        elif requires_exact_workflow and budget_inr < 50000:
            recommendation = "Customized Add-on / Scripted Template on top of General Purpose Suite"
            rationale = "Budget constraints prevent full ground-up development; configure macro scripts inside Excel/LibreOffice or low-code tools."
        else:
            recommendation = "General-Purpose Commercial Off-The-Shelf (COTS) Package"
            rationale = "Standard software suites provide immediate deployment, vendor security updates, and low per-user cost."

        print(f"\n[+] RECOMMENDATION: {recommendation}")
        print(f"    Rationale: {rationale}\n")
        return {"recommendation": recommendation, "rationale": rationale}


def main():
    print("=================================================================")
    print("  CBSE CLASS 11 CS (083) - APPLICATION SOFTWARE DECISION MATRIX  ")
    print("=================================================================\n")

    # Scenario 1: General office documentation
    ApplicationSoftwareAnalyzer.evaluate_selection(
        user_need="Drafting school essays and preparing lab reports",
        budget_inr=0,
        requires_exact_workflow=False
    )

    # Scenario 2: Hospital bed allocation and OPD token management
    ApplicationSoftwareAnalyzer.evaluate_selection(
        user_need="Hospital Multi-Speciality Bed & Pharmacy Billing",
        budget_inr=150000,
        requires_exact_workflow=True
    )

if __name__ == "__main__":
    main()
