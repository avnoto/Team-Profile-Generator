const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./lib/htmlRenderer');

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

const teamMembers = [];

function generateHTML() {
  fs.writeFileSync(outputPath, render(teamMembers));
}

const questions = [
  {
    type: 'input',
    message: "What is your manager's name?",
    name: 'managerName',
  },
  {
    type: 'input',
    message: "What is your manager's ID?",
    name: 'managerID',
  },
  {
    type: 'input',
    message: "What is your manager's email?",
    name: 'managerEmail',
  },
  {
    type: 'input',
    message: "What is your manager's office Number?",
    name: 'managerOfficeNumber',
  },
  {
    type: 'input',
    message: "What is your intern's name?",
    name: 'internName',
  },
  {
    type: 'input',
    message: "What is your intern's ID?",
    name: 'internID',
  },
  {
    type: 'input',
    message: "What is your intern's email?",
    name: 'internEmail',
  },
  {
    type: 'input',
    message: "What is your intern's school?",
    name: 'internSchool',
  },
  {
    type: 'input',
    message: "What is your Engineer's name?",
    name: 'engineerName',
  },
  {
    type: 'input',
    message: "What is your Engineer's ID?",
    name: 'engineerID',
  },
  {
    type: 'input',
    message: "What is your Engineer's email?",
    name: 'engineerEmail',
  },
  {
    type: 'input',
    message: "What is your Engineer's Github?",
    name: 'engineerGithub',
  },
];

function createManager() {
  const manager = new Manager(
    inquirer.prompt(questions).then((res) => {
      res.managerName, res.managerID, res.managerEmail, res.managerOfficeNumber;
    })
  );
  teamMembers.push(manager);

  createTeam();
}
function createIntern() {
  const intern = new Intern(
    inquirer.prompt(questions).then((res) => {
      res.internName, res.internID, res.internEmail, res.internSchool;
    })
  );
  teamMembers.push(intern);

  createTeam();
}
function createEngineer() {
  const engineer = new Engineer(
    inquirer.prompt(questions).then((res) => {
      res.engineerName, res.engineerID, res.engineerEmail, res.engineerGithub;
    })
  );
  teamMembers.push(engineer);

  createTeam();
}

function createTeam() {
  inquirer
    .prompt([
      {
        type: 'list',
        choices: ['Engineer', 'Intern', 'Done'],
        message: 'Which team member would you like to add?',
        name: 'teamChoice',
      },
    ])
    .then(({ teamChoice }) => {
      if (teamChoice === 'Engineer') {
        createEngineer();
      }
      if (teamChoice === 'Intern') {
        createIntern();
      }
      if (teamChoice === 'Done') {
        generateHTML();
      }
    });
}

function init() {
  createManager();
}

init();
