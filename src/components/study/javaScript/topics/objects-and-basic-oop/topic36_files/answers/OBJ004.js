// Nested Objects and Arrays
const company = {
    name: 'TechCorp',
    address: {
        city: 'San Francisco',
        zip: '94105'
    },
    employees: [
        { name: 'Alice', role: 'Developer' },
        { name: 'Bob', role: 'Designer' }
    ]
};

console.log('Company:', company.name);
console.log('City:', company.address.city);
console.log('First employee:', company.employees[0].name);

// Modify nested property
company.address.zip = '94107';
console.log('Updated zip:', company.address.zip);

// Loop through employees
company.employees.forEach(emp => {
    console.log(`${emp.name} - ${emp.role}`);
});
