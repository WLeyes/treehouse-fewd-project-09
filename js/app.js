console.log('Connected to app.js');


// Chart controller
const ChartCtrl = ( () => {
// Set formatted hourly labels
hourly_labels = [
  '00', '01', '02', '03', '04', '05',
  '06', '07', '08', '09', '10', '11',
  '12', '13', '14', '15', '16', '17',
  '18', '19', '20', '21', '22', '23',
];

monthly_labels = [
  'Jan','February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
]

daily_labels = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

const chart_width = 1024;
const chart_height = 800;
const padding = 50;
const date_parse = d3.timeParse('%Y-%m-%d %H');
const time_parse = d3.timeParse('%H');

// Format data 
data.forEach( (e,i) => data[i].date = date_parse(e.date) );

const time_format = d3.timeFormat('%H %p')
const date_format = d3.timeFormat('%Y-%m-%d')

// Data Nests
let nest_date = d3.nest()
  .key( d => date_format(d.date) )
  .sortKeys(d3.ascending)
  .entries(data);
    
let nest_time = d3.nest()
  .key( d => d.date )
  .entries(data);
// console.log(nest_time);

  return {
    hourly: () => {
      console.log(data);
      const start_date = '2017-01-01 00';
      const end_date = '2017-12-31 23';

      // Create Scales
      const x_scale = d3.scaleTime()
        .domain([ d3.min(data, d => d.date), d3.max(data, d => d.date)])
        .range([ padding, chart_width - padding ])
        .clamp(true);
      
      const y_scale = d3.scaleLinear()
        .domain([ 0, d3.max(data, d => d.traffic)])
        .range([ chart_height - padding, padding ]);
      
      // Create SVG
      const svg = d3.select('#charts--line')
        .append('svg')
        .attr('width', chart_width)
        .attr('height', chart_height);

      // Create Axes
      const x_axis = d3.axisBottom(x_scale)
        .ticks(24)
        .tickFormat(time_format);
      const y_axis = d3.axisLeft(y_scale)
        .ticks(10);

      svg.append('g')
        .attr('transform', `translate(0, ${(chart_height - padding)} )`)
        .call(x_axis);
        
      svg.append('g')
        .attr('transform', `translate( ${padding},0 )`)
        .call(y_axis);

      const line = d3.line()
        .x(d => x_scale(d.date))
        .y(d => y_scale(d.traffic));

      svg.append( 'path' )
        .datum( data )
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1)
        .attr('d', line);
    },

    daily: () => {
     
    },

    weekly: () => {
      
    },

    monthly: () => {
    
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
      let username  = `${firstName} ${lastName}`; 
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
      // console.log('Initializing App ...');
      const user = DataCtrl.getRandomUser();

      // Tests - will leave daily or weekly as default
      ChartCtrl.hourly();
      // ChartCtrl.daily();
      // ChartCtrl.weekly();
      // ChartCtrl.monthly();
    }
  }
})(UICtrl, DataCtrl, ChartCtrl);


// Initialize App
App.init()