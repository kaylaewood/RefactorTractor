class Activity {
  constructor(activityData) {
    this.activityData = activityData;
  }

  findCurrentUserData(userId) {
    return this.activityData.filter((activityObj) => activityObj.userID === userId);
  }

  returnStairsClimbedAllUsersByDate(date)  {
    return this.activityData.filter((activityObj) => activityObj.date === date).reduce((activityObjA, activityObjB) => activityObjA + activityObjB.flightsOfStairs, 0);
  }

  returnStepsTakenAllUsersByDate(date) {
    return this.activityData.filter((activityObj) => activityObj.date === date).reduce((activityObjA, activityObjB) => activityObjA + activityObjB.numSteps, 0);
  } 

  returnActiveMinutesAllUsersByDate(date) {
    return this.activityData.filter((activityObj) => activityObj.date === date).reduce((activityObjA, activityObjB) => activityObjA + activityObjB.minutesActive, 0);
  } 

  returnMilesWalkedByDate(user, date) {
    let numOfSteps = this.activityData.find(activityObj => activityObj.userID === user.id && activityObj.date === date).numSteps;
    return parseInt(((numOfSteps * user.strideLength) / 5280).toFixed(0));
  } 

  returnActiveMinutesByDate(userId, date) {
    return this.findCurrentUserData(userId).find(elem => {
      return elem.date === date
    }).minutesActive
  } 

  returnAvgActiveMinutesByWeek(userId, date) {
    let index = this.findCurrentUserData(userId).findIndex((activityObj) => activityObj.date === date);
    let userActiveMins = this.findCurrentUserData(userId).map(activityObj => activityObj.minutesActive).splice(index, 7);
    return parseInt(userActiveMins.reduce((totalMins, dailyActiveMins) => {
      totalMins += dailyActiveMins;
      return totalMins;
    }, 0) / 7);
  } 


  checkStepGoalMetByDate(user, date) {
    if ((user.dailyStepGoal) <= (this.findCurrentUserData(user.id).find(elem => elem.date === date).numSteps)) {
      return true;
    }
    return false; 
  } 

  returnAllDaysStepGoalExceeded(user) {
    return this.activityData.filter((activityObj) => activityObj.userID === user.id && activityObj.numSteps > user.dailyStepGoal).map(activityObj => activityObj.date);
  } 

  returnStairClimbingRecord(userId) {
    return this.findCurrentUserData(userId).sort((value1, value2) => {
      return value2.flightsOfStairs - value1.flightsOfStairs
    })[0].flightsOfStairs
  }
}

if (typeof module !== 'undefined') {
  module.exports = Activity;
}
