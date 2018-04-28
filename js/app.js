console.log('Connected to app.js');
console.log(data);

// Chart controller
const ChartCtrl = ( () => {

// Format date string
data.forEach( (e, i) => { // need element and index even though I only am using index
  data[i].date = moment(data[i].date, 'MM-DD-YYYY');
});

// Format data and split in to arrays
let hourly_labels = [], 
daily_labels = [], daily_totals=[],
week1_data = [], week2_data = [],week3_data = [],week4_data = [],week5_data = [];
week1_labels = [], week2_labels = [], week3_labels = [], week4_labels = [], week5_labels = [],
weekly_labels = [], week1_data_output = [], weekly_data_output = [];

// Set formatted hourly labels
hourly_labels.push( moment(data[0].time, 'H').format('kk a') );

// Set Daily totals and label
for(i=0;i<data.length;i++){
  daily_labels.push( moment(data[i].date, 'DD-MM-YYYY').format('M/D') );
  daily_totals.push( data[i].traffic.reduce( (total, int) => total + int, 0 ) );
}

// Set Weekly totals and labels
for(i=0; i < data.length; i++){ 
  switch(moment(data[i].date,'DD-MM-YYYY').format('W')){
    case '1' : 
      week1_labels = 'Week 1';
      week1_data.push(data[i].traffic.reduce( (total, int) => total + int, 0 ));
      week1_data_output = week1_data.reduce( (total, int) => total + int, 0 );
      break;
    case '2' :
      week2_labels = 'Week 2';
      week2_data.push(data[i].traffic.reduce( (total, int) => total + int, 0 ));
      week2_data_output = week2_data.reduce( (total, int) => total + int, 0 );
      break;
    case '3' :
      week3_labels = 'Week 3';
      week3_data.push(data[i].traffic.reduce( (total, int) => total + int, 0 ));
      week3_data_output = week3_data.reduce( (total, int) => total + int, 0 );
      break;
    case '4' :
      week4_labels = 'Week 4';
      week4_data.push(data[i].traffic.reduce( (total, int) => total + int, 0 ));
      week4_data_output = week4_data.reduce( (total, int) => total + int, 0 );
      break;
    case '5' :
      week5_labels = 'Week 5';
      week5_data.push(data[i].traffic.reduce( (total, int) => total + int, 0 ));
      week5_data_output = week5_data.reduce( (total, int) => total + int, 0 );
      break;
  }
}
weekly_labels.push(week1_labels, week2_labels, week3_labels,week4_labels, week5_labels);
weekly_data_output.push(week1_data_output, week2_data_output, week3_data_output, week4_data_output, week5_data_output)

//  Now for the magic! these are the public chart functions
  return {
    
    hourly: () => {
      // Line chart
      const ctx = document.getElementById('charts--line').getContext('2d');
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
      // Line chart
      const ctx = document.getElementById('charts--line').getContext('2d');
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
      // Line chart
      const ctx = document.getElementById('charts--line').getContext('2d');
      const chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
          labels: weekly_labels,
          datasets: [{
              label: "Weekly Traffic",
              backgroundColor: 'rgba(116, 119, 191, 0.7)',
              borderColor: '#4D4C72',
              data: weekly_data_output,
          }]
        },
        // Configuration options go here
        options: {

        }
      });
    },

    monthly: () => {

    },

    // added from charts.js documentation in case I want to add or remove data
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
      .then(data => UICtrl.loggedInUser(data))
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
    loggedInUser: (data) => {
      // Logged in user info : set as random from api
      let firstName = data.results[0].name.first;
      let lastName  = data.results[0].name.last;
      let image     = data.results[0].picture.medium;
      let username = `${firstName} ${lastName}`; 
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
      // ChartCtrl.weekly();
    }
  }
})(UICtrl, DataCtrl, ChartCtrl);


// Initialize App
App.init()