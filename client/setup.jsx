const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

let letters_rows = 7;
let max_letters = 15;

const tableHead = () => {
    let tableHeadArray = [];
    for (let i = 4; i <= max_letters; i++) {
        tableHeadArray.push(
            <th className={`c${i}`}>{i}</th>
        );
    }
    return tableHeadArray;
};

const setupTableArray = () => {
    let tableArray = [];
    for (let i = 1; i <= letters_rows; i++) {
        tableArray.push(
            <tr id={`row${i}`}>
                <td>
                    <input type="text" id={`l${i}`} className={`w-8 h-8 bg-stone-100 rounded-sm`} />
                </td>
                {Array.from({ length: 12 }, (_, j) => (
                    <td>
                        <input type="number" id={`l${i}-${j + 4}`} className={`w-8 h-8 bg-stone-100 rounded-sm c${j + 4}`} />
                    </td>
                ))}
            </tr>
        );
    }
    return tableArray;
};

const tableFooter = () => {
    let tableFooterArray = [];
    for (let i = 4; i <= max_letters; i++) {
        tableFooterArray.push(
            <th className={`c${i} w-8 h-8`}></th>
        );
    }
    return tableFooterArray;
};

const handleLetter = (e) => {
    e.preventDefault();
    helper.hideError();

    const letter = e.target.querySelector('#letter').value;
    const len4 = e.target.querySelector('#len4').value;
    const len5 = e.target.querySelector('#len5').value;
    const len6 = e.target.querySelector('#len6').value;
    const len7 = e.target.querySelector('#len7').value;
    const len8 = e.target.querySelector('#len8').value;
    const len9 = e.target.querySelector('#len9').value;
    const len10 = e.target.querySelector('#len10').value;
    const len11 = e.target.querySelector('#len11').value;
    const len12 = e.target.querySelector('#len12').value;
    const len13 = e.target.querySelector('#len13').value;
    const len14 = e.target.querySelector('#len14').value;

    if (!letter) {
        helper.handleError('Letter is empty!');
        return false;
    }

    helper.sendPost(e.target.action, { letter, len4, len5, len6, len7, len8, len9, len10, len11, len12, len13, len14 }, loadDomosFromServer);

    return false;
};

const ClueTable = () => {
    return (
        // <form id='letterForm'
        //     name='letterForm'
        //     onSubmit={handleLetter}
        //     action='/maker'
        //     method='POST'
        //     className='m-4 bg-yellow-100 p-4 rounded-md flex flex-col'
        // >

        <>

            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="text-xs text-left">1st Letter</th>
                        {tableHead()}
                        <th className="font-bold">∑</th>
                    </tr>
                </thead>
                <tbody>
                    {setupTableArray()}

                </tbody>
                <tfoot>
                    <tr>
                        <td className="w-8 h-8">∑</td>
                        {tableFooter()}
                    </tr>
                </tfoot>
            </table>
            <button id="submitSetupButton" class="bg-amber-500 hover:bg-amber-300 text-black font-bold py-2 px-4 rounded"
                onClick={handleLetter}
                action='/setup'
                method='POST'>
                Submit Clues
            </button></>
    );
};

const LetterForm = (props) => {
    const lengths = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

    return (
        <form id='letterForm'
            name='letterForm'
            onSubmit={handleLetter}
            action='/maker'
            method='POST'
            className='m-4 bg-yellow-100 p-4 rounded-md flex flex-col'
        >
            <label htmlFor="letter">Central Letter: </label>
            <input id='letter' type="text" name='letter' className='w-6' />

            <label htmlFor="len4">4 Letter Words: </label>
            <input id='len4' type="number" name='len4' placeholder='#' className='w-6' />

            <label htmlFor="len5">5 Letter Words: </label>
            <input id='len5' type="number" name='len5' placeholder='#' className='w-6' />

            <label htmlFor="len6">6 Letter Words: </label>
            <input id='len6' type="number" name='len6' placeholder='#' className='w-6' />

            <label htmlFor="len7">7 Letter Words: </label>
            <input id='len7' type="number" name='len7' placeholder='#' className='w-6' />

            <label htmlFor="len8">8 Letter Words: </label>
            <input id='len8' type="number" name='len8' placeholder='#' className='w-6' />

            <label htmlFor="len9">9 Letter Words: </label>
            <input id='len9' type="number" name='len9' placeholder='#' className='w-6' />

            <label htmlFor="len10">10 Letter Words: </label>
            <input id='len10' type="number" name='len10' placeholder='#' className='w-6' />

            <label htmlFor="len11">11 Letter Words: </label>
            <input id='len11' type="number" name='len11' placeholder='#' className='w-6' />

            <label htmlFor="len12">12 Letter Words: </label>
            <input id='len12' type="number" name='len12' placeholder='#' className='w-6' />

            <label htmlFor="len13">13 Letter Words: </label>
            <input id='len13' type="number" name='len13' placeholder='#' className='w-6' />

            <label htmlFor="len14">14 Letter Words: </label>
            <input id='len14' type="number" name='len14' placeholder='#' className='w-6' />

            <label htmlFor="len15">15 Letter Words: </label>
            <input id='len15' type="number" name='len15' placeholder='#' className='w-6' />

            <input className='makeTableSubmit' type="submit" value='Make Table' />
        </form>
    );
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

const loadDomosFromServer = async () => {
    const response = await fetch('/getDomos');
    const data = await response.json();
    ReactDOM.render(<DomoList domos={data.domos} />, document.getElementById('domos'));
};

const init = () => {
    ReactDOM.render(<LetterForm />, document.getElementById('letterTable'));

    ReactDOM.render(<DomoList domos={[]} />, document.getElementById('domos'));

    loadDomosFromServer();
};

window.onload = init;