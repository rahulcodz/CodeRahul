const { prompt } = require('enquirer');
const { Toggle } = require('enquirer');
const { Quiz } = require('enquirer');




export const render = async() => {
    const prompt = new Quiz({
        name: 'countries',
        message: 'How many countries are there in the world?',
        choices: ['165', '175', '185', '195', '205'],
        correctChoice: 3
      });
      
       prompt
        .run()
        .then((answer: { correct: any; correctAnswer: any; }) => {
          if (answer.correct) {
            console.log('Correct!');
          } else {
            console.log(`Wrong! Correct answer is ${answer.correctAnswer}`);
          }
        })
        .catch(console.error);
      
} 