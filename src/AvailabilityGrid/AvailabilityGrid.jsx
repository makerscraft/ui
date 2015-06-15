const React = require('react/addons');
const moment = require('moment');

const log = require('debug')('ui:AvailabilityGrid');

const AvailabilityGridSlot = React.createClass({
  handleMouseDown() {
    if (this.props.data.selected) {
      this.props.onSelectionModeChanged('unselecting', this.props.dayIndex, this.props.data.index);
      this.props.onSlotUnselected(this.props.dayIndex, this.props.data.index);
    } else {
      this.props.onSelectionModeChanged('selecting', this.props.dayIndex, this.props.data.index);
      this.props.onSlotSelected(this.props.dayIndex, this.props.data.index);
    }
  },

  handleMouseUp() {
    this.props.onSelectionModeChanged('neutral');
  },

  handleMouseEnter() {
    if (this.props.mouseDown === 1) {
      if (this.props.selectionMode === 'selecting') {
        this.props.onSlotSelected(this.props.dayIndex, this.props.data.index);
      } else if (this.props.selectionMode === 'unselecting') {
        this.props.onSlotUnselected(this.props.dayIndex, this.props.data.index);
      }
    }
  },

  render() {
    let cx = React.addons.classSet;
    let classes = cx({
      'availability-grid-slot': true,
      'selected': this.props.data.selected
    });

    return (
      <div
          className={classes}
          onMouseEnter={this.handleMouseEnter}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp} >
      </div>
    );
  }
})

const AvailabilityGridDay = React.createClass({
  render() {
    let slotNodes = this.props.data.slots.map((slotData) => {
      const {data, ...other} = this.props;
      return (
        <AvailabilityGridSlot
            data={slotData}
            dayIndex={data.index}
            {...other} />
      );
    })

    return (
      <div className="availability-grid-day">
        {this.props.data.name}
        {slotNodes.slice(this.props.minSlot, this.props.maxSlot)}
      </div>
    );
  }
})

