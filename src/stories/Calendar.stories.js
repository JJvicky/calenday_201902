import React, { Component } from 'react';
import Date from '../components/calendar/DatePrice';
import Month from '../components/calendar/MonthTitle';
import Calendar from '../components/calendar/Calendar';
import '../Style/components.scss';
import '../Style/reset.scss';
// import axios from 'axios';
import { storiesOf } from '@storybook/react';
// import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'

// class Calendar extends Component {

//   state = {
//     list: []
//   }

//   render() {
//     return (
//       <div className="calendar">
//         {/* <Month />
//         <Weekday />
//         <Date /> */}
//         <Calendar />
//       </div>
//     );
//   }
// }

// export default Calendar;

storiesOf('Calendar', module).add('default', () => (
  <Calendar />
));