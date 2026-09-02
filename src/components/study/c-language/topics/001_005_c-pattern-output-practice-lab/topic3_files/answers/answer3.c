#include <stdio.h>

#define HRA_RATE 0.20
#define DA_RATE  0.10
#define PF_RATE  0.12
#define CGST_RATE 0.09
#define SGST_RATE 0.09

typedef struct {
    int empId;
    char name[50];
    double basicSalary;
    double hra;
    double da;
    double grossSalary;
    double pf;
    double taxableIncome;
    double incomeTax;
    double netSalary;
} Employee;

double calculateIncomeTax(double taxableIncome) {
    double tax = 0.0;
    if (taxableIncome <= 250000.0) {
        tax = 0.0;
    } else if (taxableIncome <= 500000.0) {
        tax = (taxableIncome - 250000.0) * 0.05;
    } else if (taxableIncome <= 1000000.0) {
        tax = 12500.0 + (taxableIncome - 500000.0) * 0.20;
    } else {
        tax = 112500.0 + (taxableIncome - 1000000.0) * 0.30;
    }
    return tax;
}

void processPayroll(Employee *emp) {
    emp->hra = emp->basicSalary * HRA_RATE;
    emp->da = emp->basicSalary * DA_RATE;
    emp->grossSalary = emp->basicSalary + emp->hra + emp->da;
    emp->pf = emp->basicSalary * PF_RATE;
    
    double annualGross = emp->grossSalary * 12.0;
    double annualPf = emp->pf * 12.0;
    double standardDeduction = 50000.0;
    
    double annualTaxable = annualGross - annualPf - standardDeduction;
    if (annualTaxable < 0) annualTaxable = 0;
    
    emp->taxableIncome = annualTaxable;
    double annualTax = calculateIncomeTax(annualTaxable);
    emp->incomeTax = annualTax / 12.0;
    
    emp->netSalary = emp->grossSalary - emp->pf - emp->incomeTax;
}

int main(void) {
    Employee emp1 = {101, "Subhashis Roy", 45000.0};
    
    processPayroll(&emp1);
    
    printf("=============================================================\n");
    printf("     CODER & ACCOTAX PAYROLL & TAX CALCULATOR ENGINE         \n");
    printf("=============================================================\n");
    printf("Employee ID      : %d\n", emp1.empId);
    printf("Employee Name    : %s\n", emp1.name);
    printf("-------------------------------------------------------------\n");
    printf("EARNINGS (MONTHLY):                        AMOUNT (INR)\n");
    printf("  • Basic Pay                              : %12.2f\n", emp1.basicSalary);
    printf("  • House Rent Allowance (HRA @ 20%%)       : %12.2f\n", emp1.hra);
    printf("  • Dearness Allowance (DA @ 10%%)          : %12.2f\n", emp1.da);
    printf("  GROSS MONTHLY SALARY                     : %12.2f\n", emp1.grossSalary);
    printf("-------------------------------------------------------------\n");
    printf("DEDUCTIONS (MONTHLY):\n");
    printf("  • Provident Fund (PF @ 12%%)              : %12.2f\n", emp1.pf);
    printf("  • Estimated Monthly Income Tax           : %12.2f\n", emp1.incomeTax);
    printf("-------------------------------------------------------------\n");
    printf("NET MONTHLY TAKE-HOME SALARY               : %12.2f\n", emp1.netSalary);
    printf("=============================================================\n");
    
    return 0;
}
