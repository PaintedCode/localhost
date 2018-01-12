// PaintedCode.js

 console.log("author:  Jeffrey Burns");
 console.log("email:   Jeff@PaintedCode.com");
 console.log("version: 20171228");

/* code placed in each page to launch code

<span id="PaintedCode"></span>


<span id="page_top"></span><script type="text/javascript">// <![CDATA[
$(document).ready(function(){paintedcode($(location).attr('pathname'));});
// ]]></script>


// step_zip=1, step_date=4, step_delivery=64, step_meals=2, step_times=8, step_allergies=16, step_person=32
// step_meals is shared with bridal and office

*/



//(function(){


var  zip_found;

var  pc_button; // used to track the button that launched function

// page setup
var  pc_counter = 0;  // used to pass number of pages needed to be loaded by JSON
var  pc_page ;  // used to index the current page,  derived from a scan of pc_pages[]
//var  pc_programs = ["skinny","beast","knocked-up","getting-hitched"];
var  pc_programs = ["skinny","beast","knocked-up","office-fuel","keto","getting-hitched"];

//var  pc_pages = ["3-day-skinny-trial","5-day-skinny-trial","5-day-skinny","7-day-skinny","3-day-beast-trial","5-day-beast-trial","5-day-beast","7-day-beast","3-day-knocked-up-trial","5-day-knocked-up-trial","5-day-knocked-up","7-day-knocked-up","getting-hitched"];
var  pc_pages = ["3-day-skinny-trial","5-day-skinny-trial","5-day-skinny","7-day-skinny","3-day-beast-trial","5-day-beast-trial","5-day-beast","7-day-beast","3-day-knocked-up-trial","5-day-knocked-up-trial","5-day-knocked-up","7-day-knocked-up","3-day-office-fuel-trial","5-day-office-fuel-trial","5-day-office-fuel","7-day-office-fuel-trial","3-day-keto-trial","5-day-keto-trial","5-day-keto","7-day-keto","getting-hitched"];

var  pc_change_page_html = [];

//  used for the info box
var  pc_info_box_a,pc_info_box_b,pc_info_box_c;
var  pc_box_text = [];

var pc_smoothie_name = [];
var pc_bar_name = [];
//var  i = 0;

// array used to hold product pointer and product title display in info box
var  pc_subscription    // used when sending to shopify cart to specify recurring order
var  pc_plan;			// used to specify plan (trial = 1 , office = 2 , bridal = 3, normal = 7)
var  pc_total_products  // number of product pages for the current program
var  pc_product = [];
var  pc_product_title = [] ;  // used to display program on info box
var  pc_products = ["","-breakfast","-lunch","-breakfast-lunch","-dinner","-breakfast-dinner","-lunch-dinner","-breakfast-lunch-dinner"];
var  pc_bridal_products = ["","-bride","-groom","-both"]
var  pc_product_handle;  // used to identify the base URL of the current page
var  pc_plan_days;

// array of zipcodes available for delivery
var  pc_zipcodes =["10001","10011","10018","10019","10020","10036","10010","10016","10017","10022","10012","10013","10014","10004","10005","10006","10007","10038","10280","10002","10003","10009","10021","10028","10044","10065","10075","10128","10023","10024","10025"];


// variables used to update the cart display and pass to add_to_cart()
var  allergies             = 0;
var  allergy_text          = "none";
var  shipping	           = 0;
var  ship	               = 0;
var  grand_total           = 0;


// variables used to select meal/bridal selections
var  meal				      = 1;   //used to index meal plans (1-7)
var  meal_id                  = [];  //array used for shopify product id
var  meal_id_price            = [];  //array used for holding non-allergy prices
var  meal_allergies_id        = [];  //array used for shopify product id with allergy
var  meal_allergies_id_price  = [];  //array used for holding allergy prices

// variables used for tracking progess through steps
var  step_zip              = 0;
var  step_date             = 0;
var  step_meals            = 0;
var  step_times            = 0;
var  step_allergies        = 0;
var  step_person		   = 0;

var pc_person_dropdown;

// variables used for delivery step

var  pc_delivery_time = 0;
var  pc_delivery_times = ["10 pm - 8 am", "8 am - 11 am", "10 pm - 12 am","8 pm - 6 am"];

var  deliver = true;
var  pickup = 0;
var locations = [
      ['Drive 495'        , 40.722183,  -73.999842,  '495 Broadway, Fl. 2'  ,'New York, NY','10012','7:00am -10:00am',0],
      ['Drive 433'        , 40.744715,  -73.982845,  '443 Park Avenue South','New York, NY','10022','7:00am -10:00am',1],
      ['CLAY Manhattan'   , 40.7368588, -73.9948591, '25 West 14th Street'  ,'New York, NY','10013','7:00am -10:00am',2]
   ];


var  deliver = true;
var  pickup = 0;


var  map;
var  gMapsLoaded = false;
var  map_displayed = false

//a = false;

/*
//   color scheme
var  color_yellow    = "#FDEC00";
var  color_green     = "#33cc33";

var  pc_color = "black";
var  pc_color_hover = "white";
var  pc_color_selected = "white";

var  pc_background = "white";
var  pc_background_hover = "black";
var  pc_background_selected = "#777777";


var  pc_step_color = "black";
var  pc_step_color_hover = "white";
var  pc_step_color_selected = "white";

var  pc_step_background = "white";
var  pc_step_background_hover = "black";
var  pc_step_background_selected = "#777777";

var  pc_debugger_data;
*/


//debug colors
/*
pc_color 					= "black";
pc_color_hover				= "white";
pc_color_selected 			= "white";

pc_background 				= "white";
pc_background_hover 		= "black";
pc_background_selected 		= "green";

pc_step_color 				= "black";
pc_step_color_hover 		= "black";
pc_step_color_selected 		= "white";

pc_step_background 			= "white";
pc_step_background_hover 	= "#fdeb00";
pc_step_background_selected	= "green";

*/

// end debug colors
/*
var pc_help[0]="Enter the name you want on the label of the meal"];
var pc_help[1]="Enter the zipcode where you want the meal delivered"];
var pc_help[2]="Select the date you want the meals to start being delivered"];
var pc_help[3]="Select the time you want the meals delivered"];
var pc_help[4]="Select which meals you want"];
var pc_help[5]="Select which allergies you have"];
var pc_help[6]="Tell us about yourself"];
*/




function pc_order_test()  {

//called from around 2171-id="stepTimes_4


  // console.log("pc_order_test:");

}



//old start location
function  paintedcode (pc_path_name) {
   pc_product_handle = pc_path_name.slice(7);
   pc_load_page (pc_product_handle);

  //  console.log("PaintedCode");

}

function PaintedCode (pc_button)  {



  // pc_button = x;

   // find the URL that launched function
   pc_URL = window.location.href ;
   pc_URL = pc_URL.slice(32);

//   	console.log("pc_URL: "  + pc_URL);
//     console.log ("button: " + pc_button);

   for (i =0 ; i <  pc_programs.length; i++) {


      if  (pc_URL == pc_programs[i]) {
       //  pc_URL_index = i;
         break;
      };
   };

//  console.log("pc_programs: "+pc_programs[i]);


  // sets the current page
   pc_offset = (i * 4) + pc_button ;

//  console.log("pc_offset: "+pc_offset);
//  console.log("pc_pages[pc_offset]: "+pc_pages[pc_offset]);

   pc_load_page (pc_pages[pc_offset]);

}


