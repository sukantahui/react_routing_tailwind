// Object.freeze, Object.seal, Object.preventExtensions
const frozen = { a: 1 };
Object.freeze(frozen);
frozen.a = 2;        // ignored in non-strict, error in strict
frozen.b = 3;        // ignored
console.log('Frozen:', frozen); // { a: 1 }

const sealed = { a: 1 };
Object.seal(sealed);
sealed.a = 2;        // works
sealed.b = 3;        // ignored
delete sealed.a;     // ignored
console.log('Sealed:', sealed); // { a: 2 }

const noExtend = { a: 1 };
Object.preventExtensions(noExtend);
noExtend.a = 2;      // works
noExtend.b = 3;      // ignored
console.log('PreventExtensions:', noExtend); // { a: 2 }
