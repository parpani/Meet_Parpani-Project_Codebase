import {StyleSheet} from 'react-native'

export default StyleSheet.create({

  container: {
    flex:1,
    backgroundColor:'#c1c1c7',
    height:'100%'
  },
  footer:{
    paddingBottom:15,
  },
  img: {
    width: 20,
    height: 20,
  },
  row:{
    height:20,
    backgroundColor:'#ffffff'
  },
  firstRow: {
    marginBottom: -15,
    borderBottomColor: '#ffffff'
  },
  secondCell:{
    flex:1,
    flexDirection:'row',
    textAlign: 'right',
  },
  secondValue:{
    fontWeight: 'bold',
    fontSize: 14,
    color:'#000000',
    flex:1,
    flexDirection:'row',
    textAlign: 'right',
  }, 
  rightColumn: {
    flex:1,
    flexDirection:'row',
    textAlign:'right'
  },
  whiteColor:{
    backgroundColor:'#ffffff',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 16,
    color:'#000000'
  },
  
});