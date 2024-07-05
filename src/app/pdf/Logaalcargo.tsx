import {
  Document,
  Image,
  Page,
  PDFViewer,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import React from "react";
import SubTotal from "./SubTotal";

export default function Logaalcargo() {
  return (
    <PDFViewer className="w-full h-full">
      <Document>
        <Page size="A4" style={{ padding: 25 }}>
          <Image src="/images/customsBanner.png" />
          <View
            style={{
              backgroundColor: "rgb(8 47 73)",
              height: 90,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <Image src="/images/noxun.jpg" style={{ height: 90, width: 250 }} />
            <Text style={{ color: "white", fontSize: 30 }}>COTIZACION</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              fontSize: 12,
              paddingVertical: 10
            }}
          >
            <View>
              <Text>Datos de la cotizacion:</Text>
              <Text>ORIGEN: SHENZHEN, CHINA</Text>
              <Text>DESTINO: LA PAZ, BOLIVIA</Text>
            </View>
            <View>
              <Text>Fecha: 05-06-24</Text>
              <Text>No de presupuesto: 433458</Text>
              <Text>Id. del cliente: 92032</Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              fontSize: 12,
              paddingVertical: 10
            }}
          >
            <View>
              <Text>Cotizacion para: </Text>
              <Text>Nombre del cliente: JUAN PEREZ OLIVER</Text>
              <Text>Nombre de la compañia: NOXUN</Text>
              <Text>Calle, ciudad: Batallon Colorados #45, La Paz</Text>
              <Text>Numero de telefono: 71234567</Text>
              <Text>Incoterm en Transporte: </Text>
              <Text>EXW-AEREO</Text>
            </View>
            <Image src="/images/plane.png" style={{ width: 50, height: 50 }} />
            <View>
              <Text>Presupuesto valido hasta: 17-02-24</Text>
              <Text>T/T: 12 DIAS APROX</Text>
              <Text>Aerolinea: Lloyd Aereo Boliviano</Text>
            </View>
          </View>

          <View style={{paddingVertical: 20}}>
            <View style={styles.table}>
              <TableRow
                isBlue={true}
                isHeader={true}
                items={[
                  "VENDEDOR",
                  "TIPO DE TRANSPORTE",
                  "PESO TOTAL APROX.",
                  "VOLUMEN FINAL APROX",
                  "CONDICIONES DE PAGO",
                ]}
              />
              <TableRow
                items={[
                  "JOHN DOE",
                  "AEREO-EXW",
                  "70KGS",
                  "NO INFO",
                  "AL INICIO DEL TRAYECTO",
                ]}
              />
            </View>
          </View>
          <View style={styles.table}>
            <TableRow
              items={[
                "Cantidad",
                "Descripción",
                "Precio por unidad",
                "TIPO",
                "Importe",
              ]}
              isHeader={true}
            />
            <TableRow
              items={[
                "102.00",
                "FLETE AEREO",
                "USD 12.70",
                "Fijo",
                "USD 1,295.40",
              ]}
            />
            <TableRow
              items={[
                "1.00",
                "COSTOS EN ORIGEN",
                "USD 300.00",
                "Fijo",
                "USD 300.00",
              ]}
            />
            <TableRow
              items={[
                "1.00",
                "COSTOS EN DESTINO",
                "USD 150.00",
                "Fijo",
                "USD 150.00",
              ]}
              isRed={true}
            />
            <TableRow
              items={["1.00", "JET FEE", "USD 70.00", "Fijo", "USD 70.00"]}
            />
          </View>
          <View style={{display: 'flex', flexDirection: "row"}}>
            <View style={{fontSize: 12}}>
              <Text>Si tiene alguna duda sobre esta cotización, póngase en contacto con: </Text>
              <Text>Juan Perex, 71234567, test@example.com</Text>
              <Text>TODA CARGA DEBE CONTAR CON SEGURO DE MANERA OBLIGATORIA.</Text>
            </View>
            <SubTotal/>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

const styles = StyleSheet.create({
  table: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
  },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    padding: 5,
    fontSize: 10,
  },
  headerCell: {
    textAlign: "center",
    backgroundColor: "rgb(8 47 73)",
    color: "white",
    fontWeight: "bold",
  },
  redRow: {
    backgroundColor: "#F8CBAD",
  },
  blueRow: {
    backgroundColor: "rgb(8 47 73)"
  }
});

type TableRowProps = {
  items: any[]
  isHeader?: boolean
  isRed?: boolean
  isBlue?: boolean
}

const TableRow = ({ items, isHeader = false, isRed = false, isBlue=false }: TableRowProps) => (
  <View style={[styles.tableRow, isRed ? styles.redRow : {}, isBlue ? styles.blueRow : {}]}>
    {items.map((item: any, index: number) => (
      <View style={styles.tableCol} key={index}>
        <Text style={[styles.tableCell, isHeader ? styles.headerCell : {}]}>
          {item}
        </Text>
      </View>
    ))}
  </View>
);
