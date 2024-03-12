import logo from './logo.svg';
// import './App.css';
import UpvoteList from './components/UpvoteList';
import SelectionContext from './SelectionContext';


function App() {
  return (
    <SelectionContext>
      <UpvoteList identifier={1}/>
      <UpvoteList identifier={2}/>
      <UpvoteList identifier={3}/>
    </SelectionContext>
  );
}

export default App;
