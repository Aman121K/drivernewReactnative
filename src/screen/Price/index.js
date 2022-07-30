import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import moment from 'moment';
const Price = ({navigation, route}) => {
  // console.log('second page data', route.params.paramKey);
  return (
    <View>
      {/* <Text style={{fontSize:20,fontWeight:'800',alignSelf:'center'}}>Booking Details Screen:</Text> */}
      <View style={{margin: '5%', marginTop: '10%'}}>
        <ScrollView>
          <View>
            <Text style={{fontSize: 18, fontWeight: 'bold',color:'black'}}>
              Driver for Local
            </Text>
          </View>
          <Grid>
            <Col size={30}>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Driver Type</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Regular</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Regular</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Chauffeur</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Chauffeur</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Regular</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Regular</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Chauffeur</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Chauffeur</Text>
              </Row>
            </Col>
            <Col size={15}>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Hour</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>6</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>6</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>6</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>6</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>8</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>8</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>8</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>8</Text>
              </Row>
            </Col>
            <Col size={15}>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Shift</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Day</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Night</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Day</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Night</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Day</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Night</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Day</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Night</Text>
              </Row>
            </Col>
            <Col size={18}>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Amount</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>500</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>700</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>800</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>1000</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>800</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>1000</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>1000</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>1500</Text>
              </Row>
            </Col>
            <Col size={20}>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Overtime</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>100</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>100</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>150</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>200</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>100</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>100</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>150</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>200</Text>
              </Row>
            </Col>
          </Grid>
          <View style={{marginTop: 20}}>
            <Text style={{fontSize: 18, fontWeight: 'bold',color:'black'}}>
              Driver for Out Station
            </Text>
          </View>
          <Grid>
            <Col size={100}>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Per Day</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>900</Text>
              </Row>
            </Col>
          </Grid>
          <View style={{marginTop: 20}}>
            <Text style={{fontSize: 18, fontWeight: 'bold',color:'black'}}>
              Driver for Drop
            </Text>
          </View>
          <Grid>
            <Col size={35}>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>From City</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Mumbai</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Chennai</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Mumbai</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Pune</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Mumbai</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Nashik</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Mumbai</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Bangalore</Text>
              </Row>
            </Col>
            <Col size={35}>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>To City</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Chennai</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Mumbai</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Pune</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Mumbai</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Nashik</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Mumbai</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Mumbai</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Mumbai</Text>
              </Row>
            </Col>
            <Col size={30}>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>Price</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>3000</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>3000</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>2000</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>2000</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>2000</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>2000</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>5000</Text>
              </Row>
              <Row style={styles.cell}>
                <Text style={styles.cellText}>5000</Text>
              </Row>
            </Col>
          </Grid>
        </ScrollView>
      </View>
    </View>
  );
};
export default Price;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
    padding: 16,
    paddingTop: 100,
    backgroundColor: '#fff',
  },
  cell: {
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  cellText: {
    marginLeft: '5%',
    color:'black'
  },
});
