import inquirer from 'inquirer';

const questionSets = [
    {
        name: 'common',
        questions: [
            {
                type: 'list',
                name: 'typescript',
                message: 'Would you like to use TypeScript?',
                choices: [
                    { value: true, name: 'Yes' },
                    { value: false, name: 'No' },
                ],
            },
            {
                type: 'list',
                name: 'ESLint',
                message: 'Would you like to use ESLint?',
                choices: [
                    { value: true, name: 'Yes' },
                    { value: false, name: 'No' },
                ],
            },
            {
                type: 'list',
                name: 'databaseQuestion',
                message: 'Would you like to use any database?',
                choices: [
                    { value: true, name: 'Yes' },
                    { value: false, name: 'No' },
                ],
            },
            {
                type: 'list',
                name: 'database',
                message: 'Choose database you want to use:',
                choices: [
                    { value: 'MongoDB' },
                    { value: 'MySQL - coming soon', disabled: true },
                    { value: 'PostgreSQL - coming soon', disabled: true },
                ],
                when: (answers) => answers.databaseQuestion === true,
            },
            {
                type: 'list',
                name: 'ORMQuestion',
                message: 'Would you like to use Object Relational Mapping (ORM)?',
                choices: [
                    { value: true, name: 'Yes' },
                    { value: false, name: 'No', disabled: true },
                ],
                when: (answers) => answers.databaseQuestion === true,
            },
        ],
    },
    {
        name: 'sqlORM',
        questions: [
            {
                type: 'list',
                name: 'sqlORM',
                message: 'Choose ORM you want to use for SQL database:',
                choices: [
                    { value: 'prisma' },
                    { value: 'sequelize' },
                    { value: 'typeorm' },
                ],
            },
        ],
        condition: (answers) =>
            answers.ORMQuestion === true && answers.database !== 'MongoDB',
    },
    {
        name: 'noSqlORM',
        questions: [
            {
                type: 'list',
                name: 'noSqlORM',
                message: 'Choose ORM you want to use for MongoDB:',
                choices: [
                    { value: 'mongoose' },
                    { name: 'prisma - coming soon', disabled: true },
                ],
            },
        ],
        condition: (answers) =>
            answers.ORMQuestion === true && answers.database === 'MongoDB',
    },
];


export const commandAnswer = async () => {
    const commandAns = {
        typescript: true,
        ESLint: true,
        database: 'MongoDB',
    };

    for (const questionSet of questionSets) {
        if (!questionSet.condition || questionSet.condition(commandAns)) {
            const answers = await inquirer.prompt(questionSet.questions);
            Object.assign(commandAns, answers);
        }
    }

    return commandAns;
};