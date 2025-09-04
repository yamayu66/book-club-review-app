// 全域變數
let currentDeleteCallback = null;
let currentPeriod = 5; // 預設顯示第五期

// 從 localStorage 獲取保存的書籍資料，如果沒有則使用預設資料
let books = JSON.parse(localStorage.getItem('books')) || [
    {
        "id": 1,
        "period": 5,
        "title": "車輪下",
        "author": "赫曼·赫賽",
        "presenter": "抽抽",
        "summary": "面對如此敏銳又如此懵懂\n如此渴求又如此徬徨的「危險」年紀\n即使是被引導得最好的年輕人在這其中也沒有導師\n必須以自己的力量發現道路和救贖",
        "reviews": [
            {
                "id": 1,
                "rating": 3.5,
                "reviewer": "凜苑",
                "comment": "故事本身滿無趣的，但就算經過翻譯，也可以看出文字很美。",
                "fullReviewUrl": "https://hackmd.io/@Riska0813/B1WMzgYxJl"
            },
            {
                "id": 2,
                "rating": 5,
                "reviewer": "抽抽",
                "comment": "很意外自己看到結尾竟然哭得唏哩嘩啦……\n這本書比想像中的還要薄且短，但各個階段的心境描寫我覺得很精緻……",
                "fullReviewUrl": "https://www.dropbox.com/scl/fi/unmzqtbm2931qdqtvkgkj/.paper?rlkey=nux3ka3pqkgya7ose6gve67mo&st=bn8sq4i3&dl=0"
            },
            {
                "id": 3,
                "rating": 4.5,
                "reviewer": "Inlin",
                "comment": "我本來想像的調性再灰暗一點，不過作者書寫我看下來遠比我想的貼近青春小說，這點對我挺意外的。這本書讓我想起很久以前看的少年維特的煩惱，也有些想起麥田捕手。",
                "fullReviewUrl": "https://docs.google.com/document/d/1ByA9nvAN29YqcHBAFGHCq7muJ3j4MAkonaz7wJZyG6k/edit?tab=t.0"
            },
            {
                "id": 4,
                "rating": 5,
                "reviewer": "SL",
                "comment": "推薦序上面很多人都提到了這本書讓他們回想起大考時期，而我也是在讀這本書的時候不斷回想起自己的高中生活，也的確是如神學院般的封閉。",
                "fullReviewUrl": "https://docs.google.com/document/d/1dBxKxE82DVWvGJY6fLA6UxrlPf0u6wTzaE3G5z_RmUc/edit?tab=t.0"
            },
            {
                "id": 5,
                "rating": 5,
                "reviewer": "藍",
                "comment": "最開始讀前幾章的時候都還感覺有些心得可以寫下來，但看到最後的結局反而一時間不知道該寫些什麼。我覺得整本書大部分的文字描寫都是曖昧的，作者不會特別用明確的字眼去形容主角真正的想法。我想這可能是因為主角自己其實也有迷惘的部分，就像很多人生活中無法肯定的用某些特定的文字去形容自己的情緒和想法。",
                "fullReviewUrl": "https://notes.underxheaven.com/preview/505e0345e7d5696a80e1d5681ddff8c5"
            },
            {
                "id": 6,
                "rating": 5,
                "reviewer": "三三",
                "comment": "因為是直譯本的關係，用字很簡單，但描述的景色與內心的糾結混亂，又是那麼的具體、完整，是我所嚮往的文章呈現風格。",
                "fullReviewUrl": "https://www.plurk.com/p/3gfo19i0k9"
            }
        ]
    },
    {
        "id": 2,
        "period": 5,
        "title": "K.I.N.G.：天災對策室",
        "author": "薛西斯",
        "presenter": "Inlin",
        "summary": "我想寫一個亂步式陰暗病態浪漫的推理謎團，\n加上少年漫畫式熱血中二的超能力故事。\n──薛西斯",
        "reviews": [
            {
                "id": 1,
                "reviewer": "抽抽",
                "rating": 2,
                "comment": "整體看完後覺得中間慢慢解謎的過程我是喜歡的，很好奇父親身上發生的事情還有關於王的謎題，但不得不說作者的文筆不太是我的菜。\n我其實不討厭對話很多的小說，但作者在寫對話的時候用了太多像是在「講給讀者聽」的方式在推進劇情了，就變成只是「講」故事而不是｢演」。",
                "fullReviewUrl": "https://www.dropbox.com/scl/fi/2gehk6o95v34h0o6bqd5h/K.I.N.G..paper?rlkey=srzt6cj4jmx2bx35yz3zeb4ih&dl=0"
            },
            {
                "id": 2,
                "reviewer": "Inlin",
                "rating": 3,
                "comment": "整體來說，以設定來說故事連結的縝密度已經是有在我想像以上的好看的作品！只是多少覺得這個作品要大眾可能也還不夠大眾，要說是類型小說始終又缺了幾味表現力，要說是不是我喜好可能意外地算普通，我喜歡更明確一點用人的故事或者用設定來講故事的作品。",
                "fullReviewUrl": "https://docs.google.com/document/d/1cneDqWted2Yl1R5kDo5q9h08nwarv7OznMZnV2EWUbw/edit?tab=t.0"
            },
            {
                "id": 3,
                "reviewer": "SL",
                "rating": 4,
                "comment": "我覺得這本書看得還滿愉快的！大概是因為一開始就出現了「天災」這種直覺想到超自然的現象（雖然書中看起來是物理現象可解釋啦），所以我是沒有特別意識到這本書裡是推理。但看完後才想到：一直在探討「兇手（概念）是誰」就是推理了吧？",
                "fullReviewUrl": "https://docs.google.com/document/d/1Ypm30U1qOswphJ89llkkaj8I7F81TO-e7TnuyiEaWSM/edit?tab=t.0"
            },
            {
                "id": 4,
                "reviewer": "十翼",
                "rating": 2,
                "comment": "本書讓我徹底地開始反省自己在以前創作時可能會犯的毛病。\n推理與一個全新的世界概念，無論是哪一種都足以消耗大篇幅以及讀者的腦力，然後作者把這兩者全部都寫進一個故事裡了。是一個沒有做選擇的大人。",
                "fullReviewUrl": "https://heavy-paddleboat-c0e.notion.site/K-I-N-G-153417f925c3801c8cdad8e8310d259e"
            }
        ]
    },
    {
        "id": 3,
        "period": 5,
        "title": "少女同志，向敵人開槍吧",
        "author": "逢坂冬馬",
        "presenter": "十翼",
        "summary": "德蘇戰爭愈來愈白熱化的一九四二年，住在莫斯科近郊農村的少女謝拉菲瑪原本過著平靜的日子，有一天倏地戛然而止。",
        "reviews": [
            {
                "id": 1,
                "reviewer": "凜苑",
                "rating": 2,
                "comment": "《少女同志，向敵人開槍吧》雖然立意鮮明，試圖描繪女性在戰爭中的掙扎與反抗，但過度簡化的性別刻劃與不合時宜的情節安排，讓我感到格格不入與生理不適。",
                "fullReviewUrl": "https://hackmd.io/@Riska0813/BJyHuhDU1g"
            },
            {
                "id": 2,
                "reviewer": "抽抽",
                "rating": 2,
                "comment": "雖然有誠意地描寫女性角色與戰爭場景，但整體仍停留在男性視角的想像與投射，無法真正打動我，也讓我感到抽離與不適。",
                "fullReviewUrl": "https://www.dropbox.com/scl/fi/ypv629au79gxdz8zujp3c/.paper?rlkey=3apg3dsz8uqjspdold0yw5m20&dl=0"
            },
            {
                "id": 3,
                "reviewer": "Inlin",
                "rating": 3,
                "comment": "本次我可能要難得的寫比較多負評的部分，但姑且說一下要說的話我並沒有覺得這本書「難看」，不如說其實我實際讀感來說因為作者的筆力實在太不是文學類作品會看見的等級反而另類得到了娛樂感因此坦白說看得很開心的地方也有。",
                "fullReviewUrl": "https://docs.google.com/document/d/1GsIoQ0HWVlLPt3rfmZo12QSUGGUbHrbcrDL_Mpz16xw/edit?tab=t.0"
            },
            {
                "id": 4,
                "reviewer": "SL",
                "rating": 2,
                "comment": "老實說對我而言真是不知道該怎麼評價的一本書，因為看完的當下第一感想是很無聊，後來才去思考明明是差不多？的進行方式，為什麼天災對策室對我而言是好評，但這本少女同志卻是覺得索然無味。",
                "fullReviewUrl": "https://docs.google.com/document/d/1e8rftvWNu5TcZ06CGc3GIE7bvyHBWUP_M0-btsa7ycI/edit?tab=t.0"
            },
            {
                "id": 5,
                "reviewer": "藍",
                "rating": 4,
                "comment": "對我來說，這是一本所有角色人員安排都構思得很好的小說。他們環環相扣，沒有一個角色是多餘的，連狗也是。甚至在最開始就犧牲的艾雅，我覺得她到了最後也沒有喪失在故事中死亡的意義。",
                "fullReviewUrl": "https://notes.underxheaven.com/preview/f747c06da547a25018fd3a7a6326d9b6"
            },
            {
                "id": 6,
                "reviewer": "十翼",
                "rating": 4,
                "comment": "當初會遇到這本書是因為2022年的書店大賞，而且在2022年俄烏戰爭爆發後這本書突然銷量暴增讓我很在意。\n\n看之前只知道是俄羅斯女狙擊手的故事，甚至不知道這是捏造時空背景還是基於哪一段史實的小說。現在覺得當初沒有被劇透真的太好了。\n啊，但是我有看到一句書評「在此書中與主角一起發現真正的敵人是誰」，這讓我在看書時也一邊在推敲著這篇故事裡想訴說的真正的敵人會是誰。",
                "fullReviewUrl": "https://heavy-paddleboat-c0e.notion.site/166417f925c3801dbb84cdad5abc7a04"
            }
        ]
    },
    {
        "id": 4,
        "period": 5,
        "title": "勤儉魔法師的中古英格蘭生存指南",
        "author": "布蘭登．山德森",
        "presenter": "藍",
        "summary": "男人在中世紀英格蘭的空地上醒來，不記得自己是誰，從哪裡來，為什麼會在那裡。\n在被一群來自他那個時代的人追趕同時，男人唯一的生還希望就是要恢復自己丟失的記憶！",
        "reviews": [
            {
                "id": 1,
                "reviewer": "抽抽",
                "rating": 4,
                "comment": "比想像中的還有趣！\n應該說一開始剛讀的時候覺得看不懂的名詞很多因而很痛苦，但讀到後頭也漸漸知道這是讓讀者跟失憶的主角一起體驗剛穿越到未知次元的中古世紀的感覺，隨著故事進展也開始慢慢獲得當地的知識的部分我滿喜歡的。\n",
                "fullReviewUrl": "https://www.dropbox.com/scl/fi/gozqyj7c0fpizveejs1b3/.paper?rlkey=jilw4mccm1d3c0bmrllpvtouz&dl=0"
            },
            {
                "id": 2,
                "reviewer": "Inlin",
                "rating": 4,
                "comment": "真是沒想到會看到歐美系的轉生（偽）小說……！主角從頭到尾都在吐槽自己太好笑了，面對困境能自嘲的人大概也算是某種程度的堅強吧。",
                "fullReviewUrl": "https://docs.google.com/document/d/1QiKEwZUi_bOtuqRJeIxslIDN49qOJP_H55GliAhy90k/edit?tab=t.0"
            },
            {
                "id": 3,
                "reviewer": "藍",
                "rating": 4,
                "comment": "因為最開始抱著「我想看魔法」的心情，所以在接著意識到「這居然是科幻嗎」的時候有點小遺憾的覺得好像選錯了。但我也沒有太失望，就是普通的繼續看下去，一方面也是因為覺得這種：在遠古人面前用打火機就像魔法一樣，這個想法挺有趣的。",
                "fullReviewUrl": "https://notes.underxheaven.com/preview/05c2bb61c13497aa672314fc1a1b0f3c"
            }
        ]
    },
    {
        "id": 5,
        "period": 5,
        "title": "臺灣漫遊錄",
        "author": "楊双子",
        "presenter": "SL",
        "summary": "從瓜子、米篩目、麻薏湯，到生魚片、壽喜燒，再到鹹蛋糕、蜜豆冰，小說宛如一場筵席，將青山千鶴子來臺一年的春夏秋冬，寫進這場筵席裡，有臺式小點，有日式大菜，更有多元血統的料理，比如入境便隨之風味流轉的咖哩。在次第端上的菜色中，這位小說總舖師悄悄加入了幾味，那是人與人之間因背負著不同的生命文化而舌尖異化般的，難以描摹的滋味。",
        "reviews": [
            {
                "id": 2,
                "reviewer": "抽抽",
                "rating": 5,
                "comment": "這本書真的很好看！我原是借閱線上圖書館來看的，但看完也想自己買一本下來了。\n很喜歡閱讀的同時也好像跟著這兩位一起去了一趟逃避行的感覺，感想寫到這邊我也感覺意會到會有這種逃避行的氛圍。",
                "fullReviewUrl": "https://www.dropbox.com/scl/fi/0cv9j6qa1j3dkda6j7u5g/.paper?rlkey=fpwrqi4ixvrm2kmieb3vfipw9&dl=0"
            },
            {
                "id": 3,
                "reviewer": "ヨタ",
                "rating": 5,
                "comment": "原本想著是遊記類型的書看完開始反思過去的人際關係，從兩個千鶴身上看到了更多自己過去沒有注意到跟錯過的事情。\n去書展的時候有順便買下真是太好了。",
                "fullReviewUrl": "https://docs.google.com/document/d/12_JynQVNOpoeZ8KhJAcyw3y3RiLc_Klw1i0gTjQpKXg/edit?tab=t.0"
            },
            {
                "id": 4,
                "reviewer": "Inlin",
                "rating": 5,
                "comment": "打開這本書開始看後，最意外的可能是馬上察覺到這是本...美食小說！\n其實說起來，我人生還真沒怎麼這樣看過美食小說，馬上感到很新鮮，特別這個還是寫台灣食物，一邊看一邊感到新鮮原來我知道的那些食物是會被這樣寫的，很有意思！\n",
                "fullReviewUrl": "https://docs.google.com/document/d/1cp-cvMKEdeEPfbspqDMi2dTpI11rqACa52ZE761RZ5o/edit?tab=t.0"
            },
            {
                "id": 5,
                "reviewer": "SL",
                "rating": 5,
                "comment": "網路上流傳有句話的大意是，「如果覺得跟一個人總是聊得很開，那代表只是對方在遷就自己的水準」––放在小千與青山老師身上，這句話或許就是形容這種狀況。",
                "fullReviewUrl": "https://docs.google.com/document/d/1afVsLyQBb7o7uqP5H1bDI8oRrbQ2-LJj2LJENFgmqyE/edit?tab=t.0"
            },
            {
                "id": 6,
                "reviewer": "凜苑",
                "rating": 4,
                "comment": "《臺灣漫遊錄》是以減法寫作描繪台灣的風土與人情的作品，在淡淡的友情與文化交流中，展現出作者成熟的筆法與節制的美感。",
                "fullReviewUrl": "https://hackmd.io/@Riska0813/H1wjm0Zskg"
            }
        ]
    }
];

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

    // 設置清除資料按鈕的事件監聽
    document.getElementById('clearDataBtn').addEventListener('click', () => {
        showConfirmDialog('確定要清除所有資料嗎？這個操作無法復原！', () => {
            localStorage.removeItem('books');
            books = [];
            displayBooks();
        });
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
                <button class="delete-button delete-book-button" data-book-id="${book.id}">X</button>
                <h2 class="book-title">${book.title}</h2>
                <p class="book-author">作者：${book.author}</p>
                <p class="book-presenter">出書人：${book.presenter}</p>
                <p class="book-summary">${book.summary}</p>
                <div class="book-rating">
                    <span class="rating-label">平均評分：</span>
                    <span class="stars">${'★'.repeat(Math.round(avgRating))}${'☆'.repeat(5 - Math.round(avgRating))}</span>
                    <span class="rating-number">${avgRating}</span>
                </div>
                <p class="review-count">📚 ${book.reviews.length} 則評價</p>
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
                rating: parseInt(document.getElementById('reviewRating').value),
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

    // 評論刪除按鈕事件
    document.getElementById('bookDetails').addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-review-button')) {
            const bookId = parseInt(e.target.dataset.bookId);
            const reviewId = parseInt(e.target.dataset.reviewId);
            showConfirmDialog('確定要刪除這則評論嗎？', () => deleteReview(bookId, reviewId));
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
                        <button class="delete-button" data-book-id="${book.id}" data-review-id="${review.id}">×</button>
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

    // 添加評論刪除按鈕的事件監聽器
    const deleteButtons = bookDetails.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const bookId = parseInt(e.target.dataset.bookId);
            const reviewId = parseInt(e.target.dataset.reviewId);
            showConfirmDialog('確定要刪除這則評論嗎？', () => deleteReview(bookId, reviewId));
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

// 保存書籍資料到 localStorage
function saveBooks() {
    localStorage.setItem('books', JSON.stringify(books));
}