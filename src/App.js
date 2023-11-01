import "./styles.css";
import { useReducer } from "react";
import { items } from "./data";

function reducer(state, action) {
  console.log("action.type: " + action.type);
  console.log("action.payload: " + action.payload);
  switch (action.type) {
    case "moveToA": {
      const indexes = action.payload;
      console.log("in indexes is: ", indexes);
      const toReturn = [...(state || [])].map((item, index) => {
        console.log("in moveToA, item is: ", item);
        console.log("in moveToA, index is: ", index);
        console.log(
          "in moveToA, indexes.includes(index) is: ",
          indexes.includes(index)
        );
        if (indexes.includes(String(index))) {
          return { ...item, list: "A" };
        }
        return item;
      });
      console.log("in moveToA, toReturn is: ", toReturn);
      return toReturn;
    }
    case "moveToB": {
      const indexes = action.payload;
      console.log("in indexes is: ", indexes);
      const toReturn = [...state].map((item, index) => {
        console.log("in moveToB, item is: ", item);
        console.log("in moveToB, index is: ", index);
        console.log(
          "in moveToB, indexes.includes(index) is: ",
          indexes.includes(index)
        );
        if (indexes.includes(String(index))) {
          return { ...item, list: "B" };
        }
        return item;
      });
      console.log("in moveToB, toReturn is: ", toReturn);
      return toReturn;
    }
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(
    reducer,
    items.map((itemData, index) => ({ itemData, index, list: "A" }))
  );
  const listA = state.filter((item) => item.list === "A");
  console.log("a", listA);
  const listB = state.filter((item) => item.list === "B");
  console.log("b", listB);
  const onListASubmit = (event) => {
    event.preventDefault();
    const formElements = event.target.elements;
    const toMoveToB = [];
    console.log(formElements);
    for (const element of formElements) {
      console.log(element.name);
      console.log(element.type);
      console.log(element.checked);
      if (element.type === "checkbox" && element.checked) {
        toMoveToB.push(element.name);
      }
    }
    console.log("toMoveToB", toMoveToB);
    dispatch({ type: "moveToB", payload: toMoveToB });
  };
  const onListBSubmit = (event) => {
    event.preventDefault();
    const formElements = event.target.elements;
    const toMoveToA = [];
    for (const element of formElements) {
      if (element.type === "checkbox" && element.checked) {
        toMoveToA.push(element.name);
      }
    }
    console.log("toMoveToA", toMoveToA);
    dispatch({ type: "moveToA", payload: toMoveToA });
  };

  return (
    <div className="App flexCenter horizontal">
      <form
        id="listA"
        onSubmit={onListASubmit}
        className="list flexCenter vertical"
      >
        {listA.map((item, index) => (
          <label className="listItem" key={item.index}>
            <input name={item.index} type="checkbox" />
            {item.itemData}
          </label>
        ))}
      </form>
      <div className="actions flexCenter vertical">
        <button type="submit" form="listA">
          {">"}
        </button>
        <button type="submit" form="listB">
          {"<"}
        </button>
      </div>
      <form
        id="listB"
        onSubmit={onListBSubmit}
        className="list flexCenter vertical"
      >
        {listB.map((item, index) => (
          <label className="listItem" key={item.index}>
            <input name={item.index} type="checkbox" />
            {item.itemData}
          </label>
        ))}
      </form>
    </div>
  );
}