function pc_load_page (pc_product_handle) {

//   console.log("pc_load_page");
//   console.log("pc_product_handle: "+pc_product_handle);

   // initalize site-wide variables

   load_variables();
  // set pc_page to pc_product_handle array index number
  // pc_page is system-wide variable to identfy current page
  for (i =0 ; i < pc_pages.length; i++) {

     if  (pc_product_handle == pc_pages[i]) {
       pc_page=i;
 //      console.log("pc_page"+pc_page);
       break;
     };
   };

  // initialize page specific variables and load page layout

  // pc_subscription is used by add_to_cart() to specify reccurring order when sending to shopify cart- 1279
  // meal = used to index the type of meal plan (1-7 constructed from breakfast= 1, lunch=2, dinner=4)
  // pc_plan used to define the different type of program (trial=1 normal=7, bridal=3, office=2)
  // pc_total_products also used to know how many products to download from shopify (1 for trial , 7 for standard subscription)
  // pc_plan_days is used to calculate the cost per day displayed



   switch (pc_product_handle) {

   case "3-day-skinny-trial":

      meal                 = 1;
      pc_subscription 	   = 0;
      pc_plan		   	   = 1;
      pc_total_products    = 1;
      pc_plan_days         = 3;
      product_info (pc_product_handle);
      document.getElementById("PaintedCodePlan").innerHTML="";
      document.getElementById("PaintedCodeTrial").innerHTML=pc_five_steps;
      steps ();
      break;

   case "5-day-skinny-trial":


      meal                 = 1;
      pc_subscription 	   = 0;
      pc_plan		   	   = 1;
      pc_total_products    = 1;
      pc_plan_days         = 5;
      product_info (pc_product_handle);
      document.getElementById("PaintedCodePlan").innerHTML="";
      document.getElementById("PaintedCodeTrial").innerHTML=pc_five_steps;
      steps ();
      break;

   case "5-day-skinny":

      meal                 = 7;
      pc_subscription 	   = 1;
      pc_plan		   	   = 7;
      pc_total_products    = 7;
      pc_plan_days         = 5;
      product_info (pc_product_handle);
      document.getElementById("PaintedCodeTrial").innerHTML="";
      document.getElementById("PaintedCodePlan").innerHTML=pc_six_steps;
      steps ();
      break;

   case "7-day-skinny":

      meal                 = 7;
      pc_subscription 	   = 1;
      pc_plan		   	   = 7;
      pc_total_products    = 7;
      pc_plan_days         = 7;
      product_info (pc_product_handle);
      document.getElementById("PaintedCodeTrial").innerHTML="";
      document.getElementById("PaintedCodePlan").innerHTML=pc_six_steps;
      steps ()
      break;

   case "3-day-beast-trial":

      meal                 = 1;
      pc_subscription 	   = 0;
      pc_plan		   	   = 1;
      pc_total_products    = 1;
      pc_plan_days         = 3;
      product_info (pc_product_handle);
      document.getElementById("PaintedCodePlan").innerHTML="";
      document.getElementById("PaintedCodeTrial").innerHTML=pc_five_steps;
      steps ();
      break;

   case "5-day-beast-trial":

      meal                 = 1;
      pc_subscription 	   = 0;
      pc_plan		   	   = 1;
      pc_total_products    = 1;
      pc_plan_days         = 5;
      product_info (pc_product_handle);
      document.getElementById("PaintedCodePlan").innerHTML="";
      document.getElementById("PaintedCodeTrial").innerHTML=pc_five_steps;
      steps ();
      break;

   case "5-day-beast":

      meal                 = 7;
      pc_subscription 	   = 1;
      pc_plan		   	   = 7;
      pc_total_products    = 7;
      pc_plan_days         = 5;
      product_info (pc_product_handle);
      document.getElementById("PaintedCodeTrial").innerHTML="";
      document.getElementById("PaintedCodePlan").innerHTML=pc_six_steps;
      steps ();
      break;

   case "7-day-beast":

      meal                 = 7;
      pc_subscription 	   = 1;
      pc_plan		   	   = 7;
      pc_total_products    = 7;
      pc_plan_days         = 7;
      product_info (pc_product_handle);
      document.getElementById("PaintedCodeTrial").innerHTML="";
      document.getElementById("PaintedCodePlan").innerHTML=pc_six_steps;
      steps ();
      break;

   case "3-day-knocked-up-trial":

      meal                 = 1;
      pc_subscription 	   = 0;
      pc_plan		   	   = 1;
      pc_total_products    = 1;
      pc_plan_days         = 3;
      product_info (pc_product_handle);
      document.getElementById("PaintedCodePlan").innerHTML="";
      document.getElementById("PaintedCodeTrial").innerHTML=pc_five_steps;
	  steps ();
      break;

    case "5-day-knocked-up-trial":

      meal                 = 1;
      pc_subscription 	   = 0;
      pc_plan		   	   = 1;
      pc_total_products    = 1;
      pc_plan_days         = 5;
      product_info (pc_product_handle);
      document.getElementById("PaintedCodePlan").innerHTML="";
      document.getElementById("PaintedCodeTrial").innerHTML=pc_five_steps;
      steps ();
      break;

   case "5-day-knocked-up":

      meal                 = 7;
      pc_subscription 	   = 1;
      pc_plan		   	   = 7;
      pc_total_products    = 7;
      pc_plan_days         = 5;
      product_info (pc_product_handle);
      document.getElementById("PaintedCodeTrial").innerHTML="";
      document.getElementById("PaintedCodePlan").innerHTML=pc_six_steps;
      steps ();
      break;

   case "7-day-knocked-up":

      meal                 = 7;
      pc_subscription 	   = 1;
      pc_plan		   	   = 7;
      pc_total_products    = 7;
      pc_plan_days         = 7;
      product_info (pc_product_handle);
      document.getElementById("PaintedCodeTrial").innerHTML="";
      document.getElementById("PaintedCodePlan").innerHTML=pc_six_steps;
      steps ();
      break;
       
	case "3-day-keto-trial":

      meal                 = 1;
      pc_subscription 	   = 0;
      pc_plan		   	   = 1;
      pc_total_products    = 1;
      pc_plan_days         = 3;
      product_info (pc_product_handle);
      document.getElementById("PaintedCodePlan").innerHTML="";
      document.getElementById("PaintedCodeTrial").innerHTML=pc_five_steps;
	  steps ();
      break;

    case "5-day-keto-trial":

      meal                 = 1;
      pc_subscription 	   = 0;
      pc_plan		   	   = 1;
      pc_total_products    = 1;
      pc_plan_days         = 5;
      product_info (pc_product_handle);
      document.getElementById("PaintedCodePlan").innerHTML="";
      document.getElementById("PaintedCodeTrial").innerHTML=pc_five_steps;
      steps ();
      break;

   case "5-day-keto":

      meal                 = 7;
      pc_subscription 	   = 1;
      pc_plan		   	   = 7;
      pc_total_products    = 7;
      pc_plan_days         = 5;
      product_info (pc_product_handle);
      document.getElementById("PaintedCodeTrial").innerHTML="";
      document.getElementById("PaintedCodePlan").innerHTML=pc_six_steps;
      steps ();
      break;

   case "7-day-keto":

      meal                 = 7;
      pc_subscription 	   = 1;
      pc_plan		   	   = 7;
      pc_total_products    = 7;
      pc_plan_days         = 7;
      product_info (pc_product_handle);
      document.getElementById("PaintedCodeTrial").innerHTML="";
      document.getElementById("PaintedCodePlan").innerHTML=pc_six_steps;
      steps ();
      break;       

   case "getting-hitched":

      meal                 = 3;
      pc_subscription 	   = 0;
      pc_plan		   	   = 3;
      pc_total_products    = 3;
      pc_plan_days         = 21;
      product_info (pc_product_handle);
      document.getElementById("PaintedCodePlan").innerHTML=pc_getting_hitched_steps;
      steps ();
      break;

   case "5-day-office-fuel-trial":

      meal                 = 1;
      pc_subscription 	   = 0;
      pc_plan		   	   = 2;
      pc_total_products    = 1;
      pc_plan_days         = 5;
      product_info (pc_product_handle);
      //document.getElementById("PaintedCodeTrial").innerHTML="";
      document.getElementById("PaintedCodePlan").innerHTML=pc_office_fuel_steps;
      steps ();
      break;

   case "5-day-office-fuel":
	  //get_smoothies ();
      meal                 = 1;
      pc_subscription 	   = 1;
      pc_plan		   	   = 2;
      pc_total_products    = 1;
      pc_plan_days         = 5;
      product_info (pc_product_handle);
      document.getElementById("PaintedCodePlan").innerHTML=pc_office_fuel_steps;
      steps ();
      break;
  }

}


function load_page_content ()  {



  // load calendar

  $("#datepicker").datepicker({
        autoSize: true,
        navigationAsDateFormat: true,
        nextText: '>',
        prevText: '<',
        minDate: "3d",
        maxDate: "3m",
        dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
        todayHighlight: true,
        onSelect: function(selected,evnt) {stepDate(selected);},

        beforeShowDay: function(date) {
        var day = date.getDay();
        if (pc_plan_days == 7) {
	        return [(day != 0 && day != 2 && day != 4 && day != 6)];
        } else {
       	    return [(day != 0 && day != 2 && day != 4 && day != 5 && day != 6)];
        }
      }
    });

  // update cart prices
  update_total();
}

function steps (){

  // load html code into div's
   document.getElementById("step_zip").innerHTML=pc_zip;
   document.getElementById("step_date").innerHTML=pc_date;
   document.getElementById("step_times").innerHTML=pc_times;

  //debugger;

   switch (pc_plan) {
/*
     case 2:
      document.getElementById("step_office_fuel").innerHTML=pc_office_fuel;
      break;
*/
   case 3:
      document.getElementById("step_bridal").innerHTML=pc_bridal;
      break;

    case 7:
      document.getElementById("step_meals").innerHTML=pc_meals;
      break;
    }

   	document.getElementById("step_allergies").innerHTML=pc_allergies;

   	document.getElementById("step_person").innerHTML=pc_person;

	document.getElementById("step_cart").innerHTML=pc_cart;

   	if (pc_plan==1) {
    	document.getElementById("step_allergies_text_1").innerHTML="step 4";
      	document.getElementById("step_cart_step_1_text").innerHTML="step 5";
   	}

  	if (pc_plan==2) {
    	document.getElementById("step_allergies_text_1").innerHTML="step 4";
      	document.getElementById("step_cart_step_1_text").innerHTML="step 5";
   	}

  	if (pc_plan==2) {

    	/*
   		pc_button_1.classList.remove("pc_button");
   		pc_button_1.classList.remove("pc_button_selected");
   		pc_button_2.classList.remove("pc_button");
   		pc_button_2.classList.remove("pc_button_selected");

    	switch (pc_button) {


     	case 1:
      		pc_button_1.classList.add("pc_button_selected");
      		pc_button_2.classList.add("pc_button");
      		break;

     	case 2:
      		pc_button_1.classList.add("pc_button");
      		pc_button_2.classList.add("pc_button_selected");
      		break;
   		}
 		*/
	} else {

   		pc_button_0.classList.remove("pc_button");
   		pc_button_0.classList.remove("pc_button_selected");
   		pc_button_1.classList.remove("pc_button");
   		pc_button_1.classList.remove("pc_button_selected");
   		pc_button_2.classList.remove("pc_button");
   		pc_button_2.classList.remove("pc_button_selected");
   		pc_button_3.classList.remove("pc_button");
   		pc_button_3.classList.remove("pc_button_selected");

   		switch (pc_button) {

     	case 0:
      		pc_button_0.classList.add("pc_button_selected");
      		pc_button_1.classList.add("pc_button");
      		pc_button_2.classList.add("pc_button");
      		pc_button_3.classList.add("pc_button");
      		break;

     	case 1:
      		pc_button_0.classList.add("pc_button");
      		pc_button_1.classList.add("pc_button_selected");
      		pc_button_2.classList.add("pc_button");
      		pc_button_3.classList.add("pc_button");
      		break;

     	case 2:
      		pc_button_0.classList.add("pc_button");
      		pc_button_1.classList.add("pc_button");
      		pc_button_2.classList.add("pc_button_selected");
      		pc_button_3.classList.add("pc_button");
      		break;

     	case 3:
      		pc_button_0.classList.add("pc_button");
      		pc_button_1.classList.add("pc_button");
      		pc_button_2.classList.add("pc_button");
      		pc_button_3.classList.add("pc_button_selected");
      		break;

      	case 4:
      		pc_button_0.classList.add("pc_button");
      		pc_button_1.classList.add("pc_button");
      		pc_button_2.classList.add("pc_button");
      		pc_button_3.classList.add("pc_button");
      		break;
   		}
  	}

	pc_step_reset();


}




function product_info (pc_product_handle) {

     pc_counter = 0
     for (i = 1; i < pc_total_products+1 ; i++) {
       call_JSON (i);
     }
}


function call_JSON (i) {

  //debugger;
   switch (pc_plan) {

	case 1:  //  5 step trial
      	pc_path = '/products/'+ pc_pages[pc_page] +'.js';
      	break;

	case 2:  //  5 step office fuel
        pc_path = '/products/'+ pc_pages[pc_page] +'.js';
      	break;

    case 3:
        pc_path = '/products/'+ pc_pages[pc_page] + pc_bridal_products[i] +'.js';
      	break;

    case 7:
      	pc_path = '/products/'+ pc_pages[pc_page] + pc_products[i] +'.js';
      	break;
   	}

  	jQuery.getJSON(pc_path, function(pc_product_data) {

    	pc_product_title [i]  = pc_product_data.title;
    	pc_counter=pc_counter+1;
    	meal_id [i]           = pc_product_data.variants['0'].id;
    	meal_id_price [i]     = pc_product_data.price/100;
    	pc_product_title [i]  = pc_product_data.title;

    	if (pc_counter==pc_total_products) {
    		load_page_content();
    	}
   	});

   	switch (pc_plan) {

   	case 1:
   		pc_path = '/products/'+ pc_pages[pc_page] +'-with-allergies.js';
      	break;

   	case 2:
      	pc_path = '/products/'+ pc_pages[pc_page] +'-with-allergies.js';
      	break;

   	case 3:
      	pc_path = '/products/'+ pc_pages[pc_page] +'-with-allergies' + pc_bridal_products[i] +'.js';
      	break;

	case 7:
      	pc_path = '/products/'+ pc_pages[pc_page] +'-with-allergies' + pc_products[i] +'.js';
      	break;
   	}

   	jQuery.getJSON(pc_path, function(pc_product_data) {
      	meal_allergies_id [i]           = pc_product_data.variants['0'].id;
      	meal_allergies_id_price [i]     = pc_product_data.price/100;
   	});
}


function pc_step_reset() {

//     console.log ("pc_step_reset");

    // step_zip=1, step_date=4, step_delivery=64, step_meals=2, step_times=8, step_allergies=16, step_person=32
  	// step_meals is shared with bridal and office

  	step_zip		= 0   // 1
   	step_date       = 0;  // 4
   	step_times      = 0;  // 8
   	step_allergies  = 0;  // 16
  	step_person		= 0;  // 32
  	step_delivery	= 0;  // 64
    step_meals      = 0;  //  2

  	// step_zip=1, step_date=4, step_delivery=64, step_meals=2,
  	// step_times=8, step_allergies=16, step_person=32


   	document.getElementById("step_date_text_2").innerHTML="select start date";
  	document.getElementById("step_allergies").innerHTML=pc_allergies;

   	if (pc_plan ==1 ) {
      	document.getElementById("step_allergies_text_1").innerHTML="step 4";
      	document.getElementById("step_cart_step_1_text").innerHTML="step 5";
   	}

   	if (pc_plan == 2) {
        document.getElementById("step_allergies_text_1").innerHTML="step 4";
      	document.getElementById("step_cart_step_1_text").innerHTML="step 5";
   	}

  	if (pc_plan == 3) {
      	document.getElementById("step_bridal").innerHTML = pc_bridal;
  		document.getElementById("step_meals_text").className = "step_text";
   	}

	if (pc_plan == 7) {
      	document.getElementById("step_meals").innerHTML = pc_meals;
 		document.getElementById("step_meals_text").className = "step_text";
        document.getElementById("step_allergies_text_1").innerHTML = "step 5";
      	document.getElementById("step_cart_step_1_text").innerHTML = "step 6";
    }

  	document.getElementById("step_cart_button_div").innerHTML = "";
  	document.getElementById("step_zip_text").className        = "step_text_hover";
  	document.getElementById("stepDate_text").className        = "step_text";
  	document.getElementById("stepTimes_text").className       = "step_text";
  	document.getElementById("step_allergies_text").className  = "step_text";
  	document.getElementById("step_cart_text").className       = "step_text";
}


