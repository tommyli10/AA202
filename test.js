const startBoundary = Array.from(document.querySelectorAll('*')).find(el => el.innerHTML === "Internal&nbsp;Labor" || el.innerHTML === "Internal\u00A0Labor"); // get the first node containing "Internal Labor" to set start boundary

const endBoundary = Array.from(document.querySelectorAll('*')).find(el => el.innerHTML === "Travel&nbsp;Expenses" || el.innerHTML === "Travel\u00A0Expenses"); // get the first node containing "Travel Expense" to set end boundary

const boundaries = [startBoundary.id, endBoundary.id];

//SO#'s you want AA202s for
let soNums = ["9844826", "9849414"]; // Test Case: 5061537.html
// let soNums = ["9828817"]; // Test Case: 5062946.html


// get all labor nodes between boundary nodes with the provided SO#s
const nobrList = Array.from(document.querySelectorAll('nobr')).filter(el => {
  return (el.id > boundaries[0] &&
    el.id < boundaries[boundaries.length - 1] && soNums.some(word => el.textContent.includes(word)) && !el.textContent.includes("CM"));
});

// extract only the textContent from each node
for (let i = 0; i < nobrList.length; i++) {
  nobrList[i] = nobrList[i].textContent;
}

// Due to some data set can become very large, we are opting for using an objective to keep track of each time submission
// This is to save on memory and speed up calculation
let counter = 0;
const timeSubmissions = {};

// Takes in a time submission as a string and returns an array with individual entry for each categories
function splitBySpacing(str) {
  // \s matches any whitespace (space, tab, non-breaking space)
  // + matches one or more of them
  return str.trim().split(/\s+/);
}

// Goes through the nobrList array and turn each into a key value pair with categories in timeSubmissions object
for (let i = 0; i < nobrList.length; i++) {
  const timeSub = splitBySpacing(nobrList[i]);

  // craete invidiual object with categories needed for AA202
  timeSubmissions[counter] = {
    SO: timeSub[0],
    DateWorked: timeSub[1],
    FirstName: timeSub[3],
    LastName: timeSub[4],
    ServiceType: timeSub[5],
    HoursRep: timeSub[6]
  };

  // increment counter for next key value pair
  counter++;
}

// console.log(nobrList);
console.log(timeSubmissions);