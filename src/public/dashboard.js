document.addEventListener("DOMContentLoaded", () => {
  const mainContent = document.querySelector(".main-content");
  const links = document.querySelectorAll(".sidebar ul li a");
  console.log(links)

  
  function loadPage(page) {
    fetch(`${page}.html`)
      .then((response) => response.text())
      .then((data) => {
        mainContent.innerHTML = data;
      })
      .catch((error) => {
        mainContent.innerHTML = "<p>Failed to load content.</p>";
        console.error("Error loading content:", error);
      });
  }

  // Load the default page
  loadPage("mydash");

  // Add click event to each sidebar link
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = e.target.getAttribute("data-page");
      loadPage(page);
    });
  });
});
