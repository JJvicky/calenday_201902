import React, { Component } from 'react';

class MonthTitle extends Component {
    state = {  }
    ClickFunc=(index)=>{
        if(index == 0 ){
            return this.props.onClickPrev
        }
        if(index == 2){
            return this.props.onClickNext
        }
        if(index ==1){
            return this.props.onClickMonth
        }
    }

    render() { 
        const showMonth = this.props.showMonth;
        const monthLength = this.props.new_month.length;   
        return ( 
            <div className="month">
                <div className="arrow prev" onClick={this.props.indexMonth === 0 ? null: this.props.onClickPrev}><div></div></div>
                <ul>
                {showMonth.map((item,index)=>{
                     const className =( this.props.showMonthActive == index?"sub_month active":"sub_month");
                    return(
                     <li className={className} key={index+300} data-date={item} onClick={this.ClickFunc(index)}>{item.substring(0,4)}年{item.substring(5,7)}月</li>             
                   )
                })} 
                </ul>
                <div className="arrow next" onClick={this.props.indexMonth == monthLength-1 ? null: this.props.onClickNext}><div></div></div>
            </div>
         );
    }
}
 
export default MonthTitle;