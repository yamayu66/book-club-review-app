import { defaultBooks } from '../data/bookData.js';

// 全域變數
let currentDeleteCallback = null;
let currentPeriod = 5; // 預設顯示第五期

// 從 localStorage 獲取保存的書籍資料，如果沒有則使用預設資料
let books = JSON.parse(localStorage.getItem('books')) || defaultBooks;


// 初始化頁面
document.addEventListener('DOMContentLoaded', () => {
    setupPeriodNavigation();
    displayBooks();
    setupEventListeners();
    
    // 更新期數按鈕的活動狀態
    document.querySelectorAll('.period-btn').forEach(btn => {
        if (parseInt(btn.dataset.period) === currentPeriod) {
            btn.classList.add('active');
        }
    });
});

// 設置期數導航
function setupPeriodNavigation() {
    document.querySelector('.period-nav').addEventListener('click', (e) => {
        if (e.target.classList.contains('period-btn')) {
            document.querySelectorAll('.period-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            currentPeriod = parseInt(e.target.dataset.period);
            displayBooks();
        }
    });
}

// 顯示書籍列表
function calculateAverageRating(reviews) {
    const ratingsWithoutNull = reviews.filter(review => review.rating);
    if (ratingsWithoutNull.length === 0) return 0;
    const sum = ratingsWithoutNull.reduce((acc, review) => acc + review.rating, 0);
    return (sum / ratingsWithoutNull.length).toFixed(1);
}

function displayBooks() {
    const bookList = document.getElementById('bookList');
    const filteredBooks = books.filter(book => book.period === currentPeriod);
    
    bookList.innerHTML = filteredBooks.map(book => {
        const avgRating = calculateAverageRating(book.reviews);
        return `
            <div class="book-card" data-book-id="${book.id}">
                <div class="card-actions">
                    <button class="edit-button edit-book-button" data-book-id="${book.id}">✎</button>
                    <button class="delete-button delete-book-button" data-book-id="${book.id}">X</button>
                </div>
                <h2 class="book-title">${book.title}</h2>
                <p class="book-author">作者：${book.author}</p>
                <p class="book-presenter">出書人：${book.presenter}</p>
                <p class="book-summary">${book.summary}</p>
                <div class="book-rating">
                    <span class="rating-label">平均評分：</span>
                    <span class="stars">${'★'.repeat(Math.round(avgRating))}${'☆'.repeat(5 - Math.round(avgRating))}</span>
                    <span class="rating-number">${avgRating}</span>
                </div>
                <p class="review-count">💬 ${book.reviews.length} 則評價</p>
            </div>
        `;
    }).join('');
}

// 設置事件監聽器
function setupEventListeners() {
    // 書籍卡片點擊事件
    document.getElementById('bookList').addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-book-button')) {
            e.stopPropagation();
            const bookId = parseInt(e.target.dataset.bookId);
            showConfirmDialog('確定要刪除這本書嗎？', () => deleteBook(bookId));
        } else {
            const bookCard = e.target.closest('.book-card');
            if (bookCard && !e.target.classList.contains('delete-book-button')) {
                const bookId = parseInt(bookCard.dataset.bookId);
                showBookDetails(bookId);
            }
        }
    });

    // 新增書籍按鈕點擊事件
    document.getElementById('addBookBtn').addEventListener('click', () => {
        document.getElementById('addBookForm').classList.remove('hidden');
    });

    // 關閉按鈕事件
    document.querySelectorAll('.close-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.target.closest('.modal, .book-details').classList.add('hidden');
        });
    });

    // 點擊背景關閉模態框
    document.querySelectorAll('.modal, .book-details').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    });

    // 新增書籍表單提交事件
    document.getElementById('bookForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const newBook = {
            id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
            period: parseInt(document.getElementById('bookPeriod').value),
            title: document.getElementById('bookTitle').value,
            author: document.getElementById('bookAuthor').value,
            presenter: document.getElementById('bookPresenter').value,
            summary: document.getElementById('bookSummary').value,
            reviews: []
        };
        books.push(newBook);
        saveBooks();
        displayBooks();
        document.getElementById('addBookForm').classList.add('hidden');
        document.getElementById('bookForm').reset();
    });

    // 新增評論表單提交事件
    document.getElementById('reviewForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const bookId = parseInt(document.getElementById('reviewBookId').value);
        const book = books.find(b => b.id === bookId);
        
        if (book) {
            const linkValue = document.getElementById('reviewLink').value;
            
            const newReview = {
                id: book.reviews.length > 0 ? Math.max(...book.reviews.map(r => r.id)) + 1 : 1,
                reviewer: document.getElementById('reviewerName').value,
                rating: document.getElementById('reviewRating').value ? parseFloat(document.getElementById('reviewRating').value) : null,
                comment: document.getElementById('reviewComment').value,
                fullReviewUrl: linkValue || null
            };
            
            book.reviews.push(newReview);
            saveBooks();
            showBookDetails(bookId);
            document.getElementById('addReviewForm').classList.add('hidden');
            document.getElementById('reviewForm').reset();
        }
    });

    // 確認對話框按鈕事件
    document.getElementById('confirmDelete').addEventListener('click', () => {
        if (typeof currentDeleteCallback === 'function') {
            currentDeleteCallback();
        }
        document.getElementById('confirmDialog').classList.add('hidden');
    });

    document.getElementById('cancelDelete').addEventListener('click', () => {
        document.getElementById('confirmDialog').classList.add('hidden');
    });

    // 編輯評論表單提交事件
    document.getElementById('editReviewForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const bookId = parseInt(document.getElementById('editReviewBookId').value);
        const reviewId = parseInt(document.getElementById('editReviewId').value);
        
        const book = books.find(b => b.id === bookId);
        if (!book) return;

        const review = book.reviews.find(r => r.id === reviewId);
        if (!review) return;

        // 更新評論資料
        review.reviewer = document.getElementById('editReviewerName').value;
        review.rating = parseInt(document.getElementById('editReviewRating').value);
        review.comment = document.getElementById('editReviewComment').value;
        const reviewLink = document.getElementById('editReviewLink').value;
        review.fullReviewUrl = reviewLink || null;

        saveBooks();
        showBookDetails(bookId);
        document.getElementById('editReviewForm').classList.add('hidden');
    });

    // 編輯書籍的事件監聽
    document.getElementById('bookList').addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-book-button')) {
            e.stopPropagation();
            const bookId = parseInt(e.target.dataset.bookId);
            showEditBookForm(bookId);
        }
    });

    // 編輯評論的事件監聽
    document.getElementById('bookDetails').addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-review-button')) {
            e.stopPropagation();
            const bookId = parseInt(e.target.dataset.bookId);
            const reviewId = parseInt(e.target.dataset.reviewId);
            showEditReviewForm(bookId, reviewId);
        }
    });

    // 處理編輯表單提交
    document.getElementById('editBookFormContent').addEventListener('submit', (e) => {
        e.preventDefault();
        const bookId = parseInt(document.getElementById('editBookId').value);
        const book = books.find(b => b.id === bookId);
        
        if (book) {
            book.title = document.getElementById('editBookTitle').value;
            book.author = document.getElementById('editBookAuthor').value;
            book.presenter = document.getElementById('editBookPresenter').value;
            book.summary = document.getElementById('editBookSummary').value;
            
            saveBooks();
            displayBooks();
            document.getElementById('editBookForm').classList.add('hidden');
        }
    });

    // 關閉編輯表單的事件
    document.querySelector('#editBookForm .close-button').addEventListener('click', () => {
        document.getElementById('editBookForm').classList.add('hidden');
    });
}

