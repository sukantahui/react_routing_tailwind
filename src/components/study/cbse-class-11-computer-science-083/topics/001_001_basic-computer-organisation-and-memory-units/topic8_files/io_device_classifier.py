"""
=============================================================================
Input & Output (I/O) Hardware Taxonomy & Classifier (Python 3)
CBSE Class XI Computer Science (Subject Code: 083)
Unit I: Computer Systems and Organisation (CSO)
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
=============================================================================
Categorizes and audits standard Input and Output peripherals:
1. Input Devices: Keyboard, Mouse, Flatbed Scanner, OCR, OMR, MICR, Barcode/QR
2. Output Devices: Soft Copy (OLED, LCD, Projectors) vs Hard Copy (Printers, Plotters)
3. Impact vs Non-Impact Printer Classification (Dot Matrix vs Laser / Inkjet)
"""

def classify_io_devices():
    """Generates an audit report classifying standard peripheral devices."""
    devices = [
        # Input Devices
        {"Device": "Keyboard", "Type": "Input", "Technology": "Matrix Key Switches (Mechanical / Membrane)", "Output/Signal": "Scan Codes (ASCII / Unicode)"},
        {"Device": "Optical Mouse", "Type": "Input", "Technology": "LED / Laser Optical Sensor + DSP Engine", "Output/Signal": "Delta (X, Y) coordinate displacement"},
        {"Device": "OMR (Optical Mark Reader)", "Type": "Input", "Technology": "Reflected light intensity sensor", "Output/Signal": "Pencil bubble mark presence (CBSE Exam Sheets)"},
        {"Device": "OCR (Optical Character Rec.)", "Type": "Input", "Technology": "Optical Scanning + AI Pattern Matching", "Output/Signal": "Editable text strings from scanned pages"},
        {"Device": "MICR (Magnetic Ink Char. Rec.)", "Type": "Input", "Technology": "Magnetized iron oxide ink sensing (E-13B)", "Output/Signal": "Bank Cheque transit routing & account numbers"},
        {"Device": "Barcode / 2D QR Scanner", "Type": "Input", "Technology": "Photodiode / 2D Image array sensor", "Output/Signal": "Decoded alphanumeric product / UPI payloads"},
        
        # Output Devices
        {"Device": "OLED / IPS LCD Monitor", "Type": "Output (Soft Copy)", "Technology": "Organic LEDs / Liquid Crystals + Backlight", "Output/Signal": "High-refresh visual pixel raster (VDU)"},
        {"Device": "Laser Printer", "Type": "Output (Hard Copy - Non-Impact)", "Technology": "Photoreceptor drum + Laser beam + Dry Toner", "Output/Signal": "Crisp 1200+ DPI printed paper documents"},
        {"Device": "Inkjet Printer", "Type": "Output (Hard Copy - Non-Impact)", "Technology": "Thermal / Piezoelectric liquid ink nozzles", "Output/Signal": "Vibrant full-color photo prints"},
        {"Device": "Dot Matrix Printer (DMP)", "Type": "Output (Hard Copy - Impact)", "Technology": "Electromagnetic print pins striking ink ribbon", "Output/Signal": "Carbon copy invoices & railway tickets"},
        {"Device": "Drum / Flatbed Plotter", "Type": "Output (Hard Copy - Vector)", "Technology": "Mechanically driven colored ink pens", "Output/Signal": "Large architectural blueprints & CAD schematics"}
    ]

    print("\n" + "=" * 85)
    print("INPUT & OUTPUT (I/O) HARDWARE SPECIFICATION & CLASSIFICATION AUDIT")
    print("=" * 85)
    for d in devices:
        print(f"[{d['Device']:<26}] | {d['Type']:<20} | {d['Technology']}")


def compare_printers():
    """Outputs a technical comparison of Impact vs Non-Impact Printers."""
    print("\n" + "=" * 80)
    print("PRINTER TAXONOMY: IMPACT vs NON-IMPACT PRINTERS")
    print("=" * 80)
    print(f"{'Feature':<22} | {'Impact Printers (e.g. Dot Matrix)':<28} | {'Non-Impact Printers (Laser/Inkjet)'}")
    print("-" * 80)
    print(f"{'Physical Contact':<22} | {'Mechanical strike on ribbon':<28} | {'No physical contact with paper'}")
    print(f"{'Carbon Copies':<22} | {'YES (Can print multiple copies)':<28} | {'NO (Cannot make carbon copies)'}")
    print(f"{'Noise Level':<22} | {'Very Noisy (Mechanical typing)':<28} | {'Silent / Near-silent'}")
    print(f"{'Print Speed & Quality':<22} | {'Low DPI (draft quality, slow)':<28} | {'Ultra-high DPI (1200+ DPI, fast)'}")
    print(f"{'Common Use Cases':<22} | {'Railway tickets, bank receipts':<28} | {'Offices, school reports, photos'}")


if __name__ == "__main__":
    classify_io_devices()
    compare_printers()
