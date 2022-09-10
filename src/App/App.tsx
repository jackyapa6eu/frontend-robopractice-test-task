import React, {useEffect} from 'react';
import './App.css';
import '../vendor/normalize.css';

function App() {

  function getUsersData() {
    return fetch('http://localhost:8080/api/users')
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

  useEffect( () => {
    getUsersData()
      .then((data) => {
        console.log(data);
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="App">
      <header className="header">
        <h1>Robopractice test task</h1>
      </header>
    </div>
  );
}

export default App;
