const numbers = [1, 1, 1, 2, 3, 4, 2, 5];

const occurrenceCounter = numbers.reduce((counterObject, number) => {
    if (counterObject[number]) {
        counterObject[number]++;
    } else {
        counterObject[number] = 1;
    }
    return counterObject; // Return the modified object in each iteration
}, {});

console.log(occurrenceCounter); // Output will be {1: 3, 2: 2, 3: 1, 4: 1, 5: 1}



const expenses = [
    { category: 'Food', amount: 50 },
    { category: 'Transportation', amount: 30 },
    { category: 'Food', amount: 20 },
    { category: 'Entertainment', amount: 100 },
    { category: 'Food', amount: 80 }
];

const expenseAmount = (categoryName) => {expenses.reduce((totalAmount,expense) => {
    if(expense.category === categoryName) {
        totalAmount += expense.amount
    }
    return totalAmount
},0)}

console.log(expenseAmount('Food'))