import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    color: "#1155cc",
  },
  header: {
    fontSize: 10,
    marginBottom: 20,
  },
  table: {
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000000",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
  },
  tableCol: {
    flex: 1,
    padding: 5,
  },
  tableHeader: {
    backgroundColor: "#4472c4",
    color: "#ffffff",
  },
  tableCell: {
    fontSize: 8,
  },
  total: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "right",
  },
  footer: {
    fontSize: 8,
    marginTop: 20,
  },
  blueText: {
    color: "#1155cc",
  },
});

// Create Document Component
const PdfDocument = () => (
  <PDFViewer className="w-full h-full">
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={{backgroundColor: "#4472c4"}}>
          <Text style={styles.title}>COTIZACIÓN</Text>
        </View>

        <View style={styles.header}>
          <Text>Fecha: 03-07-24</Text>
          <Text>N.º de presupuesto: 962023</Text>
          <Text>ORIGEN: SHENZHEN, CHINA</Text>
          <Text>DESTINO: LA PAZ, BOLIVIA</Text>
          <Text>Nombre del cliente: BORIS BERNARDO QUEZADA</Text>
          <Text>T/T: 12 DIAS APROX</Text>
          <Text>Número de teléfono: 76590083</Text>
          <Text>Presupuesto válido hasta: 15-07-24</Text>
        </View>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Cantidad</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Descripción</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Precio por unidad</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>TIPO</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Importe</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>102.00</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>FLETE AEREO</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>USD 12.70</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Fijo</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>USD 1,295.40</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>1.00</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>COSTOS EN ORIGEN</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>USD 300.00</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Fijo</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>USD 300.00</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>1.00</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>COSTOS EN DESTINO</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>USD 150.00</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Fijo</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>USD 150.00</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>1.00</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>JET FEE</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>USD 70.00</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Fijo</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>USD 70.00</Text>
            </View>
          </View>
        </View>

        <Text style={styles.total}>Subtotal USD 1,815.40</Text>
        <Text style={[styles.total, styles.blueText]}>TOTAL USD 1,815.40</Text>

        <View style={styles.footer}>
          <Text style={styles.blueText}>NOTAS</Text>
          <Text>
            NOTA. TOMAR EN CUENTA QUE POR LA SITUACION QUE ESTAMOS VIVIENDO EN
            EL PAIS, SE COBRARA EL 10% DE COMISION BANCARIA
          </Text>
          <Text>
            - Si no se paga en fecha estipulada se deberá penalizar el pago de
            un 15% del total de la nota de débito.
          </Text>
          <Text>
            - Tiempos en Destino: Desconsolidación en Montevideo en aprox. 3
            días hab. Salidas en consolidado terrestre a Santa Cruz, son
            semanales. Tránsito Terrestre es de aprox. 7 días.
          </Text>
          <Text>
            - Cotización no incluye SEGURO (0,35% s/Valor o Min. USD 50,00). En
            caso de requerir este servicio, se requiere solicitud de cotización
            expresa.
          </Text>
          {/* Add more notes as needed */}
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

export default PdfDocument;
