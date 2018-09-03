var xml = new XMLHttpRequest();
xml.onreadystatechange = function() {
    if (xml.readyState === 4) {
        if (xml.status === 200) {
            var data = JSON.parse(xml.responseText);
            data.match.forEach(function(file) {
                console.log(file)
                btn.onkeyup = function() {
                    if (this.value.indexOf(file)) {
                        console.log(this.value)
                    }
                }
            })
        }
    }
}
xml.open('get', '/api/dataList', true);
xml.send();