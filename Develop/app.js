const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./lib/htmlRenderer');

const teamMembers = [];

function generateHTML() {
  fs.writeFileSync(outputPath, render(teamMembers));
}

const managerQuestions = [
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
];

const internQuestions = [
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
];

const engineerQuestions = [
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
  inquirer.prompt(managerQuestions).then((res) => {
    const manager = new Manager(
      res.managerName,
      res.managerID,
      res.managerEmail,
      res.managerOfficeNumber
    );
    teamMembers.push(manager);
    createTeam();
  });
}
function createIntern() {
  inquirer.prompt(internQuestions).then((res) => {
    const intern = new Intern(
      res.internName,
      res.internID,
      res.internEmail,
      res.internSchool
    );
    teamMembers.push(intern);
    createTeam();
  });
}
function createEngineer() {
  inquirer.prompt(engineerQuestions).then((res) => {
    const engineer = new Engineer(
      res.engineerName,
      res.engineerID,
      res.engineerEmail,
      res.engineerGithub
    );
    teamMembers.push(engineer);
    createTeam();
  });
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
