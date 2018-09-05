/**
 * 路由
 */
import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Bundle from './routerBundle';

// 首页
// const App = (props) => <Bundle load={() => import('../component/App')}>{(Chat) => <Chat {...props}/>}</Bundle>;
// 三列列表主页
 const Home = (props) => <Bundle load={() => import('../component/Home')}>{(Chat) => <Chat {...props}/>}</Bundle>;
// 首次交易 和 首次入金
// const TradeAndGold = (props) => <Bundle load={() => import('../component/TradeAndGold')}>{(Chat) => <Chat {...props}/>}</Bundle>;
// 开户流程详情
// const Step = (props) => <Bundle load={() => import('../component/Step')}>{(Chat) => <Chat {...props}/>}</Bundle>;
// 流程描述
// const StepTips = (props) => <Bundle load={() => import('../component/StepTips')}>{(Chat) => <Chat {...props}/>}</Bundle>;

export default class RouteMap extends React.Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path="/home" component={Home} />
        </Switch>
      </Router>
    );
  }
};