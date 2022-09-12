import React, {useEffect, useState} from 'react';
import './App.css';
import '../../vendor/normalize.css';
import MainTable from "../MainTable/MainTable";
import {inflate} from "zlib";
import {isArray} from "util";
import SearchForm from "../SearchForm/SearchForm";

interface DataType {
  key: React.Key;
  id: number;
  Fullname: string;
  Days: DaysType,
  Monthly: number
}

interface DaysType {
  [N: string]: number,
}

interface ResTypes {
  user: DaysType;
  Fullname: string;
  id: number;
  Days: ResDayType[] | DaysType;
  key?: number;
  Monthly?: number;
}

interface ResDayType {
  Date: string;
  End: string;
  Start: string;
}


function App() {

  const [usersData, setUsersData] = useState<DataType[] | []>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  function getUsersData() {
    return fetch('http://localhost:8080/api/users')
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

  function getMonthLength(date: string) {
    const [year, month] = date.split('-');
    return new Date(Number(year), Number(month), 0).getDate()
  }

  function makeDataRefactor(data: ResTypes[], numberOfDays: number) {
    const dataCopy = JSON.parse(JSON.stringify(data));
    dataCopy.forEach((user: ResTypes) => {
      const daysObj: DaysType = {};
      let dayIndex = 1;
      user.key = user.id; // needed for Ant table
      if (Array.isArray(user.Days)) {
        user.Days.forEach((day: ResDayType) => {
          const [year, month, mDay] = day.Date.split('-').map(Number);
          const [sHours, sMinutes] = day.Start.split('-').map(Number);
          const [eHours, eMinutes] = day.End.split('-').map(Number);
          const startDate = new Date(year, month, mDay, sHours, sMinutes);
          const endDate = new Date(year, month, mDay, eHours, eMinutes);
          daysObj[mDay] = (endDate.getTime() - startDate.getTime()) / 1000;
          while (!daysObj[dayIndex] && (dayIndex <= numberOfDays)) {
            daysObj[dayIndex] = 0;
            dayIndex++;
          }
          dayIndex++;
        })
        if (!daysObj[numberOfDays]) daysObj[numberOfDays] = 0;
        user.Days = daysObj;
        user.Monthly = Object.values(user.Days).reduce((sum: number, day:number) => sum + day, 0);
      }

    })
    setUsersData(dataCopy);
  }

  function filterUsers(query: string) {
    const clonedArray = Object.assign([], usersData);
    // @ts-ignore
    return clonedArray.filter(user => user.Fullname.toLowerCase().includes(query.toLowerCase()))
  }

  useEffect( () => {
    getUsersData()
      .then((data: ResTypes[]) => {
        let monthLength = 30;
        if (Array.isArray(data[0].Days)) monthLength = getMonthLength(data[0].Days[0].Date);
        makeDataRefactor(data, monthLength);
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="App">
      <header className="header">
        <h1>Robopractice test task</h1>
        <SearchForm handleSubmit={setSearchQuery}/>
        <MainTable usersData={filterUsers(searchQuery)}/>
      </header>
    </div>
  );
}

export default App;
