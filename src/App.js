import React, { Component } from 'react'
import Web3 from 'web3'
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config'
import TicketList from './TicketList'
import './App.css'

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const accounts = await web3.eth.getAccounts()

    const balance = await web3.eth.getBalance(accounts[0])
    this.setState({ balance: web3.utils.fromWei(balance, 'ether')})

    const tx = await web3.eth.getTransaction(accounts[0])
    console.log(tx)

    this.setState({ account: accounts[0] })
    const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS)
    this.setState({ todoList })
    const taskCount = await todoList.methods.taskCount().call()
    this.setState({ taskCount })
    for (var i = 1; i <= taskCount; i++) {
      const task = await todoList.methods.tasks(i).call()
      this.setState({
        tasks: [...this.state.tasks, task]
      })
    }
    this.setState({ loading: false })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      balance: 0,
      taskCount: 0,
      tasks: [],
      loading: true,
      water_popcorn: 0,
      tx_hashes: [],
    }
    this.createTask = this.createTask.bind(this)
  }

  createTask(content) {
    this.setState({ loading: true })
    this.state.todoList.methods.createTask(content).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
      this.setState({ water_popcorn: this.state.water_popcorn + 1 })
    })
    .on('transactionHash', (hash) => {
      alert("Transaction Hash is: " + hash)
    })
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#" target="_blank">Buy Movie Tickets with Ethereum & Metamask</a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small><a className="nav-link" href="#"><span id="account"></span></a></small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid">
          <div className="row">
          </div>
          
          {/* User Wallet Information */}
            <br />
            <br />
            <h4>Your Metamask Wallet: {this.state.account}</h4>
            <h4>Wallet Balance: {this.state.balance} ETH</h4>
            <br />
            <h4>Shows Available:</h4>
            <p>Movie1 @ 9am  | Movie2 @ 9am  | Movie3 @ 9am  | Movie4 @ 9am  </p>
            <p>Movie1 @ 1pm  | Movie2 @ 1pm  | Movie3 @ 1pm  | Movie4 @ 1pm  </p>
            <p>Movie1 @ 3pm  | Movie2 @ 3pm  | Movie3 @ 3pm  | Movie4 @ 3pm  </p>
            <p>Movie1 @ 6pm  | Movie2 @ 6pm  | Movie3 @ 6pm  | Movie4 @ 6pm  </p>            

            <h4>Tickets booked: {this.state.taskCount.toString()}</h4>
            <br />
            <h4>Your Tickets :</h4>

            <ul id="taskList" className="list-unstyled">
              { this.state.tasks.map((task, key) => {
                return(
                  <div className="taskTemplate" className="checkbox" key={key}>
                    <label>
                      {/* <input type="checkbox" /> */}
                      <span className="content">{task.id.toString()}. </span>
                      <span className="content">{task.content}</span>
                    </label>
                  </div>
                )
              })}
            </ul>
          {/* Ticket Windows */}
          <br />
          <div className="row">
            <div className="col-md-3 justify-content-center">
              <h3>Ticket Window 1</h3>
              { this.state.loading
              ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
              : (this.state.taskCount < 5 ? <TicketList tasks={this.state.tasks} createTask={this.createTask} /> : <p>Show is full</p>)
              }
              { this.state.taskCount > 0 ? <p>Collect Water and Popcorn !</p> : null }
            </div>
            <div className="col-md-3 justify-content-center">
              <h3>Ticket Window 2</h3>
              { this.state.loading
              ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
              : (this.state.taskCount < 5 ? <TicketList tasks={this.state.tasks} createTask={this.createTask} /> : <p>Show is full</p>)
              }
            </div>
            <div className="col-md-3 justify-content-center">
              <h3>Ticket Window 3</h3>
              { this.state.loading
              ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
              : (this.state.taskCount < 5 ? <TicketList tasks={this.state.tasks} createTask={this.createTask} /> : <p>Show is full</p>)
              }
            </div>
            <div className="col-md-3 justify-content-center">
              <h3>Ticket Window 4</h3>
              { this.state.loading
              ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
              : (this.state.taskCount < 5 ? <TicketList tasks={this.state.tasks} createTask={this.createTask} /> : <p>Show is full</p>)
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;