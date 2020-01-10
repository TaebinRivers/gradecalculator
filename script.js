function calculatecurrent() {
    document.getElementById("error").innerHTML = "";
    document.getElementById("currentgradeoutput").innerHTML = "";
    document.getElementById("finalgradeoutput").innerHTML = "";
    var hwGrades = document.getElementById("homeworkgrade").value;
    var quizGrades = document.getElementById("quizgrade").value;
    var testGrades = document.getElementById("testgrade").value;
    var participationGrades = document.getElementById("participationgrade").value;
    var classworkGrades = document.getElementById("classworkgrade").value;
    var hwWeight = document.getElementById("homeworkweight").value;
    var classWeight = document.getElementById("classworkweight").value;
    var partWeight = document.getElementById("participationweight").value;
    var quizWeight = document.getElementById("quizweight").value;
    var testWeight = document.getElementById("testweight").value;
    var finalWeight = document.getElementById("finalweight").value;
    console.log(hwGrades);
    //converts all of the grades into numbers
    var hwArr = convertStrToNumbers(hwGrades);
    var quizArr = convertStrToNumbers(quizGrades);
    var testArr = convertStrToNumbers(testGrades);
    var workArr = convertStrToNumbers(classworkGrades);
    var parArr = convertStrToNumbers(participationGrades);
    //converts the weights into numbers
    var hwWeightArr = parseInt(hwWeight);
    var parWeightArr = parseInt(partWeight);
    var classWeightArr = parseInt(classWeight);
    var quizWeightArr = parseInt(quizWeight);
    var testWeightArr = parseInt(testWeight);
    var finalWeightArr = parseInt(finalWeight);
    //averages all of the  arrays
    var hwAvg = avg(hwArr);
    var parAvg = avg(parArr);
    var workAvg = avg(workArr);
    var quizAvg = avg(quizArr);
    var testAvg = avg(testArr);
    console.log(hwAvg, quizAvg, testAvg, parAvg, workAvg);
    //all of the grades weighted using the user input
    var weightedHW = calculateWeight(hwAvg,hwWeightArr);
    var weightedClasswork = calculateWeight(workAvg, classWeightArr);
    var weightedPar = calculateWeight(parAvg, parWeightArr);
    var weightedQuiz = calculateWeight(quizAvg, quizWeightArr);
    var weightedTest = calculateWeight(testAvg, testWeightArr);
    console.log(weightedHW, weightedClasswork, weightedPar, weightedQuiz, weightedTest);
    var overallWeighted = weightedHW + weightedClasswork + weightedPar + weightedQuiz + weightedTest;
    var allWeights = (hwWeightArr + parWeightArr + classWeightArr + quizWeightArr + testWeightArr);
    console.log(overallWeighted, allWeights);
    var currentGrade = overallWeighted / (allWeights * .01);
    var percentCheckVar = percentCheck(hwWeightArr, classWeightArr, parWeightArr, quizWeightArr, testWeightArr, finalWeightArr);
    console.log(percentCheckVar);
    if(percentCheckVar === true){

        document.getElementById("currentgradeoutput").innerHTML = "You have a " + currentGrade+ "% in the class.";
        
    }

    var desiredGrade = document.getElementById("wantedgrade").value;
    var desiredGrade = parseInt(desiredGrade);
    console.log(finalWeightArr,currentGrade);
    var currentWeighted = (currentGrade * .01)*(1-(finalWeightArr*.01));
    console.log(currentWeighted);
    var desiredReq = (desiredGrade*.01) - (currentWeighted);
    console.log(desiredGrade,desiredReq);
    var neededGrade = (desiredReq / (finalWeightArr*.01))* 100;
    console.log(Math.floor(neededGrade));
    document.getElementById("finalgradeoutput").innerHTML = ("You need to get " + Math.floor(neededGrade) + "%  on the final to get a " + desiredGrade + "% in the class.");
    console.log(neededGrade);
    //changes the color of the table row depending on the grade avg for that part of the grade
    colorRow(hwAvg, document.getElementById("homework"));
    colorRow(workAvg, document.getElementById("classwork"));
    colorRow(parAvg, document.getElementById("participation"));
    colorRow(quizAvg, document.getElementById("quiz"));
    colorRow(testAvg, document.getElementById("tests"));

}






function calculateWeight(Avg,Weight) {
    var avg = Avg;
    var changeNum = Weight * .01;
    var weightedGrade = changeNum * avg;
    return weightedGrade;
}



function convertStrToNumbers(str) {

    var arr = str.split(",");
    for(var i = 0; i < arr.length; i++){

        arr[i] = parseInt(arr[i]);

    }

    console.log(arr);
    return arr;
}


function avg(arr) {
    sum = 0;
    for(var i = 0; i <arr.length; i++) {

        sum += arr[i];

    }
    sum = sum/arr.length;
    return sum;
}
function percentCheck(hw, classw, par, quiz, test, final) {
    var hw2 = parseInt(hw);
    var classw2 = parseInt(classw);
    var par2 = parseInt(par);
    var quiz2 = parseInt(quiz);
    var test2 = parseInt(test);
    var final2 = parseInt(final);
    var sum = hw2 + classw2 + par2 + quiz2 + test2 + final2;
    console.log(hw2, classw2, par2, quiz2, test2, final2, sum);
    if(sum == 100) {

        return true;

    }else {

        document.getElementById("error").innerHTML = "There seems to be an error with the weights of the categories. Please make sure that they " +
            "add up to 100 and try again."

    }
}


function colorRow(grade, row){

    if(grade > 100) {

        row.style.backgroundColor = "#4774c1";

    } else if(grade >= 90) {

         row.style.backgroundColor = "#2cc125";

     } else if(grade >= 80) {

         row.style.backgroundColor = "#8cff65";

     } else if(grade >= 70) {

         row.style.backgroundColor = "#fff942";
     } else if(grade > 60) {

         row.style.backgroundColor = "#ffa03a";
     } else {

         row.style.backgroundColor = "#ff2c33";
     }

}