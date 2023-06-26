import React, { Component } from "react";
import Snake from "./Snake";
import Menu from "./Menu";
import Food from './Food'
import Score from './Score'

const getRandomFood = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

const initialState = {
  food: getRandomFood(),
  direction: "RIGHT",
  speed: 100,
  route: "menu",
  snakeDots: [[0, 0], [0, 2]],
  username: 'deneme'
};

class App extends Component {

  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.onSnakeOutOfBounds();
    this.onSnakeEats();
  }

  onKeyDown = e => {
    switch (e.keyCode) {
      case 37:
        this.setState({ direction: "LEFT" });
        break;
      case 38:
        this.setState({ direction: "UP" });
        break;
      case 39:
        this.setState({ direction: "RIGHT" });
        break;
      case 40:
        this.setState({ direction: "DOWN" });
        break;
    }
  };

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];
    if (this.state.route === "game") {
      switch (this.state.direction) {
        case "RIGHT":
          head = [head[0] + 2, head[1]];
          break;
        case "LEFT":
          head = [head[0] - 2, head[1]];
          break;
        case "DOWN":
          head = [head[0], head[1] + 2];
          break;
        case "UP":
          head = [head[0], head[1] - 2];
          break;
      }
      dots.push(head);
      dots.shift();
      this.setState({
        snakeDots: dots
      });
    }
  };

  onSnakeOutOfBounds() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (this.state.route === "game") {
      if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
        this.gameOver();
      }
    }
  }

  onSnakeEats() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] == food[0] && head[1] == food[1]) {
      this.setState({
        food: getRandomFood()
      });
      this.increaseSnake();
      this.increaseSpeed();
    }
  }

  increaseSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState({
      snakeDots: newSnake
    });
  }

  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 20
      });
    }
  }

  gameOver() {
    alert(`GAME OVER, your score is ${this.state.snakeDots.length - 2}`);
    this.setState(initialState)
  }

  onRouteChange = (user) => {
    if (user.trim() == '') return alert('Please enter your name !')
    this.setState({
      route: "game",
      username: user
    });
  };

  render() {
    const { route, snakeDots, food } = this.state;

    return (
      <div>
        {route === "menu" ? (
          <Menu onRouteChange={this.onRouteChange} getUsername={this.getUsername} />
        ) : (
          <div>
            <div className="game-area">
              <Snake snakeDots={snakeDots} />
              <Food dot={food} />
            </div>
            <Score username={this.state.username} score={this.state.snakeDots.length - 2} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
