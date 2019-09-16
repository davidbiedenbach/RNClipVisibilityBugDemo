import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Button,
  NativeModules
} from 'react-native';

const {CustomVisibilityInspector} = NativeModules;

const ITEMS_COUNT = 100;
const INITIAL_TEXT = 'The list of natively visible items will appear here once you tap on the button. With the bug in effect, items that are fully clipped by their parent hierarchy will show as visible even though they should not.';
const Modes = { View: "View", ScrollView : "ScrollView", HorizontalScrollView: "HorizontalScrollView", FlatList: "FlatList" };

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      visibilityDesc: '',
      mode: Modes.View
    };

    this.onDescribeVisibility = this.onDescribeVisibility.bind(this);
  }

  async onDescribeVisibility() {
    this.setState({
      visibilityDesc: await CustomVisibilityInspector.inspect()
    });
  }

  render() {
    const { mode } = this.state;
    const b1Color = mode === Modes.View ? "#CFCFCF" : "#0080FF";
    const b2Color = mode === Modes.ScrollView ? "#CFCFCF" : "#0080FF";
    const b3Color = mode === Modes.FlatList ? "#CFCFCF" : "#0080FF";
    const b4Color = mode === Modes.HorizontalScrollView ? "#CFCFCF" : "#0080FF";
    return (
      <View style={styles.container}>
        <View style={{backgroundColor: 'lightgray', height: "75%", width: "75%", overflow: 'hidden'}} nativeID="visibilityInspect">
          {
            (() => {
              switch (mode) {
                case Modes.View:
                  return (
                    <View>
                    <Text style={styles.itemText}>This list is not scrollable</Text>
                    {
                      Array.from(
                        {length: ITEMS_COUNT},
                        (value, index) => <Text key={`item-${index}`} style={styles.itemText}>[Item #{index}]</Text>
                      )
                    }
                  </View>        
                  );
                case Modes.ScrollView:
                  return (
                    <ScrollView>
                    <Text style={styles.itemText}>This list is scrollable</Text>
                    {
                      Array.from(
                        {length: ITEMS_COUNT},
                        (value, index) => <Text key={`item-${index}`} style={styles.itemText}>[Item #{index}]</Text>
                      )
                    }
                    </ScrollView>        
                  );
                case Modes.HorizontalScrollView:
                  return (
                    <ScrollView horizontal={true} style={{backgroundColor:"#cfcfcf", overflow: 'hidden'}}>
                    <Text style={styles.itemText}>This list is scrollable</Text>
                    {
                      Array.from(
                        {length: ITEMS_COUNT},
                        (value, index) => <Text key={`item-${index}`} style={styles.itemText}>[Item #{index}]</Text>
                      )
                    }
                    </ScrollView>        
                  );
                case Modes.FlatList:
                  return (
                    <FlatList
                      data={Array.from({ length: ITEMS_COUNT }, (value, index) => index)}
                      renderItem={({ index }) => <Text key={`item-${index}`} style={styles.itemText}>[Item #{index}]</Text>}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  );        
              }
            })()
          }
        </View>

        <View style={{backgroundColor: 'lightskyblue', flex: 1, paddingHorizontal: 8}}>
          <View style={{marginBottom: 10, marginHorizontal: -8}}>
            <Button title="Tap on me" onPress={this.onDescribeVisibility}/>
          </View>

          {!this.state.visibilityDesc ? <Text style={styles.freeText}>{INITIAL_TEXT}</Text> : undefined}
          {this.state.visibilityDesc ? <Text style={{...styles.freeText, marginBottom: 5}}>Android says these items are visible:</Text> : undefined}
          <Text style={styles.freeText}>{this.state.visibilityDesc}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button
            color={b1Color}
            type="primary"
            title="View"
            onPress={() => {
              this.setState({ mode: Modes.View });
            }}
          />
          <Button
            color={b2Color}
            type="primary"
            title="ScrollView"
            onPress={() => {
              this.setState({ mode: Modes.ScrollView });
            }}
          />
          <Button
            color={b3Color}
            type="primary"
            title="FlatList"
            onPress={() => {
              this.setState({ mode: Modes.FlatList });
            }}
          />
          <Button
            color={b4Color}
            type="primary"
            title="HorizontalScrollView"
            onPress={() => {
              this.setState({ mode: Modes.HorizontalScrollView });
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    padding: 5
  },
  freeText: {
    textAlign: 'center',
  }
});
