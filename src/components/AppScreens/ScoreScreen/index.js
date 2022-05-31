import React, { Component } from 'react'
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import shopbtn from 'contents/images/buttons/shopbtn.png';
import sharebtn from 'contents/images/buttons/sharebtn.png';
import replaybtn from 'contents/images/buttons/replaybtn.png';
import LoadingScreen from 'components/AppScreens/LoadingScreen';
import axios from 'axios';
export default class ScoreScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], loading: true };
  }
  componentDidMount() {
    this.fetchData();

  }
  static fetchData(data) {
    console.log(data);
    return (
      <table className='table table-responsive' aria-labelledby="tabelLabel">
        <tbody>
          {data.map(item =>
            <tr key={item.id}>
              <td>{item.rank}</td>
              <td style={{ paddingLeft: 10 }}>{item.user_name}</td>
              <td style={{ paddingLeft: 150 }}>{Number(item.total_score.toFixed(1))}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
  onClickShareBtn = () => {
    this.props.history.push("/game");
  }
  onClickreplayBtn = () => {
    this.props.history.push("/game");
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : ScoreScreen.fetchData(this.state.items);

    return (
      (this.state.loading) ? (
        <LoadingScreen />
      ) : (
        <div className="sas__blankpaper" style={{ height: window.innerHeight }}>
          <div className="sas__score">
            <div className="score__header">
              <div className="score__headermain">top best kings</div>
              <div className="score__headersub">of all times</div>
            </div>
            {contents}
            <div className="score__actionbtngroup">
              <div className="actionbtngroup__item">
                <img src={shopbtn} />
                <div>shop</div>
              </div>
              <div className="actionbtngroup__item" onClick={() => this.onClickreplayBtn()}>
                <img src={replaybtn} />
                <div>replay</div>
              </div>
              <div className="actionbtngroup__item"
              //onClick={() => this.onClickShareBtn()}
              >
                <img src={sharebtn} />
                <div>share </div>
              </div>
            </div>
          </div>
        </div>

      )

    );
  }

  async fetchData() {
    try {

      /* const response = await fetch('http://103.110.86.45:6868/api/scores'); // gọi api lên controller để lấy data
      const dataResponse = await response.json();
      let data = dataResponse.data; */
      axios.get(`https://misao.one/api/scores`, {
        headers: {
          "Content-Type": "application/json",
          "Content-Security-Policy": "upgrade-insecure-requests"
        }
      })
        .then(res => {
          const get = res.data;
          let data = get.data;

          console.log(data);
          this.setState({ items: data, loading: false });
        })
        .catch(error => console.log(error));
    }
    catch (e) {
      console.log(e);
    }
  }
}
