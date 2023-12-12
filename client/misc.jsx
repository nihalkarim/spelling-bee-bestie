// const helper = require('./helper.js');
// const React = require('react');
// const ReactDOM = require('react-dom');

// let maxLetters = 7;
// let max_letters = 15;
// let tableArray = [];
// let userInputArray = [];
// numArray = [];

// const tableHead = () => {
//     let tableHeadArray = [];
//     for (let i = 4; i <= max_letters; i++) {
//         tableHeadArray.push(
//             <th className={`c${i}`}>{i}</th>
//         );
//     }
//     console.log('tableHeadArray');
//     console.log(tableHeadArray);
//     return tableHeadArray;
// };

// const setupTableArray = () => {
//     for (let i = 1; i <= maxLetters; i++) {
//         tableArray.push(
//             <tr id={`row${i}`}>
//                 <td>
//                     <input type="text" id={`l${i}`} className={`w-8 h-8 bg-stone-100 rounded-sm`} />
//                 </td>

//                 {Array.from({ length: 12 }, (_, j) => (
//                     <td>
//                         <input type="number" min='0' id={`l${i}-${j + 4}`} className={`w-8 h-8 bg-stone-100 rounded-sm c${j + 4}`} />
//                     </td>
//                 ))}
//             </tr>
//         );
//     }
//     console.log('tableArray');
//     console.log(tableArray);
//     return tableArray;
// };

// const twoLetterRender = () => {
//     let twoLetterArray = [];
//     for (let i = 1; i <= maxLetters; i++) {
//         twoLetterArray.push(
//             <div id={`letter${i}`} >
//                 <h3 className='font-semibold'>Letter {i}</h3>

//                 <div className='flex flex-row gap-2'>
//                     {Array.from({ length: 4 }, (_, j) => (
//                         <span id={`letter${i}-gr${j + 1}`} >
//                             <input type="text" className="w-8 h-8 bg-stone-100 rounded-sm" />
//                             -
//                             <input type="number" className="w-8 h-8 bg-stone-100 rounded-sm pl-2" placeholder='#' min='0' />
//                         </span>

//                     ))}
//                 </div>
//             </div>
//         );
//     }
//     console.log('twoLetterArray');
//     console.log(twoLetterArray);
//     return twoLetterArray;
// }

// const populateTableToDb = (e) => {
//     e.preventDefault();
//     helper.hideError();

//     console.log('populateTableToDb func');

// };

// const parseToArrays = () => {
//     let userInput = document.querySelector('#userInput').value;
//     userInputArray = userInput.split('\n');
//     console.log('userInputArray:');
//     console.log(userInputArray);

//     userInputArray = userInputArray.splice(0, userInputArray.indexOf('Two letter list:'));

//     for (let i = 0; i < userInputArray.length; i++) {
//         userInputArray[i] = userInputArray[i].split('\t');
//         // userInputArray[i] = userInputArray[i].split(' ');
//         //console.log(userInputArray[i]);
//     }

//     renderTable(userInputArray);
//     //return userInputArray;
// }

// const renderTable = (userInputArray) => {
//     console.log('renderTable clicked!');
//     let rowsArray = [];
//     for (let i = 0; i < userInputArray.length; i++) {
//         numArray = userInputArray[i].splice(1);
//         rowsArray.push(
//             <LetterRow letter={userInputArray[i][0]} arr={numArray} />
//         );
//     }
//     console.log('rowsArray');
//     console.log(rowsArray);
//     return rowsArray;

//     // console.log('clicked!')
//     // userInputArray.forEach(arr => {
//     //     console.log(arr);
//     //     arr.map((item) => {
//     //         // console.log(item);
//     //         return <td>{item}</td>
//     //     });
//     // });
//     // return userInputArray;
// };


// const handleLetter = (e) => {
//     e.preventDefault();
//     helper.hideError();

//     // if (!letter) {
//     //     helper.handleError('Letter is empty!');
//     //     return false;
//     // }

//     // helper.sendPost(e.target.action, { tableArray }, loadDomosFromServer);
//     helper.sendPost(e.target.action, tableArray);

//     return false;
// };

// const ClueTable = () => {
//     return (
//         <>
//             <div>
//                 <h2 className='font-bold font-display text-xl'>Letter Table</h2>
//                 <p className='w-fit py-2'>Enter each letter and the number of words that start with each letter and are of each length.</p>

//                 <p className='w-fit py-2'>For example, if there are 3 words that start with "a" and are 4 letters long, enter "3" in the box at
//                     the intersection of "a" and "4".</p>
//             </div>
//             <table className="table-auto my-2">
//                 <thead>
//                     <tr>
//                         <th className="text-xs text-left pr-2">Letter</th>
//                         {tableHead()}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {/* {setupTableArray()} */}
//                     {userInputArray.map((arr) => {
//                         arr.map((item) => {
//                             // console.log(item);
//                             return <td>{item}</td>
//                         });
//                     })}
//                     {renderTable(userInputArray)}
//                 </tbody>
//             </table>

//             <textarea className='w-96 h-96 bg-pink-300' id='userInput' />
//             <button onClick={parseToArrays}>parse response</button>

//         </>
//     );
// };

// const LetterRow = (props) => {
//     const [letter, setLetter] = React.useState(props.letter);

//     const [arr, setArr] = React.useState(props.arr);

//     return (
//         <tr>
//             <td> {letter} </td>
//             {arr.map((num) => { return <td>{num}</td> })}
//         </tr>
//     );
// };

// const LetterList = (props) => {
//     return (
//         <>
//             <div>
//                 <h2 className='font-bold font-display text-xl'>Two Letter Word List</h2>
//                 <p className='w-fit py-2'> Hints for the amount of words that start with the 2 letters.</p>

//                 <p className='w-fit py-2'>For example, if 4 words start with the letters Th, you'd put TH-4.</p>
//             </div>
//             <div className='grid grid-cols-2 grid-rows-4 gap-y-3 grid-flow-col'>
//                 {twoLetterRender()}
//             </div>
//         </>
//     );
// };

// const SubmitButton = (props) => {
//     return (
//         <button id="submitSetupButton" className='rounded-md bg-amber-300 focus:border-amber-200 hover:bg-amber-500 min-w-fit w-32 px-3 py-2 mx-auto my-4 font-display font-bold'
//             onClick={handleLetter}
//             action='/letter'
//             method='POST'>
//             Submit Clues
//         </button>
//     );

// };

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

// const loadDomosFromServer = async () => {
//     const response = await fetch('/getDomos');
//     const data = await response.json();
//     ReactDOM.render(<DomoList domos={data.domos} />, document.getElementById('domos'));
// };

// const init = () => {
//     ReactDOM.render(<ClueTable />, document.getElementById('tableSetup'));

//     // ReactDOM.render(<LetterList />, document.getElementById('twoLetterListSetup'));

//     ReactDOM.render(<SubmitButton />, document.getElementById('submitSetup'));

//     ReactDOM.render(<DomoList domos={[]} />, document.getElementById('domos'));

//     loadDomosFromServer();
// };

// window.onload = init;