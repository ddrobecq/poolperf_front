function drawChart (arrPocket, arrFoul) {

	var chart = new CanvasJS.Chart("chartContainer", {
		animationEnabled: true,
		theme: "light2",
		backgroundColor: null,
		axisX:{
			minimum:0
		},
		legend:{
			fontSize: 20,			
		},
		data: [{        
			type: "line",
			showInLegend: true,
			markerType: "square",
			color: "green",
			lineThickness: 4,
			name: "Empoches",
			indexLabelFontSize: 16,
			dataPoints: arrPocket,
		},
		{
			type: "line",
			showInLegend: true,
			markerType: "square",
			color: "red",
			lineThickness: 2,
			name: "Fautes",
			indexLabelFontSize: 16,
			dataPoints: arrFoul,
		}
		]
	});
	chart.render();
}
