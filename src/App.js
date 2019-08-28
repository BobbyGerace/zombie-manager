import React, { useReducer } from 'react';
import './App.css';
import {
    reducer,
    locations,
    actions,
    initialState,
    countZombiesByLocation,
} from './state.js';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>🧟 Zombie Manager</h1>
            </header>
            <ZombieManager />
        </div>
    );
}

function ZombieManager(props) {
    let [state, dispatch] = useReducer(reducer, initialState);

    let zombieRows = state.zombies
        .filter(z => z.location === state.location)
        .map(z => <Zombie zombie={z} dispatch={dispatch} key={z.id} location={state.location} />);

    return (
        <div className="zombie-manager">
            <TabBar dispatch={dispatch} location={state.location} zombies={state.zombies} />
            <NewZombieInput dispatch={dispatch} value={state.inputValue} />
            <div className="zombie-list">
                { zombieRows }
            </div>
        </div>
    );
}

function TabBar({ dispatch, location, zombies }) {
    const changeTab = id => dispatch(actions.changeTab(id));

    return (
        <div className="tab-bar">
            <Tab 
                name="🏠 Warehouse" 
                active={location === locations.warehouse} 
                onClick={() => changeTab(locations.warehouse)}
                count={countZombiesByLocation(zombies, locations.warehouse)}
            />
            <Tab 
                name="🏥 Hospital" 
                active={location === locations.hospital} 
                onClick={() => changeTab(locations.hospital)}
                count={countZombiesByLocation(zombies, locations.hospital)}
            />
            <Tab 
                name="🏫 School" 
                active={location === locations.school} 
                onClick={() => changeTab(locations.school)}
                count={countZombiesByLocation(zombies, locations.school)}
            />
        </div>
    );
}

function Tab({ name, onClick, active, count }) {
    const classes = 'tab' + (active ? ' active' : '');

    return (
        <a className={classes} onClick={onClick}>
            { `${name} (${count})` }
        </a>
    );
}

function NewZombieInput({ dispatch, value }) {
    const onChange = evt => {
        dispatch(actions.onInput(evt.target.value));
    };

    const onKeyDown = evt => {
        if (evt.keyCode === 13) {
            dispatch(actions.add());
        }
    };

    return (
        <div className="zombie-input">
            <input 
                placeholder="New Zombie Name" 
                value={value} 
                onChange={onChange} 
                onKeyDown={onKeyDown}
            />
        </div>
    );
}

function MoveButton({ location, move }) {
    const choices = [
        { value: locations.warehouse, label: 'Warehouse' },
        { value: locations.hospital, label: 'Hospital' },
        { value: locations.school, label: 'School' },
    ].filter(l => l.value !== location)
        .map(l => <a href="#" key={l.value} onClick={() => move(l.value)}>{l.label}</a>);

    return (
        <div className="dropdown">
          <button className="dropbtn btn">Move</button>
          <div className="dropdown-content">
               { choices }
          </div>
        </div> 
    );
}

function KillButton({ onClick }) {
    return (
        <button className="kill-button btn" onClick={onClick} >
            Kill
        </button>
    );
}

function Zombie({ zombie, dispatch, location }) {
    const kill = () => dispatch(actions.kill(zombie.id));
    const move = location => dispatch(actions.move(zombie.id, location));

    return (
        <div className="zombie-row">
            <span>{zombie.name}</span>
            <span>
                <MoveButton move={move} location={location} />
                <KillButton onClick={kill} />
            </span>
        </div>
    );
}

export default App;
