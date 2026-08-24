// topic1_files/topic1_questions.js

const questions = [
  {
    question: "What is the role of the Universal Health ID (UHID) in multi-branch hospital database design?",
    shortAnswer: "It serves as a globally unique identifier for a patient across all hospital branches, ensuring medical history is consolidated in a single universal profile.",
    explanation: "Eliminates duplicate medical records when a patient visits multiple branches.",
    hint: "Consolidates patient history across all branches using a unique UHID.",
    level: "basic"
  },
  {
    question: "How do you model a doctor who practices at the Barrackpore branch on Mondays and the Kolkata branch on Thursdays?",
    shortAnswer: "Using a `doctor_branch_schedules` junction table storing `(doctor_id, branch_id, day_of_week, start_time, end_time)`.",
    explanation: "Accommodates flexible doctor shift rotations across multiple hospital branches.",
    hint: "Use a doctor_branch_schedules table with day_of_week and branch_id.",
    level: "basic"
  },
  {
    question: "How do you prevent scheduling a doctor in two different hospital branches at the exact same time slot?",
    shortAnswer: "Add a UNIQUE constraint on `(doctor_id, day_of_week, start_time)` in the `doctor_branch_schedules` table.",
    explanation: "Prevents physical double-booking conflicts across branches.",
    hint: "UNIQUE constraint on (doctor_id, day_of_week, start_time).",
    level: "moderate"
  },
  {
    question: "How do you prevent assigning the same consultation token number to two patients for the same doctor and slot?",
    shortAnswer: "Add a Composite UNIQUE key on `appointments (doctor_id, branch_id, appointment_date, time_slot, token_number)`.",
    explanation: "Guarantees token uniqueness at the database engine level.",
    hint: "Composite UNIQUE on (doctor_id, branch_id, appointment_date, time_slot, token_number).",
    level: "moderate"
  },
  {
    question: "How is the bed occupancy percentage calculated for a hospital branch in SQL?",
    shortAnswer: "`ROUND((COUNT(a.admission_id) / b.total_beds) * 100.0, 2)` where `a.discharge_date IS NULL`.",
    explanation: "Divides active admitted patients by branch total bed capacity.",
    hint: "(Active Admitted Beds / Total Beds) * 100",
    level: "basic"
  },
  {
    question: "Why should `prescriptions` have a 1-to-1 relationship with `appointments` using a UNIQUE `appointment_id`?",
    shortAnswer: "Because each clinical consultation appointment results in at most one official medical prescription record.",
    explanation: "Enforces 1:1 consultation-to-prescription relational integrity.",
    hint: "Each appointment produces at most one prescription record.",
    level: "basic"
  },
  {
    question: "Why is a separate `prescription_medications` table required instead of storing medicines in a CSV string inside `prescriptions`?",
    shortAnswer: "To achieve 1NF (atomic values) and allow querying, stock auditing, and drug-interaction checks on individual medicine items.",
    explanation: "Storing comma-separated text violates First Normal Form.",
    hint: "Enforces 1NF atomicity and allows querying individual medicines.",
    level: "basic"
  },
  {
    question: "How do you fetch a patient's complete prescription history across all doctor consultations?",
    shortAnswer: "Join `patients` → `appointments` → `prescriptions` → `prescription_medications`, filtered by `patient_id`.",
    explanation: "Traverses 4 normalized tables to construct a complete clinical timeline.",
    hint: "Join patients, appointments, prescriptions, and prescription_medications.",
    level: "basic"
  },
  {
    question: "How do you prevent a patient from booking an appointment if the maximum slot capacity (e.g. 20 patients) is reached?",
    shortAnswer: "Use a `BEFORE INSERT` trigger on `appointments` or an atomic transaction checking `COUNT(appointment_id) < max_patients_per_slot` with `SELECT ... FOR UPDATE`.",
    explanation: "Guarantees strict capacity limits under concurrent booking traffic.",
    hint: "Use a transaction with SELECT ... FOR UPDATE or a BEFORE INSERT trigger.",
    level: "expert"
  },
  {
    question: "What constraint prevents discharging a patient with a `discharge_date` earlier than their `admission_date`?",
    shortAnswer: "A table check constraint: `CHECK (discharge_date >= admission_date OR discharge_date IS NULL)`.",
    explanation: "Enforces chronological consistency on hospital admission records.",
    hint: "CHECK (discharge_date >= admission_date OR discharge_date IS NULL)",
    level: "moderate"
  },
  {
    question: "What foreign key `ON DELETE` rule should be used between `prescriptions` and `prescription_medications`?",
    shortAnswer: "`ON DELETE CASCADE` so that if a draft prescription is deleted, all its associated medication lines are removed automatically.",
    explanation: "Medication items cannot exist without a parent prescription header.",
    hint: "ON DELETE CASCADE on prescription_medications.",
    level: "moderate"
  },
  {
    question: "What foreign key rule should be used between `doctors` and `appointments`?",
    shortAnswer: "`ON DELETE RESTRICT` (or `NO ACTION`) to preserve historical consultation audit trails even if a doctor leaves the hospital.",
    explanation: "Prevents deleting doctors who have historical patient consultations.",
    hint: "ON DELETE RESTRICT to preserve historical appointment records.",
    level: "moderate"
  },
  {
    question: "How do you calculate total consultation revenue generated per clinical department in a given month?",
    shortAnswer: "`SELECT d.dept_name, SUM(doc.consultation_fee_inr) FROM appointments a JOIN doctors doc ON a.doctor_id = doc.doctor_id JOIN departments d ON doc.dept_id = d.dept_id WHERE a.status = 'COMPLETED' GROUP BY d.dept_id, d.dept_name;`",
    explanation: "Aggregates consultation fees across completed appointments by department.",
    hint: "SUM(consultation_fee_inr) grouped by department for COMPLETED appointments.",
    level: "moderate"
  },
  {
    question: "What composite index accelerates daily appointment schedule lookups for a specific doctor at a specific branch?",
    shortAnswer: "`CREATE INDEX idx_doc_app_schedule ON appointments (doctor_id, branch_id, appointment_date, time_slot);`",
    explanation: "Allows sub-millisecond point seeks for doctor daily schedule screens.",
    hint: "INDEX (doctor_id, branch_id, appointment_date, time_slot)",
    level: "moderate"
  },
  {
    question: "What index accelerates patient lookup by Phone Number and Aadhaar at the hospital reception desk?",
    shortAnswer: "`CREATE UNIQUE INDEX idx_patient_phone ON patients(phone_number);` and `CREATE UNIQUE INDEX idx_patient_aadhaar ON patients(aadhaar_number);`",
    explanation: "Delivers $O(\\log N)$ point lookups when patients check in at reception.",
    hint: "UNIQUE B-Tree indexes on phone_number and aadhaar_number.",
    level: "basic"
  },
  {
    question: "How do you find all doctors who have zero booked appointments for tomorrow's shift?",
    shortAnswer: "Join `doctor_branch_schedules` for tomorrow's day of week, `LEFT JOIN appointments` for tomorrow's date, and filter `WHERE appointments.appointment_id IS NULL`.",
    explanation: "Identifies doctors on duty who have unbooked consultation slots.",
    hint: "LEFT JOIN appointments on doctor_id and date WHERE appointment_id IS NULL.",
    level: "expert"
  },
  {
    question: "How do you calculate the average length of stay (ALOS) in days for discharged hospital patients?",
    shortAnswer: "`SELECT ROUND(AVG(TIMESTAMPDIFF(DAY, admission_date, discharge_date)), 1) AS avg_stay_days FROM inpatient_admissions WHERE discharge_date IS NOT NULL;`",
    explanation: "Computes the standard healthcare Average Length of Stay KPI.",
    hint: "AVG(TIMESTAMPDIFF(DAY, admission_date, discharge_date))",
    level: "moderate"
  },
  {
    question: "How do you track emergency contact details for a patient?",
    shortAnswer: "Include `emergency_contact_name`, `emergency_contact_relationship`, and `emergency_contact_phone` columns in the `patients` table.",
    explanation: "Ensures immediate access to next-of-kin contacts during medical emergencies.",
    hint: "Store emergency contact name, relation, and phone in the patients table.",
    level: "basic"
  },
  {
    question: "How do you rank doctors by patient consultation volume within each department using window functions?",
    shortAnswer: "`DENSE_RANK() OVER (PARTITION BY doc.dept_id ORDER BY COUNT(a.appointment_id) DESC) AS rank_in_dept`",
    explanation: "Uses window function with PARTITION BY to rank within departments.",
    hint: "DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY COUNT(appointment_id) DESC)",
    level: "expert"
  },
  {
    question: "What database view would you provide for hospital reception triage staff?",
    shortAnswer: "`CREATE VIEW view_today_opd_queue AS SELECT ... FROM appointments JOIN patients JOIN doctors WHERE appointment_date = CURRENT_DATE AND status = 'BOOKED' ORDER BY time_slot, token_number;`",
    explanation: "Provides real-time visibility into today's patient queue.",
    hint: "A view filtering today's booked appointments sorted by time slot and token.",
    level: "basic"
  },
  {
    question: "How do you ensure blood groups only accept valid blood types ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')?",
    shortAnswer: "Define the column as `ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')` or use a `CHECK` constraint.",
    explanation: "Restricts data values to standard medical blood types.",
    hint: "Use an ENUM data type or CHECK constraint on blood_group.",
    level: "basic"
  },
  {
    question: "What is the consequence of storing doctor consultation fees only on the `doctors` table without saving the charged fee on `appointments`?",
    shortAnswer: "If the doctor raises their fee later, all historical financial reports would erroneously calculate old appointments at the new higher fee rate.",
    explanation: "Historical financial transactions must freeze the fee charged at the time of booking.",
    hint: "Historical appointments would erroneously reflect the new fee rate.",
    level: "expert"
  },
  {
    question: "How do you solve the fee price-drift issue described above?",
    shortAnswer: "Add a `consultation_fee_charged_inr` column to the `appointments` table that captures the fee snapshot at the moment of booking.",
    explanation: "Freezes financial transaction values for immutable auditability.",
    hint: "Capture a consultation_fee_charged snapshot column on appointments.",
    level: "expert"
  },
  {
    question: "How do you find all patients who were diagnosed with 'Type 2 Diabetes' across both Barrackpore and Kolkata branches?",
    shortAnswer: "`SELECT DISTINCT p.uhid, p.first_name, p.last_name FROM patients p JOIN appointments a ON p.patient_id = a.patient_id JOIN prescriptions pr ON a.appointment_id = pr.appointment_id WHERE pr.diagnosis LIKE '%Type 2 Diabetes%';`",
    explanation: "Queries normalized clinical diagnosis history across branches.",
    hint: "Join patients, appointments, and prescriptions with diagnosis filter.",
    level: "basic"
  },
  {
    question: "How do you calculate the total pending inpatient hospital bills across all branches?",
    shortAnswer: "`SELECT b.branch_name, SUM(a.total_bill_inr) FROM inpatient_admissions a JOIN hospital_branches b ON a.branch_id = b.branch_id WHERE a.payment_status = 'UNPAID' GROUP BY b.branch_id, b.branch_name;`",
    explanation: "Aggregates outstanding hospital IPD receivables.",
    hint: "SUM(total_bill_inr) WHERE payment_status = 'UNPAID' grouped by branch.",
    level: "basic"
  },
  {
    question: "What is the purpose of storing `payment_status` as an ENUM ('UNPAID', 'PAID', 'INSURANCE_CLAIM') in inpatient admissions?",
    shortAnswer: "To track patient settlement workflows and separate direct patient cash payments from third-party insurance TPA claims.",
    explanation: "Supports hospital billing and claims management.",
    hint: "Tracks direct payments vs insurance TPA settlement workflows.",
    level: "basic"
  },
  {
    question: "How do patient appointments for Mamata, Susmita, Abhronila, and Debangshu demonstrate multi-branch rotation?",
    shortAnswer: "Patients can book appointments with specialist doctors at Barrackpore, Kolkata, or Ichapur, with all consultations linked to their unique UHID.",
    explanation: "Demonstrates centralized health record tracking across distributed clinic locations.",
    hint: "Consultations across multiple branches are linked to the student's unique UHID.",
    level: "basic"
  },
  {
    question: "What transaction isolation level is recommended for hospital appointment booking engines in MySQL?",
    shortAnswer: "`READ COMMITTED` or `REPEATABLE READ` (with explicit `FOR UPDATE` row locks on doctor schedules).",
    explanation: "Prevents dirty reads and phantom double-bookings during concurrent traffic spikes.",
    hint: "READ COMMITTED or REPEATABLE READ with SELECT FOR UPDATE locks.",
    level: "expert"
  },
  {
    question: "Why is a `patients.dob` stored instead of storing an `age` column?",
    shortAnswer: "Because `age` is a dynamic derived attribute that changes every year; storing `dob` allows computing exact age dynamically with `TIMESTAMPDIFF(YEAR, dob, CURRENT_DATE)`.",
    explanation: "Storing static date of birth avoids stale age data in compliance with 3NF.",
    hint: "Age changes dynamically; storing Date of Birth allows computing age on the fly.",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary rule for multi-branch hospital database design?",
    shortAnswer: "Maintain a single centralized Universal Patient Index (UHID), model doctor branch rotations with time-bounded schedule tables, prevent double-bookings with composite unique constraints, and freeze financial transaction snapshots on invoices.",
    explanation: "Ensures clinical record continuity, concurrency safety, and audit integrity.",
    hint: "Universal UHID + rotation schedules + composite unique slot constraints + frozen fee snapshots.",
    level: "expert"
  }
];

export default questions;