const AvailabilityGrid = React.createClass({
  getInitialState() {
    const days = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

    const HOURS_DAY = 24;
    const MINUTES_HOUR = 60;
    const MINUTES_SLOT = MINUTES_HOUR / this.props.slotsHour;
    const SLOTS_DAY = HOURS_DAY * this.props.slotsHour;

    let daysData = [];
    let slotNames = [];
    let selectionMode = 'neutral';

    // precalculate the slot names one time
    slotNames = Array.fill(new Array(SLOTS_DAY)).map((slot, index) => (
        moment(moment().format('YYYY-MM-DD')).
        add(MINUTES_SLOT * (index + 1)).
        format('hh:mm A')
    ));

    daysData = days.map((name, index) => {
      let slots = slotNames.map((name, index) => ({name, index, selected: false}));

      return {index, name, slots};
    });

    return {
      days: daysData,
      slotNames: slotNames,
      selectionMode: selectionMode,
      selectionStartDays: _.cloneDeep(daysData),
      selectionStartDay: 0,
      selectionStartSlot: 0,
      mouseDown: 0
    };
  },

  onMouseDown(e) {
    this.setState({mouseDown: this.state.mouseDown + 1});
  },

  onMouseUp(e) {
    this.setState({mouseDown: this.state.mouseDown - 1});
  },

  componentWillReceiveProps(nextProps) {
    this._digestBitmap(nextProps.bitmap);
  },

  /**
   * Translates bitmapstring to internal data structures and stores it on
   * the state.
   *
   * Bitmap for availability is a string of 1s and 0s, with 1 representing
   * an avalible time block and 0 representing an unavailible time block.
   *
   * Totally free: 11111111111111111111
   * Always busy:  00000000000000000000
   *
   * If there are 4 slots in every hour (15 minutes per time block), then
   * the availability bitmap of someone busy for the first 30m of each hour
   * would look like this: 00110011001100110011
   *
   * This function splits the bitstring into the days variable we store on
   * state.
   *
   */
  _digestBitmap(bitmap) {
    // split the bitmap into day-size chunks
    let dayRegex = new RegExp(`.{1,${this.props.slotsHour * 24}}`, 'g')
    let dayBitmaps = bitmap.match(dayRegex)

    let daysData = this.state.days;

    if (dayBitmaps) {
      dayBitmaps.map((dayBitmap, dayIndex) => {
        dayBitmap.split('').map((slotValue, slotIndex) => {
          daysData[dayIndex].slots[slotIndex].selected = slotValue === '1';
        })
      })

      this.setState({days: daysData});
    }
  },

  getBitmap() {
    // translate state to bitmap and return
    return this.state.days.map((dayData) => {
      return dayData.slots.map((slot) => {
        let value = slot.selected ? '1' : '0'
        return new Array(4 / this.props.slotsHour + 1).join(value);
      }).join('');
    }).join('');
  },

  handleMouseEnter() {
    if (this.state.mouseDown === 0) {
      this.handleSelectionModeChanged('neutral');
    }
  },

  handlePost() {
    this.props.onPost(this.getBitmap());
  },

  handleSelectionModeChanged(newMode, startDay, startSlot) {
    if (newMode == 'selecting' || newMode == 'unselecting') {
      let days = this.state.days;
      days[startDay].slots[startSlot].selected = (newMode === 'selecting')

      this.setState({
        days: days,
        selectionStartDays: _.cloneDeep(days),
        selectionMode: newMode,
        selectionStartDay: startDay,
        selectionStartSlot: startSlot
      });
    } else {
      this.setState({
        selectionMode: newMode
      });
    }
  },

  handleSlotSelected(dayIndex, slotIndex) {
    this.handleSlot(dayIndex, slotIndex, true);
  },

  handleSlotUnselected(dayIndex, slotIndex) {
    this.handleSlot(dayIndex, slotIndex, false);
  },

  handleSlot(dayIndex, slotIndex, value) {
    if (this.state.selectionMode === 'selecting' || this.state.selectionMode === 'unselecting') {
      let days = this.state.days;

      let startDay = Math.min(this.state.selectionStartDay, dayIndex)
      let endDay = Math.max(this.state.selectionStartDay, dayIndex)

      let startSlot = Math.min(this.state.selectionStartSlot, slotIndex)
      let endSlot = Math.max(this.state.selectionStartSlot, slotIndex)

      days.map((day, i) => {
        day.slots.map((slot, j) => {
          if (i >= startDay && i <= endDay && j >= startSlot && j <= endSlot) {
            days[i].slots[j].selected = value;
          } else {
            days[i].slots[j].selected = this.state.selectionStartDays[i].slots[j].selected;
          }
        })
      });

      this.setState({days: days});
    }
  },

  render() {
    let slotNames = this.state.slotNames.map((slotName) => {
      return (
        <div className="availability-grid-slot-name">
          {slotName}
        </div>
      );
    })

    let minSlot = 28;
    let maxSlot = 91;

    let dayNodes = this.state.days.map((dayData) => {
      return (
        <AvailabilityGridDay
            data={dayData}
            selectionMode={this.state.selectionMode}
            onSelectionModeChanged={this.handleSelectionModeChanged}
            onSlotSelected={this.handleSlotSelected}
            onSlotUnselected={this.handleSlotUnselected}
            minSlot={minSlot}
            maxSlot={maxSlot}
            mouseDown={this.state.mouseDown} />
      );
    });

    return (
      <div
          className="availability-grid"
          onMouseEnter={this.handleMouseEnter}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp} >
        <div
            className="availability-grid-slot-names">
          {slotNames.slice(minSlot, maxSlot)}
        </div>
        <div
            className="availability-grid-days">
          {dayNodes}
        </div>
        <input
            className="availability-grid-update-button"
            type="submit"
            onClick={this.handlePost}
            value="Update Availability"/>
      </div>
    );
  }
})

module.exports = AvailabilityGrid;
