let productId = localStorage.getItem('productId');
console.log(productId)
if (!productId) {
    console.error("Продуктът не е намерен!");
} else {
    fetchProductDetails(productId);
}

function fetchProductDetails(productId) {
    fetch(`${window.config.URL}/api/products/${productId}`)
        .then(response => response.json())
        .then(data => {
            displayProduct(data);
        })
        .catch(error => console.error("Error fetching product:", error));
}

function displayProduct(ob) {
    let container = document.getElementById('containerProduct');
    container.innerHTML = `
        <div id="productDetails">
            <h1>${ob.name}</h1>
            <h2>Описание: ${ob.description}</h2>
            <h3>${ob.price} Лева</h3>
        </div>
    `;
    loadReviews(productId);
}

// Load Reviews
function loadReviews(productId) {
    let reviews = JSON.parse(localStorage.getItem(`reviews_${productId}`)) || [];
    let reviewList = document.getElementById('reviewList');
    reviewList.innerHTML = "";

    if (reviews.length === 0) {
        reviewList.innerHTML = "<p>Няма ревюта.</p>";
        return;
    }

    reviews.forEach(review => {
        let reviewDiv = document.createElement('div');
        reviewDiv.classList.add('review');
        reviewDiv.innerHTML = `
            <strong>${review.name} (${review.rating}/5)</strong>
            <p>${review.reviewText}</p>
        `;
        reviewList.appendChild(reviewDiv);
    });
}

// Handle Review Submission
document.getElementById('submitReview').addEventListener('click', function () {
    let name = document.getElementById('reviewerName').value;
    let rating = document.getElementById('reviewRating').value;
    let reviewText = document.getElementById('reviewText').value;

    if (!name || !rating || !reviewText) {
        alert('Моля, попълнете всички полета!');
        return;
    }

    let newReview = { name, rating, reviewText };

    let reviews = JSON.parse(localStorage.getItem(`reviews_${productId}`)) || [];
    reviews.push(newReview);
    localStorage.setItem(`reviews_${productId}`, JSON.stringify(reviews));

    loadReviews(productId);

    // Clear input fields
    document.getElementById('reviewerName').value = "";
    document.getElementById('reviewRating').value = "";
    document.getElementById('reviewText').value = "";
});


// Get all the star elements
const stars = document.querySelectorAll('.star');
let selectedRating = 0; // Track the rating the user selects

// Add event listener to each star
stars.forEach(star => {
    star.addEventListener('click', () => {
        // Update the selected rating when the user clicks on a star
        selectedRating = parseInt(star.getAttribute('data-value'));
        updateStars();
    });
});

// Update the star colors based on the selected rating
function updateStars() {
    stars.forEach(star => {
        const starValue = parseInt(star.getAttribute('data-value'));
        if (starValue <= selectedRating) {
            star.classList.add('selected'); // Highlight the selected stars
        } else {
            star.classList.remove('selected'); // Remove highlight from unselected stars
        }
    });
}

// Submit review when the submit button is clicked
document.getElementById('submit-review').addEventListener('click', () => {
    const reviewText = document.getElementById('review-text').value;

    if (selectedRating === 0) {
        alert("Please select a rating.");
        return;
    }

    if (reviewText.trim() === "") {
        alert("Please write a review.");
        return;
    }

    // Prepare data to be sent (could be sent to a backend or saved in localStorage for example)
    const reviewData = {
        rating: selectedRating,
        review: reviewText,
    };

    console.log("Review Data:", reviewData);

    // For example, send the review data to a backend via AJAX
    fetch('/submit-review', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
    })
    .then(response => response.json())
    .then(data => {
        alert('Review submitted successfully!');
        // Reset the form
        selectedRating = 0;
        updateStars();
        document.getElementById('review-text').value = '';
    })
    .catch(error => {
        console.error('Error submitting review:', error);
    });
});