function stepZip() {


//     console.log("stepZip");

  	//debugger

	if (document.getElementById("step_name_input").value.length === 0 ) {

      	document.getElementById("step_zip_display").innerHTML = "Enter name on meal label";

      	//	document.getElementById("step_zip_input").value = ""
      	//  document.getElementById("stepDate_text").className  = "step_text_hover";

    } else {

    	document.getElementById("step_name_input").className  = "step_input_selected";





      	//	zip = document.getElementById("step_zip_input").value;
  		//	zip_found =	false;

  		if (document.getElementById("step_zip_input").value.length === 5  ) {


    		if (pc_zipcodes.indexOf(document.getElementById("step_zip_input").value) < 0) {

              document.getElementById("step_zip_display").innerHTML="No delivery to this zipcode		";


             } else {

     			// proceed to next step

               	step_zip = 1;

                document.getElementById("step_zip_input").className  = "step_input_selected";


                //document.getElementById("step_zip_text_2").innerHTML="Name on each meal label: "+document.getElementById("step_name_input").value+" Zipcode:"+document.getElementById("step_zip_input").value;
                document.getElementById("step_zip_text_2").innerHTML="Name on meal label: "+document.getElementById("step_name_input").value;
              	document.getElementById("step_zip_text").className  = "step_text_selected";

                //document.getElementById("stepDate_text").className  = "step_text_selected";

               document.getElementById("step_zip_display").innerHTML="";

              if (step_date===0){
              		document.getElementById("stepDate_text").className  = "step_text_hover";
                }

			}
        }
    }
}


function stepDate() {

    // test if this step is unlocked
	if (step_zip == 1)  {

// 		console.log("stepDate");

      	//  unlock
    	step_date       = 4;
   		start_date      = $("#datepicker").datepicker({ dateFormat:'dd,MM,yyyy',}).val();
   		temp="Start date: "+start_date;
   		document.getElementById("step_date_text_2").innerHTML=temp;


      if (step_delivery == 0) {
      		document.getElementById("stepDate_text").className  = "step_text_selected";
  			document.getElementById("stepTimes_text").className  = "step_text_hover";
      }
  		update_total();
 	}
}





function stepTimes(pc_delivery_time) {

// 	console.log("stepTimes");

  	// test if this step is unlocked
 	if (step_date == 4) {

		// unlock
    	step_delivery = 64;


      	//  pc_delivery_time = x;
		//  delivery_time   = stepTimes;


   		// update step bar to show time has been selected

        document.getElementById("stepTimes_text").className  = "step_text_selected";

   		//document.getElementById("stepTimes_text").style.backgroundColor = pc_step_background_selected;
   		//document.getElementById("stepTimes_text").style.color = pc_step_color_selected;


		if (pc_plan== 1) {

        	// activate allergies  dropdown and update step bar to set focus to allergy selection

      		if (step_allergies == 0)  {

            	document.getElementById("step_allergies_text").className  = "step_text_hover";
   				document.getElementById("step_allergies_input").innerHTML=pc_allergies_dropdown;
         		document.getElementById("step_allergies_text_1").innerHTML="step 4";
         		document.getElementById("step_cart_step_1_text").innerHTML="step 5";
   			}
      	}

     	// activate buttons for office fuel selection

    	if (pc_plan == 2 && step_meals == 0) {
      		step_meals = 2;
      		//document.getElementById("step_office_fuel_input").innerHTML=pc_office_fuel_buttons;
      		//document.getElementById("step_office_fuel_text").style.backgroundColor = pc_step_background_selected;
      		//document.getElementById("step_office_fuel_text").style.color = pc_step_color_selected;
            	document.getElementById("step_allergies_text").className  = "step_text_hover";
   				document.getElementById("step_allergies_input").innerHTML=pc_allergies_dropdown;
         		document.getElementById("step_allergies_text_1").innerHTML="step 4";
         		document.getElementById("step_cart_step_1_text").innerHTML="step 5";   		}

   		// activate buttons for bridal particapant selection

   		if (pc_plan== 3 && step_meals == 0) {
      		document.getElementById("step_bridal_input").innerHTML=pc_bridal_buttons;
      		document.getElementById("step_bridal_text").style.backgroundColor = pc_step_background_selected;
      		document.getElementById("step_bridal_text").style.color = pc_step_color_selected;
  		}

  		// activate buttons for meal selection

      	if (pc_plan== 7 && step_meals == 0) {

            //step_meals = 2;
          	document.getElementById("step_meals_text").className  = "step_text_hover";
      		document.getElementById("step_meals_input").innerHTML=pc_meals_buttons;
  		}

      	//   delivery_time   = stepTimes;

   		switch (pc_delivery_time) {

   		case 0:
			//   delivery_time_text="10 PM - 8 AM"

   			document.getElementById("stepTimesa").innerHTML='<button class="step_button_selected small_font" id="stepTimes_1" type="button" onclick="stepTimes(0)">'+pc_delivery_times[0]+'</button>';
   			document.getElementById("stepTimesb").innerHTML='<button class="step_button small_font" id="stepTimes_2" type="button" onclick="stepTimes(1)">'+pc_delivery_times[1]+'</button>';
   			break;

   		case 1:
			//   delivery_time_text="8 AM - 11 AM"

   			document.getElementById("stepTimesa").innerHTML='<button class="small_font step_button" id="stepTimes_1" type="button" onclick="stepTimes(0)">'+pc_delivery_times[0]+'</button>';
   			document.getElementById("stepTimesb").innerHTML='<button class="small_font step_button_selected" id="stepTimes_2" type="button" onclick="stepTimes(1)">'+pc_delivery_times[1]+'</button>';
   			break;
   		}

      	document.getElementById("step_times_text_2").innerHTML="Delivery at "+pc_delivery_times[pc_delivery_time];

   		step_times      = 8; // update step status
   		step_meals      = 2; // unlock meal/bridal step

   		update_total();
 	}
}





function stepOffice(a) {

 if (step_date == 4) {

   step_meals      = 2;

    //document.getElementById("step_office_fuel_input").innerHTML = pc_office_fuel_buttons;

   	update_total();

  }
}



function stepMeals(a) {

//   	console.log("stepMeals");

	if (step_date == 4) {

   		if (step_allergies != 16){

			step_meals      = 2;
			step_times 		= 8;

			document.getElementById("step_meals_text").className  = "step_text_selected";
			document.getElementById("step_allergies_text").className  = "step_text_hover";
    		document.getElementById("step_allergies_input").innerHTML = pc_allergies_dropdown;
   		}


       //  toggle style of button
   		switch (a) {

   		case 0:

        	var x = document.getElementById('meal_breakfast_button');

      		if (x.className=="step_button_selected") {
         		meal_breakfast_button.classList.remove("step_button_selected");
         		meal_breakfast_button.classList.add("step_button");
      		} else {
          		meal_breakfast_button.classList.remove("step_button");
          		meal_breakfast_button.classList.add("step_button_selected");
            }
      		break;

   		case 1:

        	var x = document.getElementById('meal_lunch_button');

      		if (x.className=="step_button_selected") {
         		meal_lunch_button.classList.remove("step_button_selected");
         		meal_lunch_button.classList.add("step_button");
      		} else {
          		meal_lunch_button.classList.remove("step_button");
          		meal_lunch_button.classList.add("step_button_selected");
      		}
      		break;

  		case 2:

            var x = document.getElementById('meal_dinner_button');

      		if (x.className=="step_button_selected") {
         		meal_dinner_button.classList.remove("step_button_selected");
         		meal_dinner_button.classList.add("step_button");
      		} else {
          		meal_dinner_button.classList.remove("step_button");
          		meal_dinner_button.classList.add("step_button_selected");
      		}
      		break;
   		}



     	//  combine status of breakfast/lunch/dinner into a meal id
     	meal = 0;

     	var x = document.getElementById('meal_breakfast_button');

     	if (x.className=="step_button_selected") {
        	meal=1
     	}

     	var x = document.getElementById('meal_lunch_button');

     	if (x.className=="step_button_selected") {
        	meal = meal + 2;
     	}

     	var x = document.getElementById('meal_dinner_button');

     	if (x.className=="step_button_selected") {
        	meal = meal + 4;
     	}

   		update_total();

 	}
}



function stepAllergies(){

 	if (step_times == 8 ) {

//     	console.log("stepAllergies");


 		// unlock next step
      	if (step_allergies != 16) {

        	step_allergies   = 16;
        	document.getElementById("step_allergies_text").className  = "step_text_selected";
    		document.getElementById("step_cart_text").className  = "step_text_hover";
      		document.getElementById("step_person_input").innerHTML = pc_person_dropdown;
        }

        var allergyDisplay = "Allergies: ";

        if (document.getElementById("step_allergies_dropdown_a").value != "select") {
     		step_allergies_dropdown_a.className  = "step_allergies_dropdown_selected";
			 if (document.getElementById("step_allergies_dropdown_a").value != "none") {
             	allergyDisplay += document.getElementById("step_allergies_dropdown_a").value;
             }
        } else {
     		step_allergies_dropdown_a.className  = "step_allergies_dropdown";
        }

        if (document.getElementById("step_allergies_dropdown_b").value != "select") {
     		step_allergies_dropdown_b.className  = "step_allergies_dropdown_selected";
			 if (document.getElementById("step_allergies_dropdown_b").value != "none") {
             	allergyDisplay += " "+document.getElementById("step_allergies_dropdown_b").value;
             }
        } else {
     		step_allergies_dropdown_b.className  = "step_allergies_dropdown";
        }

        if (document.getElementById("step_allergies_dropdown_c").value != "select") {
      		step_allergies_dropdown_c.className  = "step_allergies_dropdown_selected";
			 if (document.getElementById("step_allergies_dropdown_c").value != "none") {
             	allergyDisplay += " "+document.getElementById("step_allergies_dropdown_c").value;
             }
        } else {
     		step_allergies_dropdown_c.className  = "step_allergies_dropdown";
        }

      	document.getElementById("step_allergies_text_2").innerHTML = allergyDisplay	;
   		update_total();
 	}
}

