import React, { Component } from 'react';
class PageNumber extends Component {
        changePage = (e)=>{
         const page = e.currentTarget.getAttribute("data-page");
         this.props.changePage(page);
        }
        // createli = () => {
        //     let li = []
        //     const ar =this.props.pageNumber.length;
        //     for (let i = 0; i < ar; i++) {
        //       li.push(<li key={i} data-page={i+1} onClick={this.changePage}>
        //         {
        //          ` ${i+1}`
        //         }
        //       </li>  )
        //     }
        //     return li
        //   }           
    

    render() { 
        
        return ( 
            
             <div className="pagenumber">
         <div className={this.props.pageIndex==1?'prev invisible':'prev'} onClick={this.props.prevPage}>上一頁</div>
        <ul>
          <li>{this.props.pageIndex}/</li>
          <li>{this.props.pageNumber}</li>
        </ul>
          <div className={this.props.pageIndex == this.props.pageNumber? 'next invisible':'next' } onClick={this.props.nextPage}>下一頁</div>
        </div>
         );
    }
}
 
export default PageNumber;