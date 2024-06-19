import { exec } from 'child_process';

// Function to run a command and return a promise
const runCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        reject(new Error(stderr));
      }
      console.log(`Stdout: ${stdout}`);
      resolve(stdout);
    });
  });
};

//* List of npm install commands
//* If new dependencies or modules need to be added to the project, related commands should be written here
const commands = [
  'npm install dotenv bcrypt jsonwebtoken multer',
  'npm install serpapi@latest',
  'npm install mongodb@latest mongoose@latest',
  'npm install express@latest'
];

// Function to run all commands sequentially
const runCommandsSequentially = async () => {
  for (const command of commands) {
    try {
      await runCommand(command);
      console.log(`${command} completed successfully.`);
    } catch (error) {
      console.error(`${command} failed.`);
      break;
    }
  }
};

// Execute the function
runCommandsSequentially();
