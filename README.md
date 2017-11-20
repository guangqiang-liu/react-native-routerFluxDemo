# react-native-router-flux实战详解(一)

react-native-router-flux组件基础使用教程分为一二两部分教程。教程一主要讲解router-flux的使用方式，教程二主router-flux官方提供的各种API。

[ react-native-router-flux实战详解(二)](http://www.jianshu.com/p/735a7e404147)

# 特点
在使用过程中，跟react-native提供的navigator的区别是你不需要拥有navigator对象。你可以在任意地方使用简单的语法去控制scene的切换，如：Actions.login({username, password}) or Actions.profile({profile}) or 甚至 Actions.profile(123) 

所有的参数都将被注入到this.props中给Sene组件使用

# 常用功能介绍
* 正向跳转 
* 正向跳转并传值 
* 反向跳转 
* 反向跳转并传值 
* 指定页面跳转 
* 指定页面跳转并传值

**正向跳转**

假设情景：从Home页跳转到Profile页面，Profile场景的key值为profile

* 不带参数 onPress={() => {Actions.proflie()}}
* 带参数onPress={() => {Actions.proflie({key: value})}}

在Profile界面接收参数：`this.props.key`

**反向跳转**

假设情景：从Profile页返回Home页面

* 返回上一页面，不带参数Actions.pop()
* 返回上一页面，带参数Actions.pop({refresh: ({key: value})})
* 指定回退页面数Actions.pop({popNum: 2})
* 指定回退页面数，带参数Actions.pop({popNum: 2, refresh:({key: value})})
* 返回指定页面Actions.popTo('home')

# 注意
* refresh是框架自带函数，可用于刷新属性（props）
* Actions.pop({refresh: ({key: value})}) // 用于刷新回退到的页面的属性
* Actions.refresh('params') // 用于刷新当前页面的属性对应回退页面刷新属性，即接受传递的参数

* 接收参数

```
// 1. 必须在componentWillReceiveProps(nextProps)生命周期中接受传递的参数
// 2. 该生命周期方法中的参数必须叫做nextProps
// 3. 所有传递过来的参数都包含在nextProps参数中
// 4. 以nextProps.PARAM_NAME的方式获取指定的参数
componentWillReceiveProps(nextProps) {
    // 假设前一个页面传递过来一个名字叫做isRefresh的布尔型参数
    if(nextProps.isRefresh) {
        // TODO 根据需求执行相关操作
        ......
    }
}
```

# 如何使用
* `npm i react-native-router-flux --save`

* 在你的index.js级别的文件中使用Scene组件定义你的scenes，并且Scene组件作为Router的子节点。因为后面Scene将由Router来控制其行为。

```
import {Scene, Router} from 'react-native-router-flux'

class App extends React.Component {
  render() {
    return <Router>
      <Scene key="root">
        <Scene key="login" component={Login} title="Login"/>
        <Scene key="register" component={Register} title="Register"/>
        <Scene key="home" component={Home}/>
      </Scene>
    </Router>
  }
}

// 或者，在编译期定义你所有的scenes，并在后面的Router里面使用

import {Actions, Scene, Router} from 'react-native-router-flux'

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="login" component={Login} title="Login"/>
    <Scene key="register" component={Register} title="Register"/>
    <Scene key="home" component={Home}/>
  </Scene>
)

class App extends React.Component {
  render() {
    return <Router scenes={scenes}/>
  }
}

```

* 定义好之后，在任意地方通过导入 `import {Actions} from 'react-native-router-flux'` 获得Actions 对象，Actions对象将是我们操作Scenes的遥控器。通过Actions我们可以向Router发出动作让Router控制Scene变化。

# 详细使用教程请参照简书
[http://www.jianshu.com/p/953189770d87](http://www.jianshu.com/p/953189770d87)