function stationsChanged(part, sop, dop, sectionName, isFullday, _rootscope) {
    try {
        if (isFullday) {
            var results = trainsStopInThisStation(sop.value, dop.value, "false", true)
        } else {
            var results = trainsStopInThisStation(sop.value, dop.value, "false", false)
        }
        part.destinationCorrect = results.isvalid;
        if (part.destinationCorrect) {
            var ls = [];
            ls[0] = sop.value;
            ls[1] = dop.value;
            localStorage.setItem(sectionName, ls.toString());

            part.noTrains = false;
            part.trainsArray = results;
            var lengthOfCurrentNext = part.trainsArray.nextTrains.length;
            if (lengthOfCurrentNext === 0) {
                part.trainsArray = trainsStopInThisStation(sop.value, dop.value, "true", true);
                lengthOfCurrentNext = part.trainsArray.nextTrains.length;
            }
            var lastTrainForToday = part.trainsArray.nextTrains[lengthOfCurrentNext - 1].hoursPlusMins;
            var nowHoursMinutes = calcCurrentTime().hour * 60 + calcCurrentTime().minutes;
            if (lastTrainForToday < nowHoursMinutes) {
                part.trainsArray = trainsStopInThisStation(sop.value, dop.value, "true", true);
            }
            var lengthOfCurrentNextFive = part.trainsArray.nextFiveTrainsArray.length;
            if (lengthOfCurrentNextFive < 5) {
                var newNextFive = trainsStopInThisStation(sop.value, dop.value, "true", true);
                for (var gcc = lengthOfCurrentNextFive, mcc = 0; mcc < 5 - lengthOfCurrentNextFive; gcc++) {
                    part.trainsArray.nextTrains.push(newNextFive.nextFiveTrainsArray[mcc]);
                    mcc++;
                }
                part.trainsArray.nextFiveTrainsArray = part.trainsArray.nextTrains;
                part.trainsArray.currentTrainArray = part.trainsArray.nextFiveTrainsArray[0];
            }
            part.whenInlineChange = false;
            _rootscope.whenLocationChange = false;
            //			_rootscope.section1.whenInlineChange = false;
            //			_rootscope.section2.whenInlineChange = false;
            //			_rootscope.section3.whenInlineChange = false;
            //			_rootscope.section4.whenInlineChange = false;


        } else {
            part.trainsArray = [];
            part.noTrains = true;
        }
    } catch (e) {
        console.log(e)
    }
};

function reloadCurrentTime(scope, sec, sectionString, $timeout, $rootScope) {
    var args = Array.prototype.slice.call(arguments, 0);
    $timeout(function () {
        var getTime = calcCurrentTime(),
            getTotalMins = parseInt(getTime.hour) * 60 + parseInt(getTime.minutes);
        var firstSectionFirstTime = sec.trainsArray.currentTrainArray.hoursMinutes[0] * 60 + sec.trainsArray.currentTrainArray.hoursMinutes[1];
        //if (getTotalMins > firstSectionFirstTime) {
        scope.stationsChanged(sec, sec.source, sec.destination, sectionString, false, $rootScope);
        //}
        reloadCurrentTime.apply(this, args);
    }, 10E3);
}