# Uploadia

## Description
Uploadia is a file upload and processing application built with Node.js and TypeScript. It allows users to upload files, manage their statuses, and download them as needed. The application utilizes Sequelize for database interactions with MySQL.

## Features
- Upload files with various statuses (processing, completed, failed, uploaded).
- Download uploaded files.
- Update file information.
- Delete files from the server.
- RESTful API endpoints for file management.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/uploadia.git
   cd uploadia
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your database and update the configuration in `src/db/mysql.db.ts`.
4. Run the application:
   ```bash
   npm run dev
   ```

## Usage
- **Upload a file**: POST `/v1/api/file/upload`
- **Get uploaded files**: GET `/v1/api/file`
- **Download a file**: GET `/v1/api/file/download/:id`
- **Update file information**: PATCH `/v1/api/file/update/:id`
- **Delete a file**: DELETE `/v1/api/file/delete/:id`

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## License
This project is licensed under the MIT License.
