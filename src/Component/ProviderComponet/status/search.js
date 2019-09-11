
import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native'
import { RectButton, BorderlessButton } from 'react-native-gesture-handler';
import SearchLayout from 'react-navigation-addon-search-layout';
class ResultScreen extends React.Component {
    static navigationOptions = {
      title: 'Result',
    };
   
    render() {
      return (
        <View style={styles.container}>
          <Text>{this.props.navigation.getParam('text')} result!</Text>
        </View>
      );
    }
  }
class SearchScreen extends React.Component {
    static navigationOptions = {
      header: null,
    };
   
    state = {
      searchText: null,
    };
   
    _handleQueryChange = searchText => {
      this.setState({ searchText });
    };
   
    _executeSearch = () => {
      alert('do search!');
    };
   
    render() {
      let { searchText } = this.state;
   
      return (
        <SearchLayout
          onChangeQuery={this._handleQueryChange}
          onSubmit={this._executeSearch}>
          {searchText ? (
            <RectButton
              style={{
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: '#eee',
                paddingVertical: 20,
                paddingHorizontal: 15,
              }}
              onPress={() =>
                this.props.navigation.navigate('Result', {
                  text: this.state.searchText,
                })
              }>
              <Text style={{ fontSize: 14 }}>{searchText}!</Text>
            </RectButton>
          ) : null}
        </SearchLayout>
      );
    }
  }
  export default SearchScreen
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });