import inquirer from "inquirer";

interface ICommandAns {
  typescript: boolean;
  esLint: boolean;
  ORMQuestion: boolean;
  framework: string;
  database: string;
  ORM: string;
}

interface IQuestionSet {
  name: string;
  questions: any;
  condition?: (answers: any) => boolean;
}

const questionSets: IQuestionSet[] = [
  {
    name: "common",
    questions: [
      {
        type: "list",
        name: "typescript",
        message: "Would you like to use TypeScript?",
        choices: [
          { value: true, name: "Yes" },
          { value: false, name: "No" },
        ],
      },
      {
        type: "list",
        name: "ESLint",
        message: "Would you like to use ESLint?",
        choices: [
          { value: true, name: "Yes" },
          { value: false, name: "No" },
        ],
      },
      {
        type: "list",
        name: "framework",
        message: "Would you like to use Express.js or Fastify?",
        choices: [{ value: "Express.js" }, { value: "Fastify" }],
      },
      {
        type: "list",
        name: "database",
        message: "Choose database you want to use?",
        choices: [
          { value: "MongoDB" },
          { value: "MySQL" },
          { value: "PostgreSQL" },
          { value: "SQL Server" },
        ],
      },
      {
        type: "list",
        name: "ORMQuestion",
        message: "Would you like to use Object Relational Mapping (ORM)?",
        choices: [
          { value: true, name: "Yes" },
          { value: false, name: "No" },
        ],
      },
    ],
  },
  {
    name: "sqlORM",
    questions: [
      {
        type: "list",
        name: "sqlORM",
        message: "Choose ORM you want to use for SQL database?",
        choices: [
          { value: "prisma" },
          { value: "sequelize" },
          { value: "typeorm" },
        ],
      },
    ],
    condition: (answers: any) => answers.ORMQuestion &&  answers.database !== "MongoDB",
  },
  {
    name: "noSqlORM",
    questions: [
      {
        type: "list",
        name: "noSqlORM",
        message: "Choose ORM you want to use for MongoDB?",
        choices: [{ value: "mongoose" }],
      },
    ],
    condition: (answers: any) => answers.ORMQuestion && answers.database === "MongoDB",
  },
];

export const render = async () => {
  const commandAns: ICommandAns = {
    typescript: true,
    esLint: false,
    ORMQuestion: false,
    framework: "Express.js",
    database: "MongoDB",
    ORM: "mongoose",
  };

  for (const questionSet of questionSets) {
    if (!questionSet.condition || questionSet.condition(commandAns)) {
      const answers: any = await inquirer.prompt(questionSet.questions);
      Object.assign(commandAns, answers);
    }
  }

  console.log(commandAns);
};
