# NativeBase HelpdeskAppTemplate v2.0

## Get Started

#### 1. Installation

On the command prompt run the following commands

```sh
$ git clone git@github.com:bsusta/HelpdeskAppTemplate.git

$ cd HelpdeskAppTemplate/

$ npm install

$ react-native upgrade

$ react-native link

```

#### 2. Simulate for iOS

*	Run the following command in your terminal.

```sh
$ react-native run-ios
```

#### 3. Simulate for Android

*	Make sure you have an **Android emulator** installed and running.

*	Run the following command in your terminal.

```sh
$ react-native run-android
```

#### 3. Instalation redux-devtools for react-native

##### Installation for browser Chrome

* from Chrome Web Store
  https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd

##### Instalation for projects

Use redux-devtools-extension package from npm

```sh
$ npm install --save-dev remote-redux-devtools@0.5.0
```

https://github.com/jhen0409/remote-redux-devtools-on-debugger

```sh
$ npm install --save-dev remote-redux-devtools-on-debugger
```

Add command to your project's package.json:

```diff
"scripts": {
  "postinstall": "remotedev-debugger [options]"
}
```

```sh
<<<<<<< HEAD
npm install
=======
$ npm install
$ npm install -g react-native-cli
>>>>>>> 19ea4ba7d31d081890d633ab292a9cf704f82e91
```

Napojenie devTools na configureStore.js

```diff
export default function configureStore(onCompletion: () => void): any {
    const enhancer = compose(
        applyMiddleware(thunk, promise),
        devTools({
            name: 'HelpdeskAppTemplate', realtime: true,
        }),
    );

    const store = createStore(reducers, {}, enhancer);
    // persistStore(store, { storage: AsyncStorage }, onCompletion);

    return store;
}
```

<<<<<<< HEAD

=======
Spustenie redux remote debbuger cez prehliadač po spustení simlulátora na adrese:
http://localhost:8081/debugger-ui
>>>>>>> 19ea4ba7d31d081890d633ab292a9cf704f82e91

