import React, { Component } from 'react';
import Employee from './Components/employee'

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      namesDirection: {}
    }
  }

  handleClick = (name, open) => {
    this.setState({
      namesDirection: {
        [name]: open
      }
    })
  }

  render() {
    const { namesDirection } = this.state;
    const data = this.props.employeeList;
    return (
      data.length
      ? data.map(element => 
        <Employee
          key={element.name}
          emp={element}
          clickHandler={this.handleClick}
          open={namesDirection[element.name]}
        />
      )
      : <p>There is no data to display</p>
    )
  }
}

export default App;
