# Module 001_002 Custom Instructions: Journal Entries & Adjustments

This document defines the architectural, component, and data specification rules for Module `001_002_journal-entries-and-adjustments` in TallyPrime & Commercial Accounting.

---

## 1. File Structure & Data Conventions

1. **Topic Folder Location**:
   `src/components/study/tally/topics/001_002_journal-entries-and-adjustments/`

2. **JSON Journal Dataset Specification**:
   - Each topic folder (`topic0_files` to `topicN_files`) MUST contain a `topic[N]_journal.json` file.
   - Example path: `src/components/study/tally/topics/001_002_journal-entries-and-adjustments/topic0_files/topic0_journal.json`
   - Structure of each journal object:
     ```json
     [
       {
         "id": 1,
         "date": "2026-04-01",
         "description": "Proprietor started new commercial trading business with cash capital ₹5,00,000",
         "voucherType": "F6 Receipt Voucher",
         "debitAccount": "Cash Account",
         "debitAmount": 500000,
         "creditAccount": "Capital Account",
         "creditAmount": 500000,
         "narration": "Being cash capital introduced by proprietor to commence trading business",
         "explanation": "Increases Cash Asset (Debit Cash A/c ₹5,00,000) and creates Internal Capital Liability (Credit Capital A/c ₹5,00,000)."
       }
     ]
     ```

---

## 2. Shared Journal Engine Location & Component Architecture

1. **Engine File Location**:
   `src/components/study/JournalViewerEngine.jsx`

2. **Core Capabilities of `JournalViewerEngine`**:
   - **Dual Display Modes**:
     1. **Show All Entries at Once Mode**: Displays the entire 5-column commercial Journal Book with all transactions, Debit/Credit allocations, and narrations visible simultaneously. Includes a global "Show / Hide All Solutions" toggle.
     2. **One-by-One Interactive Reveal Mode**: Presents one transaction problem card at a time with progress tracking (`Transaction X of N`). Allows students to mentally attempt the entry before clicking "Reveal Journal Entry Solution" (flashcard mode).
   - **Interactive SVG Double-Entry Flow Visualizer**: Renders visual nodes (`1. Source Document` → `2. Transaction Analysis` → `3. Journal Entry` → `4. Tally Voucher` → `5. Ledger Posting`) with glowing linear gradients and connection lines.
   - **Double-Entry Invariant Validation**: Automatically calculates `Total Debit (₹)` and `Total Credit (₹)` to display a real-time `Balanced (Dr = Cr)` badge.
   - **Search & Voucher Type Filtering**: Filters transactions by search query and TallyPrime voucher types (`ALL`, `F4 Contra`, `F5 Payment`, `F6 Receipt`, `F7 Journal`, `F8 Sales`, `F9 Purchase`).
   - **Bilingual Bengali / English Mode (`isBengali`)**: Adapts all headers, controls, and explanations while preserving all English accounting terms (`Debit`, `Credit`, `Journal`, `Ledger`, `F4` to `F9`, etc.) strictly in English script.

---

## 3. End-of-Module Practice Topic: `Journal Sample 1`

1. **Topic Appended at the End**:
   - Topic Title: `"Journal Sample 1"`
   - Topic Component: `Topic14.jsx` rendering `<JournalViewerEngine />` with a comprehensive 25-transaction dataset in `topic14_files/topic14_journal.json`.
   - Roadmap Registration: Added to `topics` list under module `001_002_journal-entries-and-adjustments` in `tally-prime-roadmap.json`.
