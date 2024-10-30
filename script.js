document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("poems-row");

  // Replace with your API endpoint
  const apiURL = "https://localhost:7072/api/Poems";

  const options = {
    strings: ["Software Engineer", ".NET Developer", "Kannada Poet", "Vlogger"],
    typeSpeed: 100, // Speed of typing
    backSpeed: 70, // Speed of backspacing
    loop: true, // Repeat the animation
    cursorChar: "|", // Set cursor character
    smartBackspace: true, // Only backspace what doesn't match the previous string
  };

  const typed = new Typed("#typed", options);

  fetch(apiURL)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    let poems = data;
    poems.forEach((item) => {
      const poem = document.createElement("div");
      poem.classList.add('col-6', 'col-sm-6', 'col-md-4', 'col-lg-2', 'py-2', 'd-flex', 'justify-content-center');

      // Use custom functions
      const formattedDate = formatDate(item.publishedAt);
      const categorySpans = createCategorySpans(item.categories);

      // Generate link to poem-details.html with poem ID as a query parameter
      const poemLink = `poem-details.html?id=${item.poemId}`;

      poem.innerHTML = `
        <a href="${poemLink}">
          <div class="card shadow border border-3">
            <img src="https://bucket-for-sitet-testing.s3.ap-south-1.amazonaws.com/cover1.png" class="card-img-top" alt="poem-cover-image">
            <div>
              <p class='poem-title'>${item.title}</p>
              <p>
                <span><i class="bi bi-calendar-event"></i>${formattedDate}</span>
                <span><i class="bi bi-stopwatch"></i>${item.readingTime}</span>
              </p>
              <p>${categorySpans}</p>
            </div>
          </div>
        </a>
      `;

      container.appendChild(poem);
    });
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
});

function createCategorySpans(categories) {
  const categoryArray = categories.split(',').map(cat => cat.trim());
  return categoryArray.map(cat => `<span class="category-badge">${cat}</span>`).join('');
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  
  // Customize for Kannada display
  return date.toLocaleDateString('kn-IN', options).replace(" ", " "); 
}