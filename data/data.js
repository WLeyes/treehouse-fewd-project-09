let traffic;
let randombrowser;
let time = [];

// Generate random traffic values
let r = () => Math.floor(Math.random() * 1000);

function random(){
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
 function randomBrowser(){
  browser = new Array(24);
  for(i=0; i < browser.length; i++){
    browser[i] = m();
  }
  return browser;
}

// format and generate time scale
for(i=0;i<24;i++){
  time.push( moment( i, 'k' ).format('kk:mm A') );
}

const data = [
  { date: '01-01-2018',time: time,traffic: random(),browser: randomBrowser()},
  { date: '01-02-2018',time: time,traffic: random(),browser: randomBrowser()},
  { date: '01-03-2018',time: time,traffic: random(),browser: randomBrowser()},
  { date: '01-04-2018',time: time,traffic: random(),browser: randomBrowser()},
  { date: '01-05-2018',time: time,traffic: random(),browser: randomBrowser()},
  { date: '01-06-2018',time: time,traffic: random(),browser: randomBrowser()},
  { date: '01-07-2018',time: time,traffic: random(),browser: randomBrowser()},
  { date: '01-08-2018',time: time,traffic: random(),browser: randomBrowser()},
  { date: '01-09-2018',time: time,traffic: random(),browser: randomBrowser()},
  { date: '01-10-2018',time: time,traffic: random(),browser: randomBrowser()},
  { date: '01-11-2018',time: time,traffic: random(),browser: randomBrowser()},
  { date: '01-12-2018',time: time,traffic: random(),browser: randomBrowser()},
  { date: '01-13-2018',time: time,traffic: random(),browser: randomBrowser()},
  { date: '01-14-2018',time: time,traffic: random(),browser: randomBrowser()},
  { date: '01-15-2018',time: time,traffic: random(),browser: randomBrowser()},
  { date: '01-16-2018',time: time,traffic: random(),browser: randomBrowser()},
  { date: '01-17-2018',time: time,traffic: random(),browser: randomBrowser()},
  { date: '01-18-2018',time: time,traffic: random(),browser: randomBrowser()},
  { date: '01-19-2018',time: time,traffic: random(),browser: randomBrowser()},
  { date: '01-20-2018',time: time,traffic: random(),browser: randomBrowser()},
  { date: '01-21-2018',time: time,traffic: random(),browser: randomBrowser()},
  { date: '01-22-2018',time: time,traffic: random(),browser: randomBrowser()},
  { date: '01-23-2018',time: time,traffic: random(),browser: randomBrowser()},
  { date: '01-24-2018',time: time,traffic: random(),browser: randomBrowser()},
  { date: '01-25-2018',time: time,traffic: random(),browser: randomBrowser()},
  { date: '01-26-2018',time: time,traffic: random(),browser: randomBrowser()},
  { date: '01-27-2018',time: time,traffic: random(),browser: randomBrowser()},
  { date: '01-28-2018',time: time,traffic: random(),browser: randomBrowser()},
  { date: '01-29-2018',time: time,traffic: random(),browser: randomBrowser()},
  { date: '01-30-2018',time: time,traffic: random(),browser: randomBrowser()},
  { date: '01-31-2018',time: time,traffic: random(),browser: randomBrowser()},
]