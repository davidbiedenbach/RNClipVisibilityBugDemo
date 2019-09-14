import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  NativeModules
} from 'react-native';

const {CustomVisibilityInspector} = NativeModules;

const ITEMS_COUNT = 100;
const INITIAL_TEXT = 'The list of natively visible items will appear here once you tap on the button. According to the bug, the items hidden by this panel (drawn below it, z-axis-wise) will show as well (though they should not).';

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      visibilityDesc: ''
    };

    this.onDescribeVisibility = this.onDescribeVisibility.bind(this);
  }

  async onDescribeVisibility() {
    this.setState({
      visibilityDesc: await CustomVisibilityInspector.inspect()
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{backgroundColor: 'lightgray', height: "75%", overflow: 'hidden'}} nativeID="visibilityInspect">
          <ScrollView>
            <Text style={styles.itemText}>This list is scrollable</Text>
            {
              Array.from(
                {length: ITEMS_COUNT},
                (value, index) => <Text key={`item-${index}`} style={styles.itemText}>[Item #{index}]</Text>
              )
            }
          </ScrollView>
        </View>

        <View style={{backgroundColor: 'lightskyblue', flex: 1, paddingHorizontal: 8}}>
          <View style={{marginBottom: 10, marginHorizontal: -8}}>
            <Button title="Tap on me" onPress={this.onDescribeVisibility}/>
          </View>

          {!this.state.visibilityDesc ? <Text style={styles.freeText}>{INITIAL_TEXT}</Text> : undefined}
          {this.state.visibilityDesc ? <Text style={{...styles.freeText, marginBottom: 5}}>Android says these items are visible:</Text> : undefined}
          <Text style={styles.freeText}>{this.state.visibilityDesc}</Text>
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
