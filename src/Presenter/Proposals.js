import './CapacityBox.css';
//import vehicle capacity used
import cap_hol from '../files/JS/Vehicle_Capacity/Vehicle_Capacity_hol';
import cap_week_1_2 from '../files/JS/Vehicle_Capacity/Vehicle_Capacity_week1_2';
import cap_week_3_4 from '../files/JS/Vehicle_Capacity/Vehicle_Capacity_week3_4';
import cap_wknd from '../files/JS/Vehicle_Capacity/Vehicle_Capacity_weekend';
//import avg num of passengers ? or inpuy
import mpas_hol34 from '../files/JS/MeanPassengers/mPass_hol_3_4';
import mpas_hol12 from '../files/JS/MeanPassengers/mPass_hol_1_2';
import mPass_wkn12 from '../files/JS/MeanPassengers/mPass_wkn_1_2';
import mPass_wkn34 from '../files/JS/MeanPassengers/mPass_wkn_3_4';
import mPass_week1 from '../files/JS/MeanPassengers/mPass_week_1';
import mPass_week2 from '../files/JS/MeanPassengers/mPass_week_2';
import mPass_week3 from '../files/JS/MeanPassengers/mPass_week_3';
import mPass_week4 from '../files/JS/MeanPassengers/mPass_week_4';
var mean_pass;

