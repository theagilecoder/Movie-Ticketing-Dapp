import React, { Component } from 'react'

class TicketList extends Component {

  render() {
    return (
      <div id="content">
        <form onSubmit={(event) => {
          event.preventDefault()
          this.props.createTask(this.task.value)
        }}>
          <input id="newTask" ref={(input) => this.task = input} type="text" className="form-control" placeholder="Enter Movie and Show to book..." required />
          <input type="submit" hidden={true} />
        </form>

        <ul id="completedTaskList" className="list-unstyled">
        </ul>
      </div>
    );
  }
}

export default TicketList;