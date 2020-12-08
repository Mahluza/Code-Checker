import React from 'react';
import { Radio } from 'antd';

class RoleRadio extends React.Component {
  state = {
    value: null,
  };

  /*
  constructor(props: any) {
    super(props);
    this.state = {
      value: 0,
    };
  }
*/

  onChange = (e: any) => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    return (
      <Radio.Group onChange={this.onChange} value={this.state.value}>
        <Radio value={1}>Instructor</Radio>
        <Radio value={2}>Student</Radio>
      </Radio.Group>
    );
  }
}

export default RoleRadio;
