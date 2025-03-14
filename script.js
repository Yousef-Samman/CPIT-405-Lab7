
const ACCESS_KEY = 'jxITBS2KJvga4X_gfJB6JAyzDs45EYjrHGylc-RtZK8'; // Replace with your Unsplash API Key
function displayImages(images) {
  const container = document.getElementById("image-container");
  container.innerHTML = ""; // Clear previous images

  images.forEach(img => {
    const imageElement = document.createElement("img");
    // Request high-quality image with a fixed width of 500px
    imageElement.src = `${img.urls.raw}&w=750&h=750&fit=crop`;
    imageElement.alt = img.alt_description || "Unsplash Image";
    container.appendChild(imageElement);
  });
}


// 1. Fetch using XMLHttpRequest
function fetchImagesXHR() {
  const query = document.getElementById("searchQuery").value.trim() || "nature";
  const API_URL = `https://api.unsplash.com/search/photos?query=${query}&per_page=15&client_id=${ACCESS_KEY}`;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", API_URL, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      displayImages(response.results);
    }
  };
  xhr.send();
}

// 2. Fetch using Fetch API with Promises
function fetchImagesPromise() {
  const query = document.getElementById("searchQuery").value.trim() || "nature";
  const API_URL = `https://api.unsplash.com/search/photos?query=${query}&per_page=15&client_id=${ACCESS_KEY}`;

  fetch(API_URL)
    .then(response => response.json())
    .then(data => displayImages(data.results))
    .catch(error => console.error("Error fetching images:", error));
}

// 3. Fetch using Fetch API with Async/Await
async function fetchImagesAsync() {
  const query = document.getElementById("searchQuery").value.trim() || "nature"; // Get user input
  const API_URL = `https://api.unsplash.com/search/photos?query=${query}&per_page=15&client_id=${ACCESS_KEY}`; // Use query in API request

  try {
    let response = await fetch(API_URL); // Fetch images
    let data = await response.json();
    displayImages(data.results); // Display images
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}
// IF you click enter this function will be invoked 
document.getElementById("searchQuery").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    fetchImagesPromise(); // You can call any method here
  }
});
