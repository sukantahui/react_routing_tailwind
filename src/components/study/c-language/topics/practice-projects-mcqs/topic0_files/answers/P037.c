#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main() {
    int number, guess, attempts = 0;
    srand(time(0));
    number = rand() % 100 + 1;  // 1 to 100
    printf("I have chosen a number between 1 and 100.\n");
    do {
        printf("Enter your guess: ");
        scanf("%d", &guess);
        attempts++;
        if (guess < number)
            printf("Too low!\n");
        else if (guess > number)
            printf("Too high!\n");
        else
            printf("Congratulations! You guessed it in %d tries.\n", attempts);
    } while (guess != number);
    return 0;
}
