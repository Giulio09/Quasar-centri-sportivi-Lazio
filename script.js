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

			var attivitas = {},
				markers = [];

			data.result.records.forEach(function(record) {

				var lat = record.lat
				var lon = record.lon
				

				if(lat&&lon){

					record["ATTIVITA"].split(",").forEach(function(attivita) {
						attivitas[attivita] = (attivitas[attivita] || 0) + 1;
					});

					markers.push({
						attivita: record["ATTIVITA"],
						marker: L.marker([lat,lon])
							.bindTooltip(
								"<p>" + record["DENOMINAZIONE IMPIANTO SPORTIVO"] + "</p>" +
								"<p>" + record["ATTIVITA"] + "</p>"
							)
							.addTo(mymap)
					});
				}
				
			});

			console.log(attivitas, d3.entries(attivitas));

			var divs = d3.select("#attivitas").selectAll("div")
				.data(d3.entries(attivitas).sort(function(a,b) { return a.value - b.value; }).reverse())
				.enter()
				.append("div");

			divs.append("input")
				.attr("type","radio")
				.attr("class","attivita")
				.attr("name", "attivita")
				.on("click", function(d) {
					console.log(d, markers);
				});

			divs.append("label")
				.attr("for", function(d){
					return d.key.toLowerCase();
				})
				.text(function(d){
					return d.key + " ("+d.value+")";
				});

				
		}
	);

});
//

