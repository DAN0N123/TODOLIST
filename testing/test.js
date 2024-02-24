// Get references to elements used
var input = document.getElementById("selectedBrowser");
var list = document.getElementById("list");

// Get all the list items into an array
var listItems = Array.prototype.slice.call(document.querySelectorAll("#list > div"));

// Make the "drop down" list the same width as the input
list.style.width = getComputedStyle(input).width;

// Set up click handler on the input
input.addEventListener("click", function(){ 
 list.classList.remove("hidden");  // Show the list
});

// Set up input event handler on input
input.addEventListener("input", function(){ 
 list.classList.add("hidden");  // Hide the list
});


// Loop over the list items
listItems.forEach(function(item){
  // Set up a click event handler
  item.addEventListener("click", function(){
    input.value = item.textContent;    // Copy the value into the input
   list.classList.add("hidden");       // Hide the list
  });

  // Set up a mouseover event handler
  item.addEventListener("mouseover", function(){
    item.classList.add("highlight");       // Hide the list
  });
  
  // Set up a mouseout event handler  
  item.addEventListener("mouseout", function(){
    item.classList.remove("highlight");       // Hide the list
  });
});