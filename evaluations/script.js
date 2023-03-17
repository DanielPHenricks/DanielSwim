(function(window, document, undefined){

    window.onload = init; //wait for the html window to load
      function init () {
      readInFile(); //start the logic
    }
     function readInFile () {
      let params = (new URL(document.location)).searchParams;
      let name = params.get('name'); // is the string from search params 
      let year = params.get('year');
      fetch("evals.json") //fetch the json
      .then(response => response.json()) //jsonify it for js, then
      .then(json => {
        let person = undefined;
          if(year != null){ //I have taught this person for more than one year (year is specified in the link)
            person = json.find(user => user.name == name && user.year == year); //both must be found
          }
          else person = json.find(user => user.name == name && user.year == 2022) //find if the user's name is present in the JSON array (this must be a new student)
          if(person == undefined){
              alert("Invalid link")
              //window.location.href = "https://danielswim.com"; *** I am not redirecting invalid URLs *** 
          }
          else {
              document.getElementById("year").innerHTML = "Summer " + person.year + " Evaluation DanielSwim.com"
              document.getElementById("studentName").innerHTML = "Student Name: " + person.name; //set the name in the html top
              let totalSum = 0; //don't reset this one
              let sum = 0;
              
  
              for(let i = 1; i <= 4; i++){
                  let obj = document.getElementById("b"+i); //names of the ids of the scoring sections
                  let str = obj.innerHTML;
                  obj.innerHTML = person.basicScores[i-1] + str.substring(1);
                  sum += person.basicScores[i-1];
              }
              totalSum += sum;
              document.getElementById("basicText").innerHTML = sum + "/10";
              let b = sum*36;
              document.getElementById("basicCircle").style.setProperty("--degree", b+"deg"); // edit the css of the circle
              if(sum == 10) document.getElementById("basicCircle").style.setProperty("--color", "#FFC56C");
              sum = 0;
  
  
              for(let i = 1; i <= 5; i++){
                  let obj = document.getElementById("f"+i);
                  let str = obj.innerHTML;
                  obj.innerHTML = person.freeScores[i-1] + str.substring(1);
                  sum += person.freeScores[i-1];
              }
              totalSum += sum;
              document.getElementById("freestyleText").innerHTML = sum + "/20";
              b = sum * 18;
              document.getElementById("freestyleCircle").style.setProperty("--degree", b+"deg");
              if(sum == 20) document.getElementById("freestyleCircle").style.setProperty("--color", "#FFC56C");
              sum = 0;
  
  
              for(let i = 1; i <= 4; i++){
                  let obj = document.getElementById("bk"+i);
                  let str = obj.innerHTML;
                  obj.innerHTML = person.backScores[i-1] + str.substring(1);
                  sum += person.backScores[i-1];
              }
              totalSum += sum;
              document.getElementById("backText").innerHTML = sum + "/10";
              b = sum * 36;
              document.getElementById("backCircle").style.setProperty("--degree", b+"deg");
              if(sum == 10) document.getElementById("backCircle").style.setProperty("--color", "#FFC56C");
              sum = 0;
  
  
              for(let i = 1; i <= 6; i++){
                  let obj = document.getElementById("bf"+i);
                  let str = obj.innerHTML;
                  obj.innerHTML = person.otherScores[i-1] + str.substring(1);
                  sum += person.otherScores[i-1];
              }


              totalSum += sum;
              document.getElementById("butterflyText").innerHTML = sum + "/10";
              b = sum *36;
              document.getElementById("butterflyCircle").style.setProperty("--degree", b+"deg");
              if(sum == 10) document.getElementById("butterflyCircle").style.setProperty("--color", "#FFC56C");

              document.getElementById("totalText").innerHTML = totalSum + "/50" //the circle at the top
              b =totalSum*7.2; //50 * 7.2 = 360
              document.getElementById("totalCircle").style.setProperty("--degree", b+"deg");
              if(person.freeTime != undefined){
                let freestyleTime = document.getElementById("freeTime");
                freestyleTime.innerHTML += " " + person.freeTime;
                freestyleTime.style.setProperty("visibility", "visible");
              }
              if(totalSum == 50){ //you got a perfect score!
                document.getElementById("totalCircle").style.setProperty("--color", "#FFC56C"); //this is a custom color for perfect scores
              }
            }   
      });
    }
  })(window, document, undefined);