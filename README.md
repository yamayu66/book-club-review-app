# Book Club Review App

## Overview
The Book Club Review App is a web application designed for book club members to easily view and share their reviews of various books. This application provides a simple interface for users to read each other's opinions and engage in discussions about their favorite reads.

## Project Structure
```
book-club-review-app/
├── .nojekyll            # Disable Jekyll processing for GitHub Pages
├── index.html           # Main HTML file containing the structure of the web page
├── styles/              # Directory for CSS files
│   └── main.css        # Styles for the application
├── scripts/            # Directory for JavaScript files
│   └── app.js         # Main JavaScript file for application logic
├── package.json        # npm configuration file with dependencies and scripts
└── README.md          # Documentation for the project
```

## Getting Started

### Prerequisites
- Node.js and npm installed on your machine.

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd book-club-review-app
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Development

#### Local Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
   This will open the application in your default browser at `http://localhost:8080`

### Deployment
This application is configured for GitHub Pages deployment.

#### Setup GitHub Pages:
1. Push your code to GitHub repository
2. Go to repository Settings > Pages
3. Under "Build and deployment":
   - Source: "Deploy from a branch"
   - Branch: "main" / "/ (root)"
4. Click Save and wait for deployment

Your site will be available at `https://[your-username].github.io/book-club-review-app`

### Features
- View and add books by reading period
- Add reviews with ratings (1-5 stars)
- Delete books and reviews
- Data persistence using localStorage
- Responsive design for all devices

### Usage
- Browse books by selecting different periods
- Click on a book card to view details and reviews
- Add new books using the "新增書籍" button
- Add reviews to existing books
- Rate books on a scale of 1-5 stars

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.