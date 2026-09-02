#include <stdio.h>
#include <stdbool.h>

#define MAX_PIN_ATTEMPTS 3
#define DEFAULT_PIN 1234

static double accountBalance = 5000.00;
static int failedAttempts = 0;
static bool isAccountLocked = false;

bool verifyPin(int enteredPin) {
    if (isAccountLocked) {
        printf("\n[ERROR] Account is LOCKED due to security violations!\n");
        return false;
    }
    if (enteredPin == DEFAULT_PIN) {
        failedAttempts = 0;
        return true;
    } else {
        failedAttempts++;
        printf("\n[ALERT] Incorrect PIN! Attempt %d of %d.\n", failedAttempts, MAX_PIN_ATTEMPTS);
        if (failedAttempts >= MAX_PIN_ATTEMPTS) {
            isAccountLocked = true;
            printf("[SECURITY ALERT] Maximum invalid PIN attempts exceeded! Account is now LOCKED.\n");
        }
        return false;
    }
}

void checkBalance(void) {
    printf("\n>>> CURRENT ACCOUNT BALANCE: INR %.2f\n", accountBalance);
}

void depositMoney(double amount) {
    if (amount <= 0) {
        printf("\n[ERROR] Invalid deposit amount!\n");
        return;
    }
    accountBalance += amount;
    printf("\n[SUCCESS] Deposited INR %.2f. New Balance: INR %.2f\n", amount, accountBalance);
}

void withdrawMoney(double amount) {
    if (amount <= 0) {
        printf("\n[ERROR] Invalid withdrawal amount!\n");
        return;
    }
    if (amount > accountBalance) {
        printf("\n[ERROR] Insufficient funds! Available: INR %.2f\n", accountBalance);
        return;
    }
    accountBalance -= amount;
    printf("\n[SUCCESS] Withdrew INR %.2f. Remaining Balance: INR %.2f\n", amount, accountBalance);
}

int main(void) {
    int pin, choice;
    double amount;

    printf("=====================================================\n");
    printf("   CODER & ACCOTAX ATM BANKING SYSTEM - BARRACKPORE   \n");
    printf("=====================================================\n");

    printf("Enter 4-Digit Security PIN: ");
    if (scanf("%d", &pin) != 1 || !verifyPin(pin)) {
        return 1;
    }

    do {
        printf("\n--- ATM MAIN MENU ---\n");
        printf("1. Check Account Balance\n");
        printf("2. Deposit Funds\n");
        printf("3. Withdraw Funds\n");
        printf("4. Exit ATM Terminal\n");
        printf("Enter Selection (1-4): ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                checkBalance();
                break;
            case 2:
                printf("Enter Deposit Amount (INR): ");
                scanf("%lf", &amount);
                depositMoney(amount);
                break;
            case 3:
                printf("Enter Withdrawal Amount (INR): ");
                scanf("%lf", &amount);
                withdrawMoney(amount);
                break;
            case 4:
                printf("\nThank you for using Coder & AccoTax ATM. Have a great day!\n");
                break;
            default:
                printf("\n[ERROR] Invalid selection! Choose between 1 and 4.\n");
        }
    } while (choice != 4);

    return 0;
}
