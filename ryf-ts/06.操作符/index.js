// class Person {
//     static look(): void {
//         console.log('looking');
//     }
//     private age: number;
//     public name: string;
// }
// type P = typeof Person;
// console.log(P);
// interface IPerson {
//     age: number;
//     name: string;
//     say(): void;
// };
// type IP = typeof IPerson;
var EPerson;
(function (EPerson) {
    EPerson["name"] = "name";
    EPerson["age"] = "age";
})(EPerson || (EPerson = {}));
console.log(typeof EPerson);
