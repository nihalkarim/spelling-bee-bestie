const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

let userInputArray = [];
let dbTableArray = [];
let letterStrArr;
let firstRow;
let tableRows;


/**
 * Parses the user input to an array of arrays containing rows
 * @returns userInputArray = an array of arrays 
 */
const parseToArrays = () => {
    //get the value from the textarea, trim it, and create an array by splitting by new line
    let userInput = document.querySelector('#userInput').value;
    userInput = userInput.trim();
    userInputArray = userInput.split('\n');

    //if they copy all the clues, remove the two letter list lines from the array
    if (userInputArray.includes('Two letter list:')) {
        userInputArray = userInputArray.splice(0, userInputArray.indexOf('Two letter list:'));
    }

    //remove the tabs from the array
    //also push a new line char at the end
    //Mongoose will flatten this data, so adding the \n makes it easier to parse it later
    for (let i = 0; i < userInputArray.length; i++) {
        userInputArray[i] = userInputArray[i].split('\t');
        userInputArray[i].push('\n');
    }

    //the first row (the numbers) gets the space trimmed from the fornt, so it's a char shorter than the other rows
    //adding a space to make arrays evenly sized
    userInputArray[0].unshift('');

    return userInputArray;
}

/**
 * Posts the data and calls the url given by the UserInput form. Also renders the Clue Table
 * @param {*} e 
 * @returns 
 */
const handleLetter = (e) => {
    e.preventDefault();
    helper.hideError();

    let parsedArray = parseToArrays();

    //make sure the input isn't empty.
    //If it's empty the length will be 1 bc it will be an array w an empty string
    if (parsedArray.length <= 1) {
        helper.handleError('Please paste in the table correctly!');
        return false;
    }

    helper.sendPost(e.target.action, parsedArray, renderTableFromServer);
};

/**
 * Posts the data and calls the url given by the WordInput form. Also renders the word list. 
 * The function also calls checkWord() to check if it matches the data in the table
 * @param {*} e 
 * @returns 
 */
const handleWord = (e) => {
    e.preventDefault();
    helper.hideError();

    let word = document.querySelector('#wordInput').value.trim();
    document.querySelector('#wordInput').value = '';

    checkWord(word);

    if (word.length < 1) {
        helper.handleError('Please enter a word!');
        return false;
    }

    helper.sendPost(e.target.action, { word }, renderWordsFromServer);
}

/**
 * Parses the db result, sets the variables to be rendered by the CLue Table
 * @param {*} letters = data passed in from db
 * @returns tableRows = rows with the dynamic data (letters + nums)
 */
const formatTable = (letters) => {
    let letterStr;

    letterStr = letters; //string passed as aresult from the db
    letterStrArr = letterStr.split('\n'); //parse string back to array

    //split at the commas. an empty string gets added to the end, so pop it off
    for (let i = 0; i < letterStrArr.length; i++) {
        letterStrArr[i] = letterStrArr[i].split(',');
        letterStrArr[i].pop();
    }

    //an empty str also gets added at the beginning starting at index 1, so remove that too
    for (let i = 1; i < letterStrArr.length; i++) {
        letterStrArr[i].shift();
    }

    //first row is just the numbers
    firstRow = letterStrArr[0];

    tableRows = [];
    for (let i = 1; i < letterStrArr.length; i++) {
        tableRows[i - 1] = letterStrArr[i];
    }

    return tableRows;
}

/**
 * Checks if the word matches the table data and rerenders the table to change the needed values
 * When a word matches, 4 values need to be changed:
 * - In the letter row: the word length col and the total
 * - The total words left in the length col
 * - The total words left
 * 
 * IMPORTANT --> CHECK CONSOLE --> having trouble making the table re-render but the updated table gets printed in the console
 * @param {*} word = word to be checked
 */
