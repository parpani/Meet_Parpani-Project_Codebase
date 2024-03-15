import React, { Component } from "react";
import {Alert, StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, SafeAreaView, Platform, Button } from "react-native";
import { DataTable, Divider } from 'react-native-paper';
import RestfulService from '.././services/restful';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './../assets/css/Styles'

class HomeScreen extends Component {
  static navigationOptions = {
    title:'Home'
  }

  constructor(props) {
    super(props);
    this.state = {
      tradingDetails:[],
      footerDetails:[],
      currentValueTotal:0,
      investmentValueTotal:0,
      todaysPNL:'',
      isLoading:false,
      showContent: false,
    }
  }

  componentDidMount() {
    this.fetchUserData();
  }
  componentHideAndShow = () => {
    this.setState(previousState => ({ showContent: !previousState.showContent }))
  } 

  fetchUserData = () => {
    var currentValueTotal = 0;
    var investmentValueTotal = 0;
    var todaysPNL = 0;
    var totalPNL = 0

    this.setState({loaderText: 'Loading...'});
    this.setState({isLoading:true});
    RestfulService.fetchData().then(response => {
      console.log("Data1", response.data)

      var userHolding = response.data.userHolding;
      //var userHolding = array.userHolding;
      console.log("userHolding", userHolding, userHolding.length)
 
      var tradingArr = new Array();
      for(var i=0;i<userHolding.length;i++){
        tradingArr.push({
          symbol: userHolding[i].symbol,
          quantity: userHolding[i].quantity,
          ltp: userHolding[i].ltp,
          avgPrice: userHolding[i].avgPrice,
          close: userHolding[i].close,
          currentValue: (userHolding[i].ltp * userHolding[i].quantity).toFixed(2),
          investmentValue: (userHolding[i].avgPrice * userHolding[i].quantity).toFixed(2),
          pnl: ((userHolding[i].ltp * userHolding[i].quantity) - (userHolding[i].avgPrice * userHolding[i].quantity)).toFixed(2),
          todaysPNL: ((userHolding[i].close - userHolding[i].ltp) * userHolding[i].quantity).toFixed(2)
        });
      }
      this.setState({ tradingDetails: tradingArr });
      console.log("Data2", this.state.tradingDetails)

      for(var i=0;i<userHolding.length;i++){
        currentValueTotal += parseFloat(tradingArr[i].currentValue);
        investmentValueTotal += parseFloat(tradingArr[i].investmentValue);
        todaysPNL += parseFloat(tradingArr[i].todaysPNL);
      }
      this.setState({ currentValueTotal: currentValueTotal });
      this.setState({ investmentValueTotal: investmentValueTotal });
      this.setState({ todaysPNL: todaysPNL });

      // console.log("Data3", this.state.currentValueTotal)
      // console.log("Data4", this.state.investmentValueTotal)
      // console.log("Data5", this.state.todaysPNL)

      totalPNL = (this.state.currentValueTotal - this.state.investmentValueTotal).toFixed(2);
      this.setState({ totalPNL: totalPNL });
      // console.log("Data6", this.state.totalPNL)
      this.setState({isLoading:false});
    }).catch(err => {
      console.log("Something went Wrong");
      this.setState({isLoading:false});
    });

  }

  render(){
    var index = 0;
    var rowData = this.state.tradingDetails.map((data,key)=>{
      index++;
      return(
        <View key={key} style={{flex:1}}>
          <DataTable.Row style={styles.firstRow}>
            <DataTable.Cell>
              <Text style={styles.boldText}>{data.symbol}</Text>
            </DataTable.Cell>

            <DataTable.Cell textStyle={styles.rightColumn}>LTP: 
              <Text style={styles.secondValue}> ₹ {data.ltp}</Text>
            </DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>{data.quantity}</DataTable.Cell>

            <DataTable.Cell textStyle={styles.rightColumn}>P/L: 
              <Text style={styles.secondValue}> ₹ {data.pnl}</Text>
            </DataTable.Cell>
            
          </DataTable.Row>

          <Divider style={{borderColor:'#e6e6e8', borderWidth:0.2, marginLeft:15}}/>
        </View>             
      )
    });
    

    return (
      <View style={{flex: 1}}>
        <Spinner
          animation='fade'
          visible={this.state.isLoading}
          textContent={this.state.loaderText}
          //textStyle={homeStyles.spinnerTextStyle}
          overlayColor={'rgba(0, 0, 0, 0.5)'}
        />

        <ScrollView style={styles.container}>
          <SafeAreaView>

            <View style={styles.whiteColor}>
              <DataTable>
                {rowData}
              </DataTable>
            </View> 

          </SafeAreaView>
        </ScrollView>
      
        <View>
        {
          this.state.showContent==false ?
          <TouchableOpacity title="sdfsf" style={[styles.row,{justifyContent: 'center',alignItems: 'center'}]} onPress={this.componentHideAndShow}>
            <Image style={styles.img} source={require('.././assets/img/arrow-up.png')}/>
          </TouchableOpacity>:null
        }
        </View>
        

        <View style={[styles.whiteColor, styles.footer]}>
        {
          this.state.showContent ?
          <View style={{paddingBottom:10}}>
            <TouchableOpacity title="sdfsf" style={[styles.row,{justifyContent: 'center',alignItems: 'center'}]} onPress={this.componentHideAndShow}>
              <Image style={styles.img} source={require('.././assets/img/arrow-down.png')}/>
            </TouchableOpacity>

            <DataTable>
              <DataTable.Row style={styles.firstRow}>
                <DataTable.Cell>
                  <Text style={styles.boldText}>Current Value:</Text>
                </DataTable.Cell>

                <DataTable.Cell>
                  <Text style={styles.secondCell}> ₹ {this.state.currentValueTotal}</Text>
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row style={styles.firstRow}>
                <DataTable.Cell>
                  <Text style={styles.boldText}>Total Investment</Text>
                </DataTable.Cell>

                <DataTable.Cell>
                  <Text style={styles.secondCell}> ₹ {this.state.investmentValueTotal}</Text>
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row style={styles.firstRow}>
                <DataTable.Cell>
                  <Text style={styles.boldText}>Today's Profit & Loss:</Text>
                </DataTable.Cell>

                <DataTable.Cell>
                  <Text style={styles.secondCell}> ₹ {this.state.todaysPNL}</Text>
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </View>:null
        }

          <View>
            <DataTable>
              <DataTable.Row style={styles.firstRow}>
                <DataTable.Cell>
                  <Text style={styles.boldText}>Profit & Loss:</Text>
                </DataTable.Cell>

                <DataTable.Cell>
                  <Text style={styles.secondCell}> ₹ {this.state.totalPNL}</Text>
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </View>
        </View>

      </View>
        
    );
  }
}

export default HomeScreen;
