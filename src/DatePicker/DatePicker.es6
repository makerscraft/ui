const React = require('react');
const moment = require('moment-timezone');
const cx = require('classnames');

require('./datepicker.less');

/**
 * Day component
 8 @property date {DateTime} of the date to be displayed
 */
class Day extends React.Component {
  static propTypes = {
    day: React.PropTypes.string
  }

  render () {
    const {date, unclickable, active, onClick} = this.props;
    const classes = cx(
      "day", {unclickable: unclickable}, {active: active});

    return (
      <div
          id={moment(date).dayOfYear()}
          className={classes}
          onClick={onClick.bind()}>
        {moment(date).date()}
      </div>
    );
  }
}


class DatePicker extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      days: [],
      activeIndex: null,
      monthsNavigated: 0
    }
  }

  componentDidMount() {
    this._generateDays();
  }

  _generateDays() {
    let {monthsNavigated, activeIndex} = this.state;

    const startDay = moment().add(monthsNavigated, 'month').
                            startOf('month').startOf('week').startOf('day');
    const endDay = moment().add(monthsNavigated, 'month').
                          endOf('month').endOf('week').startOf('day');
    const totalDays = endDay.diff(startDay, 'days') + 1;

    const days = [for (i of Array(totalDays).keys()) i].
                map(day => {
                  return {
                    dateObj: moment(startDay).add(day, 'day'),
                    dayOfYear: moment(startDay).add(day, 'day').dayOfYear()
                  }});

    activeIndex = activeIndex ||
      _.findIndex(days, {dayOfYear: moment().dayOfYear()});

    this.setState({
      days: days,
      activeIndex: activeIndex
    });
  }

  _handleClick(event) {
    const {days} = this.state;
    const {handleChange} = this.props;
    const newDate = parseInt(event.target.getAttribute('id'));
    const newActiveIndex = _.findIndex(days, {dayOfYear: newDate});
    this.setState({activeIndex: newActiveIndex});

    handleChange(days[newActiveIndex].dateObj);
  }

  _navigateForward() {
    this.state.monthsNavigated = this.state.monthsNavigated + 1;
    this._generateDays();
  }

  _navigateBack() {
    this.state.monthsNavigated = this.state.monthsNavigated - 1;
    this._generateDays();
  }

  _toggleOpen() {
    this.setState({visible: !this.state.visible});
  }

  render() {
    const {days, activeIndex, monthsNavigated, visible} = this.state;
    const activeDay = days[activeIndex] && days[activeIndex].dateObj;
    const datePickerClasses = cx('date-picker', {hidden: !visible})

    return (
      <div className="date-picker-container">
        <div
            className="button date-picker-button"
            onClick={this._toggleOpen.bind(this)}>
          {moment(activeDay).format('MM/DD/YYYY')}
          <span className="icon-navigatedown" aria-hidden="true"></span>
        </div>
        <div className={datePickerClasses}>
        <span
            className="icon-navigateleft" aria-hidden="true"
            onClick={this._navigateBack.bind(this)}></span>
        <span
            className="icon-navigateright" aria-hidden="true"
            onClick={this._navigateForward.bind(this)}></span>
          <div className="selected-day">
            {moment(activeDay).format('dddd, MMMM Do')}
          </div>
          <div className="day-headings">
            {['S', 'M', 'T', 'W', 'H', 'F', 'S'].
              map((day, key) => <div className="day-heading">{day}</div>)}
          </div>
          <div className="days-container">
            {days.map((day, key) => <Day
              date={day.dateObj}
              key={key}
              active={key===activeIndex}
              unclickable={day.dateObj.month() !==
                moment().add(monthsNavigated, 'month').month()}
              onClick={this._handleClick.bind(this)}/>)}
          </div>
        </div>
      </div>
    );
  }
}

export {DatePicker}
