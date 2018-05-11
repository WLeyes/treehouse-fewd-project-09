console.log('Connected to app.js');

// Chart controller ** note that the data is random approximations of scale (due to time)
// Also note that there is a small glitch that sometimes resets the chart (no errors, I think it happens when my user fetch api checks for data)

const ChartCtrl = ( () => {
  // Set default line chart
    let ctx = document.getElementById("charts--line").getContext('2d');
    let myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: daily_labels,
        datasets: [{
          data: daily_data,
          backgroundColor: [ 'rgba(116,119,191, 0.4)'],
          borderColor: [ 'rgba(77,76,114,1)' ],
          borderWidth: 1,
          pointBackgroundColor: '#FFF',
          pointBorderWidth: 3,
          pointRadius: 6
        },]
      },
      options: { 
        legend: { display: false },
        scales: {
          yAxes: [{
            ticks: { beginAtZero: true },
            scaleLabel: { display: true, labelString: 'Traffic' }
          }],
          xAxes: [{
            scaleLabel: { display: true, labelString: 'Daily' }
          }]
        }
      }
    });

  return {

    // display hourly data
    hourly: () => {
      myChart.data.datasets[0].data = hourly_data;
      myChart.data.labels = hourly_labels;
      myChart.options = {
        legend: { display: false },
          scales: {
            yAxes: [{
              ticks: { beginAtZero: true },
              scaleLabel: { display: true, labelString: 'Traffic' }
            }],
            xAxes: [{
              scaleLabel: { display: true, labelString: 'Hourly' }
            }]
          }
      }
      myChart.update();
    },

    // display daily data
    daily: () => {
      myChart.data.datasets[0].data = daily_data;
      myChart.data.labels = daily_labels;
      myChart.options = { 
        legend: { display: false },
        scales: {
          yAxes: [{
            ticks: { beginAtZero: true },
            scaleLabel: { display: true, labelString: 'Traffic' }
          }],
          xAxes: [{
            scaleLabel: { display: true, labelString: 'Daily' }
          }]
        }
      }
      myChart.update();
    },

    // display weekly data
    weekly: () => {
      myChart.data.datasets[0].data = weekly_data;
      myChart.data.labels = weekly_labels;
      myChart.options = { 
          legend: { display: false },
          scales: {
            yAxes: [{
              scaleLabel: { display: true, labelString: 'Traffic' }
            }],
            xAxes: [{
              scaleLabel: { display: true, labelString: 'Weekly' }
            }]
          }
        }
      myChart.update();
    },

    // display monthly data
    monthly: () => {
      myChart.data.datasets[0].data = monthly_data;
      myChart.data.labels = monthly_labels;
      myChart.options = { 
          legend: { display: false },
          scales: {
            yAxes: [{
              scaleLabel: { display: true, labelString: 'Traffic' }
            }],
            xAxes: [{
              scaleLabel: { display: true, labelString: 'Monthly' }
            }]
          }
        }
      myChart.update();
    },

    bar: () => {
      let ctx = document.getElementById("charts--bar").getContext('2d');
      let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: daily_labels,
          datasets: [{
            data: daily_data,
            backgroundColor: [
              "rgba(115, 119, 191, 1)",
              "rgba(115, 119, 191, 1)",
              "rgba(115, 119, 191, 1)",
              "rgba(115, 119, 191, 1)",
              "rgba(115, 119, 191, 1)",
              "rgba(115, 119, 191, 1)",
              "rgba(115, 119, 191, 1)"
            ],
            borderColor: [ 'rgba(77,76,114,1)' ],
            borderWidth: 1
          }],
        },
        options: { 
          legend: { display: false },
          scales: {
            yAxes: [{
              ticks: { beginAtZero: true },
              scaleLabel: { display: true, labelString: 'Traffic' }
            }],
            xAxes: [{
              scaleLabel: { display: true, labelString: 'Daily' }
            }]
          }
        }
      });
    },

    doughnut: () => {
      let ctx = document.getElementById("charts--doughnut").getContext('2d');
      let myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: browsers,
          datasets: [{
            data: [1,2,10],
            backgroundColor: ["rgba(129, 201, 143, 1)","rgba(116, 177, 191, 1)", "rgba(115, 119, 191, 1)"]
          }]
        },
        options: { 
          legend: {
            display: true,
            position: 'right',
            // labels: { fontSize: 30, padding: 20 }
          }
        }
      })
    }
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
      let username  = `${firstName} ${lastName}`; 
      document.querySelector('img').src = image;
      document.querySelector('p').textContent = username;
     },

     getSelectors: () => UISelectors
  }
})();

// App Controller
const App = ( (UICtrl, DataCtrl, ChartCtrl) => {

  // Get UI selectors 
  const UISelectors = UICtrl.getSelectors();
  
  const loadEventListeners = () => {
    document.querySelector(UISelectors.lineChartHourly).addEventListener("click", ChartCtrl.hourly);
    document.querySelector(UISelectors.lineChartDaily).addEventListener("click", ChartCtrl.daily);
    document.querySelector(UISelectors.lineChartWeekly).addEventListener("click", ChartCtrl.weekly);
    document.querySelector(UISelectors.lineChartMonthly).addEventListener("click", ChartCtrl.monthly);
  }
  
  return {
    init: () => {
      console.log('Initializing App ...');
      const user = DataCtrl.getRandomUser();
      ChartCtrl.daily();
      ChartCtrl.bar();
      ChartCtrl.doughnut();
      loadEventListeners();
    }
  }
})(UICtrl, DataCtrl, ChartCtrl);


// Initialize App
App.init()