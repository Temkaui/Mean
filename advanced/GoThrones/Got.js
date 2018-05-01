$(document).ready(function(){
	var arr=[229, 17, 362, 378];
	var num = 1;
	while (num < 5) {
		$(".house"+num+"").click(function(){
			$(".content").html("");
			$.get("https://anapioficeandfire.com/api/houses/"+arr[num-1]+"", function(data){
				console.log(data);
				console.log(arr[(num-1)]);
				$(".content").append("<h3>Name:"+data.name+"</h3>");
				$(".content").append("<hh4>Region:"+data.region+"</h4>");
			},"json");
		})
		num+=1;
	}
})