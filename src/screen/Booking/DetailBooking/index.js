import React from 'react';
import {View,Text, ScrollView, StyleSheet} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import moment from 'moment';
const BookingDetails=({navigation,route})=>{
    console.log("second page data",route.params.paramKey);
    return(
        <View>
            <View style={{margin:'5%',marginTop:'10%'}}>
                <ScrollView>
                    {route.params.paramKey.reporting_date?
                <Grid>
        <Col size={50}>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Booing ID</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Date</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Time</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Booking Type</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Duty Type</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Car</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Driver Type</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Address</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Landmark</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Location</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Shift</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Remarks</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Driver Name</Text>
          </Row>
          {/* <Row style={styles.cell}>
            <Text style={styles.cellText}>Driver Phone</Text>
          </Row> */}
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Status</Text>
          </Row>
        </Col>
        <Col size={50}>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{route.params.paramKey.id}</Text>
          </Row>
          <Row style={styles.cell}>
          {/* {moment(item.created_at).format('DD-MM-YYYY') */}
            <Text style={styles.cellText}>{moment(route.params.paramKey.created_at).format('DD-MM-YYYY')}</Text>
          </Row>
          <Row style={styles.cell}>
          {/* moment().format('LT'); */}
            <Text style={styles.cellText}>{route.params.paramKey.reporting_time}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Booking Type</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{route.params.paramKey.duty_type}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{route.params.paramKey.car_detail}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{route.params.paramKey.driver_type}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{route.params.paramKey.address_details.address}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{route.params.paramKey.address_details.landmark}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{route.params.paramKey.address_details.locality}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{route.params.paramKey.shift}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{route.params.paramKey.remark}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}></Text>
          </Row>
          {/* <Row style={styles.cell}>
            <Text style={styles.cellText}>Driver Phone</Text>
          </Row> */}
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{route.params.paramKey.status}</Text>
          </Row>
        </Col>
      
      </Grid>:null}

    {route.params.paramKey.salary?
      <Grid>
        <Col size={50}>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Booing ID</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Date</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Driver Type</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Car</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Duty Hours</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Salary</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Over Time</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Reporting Time</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Weekly Off</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Reporting Address</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Landmark</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Location</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Interview Date</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Interview Time</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Age</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Status</Text>
          </Row>
        </Col>
        <Col size={50}>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{route.params.paramKey.id}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{moment(route.params.paramKey.interview_date).format('DD-MM-YYYY')}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{route.params.paramKey.driver_type}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{route.params.paramKey.car_detail}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{route.params.paramKey.duty_hours}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{route.params.paramKey.salary}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{route.params.paramKey.over_time}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{route.params.paramKey.reporting_time}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{route.params.paramKey.woff}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{route.params.paramKey.address_details.landmark}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{route.params.paramKey.address_details.locality}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{route.params.paramKey.address_details.landmark} {route.params.paramKey.address_details.city}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{moment(route.params.paramKey.interview_date).format('DD-MM-YYYY')}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{route.params.paramKey.reporting_timeFrom} to {route.params.paramKey.reporting_timeTo}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{route.params.paramKey.age_from} to {route.params.paramKey.age_to}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{route.params.paramKey.status}</Text>
          </Row>
        </Col>
      
      </Grid>:null}

      {route.params.paramKey.pickup_date?
        <Grid>
        <Col size={50}>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Booing ID</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Date</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Time</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Booking Type</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Duty Type</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Car</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Driver Type</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Address</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Landmark</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Location</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Shift</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Remarks</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Driver Name</Text>
          </Row>
          {/* <Row style={styles.cell}>
            <Text style={styles.cellText}>Driver Phone</Text>
          </Row> */}
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Status</Text>
          </Row>
        </Col>
        <Col size={50}>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>Booing ID</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{route.params.paramKey.reporting_date || route.params.paramKey.pickup_date}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{route.params.paramKey.reporting_time || route.params.paramKey.pickup_time}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{route.params.paramKey.booking_type}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{route.params.paramKey.booking_type}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{route.params.paramKey.car_detail}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{route.params.paramKey.driver_type}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{route.params.paramKey.address_details.address}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{route.params.paramKey.address_details.landmark}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{route.params.paramKey.address_details.locality}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{route.params.paramKey.shift}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{route.params.paramKey.remark}</Text>
          </Row>
          <Row style={styles.cell}>
            <Text style={styles.cellText}>DS XYZ</Text>
          </Row>
          {/* <Row style={styles.cell}>
            <Text style={styles.cellText}>Driver Phone</Text>
          </Row> */}
          <Row style={styles.cell}>
            <Text style={styles.cellText}>{route.params.paramKey.status}</Text>
          </Row>
        </Col>
      
      </Grid>:null}


                {/* <Text>Address:- {route.params.paramKey.address_details.address}</Text>
                <Text>City:- {route.params.paramKey.address_details.city}</Text>
                <Text>Landmark:- {route.params.paramKey.address_details.landmark}</Text>
                <Text>Locality:- {route.params.paramKey.address_details.locality}</Text>
                <Text>Zip code:- {route.params.paramKey.address_details.zip}</Text>
                <Text>Car details:-{route.params.paramKey.address_details.car_detail} </Text>
                <Text>Booking Date:- {route.params.paramKey.address_details.created_at}</Text>
                <Text>Reporting Date:-{route.params.paramKey.reporting_date} </Text>
                <Text>Reporting Time:- {route.params.paramKey.reporting_time}</Text>
                <Text>Cab Type:-{route.params.paramKey.car_type}</Text>
                <Text>cab_pricing_id:{route.params.paramKey.cab_pricing_id}</Text>
                <Text>Time & Distance:- {route.params.paramKey.for_hour}</Text>
                <Text>Total Price:- {route.params.paramKey.price}</Text>
                <Text>Total Distance:- {route.params.paramKey.total_distance}</Text> */}
                </ScrollView>
            </View>
        </View>
    )
}
export default BookingDetails;

const styles=StyleSheet.create({
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
      cellText:{
          marginLeft:'5%',
          color:'black'
      }
})