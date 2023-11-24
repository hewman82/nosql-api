const date = Date.now()
console.log(date);
const formatMe = new Date(date);
console.log(formatMe);
const local = formatMe.toLocaleDateString();
console.log(local);