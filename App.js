import React, {Component} from "react";
import {StyleSheet, Text, View} from 'react-native';
import {createAppContainer} from "react-navigation";
import {createDrawerNavigator} from "react-navigation-drawer";
import {createBottomTabNavigator} from "react-navigation-tabs";
import {createStackNavigator} from "react-navigation-stack";
import BoardScreen from "./screens/BoardScreen";
import BoardsScreen from "./screens/BoardsScreen";
import CreateBoardScreen from "./screens/CreateBoardScreen";
import CreateNoteScreen from "./screens/CreateNoteScreen";
import EditBoardScreen from "./screens/EditBoardScreen";
import EditNoteScreen from "./screens/EditNoteScreen";
import FavouriteBoardScreen from "./screens/FavouriteBoardScreen";
import FavouriteNoteScreen from "./screens/FavouriteNoteScreen";
import HomeScreen from "./screens/HomeScreen.js";
import LoadingScreen from "./screens/LoadingScreen.js";
import LoginScreen from "./screens/LoginScreen.js";
import NoteScreen from "./screens/NoteScreen";
import SignUpScreen from "./screens/SignUpScreen.js";
import * as firebase from "firebase";
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDWCUdu7qKxIVoluqP8cxgmUlF4ID9S8j8",
    authDomain: "",
    databaseURL: "https://pinit-72da5.firebaseio.com/",
    projectId: "pinit-72da5",
    storageBucket: ""
};

firebase.initializeApp(firebaseConfig);

let HomeNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        CreateBoard: CreateBoardScreen
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#6f747d',
                height: 50
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    });

let FavouriteNavigator = createStackNavigator(
    {
        Favourite: FavouriteBoardScreen,
        FavouriteNote: FavouriteNoteScreen,
    },
    {
        initialRouteName: 'Favourite',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#6f747d',
                height: 50
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    });

let BoardsNavigator = createStackNavigator(
    {
        Boards: BoardsScreen,
        Board: BoardScreen,
        CreateBoard: CreateBoardScreen,
        EditBoard: EditBoardScreen,
        CreateNote: CreateNoteScreen,
        Note: NoteScreen,
        EditNote: EditNoteScreen
    },
    {
        initialRouteName: 'Boards',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#6f747d',
                height: 50
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    });

let DrawerNavigator = createDrawerNavigator(
    {
        Home: HomeNavigator,
        Favourite: FavouriteNavigator,
        Boards: BoardsNavigator
    },
    {
        initialRouteName: 'Home'
    });

let LoginNavigator = createStackNavigator(
    {
        Loading: LoadingScreen,
        PinIt: DrawerNavigator,
        Login: LoginScreen,
        SignUp: SignUpScreen
    },
    {
        initialRouteName: 'Loading',
        /* The header config from HomeScreen is now here */
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#f4511e',
                height: 50
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',

            },

        },
    });


const AppContainer = createAppContainer(LoginNavigator);


export default class App extends Component {
    render() {
        return (
            <AppContainer/>
        );
    }
}