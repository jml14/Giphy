$(document).ready(function() {
	
	var giphy = {
		topics: ["Donald Trump", "Barack Obama", "George W Bush", "Bill Clinton", "George HW Bush", "Ronald Reagan", "Jimmy Carter", "Gerald Ford", "Richard Nixon", "LBJ", "JFK"],

		newButton: function(president){
			var queryURL = "https://api.giphy.com/v1/gifs/search?q="+president+"&api_key=dc6zaTOxFJmzC&limit=10";
			$("#btn-target").append("<button class='searchBtn js-getImages' data-url='"+queryURL+"'>"+president+"</button>");
			$(".js-getImages").on("click",function(){
				giphy.getImages($(this).attr("data-url"));
			});
		},

		getImages: function(url){
			$.ajax({
				url: url,
				method: "GET"
			}).done(function(data) {
				$("#image-target").html("");
				
				for (var i=0; i<10; i++){

					var staticImageURL=data.data[i].images.fixed_height_still.url;
					var nonstaticImageURL=data.data[i].images.fixed_height.url;

					var newImageDiv = $("<div>");
					newImageDiv.addClass("gifContainer");

					newImageDiv.append(newImage);
					newImageDiv.append(rating);
					$("#image-target").append(newImageDiv);

					var newImage = $("<img>");
					newImage.addClass("js-image");
					newImage.addClass("gifImage");
					newImage.attr("src", staticImageURL);
					newImage.attr("data-static", staticImageURL);
					newImage.attr("data-nonstatic", nonstaticImageURL);
					
					var rating = $("<div>");
					rating.addClass("ratingText")
					rating.text("rating: "+ data.data[i].rating);

				}
				$(".js-image").on("click",function(){
					giphy.imageClickResponse(this);
				});
			});
			},

		imageClickResponse: function(object){
			if($(object).attr("data-static")===$(object).attr("src")){
				$(object).attr("src", $(object).attr("data-nonstatic"));
			}
			else{
				$(object).attr("src", $(object).attr("data-static"));
			}
			},
		
		initialize: function(){
			for (var i=0;i<this.topics.length;i++){
				this.newButton(this.topics[i]);
			}	
			},
		userButton: function(){	
			},
	};
	
	giphy.initialize();

});