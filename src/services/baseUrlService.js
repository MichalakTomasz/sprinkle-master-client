const getBaseUrl = () => {
    const defaulUrl = 'http://sprinkle-master:3200/'
    let fieldValue = "";
   
    const xhr = new XMLHttpRequest();
    xhr.open("GET", '../../dist/ipAddress.json', false)
  try {
    xhr.send();
    if (xhr.status === 200) {
      const jsonData = JSON.parse(xhr.responseText);
      const ipAddress = jsonData['ipAddress']
      fieldValue = ipAddress ? `http://${ipAddress}/` : defaulUrl 
    }
  } catch (error) {
    fieldValue = defaulUrl
  }

  return fieldValue;
}

export default getBaseUrl
