const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

let userInputArray = [];
let rowsArray = [];
let tableArray = [];

let numArray = [];

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
        console.log(userInputArray[i]);
    }

    console.log('userInputArray:');
    console.log(userInputArray);

    return userInputArray;
}

const renderTable = (props) => {
    console.log('renderTable clicked!');

    for (let i = 0; i < userInputArray.length; i++) {
        numArray = userInputArray[i].splice(1);
        rowsArray.push(
            <LetterRow letter={userInputArray[i][0]} arr={numArray} />
        );
    }
    console.log('rowsArray');
    console.log(rowsArray);
    return rowsArray;
};


const handleLetter = (e) => {
    e.preventDefault();
    helper.hideError();

    let parsedArray = parseToArrays();

    console.log('parsedArray');
    console.log(typeof parsedArray)
    console.log(parsedArray);
    console.log(parsedArray.length);

    if (parsedArray.length <= 1) {
        helper.handleError('Please paste in the table correctly!');
        return false;
    }

    helper.sendPost(e.target.action, parsedArray, renderTableFromServer);

    //return false;
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
                    <h2 className='font-bold font-display text-xl'>Letter Table</h2>
                    <p className='w-fit py-2'>Go to the <a href='https://www.nytimes.com/puzzles/spelling-bee' target='blank' className='underline'>NYT Spelling Bee</a> and click 'Hints'. Copy the clue table and paste it into the box.</p>
                </div>

                <textarea id='userInput' className='w-96 h-96 bg-pink-300' />

                <input id="submitSetupButton" className='rounded-md bg-amber-300 focus:border-amber-200 hover:bg-amber-500 min-w-fit w-32 px-3 py-2 mx-auto my-4 font-display font-bold' type="submit" form="inputForm" value='Setup Clues'
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
            <td> {letter} </td>
            {arr.map((num) => { return <td>{num}</td> })}
        </tr>
    );
};

const ClueTable = (props) => {
    if (props.letters.length === 0) {
        return (
            <>
                <div>Table is empty! </div>
            </>
        );
    }

    const tableRows = props.rows.map(row => {
        return (
            <LetterRow letter={row[0]} arr={row.splice(1)} />
        );
    });

    return (
        <div className="clueTable">
            {tableRows}
        </div>
    );

    // return (
    //     <>
    //         <table className="table-auto my-2" >
    //             <thead>
    //                 <tr>

    //                 </tr>
    //             </thead>
    //             <tbody>

    //             </tbody>
    //         </table>
    //     </>
    // );
};

const DomoList = (props) => {
    if (props.domos.length === 0) {
        return (
            <div className='domoList'>
                <h3 className="emptyDomo">No Domos Yet!</h3>
            </div>
        );
    }

    const domoNodes = props.domos.map(domo => {
        return (
            <div className="domo" key={domo._id}>
                <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
                <div>
                    <h3 className="domoName">Name: {domo.name}</h3>
                    <h3 className="domoAge">Age: {domo.age}</h3>
                    <h3 className="domoHobby">Hobby: {domo.hobby}</h3>
                </div>
                <button className="deleteDomo" onClick={() => deleteDomo(domo._id)}> Delete Domo </button>
            </div>
        );
    });

    return (
        <div className="domoList">
            {domoNodes}
        </div>
    );
};

const renderTableFromServer = async () => {
    const response = await fetch('/getLetters');
    const data = await response.json();
    console.log('data');
    console.log(data);
    ReactDOM.render(<ClueTable letters={data.letters} />, document.getElementById('tableSetup'));
};

const loadDomosFromServer = async () => {
    const response = await fetch('/getDomos');
    const data = await response.json();
    ReactDOM.render(<DomoList domos={data.domos} />, document.getElementById('domos'));
};



const init = () => {
    ReactDOM.render(<UserInput />, document.getElementById('userInputBox'));

    ReactDOM.render(<ClueTable rowsArray={[]} />, document.getElementById('tableSetup'));

    ReactDOM.render(<DomoList domos={[]} />, document.getElementById('domos'));

    renderTableFromServer();

    loadDomosFromServer();
};

window.onload = init;