function step_profile(profile_step) {

  var steps_completed = step_zip+step_meals+step_date+step_times+step_allergies+step_person;


  if (steps_completed=31) {

  	x=0

    if (document.getElementById("person_sex").value    != "select"){
       	document.getElementById("person_sex").className  = "step_button_dropdown_selected";
     	x1=1;
    } else {
       	document.getElementById("person_sex").className  = "step_button_dropdown";
		x1=0;
    }


    if (document.getElementById("person_height").value != "select"){
      	document.getElementById("person_height").className  = "step_button_dropdown_selected";
      	x2=1;
    } else {
       	document.getElementById("person_height").className  = "step_button_dropdown";
		x2=0;
    }

    if (document.getElementById("person_weight").value != "select"){
       	document.getElementById("person_weight").className  = "step_button_dropdown_selected";
     	x3=1;
    } else {
       	document.getElementById("person_weight").className  = "step_button_dropdown";
		x3=0;
    }

    if (document.getElementById("person_goal").value   != "select"){
       	document.getElementById("person_goal").className  = "step_button_dropdown_selected";
     	x4=1;
    } else {
       	document.getElementById("person_goal").className  = "step_button_dropdown";
		x4=0;
    }

    if (x1+x2+x3+x4==4) {
       	document.getElementById("step_cart_text").className  = "step_text_selected";
      	step_person = 32;
    } else {
       	document.getElementById("step_cart_text").className  = "step_text_hover";
      	step_person = 0;
    }

 /*
    if ( profile_step == 1 ) {
        document.getElementById("person_sex").style.backgroundColor = pc_background_selected;
   		document.getElementById("person_sex").style.color = pc_color_selected;
    }
    if ( profile_step == 2 ) {
        document.getElementById("person_height").style.backgroundColor = pc_background_selected;
   		document.getElementById("person_height").style.color = pc_color_selected;
    }
    if ( profile_step == 3 ) {
        document.getElementById("person_weight").style.backgroundColor = pc_background_selected;
   		document.getElementById("person_weight").style.color = pc_color_selected;
    }
    if ( profile_step == 4 ) {
      	document.getElementById("person_goal").style.backgroundColor = pc_background_selected;
   		document.getElementById("person_goal").style.color = pc_color_selected;
    }

 */


/*
       console.log("step_profile x="+document.getElementById("person_sex").value );
       console.log("step_profile x="+document.getElementById("person_height").value );
       console.log("step_profile x="+document.getElementById("person_weight").value );
       console.log("step_profile x="+document.getElementById("person_goal").value );
       console.log("step_profile x="+x );
*/

     update_total();
  }
}

function get_smoothies () {


		// collection_listings/#{id}.json
		// collections/COLLECTION-HANDLE/products.json
//  	pc_path   = "/products/?product_type=smoothie"; // returns all collections
//  	pc_path   = "/collections/smoothies/products";  // returns just smootie collection info
//  	pc_path   = "/products"; // returns all collections
//  	pc_path   = "/collections";  // returns array of all collections
//  	pc_path   = "/products/bar-chill"; // returned array of product data
//  	pc_path   = "/collections/smoothies/products.js";  // returns just smootie collection info
//  	pc_path   = "/collections/smoothies/products.json"; // !!!  returns 4 smoothies products

		//  jQuery.getJSON(pc_path, function(pc_smoothie_data) {
		// 	console.log(pc_smoothie_data);					// return products array
		//  console.log(pc_smoothie_data.products.length);  //  returns 4
		//  console.log(pc_smoothie_data.products [0]['title']);
		//  debugger;

   	pc_path   = "/collections/smoothies/products.json"; // !!!  returns 4 smoothies products


   jQuery.getJSON("/collections/smoothies/products.json", function(pc_smoothie_data) {

		for (i = 0; i < pc_smoothie_data.products.length ; i++) {
       		pc_smoothie_name [i] = pc_smoothie_data.products [i]['title'].substr(0,pc_smoothie_data.products [i]['title'].indexOf("smoothie")-1);
//        		console.log(pc_smoothie_name [i]);
     	};
   	});
}


function update_total() {

  // step_zip=1, step_date=4, step_delivery=64, step_meals=2, step_times=8, step_allergies=16, step_person=32
  // step_meals is shared with bridal and office

   var steps_completed = step_zip+step_meals+step_date+step_times+step_allergies+step_person;
   var startdate = $("#datepicker").datepicker({ dateFormat: 'dd,MM,yyyy' }).val();
   var display_date = startdate;

   grand_total      = 0;

   // test for allergies
   a 				= 0;

   allergy_text 	= "none";


/*
   // test if any allergies are choosen
   if (step_allergies == 16)  {

   if (document.getElementById("step_allergies_dropdown_a").value != "select") {
        if (document.getElementById("step_allergies_dropdown_a").value != "none") {
      		a=a+1;
      		allergy_text = strUser;
        }
   }

   if (document.getElementById("step_allergies_dropdown_b").value != "select") {
        if (document.getElementById("step_allergies_dropdown_a").value != "none") {
     		 a=a+1;

         	if (allergy_text == "none") {
          		allergy_text = strUser;
      		} else {
          		allergy_text= allergy_text + ", " + strUser;
      		}

        }
   }

   if (document.getElementById("step_allergies_dropdown_b").value != "select") {
        if (document.getElementById("step_allergies_dropdown_a").value != "none") {
     		 a=a+1;

         	if (allergy_text == "none") {
          		allergy_text = strUser;
      		} else {
          		allergy_text= allergy_text + ", " + strUser;
      		}

        }
   }
   };
*/

  if (meal!=0){


    if (step_allergies==16 && document.getElementById("step_allergies_text_2").innerHTML.length > 11) {

       	 allergies   = meal_allergies_id_price[meal]-meal_id_price[meal];
         meals       = meal_allergies_id_price[meal]-allergies;
         pc_cart_daily = meals/ pc_plan_days;
         pc_cart_daily = CurrencyFormatted(pc_cart_daily);
         grand_total = meal_allergies_id_price[meal];


      } else {

         allergies   = 0;
         meals       = meal_id_price[meal];
         pc_cart_daily = meals/pc_plan_days;
         pc_cart_daily = CurrencyFormatted(pc_cart_daily);
         grand_total = meals;

      };

   } else {

      meals         = 0;
      pc_cart_daily = 0;
      allergies     = 0;
      grand_total   = 0;
   };


   // refresh data on page

  if (allergies >0) {

  	if (pc_subscription == 1) {
     	document.getElementById("step_cart_total").innerHTML  =  pc_plan_days +" Day Subscription  $"+meals+" -  $"+ pc_cart_daily+" per Day - Allergies $"+allergies+" -  Total $" + grand_total;
  	} else {
      	document.getElementById("step_cart_total").innerHTML =  pc_plan_days + " Day Trial $"+meals+" -  $"+ pc_cart_daily+" per Day - Allergies $"+allergies+" -  Total $" + grand_total;
  	}

  } else {

    if (pc_subscription == 1) {
     	document.getElementById("step_cart_total").innerHTML  =  pc_plan_days + " Day Subscription  $"+meals+" -  $"+ pc_cart_daily+" per Day";
	} else {
      	document.getElementById("step_cart_total").innerHTML =  pc_plan_days + " Day Trial $"+meals+" -  $"+ pc_cart_daily+" per Day" ;
  	}
  }

/*
c   document.getElementById("step_cart_daily").innerHTML      = "$" + pc_cart_daily;
   document.getElementById("step_cart_allergies").innerHTML  = "$" + allergies;
   document.getElementById("step_cart_total").innerHTML      = "$" + grand_total;
*/
   // display submit button if all steps completed


  // console.log("steps_completed"+steps_completed);


  if (steps_completed==63) {

     if (pc_subscription == 1) {
        document.getElementById("step_cart_button_div").innerHTML="<button class='step_cart_button' type='button' onclick='add_to_cart()'>Purchase</button>";
     } else {
        document.getElementById("step_cart_button_div").innerHTML="<button class='step_cart_button' type='button' onclick='add_to_cart()'>Start</button>";
     }
   };
};






