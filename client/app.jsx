const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

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

const deleteDomo = async (domoId) => {
    const response = await fetch('/deleteDomo', {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ domoId }),
    });

    if (response.status === 200) {
        loadDomosFromServer()
    }
}

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