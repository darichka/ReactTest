import React, {Component} from 'react';
import './App.css';

function User(props){
  return(
    <tr>
      <td>{props.user.firstName}</td>
      <td>{props.user.lastName}</td>
      <td>{props.user.dob.slice(0,10)}</td>
    </tr>
  )
}

function renderUsers(month){
  return (
      month.users.map( user => {
        return(
            <User user={user} key={user.id} />
        )})
  )
}

function Month(props){
  return(
    <div className="monthContainer">
      <div className="monthName" style={{backgroundColor: detectColor(props.month.count)}}>
        {props.month.name + '  ' + props.month.count }
      </div>
      <table className="listOfUsers">
        <tbody>
        {renderUsers(props.month)}
        </tbody>
      </table>
    </div>
  )
}

function detectColor(count){
    if(count < 3) return "#A9A9A9";
    if( count  < 7) return "#00BFFF";
    if( count < 11) return "#32CD32";
    return "#F08080";
}

function devideByMonthes(users){
  let monthes = initializeMonthes();
  users.forEach(user => {
    let dateOfBirth = new Date(user.dob);
    console.log(dateOfBirth.getUTCMonth()+1 + " "+user.dob.slice(0,10));
    for(let i = 0; i < monthes.length; i++ ){
      if(dateOfBirth.getUTCMonth() === monthes[i].id){
        addUserToMonth(monthes[i], user);
        break;
      }
    }
  });
  return monthes;
}

function initializeMonthes(){
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];
  let monthes = []
  for(let i =0; i< monthNames.length; i++){
    let month = {
    id: i, 
    name: monthNames[i],
    count: 0,
    users: [], 
    state: false};
    monthes.push(month);
  }
  return monthes;
}

function addUserToMonth(month, user){
  month.count++;
  month.users.push(user);
}

class App extends Component {
  state = {
      monthes: []
  }

  componentDidMount() {
      const url = 'https://yalantis-react-school.herokuapp.com/api/task0/users'
        fetch(url)
        .then(result => result.json())
        .then(result => {
          this.setState({
            monthes: devideByMonthes(result)
          });
        })
    }
    renderMonthes(){
      return(this.state.monthes.map(month =>{
        return (
          <Month month={month} key={month.name}/>
        )
      }))
    }

  render() {
      return(
        <div className="usersContainer">
          {
            this.renderMonthes()
          }
        </div>
     ) 
  }
}

export default App;
