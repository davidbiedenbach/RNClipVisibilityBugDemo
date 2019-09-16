# RNClipVisibilityBugDemo

A React-Native demo app that demonstrates [RN Issue 23870](https://github.com/facebook/react-native/issues/23870).

And [Bugfix PR #26334](https://github.com/facebook/react-native/pull/26334)

## Screenshots - Using React-Native Master

### Views inside a ReactViewGroup do not report as clipped

![BugScreen1](/assets/BugScreen1.jpg?raw=true "Bug Screen 1")

### Views inside a ReactScrollView do not report as clipped

![BugScreen2](/assets/BugScreen2.jpg?raw=true "Bug Screen 2")

### Views inside a FlatList report clipping properly

![BugScreen3](/assets/BugScreen3.jpg?raw=true "Bug Screen 3")

### Views inside a ReactHorizontalScrollView do not report clipping properly

![BugScreen4](/assets/BugScreen4.jpg?raw=true "Bug Screen 4")

## Screenshots using RN PR #26334

### Views inside a ReactViewGroup report clipping properly

![FixScreen1](/assets/FixScreen1.jpg?raw=true "Fix Screen 1")

### Views inside a ReactScrollView report clipping properly

![FixScreen2](/assets/FixScreen2.jpg?raw=true "Fix Screen 2")

### Views inside a FlatList still report clipping properly

![FixScreen3](/assets/FixScreen3.jpg?raw=true "Fix Screen 3")

### Views inside a ReactHorizontalScrollView report clipping properly

![FixScreen4](/assets/FixScreen4.jpg?raw=true "Fix Screen 4")
