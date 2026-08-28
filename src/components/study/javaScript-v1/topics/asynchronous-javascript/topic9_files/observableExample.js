// observableExample.js (requires RxJS)
import { Observable } from 'rxjs';

// Create an Observable that emits a value every second
const timer$ = new Observable(subscriber => {
  let count = 0;
  const intervalId = setInterval(() => {
    subscriber.next(`Tick ${++count}`);
    if (count === 5) {
      subscriber.complete();
      clearInterval(intervalId);
    }
  }, 1000);

  // Teardown logic (called on unsubscribe)
  return () => {
    console.log('Cleaned up');
    clearInterval(intervalId);
  };
});

// Subscribe to the observable
const subscription = timer$.subscribe({
  next: value => console.log(value),
  error: err => console.error('Error:', err),
  complete: () => console.log('Done!')
});

// Unsubscribe after 3 seconds (before completion)
setTimeout(() => {
  subscription.unsubscribe();
}, 3000);