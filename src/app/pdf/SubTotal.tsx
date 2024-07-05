import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    fontSize: 12,
    width: '50%',
    marginLeft: 'auto',
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E4',
    borderBottomStyle: 'solid',
    alignItems: 'center',
    height: 24,
    fontStyle: 'bold',
  },
  description: {
    width: '50%',
    textAlign: 'left',
    paddingLeft: 8,
  },
  amount: {
    width: '50%',
    textAlign: 'right',
    paddingRight: 8,
  },
  subtotalRow: {
    backgroundColor: '#E6E6FA',
  },
  totalRow: {
    backgroundColor: 'rgb(8 47 73)',
    color: 'white',
  },
});

const SubTotal: React.FC = () => (
  <View style={styles.container}>
    <View style={[styles.row, styles.subtotalRow]}>
      <Text style={styles.description}>Subtotal</Text>
      <Text style={styles.amount}>USD 1,815.40</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.description}>Otros</Text>
      <Text style={styles.amount}></Text>
    </View>
    <View style={[styles.row, styles.totalRow]}>
      <Text style={styles.description}>TOTAL</Text>
      <Text style={styles.amount}>USD 1,815.40</Text>
    </View>
  </View>
);

export default SubTotal;