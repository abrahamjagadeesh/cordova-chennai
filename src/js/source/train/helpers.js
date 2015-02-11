function indexStationShortCode(taluk) {
    var xssc = 0;
    arrayStationNames.forEach(function (v, i) {
        if (v.value === taluk) {
            xssc = i;
            return;
        }
    });
    return xssc;
}

// function onlyThisTrains(loc) {
// 	var dLen = data.length;
// 	var result = {};
// 	//var loop = 0;

// 	while (dLen--) {
// 		if (data[dLen].train === loc) {
// 			result = data[dLen];
// 			break;
// 		}
// 	}

// 	//now loop results
// 	var stations = result.stations,
// 		stationsLen = stations.length,
// 		stationsHelp = 0;

// 	while (stationsLen--) {
// 		console.log(stations[stationsHelp],startingTimeOfTrainsFromThisStation.apply(null, [["09", "35"], result.timeDifferenceFromSource[stationsHelp]]));		
// 		stationsHelp++;
// 	}


// 	//startingTimeOfTrainsFromThisStation(val, timetaken)
// }
//onlyThisTrains('MSBGPDLOCALDaily');

function whenNextTrain(valueToCheck) {
    var currentTime = calcCurrentTime();
    var valueToCheck = valueToCheck;
    //var valueToCheck = [17, 51];
    var newCinArray = [];
    var hours = 0;
    var cinMins = currentTime.hour * 60 + currentTime.minutes;
    var vtcinMins;
    if (valueToCheck[0] < currentTime.hour) {
        vtcinMins = (valueToCheck[0] + 24) * 60 + valueToCheck[1];
    } else {
        vtcinMins = valueToCheck[0] * 60 + valueToCheck[1];
    }
    var newCinMins = vtcinMins - cinMins;

    if (newCinMins > 59) {
        var extraHours = Math.floor(newCinMins / 60);
        var newHours = hours + extraHours;
        newCinArray[1] = newCinMins % 60;
        newCinArray[0] = newHours >= 24 ? newHours - 24 : newHours;
    } else {
        newCinArray[1] = newCinMins;
        newCinArray[0] = hours;
    }

    this.getNextTime = newCinArray;
    this.getInText = (function () {
        var text_hour = newCinArray[0] === 1 ? " hour " : " hours ";
        if (newCinArray[1] === 0) {
            return 'Now';
        } else {
            return newCinArray[0] !== 0 ? "in " + newCinArray[0] + text_hour + newCinArray[1] + " Minutes" : "in " + newCinArray[1] + " Minutes";
        }
    }())
}


function startingTimeOfTrainsFromThisStation(val, timetaken) {
    var mins = parseInt(val[1]);
    var hours = parseInt(val[0]);
    var newMins = mins + timetaken;
    var newVal = [];

    if (newMins > 59) {
        var extraHours = Math.floor(newMins / 60);
        var newHours = hours + extraHours;
        newVal[1] = newMins % 60;
        newVal[0] = newHours >= 24 ? newHours - 24 : newHours;
    } else {
        newVal[1] = mins + timetaken;
        newVal[0] = hours;
    }
    return newVal;
}

function calcCurrentTime() {
    var currentTime = {};
    var wholeDate = new Date;
    currentTime.hour = wholeDate.getHours();
    currentTime.minutes = wholeDate.getMinutes();
    currentTime.day = wholeDate.getDay();
    return currentTime;
}

