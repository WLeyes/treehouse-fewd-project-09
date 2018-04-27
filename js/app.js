console.log('Connected to app.js');
console.log(data);


const ChartCtrl = ( () => {
// Line chart
const ctx = document.getElementById('charts--line').getContext('2d');

// Format data and split in to arrays
let hourly_labels = [], 
daily_labels = [], daily_totals=[],
weekly_labels = []; 

// Format date string
data.forEach( (e, i) => { // need element and index even though I only am using index
data[i].date = moment(data[i].date, 'MM-DD-YYYY');
});

// Set formatted hourly labels
hourly_labels.push( moment(data[0].time, 'H').format('kk a') );

// Set Daily totals and label
for(i=0;i<31;i++){
  daily_labels.push( moment(data[i].date, 'DD-MM-YYYY').format('M-D YY') );
  daily_totals.push( data[i].traffic.reduce( (total, int) => total + int, 0 ) );
  
  weekly_labels.push( moment(data[i].date,'DD-MM-YYYY').format('w') );
}

console.log( daily_labels );
console.log(daily_totals);

console.log(weekly_labels);

let week1 = [], week2 = [], week3 = [], week4 = [], week5 = [];
for(i=0; i < data.length; i++){
  switch(moment(data[i].date,'DD-MM-YYYY').format('w')){
    case '1' : week1.push(moment(data[i].date,'DD-MM-YYYY'));
    break;
    case '2' : week2.push(moment(data[i].date,'DD-MM-YYYY'));
    break;
    case '3' : week3.push(moment(data[i].date,'DD-MM-YYYY'));
    break;
    case '4' : week4.push(moment(data[i].date,'DD-MM-YYYY'));
    break;
    case '5' : week5.push(moment(data[i].date,'DD-MM-YYYY'));
    break;
  }
}

console.log(week1);
console.log(week2);
console.log(week3);
console.log(week4);
console.log(week5);



// console.log(days);

  return {
    
    hourly: () => {
      
      const chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
  
        // The data for our dataset
        data: {
          labels: time,
          datasets: [{
              label: "Hourly Traffic",
              backgroundColor: 'rgba(116, 119, 191, 0.7)',
              borderColor: '#4D4C72',
              data: data[0].traffic,
          }]
        },
        // Configuration options go here
        options: {

        }
      });
    },
    daily: () => {
      const chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
          labels: daily_labels,
          datasets: [{
              label: "Daily Traffic",
              backgroundColor: 'rgba(116, 119, 191, 0.7)',
              borderColor: '#4D4C72',
              data: daily_totals,
          }]
        },
        // Configuration options go here
        options: {

        }
      });
    },
    weekly: () => {

    },
    monthly: () => {

    },
    addData: (chart, label, data) => {
      chart.data.labels.push(label);
      chart.data.datasets.forEach( dataset => dataset.data.push(data));
      chart.update();
    },
    removeData: chart => {
      chart.data.labels.pop();
      chart.data.datasets.forEach( dataset => dataset.data.pop() );
      chart.update();
    },
  }

})();

// Data Controller
const DataCtrl = ( () => {
  // private

  // User Constructor 
  const User = ( (id, firstName, lastName, image, email) => {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.image = image;
    this.email = email;
  }) 


  // Data Structure
  const data = {
    users: [],
    currenUser: null
  }

  // Data Fetch API
  let users = [];
  function fetchUserJSON(url,numberOfUsers){  
    fetch(`${url}?results=${parseInt(numberOfUsers)}`)
      .then(response => response.json())
      .then(data => UICtrl.displayData(data))
      .catch(error => console.log(error));
  }
  // public
  return {
    getRandomUser: () => {
      fetchUserJSON('https://randomuser.me/api/',1);
    },
  }
})();

// UI Controller
const UICtrl = ( () => {
  
  const UISelectors = {
    lineChartHourly: '#hourly',
    lineChartDaily: '#daily',
    lineChartWeekly: '#weekly',
    lineChartMonthly: '#monthly',
  }

  return {
    displayData: (data) => {
      let firstName = data.results[0].name.first;
      let lastName  = data.results[0].name.last;
      let image     = data.results[0].picture.medium;
      let username = `${firstName} ${lastName}`; 
      console.log(data);
      console.log(`UICtrl: ${firstName} ${lastName}`);
      document.querySelector('img').src = image;
      document.querySelector('p').textContent = username;
     }
  }
 
})();

// App Controller
const App = ( (UICtrl, DataCtrl, ChartCtrl) => {

  const loadEventListeners = () => {

  }
  return {
    init: () => {
      console.log('Initializing App ...');
      const user = DataCtrl.getRandomUser();
      // ChartCtrl.hourly();
      ChartCtrl.daily();
    }
  }
})(UICtrl, DataCtrl, ChartCtrl);


// Initialize App
App.init()