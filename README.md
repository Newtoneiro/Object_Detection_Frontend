# Object Detection Frontend

Welcome to the Object Detection frontend app! This React Native Expo application allows you to perform object detection seamlessly. Follow the instructions below to set up, configure, and run the application.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [License](#license)
- [Contributing](#contributing)
- [Acknowledgments](#acknowledgments)

---

## Prerequisites

Before you begin, make sure you have the following prerequisites installed on your machine:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/Newtoneiro/Object_Detection_Frontend.git
   ```

2. Change into the project directory:

   ```bash
   cd Object_Detection_Frontend
   ```

3. Install dependencies using Yarn:

   ```bash
   yarn install
   ```

## Configuration

1. **Create a Firebase Project:**

   - Visit the [Firebase Console](https://console.firebase.google.com/).
   - Click "Add project," enter a name, and follow the on-screen instructions.

2. **Enable Authentication:**

   - In the left sidebar, click on "Authentication."
   - Go to the "Sign-in method" tab and enable the sign-in providers you need (e.g., Email/Password, Google).

3. **Set Up Google Sign-In:**

   - If you've enabled Google as a sign-in provider, go to the "Sign-in method" tab.
   - Click on the Google sign-in provider and enable it.
   - In the same tab, find the "Web client ID" – this is your `CLIENT_ID`.

4. **Obtain `google-services.json` for Android:**

   - Navigate to your Firebase project's settings.
   - Click on the Android icon in the "Your apps" section.
   - Register your app with the package name (from `android/app/src/main/AndroidManifest.xml`).
   - Download `google-services.json` and place it in the main directory.

5. **Obtain `GoogleService-Info.plist` for iOS:**

   - In Firebase Console, click on the iOS icon in the "Your apps" section.
   - Register your app with the bundle ID (from `ios/YourProjectName.xcodeproj/project.pbxproj`).
   - Download `GoogleService-Info.plist` and place it in the main directory.

6. **Update `.env` File:**

   - Create a `.env` file in the project root.
   - Add the following variables:

     ```env
     WEB_CLIENT_ID=YOUR_FIREBASE_CLIENT_ID
     SERVER_API_ADDRESS=YOUR_SERVER_API_ADDRESS
     SERVER_API_PORT=YOUR_SERVER_API_PORT
     ```

## Running the Application

To run the application, use the following command:

    ```bash
    npm start
    ```

This will start the Expo development server. You can then open the app on your device or emulator by following the instructions in the Expo CLI.

## Running Unit Tests

You can run unit tests using Jest with the following command:

    ```bash
    npm run test
    ```

## License

OBJECT DETECTION Open Source License

Version 1.0, 19/01/2024

Permission is hereby granted, free of charge, to any person or organization obtaining a copy of the software and accompanying documentation covered by this license (the "Software") to use, reproduce, display, distribute, execute, and transmit the Software, and to prepare derivative works of the Software, and to permit third-parties to whom the Software is furnished to do so, all subject to the following:

1. Redistributions of source code must retain the above copyright notice, this list of conditions, and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions, and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of Object Detection nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Contributing

We welcome contributions from the community. To contribute to Object Detection, follow these steps:

1. Fork the repository on GitHub.
2. Clone the forked repository to your local machine.
3. Create a new branch for your feature or bug fix.
4. Make your changes and commit them with descriptive commit messages.
5. Push your changes to your fork on GitHub.
6. Open a pull request to the `main` branch of the original repository.

Ensure your pull request includes:

- A clear description of the problem or feature.
- Tests and documentation for your changes.

We will review and merge well-documented and tested contributions. Thank you for contributing to Object Detection!

For more details, please read our [Contributing Guidelines](CONTRIBUTING.md).

## Acknowledgments

`No contributions yet`

Thank you for being a part of our open-source community!
