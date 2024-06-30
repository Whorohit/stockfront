
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { Chart } from './components/Chart';
import HomeLine from './components/HomeLine.js';
import News from './components/News'
import NewsTopic from './components/NewsTopic';
import Newspage from './pages/Newspage';
import Doughnut from './components/Dough.js';
import Ledger from './pages/Ledger';
import Date from './components/Date';
import Stock from './pages/Stock';
import AutoComplete from '../src/components/Autocomplete';
import Stockpage from './pages/Stockpage';
import Createwatchlist from './components/Createwatchlist';
import Addledger from './components/Addledger';
import Watchlistpage from './pages/Watchlistpage'
import Topbar from './components/Topbar';
import Settings from './pages/Settings'

function App() {
  return (
    <div className="App  bg-gray-200">
      <Router>
        <Routes>
          <Route exact path='/login' element={<Login />} ></Route>
          <Route exact path='/signup' element={<Signup />}></Route>
          <Route exact path='/' element={<Home p={<HomeLine />} />}></Route>
          <Route exact path='/newspage' element={<Newspage />}></Route>
          <Route exact path='/ledger' element={<Ledger />}></Route>
          <Route exact path='/stock' element={<Stock />}></Route>
          <Route exact path='/stockpage/:id' element={<Stockpage />}></Route>
          <Route exact path='/watchlist/:name' element={<Watchlistpage/>}></Route>
          <Route exact path='/account' element={<Settings/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
