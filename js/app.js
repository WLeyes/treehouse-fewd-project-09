console.log('Connected to app.js');

// Chart controller ** note that the data is random approximations of scale (due to time i couldn't accurately scale the weekly and monthly data ... just enough as a proof of concept)

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
            xAxes: [{ scaleLabel: { display: true, labelString: 'Hourly' } }],
            yAxes: [{
              ticks: { beginAtZero: true },
              scaleLabel: { display: true, labelString: 'Traffic' }
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
          xAxes: [{ scaleLabel: { display: true, labelString: 'Daily' } }],
          yAxes: [{ ticks: { beginAtZero: true }, scaleLabel: { display: true, labelString: 'Traffic' } }]
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
            xAxes: [{ scaleLabel: { display: true, labelString: 'Weekly' } }],
            yAxes: [{ scaleLabel: { display: true, labelString: 'Traffic' } }]
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
            xAxes: [{ scaleLabel: { display: true, labelString: 'Monthly' } }],
            yAxes: [{ scaleLabel: { display: true, labelString: 'Traffic' } }],
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
            xAxes: [{ scaleLabel: { display: true, labelString: 'Daily' } }],
            yAxes: [{
              ticks: { beginAtZero: true },
              scaleLabel: { display: true, labelString: 'Traffic' }
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
          legend: { display: true, position: 'top' }
        }
      })
    }
  }
})();

// Data Controller
const DataCtrl = ( () => {

  // User Constructor 
  const User = ( (id, firstName, lastName, image, email) => {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.image = image;
    this.email = email;
  }) 

  // Data Fetch API
  let users = [];
  function fetchUserJSON(url,numberOfUsers){  
    fetch(`${url}?results=${parseInt(numberOfUsers)}`)
      .then(response => response.json())
      .then(data => {
        UICtrl.loggedInUser(data);
        UICtrl.newUsers(data);
        UICtrl.recentActivity(data);
        UICtrl.autocomplete(data);
      })
      .catch(error => console.log(error));
  }

  // public
  return {
    getRandomUser: () => {
      fetchUserJSON('https://randomuser.me/api/',5);
    },
  }
  
})();

