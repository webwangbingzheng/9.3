var xml = new XMLHttpRequest();
xml.onreadystatechange = function() {
    if (xml.readyState === 4) {
        if (xml.status === 200) {
            var data = JSON.parse(xml.responseText);
            console.log(data)
        }
    }
}
xml.open('get', '/api/dataList', true);
xml.send();