function add_to_cart() {

   // "Smoothie": document.getElementById("pc_office_fuel_smoothie").value,
   // "Bar": document.getElementById("pc_office_fuel_bar").value,

  var group_id =32380;

   if (deliver) {  // IS A DELIVERY

     if (pc_subscription == 1) {  // IS FIRST SUBSCRIPTION

     	if (allergy_text=="none") { // FIRST NO ALLERGIES

          if ( pc_plan == 2) {  // IS FIRST OFFICE FUEL

//            console.log("-Deliver - Subscription - No Allergies - Office Fuel");

           jQuery.ajax({

            //post to Shopify's /cart/add endpoint
			type: 'POST',
			url: '/cart/add',
			dataType: 'json',
			data: {

				//quantity to add and variant being added
				quantity: 1,
				id: meal_id[meal],

				//properties indicating subscription

              	properties: {
              	"Name":document.getElementById("step_name_input").value,
              	"Gender":document.getElementById("person_sex").value,
              	"Height":document.getElementById("person_height").value,
              	"Weight":document.getElementById("person_weight").value,
              	"Goal":document.getElementById("person_goal").value,
              	"Zipcode": document.getElementById("step_zip_input").value,
              	"Start Date": $("#datepicker").datepicker({ dateFormat:'dd,MM,yyyy',}).val(),
              	"Delivery Time": pc_delivery_times[pc_delivery_time],
              	"Allergies": allergy_text,
                "frequency_num": "1",
              	"frequency_type": "2",
              	"frequency_type_text": "Week(s)",
             	 "group_id": group_id
				}
			},
				success: function(item){
				window.location = "/cart";
				}
			});

       } else {  // FIRST NOT OFFICE FUEL

//          console.log("-Deliver - Subscription - No Allergies - NOT Office Fuel");
         jQuery.ajax({

            //post to Shopify's /cart/add endpoint
			type: 'POST',
			url: '/cart/add',
			dataType: 'json',
			data: {

				//quantity to add and variant being added
				quantity: 1,
				id: meal_id[meal],

				//properties indicating subscription

              	properties: {
              	"Name":document.getElementById("step_name_input").value,
              	"Gender":document.getElementById("person_sex").value,
              	"Height":document.getElementById("person_height").value,
              	"Weight":document.getElementById("person_weight").value,
              	"Goal":document.getElementById("person_goal").value,
              	"Zipcode": document.getElementById("step_zip_input").value,
              	"Start Date": $("#datepicker").datepicker({ dateFormat:'dd,MM,yyyy',}).val(),
                "frequency_num": "1",
              	"frequency_type": "2",
              	"frequency_type_text": "Week(s)",
             	 "group_id": group_id
				}
			},
				success: function(item){
				window.location = "/cart";
				}
			});

       }


        } else { //FIRST HAS ALLERGIES

          if ( pc_plan == 2) {  // SECOND OFFICE FUEL

//            console.log("-Deliver - Subscription - WITH Allergies - Office Fuel");
           jQuery.ajax({

            //post to Shopify's /cart/add endpoint
			type: 'POST',
			url: '/cart/add',
			dataType: 'json',
			data: {

				//quantity to add and variant being added
				quantity: 1,
				id: meal_allergies_id[meal],

				//properties indicating subscription

              	properties: {
              	"Name":document.getElementById("step_name_input").value,
              	"Gender":document.getElementById("person_sex").value,
              	"Height":document.getElementById("person_height").value,
              	"Weight":document.getElementById("person_weight").value,
              	"Goal":document.getElementById("person_goal").value,
              	"Zipcode": document.getElementById("step_zip_input").value,
              	"Start Date": $("#datepicker").datepicker({ dateFormat:'dd,MM,yyyy',}).val(),
              	"Delivery Time": pc_delivery_times[pc_delivery_time],
              	"Allergies": allergy_text,
                "frequency_num": "1",
              	"frequency_type": "2",
              	"frequency_type_text": "Week(s)",
             	 "group_id": group_id
				}
			},
				success: function(item){
				window.location = "/cart";
				}
			});

       } else {  // SECOND NO OFFICE FUEL

//             console.log("-Deliver - Subscription - WITH Allergies - NOT Office Fuel")
        	jQuery.ajax({

            //post to Shopify's /cart/add endpoint
			type: 'POST',
			url: '/cart/add',
			dataType: 'json',
			data: {

				//quantity to add and variant being added
				quantity: 1,
				id: meal_allergies_id[meal],

				//properties indicating subscription

              	properties: {
              	"Name":document.getElementById("step_name_input").value,
              	"Gender":document.getElementById("person_sex").value,
              	"Height":document.getElementById("person_height").value,
              	"Weight":document.getElementById("person_weight").value,
              	"Goal":document.getElementById("person_goal").value,
              	"Zipcode": document.getElementById("step_zip_input").value,
              	"Start Date": $("#datepicker").datepicker({ dateFormat:'dd,MM,yyyy',}).val(),
              	"Delivery Time": pc_delivery_times[pc_delivery_time],
              	"Allergies": allergy_text,
              	"frequency_num": "1",
              	"frequency_type": "2",
              	"frequency_type_text": "Week(s)",
             	 "group_id": group_id
				}

			},

				success: function(item){

				window.location = "/cart";

				}
			});
        } // END SECOND OFFICE FUEL
        } // END OF FIRST ALLERGIES

    } else {  // ELSE FIRST SUBSCRIPTION SO ITS FIRST TRIAL

        if (allergy_text=="none") {  // SECOND NO ALLERGIES

          if ( pc_plan == 2) {  // THIRD OFFICE FUEL

//            console.log("-Deliver - Trial - No Allergies - Office Fuel");
           jQuery.ajax({

            //post to Shopify's /cart/add endpoint
			type: 'POST',
			url: '/cart/add',
			dataType: 'json',
			data: {

				//quantity to add and variant being added
				quantity: 1,
				id: meal_id[meal],

				//properties indicating subscription

              	properties: {
              	"Name":document.getElementById("step_name_input").value,
              	"Gender":document.getElementById("person_sex").value,
              	"Height":document.getElementById("person_height").value,
              	"Weight":document.getElementById("person_weight").value,
              	"Goal":document.getElementById("person_goal").value,
              	"Zipcode": document.getElementById("step_zip_input").value,
              	"Start Date": $("#datepicker").datepicker({ dateFormat:'dd,MM,yyyy',}).val(),
              	"Delivery Time": pc_delivery_times[pc_delivery_time],
              	"Allergies": allergy_text,
				}
			},
				success: function(item){
				window.location = "/cart";
				}
			});


       } else {  // THIRD NO OFFICE FUEL

//              console.log("-Deliver - Trial - No Allergies - NOT Office Fuel")
			 jQuery.ajax({

            //post to Shopify's /cart/add endpoint
			type: 'POST',
			url: '/cart/add',
			dataType: 'json',
			data: {

				//quantity to add and variant being added
				quantity: 1,
				id: meal_id[meal],

				//properties indicating subscription

              	properties: {
              	"Name":document.getElementById("step_name_input").value,
              	"Gender":document.getElementById("person_sex").value,
              	"Height":document.getElementById("person_height").value,
              	"Weight":document.getElementById("person_weight").value,
              	"Goal":document.getElementById("person_goal").value,
              	"Zipcode": document.getElementById("step_zip_input").value,
              	"Start Date": $("#datepicker").datepicker({ dateFormat:'dd,MM,yyyy',}).val(),
              	"Delivery Time": pc_delivery_times[pc_delivery_time],
              	"Allergies": allergy_text,
				}

			},

				success: function(item){

				window.location = "/cart";

				}
			});
       } // END OF THIRD OFFICE FUEL

       } else { // SECOND WITH ALLERGIES

 if ( pc_plan == 2) {  // FOURTH OFFICE FUEL

//            console.log("-Deliver - Trial - WITH Allergies - Office Fuel");
           jQuery.ajax({

            //post to Shopify's /cart/add endpoint
			type: 'POST',
			url: '/cart/add',
			dataType: 'json',
			data: {

				//quantity to add and variant being added
				quantity: 1,
				id: meal_allergies_id[meal],

				//properties indicating subscription

              	properties: {
              	"Name":document.getElementById("step_name_input").value,
              	"Gender":document.getElementById("person_sex").value,
              	"Height":document.getElementById("person_height").value,
              	"Weight":document.getElementById("person_weight").value,
              	"Goal":document.getElementById("person_goal").value,
              	"Zipcode": document.getElementById("step_zip_input").value,
              	"Start Date": $("#datepicker").datepicker({ dateFormat:'dd,MM,yyyy',}).val(),
              	"Delivery Time": pc_delivery_times[pc_delivery_time],
              	"Allergies": allergy_text,
				}
			},
				success: function(item){
				window.location = "/cart";
				}
			});

       } else {  // FOURTH NO OFFICE FUEL
//             console.log("-Deliver - Trial - WITH Allergies - No Office Fuel");
              jQuery.ajax({

            //post to Shopify's /cart/add endpoint
			type: 'POST',
			url: '/cart/add',
			dataType: 'json',
			data: {

				//quantity to add and variant being added
				quantity: 1,
				id: meal_allergies_id[meal],

				//properties indicating subscription

              	properties: {
              	"Name":document.getElementById("step_name_input").value,
              	"Gender":document.getElementById("person_sex").value,
              	"Height":document.getElementById("person_height").value,
              	"Weight":document.getElementById("person_weight").value,
              	"Goal":document.getElementById("person_goal").value,
              	"Zipcode": document.getElementById("step_zip_input").value,
              	"Start Date": $("#datepicker").datepicker({ dateFormat:'dd,MM,yyyy',}).val(),
              	"Delivery Time": pc_delivery_times[pc_delivery_time],
              	"Allergies": allergy_text,
				}

			},

				success: function(item){

				window.location = "/cart";

				}
			});
       } //END OF FOURTH OFFICE FUEL
       }

     }  //END OF FIRST SUBSCRIPTION

  } else {  // Not Delivery so PICKUP

    //if (meal>1) {
     if (pc_subscription == 1) {  // SECOND SUBSCRIPTION

       if (allergy_text=="none") { // THIRD NO ALLERGIES


 		if ( pc_plan == 2) {  // FIFTH OFFICE FUEL

//             console.log("-Pickup - Subscription - No Allergies - Office Fuel");
           jQuery.ajax({

            //post to Shopify's /cart/add endpoint
			type: 'POST',
			url: '/cart/add',
			dataType: 'json',
			data: {

				//quantity to add and variant being added
				quantity: 1,
				id: meal_id[meal],

				//properties indicating subscription

              	properties: {
              	"Name":document.getElementById("step_name_input").value,
              	"Gender":document.getElementById("person_sex").value,
              	"Height":document.getElementById("person_height").value,
              	"Weight":document.getElementById("person_weight").value,
              	"Goal":document.getElementById("person_goal").value,
              	"Zipcode": document.getElementById("step_zip_input").value,
              	"Start Date": $("#datepicker").datepicker({ dateFormat:'dd,MM,yyyy',}).val(),
                "Pickup at": locations[pickup][0],
              	"Allergies": allergy_text,
                "frequency_num": "1",
              	"frequency_type": "2",
              	"frequency_type_text": "Week(s)",
             	 "group_id": group_id
				}
			},
				success: function(item){
				window.location = "/cart";
				}
			});

       } else {  // FIFTH NO OFFICE FUEL

//             console.log("-Pickup - Subscription - No Allergies - NOT Office Fuel");
   			jQuery.ajax({

            //post to Shopify's /cart/add endpoint
			type: 'POST',
			url: '/cart/add',
			dataType: 'json',
			data: {

				//quantity to add and variant being added
				quantity: 1,
				id:meal_id[meal],

				//properties indicating subscription

              	properties: {
              "Name":document.getElementById("step_name_input").value,
              "Gender":document.getElementById("person_sex").value,
              "Height":document.getElementById("person_height").value,
              "Weight":document.getElementById("person_weight").value,
              "Goal":document.getElementById("person_goal").value,
              "Zipcode": document.getElementById("step_zip_input").value,
              "Start Date": $("#datepicker").datepicker({ dateFormat:'dd,MM,yyyy',}).val(),
              "Pickup at": locations[pickup][0],
              "Allergies": allergy_text,
              "frequency_num": "1",
              "frequency_type": "2",
              "frequency_type_text": "Week(s)",
              "group_id": group_id
				}

			},

				success: function(item){

				window.location = "/cart";

				}
			});
       } //END FIFTH OFFICE FUEL

       } else {  // THIRD WITH ALLERGIES


 		if ( pc_plan == 2) {  // SIXTH OFFICE FUEL

//            console.log("-Pickup - Subscription - WITH Allergies - Office Fuel");
           jQuery.ajax({

            //post to Shopify's /cart/add endpoint
			type: 'POST',
			url: '/cart/add',
			dataType: 'json',
			data: {

				//quantity to add and variant being added
				quantity: 1,
				id: meal_allergies_id[meal],

				//properties indicating subscription

              	properties: {
              	"Name":document.getElementById("step_name_input").value,
              	"Gender":document.getElementById("person_sex").value,
              	"Height":document.getElementById("person_height").value,
              	"Weight":document.getElementById("person_weight").value,
              	"Goal":document.getElementById("person_goal").value,
              	"Zipcode": document.getElementById("step_zip_input").value,
              	"Start Date": $("#datepicker").datepicker({ dateFormat:'dd,MM,yyyy',}).val(),
                "Pickup at": locations[pickup][0],
              	"Allergies": allergy_text,
                "frequency_num": "1",
              	"frequency_type": "2",
              	"frequency_type_text": "Week(s)",
             	 "group_id": group_id
				}
			},
				success: function(item){
				window.location = "/cart";
				}
			});

       } else {  // SIXTH NO OFFICE FUEL

//             console.log("-Pickup - Subscription - WITH Allergies - NOT Office Fuel");
   			jQuery.ajax({

            //post to Shopify's /cart/add endpoint
			type: 'POST',
			url: '/cart/add',
			dataType: 'json',
			data: {

				//quantity to add and variant being added
				quantity: 1,
				id: meal_allergies_id[meal],

				//properties indicating subscription

              	properties: {
              "Name":document.getElementById("step_name_input").value,
              "Gender":document.getElementById("person_sex").value,
              "Height":document.getElementById("person_height").value,
              "Weight":document.getElementById("person_weight").value,
              "Goal":document.getElementById("person_goal").value,
              "Zipcode": document.getElementById("step_zip_input").value,
              "Start Date": $("#datepicker").datepicker({ dateFormat:'dd,MM,yyyy',}).val(),
              "Pickup at": locations[pickup][0],
              "Allergies": allergy_text,
              "frequency_num": "1",
              "frequency_type": "2",
              "frequency_type_text": "Week(s)",
              "group_id": group_id
				}

			},

				success: function(item){

				window.location = "/cart";

				}
			});
       }  // END OF SIXTH OFFICE FUEL
       }  // END THIRD  ALLERGIES

    } else { //SECOND NOT SUBSCRIPTION

       if (allergy_text=="none") {  // FOURTH NO ALLERGIES

         if ( pc_plan == 2) {  // SEVENTH OFFICE FUEL

//             console.log("-Pickup - Trial - No Allergies - Office Fuel");
           jQuery.ajax({

            //post to Shopify's /cart/add endpoint
			type: 'POST',
			url: '/cart/add',
			dataType: 'json',
			data: {

				//quantity to add and variant being added
				quantity: 1,
				id: meal_id[meal],

				//properties indicating subscription

              	properties: {
              	"Name":document.getElementById("step_name_input").value,
              	"Gender":document.getElementById("person_sex").value,
              	"Height":document.getElementById("person_height").value,
              	"Weight":document.getElementById("person_weight").value,
              	"Goal":document.getElementById("person_goal").value,
              	"Zipcode": document.getElementById("step_zip_input").value,
              	"Start Date": $("#datepicker").datepicker({ dateFormat:'dd,MM,yyyy',}).val(),
                "Pickup at": locations[pickup][0],
              	"Allergies": allergy_text,
				}
			},
				success: function(item){
				window.location = "/cart";
				}
			});

       } else {  // SEVENTH NO OFFICE FUEL

//          	console.log("-Pickup - Trial - No Allergies - Not Office Fuel");
     		jQuery.ajax({

            //post to Shopify's /cart/add endpoint
			type: 'POST',
			url: '/cart/add',
			dataType: 'json',
			data: {

				//quantity to add and variant being added
				quantity: 1,
				id: meal_id[meal],

				//properties indicating subscription

              	properties: {
              "Name":document.getElementById("step_name_input").value,
              "Gender":document.getElementById("person_sex").value,
              "Height":document.getElementById("person_height").value,
              "Weight":document.getElementById("person_weight").value,
              "Goal":document.getElementById("person_goal").value,
              "Zipcode": document.getElementById("step_zip_input").value,
              "Start Date": $("#datepicker").datepicker({ dateFormat:'dd,MM,yyyy',}).val(),
              "Pickup at": locations[pickup][0],
              "Allergies": allergy_text,
				}

			},

				success: function(item){

				window.location = "/cart";

				}
			});
       }  //END OF SEVENTH OFFICE FUEL

      } else {  // FOURTH WITH ALLERGIES

        if ( pc_plan == 2) {  // EIGHTH OFFICE FUEL

//             console.log("-Pickup - Trial - WITH Allergies - Office Fuel");
            jQuery.ajax({

            //post to Shopify's /cart/add endpoint
			type: 'POST',
			url: '/cart/add',
			dataType: 'json',
			data: {

				//quantity to add and variant being added
				quantity: 1,
				id: meal_allergies_id[meal],

				//properties indicating subscription

              	properties: {
              	"Name":document.getElementById("step_name_input").value,
              	"Gender":document.getElementById("person_sex").value,
              	"Height":document.getElementById("person_height").value,
              	"Weight":document.getElementById("person_weight").value,
              	"Goal":document.getElementById("person_goal").value,
              	"Zipcode": document.getElementById("step_zip_input").value,
              	"Start Date": $("#datepicker").datepicker({ dateFormat:'dd,MM,yyyy',}).val(),
                "Pickup at": locations[pickup][0],
              	"Allergies": allergy_text,
				}
			},
				success: function(item){
				window.location = "/cart";
				}
			});

       } else {  // EIGHTH NO OFFICE FUEL

//             console.log("-Pickup - Trial - WITH Allergies - Not Office Fuel");
            jQuery.ajax({

            //post to Shopify's /cart/add endpoint
			type: 'POST',
			url: '/cart/add',
			dataType: 'json',
			data: {

				//quantity to add and variant being added
				quantity: 1,
				id: meal_allergies_id[meal],

				//properties indicating subscription

              properties: {
              "Name":document.getElementById("step_name_input").value,
              "Gender":document.getElementById("person_sex").value,
              "Height":document.getElementById("person_height").value,
              "Weight":document.getElementById("person_weight").value,
              "Goal":document.getElementById("person_goal").value,
              "Zipcode": document.getElementById("step_zip_input").value,
              "Start Date": $("#datepicker").datepicker({ dateFormat:'dd,MM,yyyy',}).val(),
              "Pickup at": locations[pickup][0],
              "Allergies": allergy_text,
				}

			},

				success: function(item){

				window.location = "/cart";

				}
			});

         } //END OF EIGHT OFFICE FUEL
       }   //END OF FOURTH ALLERGIES
     }     // END SECOND SUBSCRIPTION
   }       //  END OF IF DELIVERY
};




