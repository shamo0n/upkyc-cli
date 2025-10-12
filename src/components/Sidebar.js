import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
// import Ionicons from 'react-native-vector-icons/dist/FontAwesome';
import {colors} from '../Helpers/UserHelper';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

function Item({item, navigate}) {
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => navigate(item.name)}>
      <Ionicons name={item.icon} size={32} color={colors.MAIN_COLOR} />
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );
}

class Sidebar extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     ImagePath: '../Assets/profile.png',
  //   };
  // }
  // async componentDidMount() {
  //   const {
  //     getUser: {userDetails},
  //   } = this.props;
  //   this.setState({ImagePath: userDetails.custImage[0]});
  // }
  state = {
    routes: [
      {
        name: 'Home',
        icon: 'ios-home',
      },
      {
        name: 'Create Pin',
        icon: 'md-key',
      },
      {
        name: 'Contact Us',
        icon: 'ios-contacts',
      },
    ],
  };
  render() {
    const {
      getUser: {userDetails},
    } = this.props;
    // this.state = {
    //   Imagepath: require('../Assets/profile.png'),
    // };
    const Imagepath = userDetails
      ? 'data:image/jpeg;base64,' + userDetails.custImage[0]
      : '../Assets/profile.png';
    return (
      <View style={styles.container}>
        <Image
          source={{
            uri: Imagepath,
          }}
          style={styles.profileImg}
        />
        <Text style={{fontWeight: 'bold', fontSize: 16, marginTop: 10}}>
          {userDetails ? userDetails.CustomerLogin : ''}
        </Text>
        {/* <Text style={{color: 'gray', marginBottom: 10}}>
          {userDetails ? userDetails.CS_DisplayID : ''}
        </Text> */}
        <View style={styles.sidebarDivider} />
        <FlatList
          style={{width: '100%', marginLeft: 30}}
          data={this.state.routes}
          renderItem={({item}) => (
            <Item item={item} navigate={this.props.navigation.navigate} />
          )}
          keyExtractor={item => item.name}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 40,
    alignItems: 'center',
    flex: 1,
  },
  listItem: {
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    marginLeft: 20,
  },
  header: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  profileImg: {
    width: 110,
    height: 110,
    marginTop: 0,
    borderRadius: 110 / 2,
  },
  sidebarDivider: {
    height: 1,
    width: '100%',
    backgroundColor: 'lightgray',
    marginVertical: 5,
  },
});

mapStateToProps = state => ({
  getUser: state.userReducer.getUser,
});

export default connect(mapStateToProps, null)(Sidebar);
