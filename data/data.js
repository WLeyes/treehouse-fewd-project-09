let traffic;
let randombrowser;
let browser_data = [];
// Generate random 'traffic' values
let r = () => Math.floor(Math.random() * 1000);

function randomTraffic(){
  traffic = new Array(24);
  for(i=0; i < traffic.length; i++){
    traffic[i] = r();
  }
  return traffic;
}

let browsers = [ 'phones','tablet','desktop' ];
let m = () => {
  randombrowser = Math.floor(Math.random() * browsers.length);
  return browsers[randombrowser];
}
 function randomBrowser(){ browser = new Array(24); for(i=0; i < browser.length; i++){ browser[i] = m();} return browser; }

 for(let i = 0; i < 28; i++){
  browser_data.push(randomBrowser());
 }

let sunday = [], monday = [],tuesday = [],wednesday = [], thursday = [],friday = [],saturday= [], data = randomTraffic()

function random(){
  weekday = new Array(7);
  for(i=0; i < weekday.length; i++){
    weekday[i] = randomTraffic();
  }
  return weekday;
}
// set some random defaults
week1 = [
      sunday    = random(),
      monday    = random(),
      tuesday   = random(),
      wednesday = random(),
      thursday  = random(),
      friday    = random(),
      saturday  = random()
    ], 
    week2 = [
      sunday    = random(),
      monday    = random(),
      tuesday   = random(),
      wednesday = random(),
      thursday  = random(),
      friday    = random(),
      saturday  = random()
    ], 
    week3 = [
      sunday    = random(),
      monday    = random(),
      tuesday   = random(),
      wednesday = random(),
      thursday  = random(),
      friday    = random(),
      saturday  = random()
    ], 
    week4 = [
      sunday    = random(),
      monday    = random(),
      tuesday   = random(),
      wednesday = random(),
      thursday  = random(),
      friday    = random(),
      saturday  = random()
    ]
month = [week1, week2, week3, week4];

const reducer = (accumulator, currentValue) => accumulator + currentValue;

hourly_labels = ["00:00 am","01:00 am","02:00 am","03:00 am","04:00 am","05:00 am","06:00 am","07:00 am","08:00 am","09:00 am","10:00 am","11:00 am","12:00 pm","13:00 pm","14:00 pm","15:00 pm","16:00 pm","17:00 pm","18:00 pm","19:00 pm","20:00 pm","21:00 pm","22:00 pm","23:00 pm"];
hourly_data = randomTraffic();


week1 = [
  week1[0][0].reduce(reducer,0),
  week1[1][0].reduce(reducer,0),
  week1[2][0].reduce(reducer,0),
  week1[3][0].reduce(reducer,0),
  week1[4][0].reduce(reducer,0),
  week1[5][0].reduce(reducer,0),
  week1[6][0].reduce(reducer,0),
];

week2 = [
  week2[0][0].reduce(reducer,0),
  week2[1][0].reduce(reducer,0),
  week2[2][0].reduce(reducer,0),
  week2[3][0].reduce(reducer,0),
  week2[4][0].reduce(reducer,0),
  week2[5][0].reduce(reducer,0),
  week2[6][0].reduce(reducer,0),
];

week3 = [
  week3[0][0].reduce(reducer,0),
  week3[1][0].reduce(reducer,0),
  week3[2][0].reduce(reducer,0),
  week3[3][0].reduce(reducer,0),
  week3[4][0].reduce(reducer,0),
  week3[5][0].reduce(reducer,0),
  week3[6][0].reduce(reducer,0),
];

week4 = [
  week4[0][0].reduce(reducer,0),
  week4[1][0].reduce(reducer,0),
  week4[2][0].reduce(reducer,0),
  week4[3][0].reduce(reducer,0),
  week4[4][0].reduce(reducer,0),
  week4[5][0].reduce(reducer,0),
  week4[6][0].reduce(reducer,0),
];

daily_labels  = moment.weekdays();
daily_data = randomTraffic();


// weekly and monthly currently do not reflect accurate to scale data.(just there as a proof of concept) todo: create and link json with properly scaled data
weekly_labels = ["1-7", "8-14", "15-21", "22-28"]
weekly_data = week1;

monthly_labels = moment.months();
monthly_data = week1.concat(week2, week3, week4);


function countInArray(array, value) {
  var count = 0;
  for (var i = 0; i < array.length; i++) {
    array[0].concat(array[i]);
      if (array[i] === value) {
          count++;
      }
  }
  return count;
}


for(let i = 0; i < browser_data.length; i++){
  // browser_data = browser_data.concat(browser_data[i]);
}

console.log(browser_data);

console.log(countInArray( browser_data, 'phones') );
console.log(countInArray( browser_data, 'tablet') );
console.log(countInArray( browser_data, 'desktop') );