console.log('script.js is loaded');
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const linkName = link.getAttribute('data-nav');
            console.log('Nav link clicked:', linkName);

            if (typeof gtag === 'function') {
                console.log('gtag() exists. Sending event to GA4...');
                gtag('event', 'navigation_link_clicked', {
                    navigation_link_clicked: linkName
                });
            }
        });
    });
    
    // 1. Dark Mode Toggle Feature
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Update button text
        if (body.classList.contains('dark-mode')) {
            themeToggleBtn.textContent = 'Light Mode';
        } else {
            themeToggleBtn.textContent = 'Dark Mode';
        }
    });

    // 2. File Upload Preview Feature
    const fileInput = document.getElementById('food-image');
    const previewContainer = document.getElementById('file-preview');

    fileInput.addEventListener('change', function() {
        const file = this.files[0];
        
        if (file) {
            const reader = new FileReader();
            
            previewContainer.innerHTML = ''; // Clear existing preview
            
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = "Recipe Preview";
                previewContainer.appendChild(img);
            }
            
            // Read the image file as a data URL
            reader.readAsDataURL(file);
        } else {
            previewContainer.innerHTML = '';
        }
    });

    // 3. Form Submission Handling
    const form = document.getElementById('recipe-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop page from reloading

        const recipeName = document.getElementById('recipe-name').value;
        const category = document.getElementById('category').value;

        // Basic validation check
        if(recipeName.trim() === "") {
            alert("Please enter a recipe name.");
            return;
        }
        
        //RECIPE CATEGORY TRACKING
        if (typeof gtag === 'function') {
        gtag('event', 'submit_recipe', {
            recipe_category: category
        });
        console.log('submit_recipe sent with category:', category);
    }

        alert(`Success! Your recipe for "${recipeName}" (${category}) has been submitted.`);
        
        // Clear the form and preview
        form.reset();
        previewContainer.innerHTML = '';
    });
});





