// topic18_files/topic18_questions.js

const questions = [
  {
    question: "Why is an Airline Reservation System considered a classic benchmark case study in ER modeling?",
    shortAnswer: "Because it models multi-level weak entities, composite keys, 1:N recursive flight schedules, airport graph relationships, and strict seat uniqueness.",
    explanation: "Standard academic & enterprise case study (Elmasri & Navathe).",
    hint: "Multi-level weak entities, composite keys, and scheduling hierarchies.",
    level: "basic"
  },
  {
    question: "What is the fundamental difference between a `Flight` and a `Leg_Instance` in airline database design?",
    shortAnswer: "`Flight` is the generic scheduled service (e.g. AI-772 flying Kolkata to Delhi daily); `Leg_Instance` is the concrete physical airplane flight occurring on a specific calendar date (e.g. AI-772 on 2026-08-24).",
    explanation: "Abstract schedule vs concrete physical departure event.",
    hint: "Abstract schedule vs concrete departure on a specific date.",
    level: "basic"
  },
  {
    question: "Why is `Flight_Leg` modeled as a Weak Entity of `Flight`?",
    shortAnswer: "Because a leg number (Leg #1, Leg #2) is only a partial discriminator that has no independent meaning without its parent `flight_number`.",
    explanation: "Identifying relationship with flight number.",
    hint: "Leg number has no meaning without its parent flight number.",
    level: "basic"
  },
  {
    question: "What is the Composite Primary Key of `leg_instances`?",
    shortAnswer: "`PRIMARY KEY (flight_number, leg_number, flight_date)`.",
    explanation: "3-way composite primary key combining flight leg and calendar date.",
    hint: "Composite of flight_number, leg_number, and flight_date.",
    level: "basic"
  },
  {
    question: "What is the Composite Primary Key of `seat_reservations`?",
    shortAnswer: "`PRIMARY KEY (flight_number, leg_number, flight_date, seat_number)`.",
    explanation: "4-way composite primary key guaranteeing no double-booked seats.",
    hint: "Composite of flight_number, leg_number, flight_date, and seat_number.",
    level: "basic"
  },
  {
    question: "How does the database prevent double-booking the same seat (e.g. '12A') on the same flight date in MySQL?",
    shortAnswer: "The `PRIMARY KEY (flight_number, leg_number, flight_date, seat_number)` constraint strictly rejects any duplicate insert with MySQL Error 1062.",
    explanation: "Primary key uniqueness prevents race conditions and double bookings.",
    hint: "Composite Primary Key rejects duplicate seat inserts.",
    level: "basic"
  },
  {
    question: "Why does the `flight_legs` table contain TWO foreign keys referencing the `airports` table?",
    shortAnswer: "One foreign key for `departure_airport` (e.g. 'CCU') and one foreign key for `arrival_airport` (e.g. 'DEL'), representing two distinct roles in the same airport entity set.",
    explanation: "Multiple foreign key roles referencing the same target table.",
    hint: "Departure airport role and arrival airport role.",
    level: "moderate",
    codeExample: "CREATE TABLE flight_legs (\n    flight_number VARCHAR(10) NOT NULL,\n    leg_number INT NOT NULL,\n    departure_airport CHAR(3) NOT NULL,\n    arrival_airport CHAR(3) NOT NULL,\n    PRIMARY KEY (flight_number, leg_number),\n    FOREIGN KEY (departure_airport) REFERENCES airports(airport_code),\n    FOREIGN KEY (arrival_airport) REFERENCES airports(airport_code)\n);"
  },
  {
    question: "How do you enforce that a flight leg cannot have the SAME departure and arrival airport in MySQL?",
    shortAnswer: "Using a `CHECK` constraint: `CHECK (departure_airport != arrival_airport)`.",
    explanation: "Row-level check constraint preventing self-referencing flights.",
    hint: "CHECK (departure_airport != arrival_airport).",
    level: "basic"
  },
  {
    question: "How do you query all available seats for flight 'AI-772' on '2026-08-24'?",
    shortAnswer: "`SELECT available_seats FROM leg_instances WHERE flight_number = 'AI-772' AND leg_number = 1 AND flight_date = '2026-08-24';`.",
    explanation: "Point query on clustered primary key.",
    hint: "WHERE flight_number = 'AI-772' AND flight_date = '2026-08-24'.",
    level: "basic"
  },
  {
    question: "What happens when a passenger books a seat inside an atomic MySQL transaction?",
    shortAnswer: "1) Check available seats > 0. 2) Insert row into `seat_reservations`. 3) Decrement `available_seats` by 1 in `leg_instances`. 4) `COMMIT` the transaction.",
    explanation: "Classic atomic booking transaction pattern.",
    hint: "Insert seat reservation + decrement available_seats inside transaction.",
    level: "moderate",
    codeExample: "START TRANSACTION;\nINSERT INTO seat_reservations (flight_number, leg_number, flight_date, seat_number, passenger_name, fare_paid)\nVALUES ('AI-772', 1, '2026-08-24', '12A', 'Mamata Hui', 4500.00);\nUPDATE leg_instances SET available_seats = available_seats - 1\nWHERE flight_number = 'AI-772' AND leg_number = 1 AND flight_date = '2026-08-24';\nCOMMIT;"
  },
  {
    question: "What is the relationship between `Airplane` and `Airplane_Type`?",
    shortAnswer: "1:N relationship: one `Airplane_Type` (e.g. Boeing 737-800) can describe multiple physical `Airplane` instances in the fleet.",
    explanation: "Type definition vs concrete vehicle instance.",
    hint: "1:N relationship between airplane type and physical airplanes.",
    level: "basic"
  },
  {
    question: "How do you query all flights departing from Kolkata Airport ('CCU') on Mondays?",
    shortAnswer: "`SELECT f.flight_number, l.arrival_airport, l.scheduled_dep_time FROM flights f JOIN flight_legs l ON f.flight_number = l.flight_number WHERE l.departure_airport = 'CCU' AND f.weekdays LIKE '%Mon%';`.",
    explanation: "Multi-table join filtering by airport code and schedule.",
    hint: "JOIN flights to flight_legs WHERE departure_airport = 'CCU'.",
    level: "basic"
  },
  {
    question: "Why should `ON DELETE CASCADE` be placed on `flight_legs` referencing `flights`?",
    shortAnswer: "Because if a flight route is discontinued and deleted from `flights`, all its legs, daily instances, and historical bookings are cascadingly purged.",
    explanation: "Hierarchical lifecycle cleanup.",
    hint: "Purges flight legs when flight route is deleted.",
    level: "basic"
  },
  {
    question: "How do you calculate total revenue generated by flight 'AI-772' on date '2026-08-24'?",
    shortAnswer: "`SELECT SUM(fare_paid) AS total_revenue FROM seat_reservations WHERE flight_number = 'AI-772' AND flight_date = '2026-08-24';`.",
    explanation: "Aggregated SUM query on reservations table.",
    hint: "SUM(fare_paid) WHERE flight_number = 'AI-772' AND flight_date = '...'",
    level: "basic"
  },
  {
    question: "How is an intermediate stop on a multi-leg flight represented?",
    shortAnswer: "Leg #1 (CCU ➔ DEL) and Leg #2 (DEL ➔ BOM) sharing the same `flight_number` (e.g. AI-772).",
    explanation: "Sequential leg numbers for connecting flights.",
    hint: "Sequential leg numbers sharing the same flight number.",
    level: "moderate"
  },
  {
    question: "What is the purpose of the `Weekdays` attribute in `flights`?",
    shortAnswer: "It defines the weekly operating frequency (e.g. 'Daily', 'Mon,Wed,Fri') to guide the automated generation of daily `leg_instances` records.",
    explanation: "Operating schedule metadata.",
    hint: "Defines the weekly operating frequency.",
    level: "basic"
  },
  {
    question: "How do you create a unified database View `vw_flight_manifest` for airline gate staff?",
    shortAnswer: "Join `seat_reservations`, `leg_instances`, `flight_legs`, and `airports` to display passenger names, seat numbers, and route details.",
    explanation: "Unified flight manifest view.",
    hint: "Pre-joins reservations, legs, and airports.",
    level: "basic",
    codeExample: "CREATE VIEW vw_flight_manifest AS\nSELECT r.flight_number, r.flight_date, r.seat_number, r.passenger_name, l.departure_airport, l.arrival_airport, r.fare_paid\nFROM seat_reservations r\nJOIN flight_legs l ON r.flight_number = l.flight_number AND r.leg_number = l.leg_number;"
  },
  {
    question: "How do you ensure that `fare_paid` is never negative in MySQL?",
    shortAnswer: "Add a `CHECK` constraint: `CHECK (fare_paid >= 0.00)`.",
    explanation: "Domain constraint on numeric currency.",
    hint: "CHECK (fare_paid >= 0.00).",
    level: "basic"
  },
  {
    question: "What index is automatically created by MySQL InnoDB for the `seat_reservations` table?",
    shortAnswer: "A clustered B-Tree index on `(flight_number, leg_number, flight_date, seat_number)`.",
    explanation: "4-column clustered composite index.",
    hint: "Clustered B-Tree index on all 4 PK columns.",
    level: "expert"
  },
  {
    question: "How do you find all passengers named 'Mamata' who flew on any flight in August 2026?",
    shortAnswer: "`SELECT flight_number, flight_date, seat_number, fare_paid FROM seat_reservations WHERE passenger_name LIKE '%Mamata%' AND flight_date BETWEEN '2026-08-01' AND '2026-08-31';`.",
    explanation: "Range query filtering by passenger name and date.",
    hint: "WHERE passenger_name LIKE '%Mamata%' AND flight_date BETWEEN ...",
    level: "basic"
  },
  {
    question: "What is the relationship between `Leg_Instance` and `Airplane`?",
    shortAnswer: "N:1 relationship: each daily leg instance is assigned exactly one physical airplane, while one physical airplane can fly multiple leg instances across different days.",
    explanation: "Physical asset assignment per departure.",
    hint: "N:1 foreign key link from leg instance to airplane.",
    level: "moderate"
  },
  {
    question: "How do you prevent assigning an airplane to a leg instance if the airplane's seat capacity is less than the booked reservations?",
    shortAnswer: "Using a `BEFORE UPDATE` trigger on `leg_instances` that verifies `assigned_airplane.total_seats >= (original_seats - available_seats)`.",
    explanation: "Capacity integrity trigger.",
    hint: "BEFORE UPDATE trigger checking seat capacity against booked seats.",
    level: "expert"
  },
  {
    question: "What is an IATA Airport Code, and what MySQL data type should be used?",
    shortAnswer: "A standardized 3-letter alphanumeric code (e.g. 'CCU', 'BOM', 'DEL'); mapped to `CHAR(3)` Primary Key.",
    explanation: "Fixed-length string representation for standard codes.",
    hint: "CHAR(3) Primary Key.",
    level: "basic"
  },
  {
    question: "Why should `airplanes` use `ON DELETE RESTRICT` when referencing `airplane_types`?",
    shortAnswer: "To prevent deleting an airplane model (e.g. Boeing 737) if physical planes of that model are currently active in the fleet.",
    explanation: "Referential integrity restriction on model taxonomy.",
    hint: "Prevents deleting an airplane model if active planes exist.",
    level: "basic"
  },
  {
    question: "How do you find the top 3 most popular flight routes departing from Kolkata CCU by total passenger volume?",
    shortAnswer: "`SELECT l.arrival_airport, COUNT(r.seat_number) AS total_passengers FROM flight_legs l JOIN seat_reservations r ON l.flight_number = r.flight_number AND l.leg_number = r.leg_number WHERE l.departure_airport = 'CCU' GROUP BY l.arrival_airport ORDER BY total_passengers DESC LIMIT 3;`.",
    explanation: "Group By aggregation with sorting and limit.",
    hint: "JOIN legs to reservations WHERE departure = 'CCU' GROUP BY arrival ORDER BY COUNT DESC LIMIT 3.",
    level: "moderate"
  },
  {
    question: "Can an airplane be scheduled for two overlapping leg instances at the exact same time?",
    shortAnswer: "No, in production systems a database trigger or scheduler verifies that an `airplane_id` has no conflicting departure/arrival times across different flight legs.",
    explanation: "Temporal scheduling conflict prevention.",
    hint: "Temporal trigger prevents double-booking an airplane.",
    level: "expert"
  },
  {
    question: "How do you query for completely SOLD OUT flights on '2026-08-24'?",
    shortAnswer: "`SELECT flight_number, leg_number FROM leg_instances WHERE flight_date = '2026-08-24' AND available_seats = 0;`.",
    explanation: "Filter on available_seats counter.",
    hint: "WHERE available_seats = 0.",
    level: "basic"
  },
  {
    question: "Why is storing `available_seats` directly in `leg_instances` considered acceptable despite being technically derivable from `total_seats - COUNT(reservations)`?",
    shortAnswer: "Because it allows instant $O(1)$ availability lookups during flight searches without performing expensive multi-row `COUNT(*)` aggregations across thousands of simultaneous search queries.",
    explanation: "Deliberate performance denormalization pattern in high-traffic airline systems.",
    hint: "Allows instant O(1) flight searches without expensive COUNT queries.",
    level: "expert"
  },
  {
    question: "What concurrency control mechanism should be used when two passengers attempt to book the last remaining seat simultaneously in MySQL?",
    shortAnswer: "`SELECT available_seats FROM leg_instances WHERE ... FOR UPDATE;` (pessimistic locking) inside a transaction, preventing race conditions.",
    explanation: "Row-level pessimistic locking in MySQL InnoDB.",
    hint: "SELECT ... FOR UPDATE inside a transaction.",
    level: "expert"
  },
  {
    question: "What is the recommended checklist for modeling an Airline Reservation Schema?",
    shortAnswer: "1) Model static schedules in `flights` and `flight_legs`. 2) Model concrete daily departures in `leg_instances`. 3) Enforce 4-way composite PK on `seat_reservations`. 4) Use `CHAR(3)` for IATA airport codes. 5) Use transactions with row locking for seat bookings.",
    explanation: "Following these 5 rules guarantees robust, zero-double-booking airline database architectures.",
    hint: "Static schedules vs daily instances, 4-way composite PK on seats, CHAR(3) airport codes, FOR UPDATE locking.",
    level: "basic"
  }
];

export default questions;
