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
      "day",
      {unclickable: unclickable},
      {active: active},
      {today: moment().dayOfYear() === moment(date).dayOfYear()});

    const tinyTextClass = cx(
      'day-tiny-text',
      {hidden: moment(date).date() !== 1 &&
        moment(date).dayOfYear() !== moment().dayOfYear()});

    const tinyText = moment(date).date() === 1 ?
      moment(date).format('MMM') : 'Today';

    return (
      <div
          className={classes}
          onClick={onClick.bind()}>
        <div className={tinyTextClass}>{tinyText}</div>
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
    this._generateDays(this.props.defaultDate);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.defaultDate.dayOfYear() !== newProps.defaultDate.dayOfYear()) {
      this._generateDays(newProps.defaultDate);
    }
  }

  _generateDays(defaultDate=false) {
    let {monthsNavigated, activeIndex} = this.state;

    // If called on initial render, check defaultDate to determine if calendar
    // should start on a month different than the current one
    if (defaultDate) {
      monthsNavigated = defaultDate.month() - moment().month();
    }

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

    activeIndex = (! activeIndex || activeIndex === -1) ?
      _.findIndex(days, {dayOfYear: moment(defaultDate || '').dayOfYear()}) : activeIndex;

    this.setState({
      days: days,
      activeIndex: activeIndex,
      monthsNavigated: monthsNavigated
    });
  }

  _handleClick(event, newDay) {
    const {days} = this.state;
    const {handleChange} = this.props;
    const newActiveIndex = _.findIndex(days, {dayOfYear: newDay});

    this.setState({activeIndex: newActiveIndex});
    this._toggleOpen();

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
    const {className} = this.props;
    const {days, activeIndex, monthsNavigated, visible} = this.state;
    const activeDay = days[activeIndex] && days[activeIndex].dateObj;
    const datePickerClasses = cx('date-picker', {hidden: !visible})

    return (
      <div className={cx("date-picker-container", className)}>
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
              onClick={event => this._handleClick(event, day.dayOfYear)}/>)}
          </div>
        </div>
      </div>
    );
  }
}

export {DatePicker}
