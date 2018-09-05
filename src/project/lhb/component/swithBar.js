import React from  'react';
import Img from '../asset/asset.js';
import '../css/myboot.css';

class SwitchBar extends React.Component{
  constructor(props){
    super(props);
    this.state={
      currentSelect:'left'
    };
  }

  render() {
    return (
      <div id='switchBar'>
        <span id='individual'><a id={this.state.currentSelect=='left'?'activeLeft':'noactive'} onClick={()=>this.setState({currentSelect:"left"})}>个人赛</a></span>
        <span id='group'><a id={this.state.currentSelect=='right'?'activeRight':'noactive'}onClick={()=>this.setState({currentSelect:"right"})}>团体赛</a></span>
        <span className='clear'/>
      </div>
    );
  }

}
export default SwitchBar;
