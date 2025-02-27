document.addEventListener("DOMContentLoaded", function () {
    const allProductsLink = document.querySelector('.all-products');
    const categoryLinks = document.querySelectorAll('.category-item');
    const currentPath = window.location.pathname;
  
    // Remove active styling from all links
    function removeActiveClasses() {
      if (allProductsLink) {
        allProductsLink.classList.remove("active", "fw-bold", "bg-primary", "text-white");
        allProductsLink.classList.add("bg-light");
      }
      categoryLinks.forEach(link => {
        link.classList.remove("active", "fw-bold", "bg-primary", "text-white");
        link.classList.add("bg-light");
      });
    }
  
    // Set active link based on current URL
    removeActiveClasses();
    if (currentPath === '/products') {
      // "All Products" becomes active
      if (allProductsLink) {
        allProductsLink.classList.add("active", "fw-bold", "bg-primary", "text-white");
        allProductsLink.classList.remove("bg-light");
      }
    } else {
      // Loop through category links to match URL
      categoryLinks.forEach(link => {
        if (link.getAttribute("href") === currentPath) {
          link.classList.add("active", "fw-bold", "bg-primary", "text-white");
          link.classList.remove("bg-light");
        }
      });
    }
  });
  