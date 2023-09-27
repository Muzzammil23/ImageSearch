// Initialize the Unsplash API access key
const accessKey = "hTgi2hkbdAGusDlNLmQAnxDdvSuiOwioxWA0cdhZAM0";

// Reference essential HTML elements
const formElement = document.querySelector("form");
const inputElement = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMorebtn = document.getElementById("show-more");

// Variable to store the user's search input
let inputData = "";
// Variable to keep track of pagination
let page = 1;

// Asynchronous function to perform the image search
async function searchImages() {
  // Update inputData from the search input field
  inputData = inputElement.value;

  // Construct the API URL with the current page and user query
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  // Perform the API request and await the response
  const response = await fetch(url);
  // Parse the JSON response
  const data = await response.json();

  // Extract the results array from the JSON data
  const results = data.results;

  // Clear search results if it's the first page
  if (page === 1) {
    searchResults.innerHTML = "";
  }

  // Iterate over each search result
  results.forEach((result) => {
    // Create a wrapper div for the search result
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add("search-result");

    // Create an image element and set its attributes
    const image = document.createElement('img');
    image.src = result.urls.small;
    // Safely access the 'description' property, using a fallback if undefined
    image.alt = result?.alt?.description ?? 'No description available';

    // Create a hyperlink element and set its attributes
    const imageLink = document.createElement('a');
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    // Safely access the 'description' property, using a fallback if undefined
    imageLink.textContent = result?.alt?.description ?? 'No description available';

    // Append the image and hyperlink to the wrapper div
    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);

    // Append the wrapper div to the search results container
    searchResults.appendChild(imageWrapper);
  });

  // Increment the page number for pagination
  page++;

  // Show the "Show More" button if beyond the first page
  if (page > 1) {
    showMorebtn.style.display = 'block';
  }
}

// Add an event listener to the form to initiate a new search
formElement.addEventListener("submit", async (event) => {
  event.preventDefault();
  // Reset to the first page
  page = 1;
  // Perform the search
  await searchImages();
});

// Add an event listener to the "Show More" button to fetch more results
showMorebtn.addEventListener("click", async () => {
  await searchImages();
});
