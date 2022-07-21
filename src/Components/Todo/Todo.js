import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTodos } from "../../slices/todoSlice";
function Todo() {
  const [selected, setSelected] = useState("");
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => {
    return state.todo;
  });
  const deleteBtn = (id) => {
    const filteredTodos = todos.filter((item) => item.id !== id);
    dispatch(setTodos(filteredTodos));
  };
  const handleSelect = (e, id) => {
    setSelected(e.target.value);
    console.log(selected);
    const aa = todos.map((a) => (a.id === id ? { ...a, period: selected } : a));
    dispatch(setTodos(aa));
  };
  const periodMenu = ["무기한", "1년", "10년"];
  return (
    <div className="todosTotal">
      {periodMenu.map((item) => (
        <h2 className="todos-h1-style" key={item}>
          {item}
          {todos
            .filter((a) => a.period === item)
            .map((content) => (
              <div className={`todosListBlock${item}`} key={content.id}>
                <input className="todosChkBox" type="checkbox" />
                <div className="todos-oneYear-style-box">{content.text}</div>
                <select
                  className="HeaderSelect"
                  onChange={handleSelect}
                  value={selected}
                >
                  <option value="" defaultValue disabled hidden>
                    기한
                  </option>
                  {periodMenu.map((text) => (
                    <option key={text} value={text}>
                      {text}
                    </option>
                  ))}
                </select>
                <button
                  className="cursorPointer todosListDeleteBtn"
                  onClick={() => deleteBtn(content.id)}
                >
                  DELETE
                </button>
              </div>
            ))}
        </h2>
      ))}
    </div>
  );
}

export default Todo;