// 顯示書籍詳細資訊
function showBookDetails(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    const bookDetails = document.getElementById('bookDetails');
    if (!bookDetails) return;

    const detailsContent = `
        <div class="book-details-content">
            <button class="close-button">&times;</button>
            <h2>${book.title}</h2>
            <p>作者：${book.author}</p>
            <p>出書人：${book.presenter}</p>
            <h3>讀者評價</h3>
            <div class="review-list">
                ${book.reviews.map(review => `
                    <div class="review-item">
                        <div class="review-actions">
                            <button class="edit-review-button" data-book-id="${book.id}" data-review-id="${review.id}">✎</button>
                            <button class="delete-button" data-book-id="${book.id}" data-review-id="${review.id}">×</button>
                        </div>
                        <p><strong>${review.reviewer}</strong></p>
                        ${review.rating ? `
                        <div class="book-rating">
                            <span class="stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span>
                            <span class="rating-number">${review.rating}</span>
                        </div>
                        ` : ''}
                        <p style="white-space: pre-line">${review.comment}</p>
                        ${review.fullReviewUrl ? `<a href="${review.fullReviewUrl}" target="_blank">閱讀完整心得</a>` : ''}
                    </div>
                `).join('')}
            </div>
            <button class="submit-review-btn" data-book-id="${book.id}">新增評論</button>
        </div>
    `;
    
    bookDetails.innerHTML = detailsContent;
    bookDetails.classList.remove('hidden');

    // 添加評論編輯和刪除按鈕的事件監聽器
    const reviewButtons = bookDetails.querySelectorAll('.edit-review-button, .delete-button');
    reviewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const bookId = parseInt(e.target.dataset.bookId);
            const reviewId = parseInt(e.target.dataset.reviewId);
            
            if (e.target.classList.contains('delete-button')) {
                showConfirmDialog('確定要刪除這則評論嗎？', () => deleteReview(bookId, reviewId));
            } else if (e.target.classList.contains('edit-review-button')) {
                showEditReviewForm(bookId, reviewId);
            }
        });
    });

    // 設置關閉按鈕事件
    const closeButton = bookDetails.querySelector('.close-button');
    if (closeButton) {
        closeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            bookDetails.classList.add('hidden');
        });
    }

    // 點擊背景關閉
    bookDetails.addEventListener('click', (e) => {
        if (e.target === bookDetails) {
            bookDetails.classList.add('hidden');
        }
    });

    // 防止點擊內容區域時關閉
    const content = bookDetails.querySelector('.book-details-content');
    if (content) {
        content.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // 新增評論按鈕事件
    const addReviewButton = bookDetails.querySelector('.submit-review-btn');
    if (addReviewButton) {
        addReviewButton.addEventListener('click', (e) => {
            e.stopPropagation();
            document.getElementById('reviewBookId').value = bookId;
            document.getElementById('addReviewForm').classList.remove('hidden');
        });
    }
}

