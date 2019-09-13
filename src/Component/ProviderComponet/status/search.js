
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native'
import { RectButton, BorderlessButton } from 'react-native-gesture-handler';
import SearchLayout from 'react-navigation-addon-search-layout';
import { connect } from 'react-redux'
import { Container, Content, List, Card } from 'native-base'
import CustomerSerchResult from './searchResult'
class SearchScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  componentDidMount() {
    console.log(this.props.customer)
  }
  state = {
    searchText: null,

  };

  _handleQueryChange = searchText => {
    this.setState({ searchText });
  };

  // _executeSearch = () => {
  //   alert('do search!');
  // };

  render() {
    let { searchText } = this.state;
    return (
      <Container>
        <Content>
          <Card>
            <List>
              <SearchLayout
                onChangeQuery={this._handleQueryChange}
              // onSubmit={this._executeSearch}
              >
                {searchText ? (
                  <RectButton
                    style={{
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      borderBottomColor: '#eee',
                      // paddingVertical: 20,
                      // paddingHorizontal: 15,
                    }}
                  >
                    <CustomerSerchResult data={this.props.customer.customerdetails} searchText={this.state.searchText} />
                  </RectButton>
                ) : null}
              </SearchLayout>
            </List>
          </Card>
        </Content>
      </Container>

    );
  }
}
const mapStateToProps = (state) => {
  return {
    // userdata: state.auth,
    customer: state.providerstatus
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default connect(mapStateToProps)(SearchScreen)
