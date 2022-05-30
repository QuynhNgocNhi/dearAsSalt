import React, { Component, Fragment } from "react";
import TinderCard from "react-tinder-card";
import LoadingScreen from "components/AppScreens/LoadingScreen";
import jokerimg from "contents/images/game/joker.png";
import jokerimgUp from "contents/images/game/joker-up.png";
import { Progress } from "react-sweet-progress";
import axios from 'axios';

import "react-sweet-progress/lib/style.css";
export default class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxPoint: 0,
      qLength: 0,
      gameSession: null,
      answers: null,
      yourPoint: 0,
      dialogText: "",
      questionText: "",
      infoText: "",
      isFinish: false,
      isLoading: true,
      isPaneOpen: false,
      isPaneOpenBottom: false,
      handleHeightChange: false,
      userName: "",
      submitting: false,
    };
  }

  async componentDidMount() {
    axios.get(`http://103.110.86.45:6868/api/questions`)
      .then(res => {
        const get = res.data;
        let data1 = get.data;
        /* const response = await fetch("http://103.110.86.45:6868/api/questions");
        const dataResponse = await response.json();
        let data1 = dataResponse.data; */
        console.log(data1);
        /*    code:
           - input: array
           - output: hien thi
           
           - input: array bi trung(ban dau)
           - input: array khong bi trung (sau khi random) */

        let group = data1.reduce(function (r, a) {
          r[a.characters_id] = r[a.characters_id] || [];
          r[a.characters_id].push(a);
          return r;
        }, Object.create(null));
        let data = [];
        for (let character_id in group) {
          let random_index_in_a_group =
            Math.floor(Math.random() * group[character_id].length);
          let a_random_item = group[character_id][random_index_in_a_group];
          data.push(a_random_item);
        }
        console.log(data);

        if (data != null) {
          var length = data.length;
          console.log(length);
          let hi = 0;
          for (let index in data) {
            let yes = data[index].yes_score;
            hi += yes;
          }


          var nextQuestion = length > 0 ? data[0] : null;
          let _dialogText = "";
          let _questionText = "";
          let _infoText = "";
          if (nextQuestion != null) {
            _dialogText = nextQuestion.dialog_text;
            _questionText = nextQuestion.question;
            _infoText = nextQuestion.info;
          }
          //console.log(data);
          this.setState({
            maxPoint: hi,
            qLength: length,
            gameSession: data,
            answers: null,
            yourPoint: 0,
            dialogText: _dialogText,
            questionText: _questionText,
            infoText: _infoText,
            isLoading: false,
          });
        }

      })
      .catch(error => console.log(error));
  }
  onShowHelpText = () => {
    this.setState({
      isPaneOpenBottom: !this.state.isPaneOpenBottom,
    });
  };
  handleGameSubmit = async () => {
    if (this.state.submitting == false) {
      this.setState({ isLoading: true, submitting: true });
      var name = this.state.userName;
      if (name != null && name != "") {
        /*  var data = {
           user_name: name,
           total_score: this.state.yourPoint,
         }; */
        let data = JSON.stringify({
          user_name: name,
          total_score: this.state.yourPoint,
        });
        const response = await axios.post("http://103.110.86.45:6868/api/scores", data, { headers: { "Content-Type": "application/json" } });
        console.log(response.data);
        /*  await axios.post(`http://103.110.86.45:6868/api/scores`, { data })
           .then(res => {
             console.log(res);
             console.log(res.data);
           }).catch(error => console.log(error)); */

        /*  await fetch("http://103.110.86.45:6868/api/scores", {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify(data),
         }); */
      }
      this.setState({ isLoading: false, submitting: false });
      this.props.history.push("/score");
    }
  };
  render() {
    const onSwipe = (direction, question, nextQuestion) => {
      console.log('You swiped: ' + direction);
      switch (direction) {
        case "right": {
          //yes
          onAnswer(true, question, nextQuestion);
          break;
        }
        case "left": {
          //no
          onAnswer(false, question, nextQuestion);
          break;
        }
        case 'up': {
          onShowExtendInfo(nextQuestion.info);
          break;
        }
      }
    };
    const onAnswer = (selection, question, nextQuestion) => {
      var _answers = this.state.answers != null ? this.state.answers : [];
      console.log("hi", question.id);
      var existIndex = _answers.findIndex((f) => f.questionId === question.id);
      if (false) {
        _answers[existIndex].selection = selection;
      } else {
        _answers.push({
          questionId: question.id,
          selection: selection,
        });
      }
      var myPoint = 0;
      var questions = this.state.gameSession;
      console.log("questions", this.state.gameSession)

      _answers.map((answer, index) => {

        var index = questions.findIndex(

          (f) => f.id === answer.questionId
        );
        console.log("index", index)
        if (index >= 0) {
          var qInfo = questions[index];

          myPoint +=
            answer.selection == true
              ? qInfo.yes_score
              : qInfo.no_score;
        }
      });
      let _dialogText = "";
      let _questionText = "";
      let _infoText = "";
      console.log(nextQuestion != null);
      if (nextQuestion != null) {
        _dialogText = nextQuestion.dialog_text;
        _questionText = nextQuestion.question;
        _infoText = nextQuestion.info;
      }

      let isFinish = _answers.length == this.state.qLength;
      console.log(_answers.length);
      this.setState({
        answers: _answers,
        yourPoint: Number(myPoint.toFixed(0)),
        dialogText: _dialogText,
        questionText: _questionText,
        infoText: _infoText,
        isFinish: isFinish,
        isPaneOpenBottom: false,
      });
      console.log(this.state.answers);
      console.log('yourPoint', this.state.yourPoint);
    };
    var currentPercent = (this.state.yourPoint * 100) / this.state.maxPoint;
    console.log(currentPercent)
    const onShowExtendInfo = (info) => {
      //todo show extend info

      //
      //console.log(info);
      this.setState({
        infoText: info,
      });
    };

    return (
      <div
        className="sas__game"
        //style={{height: window.innerWidth <= 767 ? `${window.innerHeight-56}px` : '100vh'}}
        style={{ height: window.innerHeight }}
      >
        <div className="game__navbar">
          <Progress percent={currentPercent} />
        </div>
        {this.state.isFinish != true ? (
          <Fragment>
            {this.state.isLoading == true ? (
              <LoadingScreen />
            ) : (
              <div className="sas__gamewrapper">
                {this.state.gameSession != null ? (
                  this.state.gameSession.map((item, index) => {
                    let charactersUrl = '';
                    console.log(item.characters.name);
                    // var _src = require(`contents/images/characters/${item.name}`);
                    switch (item.characters.name) {
                      case "Knight":
                        charactersUrl = "knight.png";
                        break;
                      case "Calvino the cook":
                        charactersUrl = "the-cook.png";
                        break;
                      case "Trusted servant":
                        charactersUrl = "servant.png";
                        break;
                      case "Prince":
                        charactersUrl = "prince.png";
                        break;
                      case "Princess Zizola":
                        charactersUrl = "princess.png";
                        break;
                      case "Alchemist":
                        charactersUrl = "achemist.png";
                        break;
                      case "Queen":
                        charactersUrl = "queen.png";
                        break;
                      case "Prisoner":
                        charactersUrl = "prisoner.png";
                        break;
                      case "Merchant":
                        charactersUrl = "merchant.png";
                        break;
                      case "Farmer":
                        charactersUrl = "farmer.png";
                        break;
                      default:
                      // code block
                    }
                    /* console.log(item);
                    console.log(charactersUrl); */
                    var _src = require(`contents/images/characters/${charactersUrl}`);
                    var length = this.state.gameSession.length;
                    console.log(length);
                    var nextQuestion =
                      index + 1 <= length - 1
                        ? this.state.gameSession[index + 1]
                        : null;
                    return (
                      <TinderCard
                        key={index}
                        onSwipe={(direction) =>
                          onSwipe(direction, item, nextQuestion)
                        }
                        preventSwipe={["up", "down"]}
                        className="sas__gameitem"
                      //style={{height: window.innerWidth <= 767 ? `${window.innerHeight}px` : '100vh'}}
                      >

                        <img src={_src} />
                        <div className="gameitem__dialog">
                          {this.state.dialogText}
                        </div>
                        <div className="gameitem__charactername">
                          {item.name}
                        </div>
                        <div
                          className={`gameitem__help ${this.state.isPaneOpenBottom
                            ? "height-translate"
                            : ""
                            }`}
                        >
                          <div
                            onClick={() => this.onShowHelpText()}
                            onTouchStart={this.onShowHelpText}
                            className="help__togglebtn"
                          >
                            <span>{this.state.questionText}</span>
                            <span className="help__joker">
                              {this.state.isPaneOpenBottom ? (
                                <img src={jokerimg} />
                              ) : (
                                <img src={jokerimgUp} />
                              )}
                            </span>
                          </div>
                          <div>{this.state.infoText}</div>
                        </div>
                      </TinderCard>
                    );
                  })
                ) : (
                  <div></div>
                )}
              </div>
            )}
          </Fragment>
        ) : (
          <div
            className="sas__gamesubmit"
            style={{ height: window.innerHeight }}
          >
            <div className="gamesubmit__gameform">
              <div className="gameform__header">Congratulations!</div>
              <div className="gameform__info">
                Your're a good and gracious king.
              </div>
              <div className="gameform__score">
                Your score: {Math.floor(this.state.yourPoint)}
              </div>
              <input
                type="email"
                id="gameformEmail"
                onChange={(evt) =>
                  this.setState({ userName: evt.target.value })
                }
                placeholder="Name"
              />
              {this.state.submitting == false ? (
                <div
                  className="gameform__submitbtn"
                  onClick={() => this.handleGameSubmit()}
                  onTouchStart={() => this.handleGameSubmit()}
                >
                  submit
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
