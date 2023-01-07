import { useEffect, useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [days, setDays] = useState(0);
  const [newTask,setNewTask]=useState("");
  const [list, setList] = useState([]);

  useEffect(()=>{
    Axios.get("http://localhost:3001/read").then((response)=>{
      setList(response.data); 
      //console.log(list)
    });
  },[])

  const addToList = () => {
    Axios.post("http://localhost:3001/insert", { Task: task, Time: days });
  };

  const updateTask =(id)=>{
    Axios.put("http://localhost:3001/update",{
    id:id,
    newTask:newTask
  });
  };

  const deleteTask =(id)=>{
    Axios.delete(`http://localhost:3001/delete/${id}`,{
    id:id,
  });
  };

  return (
    <form name="AddEve" className="bg-[#f0f2f5] h-max py-[5rem]">
      <div className=" w-[1000px] flex-grow rounded-lg bg-white shadow-black shadow-2xl m-auto pt-[3rem]">
      <div className="text-black font-bold text-4xl text-center pb-[3rem]">TO DO LIST</div>
      <div className="flex flex-row justify-around items-center text-2xl">
      <div className="flex flex-col ">
      <div className="mb-6 m-auto font-bold text-black text-2xl">Task To Be Done</div>
      <input
      className="border-2 border-black p-1 rounded-md"
        type="text"
        placeholder="Enter Task..."
        onChange={(event) => {
          setTask(event.target.value);
        }}
      />
      </div>
      <div className="flex flex-col ">
      <div className="mb-6 m-auto text-black font-bold text-2xl">Days To complete</div>
      <input
      className="border-2 border-black p-1 rounded-md"
        type="number"
        placeholder="Number of Days"
        onChange={(event) => {
          setDays(event.target.value);
        }}
      />
      </div>
      </div>
      <button onClick={addToList} className="w-[8rem] mx-[27rem] mt-[2rem] bg-[#e13232] text-white rounded-md p-2 border hover:font-bold hover:scale-105 shadow-md hover:shadow-black">Add to List</button>
      <div className="mx-auto container py-20 px-20">
      <div className="grid grid-cols-2 gap-10">
      {list.map((val,key)=>{
        return <div className="w-full h-64 flex flex-col justify-between bg-[#24d4e0] border-gray-700 rounded-lg border hover:bg-[#14c4d1] hover:scale-105  mb-6 py-5 px-4">
          <div className=" text-black font-bold text-2xl text-center mb-3">{val.Task}</div>
          <div className=" text-black font-bold text-2xl text-center ">Days Remaining: {val.Time}</div>
          <input type="text" 
          className="border-2 border-black p-1 m-auto rounded-md w-[70%]"
          placeholder="Edit Task..."
          onChange={(event) => {
            setNewTask(event.target.value);
          }}/>
          <div className="flex flex-row">
          <button onClick={()=>updateTask(val._id)} className="w-[5rem] m-auto bg-[#e13232] text-white rounded-md p-2 border hover:font-bold hover:scale-105 shadow-md hover:shadow-black">Update</button>
          <button onClick={()=>deleteTask(val._id)} className="w-[4rem] m-auto bg-[#e13232] text-white rounded-md p-2 border hover:font-bold hover:scale-105 shadow-md hover:shadow-black">Delete</button>
        </div>
        </div>
      })}  
      </div>
      </div>
      </div>
    </form>
  );
}

export default App;
