const startBoundary = Array.from(document.querySelectorAll('*')).find(el => el.innerHTML === "Internal&nbsp;Labor" || el.innerHTML === "Internal\u00A0Labor"); // get the first node containing "Internal Labor" to set start boundary

const endBoundary = Array.from(document.querySelectorAll('*')).find(el => el.innerHTML === "Travel&nbsp;Expenses" || el.innerHTML === "Travel\u00A0Expenses"); // get the first node containing "Travel Expense" to set end boundary

const boundaries = [startBoundary.id, endBoundary.id];

// startBoundary.push(endBoundary); // combine start and end boundary in one array

//SO#'s you want AA202s for
let soNums = ["9844826", "9849414"];

// get all labor nodes between boundary nodes with the provided SO#s
const nobrList = Array.from(document.querySelectorAll('nobr')).filter(el => {
  return (el.id > boundaries[0] && 
    el.id < boundaries[boundaries.length - 1] && soNums.some(word => el.textContent.includes(word)) && !el.textContent.includes("CM")); 
}); 

console.log(nobrList);