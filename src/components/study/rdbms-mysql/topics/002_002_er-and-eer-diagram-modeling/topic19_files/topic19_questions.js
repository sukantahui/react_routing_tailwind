// topic19_files/topic19_questions.js

const questions = [
  {
    question: "Why is a Hospital & Pharmacy Management System a quintessential real-world ER case study?",
    shortAnswer: "Because it models multi-branch organizations, 1:1 clinical prescriptions, 1:N doctor-patient appointments, and M:N pharmacy inventory line items with stock constraints.",
    explanation: "Standard enterprise medical workflow modeling.",
    hint: "Multi-branch hospitals, appointments, prescriptions, and pharmacy line items.",
    level: "basic"
  },
  {
    question: "What is the relationship between `appointments` and `prescriptions` in this schema?",
    shortAnswer: "1:1 relationship: each clinical consultation produces at most ONE prescription, enforced via `appointment_id INT NOT NULL UNIQUE` in `prescriptions`.",
    explanation: "1:1 unique foreign key link.",
    hint: "1:1 relationship with UNIQUE constraint on appointment_id.",
    level: "basic"
  },
  {
    question: "What is the Primary Key of the `prescription_items` table?",
    shortAnswer: "A Composite Primary Key: `PRIMARY KEY (prescription_id, medicine_id)`.",
    explanation: "Composite primary key representing the M:N line-item association.",
    hint: "PRIMARY KEY (prescription_id, medicine_id).",
    level: "basic"
  },
  {
    question: "How does the schema prevent negative pharmacy stock quantities in MySQL?",
    shortAnswer: "Using a `CHECK (stock_quantity >= 0)` constraint on the `pharmacy_medicines` table.",
    explanation: "Integrity check constraint preventing negative inventory.",
    hint: "CHECK (stock_quantity >= 0).",
    level: "basic"
  },
  {
    question: "What happens during an atomic pharmacy medicine dispensing transaction in SQL?",
    shortAnswer: "1) Check `stock_quantity >= required_qty`. 2) Insert row into `prescription_items`. 3) Decrement `stock_quantity` by `required_qty` in `pharmacy_medicines`. 4) `COMMIT` the transaction.",
    explanation: "Inventory dispensing transaction pattern.",
    hint: "Check stock, insert item, decrement inventory, and commit.",
    level: "moderate",
    codeExample: "START TRANSACTION;\nINSERT INTO prescription_items (prescription_id, medicine_id, dosage, quantity_dispensed)\nVALUES (1001, 501, '1 tab BD', 10);\nUPDATE pharmacy_medicines SET stock_quantity = stock_quantity - 10 WHERE medicine_id = 501;\nCOMMIT;"
  },
  {
    question: "How do you enforce that an Indian Aadhaar number in `patients` consists of exactly 12 numeric digits?",
    shortAnswer: "Using `aadhaar_no CHAR(12) NOT NULL UNIQUE` with `CONSTRAINT chk_aadhaar CHECK (aadhaar_no REGEXP '^[0-9]{12}$')`.",
    explanation: "Regex check constraint for national identity numbers.",
    hint: "CHAR(12) UNIQUE with regex check constraint.",
    level: "moderate"
  },
  {
    question: "How do you query all prescriptions issued by Dr. Sukanta Hui on '2026-08-24'?",
    shortAnswer: "`SELECT p.prescription_id, pat.full_name, p.issued_at FROM prescriptions p JOIN appointments a ON p.appointment_id = a.appointment_id JOIN doctors d ON a.doctor_id = d.doctor_id JOIN patients pat ON a.patient_id = pat.patient_id WHERE d.full_name LIKE '%Sukanta%' AND DATE(p.issued_at) = '2026-08-24';`.",
    explanation: "Multi-table join across medical consultation tables.",
    hint: "JOIN prescriptions → appointments → doctors → patients.",
    level: "basic"
  },
  {
    question: "Why should `prescriptions` use `ON DELETE CASCADE` when referencing `appointments`?",
    shortAnswer: "Because if an appointment record is deleted, its attached clinical prescription must be automatically deleted to prevent orphaned medical records.",
    explanation: "Cascading lifecycle cleanup on 1:1 association.",
    hint: "Purges prescription when appointment is deleted.",
    level: "basic"
  },
  {
    question: "Why should `prescription_items` use `ON DELETE RESTRICT` when referencing `pharmacy_medicines`?",
    shortAnswer: "To prevent deleting a medicine from the pharmacy catalog if historical prescriptions have already dispensed that medicine.",
    explanation: "Preserves audit trail for historical medical records.",
    hint: "Prevents deleting a medicine if historical prescriptions reference it.",
    level: "moderate"
  },
  {
    question: "How do you calculate total pharmacy billing for prescription #1001 in SQL?",
    shortAnswer: "`SELECT SUM(m.unit_price * i.quantity_dispensed) AS total_bill FROM prescription_items i JOIN pharmacy_medicines m ON i.medicine_id = m.medicine_id WHERE i.prescription_id = 1001;`.",
    explanation: "Aggregated sum multiplying unit price by dispensed quantity.",
    hint: "SUM(unit_price * quantity_dispensed) WHERE prescription_id = 1001.",
    level: "basic"
  },
  {
    question: "How is an Inpatient Admission modeled in relation to Patients?",
    shortAnswer: "1:N relationship from `patients` to `inpatient_admissions`, where one patient can have multiple hospital admissions over time.",
    explanation: "Temporal admissions log.",
    hint: "1:N foreign key from admissions to patients.",
    level: "basic"
  },
  {
    question: "How do you query all currently admitted patients who have NOT yet been discharged?",
    shortAnswer: "`SELECT a.admission_id, p.full_name, a.bed_number, a.admitted_at FROM inpatient_admissions a JOIN patients p ON a.patient_id = p.patient_id WHERE a.discharged_at IS NULL;`.",
    explanation: "Filter on nullable discharge timestamp.",
    hint: "WHERE discharged_at IS NULL.",
    level: "basic"
  },
  {
    question: "How do you ensure a hospital bed cannot be occupied by two patients simultaneously in MySQL?",
    shortAnswer: "Using a unique partial index or a `BEFORE INSERT` trigger verifying that `bed_number` has no active record with `discharged_at IS NULL`.",
    explanation: "Occupancy exclusivity trigger.",
    hint: "BEFORE INSERT trigger checking active bed occupancy.",
    level: "expert"
  },
  {
    question: "How do you create a unified database View `vw_patient_clinical_summary` for medical staff?",
    shortAnswer: "Pre-join `patients`, `appointments`, `doctors`, `prescriptions`, and `prescription_items`.",
    explanation: "Unified clinical history view.",
    hint: "Pre-joins patients, appointments, and prescriptions.",
    level: "basic",
    codeExample: "CREATE VIEW vw_patient_clinical_summary AS\nSELECT p.patient_id, p.full_name AS patient_name, a.scheduled_at, d.full_name AS doctor_name, pr.clinical_notes\nFROM patients p\nJOIN appointments a ON p.patient_id = a.patient_id\nJOIN doctors d ON a.doctor_id = d.doctor_id\nLEFT JOIN prescriptions pr ON a.appointment_id = pr.appointment_id;"
  },
  {
    question: "What is the relationship between `hospital_branches` and `doctors`?",
    shortAnswer: "1:N relationship: each hospital branch (e.g. Kolkata Main, Barrackpore Clinic) employs multiple doctors.",
    explanation: "Branch employment link.",
    hint: "1:N foreign key from doctors to hospital_branches.",
    level: "basic"
  },
  {
    question: "How do you find all medicines in the pharmacy that are currently LOW ON STOCK (quantity < 20)?",
    shortAnswer: "`SELECT brand_name, generic_name, stock_quantity FROM pharmacy_medicines WHERE stock_quantity < 20 ORDER BY stock_quantity ASC;`.",
    explanation: "Inventory alert query.",
    hint: "WHERE stock_quantity < 20 ORDER BY stock_quantity ASC.",
    level: "basic"
  },
  {
    question: "How do you calculate total consultation revenue collected by each doctor in August 2026?",
    shortAnswer: "`SELECT d.full_name, SUM(a.consultation_fee) AS total_revenue FROM doctors d JOIN appointments a ON d.doctor_id = a.doctor_id WHERE a.status = 'Completed' AND a.scheduled_at BETWEEN '2026-08-01' AND '2026-08-31' GROUP BY d.doctor_id, d.full_name;`.",
    explanation: "Group By aggregation filtering by completed status and date range.",
    hint: "SUM(consultation_fee) WHERE status = 'Completed' GROUP BY doctor_id.",
    level: "moderate"
  },
  {
    question: "Why should `phone` numbers in `patients` be stored as `VARCHAR(15)` rather than `INT`?",
    shortAnswer: "To preserve leading zeros (e.g. '09830012345'), support country codes (e.g. '+91'), and avoid integer arithmetic overflow.",
    explanation: "String storage for phone numbers.",
    hint: "Preserves leading zeros and supports country code prefixes.",
    level: "basic"
  },
  {
    question: "What is the consequence of omitting `UNIQUE` on `license_no` in the `doctors` table?",
    shortAnswer: "Multiple doctor records could be created with the same medical council registration number, causing identity collision and legal non-compliance.",
    explanation: "Professional license uniqueness constraint.",
    hint: "Allows duplicate medical council license numbers.",
    level: "basic"
  },
  {
    question: "How do you find the most frequently prescribed medicine in the hospital pharmacy?",
    shortAnswer: "`SELECT m.brand_name, SUM(i.quantity_dispensed) AS total_dispensed FROM pharmacy_medicines m JOIN prescription_items i ON m.medicine_id = i.medicine_id GROUP BY m.medicine_id, m.brand_name ORDER BY total_dispensed DESC LIMIT 1;`.",
    explanation: "Aggregation query finding top dispensed medicine.",
    hint: "SUM(quantity_dispensed) GROUP BY medicine_id ORDER BY total DESC LIMIT 1.",
    level: "moderate"
  },
  {
    question: "How is doctor specialization represented in the schema?",
    shortAnswer: "As a `VARCHAR(50)` column in `doctors` (e.g. 'Cardiology', 'Pediatrics', 'Orthopedics') or a separate normalized `specializations` lookup table.",
    explanation: "Specialization column definition.",
    hint: "VARCHAR column or normalized lookup table.",
    level: "basic"
  },
  {
    question: "What happens if a doctor attempts to prescribe 50 units of Paracetamol when only 10 units are in stock?",
    shortAnswer: "The inventory update statement violates the `CHECK (stock_quantity >= 0)` constraint, causing MySQL to abort the transaction with Error 3819.",
    explanation: "Check constraint failure prevents negative inventory.",
    hint: "Error 3819 check constraint violation.",
    level: "moderate"
  },
  {
    question: "How do you index the `appointments` table for high-speed schedule lookups by doctor and date?",
    shortAnswer: "`CREATE INDEX idx_doc_schedule ON appointments(doctor_id, scheduled_at);`.",
    explanation: "Composite secondary index for schedule filtering.",
    hint: "CREATE INDEX on (doctor_id, scheduled_at).",
    level: "moderate"
  },
  {
    question: "How do you record that an appointment was cancelled by the patient?",
    shortAnswer: "`UPDATE appointments SET status = 'Cancelled' WHERE appointment_id = 101;`.",
    explanation: "Status lifecycle transition.",
    hint: "UPDATE appointments SET status = 'Cancelled'.",
    level: "basic"
  },
  {
    question: "Why should `appointment_id` be an `AUTO_INCREMENT` surrogate key instead of a composite of `(doctor_id, scheduled_at)`?",
    shortAnswer: "Because a surrogate integer key provides a compact 4-byte primary key that is simple for patients to reference and efficient as a foreign key in `prescriptions`.",
    explanation: "Compact surrogate primary key benefits.",
    hint: "Compact 4-byte key easy for patient reference.",
    level: "moderate"
  },
  {
    question: "How do you query all patients who have blood group 'O-' registered in Barrackpore branch?",
    shortAnswer: "`SELECT p.full_name, p.phone FROM patients p JOIN appointments a ON p.patient_id = a.patient_id JOIN doctors d ON a.doctor_id = d.doctor_id JOIN hospital_branches b ON d.branch_id = b.branch_id WHERE p.blood_group = 'O-' AND b.city = 'Barrackpore';`.",
    explanation: "Emergency donor search query across 4 joined tables.",
    hint: "JOIN across patients, appointments, doctors, and branches.",
    level: "moderate"
  },
  {
    question: "How do you enforce that a prescription CANNOT be created for an appointment that is marked 'Cancelled'?",
    shortAnswer: "Using a `BEFORE INSERT` trigger on `prescriptions` that verifies `appointment.status != 'Cancelled'`.",
    explanation: "Clinical business rule validation trigger.",
    hint: "BEFORE INSERT trigger validating appointment status.",
    level: "expert"
  },
  {
    question: "What is the benefit of splitting `pharmacy_medicines` into catalog vs `prescription_items` for transactions?",
    shortAnswer: "It maintains strict 3NF normalization, separating static drug details (pricing, generic name) from individual prescription dispensing events.",
    explanation: "Separation of catalog master from transactional line items.",
    hint: "Separates static catalog master from transactional line items.",
    level: "basic"
  },
  {
    question: "How do you compute the total hospital revenue combining consultation fees and pharmacy sales for August 2026?",
    shortAnswer: "`SELECT (SELECT SUM(consultation_fee) FROM appointments WHERE status = 'Completed') AS total_consultations, (SELECT SUM(m.unit_price * i.quantity_dispensed) FROM prescription_items i JOIN pharmacy_medicines m ON i.medicine_id = m.medicine_id) AS total_pharmacy;`.",
    explanation: "Dual subquery financial aggregation.",
    hint: "Subqueries summing consultations and pharmacy line items.",
    level: "moderate"
  },
  {
    question: "What is the recommended checklist for modeling a Multi-Tenant Hospital & Pharmacy Schema?",
    shortAnswer: "1) Model branches, doctors, and patients as strong base entities. 2) Enforce 1:1 UNIQUE link from completed appointments to prescriptions. 3) Model pharmacy line items with composite PK `(prescription_id, medicine_id)`. 4) Enforce `CHECK (stock_quantity >= 0)`. 5) Use atomic transactions for dispensing.",
    explanation: "Following these 5 rules guarantees robust, HIPAA/NABH-compliant healthcare relational database architectures.",
    hint: "Base entities, 1:1 appointment-to-prescription, Composite line items, Stock check constraint, Atomic transactions.",
    level: "basic"
  }
];

export default questions;
