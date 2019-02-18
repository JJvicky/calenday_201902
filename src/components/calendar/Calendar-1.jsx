import React, { Component } from 'react';
import DatePrice from './DatePrice.jsx';
import MonthTitle from './MonthTitle.jsx';
import PageNumber from './PageNumber.jsx'
import '../../Style/components.scss';
import '../../Style/reset.scss';
// import { configure } from '@storybook/react';
// import axios from 'axios';
// import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'


function Weekday() {
  return (
    <div className="weekday">
      <ul>
        <li>星期日</li>
        <li>星期一</li>
        <li>星期二</li>
        <li>星期三</li>
        <li>星期四</li>
        <li>星期五</li>
        <li>星期六</li>
      </ul>

    </div>
  )
}

class Calendar extends Component {
  state = {
    init: [],      //Fetch出 data.json 
    new_month: [],  //顯示當月份all data 
    prevEmpty: [],  //補月份前的灰格
    afterEmpty: [], //補月份後的灰格
    monthArray: [],// 抓出所有的月份 2018/01, 2018/02
    showMonth: [], //顯示三個月份
    showMonthActive: '',  // default取三個月份的中間值index=1
    indexMonth: '',  //紀錄目前顯示月份在資料裡的index
    toggleId: -1,  //click日期顯示綠色
    calendarMode : false,
    countPerPage : 8,
    pageNumber : '',
    pageIndex : 1,
    destroy : false
  }
  //檢查資料來源if array or string
  checkDataSource = (x) =>{
    if( typeof(x)=='string' || typeof(x)=='array'){
      return x;
    }else{
      alert("資料格式不符合")
     }
   }
  componentDidMount=()=> {
    const data = this.checkDataSource(this.props.dataSource); //判斷data is array or string
    fetch(data)
      .then(res => res.json())
      .then(result => {
        this.setState({
          init: result
        }, () => {
          this.monthArray();
        })
      })
  }
  monthArray = ()=>{
    const ar = this.state.init.sort((a,b)=>{
      const timeStampA = (new Date(a.date.replace("/", "-"))).getTime();
      const timeStampB = (new Date(b.date.replace("/", "-"))).getTime();
      return timeStampA - timeStampB
    })
    //console.log(ar);
    const min = ar[0].date.substring(0,7);
    const max = ar[ar.length-1].date.substring(0,7);
    //console.log(min,max);
    // 計算大小月之間總共有幾個月
    const diffYear = max.substring(0,4)-min.substring(0,4);
    const diffMonth = Number(max.substring(5,7))-Number(min.substring(5,7));
    const diff = diffYear*12 + diffMonth;
    // 產生連續的月份ar(含空月曆)
    const monthArray = [];
    const mAr = []
    for( let i =0 ; i<= diff ; i++){
      const m = new Date(min.substring(0,4),Number(min.substring(5,7))-1+i);
      const month = m.getFullYear()+'/'+this.padding1(Number(m.getMonth()+1),2);
      const obj = {month: month}
      mAr.push(month)    //無key
      monthArray.push(obj); // 有obj key
    }
   // console.log(monthArray);
    this.setState({
    },()=>{
      this.DataAssortedByMonth(mAr, monthArray)
    })
  } 
  //日期顯示兩位數
  padding1 = (num, length) => {
    for (var len = (num + "").length; len < length; len = num.length) {
      num = "0" + num;
    }
    return num;
  }
  DataAssortedByMonth= (mAr,monthArray)=>{

      for ( let j =0 ; j < monthArray.length ; j++ ){
        monthArray[j].data = []
      }
      for ( let i =0 ; i < this.state.init.length; i++){
      const key =  mAr.indexOf(this.state.init[i].date.substring(0,7));
      monthArray[key].data.push(this.state.init[i]);  
      }
     console.log(monthArray);
  }
  
  
  render() {
  
    //const showMonth = this.state.year + "/" + this.padding1(this.state.month, 2);
    return (
      
      <div className="calendar" id="calendar">
       {/* <div className="switch" onClick={this.switch}><p> {this.state.calendarMode?  '切換列表模式' : '切換日曆模式'}</p></div>
        <MonthTitle 
          onClickNext={this.onClickNext}
          onClickPrev={this.onClickPrev}
          onClickMonth={this.onClickMonth}
          onClickShowmonth={this.showMonth}
          {...this.state}
           />

        {this.state.calendarMode ?  <Weekday /> : ''} 
        <DatePrice 
          showMonth={showMonth}
          EmptySpace={this.EmptySpace}
          toggleItem={this.toggleItem}
          dataKeySetting = {this.props.dataKeySetting}
          {...this.state}
        />
        <PageNumber  
        changePage = {this.changePage}
        nextPage = {this.nextPage}
        prevPage = {this.prevPage}
        {...this.state}
        /> */}
      </div>
    );
  }
}

export default Calendar;