// 顯示確認對話框
function showConfirmDialog(message, callback) {
    const dialog = document.getElementById('confirmDialog');
    document.getElementById('confirmMessage').textContent = message;
    currentDeleteCallback = callback;
    dialog.classList.remove('hidden');
}

// 刪除書籍
function deleteBook(bookId) {
    const index = books.findIndex(b => b.id === bookId);
    if (index !== -1) {
        books.splice(index, 1);
        saveBooks();
        displayBooks();
        document.getElementById('bookDetails').classList.add('hidden');
    }
}

// 刪除評論
function deleteReview(bookId, reviewId) {
    const book = books.find(b => b.id === bookId);
    if (book) {
        const reviewIndex = book.reviews.findIndex(r => r.id === reviewId);
        if (reviewIndex !== -1) {
            book.reviews.splice(reviewIndex, 1);
            saveBooks();
            showBookDetails(bookId);
        }
    }
}

// 顯示編輯書籍表單
function showEditBookForm(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    // 填充表單
    document.getElementById('editBookId').value = book.id;
    document.getElementById('editBookTitle').value = book.title;
    document.getElementById('editBookAuthor').value = book.author;
    document.getElementById('editBookPresenter').value = book.presenter;
    document.getElementById('editBookSummary').value = book.summary;

    // 顯示編輯表單
    document.getElementById('editBookForm').classList.remove('hidden');
}

// 顯示評論編輯表單
function showEditReviewForm(bookId, reviewId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    const review = book.reviews.find(r => r.id === reviewId);
    if (!review) return;

    // 填充表單
    document.getElementById('editReviewBookId').value = bookId;
    document.getElementById('editReviewId').value = reviewId;
    document.getElementById('editReviewerName').value = review.reviewer;
    document.getElementById('editReviewRating').value = review.rating;
    document.getElementById('editReviewComment').value = review.comment;
    document.getElementById('editReviewLink').value = review.fullReviewUrl || '';

    // 顯示編輯表單
    document.getElementById('editReviewForm').classList.remove('hidden');
}

// 處理評論編輯表單提交
document.getElementById('editReviewFormContent').addEventListener('submit', (e) => {
    e.preventDefault();
    const bookId = parseInt(document.getElementById('editReviewBookId').value);
    const reviewId = parseInt(document.getElementById('editReviewId').value);
    
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    const review = book.reviews.find(r => r.id === reviewId);
    if (!review) return;

    // 更新評論資料
    review.reviewer = document.getElementById('editReviewerName').value;
    const ratingValue = document.getElementById('editReviewRating').value;
    review.rating = ratingValue ? parseFloat(ratingValue) : null;
    review.comment = document.getElementById('editReviewComment').value;
    const reviewLink = document.getElementById('editReviewLink').value;
    review.fullReviewUrl = reviewLink || null;

    saveBooks();
    showBookDetails(bookId);
    document.getElementById('editReviewForm').classList.add('hidden');
});

// 關閉評論編輯表單的事件
document.querySelector('#editReviewForm .close-button').addEventListener('click', () => {
    document.getElementById('editReviewForm').classList.add('hidden');
});

// 保存書籍資料到 localStorage
function saveBooks() {
    localStorage.setItem('books', JSON.stringify(books));
}