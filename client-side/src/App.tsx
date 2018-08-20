import * as React from "react";
import "./App.css";
import Footer from "./components/common/footer/footer";
import Header from "./components/common/header/header";
import Routes from "./routes"

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Header />
        <Routes />
        <Footer />
      </div>
    );
  }
}
export default App;
