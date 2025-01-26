# Introduction to Backend Development with Node.js

## Why Backend Development?

Think of a website or an app as a restaurant. The frontend is the dining area where you see the menu, interact with the waiter, and enjoy your meal. The backend is the kitchen, where the food is prepared, cooked, and plated. In web development:

- **Frontend**: Handles the visual presentation and user interaction using languages like HTML, CSS, and JavaScript/TypeScript.
- **Backend**: Manages the data, logic, and communication between the frontend and databases using languages like JavaScript/TypeScript (Node.js), Python, Java, etc.

## Why the Backend Matters?

In full-stack web development, you're building the parts of an application that users see (the frontend) and the parts that run behind the scenes to make everything work (the backend). The backend handles tasks like:

- **Storing data**: User information, product details, etc.
- **Processing requests**: What happens when a user clicks a button?
- **Business logic**: The rules that determine how your app behaves.

## Node.js: JavaScript Beyond the Browser

You might know JavaScript as the language that makes websites interactive. Node.js is a powerful tool that lets you use JavaScript to build server-side applications. Here's why it's awesome:

- **Fast and efficient**: Node.js is designed for handling lots of requests quickly.
- **Huge ecosystem**: Thousands of packages (code libraries) are available to help you.
- **Same language, front and back**:  Makes development smoother and code easier to share.

## NPM: The Node.js Package Manager

NPM (Node Package Manager) is a tool that comes with Node.js. It helps you manage your project's dependencies (external code libraries). You will see it a lot when working with Node.js projects.

package.json file keeps track of your project's dependencies and settings. You can create it by running `npm init` in your project folder.

## TypeScript: Adding Structure to JavaScript

TypeScript is like a supercharged version of JavaScript. It adds features that help you:

- **Catch errors early**:  TypeScript checks your code for problems before you run it.
- **Write cleaner code**:  You can define the types of your variables and functions for better organization.
- **Work with large projects**:  TypeScript makes it easier to manage complex codebases.

You can install TypeScript using NPM by running `npm install -D typescript`. This will let you write
and compile your TypeScript code to JavaScript using the TypeScript compiler (`tsc`). 

tsconfig.json file lets you customize how TypeScript behaves in your project. You can create it by running `npx tsc --init` in your project folder.

## Setting Up Your Environment

1. Download and Install Node.js:
   - Visit the official Node.js website: https://nodejs.org/
   - Choose the installer for your operating system.
   - Follow the installation instructions.
2. Verify Installation:
   - Open your terminal or command prompt.
   - Type `node -v` and press Enter. You should see the Node.js version you installed.
   - Type `npm -v` and press Enter. You should see the NPM version installed.

## Your First Express App

Express is a popular framework that makes building Node.js apps easier. Here's how to create a simple "health check" endpoint:

1. **Create a Project**:
```bash
mkdir my-first-express-app # Creates a new folder
cd my-first-express-app # Enters the folder
npm init -y # Creates a package.json file
```
2. **Install Express**:
```bash
npm install express # Adds Express to your project
```
3. **Create index.js**:

