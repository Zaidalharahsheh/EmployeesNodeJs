const Manager = require("./Employee/Manager");
const Engineer = require('./Employee/Engineer');
const Intern = require('./Employee/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./Employee/htmlRenderer");
const template = require ("./page.template")

const teamMembers = [];
const idArray = [];

function appMenu() {
    function createManager() {
        console.log("Please build your team");
        inquirer .prompt ([
            {
                type: "input",
                name: "managerName",
                message: "What is the team manager’s name", 
            },
        {
            type: "input",
                name : "managerId",
                    message : "What is the team manager’s id ?",                   
        },

        {
            type: "input",
                name: "managerEmail",
                    message: "What is the team manager’s email",
        
        },
        {
            type: "input",
                name: "managerOfficeNumber",
                    message: "What is the team manager’s office number",
             
        },
        ]).then(answers => {
            const manager = new Manager (answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            teamMembers.push(manager);
            idArray.push(answers.managerId);
            creatTeam();
        });
    }
        function creatTeam() {
            inquirer.prompt([
                {
                    type: "list",
                    name: "Choice",
                    message: "Which type of team member would you like to add ?",
                    choices: ['Engineer', 'Intern' ,'I dont want to add any more team members']
                },
            ])
            
            .then(userChoice => {

switch (userChoice.Choice) {
    case "Engineer":
    addEngineer();
        break;
        case "Intern":
            addIntern();
            break;
            default:
                buildTeam();
}
            })
}
function addEngineer() {
    inquirer .prompt ([
        {
            type: "input",
            name: "engineerName",
            message: "What is the Engineer name?",
        },
        {
            type: "input",
            name: "engineerId",
            message: "What is the team manager’s id ?",
        },

        {
            type: "input",
            name: "engineerEmail",
            message: "What is your Enginner email?",

        },
        {
            type: "input",
            name: "engineerGithub",
            message: "What is the Engineer github username?",

        },
    
    
    
    
     ]).then(answers => {
    const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
    teamMembers.push(engineer);
    idArray.push(answers.engineerId);
    creatTeam();
     });
    }
function addIntern() {
    inquirer.prompt ([
        {
            type: "input",
            name: "internName",
            message: "What is the Intern name?",
        },
        {
            type: "input",
            name: "internId",
            message: "What is the team Intern id ?",
        },

        {
            type: "input",
            name: "internEmail",
            message: "What is your Intern email?",

        },
        {
            type: "input",
            name: "internSchool",
            message: "What is the Intern school?",

        },
    ]).then(answers => {
        const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
        teamMembers.push(intern);
        idArray.push(answers.internId);
        creatTeam();
    });

    }
    function buildTeam() {

if (!fs.existsSync(OUTPUT_DIR) ) {
fs.mkdirSync(OUTPUT_DIR)
}
fs.writeFileSync(outputPath,render(teamMembers),
"utf-8");
    }
    createManager();

    }
appMenu();