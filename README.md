
# Dev Vault
<img src="https://github.com/LitPreet/Dev-Vault/blob/master/public/assets/images/pic2.png" />
Dev Vault is an advanced Q&A platform built with Next.js 14, tailored to meet the needs of developers. This application serves as a vibrant community where developers of all experience levels can ask questions, share knowledge, and collaborate effectively. Designed to facilitate seamless interaction, Dev Vault aims to enhance learning and problem-solving among developers.

## 🌐Demo

Explore the live project - https://dev-vault-preet006s-projects.vercel.app/


## 🚀Key Features
- Ask questions and answer questions.
- Upvote, Downvote, and save questions.
- Include code snippets in your answers.
- Searching and filtering.
- View Top Questions and Popular Tags.
- Built-in recommendation algorithm.
- Global Search across the database.
- View all tags and tag-related questions.
- View and Edit your profile.
- Built-in badge system for earning badges.
- View, search jobs or filter by location.
- Light and Dark Mode.

## 🛠️Tech Stack
- Next.js 14
- TypeScript
- Tailwind CSS
- MongoDB
- Mongoose
- Clerk for Authentication
- Query String
- Shadcn UI for reusable components
- PrismJS for syntax highlighting
- React Icons
- Zod for Form validation
- TinyMCE for the editor
- Next themes for theme management
- JSearch API for job searching
- Vercel for deployment
## 🏁 Get Started
To get this project up and running in your development environment, follow these step-by-step instructions.
## 📝 Prerequisites
In order to install and run this project locally, you would need to have the following installed on your local machine.
- [Node js](https://nodejs.org/en/)
- [NPM](https://docs.npmjs.com/getting-started)
- [Git](https://git-scm.com/downloads)
## ⚙️ Installation and Run Locally

#### step 1
Download or clone this repo by using the link below:
```
https://github.com/LitPreet/Dev-Vault.git
```
#### step 2
Execute the following command in the root directory of the downloaded repo in order to install dependencies:
```
npm install
```
### step 3
Execute the following command in order to run the development server locally:
```
npm run dev
```
### step 4
Open http://localhost:3000 with your browser to see the result.
## 📜 Scripts
| Script       | Action         
| ------------- |:-------------
| ```npm install```      | Installs dependencies
| ```npm run dev```      | Starts local dev server at ```localhost:3000  ```  
| ```npm run build``` | Build your production site to ```./dist/```    
| ```npm run start``` | Start your production site locally
| ```npm run lint``` | Run ESLint |

## 🔒 Environment Variables
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<CLERK_PUBLISHABLE_KEY>
CLERK_SECRET_KEY=<CLERK_SECRET_KEY>
NEXT_CLERK_WEBHOOK_SECRET=<CLERK_WEBHOOK_SECRET>
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
NEXT_PUBLIC_TINY_EDITOR_API_KEY=<YOUR_TINY_EDITOR_API_KEY>
MONGODB_URL=<YOUR_MONGODB_URL>
RapidAPI_Key=<YOUR_RAPID_API_KEY>
RapidAPI_Host=<YOUR_RAPIDAPI_HOST>
```
## 🚀 Deployment
You can create an optimized production build with the following command:
```
npm run build
```
#### Deploy on Vercel
The easiest way to deploy this Next.js app is to use the Vercel Platform.
[Vercel Platform](https://vercel.com)