index.js is the entry point of your app. Create it in your project root folder and add the following code:
```javascript
const express = require('express'); // Import the Express library
const app = express(); // Create an Express app
const port = 5200; // Set the port number

// Define a "health check" endpoint
app.get('/health', (req, res) => {
	// Send a response when the endpoint is accessed
    res.send('Our app is healthy!');
});

// Start the server
app.listen(port, () => {
	// Log a message when the server starts
    console.log(`App listening at http://localhost:${port}`);
});
```
4. **Run the App**:
```bash
node index.js
```
5. **Test the Endpoint**: Open your web browser and go to http://localhost:5200/health. You should see the message "Our app is healthy!".

::: info For people new to web development
The URL http://localhost:5200/health breaks down as follows:
- **http://**: The protocol used to access the resource (in this case, Hypertext Transfer Protocol).
- **localhost**: The hostname that refers to your local machine.
- **5200**: The port number where your server is running.
- **/health**: The endpoint you defined in your Express app.

The full URL tells your browser to access the health endpoint on your local machine's port 5200.

You might see URLs like https://blog.jinshub.com when browsing the web. They follow a similar structure but use a domain name instead of localhost and a different port number (usually 80 for HTTP and 443 for HTTPS). 

A domain name is a human-readable address that maps to an IP address (a unique identifier for a device on the internet). When you type a domain name into your browser, it uses the Domain Name System (DNS) to find the corresponding IP address and connect you to the server hosting the website.

You typically don't need to worry about these details when working on local projects, but understanding them can help you navigate the web more effectively.
:::

## Going Further with TypeScript

Let's refactor our simple Express app to use TypeScript for better structure and error checking.

1. **Stop the Server**: Press `Ctrl + C` in your terminal to stop the Express server.
2. **Install TypeScript**: Run `npm install -D typescript` to add TypeScript to your project.
3. **Install @types/express**: Run `npm install -D @types/express` to add type definitions for Express.
4. **Create tsconfig.json**: Run `npx tsc --init` to generate a TypeScript configuration file.
5. **Refactor index.js to index.ts**: Rename your index.js file to index.ts.
6. **Compile TypeScript**:

Run `npx tsc` to compile your TypeScript code to JavaScript. You will see a new index.js file generated. 

And there might be some errors in your code that TypeScript caught. For example, you might see errors like this:

```bash
index.ts:6:21 - error TS7006: Parameter 'req' implicitly has an 'any' type.
index.ts:6:26 - error TS7006: Parameter 'res' implicitly has an 'any' type.
```

Don't worry! TypeScript is helping you catch potential issues in your code. You can fix this by adding types to your Express request and response objects:

```typescript:line-numbers
import express, { Request, Response } from 'express'; // [!code focus]
const app = express(); // Create an Express app
const port = 5200; // Set the port number

// Define a "health check" endpoint
app.get('/health', (req: Request, res: Response) => { // [!code focus]
	// Send a response when the endpoint is accessed
    res.send('Our app is healthy!');
});

// Start the server
app.listen(port, () => {
	// Log a message when the server starts
    console.log(`App listening at http://localhost:${port}`);
});
```


7. **Compile index.ts Again**: Run `npx tsc` to compile your TypeScript code with the new type annotations. The errors should disappear.
8. **Run the App**: Run `node index.js` to start your Express app.
9. **Test the Endpoint**: Open http://localhost:5200/health in your browser to see the "Our app is healthy!" message.

Now

## Creating NPM scripts

NPM scripts are shortcuts for running common tasks in your project. Let's create a script to start our Express app with TypeScript.

1. **Install Nodemon**: Run `npm install -D nodemon` to add Nodemon, a tool that automatically restarts your server when you make changes to your code.
2. **Install ts-node**: Run `npm install -D ts-node` to add ts-node, which lets you run TypeScript files directly without compiling to JavaScript.
3. **Add NPM Scripts**:

In your package.json, add these scripts:

```json
{
  "scripts": {
	"dev": "nodemon index.ts"
  }
}
```

4. **Run the Script**: Stop your server (if it's running) and run `npm run dev` in your terminal. Now, your server will automatically restart when you save changes to your code.


## Commands Reference

- `node`: The command-line tool to run Node.js code.
  - `node <filename.js>`: Run a Node.js file.
- `npm`: The command-line tool for managing Node.js packages and dependencies. It comes with Node.js, no need to install separately.
  - `npm init -y`: 
  - `npm install <package-name>`: 
  - `npm install -D <package-name>`: 
  - `npm run <script-name>`:
- `npx`: The command-line tool to run Node.js packages without installing them globally. It comes with NPM, no need to install separately.
- `tsc`: The TypeScript compiler that converts TypeScript code to JavaScript. It comes with the TypeScript package installed by running `npm install -D typescript`.
  - `npx tsc --init`:
- `nodemon`: Nodemon is a tool that helps you develop Node.js applications by automatically restarting the server when you make changes to your code.
