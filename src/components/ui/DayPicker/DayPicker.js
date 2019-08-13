import React, { Component } from "react";
import './DayPicker.min.css'
const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciebre"
];
const DAYS_LONG = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado"
];
const DAYS_SHORT = ["d", "l", "m", "x", "j", "v", "s"];

export default class DayPicker extends Component {
  constructor(props) {
    super(props);

    const now = new Date();

    this.state = {
      date: now.getDate(),
      month: now.getMonth(),
      today: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
      year: now.getFullYear()
    };
  }

  static isSameDay(a, b) {
    return (
      a &&
      b &&
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  get days() {
    const { month, year } = this.state;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    const offset = new Date(year, month, 1).getDay();
    if (offset < 7) {
      for (let i = 0; i < offset; i++) {
        days.push(null);
      }
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  }

  get weeks() {
    const days = this.days;
    const weeks = [];
    const weekCount = Math.ceil(days.length / 7);
    for (let i = 0; i < weekCount; i++) {
      weeks.push(days.slice(i * 7, (i + 1) * 7));
    }
    return weeks;
  }

  longMonthName(month) {
    if (this.props.monthNames) {
      return this.props.monthNames[month];
    }

    return MONTHS[month];
  }

  longDayName(dayOfWeek) {
    if (this.props.longDayNames) {
      return this.props.longDayNames[dayOfWeek];
    }

    return DAYS_LONG[dayOfWeek];
  }

  shortDayName(dayOfWeek) {
    if (this.props.shortDayNames) {
      return this.props.shortDayNames[dayOfWeek];
    }

    return DAYS_SHORT[dayOfWeek];
  }

  previousMonth = () => {
    const { month, year } = this.state;

    this.setState({
      month: month !== 0 ? month - 1 : 11,
      year: month !== 0 ? year : year - 1
    });
  };

  nextMonth = () => {
    const { month, year } = this.state;

    this.setState({
      month: month !== 11 ? month + 1 : 0,
      year: month !== 11 ? year : year + 1
    });
  };

  onDayClick = day => () => {
    if (day) {
      this.props.onDayClick(day);
    }
  };

  renderDay = (day, index) => {
    const { month, today, year } = this.state;
    const { active } = this.props;
    const isToday = day && day.valueOf() === today.valueOf();
    const isActive = active && day && DayPicker.isSameDay(active, day);

    return (
      <div
        className={[
          "day",
          isActive ? "active" : null,
          !day ? "empty" : null,
          isToday ? "today" : null,
        ]
          .filter(v => v)
          .join(" ")}
        key={`${year}.${month}.day.${index}`}
        onClick={this.onDayClick(day)}
      >
        {day ? day.getDate() : ""}
      </div>
    );
  };

  changeClass = () => {

  }
  renderWeek = (days, index) => {
    const { month, year } = this.state;

    return (
      <div className="row-dias" key={`${year}.${month}.week.${index}`}>
        {days.map(this.renderDay)}
      </div>
    );
  };

  renderDayHeader(dayOfWeek) {
    const classDomingo = dayOfWeek === 0 ? 'is-festive' : null
    return (
        <abbr className={classDomingo} title={this.longDayName(dayOfWeek)}>
          {this.shortDayName(dayOfWeek)}
        </abbr>
    );
  }

  render() {
    const { month } = this.state;

    return (
      <div className="calendar">
        <header>
          <div className="icon" onClick={this.previousMonth}>
          t
          </div>
          <div>
            {this.longMonthName(month)}
          </div>
          <div className="icon" onClick={this.nextMonth}>
          u
          </div>
        </header>
        <article className="calendar-table">
          <div className="headers-dias">
            {this.renderDayHeader(0)}
            {this.renderDayHeader(1)}
            {this.renderDayHeader(2)}
            {this.renderDayHeader(3)}
            {this.renderDayHeader(4)}
            {this.renderDayHeader(5)}
            {this.renderDayHeader(6)}
          </div>
          {this.weeks.map(this.renderWeek)}
        </article>
      </div>
    );
  }
}