function CurrencyFormatted(amount) {

    //https://css-tricks.com/snippets/javascript/format-currency/
	var i = parseFloat(amount);
	if(isNaN(i)) { i = 0.00; }
	var minus = '';
	if(i < 0) { minus = '-'; }
	i = Math.abs(i);
	i = parseInt((i + .005) * 100);
	i = i / 100;
	s = new String(i);
	if(s.indexOf('.') < 0) {
        s += '.00';
        //console.log("s:"+s);
        return amount;
    }
	if(s.indexOf('.') == (s.length - 2)) { s += '0'; }
    s = minus + s;
	return s;
}




function load_variables() {



//
// pc_box_text [x] data is used to fill the info box for each plan
// each plan has three buttons to select
//


pc_map_modal = `
<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
   <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body" id="modal-body">
           <div class="map" id="map"></div>
        </div>
        <div class="modal-footer"><!-- footer area with buttons for a continued dialog -->
            <button class="pc_close_map_button" onclick="toggle_modal()">Close</button>
        </div>
      </div><!-- /.modal-content -->
   </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
`;

pc_five_steps = pc_map_modal +`
<div class="five_steps"     id="five_steps">
	<div class="step"           id="step_zip"></div>
	<div class="step"           id="step_date"></div>
	<div class="step"           id="step_times"></div>
	<div class="step"           id="step_allergies"></div>
	<div class="step"           id="step_person"></div>
	<div class="step_cart"      id="step_cart"></div>
</div>
`;

pc_six_steps = pc_map_modal +`
<div class="six_steps"     id="six_steps">
	<div class="step"           id="step_zip"></div>
	<div class="step"           id="step_date"></div>
	<div class="step"           id="step_times"></div>
	<div class="step"           id="step_meals"></div>
	<div class="step"           id="step_allergies"></div>
	<div class="step"           id="step_person"></div>
	<div class="step_cart"      id="step_cart"></div>
</div>
`;


pc_getting_hitched_steps =pc_map_modal+`
<div class="six_steps"      id="six_steps">
<div class="step"           id="step_zip"></div>
<div class="step"           id="step_date"></div>
<div class="step"           id="step_times"></div>
<div class="step"           id="step_bridal"></div>
<div class="step"           id="step_allergies"></div>
<div class="step"           id="step_cart"></div>
</div>
`;

pc_office_fuel_steps =pc_map_modal+`
<div class="six_steps"      id="six_steps">
<div class="step"           id="step_zip"></div>
<div class="step"           id="step_date"></div>
<div class="step"           id="step_times"></div>
<div class="step"           id="step_allergies"></div>
<div class="step"           id="step_person"></div>
<div class="step_cart"      id="step_cart"></div>
</div>
`;
//<div class="step"           id="step_office_fuel"></div>


pc_zip=`
<div class="step_text_hover" id="step_zip_text">
<div class="step_text_1">step 1</div>
<div class="step_text_2" id="step_zip_text_2">enter your name and zipcode</div>
</div>

<div>
<div class="step_spacer"></div>
<div class="step_spacer"></div>
<div><input id="step_name_input" class="step_input_hover" type="text" placeholder="name" maxlength="24" onblur = stepZip() autofocus/></input></div>
<div class="step_spacer"></div>
<div class="step_spacer"></div>
<div><input id="step_zip_input" class="step_input" type="text" placeholder="zip code" maxlength="5" onkeyup =stepZip() /></input></div>
<div class="step_zip_display" id="step_zip_display"></div>
`;

pc_date=`
<div class="step_text" id="stepDate_text">
<div class="step_text_1">step 2</div>
<div class="step_text_2" id="step_date_text_2">select start date</div>
</div>
<div class="stepDate_input">
<div id="datepicker"></div>
</div>
<div class="bottom_date"></div>
`;

old_pc_times=`
<div class="step_text" id="stepTimes_text">
<div class="step_text_1">step 3</div>
<div class="step_text_2" id="step_times_text_2">confirm your delivery</div>
</div>
<div class="stepTimes_input" id="stepTimes_input">
<div id="stepTimesa"><button class="step_button small_font" id="stepTimes_1" type="button" onclick="stepTimes(0)">`+pc_delivery_times[0]+`</button></div>
<div class="stepTimes_spacer"></div>
<div id="stepTimesb"><button class="step_button small_font" id="stepTimes_2" type="button" onclick="stepTimes(1)">`+pc_delivery_times[1]+`</button></div>
<div class="stepTimes_spacer"></div>
<div id="stepTimesc"><button class="step_button small_font" id="stepTimes_3" type="button" onclick="stepTimes(2)">`+pc_delivery_times[2]+`</button></div>
<div class="stepTimes_spacer"></div>
<div id="stepTimesd"><button class="step_button small_font" id="stepTimes_4" type="button" onclick="pc_order_test();">`+pc_delivery_times[3]+`</button></div>
</div>
<div class="bottom_times"></div>
`;

pc_times=`
<div class="step_text" id="stepTimes_text">
<div class="step_text_1">step 3</div>
<div class="step_text_2" id="step_times_text_2">confirm your delivery</div>
</div>

<div class="stepTimes_input" id="stepTimes_input">
<div class="step_spacer"></div>
<div class="step_spacer"></div>
<div id="stepTimesa"><button class="step_button small_font" id="stepTimes_1" type="button" onclick="stepTimes(0)">`+pc_delivery_times[0]+`</button></div>
<div class="step_spacer"></div>
<div class="step_spacer"></div>
<div id="stepTimesb"><button class="step_button small_font" id="stepTimes_2" type="button" onclick="stepTimes(1)">`+pc_delivery_times[1]+`</button></div>
<div class="step_spacer"></div>
</div>
`;



pc_bridal=`
<div class="step_text" id="step_bridal_text">
<div class="step_text_1">step 4</div>
<div class="step_text_2">choose participants</div>
</div>

<div class="step_input" id="step_bridal_input">
<div class="step_spacer"></div>
<div class="step_spacer"></div>
<div id="step_bridal_bride"><button class="step_button" id="bridal_bride_button" type="button" >Bride</button></div>
<div class="step_spacer"></div>
<div class="step_spacer"></div>
<div id="step_bridal_groom"><button class="step_button" id="bridal_groom_button"  type="button" >Groom</button></div>
<div class="step_spacer"></div>
</div>

`;

pc_bridal_buttons=`
<div class="step_spacer"></div>
<div class="step_spacer"></div>
<div id="step_bridal_bride"><button class="step_button_selected" id="bridal_bride_button" type="button" onclick="stepBridal(0)" >Bride</button></div>
<div class="step_spacer"></div>
<div class="step_spacer"></div>
<div id="step_bridal_groom"><button class="step_button_selected" id="bridal_groom_button" type="button" onclick="stepBridal(1)">Groom</button></div>
<div class="step_spacer"></div>
`;


pc_office_fuel=`
<div class="step_text" id="step_office_fuel_text">
	<div class="step_text_1">step 4</div>
	<div class="step_text_2">choose meal options</div>
</div>

<div class="step_input" id="step_office_fuel_input">
	<div class="step_spacer"></div>
	<div class="step_spacer"></div>
	<div id="step_office_fuel"><button class="step_button" id="office_fuel_smoothies_button" type="button" >Smoothies</button></div>
	<div class="step_spacer"></div>
	<div class="step_spacer"></div>
	<div id="step_office_fuel"><button class="step_button" id="office_fuel_bars_button"  type="button" >performance bars</button></div>
	<div class="step_spacer"></div>
</div>
`;


    //	<select name="pc_smoothie" class="step_button" id="pc_smoothie" onchange="step_office_fuel()">

pc_office_fuel_buttons=`
<div class="step_spacer"></div>
<div class="step_spacer"></div>
<div id="step_office_fuel">
	<select name="pc_smoothie" class="step_button" id="pc_office_fuel_smoothie">
  		<option value="select" selected>smoothies</option>
  		<option value="get sh*t done">get sh*t done</option>
  		<option value="wake up">wake up</option>
  		<option value="stress buster">stress buster</option>
  		<option value="sick day slayer">sick day slayer</option>
  		<option value="any time">any time</option>

	</select>
</div>
<div class="step_spacer"></div>
<div class="step_spacer"></div>
<div id="step_office_fuel">
	<select name="pc_bar" class="step_button" id="pc_office_fuel_bar">
  		<option value="select" selected>performance bars</option>
  		<option value="get sh*t done">get sh*t done</option>
  		<option value="wake up">wake up</option>
  		<option value="stress buster">stress buster</option>
  		<option value="sick day slayer">sick day slayer</option>
	</select>
</div>
<div class="step_spacer"></div>
`;

pc_meals=`
<div class="step_text" id="step_meals_text">
<div class="step_text_1">step 4</div>
<div class="step_text_2">choose your meals</div>
</div>
<div id="step_meals_input">
<div class="step_spacer"></div>
<div id="step_meals_breakfast">	<button class="step_button" id="meal_breakfast_button" type="button" >breakfast</button></div>
<div class="step_spacer"></div>
<div id="step_meals_lunch">		<button class="step_button" id="meal_lunch_button" type="button" >lunch</button></div>
<div class="step_spacer"></div>
<div id="step_meals_dinner">	<button class="step_button" id="meal_dinner_button" type="button">dinner</button></div>
<div class="step_spacer"></div>
</div>

`;

pc_meals_buttons=`
<div class="step_spacer"></div>
<div id="step_meals_breakfast"><button class="step_button"  id="meal_breakfast_button"type="button" onclick="stepMeals(0)">breakfast</button></div>
<div class="step_spacer"></div>
<div id="step_meals_lunch"><button class="step_button" id="meal_lunch_button" type="button" onclick="stepMeals(1)">lunch</button></div>
<div class="step_spacer"></div>
<div id="step_meals_dinner"><button class="step_button" id="meal_dinner_button" type="button" onclick="stepMeals(2)">dinner</button></div>
<div class="step_spacer"></div>
`;

/*
old pc_meals_buttons=`
<div class="step_spacer"></div>
<div id="step_meals_breakfast"><button class="step_button_selected"  id="meal_breakfast_button"type="button" onclick="stepMeals(0)">breakfast</button></div>
<div class="step_spacer"></div>
<div id="step_meals_lunch"><button class="step_button_selected" id="meal_lunch_button" type="button" onclick="stepMeals(1)">lunch</button></div>
<div class="step_spacer"></div>
<div id="step_meals_dinner"><button class="step_button_selected" id="meal_dinner_button" type="button" onclick="stepMeals(2)">dinner</button></div>
<div class="step_spacer"></div>
`;
*/


pc_allergies=`
<div class="step_text" id="step_allergies_text">
<div class="step_text_1" id="step_allergies_text_1">step 5</div>
<div class="step_text_2" id="step_allergies_text_2">select your allergies</div>
</div>

<div id="step_allergies_input">
<div class="step_spacer"></div>
<div id="step_allergies_placeholder"><button class="step_button" type="button" >select</button></div>
<div class="step_spacer"></div>
<div id="step_allergies_placeholder"><button class="step_button" type="button" >select</button></div>
<div class="step_spacer"></div>
<div id="step_allergies_placeholder"><button class="step_button" type="button" >select</button></div>
<div class="step_spacer"></div>
</div>
`;

xpc_allergies_dropdown=`
<div class="dropdown">
  <button class="dropbtn">Dropdown</button>
  <div class="dropdown-content">
    <a onclick="stepAllergies(0,'select')">select</a>
    <a onclick="stepAllergies()">none</a>
    <a href="#">nuts</a>
    <a href="#">eggs</a>
    <a href="#">fish</a>
    <a href="#">shellfish</a>
    <a href="#">poultry</a>
    <a href="#">read meat</a>
    <a href="#">sesame</a>
  </div>
</div>
`


pc_allergies_dropdown=`
<div class="step_spacer"></div
<div>
<select name="step_allergies_dropdown_a" class="step_allergies_dropdown" id="step_allergies_dropdown_a" onchange="stepAllergies()">
<option selected="selected" value="select">select</option>
<option value="none">none</option>
<option value="Nuts">nuts</option>
<option value="Eggs">eggs</option>
<option value="Fish">fish</option>
<option value="Shellfish">shellfish</option>
<option value="Poultry">poultry</option>
<option value="Red Meat">red meat</option>
<option value="Sesame">sesame</option>
</select></div>
<div class="step_spacer"></div>
<div>
<select name="step_allergies_dropdown_b" class="step_allergies_dropdown" id="step_allergies_dropdown_b" onchange="stepAllergies()">
<option selected="selected" value="select">select</option>
<option value="none">none</option>
<option value="Nuts">nuts</option>
<option value="Eggs">eggs</option>
<option value="Fish">fish</option>
<option value="Shellfish">shellfish</option>
<option value="Poultry">poultry</option>
<option value="Red Meat">red meat</option>
<option value="Sesame">sesame</option>
</select></div>
<div class="step_spacer"></div>
<div>
<select name="step_allergies_dropdown_c" class="step_allergies_dropdown" id="step_allergies_dropdown_c" onchange="stepAllergies()">
<option selected="selected" value="select">select</option>
<option value="none">none</option>
<option value="Nuts">nuts</option>
<option value="Eggs">eggs</option>
<option value="Fish">fish</option>
<option value="Shellfish">shellfish</option>
<option value="Poultry">poultry</option>
<option value="Red Meat">red meat</option>
<option value="Sesame">sesame</option>
</select></div>
<div class="step_spacer"></div>
`;

pc_allergies_dropdown_none=`
<div class="step_spacer"></div
<div>
<select name="step_allergies_dropdown_a" class="step_allergies_dropdown" id="step_allergies_dropdown_a" onchange="stepAllergies()">
<option selected="selected" value="none">none</option>
<option value="Nuts">Nuts</option>
<option value="Eggs">Eggs</option>
<option value="Fish">Fish</option>
<option value="Shellfish">Shellfish</option>
<option value="Poultry">Poultry</option>
<option value="Red Meat">Red Meat</option>
<option value="Sesame">Sesame</option>
</select></div>
<div class="step_spacer"></div>
<div>
<select name="step_allergies_dropdown_b" class="step_allergies_dropdown" id="step_allergies_dropdown_b" onchange="stepAllergies()">
<option selected="selected" value="none">none</option>
<option value="Nuts">Nuts</option>
<option value="Eggs">Eggs</option>
<option value="Fish">Fish</option>
<option value="Shellfish">Shellfish</option>
<option value="Poultry">Poultry</option>
<option value="Red Meat">Red Meat</option>
<option value="Sesame">Sesame</option>
</select></div>
<div class="step_spacer"></div>
<div>
<select name="step_allergies_dropdown_c" class="step_allergies_dropdown" id="step_allergies_dropdown_c" onchange="stepAllergies()">
<option selected="selected" value="none">none</option>
<option value="Nuts">Nuts</option>
<option value="Eggs">Eggs</option>
<option value="Fish">Fish</option>
<option value="Shellfish">Shellfish</option>
<option value="Poultry">Poultry</option>
<option value="Red Meat">Red Meat</option>
<option value="Sesame">Sesame</option>
</select></div>
<div class="step_spacer"></div>
`;



//<div class="step_text" id="step_cart_text">
//<div class="step_text_1" id="step_cart_step_1_text">step 6</div>
//<div class="step_text_2">Personal Info</div>
//</div>
// <div class="stepPerson_input">

pc_person_dropdown=`
<div class="stepTimes_spacer"></div>
<select name="person_sex" class="step_button" id="person_sex" onchange="step_profile(1)">
  <option value="select" selected>gender</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
</select>

<div class="stepTimes_spacer"></div>


<select name="person_height" class="step_button" id="person_height" onchange="step_profile(2)">
  <option value="select" selected>height</option>
  <option value="under 5">under 5</option>
  <option value="5-1">5-1</option>
  <option value="5-2">5-2</option>
  <option value="5-3">5-3</option>
  <option value="5-4">5-4</option>
  <option value="5-5">5-5</option>
  <option value="5-6">5-6</option>
  <option value="5-7">5-7</option>
  <option value="5-8">5-8</option>
  <option value="5-9">5-9</option>
  <option value="5-10">5-10</option>
  <option value="5-11">5-11</option>
  <option value="6-0">6-0</option>
  <option value="6-1">6-1</option>
  <option value="6-2">6-2</option>
  <option value="6-3">6-3</option>
  <option value="6-4">6-4</option>
  <option value="6-5">6-5</option>
  <option value="6-6">6-6</option>
  <option value="6-7">6-7</option>
  <option value="6-8">6-8</option>
  <option value="6-9">6-9</option>
  <option value="over 6">over 6-9</option>
</select>
<div class="stepTimes_spacer"></div>


<select name="person_weight" class="step_button" id="person_weight" onchange="step_profile(3)" >
  <option value="select" selected>weight</option>
  <option value="under 100">under 100</option>
  <option value="100-104">100-105</option>
  <option value="105-109">105-109</option>
  <option value="110-114">110-119</option>
  <option value="120-124">120-124</option>
  <option value="125-129">125-129</option>
  <option value="130-134">130-134</option>
  <option value="140-144">140-144</option>
  <option value="145-149">145-149</option>
  <option value="150-154">150-154</option>
  <option value="155-159">155-159</option>
  <option value="160-164">160-164</option>
  <option value="165-169">165-169</option>
  <option value="170-174">170-174</option>
  <option value="175-179">175-179</option>
  <option value="180-184">180-184</option>
  <option value="185-189">185-189</option>
  <option value="190-194">190-194</option>
  <option value="195-199">195-199</option>
  <option value="200-204">200-205</option>
  <option value="205-209">205-209</option>
  <option value="210-214">210-219</option>
  <option value="220-224">220-224</option>
  <option value="225-229">225-229</option>
  <option value="230-234">230-234</option>
  <option value="240-244">240-244</option>
  <option value="245-249">245-249</option>
  <option value="250-254">250-254</option>
  <option value="255-259">255-259</option>
  <option value="260-264">260-264</option>
  <option value="265-269">265-269</option>
  <option value="270-274">270-274</option>
  <option value="275-279">275-279</option>
  <option value="280-284">280-284</option>
  <option value="285-289">285-289</option>
  <option value="290-294">290-294</option>
  <option value="295-299">295-299</option>
  <option value="over 299">over 300</option>
</select>
<div class="stepTimes_spacer"></div>


<select name="person_goal" class="step_button" id="person_goal" onchange="step_profile(4)">
  <option value="select" selected>goal</option>
  <option value="gain">Gain Weight</option>
  <option value="loss">Lose Weight</option>
  <option value="maintain">Maintain Weight</option>
</select>

 `;
//<div>

pc_person=`
<div class="step_text" id="step_cart_text">
<div class="step_text_1" id="step_cart_step_1_text">step 6</div>
<div class="step_text_2">Personal Info</div>
</div>

<div class="step_person_input" id="step_person_input">
<div class="stepTimes_spacer"></div>
<div id="step_person_placeholder"><button class="step_button" type="button" >gender</button></div>
<div class="stepTimes_spacer"></div>
<div id="step_person_placeholder"><button class="step_button" type="button" >height</button></div>
<div class="stepTimes_spacer"></div>
<div id="step_person_placeholder"><button class="step_button" type="button" >weight</button></div>
<div class="stepTimes_spacer"></div>
<div id="step_person_placeholder"><button class="step_button" type="button" >goal</button></div>
<div class="stepTimes_spacer"></div>
</div>
 `;



pc_cart=`
<div class="step_cart" id="step_cart_total"></div>
<div class="step_cart_button_div" id="step_cart_button_div">
 `;

xxpc_cart=`
//<div class="step_cart_totals_div">
<div class="step_cart" id="step_cart_total"></div>
<div class="step_cart_button_div" id="step_cart_button_div">
//</div>
 `;


}
 //<span>total:</span>