const checkWord = (word) => {
    //gets word length and 1st char
    let wordLength = word.length;
    let letter = word.charAt(0).toUpperCase();

    //gets lengths of array and sub array
    let letterStrArrLen = letterStrArr.length;
    let rowLen = letterStrArr[0].length - 1;

    for (let i = 0; i < letterStrArr.length; i++) {
        let rowLetter = letterStrArr[i][0].charAt(0);
        if (rowLetter == letter) {
            //grab index from the header row

            let index = -1;

            for (let j = 0; j < rowLen; j++) {
                if (letterStrArr[0][j] == wordLength) {
                    index = j;
                }
            }

            //now search for the index
            if (index !== -1) {
                //subtract from the index of the word length
                // console.log('letterStrArr[i][index]: ', letterStrArr[i][index]);
                // console.log('letterStrArr[i][index] -= 1: ', letterStrArr[i][index] -= 1);
                letterStrArr[i][index] -= 1;
                //subtract from the sigma of this row
                // console.log('letterStrArr[i][rowLen]: ', letterStrArr[i][rowLen]);
                // console.log('letterStrArr[i][rowLen] -= 1: ', letterStrArr[i][rowLen] -= 1);
                letterStrArr[i][rowLen] -= 1;

                //subtract from the sigma row of this index and the full total
                // console.log('letterStrArr[letterStrArrLen - 1][index]: ', letterStrArr[letterStrArrLen - 1][index]);
                // console.log('letterStrArr[letterStrArrLen - 1][index] -= 1: ', letterStrArr[letterStrArrLen - 1][index] -= 1);
                letterStrArr[letterStrArrLen - 1][index] -= 1;

                // console.log('letterStrArr[letterStrArrLen - 1][rowLen]: ', letterStrArr[letterStrArrLen - 1][rowLen]);
                // console.log('letterStrArr[letterStrArrLen - 1][rowLen] -= 1: ', letterStrArr[letterStrArrLen - 1][rowLen] -= 1);
                letterStrArr[letterStrArrLen - 1][rowLen] -= 1;
            }
        }
    }

    for (let i = 1; i < letterStrArr.length; i++) {
        tableRows[i - 1] = letterStrArr[i];
    }

    console.log('letterStrArr', letterStrArr);
    console.log('tableRows', tableRows);
    ReactDOM.render(<ClueTable letters={tableRows} />, document.getElementById('letterTable'));
}

/**
 * Renders the user input area for the clues to sert up the table
 * @param {*} props 
 * @returns 
 */
const UserInput = (props) => {
    return (
        <>
            <form id='inputForm'
                action='/letter'
                method='POST'
                onSubmit={handleLetter}
            >
                <div>
                    <h2 className='font-bold font-display text-xl'>Set Up The Letter Table:</h2>
                    <p className='w-fit py-2'>Go to the <a href='https://www.nytimes.com/puzzles/spelling-bee' target='blank' className='underline'>NYT Spelling Bee</a> and click 'Hints'. Copy the clue table and paste it into the box.</p>
                </div>

                <textarea id='userInput' className='w-full h-60 border-2 border-yellow-500 rounded-md p-3' />

                <input id="submitSetupButton" className='rounded-md bg-amber-300 focus:border-amber-200 hover:bg-amber-500 min-w-fit w-28 px-2 py-1 mx-auto my-4 font-display font-semibold' type="submit" form="inputForm" value='Setup Clues'
                />
            </form>

        </>
    );
};

/**
 * Rows to be rendered by the clue table
 * @param {*} props 
 * @returns 
 */
const LetterRow = (props) => {
    const [letter, setLetter] = React.useState(props.letter);

    const [arr, setArr] = React.useState(props.arr);

    return (
        <tr>
            <td className='border rounded-md bg-stone-200 p-1 mx-2 w-8 h-6 font-display font-semibold'> {letter} </td>
            {arr.map((num) => { return <td className='border rounded-md bg-stone-200 p-1 mx-2 w-8 h-6 font-display'>{num}</td> })}
        </tr>
    );
};

