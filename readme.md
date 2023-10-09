# Chrome Extension: Input Toxicity Analyzer

![Extension Icon](/path/to/icon.png)

## Overview

The Input Toxicity Analyzer is a Chrome extension that captures user input from websites and assesses the toxicity level using the Perspective API by Google. The extension uploads the input to Firebase, where the toxicity level is determined and stored. Admins can then use the provided website to perform data analytics and filter the information they need.

## Features

- Captures user input from websites.
- Uploads input to Firebase for analysis.
- Utilizes Perspective API for toxicity assessment.
- Provides a web interface for admin data analytics.

## Installation

1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode."
4. Click "Load unpacked" and select the extension folder.

## Usage

1. Install and activate the extension.
2. Browse websites and enter text in input fields or text areas.
3. The extension captures the input and uploads it to Firebase.
4. Firebase uses the Perspective API to assess toxicity and stores the result.
5. Admins can access the website for data analytics and filtering.

## Configuration

1. Firebase Setup:
   - Create a Firebase project at https://firebase.google.com/.
   - Obtain your Firebase configuration (apiKey, authDomain, projectId, etc.).
   - Configure Firebase in your extension code (background.js, contentScript.js, etc.).

2. Perspective API Setup:
   - Apply for a Perspective API key from https://www.perspectiveapi.com/.
   - Configure your extension to use the API key for toxicity assessment.

## Web Interface for Admin

The admin website provides the following features:
- View captured input and associated toxicity levels.
- Perform data analytics and generate reports.
- Apply filters and search for specific input.
- Manage and export data for further analysis.

## Contribution

Contributions are welcome! If you'd like to contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Open a pull request, describing the changes you made.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any questions or inquiries, please contact [your-email@example.com](mailto:your-email@example.com).



## Supported websites

https://www.pinterest.ph/
https://daigler20.addu.edu.ph/
https://github.com/
https://drive.google.com/
https://www.youtube.com/
