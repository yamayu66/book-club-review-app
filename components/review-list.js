function renderReviewList(reviews) {
    const reviewListContainer = document.createElement('div');
    reviewListContainer.className = 'review-list';

    reviews.forEach(review => {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';

        const reviewTitle = document.createElement('h3');
        reviewTitle.textContent = review.title;

        const reviewContent = document.createElement('p');
        reviewContent.textContent = review.content;

        reviewItem.appendChild(reviewTitle);
        reviewItem.appendChild(reviewContent);
        reviewListContainer.appendChild(reviewItem);
    });

    return reviewListContainer;
}

export default renderReviewList;