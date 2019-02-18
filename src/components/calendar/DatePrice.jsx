import React, { Component } from 'react';


class DatePrice extends Component {

    getChinese = (x)=>{
        const ChineseDay = new Date(x.replace("/", "-")).getDay();
      switch (ChineseDay) {
        case 0:
         return "星期日";
          break;
        case 1:
        return "星期一";
          break;
        case 2:
        return "星期二";
          break;
        case 3:
        return "星期三";
          break;
        case 4:
        return "星期四";
          break;
        case 5:
        return  "星期五";
          break;
        case 6:
        return "星期六";
      }
    }

    toThousands = (num) => {
    
        var result = [], counter = 0;
        num = (num || 0).toString().split('');
        for (var i = num.length - 1; i >= 0; i--) {
            counter++;
            result.unshift(num[i]);
            if (!(counter % 3) && i !== 0) { result.unshift(','); }
        }
        return result.join('');
    }

    getStatusColor = (x)=>{
        const s = "status";
        switch (x) {
            case "報名": 
             return  s+" register";
              break;
            case "候補":
            return s+" waiting";
              break;
            case "預定":
            return s+" reserve";
              break;
            case "截止":
            return s+" deadline";
              break;
            case "額滿":
            return s+" full";
              break;
            case "關團":
            return s+" closed";
              break;
          }
    }

    inPage = (x) =>{
        const clMode = this.props.calendarMode;
        if(!clMode){
           const inPage = (this.props.pageIndex == Math.ceil(x/this.props.countPerPage)) ? '':'disable';
        return inPage
        }  
    }
 
    render() {
     
        const {guaranteed,status,available,total,price} = this.props.dataKeySetting;

        const listArray = this.props.new_month.filter((item)=>{    //list array
            return item.price 
        })
     
        const clMode = this.props.calendarMode;
        const MonthArray = clMode ? this.props.new_month : listArray  //判斷甚麼模式來決定取哪個array
        return (
            <div className="date">
                <div className= {clMode ? "date-calendar":"date-list"}>
                    <table>
                        <tbody>
                            
                            <tr>
                            {this.props.prevEmpty.map((item,index)=>{
                                    return(
                                      <td className= {clMode ? "empty":"disable"} key={index+100}></td>
                                    )
                                })}
                            {MonthArray.map((item, index) => {
                               // const Index = this.props.prevEmpty.length+index;
                                const toggleId = this.props.toggleId==index? "date-active":'' ;
                                //const inPage = (this.props.pageIndex == Math.ceil(index/this.props.countPerPage)) ? '':'disable';
                                return (
                                        <td id={index} className={`${toggleId}`+' '+this.inPage(index+1) } onClick={item.date? this.props.toggleItem:null} key={index} data-date={item.date}>
                                      
                                            <div className="title">{ clMode ? index+1 :""}
                                                {/* <div className="num_date">{Number(item.date.substring(8,10))}</div> */}
                                                <div className="num_date">{this.props.calendarMode ?'': Number(item.date.substring(8,10))}</div>
                                                <div className="list-weekday">{this.props.calendarMode ?'': this.getChinese(item.date)}</div>

                                            </div>
                                            <section className="middle">
                                                <div>
                                               {clMode?<div className={item.date ? this.getStatusColor(item[status]) : "status disable"}>{item[status]}</div>:''} 
                                                    <div className={item.date ? 'sell' : "sell disable"}>可賣 : {item[available]}</div>
                                                    <div className={item.date ? 'group' : "group disable"}>團位 : {item[total]}</div>
                                                </div>
                                                <div className={item[guaranteed] ? 'guaranteed' : "guaranteed disable "}>
                                                 {clMode?'': <i className="fas fa-flag"></i>}
                                                {item[guaranteed]?"成團":''}</div>
                                            </section>
                                            <section className="right">
                                            {clMode?'':<div className={item.date ? 'status' : "status disable"}>{item[status]}</div>} 
                                                <div className={item.date ? 'price' : "price disable"}>${this.toThousands(item[price])}</div>
                                            </section>
                                        </td>
                                )
                            })}
                                 {this.props.afterEmpty.map((item,id)=>{
                                     const Index = this.props.prevEmpty.length+this.props.new_month.length+id;
                                 return(
                                    <td className={clMode ? "empty":"disable"} key={Index} ></td>
                                 )
                             })}
                            </tr>



                        </tbody>
                    </table>


                </div>
      
            </div>
            

        );
    }
}

export default DatePrice;