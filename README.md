# Password Manager Mobile

![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

A secure mobile password manager built with React Native, Expo, and Flask.
Pairs with CAPSTONE-Password-Manager, which handles the API endpoints and backend.

## Features

🔐 Secure password storage with encryption  
👤 User authentication with JWT  
📱 Cross-platform (iOS, Android, Web)  
📊 Password organization by service
📝 Secure notes storage  
🔄 Sync across devices  
📊 Audit log for security tracking  

## Tech Stack

**Frontend:**
- React Native
- Expo
- TypeScript
- React Navigation
- React Native Paper
- Formik + Yup for forms
- Axios for API calls

**Backend (In other repo):**
- Python Flask
- SQL
- JWT Authentication
- Fernet Encryption
- Rate Limiting

## Project Structure
PasswordManagerMobile/
├── src/
│ ├── api/ # API client and auth functions
│ ├── context/ # React context providers
│ ├── navigation/ # App navigation setup
│ ├── screens/ # Application screens
│ ├── utils/ # Utility functions
├── app.json # Expo configuration
├── tsconfig.json # TypeScript configuration


## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- Expo CLI (`npm install -g expo-cli`)
- Python (v3.8+ for backend)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/PasswordManagerMobile.git
   cd PasswordManagerMobile

2. **Install dependencies**
    ```bash
    npm install

3. **Start the development server:**
    ```bash
    npx expo start --web

### Be sure to change API_BASE_URL in apiClient.ts to your API URL.
### Further cybersecurity development is recommended before deploying to a production environment.

## Contact:
**For questions or suggestions, contact the repository owner slkirby22**