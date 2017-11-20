
import React, { Component } from "react"

import {
  Text,
  View,
} from "react-native";

import Launch from "./components/Launch";

import Register from "./components/Register";

import Login from "./components/Login";

import Login2 from "./components/Login2";

import Login3 from "./components/Login3";

import HelloWold from './components/HelloWord'

import PageOne from './components/PageOne'

import PageTwo from './components/PageTwo'

import {
  Scene,
  Router,
  Actions,
  Reducer,
  ActionConst,
  Tabs,
  Modal,
  Stack,
  Lightbox,
} from "react-native-router-flux";

import Error from "./components/Error";

import Home from "./components/Home";

import TabView from "./components/TabView";

import TabIcon from "./components/TabIcon";

import EchoView from "./components/EchoView";

import MessageBar from "./components/MessageBar";

const reducerCreate = params => {
  const defaultReducer = new Reducer(params)
  return (state, action) => {
    console.log("ACTION:", action)
    return defaultReducer(state, action)
  }
}

const getSceneStyle = () => ({
  backgroundColor: "white",
  shadowOpacity: 1,
  shadowRadius: 3,
})

const scenes = Actions.create(
  <Scene key="root">
    <Modal hideNavBar>
      <Lightbox leftButtonTextStyle={{ color: 'red' }} backButtonTextStyle={{ color: 'orange' }}>
        <Stack hideNavBar hideTabBar titleStyle={{ alignSelf: 'center' }}>

          {/* 启动页导航栈，这里注册进去的组件，都是push跳转，并且
           指定了程序启动后第一个显示出来的页面-> initial */}
          <Scene key="launch" component={Launch} title="Launch" initial />

          {/* push
           clone，只有当前有导航时才能获取到navigation.state.key的值 */}
          <Scene
            key="echo"
            hideTabBar
            back
            clone
            component={EchoView}
            getTitle={({ navigation }) => navigation.state.key}
          />

          {/* 注册模块导航栈 */}
          <Scene key="register" back>
            <Scene key="_register" component={Register} title="Register" />
            <Scene key="register2" component={Register} title="Register2" />
            {/* 这里使用了type这个属性，设置界面的跳转样式 */}
            <Scene
              key="home"
              component={Home}
              title="Replace"
              type={ActionConst.REPLACE}
            />
          </Scene>

          {/* 底部的tabBar组件，这个组件中有几个tab就包裹几个子组件 */}
          <Tabs
            key="tabbar"
            gestureEnabled={false}
            showLabel={true}
            tabs
            tabBarStyle={{backgroundColor: "#eee"}}
            activeBackgroundColor="#ddd"
          >
            {/* 第一个Tab导航栈，使用了Stack标签，这里选中第一个tab，使用
             initial 参数 */}
            <Stack
              key="tab1"
              initial
              title="Tab #1"
              tabBarLabel="TAB #1"
              icon={TabIcon}
              navigationBarStyle={{ backgroundColor: '#789' }}
              titleStyle={{ color: 'yellow', alignSelf: 'center' }}>
              <Scene
                key="tab1_1"
                component={TabView}
                title="Tab #1_1"
                rightTitle="Right"/>
              <Scene
                key="tab1_2"
                component={TabView}
                title="Tab #1_2"
                back
                titleStyle={{ color: 'black', alignSelf: 'center' }}/>
            </Stack>
            {/* 第二个Tab，使用了Scene标签 */}
            {/* 这里没有发现上面使用的stack和下面的scene标签没有什么区别 */}
            <Scene
              key="tab2"
              title="Tab #2"
              icon={TabIcon}
              titleStyle={{ color: '#e74c3c', alignSelf: 'center' }}>
              <Scene
                key="tab2_1"
                component={TabView}
                title="Tab #2_1"
                renderRightButton={() => <Text>Right</Text>}/>
              <Scene
                key="tab2_2"
                component={TabView}
                title="Tab #2_2"
                onBack={() => alert('onBack button!')}
                backTitle="Back!"
                panHandlers={null}/>
            </Scene>

            {/* 后面这三个是正常的tabBar用法 */}
            <Scene key="tab3" component={TabView} title="Tab #3" icon={TabIcon} rightTitle="Right3" onRight={()=>{}}/>
            {/* 当不需要导航时，使用 hideNavBar 属性隐藏导航栏 */}
            <Scene key="tab4" component={HelloWold} title="Tab #4" hideNavBar icon={TabIcon}/>
            <Scene key="tab5" component={TabView} title="Tab #5" icon={TabIcon}/>
          </Tabs>

          <Scene
            key="helloWord"
            component={HelloWold}
            hideTabBar
          />

        </Stack>
        {/* Model组件 */}
        <Scene key="error" component={Error}/>
      </Lightbox>

      <Stack
        key="login"
        titleStyle={{alignSelf: "center"}}>
        <Scene
          component={Login}
          title="Login"
          key="loginModal"
          onExit={() => console.log("onExit")}
          leftTitle="Cancel" onLeft={Actions.pop}/>
        <Scene
          key="loginModal2"
          component={Login2}
          title="Login2"
          backTitle="Back"
          panHandlers={null}
          duration={1}/>
        <Scene
          key="loginModal3"
          hideNavBar
          component={Login3}
          title="Login3"
          panHandlers={null}
          duration={1}/>
      </Stack>
    </Modal>
    <Scene key="pageOne" component={PageOne} title="PageOne"/>
    <Scene key="pageTwo" component={PageTwo} title="PageTwo" />
  </Scene>
)

class Example extends Component{

  render() {
    return (
      <View style={{flex: 1}}>
        <Router
          scenes={scenes}
          createReducer={reducerCreate}
          tintColor="orange"
          getSceneStyle={getSceneStyle}
        />
        <MessageBar />
      </View>
    )
  }
}

export default Example