// UI Controller
const UICtrl = ( () => {
  
  const UISelectors = {
    alert:            '.alert',
    alertBell:        '.icon--bell-alert',
    close:            '.fa-times-circle',
    lineChartHourly:  '#hourly',
    lineChartDaily:   '#daily',
    lineChartWeekly:  '#weekly',
    lineChartMonthly: '#monthly',
    newMembers:       '#new-members',
    searchForUser:    '#searchForUser',
    recentActivity:   '#recent-activity',
    messageUser:      '#messageUser',
    send:             '#send',
    sendEmail:        '#send-email',
    publicProfile:    '#public-profile',
    timezone:         '#timezone',
    save:             '#save',
    reset:           '#reset'
  }

  return {

    alert: (message) => {
      document.querySelector(UISelectors.alertBell).style.display = 'block';
      message = message;
      const flashMessage = `${message} <i class="fas fa-times-circle"></i>`; // sets message and toggles green circle on bell/notification icon
      let output = document.querySelector(UISelectors.alert);
      output.innerHTML = flashMessage;
      setTimeout( () => {
        document.querySelector(UISelectors.alert).style.display = 'none';
        document.querySelector(UISelectors.alertBell).style.display = 'none';
      },15000);
    },

    loggedInUser: (data) => {
      // Logged in user info : set as random from api
      let firstName = data.results[0].name.first;
      let lastName  = data.results[0].name.last;
      let image     = data.results[0].picture.medium;
      let username  = `${firstName} ${lastName}`; 
      document.querySelector('img').src = image;
      document.querySelector('p').textContent = username;
     },
     
     newUsers: (data) => {
       console.log(data);
      for(let i = 1; i < data.results.length; i++){
        let firstName  = data.results[i].name.first;
        let lastName   = data.results[i].name.last;
        let image      = data.results[i].picture.medium;
        let email      = data.results[i].email;
        let registered = data.results[i].registered;
        let username   = `
        <div class="grid__row">

          <div>
            <img src="${image}" alt="${firstName} ${lastName}'s profile picture" class="img--rounded"></img>
          </div>

          <div>
            <p>${firstName} ${lastName}</p>
            <a href="mailto:${email}">${email}</a>
          </div>
          
          <div>
            <p>${ moment().subtract(1, 'days').format('L LT')}</p>
          </div>

        </div>
        `;
        let newMembers = document.querySelector(UISelectors.newMembers);
        let output = document.createElement('div');
        // output.className = 'grid__row';
        output.innerHTML = username;
        newMembers.appendChild(output);
        newMembers.className = 'grid__col--6';
      }
     },

     recentActivity: (data) => {
      let array = [];
      for(let i = 1; i < data.results.length; i++){
        let firstName = data.results[i].name.first;
        let lastName  = data.results[i].name.last;
        let image     = data.results[i].picture.medium;
        let email     = data.results[i].email;
        let username  = `
        <div class="grid__row">

          <div>
            <img src ="${image}" alt="${firstName} ${lastName}'s profile picture" class="img--rounded"></img>
          </div>
          
          <div>
            <p>${firstName} ${lastName}</p>
            <p>${randomStatus()}</p>
          </div>
          
          <div>
            <i class="fas fa-angle-right"></i>
          </div>
        </div>        
        
        `;
        let newMembers = document.querySelector(UISelectors.recentActivity);
        let output = document.createElement('div');
        // output.className = 'grid__row';
        output.innerHTML = username;
        newMembers.appendChild(output);
        newMembers.className = 'grid__col--6';

        for(let i = 1; i < 5; i++){
          array.push(`${ data.results[i].name.first } ${ data.results[i].name.last }`);
        }
      }
     },
     
     autocomplete: (data) => {
      let array= [];
      for(let i = 1; i < data.results.length; i++){
        let firstName = data.results[i].name.first;
        let lastName  = data.results[i].name.last;
        let image     = data.results[i].picture.medium;
        let email     = data.results[i].email;
        let username  = `${firstName} ${lastName}`;
        let datalist  = document.querySelector('#searchList');
        let option    = document.createElement('option');
        option.value  = username;
        datalist.appendChild(option);
      }  
     },

     messageUser: () => {
      const UISelectors = UICtrl.getSelectors();
      const user = document.querySelector(UISelectors.searchForUser);
      const message = document.querySelector(UISelectors.messageUser);
      
      if(user.value == '' || user.value == null ){
        UICtrl.alert('Please Select a user');
        document.querySelector(UISelectors.alert).scrollIntoView();
        if(document.querySelector(UISelectors.alert).style.display === 'none'){
          document.querySelector(UISelectors.alert).style.display = 'block'; 
        }
        document.querySelector(UISelectors.close).addEventListener("click", () => {
          document.querySelector(UISelectors.alert).style.display = 'none';
          document.querySelector(UISelectors.alertBell).style.display = 'none';
        });
      } else if(message.value == '' || message.value == null ){
          UICtrl.alert('Please enter a message');
          if(document.querySelector(UISelectors.alert).style.display === 'none'){
            document.querySelector(UISelectors.alert).style.display = 'block'; 
          }
          document.querySelector(UISelectors.alert).scrollIntoView();
          document.querySelector(UISelectors.close).addEventListener("click", () => {
          document.querySelector(UISelectors.alert).style.display = 'none';
          document.querySelector(UISelectors.alertBell).style.display = 'none';
        });
      } else {
        UICtrl.alert('Message has been Sent');
        if(document.querySelector(UISelectors.alert).style.display === 'none'){
          document.querySelector(UISelectors.alert).style.display = 'block'; 
        }
        document.querySelector(UISelectors.alert).scrollIntoView();
        document.querySelector(UISelectors.close).addEventListener("click", () => {
          document.querySelector(UISelectors.alert).style.display = 'none';
          document.querySelector(UISelectors.alertBell).style.display = 'none';
        });
      }
     },

     settings: () => {
      if( localStorage.getItem("sendEmail") === 'true'){
        document.querySelector(UISelectors.sendEmail).checked = true;
       } else {
        document.querySelector(UISelectors.sendEmail).checked = false;
       }

      if( localStorage.getItem("publicProfile" ) === 'true'){
        document.querySelector(UISelectors.publicProfile).checked = true;
       } else {
        document.querySelector(UISelectors.publicProfile).checked = false;
       }
     },

     saveTimezone: () => {
       let zone = document.querySelector(UISelectors.timezone).options[document.querySelector(UISelectors.timezone).selectedIndex].getAttribute('value');
       if(zone === null || zone === ""){
          UICtrl.alert('Please select a timezone');
          if(document.querySelector(UISelectors.alert).style.display === 'none'){
            document.querySelector(UISelectors.alert).style.display = 'block'; 
          }
          document.querySelector(UISelectors.alert).scrollIntoView();
          document.querySelector(UISelectors.close).addEventListener("click", () => {
          document.querySelector(UISelectors.alert).style.display = 'none';
          document.querySelector(UISelectors.alertBell).style.display = 'none';
        });
       } else if(zone !== null || zone !== ""){
          UICtrl.alert('Timezone saved');
          localStorage.setItem('timezone', zone);
          document.querySelector(UISelectors.alert).scrollIntoView();
          if(document.querySelector(UISelectors.alert).style.display === 'none'){
            document.querySelector(UISelectors.alert).style.display = 'block'; 
          }
          document.querySelector(UISelectors.close).addEventListener("click", () => {
          document.querySelector(UISelectors.alert).style.display = 'none';
          document.querySelector(UISelectors.alertBell).style.display = 'none';
        });
       } 
       else {
          localStorage.setItem('timezone', zone);
          UICtrl.alert('Timezone saved');
          document.querySelector(UISelectors.alert).scrollIntoView();
          if(document.querySelector(UISelectors.alert).style.display === 'none'){
            document.querySelector(UISelectors.alert).style.display = 'block'; 
          }
          document.querySelector(UISelectors.close).addEventListener("click", () => {
          document.querySelector(UISelectors.alert).style.display = 'none';
          document.querySelector(UISelectors.alertBell).style.display = 'none';
        });
       }
      console.log(zone);
      
     },

     getTimezone: () => {
       if(localStorage.getItem('timezone')){
         let timezone = localStorage.getItem('timezone');
         document.querySelector(UISelectors.timezone).selectedIndex = timezone;
       }
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
   
    var header = document.getElementById("charts--nav");
    var btns = header.getElementsByClassName("btn");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
      });
}

    document.querySelector(UISelectors.send).addEventListener("click", (e) => {
      UICtrl.messageUser();
      e.preventDefault();
    });
    
    document.querySelector(UISelectors.close).addEventListener("click", () => {
      document.querySelector(UISelectors.alert).style.display = 'none';
      document.querySelector(UISelectors.alertBell).style.display = 'none';
    });

    document.querySelector(UISelectors.sendEmail).addEventListener("change", () => {
      if(document.querySelector(UISelectors.sendEmail).checked){
        localStorage.setItem('sendEmail', true);
        console.log(localStorage.getItem('sendEmail'));
      } else {
        localStorage.setItem('sendEmail', false);
        console.log(localStorage.getItem('sendEmail'));
      }
    });

    document.querySelector(UISelectors.reset).addEventListener( 'click', () => {
      localStorage.clear();
      location.reload();
      alert("Settings have been cleared");
    });

    document.querySelector(UISelectors.publicProfile).addEventListener("change", () => {
      if(document.querySelector(UISelectors.publicProfile).checked){
        localStorage.setItem('publicProfile', true);
        console.log(localStorage.getItem('publicProfile'));
      } else {
        localStorage.setItem('publicProfile', false);
        console.log(localStorage.getItem('publicProfile'));
      }
    });

    document.querySelector(UISelectors.save).addEventListener("click", UICtrl.saveTimezone);
  }
  
  return {
    init: () => {
      console.log('Initializing App ...');
      DataCtrl.getRandomUser();
      UICtrl.getTimezone();
      UICtrl.alert('Alert!');
      UICtrl.settings();
      ChartCtrl.daily();
      ChartCtrl.bar();
      ChartCtrl.doughnut();
      loadEventListeners();
    }
  }
})(UICtrl, DataCtrl, ChartCtrl);


// Initialize App
App.init()