import React, { useState, useEffect } from "react";
import moment from "moment";
import "./style.css";

const Calendar = () => {
  const weekdayshort = moment.weekdaysShort();
  const [data, setData] = useState({
    showCalendarTable: true,
    showMonthTable: false,
    dataObject: moment(),
    allmonths: moment.months(),
    selectedDay: null,
  });
  const [emptyDays, setEmptyDays] = useState([]);
  const [futuredays, setFuturedays] = useState([]);

  useEffect(() => {
    showEmptyDays();
    showFutureDays();
  }, []);

  const year = () => {
    return data.dataObject.format("Y");
  }; //show number of year

  const firstDayOfMonth = () => {
    let dataObject = data.dataObject;
    let firstDay = moment(dataObject).startOf("month").format("d");
    return firstDay;
  };
  //startOf("month") set to the first of this month, which follows by number 0,1,2,3.... sun,mon,tues,wes,...

  // Reference: https://momentjscom.readthedocs.io/en/latest/moment/04-displaying/01-format/

  // day in month follow by before & after currentDay
  const showEmptyDays = () => {
    let numberEmptyDays = [];
    for (let i = 0; i < firstDayOfMonth(); i++) {
      numberEmptyDays.push(<td className="calendar-day empty">{""}</td>);
    }
    setEmptyDays(numberEmptyDays);
  };

  // console.log(currentDay());
  const daysInMonth = () => {
    return data.dataObject.daysInMonth();
  }; //show number of days in month

  const currentDay = () => {
    return data.dataObject.format("D");
  }; // Day of Month
  const showFutureDays = () => {
    let numberFutureDays = [];
    const newcurrentDay = currentDay(); //call it first
    for (let d = 1; d <= daysInMonth(); d++) {
      let currentDay = d === newcurrentDay ? "today" : "";
      numberFutureDays.push(
        <td key={d} className={`calendar-day ${currentDay}`}>
          <span
            onClick={(e) => {
              onDayClick(e, d);
            }}
          >
            {d}
          </span>
        </td>
      );
    }
    setFuturedays(numberFutureDays);
  };

  // show content table
  let totalSlots = [...emptyDays, ...futuredays];
  let rows = [];
  let cells = [];
  totalSlots.forEach((row, i) => {
    if (i % 7 !== 0) {
      cells.push(row);
      // console.log("OUTPUT: showTotalDays -> cells ======", cells.push(row));
    } else {
      rows.push(cells);
      cells = [];
      cells.push(row);
    }
    if (i === totalSlots.length - 1) {
      rows.push(cells);
    }
  });
  const renderDaysInMonth = rows.map((d, idx) => {
    return <tr key={idx}>{d}</tr>;
  });

  // End show table

  // Navigation

  const onDayClick = (e, d) => {
    setData(
      {
        selectedDay: d,
      },
      () => {
        console.log("selected day: ", d);
      }
    );
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            {weekdayshort.length > 0
              ? weekdayshort.map((day, i) => {
                  return <th key={i}>{day}</th>;
                })
              : null}
          </tr>
        </thead>
        <tbody>
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
};
export default Calendar;
