$(function(){

	var mymap = L.map('mapid').setView([41.8919300, 12.5113300], 13);
	var popup = L.popup();

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);


	$.getJSON(
		"http://dati.lazio.it/catalog/api/action/datastore_search?resource_id=e2151b09-7350-4fc3-b7e3-592d3d271833&limit=100",
		function(data) {
			data.result.records.forEach(function(record) {
				var lat = record.lat
				var lon = record.lon
				if(lat&&lon){
					L.marker([lat,lon])
						.bindTooltip(
							"<p>" + record["DENOMINAZIONE IMPIANTO SPORTIVO"] + "</p>" +
							"<p>" + record["ATTIVITA"]
						)
						.addTo(mymap);
					console.log(record) 
				}
				
			});
		}
	);

});
//

