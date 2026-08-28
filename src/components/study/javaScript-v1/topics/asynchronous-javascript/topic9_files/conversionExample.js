// conversionExample.js
import { from, lastValueFrom } from 'rxjs';

// Promise to Observable
const promise = Promise.resolve(['Ichapur', 'Shyamnagar']);
const observable$ = from(promise);
observable$.subscribe(places => console.log('Places:', places));

// Observable to Promise (using lastValueFrom)
const obs$ = from([10, 20, 30]);
lastValueFrom(obs$).then(last => console.log('Last value:', last));