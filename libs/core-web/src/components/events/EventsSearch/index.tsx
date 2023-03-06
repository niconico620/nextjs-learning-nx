import React, { useRef } from 'react';
import { Button } from '../../atoms/Button';
import classes from './events-search.module.css';

export function EventsSearch(props: any) {
  const yearSelectRef = useRef<HTMLSelectElement>(null);
  const monthSelectRef = useRef<HTMLSelectElement>(null);

  function submitHandler(event: any) {
    event.preventDefault();

    const selectedYear = yearSelectRef.current?.value;
    const selectedMonth = monthSelectRef.current?.value;

    props.onSearch(selectedYear, selectedMonth);
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="year">Year</label>
          <select id="year" ref={yearSelectRef}>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="month">Month</label>
          <select id="month" ref={monthSelectRef}>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
      </div>
      <Button>Search</Button>
    </form>
  );
}
