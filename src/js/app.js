var xml = new XMLHttpRequest();
xml.onreadystatechange = function() {
    if (xml.readyState === 4) {
        if (xml.status === 200) {
            var data = JSON.parse(xml.responseText);
            data.match.forEach(function(file) {
                console.log(file)
                btn.onkeyup = function() {
                    var str = '';
                    if (this.value.indexOf(file)) {
                        str += '<p>' + file + '</p>';
                    }
                    div1.innerHTML = str
                }
            })
        }
    }
}
xml.open('get', '/api/dataList', true);
xml.send();