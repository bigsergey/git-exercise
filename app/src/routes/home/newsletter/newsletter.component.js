import React, {Component} from 'react';

export class Newsletter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ''
    };
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value})
  }

  render() {
    return (
      <div className="newsletter">
        <input type="text" value={this.state.email} onChange={this.handleEmailChange.bind(this)}/>
      </div>
    );
  }
}
