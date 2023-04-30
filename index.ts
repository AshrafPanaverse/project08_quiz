#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';

console.log(chalk.hex('#cd853f')('Welcome to the Quiz '));

let takeQuiz = async () => {
  let username = await inquirer.prompt([{
    name: 'name',
    message: "What's your Name:"
  }])

  console.log('\n\n\n')
  console.log(chalk.bgWhite.black('Hello ' + username.name + ", Let's Play the Quiz!!"));

  console.log(chalk.green.bold('Rules & Instructions: '));
  console.log(chalk.green('1.', username.name + ', There are 10 Questions and all are Compulsory.'));
  console.log(chalk.green('2. You will get 1 points on each Right Answer.'));
  console.log(chalk.green('3. 0.5 Point will be deducted if the Answer is Wrong.'));
  console.log(chalk.green('4. In MCQ based questions you have to type the Serial Number / Index Value.'));

  console.log('----------------------------------------------------------------------------')

  let score = 0;

  const mcqList = [
    {
      array: ['10 March', '6 March', '5 March', '8 March'],
      question: 'International Women’s Day is celebrated each year on_____________?',
      answer: '8 March'
    },
    {
      array: ['Ampere', 'Coulomb', 'Ohm', 'Volt'],
      question: 'The SI unit of charge is __________?',
      answer: 'Coulomb'
    },
    {
      array: ['Night blindness', 'rickets', 'scurvy', 'hair fall'],
      question: 'Deficiency of Vitamin-A results in __________?',
      answer: 'Night blindness'
    },
    {
      array: ['Star', 'Planet', 'Asteroid', 'Meteor'],
      question: 'The Sun is a __________?',
      answer: 'Star'
    },
    {
      array: ['night blindness', 'rickets', 'scurvy', 'hair fall'],
      question: 'Deficiency of Vitamin-D results in __________?',
      answer: 'rickets'
    },
    {
      array: ['convex lens', 'concave lens', 'condenser lens', 'none of these'],
      question: 'A camera uses a __________ to form an image.',
      answer: 'convex lens'
    },
    {
      array: ['Transverse', 'Electromagnetic', 'Longitudinal', 'none of these'],
      question: 'Sound waves are _________ waves.',
      answer: 'Longitudinal'
    },
    {
      array: ['plasma', 'platelets', 'blood cells', 'none of these'],
      question: 'The fluid part of blood is known as __________?',
      answer: 'plasma'
    },
    {
      array: ['Salt', 'Chlorine', 'Water', 'none of these'],
      question: 'During winter in cold countries, the __________ is mixed to melt the ice on the icy roads.',
      answer: 'Salt'
    },
    {
      array: ['Venus', 'Mercury', 'Mars', 'Moon'],
      question: 'The nearest planet to the Earth is _________?',
      answer: 'Venus'
    },
  ];

  async function quizMcq(listOfAnswers: string[], question: string, answer: string) {

    let userAnswer = await inquirer.prompt([{
      name: 'answer',
      type: 'list',
      choices: listOfAnswers,
      message: question
    }])

    console.log('\n');
    if (userAnswer.answer == answer) {
      console.log('You are Right.');
      score = score + 1;
    } else {
      console.log('You are Wrong.');
      console.log('The Correct Answer is: ', answer);
      score = score - 0.5;
    }

    if (score < 0) {
      score = 0;
    }
    console.log('Score is: ', score);
  }

  for (var i = 0; i < mcqList.length; i++) {
    console.log(`\n Question# (${i+1}/${mcqList.length})`);
    await quizMcq(mcqList[i].array, mcqList[i].question, mcqList[i].answer);
    console.log('*******************************');
  }


  console.log('\n');
  let totalMarks = mcqList.length;
  if ((score / totalMarks) * 100 < 33) {
    console.log('Oyee! ye kia kardia tune,', username.name, 'You are failed, shame on you!. Total Score: ', score);

  } else {
    console.log('Congratulations,', username.name, 'You are passed. Total Score: ', score);

  }

  // ask user if he/she wants to repeat   
  let operation = await inquirer.prompt([
    {
      name: 'repeat',
      type: 'list',
      choices: ["Take Quiz Again", chalk.red('Exit')],
      message: chalk.hex('#FFA500').bold(`\n\n`)
    },
  ]);

  if (operation.repeat == 'Take Quiz Again') {
    console.log('\n\n\n\n\n')
    takeQuiz();
  } else {
    //do nothing i.e: exits
  }
}

await takeQuiz();
