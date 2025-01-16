## Prerequisites
- Node.js
- NPM
- Firebase CLI
## Project Setup
1. Clone the repository to your local machine:
```bash
git clone git@github.com:AkzechKyla/CCISConcernHub.git
```
2. Navigate into the project directory:
```bash
cd CCISConcernHub
```
3. Install the necessary dependencies:
```bash
npm install
```
4. Create a `firebaseConfig.js` file with your Firebase configuration.
Example configuration:
```js
const firebaseConfig = {
  apiKey: "AIzaSyBpTmmA5uqI8rWKSxWnIXzDF7W3slzbUGE",
  authDomain: "prototype-project-463c9.firebaseapp.com",
  databaseURL: "https://prototype-project-463c9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "prototype-project-463c9",
  storageBucket: "prototype-project-463c9.firebasestorage.app",
  messagingSenderId: "328202250621",
  appId: "1:328202250621:web:f8a55b5fcee0672b188414"
};

export default firebaseConfig;
```
## Running the Project
1. Start the development server:
```bash
npm run dev
```
2. Open your web browser and copy-paste the local host url (or click if provided by the terminal)
