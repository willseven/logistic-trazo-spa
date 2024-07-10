"use client";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import { Fragment } from "react";
import { createTw } from "react-pdf-tailwind";

const tw = createTw({});

export default function PdfLogaalcargo() {
  return (
    <PDFViewer className="w-full h-full">
      <Document>
        <Page size="LETTER" style={tw("p-4 text-sm")}>
          <Image src="/images/customsBanner.png" />
          <View style={tw("w-full flex flex-row justify-end")}>
            <View
              style={tw("flex flex-row bg-slate-300 w-96 justify-evenly my-2")}
            >
              <Text>La Paz</Text>
              <Text>9 de julio de 2024</Text>
            </View>
          </View>
          <View style={tw("w-full flex flex-row")}>
            <View style={tw("w-2/3")}>
              <View style={tw("flex flex-row gap-2 mb-4")}>
                <Text style={tw("flex-auto px-2 py-1 bg-blue-700 text-white")}>
                  VALIDEZ DE LA OFERTA
                </Text>
                <Text style={tw("flex-auto px-2 py-1 bg-slate-300")}>
                  31 de Mayo
                </Text>
                <Text style={tw("flex-auto px-2 py-1 bg-blue-700 text-white")}>
                  SERVICIO
                </Text>
                <Text style={tw("flex-auto px-2 py-1 bg-slate-300")}>
                  MULTIMODAL
                </Text>
              </View>
              <View style={tw("flex gap-2")}>
                {dataRows.map((item, index) => (
                  <View key={index} style={tw("flex flex-row gap-2")}>
                    <Text style={tw("flex-auto p-1 bg-blue-700 text-white")}>
                      {item.label1}
                    </Text>
                    <Text style={tw("flex-auto p-1 bg-slate-300")}>
                      {item.value1}
                    </Text>
                    <Text style={tw("flex-auto p-1 bg-blue-700 text-white")}>
                      {item.label2}
                    </Text>
                    <Text style={tw("flex-auto p-1 bg-slate-300")}>
                      {item.value2}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={tw("flex flex-row items-center justify-center w-1/3")}>
              <Image
                style={tw("w-48 h-48")}
                src="/images/logoLogaalcargo.png"
              />
            </View>
          </View>
          <View style={tw("flex flex-row w-full")}>
            <View style={tw("w-2/3 flex flex-row justify-evenly p-6")}>
              <View style={tw("flex gap-2")}>
                <Text style={tw("bg-blue-700 text-white px-6 py-1")}>PESO</Text>
                <View
                  style={tw(
                    "flex flex-row justify-center bg-slate-300 px-6 py-1"
                  )}
                >
                  <Text style={tw("")}>Kg</Text>
                </View>
              </View>
              <View style={tw("flex gap-2")}>
                <Text style={tw("bg-blue-700 text-white px-6 py-1")}>
                  VOLUMEN
                </Text>
                <View
                  style={tw(
                    "flex flex-row justify-center bg-slate-300 px-6 py-1"
                  )}
                >
                  <Text style={tw("")}>17,7 M^3</Text>
                </View>
              </View>
              <View style={tw("flex gap-2")}>
                <Text style={tw("bg-blue-700 text-white px-6 py-1")}>
                  CW TAXABLE
                </Text>
                <View
                  style={tw(
                    "flex flex-row justify-center bg-slate-300 px-6 py-1"
                  )}
                >
                  <Text style={tw("")}>17.7</Text>
                </View>
              </View>
            </View>
            <View style={tw("w-1/3 flex items-center gap-2")}>
              <Text style={{ fontSize: 30 }}>COTIZACION</Text>
              <View style={tw("flex flex-row w-full")}>
                <Text style={tw("flex-1 p-1")}>Nro: </Text>
                <Text style={tw("flex-1 bg-slate-300 p-1")}>COT24-245PH</Text>
              </View>
            </View>
          </View>
          <View style={tw("flex w-full border")}>
            <View style={tw("flex flex-row bg-teal-600 text-white w-full")}>
              <View
                style={tw(
                  "w-1/5 flex-auto border-r flex flex-row justify-center items-center"
                )}
              >
                <Text>DESCRIPCION DEL SERVICIO</Text>
              </View>
              <View
                style={tw(
                  "w-1/5 flex-auto border-r flex flex-row justify-center items-center"
                )}
              >
                <Text>PRECIO UNIT.</Text>
              </View>
              <View
                style={tw(
                  "w-1/5 flex-auto border-r flex flex-row justify-center items-center"
                )}
              >
                <Text>CANTIDAD</Text>
              </View>
              <View
                style={tw(
                  "w-1/5 flex-auto border-r flex flex-row justify-center items-center"
                )}
              >
                <Text>IMPUESTOS</Text>
              </View>
              <View
                style={tw(
                  "w-1/5 flex-auto border-r flex flex-row justify-center items-center"
                )}
              >
                <Text>TOTAL</Text>
              </View>
            </View>
            <TableRows rows={rows} />
          </View>
          <View></View>
          <View style={tw("flex flex-row w-full text-xs")}>
            <Text>
              FORMA DE PAGO: Marítimo: Al contado 10 días antes del arribo.
              Terrestre: Al contado, a la llegada del contenedor a la Aduana.
              Aéreo: Durante el día de arribo a POD. NOTA: Todo pago que se
              realice debe ser moneda nacional según T/C vigente. SEGURO: Si el
              cliente no acepta el seguro de Logaalcargo, la carga será
              transportada con las condiciones de bajo riesgo por cuenta del
              cliente final en Bolivia. Logaalcargo no se hará responsable por
              demoras en caso de paros, bloqueos y huelgas que dificulten el
              transito, generando multas por sobreetadías y demoras, y de la
              misma manera en aduana, en caso de despacho en recinto aduanero
              solo se cuenta con 3 días libres, caso contrario se incurrirá en
              stand by, que sera agregado a la nota de cobranza. CONCILIACIÓN Y
              ARBITRAJE.- A través de la presente cláusula se acuerda que todas
              las controversias o diferencias con relación a la interpretación,
              aplicación cumplimiento y ejecuión del presente contrato, se
              resolverán en el Centro de Conciliación y Arbitraje Comercial
              (CCAC) de la Cámara de Industria y Comercio.
            </Text>
          </View>
          <Image src="/images/customsFooter.png" />
        </Page>
      </Document>
    </PDFViewer>
  );
}

function TableRows({ rows }: { rows: Rate[] }) {
  return (
    <Fragment>
      {rows.map((row, index) => (
        <View
          key={index}
          style={[
            tw("flex flex-row w-full"),
            index % 2 === 0 ? tw("bg-white") : tw("bg-gray-100"),
          ]}
        >
          <View
            style={tw(
              "w-1/5 flex-auto border-r flex flex-row justify-start items-center p-2"
            )}
          >
            <Text style={tw("text-black")}>{row.serviceDesc}</Text>
          </View>
          <View
            style={tw(
              "w-1/5 flex-auto border-r flex flex-row justify-end items-center p-2"
            )}
          >
            <Text style={tw("text-black")}>{row.unitPrice}</Text>
          </View>
          <View
            style={tw(
              "w-1/5 flex-auto border-r flex flex-row justify-end items-center p-2"
            )}
          >
            <Text style={tw("text-black")}>{row.quantity}</Text>
          </View>
          <View
            style={tw(
              "w-1/5 flex-auto border-r flex flex-row justify-end items-center p-2"
            )}
          >
            <Text style={tw("text-black")}>{row.taxes}</Text>
          </View>
          <View
            style={tw(
              "w-1/5 flex-auto border-r flex flex-row justify-end items-center p-2"
            )}
          >
            <Text style={tw("text-black")}>{row.total}</Text>
          </View>
        </View>
      ))}
    </Fragment>
  );
}

type Rate = {
  serviceDesc: string;
  unitPrice: string;
  quantity: string;
  taxes: string;
  total: string;
};

const rows: Rate[] = [
  {
    serviceDesc: "FLETE MARITIMO",
    unitPrice: "125.00",
    quantity: "17.70",
    taxes: "",
    total: "2,212.50",
  },
  {
    serviceDesc: "COM.TRANSF BANC. 10 %",
    unitPrice: "221.25",
    quantity: "1.00",
    taxes: "",
    total: "221.25",
  },
  {
    serviceDesc: "ADM FEE 20%",
    unitPrice: "442.50",
    quantity: "1.00",
    taxes: "",
    total: "442.50",
  },
  {
    serviceDesc: "FLETE TERRESTRE",
    unitPrice: "45.00",
    quantity: "17.70",
    taxes: "",
    total: "796.50",
  },
  {
    serviceDesc: "APERTURA",
    unitPrice: "50.00",
    quantity: "1.00",
    taxes: "",
    total: "50.00",
  },
  {
    serviceDesc: "DESCONSOLIDACION",
    unitPrice: "30.00",
    quantity: "1.00",
    taxes: "",
    total: "30.00",
  },
  {
    serviceDesc: "LOGISTIC FEE",
    unitPrice: "25.00",
    quantity: "1.00",
    taxes: "",
    total: "25.00",
  },
];

const dataRows = [
  {
    label1: "CLIENTE",
    value1: "David Antezana",
    label2: "TEL.",
    value2: "71234567",
  },
  {
    label1: "LINEA",
    value1: "MSC",
    label2: "TIPO",
    value2: "LCL",
  },
  {
    label1: "INCOTERM",
    value1: "FOB",
    label2: "RUTA",
    value2: "DIRECTA",
  },
  {
    label1: "POL",
    value1: "NINGBO - CHINA",
    label2: "T/T APROX.",
    value2: "39 DIAS",
  },
  {
    label1: "POD",
    value1: "LA PAZ - BOLIVIA",
    label2: "MONEDA",
    value2: "USD",
  },
];
