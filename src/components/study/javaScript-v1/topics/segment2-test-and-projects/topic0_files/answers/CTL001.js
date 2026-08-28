// Advanced Student Grading System

let score = 82;
let attendance = 75;

let grade;
let division;
let status;
let remark;

// Grade calculation
if (score >= 90) {
    grade = "A";
} else if (score >= 80) {
    grade = "B";
} else if (score >= 70) {
    grade = "C";
} else if (score >= 60) {
    grade = "D";
} else {
    grade = "F";
}

// Nested condition for pass/fail
if (score >= 40) {
    if (attendance >= 75) {
        status = "Pass";
    } else {
        status = "Fail (Low Attendance)";
    }
} else {
    status = "Fail";
}

// Division calculation
if (score >= 60) {
    division = "First";
} else if (score >= 50) {
    division = "Second";
} else if (score >= 40) {
    division = "Third";
} else {
    division = "No Division";
}

// Remarks using logical operators (short-circuit)
if (score >= 85 && attendance >= 80) {
    remark = "Excellent";
} else if (score >= 70 || attendance >= 80) {
    remark = "Good";
} else {
    remark = "Needs Improvement";
}

// Final output
console.log(
    `Grade: ${grade} | Division: ${division} | Status: ${status} | Remark: ${remark}`
);