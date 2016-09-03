//alert("Running MinervaScheduleExtension");

//inject script2.js into page
//alert("testing script");





var calCourseSchedule = ics();

//console.log(document.getElementsByClassName("datadisplaytable"));
courseTables = document.getElementsByClassName("datadisplaytable")

for (i = 0; i < courseTables.length; i+=2) {

  courseInfoTable = courseTables[i].getElementsByClassName("dddefault")
  courseSchedTable = courseTables[i+1].getElementsByClassName("dddefault")
  //console.log(courseSchedTable);

  for (j = 0; j < courseSchedTable.length; j+=6) {
    courseSemester = courseTables[0].getElementsByClassName("dddefault")[0].innerText.replace(" ","");
    courseName = courseTables[i].getElementsByClassName("captiontext")[0].innerText.split(" - ")[0];
    //console.log(courseTables[i].getElementsByClassName("captiontext")[0].innerText.split(" - "));
    courseNumber = courseTables[i].getElementsByClassName("captiontext")[0].innerText.split(" - ")[1].replace(/\s/g,"") + "-" +
                   courseTables[i].getElementsByClassName("captiontext")[0].innerText.split(" - ")[2].replace(/\s/g,"");
    startDay = courseSchedTable[j+3].innerText.split(" - ")[0];
    startTime = courseSchedTable[j+0].innerText.split(" - ")[0];
    endDay = courseSchedTable[j+3].innerText.split(" - ")[1];
    endTime = courseSchedTable[j+0].innerText.split(" - ")[1];
    courseDays = courseSchedTable[j+1].innerText.split("");
    courseLocation = "McGill " + courseSchedTable[j+2].innerText;
    //courseLocationValueArray = courseSchedTable[j+2].innerText.split(" ");
    //courseLocation = "McGill " + courseLocationValueArray[0] + " " + courseLocationValueArray[courseLocationValueArray.length-1];

    courseType = courseSchedTable[j+4].innerText

    days = ["U","M","T","W","R","F","S"];
    startDate = new Date(startDay);
    startDateHasCourse = false;
    count = 0;
    while (!startDateHasCourse && count < 7) {
      //console.log("round" + count + " startDate:" + startDate.toUTCString());
      for (l = 0; l < courseDays.length; l++) {
        //console.log("courseDays["+l+"]:" + courseDays[l]);
        //console.log("days[startDate.getDay()]:days["+startDate.getDay()+"]:" + days[startDate.getDay()] );
        if (courseDays[l] == days[startDate.getDay()]) {
          //console.log("true");
          startDateHasCourse = true;
        }
      }
      if (!startDateHasCourse) {
        startDate.setDate(startDate.getDate() + 1);
        count++
      }
    }
    startDayValues = startDate.toUTCString().split(" ");
    startDay = startDayValues[2] + " " + startDayValues[1] + ", " + startDayValues[3];
    //console.log(startDay);

    for (k = 0; k < courseDays.length; k++) {
      switch (courseDays[k]) {
        case "U":
            courseDays[k] = "SU";
            break;
        case "M":
            courseDays[k] = "MO";
            break;
        case "T":
            courseDays[k] = "TU";
            break;
        case "W":
            courseDays[k] = "WE";
            break;
        case "R":
            courseDays[k] = "TH";
            break;
        case "F":
            courseDays[k] = "FR";
            break;
        case "S":
            courseDays[k] = "SA";
            break;
      }
    }

    validDays = ["SU","MO","TU","WE","TH","FR","SA"];
    validEvent = true;
    for (m = 0; m < courseDays.length; m++) {
      validEventDay = false;
      for (n = 0; n < validDays.length; n++) {
        if (courseDays[m] == validDays[n]) {
          validEventDay = true;
        }
      }
      if (!validEventDay) {
        validEvent = false;
      }
    }
    if (validEvent) {
      var rrule = {
          freq:"WEEKLY",
          until:endDay,
          interval:1,
          byday:courseDays
      };
      calCourseSchedule.addEvent(courseNumber + " (" + courseType + ")", courseName, courseLocation, startDay + " " + startTime, startDay + " " + endTime, rrule);
    }



    var courseData = {
      courseName:courseName,
      courseNumber:courseNumber,
      startTime:startTime,
      startDay:startDay,
      endTime:endTime,
      endDay:endDay,
      courseDays:courseDays,
      courseLocation:courseLocation,
      courseType:courseType
    }
    console.log(courseData);
  }
}
console.log(courseTables)

//calCourseSchedule.download("test","ics");
schedDownload = "<div><b>Download Course Schedule as a .ICS file:</b><form method=\"get\" action=\"javascript:calCourseSchedule.download('CourseSchedule"+courseSemester+"')\"><button type=\"submit\"> <img src=\"http://i.imgur.com/mdbdu92.png height=\"80\" width=\"240\"\"></button></form></div>"
document.getElementsByClassName("pagebodydiv")[0].innerHTML = schedDownload + document.getElementsByClassName("pagebodydiv")[0].innerHTML;
// $(".pagebodydiv")[0].innerHTML = schedDownload + $(".pagebodydiv")[0].innerHTML;