//<span>price:</span><span class="step_cart" id="step_cart_meals"></span><span class="step_cart_daily_text">price per day</span><span class="step_cart_daily" id="step_cart_daily"></span>
//<span>allergies</span><span class="step_cart" id="step_cart_allergies"></span>
//<span class="step_cart_delivery_text">delivery complimentary</span>


// })();


/*   functions below are not being used and are used for pickup

function step_deliver() {

	if (step_date == 4) {
  		step_delivery =64;
   		deliver = true;


//
//  		// 	document.getElementById("step_zip_button").innerHTML="<button class='step_button' type='button' onclick='stepZip()'>zip code found</button>";
//
//  		document.getElementById("step_times").innerHTML=pc_times;
//
//  		document.getElementById("step_zip_text").style.backgroundColor = pc_step_background_selected;
//  		document.getElementById("step_zip_text").style.color = pc_step_color_selected;
//
// 			document.getElementById("step_zip_input").style.backgroundColor = pc_background_selected;
// 			document.getElementById("step_zip_input").style.color = pc_color_selected;
//
//   		if (step_date != 4) {
//     		document.getElementById("stepDate_text").style.color           = pc_step_color_hover;
//     		document.getElementById("stepDate_text").style.backgroundColor = pc_step_background_hover;
//   		}
//

       	document.getElementById("stepTimes_text").className  = "step_text_selected";

      if (pc_plan==1) {

  		document.getElementById("step_allergies_text").className  = "step_text_hover";

      } else {

        document.getElementById("step_meals_text").className  = "step_text_hover";

      }

   		update_total();
  	}
}



function step_pickup() {   // this function is currently not being used until pickup locations are setup

	if (step_date == 4) {

  		step_delivery =64;
   		deliver = false;

		//   document.getElementById("step_zip_button").innerHTML="<button class='step_button_selected' type='button' onclick='stepZip()'>check zipcode</button>";

   		document.getElementById("step_zip_text").style.backgroundColor = pc_step_background_selected;
   		document.getElementById("step_zip_text").style.color = pc_step_color_selected;
   		document.getElementById("step_zip_input").style.backgroundColor = pc_background_selected;
   		document.getElementById("step_zip_input").style.color = pc_color_selected;

 //  		if (step_date != 4) {
 //   		document.getElementById("stepDate_text").style.color           = pc_step_color_hover;
 //    		document.getElementById("stepDate_text").style.backgroundColor = pc_step_background_hover;
 //  		}

   		document.getElementById("step_times_text_2").innerHTML= "choose pickup location";

  		document.getElementById("stepTimes_input").innerHTML=`
   			<div id="pickup_window" onclick="step_pickup_selected()">
      		<div id="pickup_location"></div>
      		<div id="pickup_address"></div>
      		<div id="pickup_city"></div>
      		<div id="pickup_hours"></div>
   			</div>
   			<div id="pickup_controls">
      		<button class="pickup_nav" id="pickup_prev" onclick="pickup_prev()"></button>
      		<button class="pickup_nav" id="pickup_next" onclick="pickup_next()"></button>
      		<button class='pc_display_map_button' onclick='toggle_modal()'>map</button>
   			</div>`;
   		document.getElementById("pickup_prev").innerHTML=       "<";
   		document.getElementById("pickup_next").innerHTML=       ">";
   		document.getElementById("pickup_location").innerHTML=   locations[pickup][0];
   		document.getElementById("pickup_address").innerHTML=    locations[pickup][3];
   		document.getElementById("pickup_city").innerHTML=       locations[pickup][4];
   		document.getElementById("pickup_hours").innerHTML=      locations[pickup][6];

        document.getElementById("stepTimes_text").className  = "step_text_selected";
  		document.getElementById("step_allergies_text").className  = "step_text_hover";
   		update_total();
	}
}


function pickup_prev ()  {
 	if (step_date       == 4) {
  		if (pickup > 0) {

   			pickup=pickup-1;

   			document.getElementById("pickup_location").innerHTML=   locations[pickup][0];
   			document.getElementById("pickup_address").innerHTML=    locations[pickup][3];
   			document.getElementById("pickup_city").innerHTML=       locations[pickup][4];
   			document.getElementById("pickup_hours").innerHTML=      locations[pickup][6];
   		}

      	initMap();
  		step_pickup_selected ()
 	}
}

function pickup_next ()  {

 	if (step_date       == 4) {
  		if (pickup < locations.length-1) {

   			pickup=pickup+1;

   			document.getElementById("pickup_location").innerHTML=   locations[pickup][0];
   			document.getElementById("pickup_address").innerHTML=    locations[pickup][3];
   			document.getElementById("pickup_city").innerHTML=       locations[pickup][4];
   			document.getElementById("pickup_hours").innerHTML=      locations[pickup][6];
   		}

  		initMap()
  		step_pickup_selected ()
 	}
}


function step_pickup_selected ()  {

 	if (step_date == 4) {

      	deliver = false	;

   		if (pc_plan == 2 && step_meals == 0) {
      		step_meals = 2;
      		document.getElementById("step_office_fuel_input").innerHTML=pc_office_fuel_buttons;
      		document.getElementById("pc_office_fuel_smoothie").style.backgroundColor = pc_step_background_selected;
      		document.getElementById("pc_office_fuel_smoothie").style.color = pc_step_color_selected;
      		document.getElementById("pc_office_fuel_bar").style.backgroundColor = pc_step_background_selected;
      		document.getElementById("pc_office_fuel_bar").style.color = pc_step_color_selected;
      		document.getElementById("step_office_fuel_text").style.backgroundColor = pc_step_background_selected;
      		document.getElementById("step_office_fuel_text").style.color = pc_step_color_selected;
  		}

      	if (pc_plan == 3 && step_meals == 0) {
      		document.getElementById("step_bridal_input").innerHTML=pc_bridal_buttons;
      		document.getElementById("step_bridal_text").style.backgroundColor = pc_step_background_selected;
      		document.getElementById("step_bridal_text").style.color = pc_step_color_selected;
  		}

      	if (pc_plan == 7 && step_meals == 0) {
      		document.getElementById("step_meals_input").innerHTML=pc_meals_buttons;
      		document.getElementById("step_meals_text").style.backgroundColor = pc_step_background_selected;
      		document.getElementById("step_meals_text").style.color = pc_step_color_selected;
  		}

      	if (step_allergies == 0)  {
      		document.getElementById("step_allergies_input").innerHTML=pc_allergies_dropdown;
      		document.getElementById("step_allergies_text").style.backgroundColor = pc_step_background_hover;
      		document.getElementById("step_allergies_text").style.color = pc_step_color_hover;

          	if (pc_plan==1) {
         		document.getElementById("step_allergies_text_1").innerHTML="step 4";
         		document.getElementById("step_cart_step_1_text").innerHTML="step 5";
      		}
   		}

		//   document.getElementById("step_cart_text").style.backgroundColor = pc_step_background;
		//   document.getElementById("step_cart_text").style.color = pc_step_color_selected;

        document.getElementById("stepTimes_text").style.backgroundColor = pc_step_background_selected;
   		document.getElementById("stepTimes_text").style.color = pc_step_color_selected;

   		document.getElementById("pickup_window").style.backgroundColor = pc_background_selected;
   		document.getElementById("pickup_window").style.color = pc_color_selected;

   		step_times      = 8;
   		step_meals      = 2;

   		update_total();
 	}
}


function stepBridal(a) {

 if (step_date == 4) {

//   step_bridal      = 2;
   step_meal        = 2;

   switch (a) {

   case 0:
      var x = document.getElementById('bridal_bride_button');

      if (x.className=="step_button_selected") {
         bridal_bride_button.classList.remove("step_button_selected");
         bridal_bride_button.classList.add("step_button");
      } else {
          bridal_bride_button.classList.remove("step_button");
          bridal_bride_button.classList.add("step_button_selected");      }
      break;

   case 1:
      var x = document.getElementById('bridal_groom_button');

      if (x.className=="step_button_selected") {
         bridal_groom_button.classList.remove("step_button_selected");
         bridal_groom_button.classList.add("step_button");
      } else {
          bridal_groom_button.classList.remove("step_button");
          bridal_groom_button.classList.add("step_button_selected");
      }
      break;

   }


      meal = 0;

      var x = document.getElementById('bridal_bride_button');

      if (x.className=="step_button_selected") {
        meal=1
      }
      var x = document.getElementById('bridal_groom_button');

      if (x.className=="step_button_selected") {
        meal = meal + 2;
      }


   update_total();

  }
}

function get_smoothies () {


		// collection_listings/#{id}.json
		// collections/COLLECTION-HANDLE/products.json
//  	pc_path   = "/products/?product_type=smoothie"; // returns all collections
//  	pc_path   = "/collections/smoothies/products";  // returns just smootie collection info
//  	pc_path   = "/products"; // returns all collections
//  	pc_path   = "/collections";  // returns array of all collections
//  	pc_path   = "/products/bar-chill"; // returned array of product data
//  	pc_path   = "/collections/smoothies/products.js";  // returns just smootie collection info
//  	pc_path   = "/collections/smoothies/products.json"; // !!!  returns 4 smoothies products

		//  jQuery.getJSON(pc_path, function(pc_smoothie_data) {
		// 	console.log(pc_smoothie_data);					// return products array
		//  console.log(pc_smoothie_data.products.length);  //  returns 4
		//  console.log(pc_smoothie_data.products [0]['title']);
		//  debugger;

   	pc_path   = "/collections/smoothies/products.json"; // !!!  returns 4 smoothies products


   jQuery.getJSON("/collections/smoothies/products.json", function(pc_smoothie_data) {

		for (i = 0; i < pc_smoothie_data.products.length ; i++) {
       		pc_smoothie_name [i] = pc_smoothie_data.products [i]['title'].substr(0,pc_smoothie_data.products [i]['title'].indexOf("smoothie")-1);
//        		console.log(pc_smoothie_name [i]);
     	};
   	});
}


function toggle_modal() {

   if (step_date == 4) {


  var x = document.getElementById('myModal');

   if (x.style.display=="block") {
      x.style.display = 'none';
      map_displayed = false;
   } else {
      x.style.display = 'block';
      map_displayed = true;
      loadGoogleMaps();
 //     map_controls();


   }
   }
}

function pc_display_map () {loadGoogleMaps()}

function loadGoogleMaps() { if(!gMapsLoaded) { $.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyALACstuZltE-sgz4IlpKMaLUMZRSpcAVw&sensor=false&async=2&callback=GoogleMapsLoaded", function(){}); } else { GoogleMapsLoaded(); } }

function GoogleMapsLoaded() {

   gMapsLoaded = true;



  initMap()
   //google.maps.event.addDomListener(window, 'load', initMap);
   //initMap()
}


function initMap() {

  if (map_displayed) {

        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: locations[pickup][1], lng: locations[pickup][2]},
          zoom: 15,
          title: locations[pickup][0],
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,

          styles: [
            {featureType: 'poi',stylers: [{visibility: 'off'},]},

          ]
        });

        var marker = new google.maps.Marker({
          position: {lat: locations[pickup][1], lng: locations[pickup][2]},
          map: map,
        });



      var contentString = `
       <div id="content"><b>`+locations[pickup][0]+
      `</b><br />`+locations[pickup][3]+
      `<br />`+locations[pickup][4]+
      `<br />`+locations[pickup][6]+
 //     `<br /><a href="`+pickup_url[pickup]+`">website</a>`+
      `</div>`;

        var infowindow = new google.maps.InfoWindow({
           content: contentString,
        });


    marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
    infowindow.open(map, marker);

}

}

*/
