const boundaryNodes = Array.from(document.querySelectorAll('nobr')).filter(el => el.innerHTML.includes('Internal&nbsp;Labor')); // get all nodes containing "Internal Labor" to set boundary

// const boundaryNodes = Array.from(document.querySelectorAll('*')).find(el => el.innerHTML === "Internal&nbsp;Labor" || el.innerHTML === "Internal\u00A0Labor"); // get all nodes containing "Internal Labor" to set start boundary

const endBoundary = Array.from(document.querySelectorAll('*')).find(el => el.innerHTML === "Travel&nbsp;Expenses" || el.innerHTML === "Travel\u00A0Expenses"); // get the first node containing "Travel Expense" to set end boundary

boundaryNodes.push(endBoundary); // add end boundary node into boundaryNodes

// convert all bounary nodes into their IDs
for (let i = 0; i < boundaryNodes.length; i++) {
    boundaryNodes[i] = boundaryNodes[i].id;
}

// let soNumber = '9844826';
// soNumber.trim();

//SO#'s you want AA202s for
let soNums = ["9844826", "9849414"];

// const nobrList = Array.from(document.querySelectorAll('nobr')).filter(el => el.textContent.includes('9828817') && (el.textContent.includes('0256') || el.textContent.includes('0104')));

// get all labor nodes between boundary nodes with the provided SO#s
const nobrList = Array.from(document.querySelectorAll('nobr')).filter(el => {
  return (el.id > boundaryNodes[0] && 
    el.id < boundaryNodes[boundaryNodes.length - 1] && // select all nodes between boundary nodes
    soNums.some(word => el.textContent.includes(word)) && // filter out nodes that do not contain the provided SO#s
    !el.textContent.includes("CM")); // filter out nodes that contain "CM"
}); 

