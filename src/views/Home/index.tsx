import React, { useEffect, useState, useRef } from "react";
import style from "./home.module.scss";
import { Input, Button, Checkbox, message, Modal } from "antd";
import { nanoid } from "nanoid";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
interface toDo {
  id: string;
  title: string;
  isDone: boolean;
}
const { Search } = Input;
export default function Home() {
  const searchRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState("0");
  const [total, setTotal] = useState(0);
  const [doneCount, setDoneCount] = useState(0);
  const [searchVal, setSearchVal] = useState("")
  const [todos, setTodos] = useState([
    { id: nanoid(), title: "吃饭", isDone: false },
  ]);

  useEffect(() => {
    setTotal(todos.length);
    setDoneCount(todos.reduce((pre, todo) => pre + (todo.isDone ? 1 : 0), 0));
  }, [todos]);
  const inputChange = (e:any) => {
    setSearchVal(e.target.value)
    
  }
  const addTodo = (value: string) => {
    if (value.trim()) {
      const newTodo = [
        ...todos,
        { id: nanoid(), title: value.trim(), isDone: false },
      ];
      setTodos(newTodo);
      setSearchVal("")
    } else {
      message.warning("不能输入空格");
    }
  };
  const deleteTodo = (data: toDo) => {
    setIsModalOpen(true);
    setId(data.id);
  };
  const changeIsDone = (data: toDo) => {
    let jsonTodos = JSON.parse(JSON.stringify(todos));
    const newTodo = jsonTodos.map((item: toDo) => {
      if (item.id === data.id) {
        return { ...data, isDone: !item.isDone };
      } else {
        return item;
      }
    });
    setTodos(newTodo);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    let jsonTodos = JSON.parse(JSON.stringify(todos));
    const newTodo = jsonTodos.filter((item: toDo) => item.id !== id);
    setTodos(newTodo);
  };
  const changeAll = (e: CheckboxChangeEvent) => {
    console.log(e.target.checked);
    const newTodo = todos.map((item: toDo, index) => {
      return { ...item, isDone: e.target.checked };
    });
    setTodos(newTodo);
  };

  return (
    <div className={style.container}>
      <h2 className={style.title}>ToDoList</h2>
      {/* //搜索 */}
      <div>
        <Search
          ref={searchRef}
          placeholder="What need to be done？"
          enterButton="添加"
          size="large"
          onSearch={addTodo}
          value={searchVal}
          onChange={inputChange}
        />
      </div>
      <div className={style.list}>
        <ul>
          {todos?.map((item) => {
            return (
              <li
                key={item.id}
                style={{ textDecoration: item.isDone ? "line-through" : "" }}
              >
                <Checkbox
                  checked={item.isDone}
                  onChange={() => changeIsDone(item)}
                ></Checkbox>
                <span style={{ marginLeft: "10px" }}>{item.title}</span>&nbsp;
                <Button
                  size="small"
                  type="primary"
                  danger
                  onClick={() => deleteTodo(item)}
                  className={style.btn}
                >
                  删除
                </Button>
              </li>
            );
          })}
        </ul>
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} cancelText="取消" okText="确定" width={350}>
          确定要删除吗？
        </Modal>
      </div>
      <div className={style.bottom}>
        <Checkbox
          onChange={changeAll}
          checked={doneCount === total && total !== 0 ? true : false}
          style={{ marginRight: "10px" }}
        ></Checkbox>
        <span style={{ marginRight: "10px" }}>全选</span>
        <span>总共{total}</span>，<span>已完成{doneCount}</span>
      </div>
    </div>
  );
}
