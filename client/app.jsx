const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

let userInputArray = [];

const parseToArrays = () => {
    let userInput = document.querySelector('#userInput').value;
    userInput = userInput.trim();
    userInputArray = userInput.split('\n');

    //if they copy all the clues, remove the two letter list lines from the array
    if (userInputArray.includes('Two letter list:')) {
        userInputArray = userInputArray.splice(0, userInputArray.indexOf('Two letter list:'));
    }

    for (let i = 0; i < userInputArray.length; i++) {
        userInputArray[i] = userInputArray[i].split('\t');
        userInputArray[i].push('\n');
    }

    userInputArray[0].unshift('');

    console.log('userInputArray:');
    console.log(userInputArray);

    return userInputArray;
}

const handleLetter = (e) => {
    e.preventDefault();
    helper.hideError();

    let parsedArray = parseToArrays();

    console.log('parsedArray');
    console.log(parsedArray);

    if (parsedArray.length <= 1) {
        helper.handleError('Please paste in the table correctly!');
        return false;
    }

    helper.sendPost(e.target.action, parsedArray, renderTableFromServer);
};

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

const ClueTable = (props) => {
    console.log('props');
    console.log(props);

    console.log('props.letters');
    console.log(props.letters);

    console.log('props.letters length');
    console.log(props.letters.length);

    let letterStr;
    let letterStrArr;
    let firstRow;
    let tableRows;

    // if (props.letters.length == 0) {
    //     return (
    //         <>
    //             <h2 className='font-bold font-display text-xl mb-4'>Clue Table:</h2>
    //             <div>Table is empty! </div>
    //         </>
    //     );
    // }

    letterStr = props.letters[0].letter;

    letterStrArr = letterStr.split('\n');

    for (let i = 0; i < letterStrArr.length; i++) {
        letterStrArr[i] = letterStrArr[i].split(',');
        letterStrArr[i].pop();
    }

    for (let i = 1; i < letterStrArr.length; i++) {
        letterStrArr[i].shift();
    }

    firstRow = letterStrArr[0];
    tableRows = letterStrArr.splice(1)

    const tableDisplayRows = tableRows.map(arr => {
        return (
            <LetterRow letter={arr[0]} arr={arr.splice(1)} />
        );
    });

    return (
        <div className="clueTable">
            <h2 className='font-bold font-display text-xl mb-4'>Clue Table:</h2>
            <tr>
                {firstRow.map((num) => { return <td className='border rounded-md bg-stone-200 p-1 m-2 w-8 h-6 font-display font-semibold'>{num}</td> })}
            </tr>
            {/* <LetterRow letter={firstRow[0]} arr={firstRow.splice(1)} /> */}
            {tableDisplayRows}
        </div>
    );


};


const WordInput = () => {
    return (
        <>
            <label className='font-bold font-display text-xl' htmlFor="wordInput">Enter Word:</label>
            <input id="wordInput" type="text" name="wordInput" placeholder="Enter your word here"
                className='appearance-none p-2 border border-gray-200 rounded-lg w-full my-1' />
            {/* <i class="fa-solid fa-arrow-right"></i> */}
        </>
    )
}

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
        <div className="">
            <ol>
                {wordNodes}
            </ol>
        </div>
    );
}

const AdSpace = () => {
    return (
        <h3 className='font-semibold text-lg p-4'>Check out Recipe Keeper</h3>
    );
}

const renderTableFromServer = async () => {
    console.log('renderTableFromServer going!')
    const response = await fetch('/getLetters');
    const data = await response.json();
    console.log('data returned to renderTableFromServer:');
    console.log(data);
    ReactDOM.render(<ClueTable letters={data} />, document.getElementById('letterTable'));
};

const init = () => {
    ReactDOM.render(<UserInput />, document.getElementById('userInputBox'));

    ReactDOM.render(<WordInput />, document.getElementById('wordInputArea'));

    ReactDOM.render(<WordsList words={[]} />, document.getElementById('words'));

    ReactDOM.render(<AdSpace />, document.getElementById('adDiv'));

    ReactDOM.render(<ClueTable letters={[]} />, document.getElementById('letterTable'));

    ReactDOM.render(<DomoList domos={[]} />, document.getElementById('domos'));



    renderTableFromServer();

    loadDomosFromServer();
};

window.onload = init;