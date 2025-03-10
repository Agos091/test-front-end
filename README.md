# Billor Driver Mobile App

This mobile application, developed with React Native, serves as a driver app for managing loads, capturing delivery-related documents, facilitating real-time chat communication, and handling push notifications.

## 🚀 Technologies Chosen

### 🔹 React Native
- **Why use:**
  - Cross-platform development for both Android and iOS from a single codebase.
  - Strong community support and a rich ecosystem.

### 🔹 Expo
- **Why use:**
  - Simplifies setup and project configuration.
  - Easy integration with native device features such as camera, maps, and push notifications.

### 🔹 Firebase (Auth, Firestore, Storage, and Cloud Messaging)
- **Why use:**
  - Secure authentication.
  - Efficient storage of documents, images, and user data.
  - Enables real-time chat and reliable push notifications.

### 🔹 Context API (React)
- **Why use:**
  - Simple yet effective global state management solution without additional complexity.

### 🔹 React Native Paper
- **Why use:**
  - Elegant UI with ready-to-use components for better UX and productivity.

### 🔹 React Native Maps
- **Why use:**
  - Clear and interactive visualization of load locations.

---

## ⚙️ How to Run the Project

### 📌 Prerequisites
- Node.js (18 or higher)
- Expo CLI
- Firebase account and project setup

### 📌 Installation

```bash
git clone <repo-url>
cd billor-driver-app
yarn install
```

### 📌 Firebase Configuration

1. Create a [Firebase](https://firebase.google.com/) project and enable:
   - Authentication (Email/Password)
   - Firestore Database
  - Storage
  - Cloud Messaging (enable legacy API)

2. Download the configuration files (`google-services.json` for Android, `GoogleService-Info.plist` for iOS) and place them in the project root.

3. Update your Firebase credentials in `firebaseConfig.js`.

### 📌 Run the Project

```bash
npx expo start
```

- Scan the QR Code displayed in the terminal with Expo Go on your smartphone or use an emulator.

---

## 📌 Features

- Authentication (Login and Signup)
- Load management with maps
- Document capture and upload
- Real-time chat
- Push notifications
- User profile management

---

## 🧪 Testing

### ✅ Unit Testing

Unit tests are configured using Jest and React Native Testing Library to ensure functionality:

- Tests are available under `screens/__tests__`.
- To run tests, execute:

```bash
yarn test
```

**Important**: If tests fail, ensure you've properly mocked Firebase methods and all dependencies are correctly imported.

Example test scenarios:
- Render screens correctly.
- Simulate user interactions (form submission, text input).
- Verify Firebase Authentication functions are called correctly.

You may need to adjust mocks or test setup according to your local environment.

---

✅ **Your app is now ready to use!**
