import React, { Component } from 'react';
// import Calendar from './stories/Calendar.stories';
import Calendar from './components/calendar/Calendar.jsx';
//import Calendar from './components/calendar/Calendar-1.jsx'

const dataKeySetting ={
  // 保證出團
      "guaranteed": "guaranteed",
      // 狀態
      'status': 'status',
      // 可賣團位
      'available': 'availableVancancy',
      // 團位
      'total': 'totalVacnacy',
      // 價格
      'price': 'price'
  }
  // const dataKeySetting ={
  //   // 保證出團
  //       "guaranteed": "certain",
  //       // 狀態
  //       'status': 'state',
  //       // 可賣團位
  //       'available': 'onsell',
  //       // 團位
  //       'total': 'total',
  //       // 價格
  //       'price': 'price'
  //   }
    


class App extends Component {

constructor(props) {
  super(props);
  this.child= React.createRef();
  
}
state = {
  destroy : false
}

switch = ()=>{
  this.child.current.switch();
}
nextMonth = ()=>{
  this.child.current.onClickNext();
}
prevMonth = ()=>{
  this.child.current.onClickPrev();
}
inputData = (x)=>{
  this.child.current.inputData(x);
}
resetData = (x)=>{
  this.child.current.resetData(x);
}
destroy = ()=>{
  this.setState({
    destroy : !this.state.destroy
  }) 
}
alive = ()=>{
  this.setState({
    destroy : !this.state.destroy
  }) 
}

  render() {
    return (
      <div className="App">
      {this.state.destroy ? '':<Calendar 
        dataSource="./src/json/data4.json"
    //   dataSource ={ [{
    //     "guaranteed": false,
    //     "date": "2018/10/06",
    //     "price": 76263,
    //     "availableVancancy": 16,
    //     "totalVacnacy": 166,
    //     "status": "預定"
    // }]}
       initYearMonth="201809"
       ref={this.child}
       dataKeySetting = {dataKeySetting}
       />}
    
      </div>
    );

  }
 
}

export default App;
