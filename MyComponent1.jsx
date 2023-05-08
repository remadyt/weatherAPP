import React from 'react';

class MyComponent1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
    };
  }

  incrementCount() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.incrementCount.bind(this)}>Increment</button>
      </div>
    );
  }
}

export default MyComponent1;
