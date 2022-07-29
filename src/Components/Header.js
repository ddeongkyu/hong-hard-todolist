import React, { useState, useRef } from "react";
import getRandomTodoId from "../util/getRandomTodoId";
import { useDispatch, useSelector } from "react-redux";
import { setTodos } from "../slices/todoSlice";
import { setText } from "../slices/todoSlice";
import Todo from "./Todo/Todo";
function Main() {
  const dispatch = useDispatch();
  const selectList = ["무기한", "1년", "10년"];
  const [selected, setSelected] = useState("");
  const { todos, text } = useSelector((state) => {
    return state.todo;
  });
  const inputRef = useRef();
  const onChangeInput = (e) => {
    dispatch(setText(e.target.value));
  };
  const onClickAddBtn = () => {
    if (text) {
      const nextTodoList = todos.concat({
        id: getRandomTodoId(),
        text,
        period: selected,
      });
      console.log(nextTodoList);
      dispatch(setTodos(nextTodoList));
      dispatch(setText(""));
      inputRef.current.focus();
    } else if (!text) {
      alert("EMPTY!");
    }
  };
  const onEnterPress = (e) => {
    if (e.key === "Enter") {
      if (text) {
        const nextTodoList = todos.concat({
          id: getRandomTodoId(),
          text,
          period: selected,
        });
        dispatch(setTodos(nextTodoList));
        dispatch(setText(""));
        inputRef.current.focus();
      } else if (!text) {
        alert("EMPTY!");
      }
    }
  };
  const onClickReset = (e) => {
    dispatch(setText(""));
    e.preventDefault();
  };
  const handleSelect = (e) => {
    setSelected(e.target.value);
  };
  return (
    <div>
      <div className="HeaderBox">
        <select
          className="HeaderSelect"
          value={selected}
          onChange={handleSelect}
        >
          <option value="" defaultValue disabled hidden>
            기한
          </option>
          {selectList.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <input
          ref={inputRef}
          type={text}
          value={text}
          onChange={onChangeInput}
          onKeyDown={onEnterPress}
          className="HeaderInput"
          placeholder="버켓리스트를 입력하세요!"
        />
        <button onClick={onClickAddBtn} className="HeaderBtn">
          추가하기
        </button>
        <button onClick={onClickReset} className="HeaderBtn">
          리셋
        </button>
      </div>
      <Todo />
    </div>
  );
}

export default Main;
