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
  //檢查初始化年月是否符合格式 (不符合格式則顯示現在的月份)
  checkInitYearMonth = (init)=>{
    const pattern =  new RegExp('^\\d{4}(0[1-9]|1[0-2])$') ;
    if( pattern.test(init)){
        return init
    }else{   
    const initDisFormat =(new Date().getFullYear()).toString()+this.padding1((new Date().getMonth()+1),2)
    alert("日期不符合格式, 以最近日期為主")
    return initDisFormat
    }
 }
  //檢查資料來源if array or string
  checkDataSource = (x) =>{
   if( typeof(x)=='string' || typeof(x)=='array'){
     return x;
   }else{
     alert("資料格式不符合")
    }
  }
  //輸入月份沒有資料時 則抓出前後月份
   checkInitHasValue = (x,month) =>{
    const slashDate = x.substring(0,4)+'/'+x.substring(4,6);
    const target =  new Date(x.substring(0,4), x.substring(4,6)-1).getTime(); //init的時間戳記
    const lastData = new Date(month[month.length-1].substring(0,4), month[month.length-1].substring(5,7)-1).getTime(); //json最後一個月的時間戳記
    const firstData = new Date(month[0].substring(0,4), month[0].substring(5,7)-1).getTime();
    const timestampAr = [];
    if (month.indexOf(slashDate)>= 0){   
      return slashDate
    }else{
          for( let i = 0; i < month.length ; i++){
                const compare = (new Date(month[i].substring(0,4), month[i].substring(5,7)-1)).getTime();
                const diff = target-compare;
                const obj = {date: month[i],diff: diff}
                timestampAr.push(obj)
                }     
          // console.log(timestampAr);
          const nextMonthAr = timestampAr.filter((item)=>{
            return item.diff < 0
          })
          const prevMonthAr = timestampAr.filter((item)=>{
            return item.diff > 0
          })
          const nextMonth = nextMonthAr[0];  
          const prevMonth = prevMonthAr[prevMonthAr.length-1];
          if(target > lastData){ //搜尋月份落於範圍之外(future)
            return month[month.length-1];
             }else if(target < firstData){ //搜尋月份落於範圍之外(past)
              return  month[0];
             }else{
                 return this.whichMonthToShow(prevMonth,nextMonth); //如果月份落在大小月之間
             }
  }
}
  //相近的前後月要顯示哪一個月
   whichMonthToShow = (prev, next)=>{
     const prevMonth = Number(prev.date.substring(5,7));
     const nextMonth = Number(next.date.substring(5,7));
  
     const nextInInit = this.state.init.filter((item)=>{
       return next.date == item.date.substring(0,7)
     })
     const prevInInit = this.state.init.filter((item)=>{
      return prev.date == item.date.substring(0,7)
    })
     const nextLength = nextInInit.length;
     const prevLength = prevInInit.length; 

     next.length = nextLength;
     prev.length = prevLength;

     const ar = [prev,next];
     //console.log(ar);
     let show;
     const abs = Math.abs(nextMonth - prevMonth);
     if ( abs == 2 || abs == 10 ){
      show = (ar[0].length > ar[1].length)? ar[0].date : ar[1].date 
     }else{
       show = (ar[0].diff < ar[1].diff)? ar[0].date : ar[1].date 
     }
     return show
   } 

  //當月資料的呈現
  showData = (x) => {
    //1. 月份array:empty
    let getMonth;
    if (this.state.indexMonth == this.state.monthArray.length-1) {
      getMonth = this.state.showMonth[this.state.showMonth.length-1];

    } else if (this.state.indexMonth === 0) {
      getMonth = this.state.showMonth[0]
    } else {
      getMonth = x ? x : this.state.showMonth[1];
    }

    let curMonthDays = new Date(getMonth.substring(0, 4), getMonth.substring(5, 7), 0).getDate();
    const month_array = [];
    for (let i = 0; i < curMonthDays; i++) {
      month_array[i] = {};
    }
    //2. 將實際月份資料存進去月份array
    const showItem = this.state.init.filter((item) => {
      const sub = item.date.substring(0, 7);
      return sub == getMonth.substring(0, 4) + "/" + this.padding1(getMonth.substring(5, 7), 2);
    })
    
    const showItemIncreanse = showItem.sort((a, b) => {
      const timeStampA = (new Date(a.date.replace("/", "-"))).getTime();
      const timeStampB = (new Date(b.date.replace("/", "-"))).getTime();
      // console.log(timeStampA);
      return timeStampA - timeStampB
    })
    const set = new Set();
    const arr = showItemIncreanse.filter(item => {
      return !set.has(item.date) ? set.add(item.date) : false
    })
    for (let j = 0; j < arr.length; j++) {
      const dd = Number(arr[j].date.substring(8));
    
      month_array[dd - 1] = arr[j];
    }
 
    this.setState({
      new_month: month_array
    }, () => {
      this.countPageNumber();
      console.log(this.state.new_month);
    })
  }

  // one time funciton: 找出所有月份組成array
  monthArray = () => {
    
    const monthArray1 = this.state.init.map((item) => {
      return item.date.substring(0, 7);
    })
    const monthArray2 = monthArray1.filter(function (el, i, arr) {
      return arr.indexOf(el) === i;
    });
    const monthArray3 = monthArray2.sort((a, b) => {
      const timeStampA = (new Date(a.replace("/", "-"))).getTime();
      const timeStampB = (new Date(b.replace("/", "-"))).getTime();
     
      return timeStampA - timeStampB
    })
   
    const init = this.checkInitYearMonth(this.props.initYearMonth,monthArray3); // 判斷年月是否符合正規表達式
  
    //判斷月份是否存在json中, 如果沒有則回傳最接近的月份
    const initShow = this.checkInitHasValue(init,monthArray3);
  
    this.setState({
      monthArray: monthArray3
    }, () => {
      this.showMonth( initShow );
    
   
     //console.log(this.state.monthArray);
    })
  }

  // 列出三個月的月份
  showMonth = (x) => {
    const index = this.state.indexMonth === '' ? this.state.monthArray.indexOf(x) : this.state.indexMonth;
    this.setState({
      indexMonth: index
    })
    const showMonth = [];
    let MActive; 
    //判斷是否有三個月以上的資料
   let length;
   if(this.state.monthArray.length >=3) {
     length =3;   //有三個月以上的資料
   }else if(this.state.monthArray.length == 2){
    length = 2;   //資料只有兩個月
   }else if(this.state.monthArray.length == 1){
    length = 1;   //資料只有一個月
   } 
   //假設index 0 
        for (let i = -1; i <= length-2; i++) {
          if (index == 0) {
          // console.log("index=0");
            showMonth.push(this.state.monthArray[i + 1])
            MActive = 0
          }  else if (index == this.state.monthArray.length - 1) { //最後一筆
            let NEWindex = (index == 0 ? 1 : index - 1)
            const newIndex = (NEWindex == 0 ? 1 : NEWindex)
            showMonth.push(this.state.monthArray[newIndex + i]);
            MActive = length-1;
          } else {
          // console.log("index is moddle");
            showMonth.push(this.state.monthArray[index + i]);
            MActive = 1;
          }
    }
    this.setState({
      showMonth: showMonth,
      showMonthActive: MActive

    }, () => {
      this.showData();
      this.EmptySpace();
    })
  }
  //日期顯示兩位數
  padding1 = (num, length) => {
    for (var len = (num + "").length; len < length; len = num.length) {
      num = "0" + num;
    }
    return num;
  }
  //點擊日期
  toggleItem = (e) => {
   const date = e.currentTarget.getAttribute("data-date");
    this.setState({
      toggleId: date
    },()=>{
      console.log(this.state.new_month[date]);
    })
  }
  //月份向右箭頭
  onClickNext = () => {
    const indexMonth = this.state.indexMonth; //24
    const maxMonth = this.state.monthArray.length-1; //25
    const newindex = (indexMonth == maxMonth ? indexMonth : indexMonth + 1); //沒有問題
    const active =  (newindex == maxMonth  ? this.state.showMonth.length-1 : 1);
    this.setState({
      indexMonth: newindex,
      showMonthActive: active,
      toggleId : -1
    }, () => {
      this.showMonth()
    })
  }
  //月份向左箭頭
  onClickPrev = () => {
    const indexMonth = this.state.indexMonth;
    this.setState({
      indexMonth: indexMonth > 0 ? indexMonth - 1 : 0,
      showMonthActive: (indexMonth == 1 ? 0 : 1),
      toggleId : -1
    }, () => {
      this.showMonth()
    })
  }
  //點選月份改變月份
  onClickMonth = (e) => {
    const getMonth = e.currentTarget.getAttribute("data-date");
    const index = this.state.monthArray.indexOf(getMonth);
    let MActive;
    if (index == 0) {
      MActive = 0;
    } else if (index == this.state.monthArray.length - 1) {
      MActive = 2
    } else {
      MActive = 1
    }
    this.setState({
      indexMonth: index,
      toggleId: -1,
      showMonthActive: MActive
    }, () => {
      this.showMonth(getMonth);
      this.EmptySpace(getMonth);
    })

  }
  //計算月曆前後空白格子
  EmptySpace = (x) => {
    let getMonth;
    if (this.state.indexMonth == 25) {
      getMonth = this.state.showMonth[2];
    } else if (this.state.indexMonth === 0) {
      getMonth = this.state.showMonth[0]
    } else {
      getMonth = x ? x : this.state.showMonth[1];
    }

    const getYear = getMonth.substring(0, 4);
    const getM = getMonth.substring(5, 7);
    const weekDay = new Date(getYear, getM - 1, 1).getDay();
    const curMonthDays = new Date(getYear, getM, 0).getDate();

    const Empty = weekDay;
    let tdtd = [];
    let aftertd = [];
    for (let i = 0; i < Empty; i++) {
      tdtd.push("empty");
    }
    const afterEmptyNum = 42 - (curMonthDays + Empty);
    for (let i = 0; i < afterEmptyNum; i++) {
      aftertd.push("empty");
    }
    this.setState({
      prevEmpty: tdtd,
      afterEmpty: aftertd
    });
  }
  countPageNumber = ()=>{
    const listArray = this.state.new_month.filter((item)=>{   
       return item.price 
   })
   const pageNumber = Math.ceil(listArray.length/this.state.countPerPage) ;
   this.setState({
       pageNumber : pageNumber 
   })
  }
  prevPage = ()=>{
    this.setState({
      pageIndex : this.state.pageIndex-1
    })
  }
  nextPage = ()=>{
    this.setState({
      pageIndex : this.state.pageIndex+1
    })
  }
  //切換日曆/list模式
  switch = ()=>{
    this.setState({
      calendarMode : !this.state.calendarMode,
    })
  }
  //加入新資料
  inputData = (obj)=>{
    const init = this.state.init;
   for(let i = 0 ; i<obj.length ; i++){
    init.unshift(obj[i]);
   }
    this.setState({
     init : init
   },()=>{
    this.monthArray();
   })
  }

  //加入新資料移除原來的資料
  resetData = (obj)=>{
   this.setState({
     init: obj,
     indexMonth: ''
   },()=>{
     this.monthArray();
   })
  }
  
  render() {
  
    const showMonth = this.state.year + "/" + this.padding1(this.state.month, 2);
    return (
      
      <div className="calendar" id="calendar">
       <div className="switch" onClick={this.switch}><p> {this.state.calendarMode?  '切換列表模式' : '切換日曆模式'}</p></div>
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
        />
      </div>
    );
  }
}

export default Calendar;