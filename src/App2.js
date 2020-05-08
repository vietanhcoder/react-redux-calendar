import React, { useState } from 'react';
import moment from 'moment';

function App() {
  const [dateObject, setDateObject] = useState(moment());
  const [allmonths] = useState(moment.months());

  const weekdayshort = moment.weekdaysShort();
  const firstDay = moment(dateObject).startOf("month").format('d');
  const getCurrentDay = Number(dateObject.format('D'));
  const getMonth = dateObject.format("MMM")

  // blank area
  const blanks = [];
  for (let i = 0; i < firstDay; i++) {
    const key = `blank-${i}`;
    blanks.push(<td key={key} className="calendar-day empty"/>)
  }
  // days in month
  const daysInMonth = [];
  for (let d = 1; d <= dateObject.daysInMonth(); d++) {
    const currentDay = d === getCurrentDay ? "today" : '';
    daysInMonth.push(
      <td key={d} className={`calendar-day ${currentDay}`}>{d}</td>
    )
  }
  // render calendar structure of a week
  const totalSlots = [...blanks, ...daysInMonth];
  let rows = [];
  let cells = [];

  totalSlots.forEach((row, idx) => {
    if (idx % 7 !== 0) {
      cells.push(row) // if index not equal 7 that means not go to next week
    } else {
      rows.push(cells) // when reach next week we contain all td in last week to rows 
      cells = []; //empty container
      cells.push(row) // in current loop we still push current row to new container
    }
    if (idx === totalSlots.length -1) {
      // when end loop we add remain date
      rows.push(cells)
    }
  })

  const renderDaysInMonth = rows.map((d, idx) => {
    return <tr key={idx}>{d}</tr>;
  });


  const selectedMonth = month => () => {
    const monthNo = allmonths.indexOf(month); // get month number 
    let newObj = {...dateObject};
    newObj = moment(dateObject).set("month", monthNo); // change month value
    setDateObject(newObj)
    console.log(newObj)
  }


  const renderMonthsList = () => {
    const months = [];
    let rows = [];
    let cells = [];

    allmonths.map(data => {
      months.push(<td key={data} onClick={selectedMonth(data)}><span>{data}</span></td>)
    })

    months.forEach((row, idx) => {
      if (idx % 3 !== 0 || idx === 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    })
    rows.push(cells); // add last row

    return rows.map((d, idx) => {
      return <tr key={d}>{d}</tr>
    });
  }

  return (
    <div className="App">
     <h1>Pure Calendar by reactjs</h1>
     <div className="tail-datetime-calendar">
        <div className="calendar-navi">
          <span data-tail-navi="switch" className="calendar-label">
            {getMonth}
          </span>    
        </div>
      <div className="calendar-date">
        <table className="calendar-month">
          <thead>
            <tr>
              <th colSpan="4">Select a Month</th>
            </tr>
          </thead>
          <tbody>{renderMonthsList()}</tbody>
        </table>
        <table className="calendar-day">
          <thead>
            <tr>
              {weekdayshort.map(day => (
                <th key={day} className="week-day">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {renderDaysInMonth}
          </tbody>
        </table>
      </div>
     </div>
    </div>
  );
}

export default App;
