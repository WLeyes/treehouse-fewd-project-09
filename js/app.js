console.log('Connected to app.js');

UICtrl = ( () => {
  // private
  let user = [];
  function fetchUserJSON(){  
    fetch('https://randomuser.me/api/')
      .then(function(response) {
        return response.json();
      })
      .then( function(data) {
        let firstName = data.results[0].name.first;
        let lastName = data.results[0].name.last;
        let image = data.results[0].picture.thumbnail;
        let email = data.results[0].email;
        user.push(firstName, lastName,image, email);
        console.log(user);
        document.querySelector('p').innerHTML = `${user[0]} ${user[1]}`;
        document.querySelector('img').src = user[2];
      })
      .catch(error => console.log(error))
  }
  // public
  return {
    callUser: () => {
      fetchUserJSON();
    }
  }
})();

UICtrl.callUser();