function trainsStopInThisStation(source, destination, isNextDay, isFullday) {
    var currentTime = calcCurrentTime();
    var startingTimeOfALLMatchedTrain = [];
    var nextTrains = [];
    var isvalid = false;
    var isSunday;
    if (isNextDay === "true" && currentTime.day === 6 || (isNextDay === "false" && currentTime.day === 0 || isFullday && currentTime.day === 6)) {
        isSunday = true;
    } else {
        isSunday = false;
    }
    var todayTrains = data.filter(function (train) {
        if (isSunday) {
            return train.runday[0] == "Su" || train.runday[0] == "Daily";
        } else {
            return train.runday[0] == "M" || train.runday[0] == "Daily";
        }
    });

    for (i = 0; i < todayTrains.length; i++) {
        var thisTrain = todayTrains[i];
        var stationsThatTrainCross = thisTrain.stations;
        var timeDifferencebtwStaionsAndSource = thisTrain.timeDifferenceFromSource;
        var timeDifferencebtwEachStations = thisTrain.actualtimeDifferenceFromSource;
        var totalJourneyTime = 0;
        var kmBtwEachStaions = thisTrain.distance;
        var totalJourneyKM = 0;
        var startingTimeFromSource = thisTrain.startingTime;
        var thisTrainName = thisTrain.train;
        var indexOfSourceStation = stationsThatTrainCross.indexOf(source);
        var indexOfDestinationStaion = stationsThatTrainCross.indexOf(destination);
        if (indexOfSourceStation < indexOfDestinationStaion && (indexOfSourceStation >= 0 && indexOfDestinationStaion >= 0)) {
            isvalid = true;
            timeTakentoReachHere = timeDifferencebtwStaionsAndSource[indexOfSourceStation];
            for (var ss = indexOfSourceStation + 1; ss <= indexOfDestinationStaion; ss++) {
                totalJourneyTime = totalJourneyTime + timeDifferencebtwEachStations[ss];
            }
            totalJourneyKM = parseInt(kmBtwEachStaions[indexOfDestinationStaion]) - parseInt(kmBtwEachStaions[indexOfSourceStation]);
            var xcf = 0;
            var tcf = startingTimeFromSource.length
            while (tcf--) {
                var stta = startingTimeOfTrainsFromThisStation(startingTimeFromSource[xcf], timeTakentoReachHere);

                var startingTimeWithPaddedZero = [];
                var this_train_hour = stta[0];
                var this_train_minutes = stta[1];
                startingTimeWithPaddedZero[0] = this_train_hour < 10 ? "0" + this_train_hour : "" + this_train_hour;
                startingTimeWithPaddedZero[1] = this_train_minutes < 10 ? "0" + this_train_minutes : "" + this_train_minutes;
                var tr = {};
                var totalMins = 0;
                if (isNextDay === "true" || isFullday) {
                    totalMins = this_train_hour * 60 + this_train_minutes;
                    tr.trainName = thisTrainName;
                    tr.hoursMinutes = stta;
                    tr.hoursMinutesZeroPadded = startingTimeWithPaddedZero;
                    tr.hoursPlusMins = totalMins;
                    tr.totalJourneyTime = totalJourneyTime + " Minutes";
                    tr.totalJourneyKM = totalJourneyKM + "KM";
                    tr.fulltrainname = thisTrain.fulltrainname;
                    tr.thisStartingTIme = startingTimeFromSource[xcf];
                    tr.whenNextTrain = new whenNextTrain(stta).getInText;

                    nextTrains.push(tr);
                } else {
                    if (this_train_hour == currentTime.hour && this_train_minutes >= currentTime.minutes || this_train_hour > currentTime.hour) {
                        totalMins = this_train_hour * 60 + this_train_minutes;
                        tr.trainName = thisTrainName;
                        tr.hoursMinutes = stta;
                        tr.hoursMinutesZeroPadded = startingTimeWithPaddedZero;
                        tr.hoursPlusMins = totalMins;
                        tr.totalJourneyTime = totalJourneyTime + " Minutes";
                        tr.totalJourneyKM = totalJourneyKM + "KM";
                        tr.fulltrainname = thisTrain.fulltrainname;
                        tr.thisStartingTIme = startingTimeFromSource[xcf];
                        tr.whenNextTrain = new whenNextTrain(stta).getInText;

                        nextTrains.push(tr);
                    }
                }
                stta = [];
                xcf++;
            }

        }
    }

    nextTrains.sort(function (a, b) {
        return a.hoursPlusMins - b.hoursPlusMins;
    });
    var fiveTrains = [];
    for (var op = 0; op < 5; op++) {
        if (nextTrains[op] !== undefined) {
            fiveTrains.push(nextTrains[op]);
        }
    }
    //debugger;
    return {
        isvalid: isvalid,
        nextTrains: nextTrains,
        currentTrainArray: nextTrains[0],
        nextFiveTrainsArray: fiveTrains
    };
};