$('.choose_gender').click(function(e){
	if (e.target.getAttribute("id") == "choose_female") {
		gender = "girl";
	} else {
		gender = "boy";
	}
	getAPI();
});

$('.match_no').click(function(){
	getAPI();
});

function getAPI(){
	$.get("http://www.dragonsofmugloar.com/dating/api/profile/random?gender="+gender, function(apidata) {
		loadMatchmaking(apidata);
		showPanel(2);
	});
}

function loadMatchmaking(data){
	clearMatchmaking();
	var userName = data.name;
	var userDesc = data.description;
	var userGender = data.gender;
	var userID = data.id;
	var userImage = data.image;
	userLikes = data.likesYou;
	$('.matchmaking .stats').find('.user_img').append("<img src='"+userImage+"' />");
	$('.matchmaking .stats').find('.user_name').append(userName);
	$('.matchmaking .stats').find('.user_desc').append(userDesc);
	$('.matchmaking .stats').find('.user_gender').append(userGender);
	
};

$('.match_yes').click(function(){
	if(userLikes == true){
		$('.matchmaking .profile').clone().appendTo('.matches_list');
		$('.matches_btn').addClass('flash');
		setTimeout(function(){
			$('.matches_btn').removeClass('flash');
		}, 500);
	}
	getAPI();
});

$('.matches_list').on('click', '.profile', function(){
	$(this).toggleClass('open');
});

function clearMatchmaking(){
	$('.matchmaking .stats').find('.user_stat').empty();
}

function showPanel(panel){
	if (panel == 1){
		$('.gender_screen').removeClass('hidden');
		$('.matchmaking').addClass('hidden');
		$('.matches').addClass('hidden');
	} else if (panel == 2) {
		$('.gender_screen').addClass('hidden');
		$('.matchmaking').removeClass('hidden');
		$('.matches').addClass('hidden');
	} else {
		$('.gender_screen').addClass('hidden');
		$('.matchmaking').addClass('hidden');
		$('.matches').removeClass('hidden');
	}
};

$('.logo_menu .home_btn').click(function(){
	showPanel(1);
});
$('.logo_menu .more_btn').click(function(){
	if (gender !== undefined){
		showPanel(2);
	}
});
$('.logo_menu .matches_btn').click(function(){
	showPanel(3);
});

var gender;
var userLikes;