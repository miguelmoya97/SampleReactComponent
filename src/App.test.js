import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import App from './App';
import UpvoteList from './components/UpvoteList';
import SelectionContext from './SelectionContext';

afterEach(()=>{
  localStorage.clear()
  cleanup()
})

describe("Select upvotes on click", () => {
  test('Assert Upvote state is selected on click', () => {
    render(
    <SelectionContext>
      <UpvoteList identifier={1}/>
    </SelectionContext>);
  
    const addButton = screen.getAllByTestId("plusContainer")[0]
    fireEvent.click(addButton)  
    const upvoteComponents = screen.getAllByTestId("upvote-1")
    upvoteComponents.forEach((e) => {
      expect(e).toHaveClass("upvoteContainer", {exact: true})

    })
    upvoteComponents.forEach((e) => {
      fireEvent.click(e)
      expect(e).toHaveClass("upvoteContainer selected", {exact: true})
    }) 
  });

  test("Assert appropriate Upvote state with multiple Upvote lists",() =>{
    render(
      <SelectionContext>
        <UpvoteList identifier={1}/>
        <UpvoteList identifier={2}/>
      </SelectionContext>);
    const addButton1 = screen.getAllByTestId("plusContainer")[0]
    const addButton2 = screen.getAllByTestId("plusContainer")[1]

    fireEvent.click(addButton1)  
    fireEvent.click(addButton1)  
    fireEvent.click(addButton2)  
    
    const listOneUpvotes = screen.getAllByTestId("upvote-1")
    const listTwoUpvotes = screen.getAllByTestId("upvote-2")
    
    // click upvote in List 1 and assert they are selected
    fireEvent.click(listOneUpvotes[0])
    listOneUpvotes.forEach((e)=> {
      expect(e).toHaveClass("upvoteContainer selected", {exact: true})
    })

    // assert List 2 is unselected based on previous event
    listTwoUpvotes.forEach((e)=> {
      expect(e).toHaveClass("upvoteContainer", {exact: true})
    })

    // click upvote in List 2 and assert they are selected
    fireEvent.click(listTwoUpvotes[0])
    listTwoUpvotes.forEach((e)=> {
      expect(e).toHaveClass("upvoteContainer selected", {exact: true})
    })


  })
})