const TableHead = () => {
    return (
        <tr>
            {firstRow.map((num) => { return <td className='border rounded-md bg-stone-200 p-1 m-2 w-8 h-6 font-display font-semibold'>{num}</td> })}
        </tr>
    );

}

const TableBody = (props) => {
    props = tableRows;
    const tableDisplayRows = props.map(arr => {
        return (
            <LetterRow letter={arr[0]} arr={arr.slice(1)} />
        );
    });

    return (
        <>
            {tableDisplayRows}
        </>
    )
}

/**
 * Renders the clue table, which is supposed to change when a valid word gets entered
 * @param {*} props 
 * @returns 
 */
const ClueTable = (props) => {
    const [num, setNum] = React.useState();

    // if (props.letters.length == 0) {
    //     return (
    //         <>
    //             <h2 className='font-bold font-display text-xl mb-4'>Clue Table:</h2>
    //             <div>Table is empty! </div>
    //         </>
    //     );
    // }

    return (
        <div className="clueTable">
            <h2 className='font-bold font-display text-xl mb-4'>Clue Table:</h2>
            <TableHead />
            <TableBody />
            {/* {tableDisplayRows} */}
        </div>
    );
};

/**
 * Renders the user input area for the word  
 * @returns 
 */
const WordInput = () => {
    return (
        <>
            <form action="/word"
                id='wordForm'
                method='POST'
                onSubmit={handleWord}>
                <label className='font-bold font-display text-xl' htmlFor="wordInput">Enter Word:</label>
                <div className='flex flex-row gap-2'>
                    <input id="wordInput" type="text" name="word" placeholder="Enter your word here"
                        className='appearance-none p-2 border border-gray-200 rounded-lg w-11/12 my-1' />
                    <input type="submit"
                        form='wordForm'
                        value="^"
                        className='w-10 h-10 border border-transparent rounded-full bg-yellow-300 pt-1 my-2 text-xl font-bold' />

                </div>

            </form>
        </>
    )
}

/**
 * Displays the words in an ordered list
 * @param {*} props 
 * @returns 
 */
const WordsList = (props) => {
    if (props.words.length === 0) {
        return (
            <div className=''>
                <h3 className=''>No Words Entered Yet!</h3>
            </div>
        );
    }

    const wordNodes = props.words.map(word => {
        return (
            <li className="" key={word._id}>
                {word}
            </li>
        );
    });

    return (
        <div className='font-display px-8 py-4 '>
            <ol className="w-10/12 list-decimal grid grid-cols-3 grid-flow-row gap-2">
                {wordNodes}
            </ol>
        </div>
    );
}

/**
 * Profit model: the site is free but there is an ad. This component renders the app
 * @returns 
 */
const AdSpace = () => {
    return (
        <h3 className='font-semibold text-lg p-4'>Check out Recipe Keeper</h3>
    );
}

/**
 * renders the words in the list from the db
 */
const renderWordsFromServer = async () => {
    const response = await fetch('/getWords');
    const data = await response.json();
    ReactDOM.render(<WordsList words={data} />, document.getElementById('words'));
};

/**
 * renders the table w info from the db
 */
const renderTableFromServer = async () => {
    const response = await fetch('/getLetters');
    let data = await response.json();
    data = data[0].letter;

    dbTableArray = data;
    let formatted = formatTable(dbTableArray);

    ReactDOM.render(<ClueTable letters={formatted} />, document.getElementById('letterTable'));
};

const init = () => {
    ReactDOM.render(<UserInput />, document.getElementById('userInputBox'));

    ReactDOM.render(<WordInput />, document.getElementById('wordInputArea'));

    ReactDOM.render(<WordsList words={[]} />, document.getElementById('words'));

    ReactDOM.render(<AdSpace />, document.getElementById('adDiv'));

    ReactDOM.render(<ClueTable letters={[]} />, document.getElementById('letterTable'));
};

window.onload = init;