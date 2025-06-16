export const generateXMLLog = (data: {
  event: string;
  origin?: string;
  destination?: string;
  departDate?: string;
  returnDate?: string;
  userId?: string;
  passengers?: object;
  cabinClass?: string;
}) => {
  const timestamp = new Date().toISOString();

  return `
<log>
  <timestamp>${timestamp}</timestamp>
  <event>${data.event}</event>
  ${data.userId ? `<userId>${data.userId}</userId>` : ''}
  ${data.origin ? `<origin>${data.origin}</origin>` : ''}
  ${data.destination ? `<destination>${data.destination}</destination>` : ''}
  ${data.departDate ? `<departDate>${data.departDate}</departDate>` : ''}
  ${data.returnDate ? `<returnDate>${data.returnDate}</returnDate>` : ''}
  ${data.cabinClass ? `<cabinClass>${data.cabinClass}</cabinClass>` : ''}
  ${
    data.passengers
      ? `<passengers>${Object.entries(data.passengers)
          .map(([key, val]) => `<${key}>${val}</${key}>`)
          .join('')}</passengers>`
      : ''
  }
</log>`.trim();
};


export const sendLogToBackend = async (xmlLog: string) => {
  try {
    await fetch("http://localhost:8000/api/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/xml",
      },
      body: xmlLog,
    });
  } catch (err) {
    console.error("Failed to send log:", err);
  }
};