export var printProposals = function (route_hour, mean, chosen_slot, givenDaykind) {

    if (givenDaykind === "holidays") {

        if (chosen_slot === 1 || chosen_slot === 2) {

            mean_pass = mpas_hol12[route_hour];
        } else if (chosen_slot === 3 || chosen_slot === 4) {
            mean_pass = mpas_hol34[route_hour];
        }

    } else if (givenDaykind === "weekend") {

        if (chosen_slot === 1 || chosen_slot === 2) {

            mean_pass = mPass_wkn12[route_hour];
        } else if (chosen_slot === 3 || chosen_slot === 4) {
            mean_pass = mPass_wkn34[route_hour];
        }


    } else if (givenDaykind === "weekday") {
        if (chosen_slot === 1) {

            mean_pass = mPass_week1[route_hour];
        } else if (chosen_slot === 2) {
            mean_pass = mPass_week2[route_hour];
        } else if (chosen_slot === 3) {
            mean_pass = mPass_week3[route_hour];
        } else if (chosen_slot === 4) {
            mean_pass = mPass_week4[route_hour];
        }


    }
    document.getElementById("avg").value = mean_pass;

    if (parseInt(mean_pass) <= 5) {

        if (givenDaykind === "holidays") {
            document.getElementById("used").value = cap_hol[route_hour];


        } else if (givenDaykind === "weekend") {
            document.getElementById("used").value = cap_wknd[route_hour];



        } else if (givenDaykind === "weekday") {

            if (chosen_slot === 1 || chosen_slot === 2) {
                document.getElementById("used").value = cap_week_1_2[route_hour];

            } else if (chosen_slot === 3 || chosen_slot === 4) {
                document.getElementById("used").value = cap_week_3_4[route_hour];

            }

        }
        document.getElementById("proposal").value = "Consider decreasing the frequency of this route.";
    } else {

        if (givenDaykind === "holidays") {
            document.getElementById("used").value = cap_hol[route_hour];
            if (parseInt(mean_pass) <= parseInt(cap_hol[route_hour]) && parseInt(mean_pass) <= 50 && parseInt(cap_hol[route_hour]) === 50) {
                document.getElementById("proposal").value = "Correct choice of bus vehicle!";
            } else if (parseInt(mean_pass) <= parseInt(cap_hol[route_hour]) && parseInt(mean_pass) > 50 && parseInt(cap_hol[route_hour]) === 100) {
                document.getElementById("proposal").value = "Correct choice of bus vehicle!";
                //if pass <= capacity of bus & pass<50 & capacity ==100 -> better single
            } else if (parseInt(mean_pass) <= parseInt(cap_hol[route_hour]) && parseInt(mean_pass) <= 50 && parseInt(cap_hol[route_hour]) === 100) {
                document.getElementById("proposal").value = "Α single bus should have been used.";
            } else if (parseInt(mean_pass) > parseInt(cap_hol[route_hour]) && parseInt(cap_hol[route_hour]) === 50) {
                document.getElementById("proposal").value = "Α double bus should have been used.";
            } else if (parseInt(mean_pass) > parseInt(cap_hol[route_hour]) && parseInt(cap_hol[route_hour]) === 100) {
                document.getElementById("proposal").value = "Consider increasing the frequency of this route.";
            }

        } else if (givenDaykind === "weekend") {
            document.getElementById("used").value = cap_wknd[route_hour];

            //if pass <= capacity of bus & pass<=50 & capacity =50
            if (parseInt(mean_pass) <= parseInt(cap_wknd[route_hour]) && parseInt(mean_pass) <= 50 && parseInt(cap_wknd[route_hour]) === 50) {
                document.getElementById("proposal").value = "Correct choice of bus vehicle!";

                //if pass <= capacity of bus & pass>50 & capacity ==100
            } else if (parseInt(mean_pass) <= parseInt(cap_wknd[route_hour]) && parseInt(mean_pass) > 50 && parseInt(cap_wknd[route_hour]) === 100) {
                document.getElementById("proposal").value = "Correct choice of bus vehicle!";

                //if pass > capacity of bus & capacity ==50
            } else if (parseInt(mean_pass) <= parseInt(cap_wknd[route_hour]) && parseInt(mean_pass) <= 50 && parseInt(cap_wknd[route_hour]) === 100) {
                document.getElementById("proposal").value = "Α single bus should have been used.";
            }
            else if (parseInt(mean_pass) > parseInt(cap_wknd[route_hour]) && parseInt(cap_wknd[route_hour]) === 50) {

                document.getElementById("proposal").value = "Α double bus should have been used.";
                //if pass > capacity of bus & capacity ===100 -> increase frequency
            } else if (parseInt(mean_pass) > parseInt(cap_wknd[route_hour]) && parseInt(cap_wknd[route_hour]) === 100) {

                document.getElementById("proposal").value = "Consider increasing the frequency of this route.";
            }

        } else if (givenDaykind === "weekday") {

            if (chosen_slot === 1 || chosen_slot === 2) {
                document.getElementById("used").value = cap_week_1_2[route_hour];
                if (parseInt(mean_pass) <= parseInt(cap_week_1_2[route_hour]) && parseInt(mean_pass) <= 50 && parseInt(cap_week_1_2[route_hour]) === 50) {
                    document.getElementById("proposal").value = "Correct choice of bus vehicle!";

                } else if (parseInt(mean_pass) <= parseInt(cap_week_1_2[route_hour]) && parseInt(mean_pass) > 50 && parseInt(cap_week_1_2[route_hour]) === 100) {
                    document.getElementById("proposal").value = "Correct choice of bus vehicle!";
                }
                else if (parseInt(mean_pass) <= parseInt(cap_week_1_2[route_hour]) && parseInt(mean_pass) <= 50 && parseInt(cap_week_1_2[route_hour]) === 100) {
                    document.getElementById("proposal").value = "Α single bus should have been used.";

                } else if (parseInt(mean_pass) > parseInt(cap_week_1_2[route_hour]) && parseInt(cap_week_1_2[route_hour]) === 50) {

                    document.getElementById("proposal").value = "Α double bus should have been used.";

                } else if (parseInt(mean_pass) > parseInt(cap_week_1_2[route_hour]) && parseInt(cap_week_1_2[route_hour]) === 100) {

                    document.getElementById("proposal").value = "Consider increasing the frequency of this route.";

                }
            } else if (chosen_slot === 3 || chosen_slot === 4) {
                document.getElementById("used").value = cap_week_3_4[route_hour];
                if (parseInt(mean_pass) <= parseInt(cap_week_3_4[route_hour]) && parseInt(mean_pass) <= 50 && parseInt(cap_week_3_4[route_hour]) === 50) {
                    document.getElementById("proposal").value = "Correct choice of bus vehicle!";

                } else if (parseInt(mean_pass) <= parseInt(cap_week_3_4[route_hour]) && parseInt(mean_pass) > 50 && parseInt(cap_week_3_4[route_hour]) === 100) {
                    document.getElementById("proposal").value = "Correct choice of bus vehicle!";

                }
                else if (parseInt(mean_pass) <= parseInt(cap_week_3_4[route_hour]) && parseInt(mean_pass) <= 50 && parseInt(cap_week_3_4[route_hour]) === 100) {
                    document.getElementById("proposal").value = "Α single bus should have been used.";

                }
                else if (parseInt(mean_pass) > parseInt(cap_week_3_4[route_hour]) && parseInt(cap_week_3_4[route_hour]) === 50) {

                    document.getElementById("proposal").value = "Α double bus should have been used.";

                } else if (parseInt(mean_pass) > parseInt(cap_week_3_4[route_hour]) && parseInt(cap_week_3_4[route_hour]) === 100) {

                    if((parseInt(mean_pass) - 100 ) <27){
                        document.getElementById("proposal").value = "Consider using a backup bus for this route.";
                    }else{
                        document.getElementById("proposal").value = "Consider increasing the frequency of this route.";
                    }

                }
            }


        }

    }
}

function Proposals() {

    return (

        <div class="capacity-box">
            <h2> <p> Suggestions </p> </h2>
            <label for="Capacity">Average Passengers : </label>
            <input type="text" id="avg" name="fname" value=" " class="resizedTextbox"></input>
            <h1></h1>
            <label for="Capacity">Capacity of bus used  : </label>
            <input type="text" id="used" name="fname" value=" " class="resizedTextbox"></input>
            <h1></h1>
            <label for="Capacity">Notes/Proposals : </label>
            <input type="text" id="proposal" name="fname" value=" " class="resizedTextbox"></input>
            <h1></h1>
        </div>

    );


}

export default Proposals;