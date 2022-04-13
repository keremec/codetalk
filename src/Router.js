import React, {useEffect, useState} from 'react';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import FlashMessage from 'react-native-flash-message';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Forgot from './pages/Forgot';
import Rooms from './pages/Rooms';

//Firebase
import auth from '@react-native-firebase/auth';
import ColorCode from './utils/ColorCode';
import Messages from './pages/Messages';

const Stack = createStackNavigator();

export default function Router() {
  //Login Management
  const [userSession, setUserSession] = useState();
  useEffect(() => {
    auth().onAuthStateChanged(user => setUserSession(!!user));
  }, []);

  //Page Stacks
  const AuthStack = () => {
    return (
      <Stack.Navigator
        theme={DarkTheme}
        screenOptions={{animationEnabled: false}}>
        <Stack.Screen
          name="LoginPage"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPage"
          component={Forgot}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignupPage"
          component={Signup}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  };
  const AppStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Rooms"
          component={Rooms}
          options={{
            headerStyle: {
              backgroundColor: ColorCode('dark2'),
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            title: 'Rooms',
            headerTintColor: ColorCode('white'),
          }}
        />
        <Stack.Screen
          name="Messages"
          component={Messages}
          options={{
            headerStyle: {
              backgroundColor: ColorCode('grey0'),
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            headerTintColor: ColorCode('white'),
          }}
        />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userSession ? (
          <Stack.Screen
            name="AppStack"
            component={AppStack}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="LoginStack"
            component={AuthStack}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}
