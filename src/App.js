import React, { useEffect, useState } from 'react';

import axios from 'axios';
import './App.sass';
import './App.css';
import logo from './search-24px.svg';


function App() {
  const [employee, setEmployess] = useState([]);
  const [survey, setSurvey] = useState([]);
  const [assignedSurvey, setAssignedSurvey] = useState([]);
  // const value,
  // const employee = [1, 2, 3, 4, 5, 6, 7, 8];
  const handleEmployee = (event) => {
    console.log(event.target.value);
  }
  useEffect(() => {
    axios.get('http://localhost:5000/employees')
      .then(res => {
        const { data } = res;
        const tempEmployee = data.map(d => d.id);
        setEmployess(tempEmployee)
      }).catch(err => console.log(err))
  }, []);
  const handleOptionChange = (e) => {
    axios.get(`http://localhost:5000/employee/${e.target.value}`)
      .then(res => {
        const { data } = res;
        setAssignedSurvey([]);
        setSurvey(data);
      }).catch(err => console.log(err))
  }
  const handleAddSurvey = (s) => {
    console.log(s);
    const tempSurvey = survey.filter(currentSurvey => currentSurvey.id !== s.id);
    setSurvey(tempSurvey);
    setAssignedSurvey([...assignedSurvey, s]);
  }
  const handleRemoveAssignedSurvey = (s) => {
    const tempSurvey = assignedSurvey.filter(currentSurvey => currentSurvey.id !== s.id);
    setAssignedSurvey(tempSurvey);
    setSurvey([...survey, s]);
  }
  return (
    <div className="App">
      <div className="mobileWrapper" >
        <header className="Mobile">
        </header>
        <div className="container is-fluid">
          <div className="notification">
            <strong>Select Employee</strong>
          </div>
        </div>

        <div className="select">
          <select onChange={handleEmployee} onChange={handleOptionChange}>
            <option value={null}>Select Employee</option>
            {
              employee.map(e => <option key={e.id} value={e}>Employee {e}</option>)
            }
          </select>
        </div>

        <div className='itemWrapper' >
          <div>
            <div>Survey Lists</div>

            <div>

              <a className="panel-block">
                <div className='zee'>
                  <div className='zee1'> Search</div>
                  <div>
                  <img src={logo} alt="Logo" /></div>
                </div>
              </a>
              <span />
              <>
                {
                  survey && survey.map(s => (

                    <a  key={s.id} className="panel-block space-between">
                      <h2 className="has-text-left">{s.surveys}</h2>
                      <button onClick={() => handleAddSurvey(s)} className="is-pulled-right"> <b>+</b>Add </button>
                    </a>
                  ))
                }
              </>
            </div>
          </div>

          <div>
            <div>Assigned Surveys</div>
            <div>
              <a className="panel-block">
              {/* <h2 className="has-text-left"> <i className="material-icons">Search</i></h2> */}
              <div className='zee'>
                  <div className='zee1'> Search</div>
                  <div>
                  <img src={logo} alt="Logo" /></div>
                </div>
              </a>
              <>
                {
                  assignedSurvey.map(s => (
                    <a key={s.id} className="panel-block space-between">
                      <h2 className="has-text-left">{s.surveys}</h2>
                      <div>
                        <button className="is-pulled-right"> <b>+</b> Add </button><br />
                        <button onClick={() => handleRemoveAssignedSurvey(s)} className="is-pulled-right"> <b>-</b> Remove </button>
                      </div>
                    </a>
                  ))
                }
              </>
            </div>
          </div>
      </div>
      </div>
      {/* <button className="button is-primary" name="data" type="button" onclick="getData(); return false">Done</button> */}
      <button className="button is-primary">Done</button>
    </div>
  );
}
export default App;
