import Img from '../asset/asset.js';
import React from  'react';

import '../css/myboot.css';
import SwitchBar from "./swithBar";
import  NoRanking   from './noRanking';



//app主组件
class App4 extends React.Component{

  //构造函数
  constructor(props){
    super(props);
    this.state={
      currentSelected:"月度",

    };
  }




  render(){

    return(
      <div >
        <ul className="nav nav-pills" id="nav" >
          <li  className={(this.state.currentSelected ===   "月度"?"active":"")}onClick={()=>this.setState({currentSelected:"月度"})}>  <a href="#">月度</a></li>
          <li  className={(this.state.currentSelected === "半年度"?"active":"")}onClick={()=>this.setState({currentSelected:"半年度"})}><a href="#" >半年度</a></li>
          <li  className={(this.state.currentSelected ===   "年度"?"active":"")}onClick={()=>this.setState({currentSelected:"年度"})}>  <a href="#"  >年度</a></li>
        </ul>
        <SwitchBar/>
        <NoRanking/>

      </div>
    ) ;

  }

}
export default App4;
