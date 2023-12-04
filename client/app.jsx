const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

let letters_rows = 7;
let max_letters = 15;

/** Generates the table head numbers 
 *  @returns {Array} Array of table head numbers
*/
const tableHead = () => {
    let tableHeadArray = [];
    for (let i = 4; i <= max_letters; i++) {
        tableHeadArray.push(
            <th className={`c${i}`}>{i}</th>
        );
    }
    return tableHeadArray;
};

/** Generates the table
 * 
 * @returns {Array} Array of table rows
 */
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
                        <input type="number" min='0' id={`l${i}-${j + 4}`} className={`w-8 h-8 bg-stone-100 rounded-sm c${j + 4}`} />
                    </td>
                ))}
            </tr>
        );
    }
    return tableArray;
};

/** Generates the table footer
 * 
 * @returns {Array} Array of table footers
 */
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

    // const name = e.target.querySelector('#domoName').value;
    // const age = e.target.querySelector('#domoAge').value;
    // const hobby = e.target.querySelector('#domoHobby').value;

    // if (!name || !age || !hobby) {
    //     helper.handleError('All fields are required!');
    //     return false;
    // }
};

const DomoForm = (props) => {
    return (
        <form id='domoForm'
            name='domoForm'
            onSubmit={handleLetter}
            action='/maker'
            method='POST'
            className='domoForm'
        >
            <label htmlFor="name">Name: </label>
            <input id='domoName' type="text" name='name' placeholder='Domo Name' />

            <label htmlFor="age">Age: </label>
            <input id='domoAge' type="number" name='age' min='0' />

            <label htmlFor="hobby">Hobby: </label>
            <input id='domoHobby' type="text" name='hobby' placeholder='Favourite hobby' />

            <input className='makeDomoSubmit' type="submit" value='Make Domo' />
        </form>
    );
};

const LetterForm = (props) => {
    return (

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
    );
};



// const DomoList = (props) => {
//     if (props.domos.length === 0) {
//         return (
//             <div className='domoList'>
//                 <h3 className="emptyDomo">No Domos Yet!</h3>
//             </div>
//         );
//     }

//     const domoNodes = props.domos.map(domo => {
//         return (
//             <div className="domo" key={domo._id}>
//                 <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
//                 <div>
//                     <h3 className="domoName">Name: {domo.name}</h3>
//                     <h3 className="domoAge">Age: {domo.age}</h3>
//                     <h3 className="domoHobby">Hobby: {domo.hobby}</h3>
//                 </div>
//                 <button className="deleteDomo" onClick={() => deleteDomo(domo._id)}> Delete Domo </button>
//             </div>
//         );
//     });

//     return (
//         <div className="domoList">
//             {domoNodes}
//         </div>
//     );
// };

const loadDomosFromServer = async () => {
    const response = await fetch('/getDomos');
    const data = await response.json();
    ReactDOM.render(<DomoList domos={data.domos} />, document.getElementById('domos'));
};

const init = () => {
    ReactDOM.render(<LetterForm />, document.getElementById('letterTable'));

    // ReactDOM.render(<DomoList domos={[]} />, document.getElementById('domos'));

    // loadDomosFromServer();
};

window.onload = init;