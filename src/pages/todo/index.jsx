import { TextField } from "@mui/material";
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { Delete } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

const TodoIndex = () => {

    const [todoText, setTodoText] = useState('');
    const [allTodos, setAllTodos] = useState([]);
    const [refreshData, setRefreshData] = useState(false);

    useEffect(() => {
        getData()
    }, [refreshData])

    const AddTodo = async () => {
        if (todoText !== '') {
            const docRef = await addDoc(collection(db, "Todos"), {
                todo: todoText
            });
            setTodoText('');
            setRefreshData(!refreshData);
        }
    }


    const getData = async () => {
        const arr = [];
        const querySnapshot = await getDocs(collection(db, "Todos"));
        querySnapshot.forEach((doc) => {
            arr.push({
                ...doc.data(),
                id: doc.id,
            });
        });
        setAllTodos([...arr]);
    }

    const deleteTodo = async (id) => {
        await deleteDoc(doc(db, "Todos", id));
        setRefreshData(!refreshData);
    }

    const editTodo = async (id, val) => {
        const editValue = prompt("Enter Todo");
        const editObj = {
            todo: editValue,
        };
        await updateDoc(doc(db, "Todos", id), editObj);
        setRefreshData(!refreshData);
    }

    return <>
        <div style={{ marginTop: '20px' }}>
            <h3>Todo App</h3>
            <div style={{ width: '500px' }}>
                <TextField onChange={(e) => setTodoText(e.target.value)} value={todoText} style={{ width: '80%' }} id="outlined-basic" label="Todo" variant="outlined" />
                <Fab onClick={AddTodo} sx={{ marginLeft: '10px' }} color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </div>
        </div>
        <div style={{ marginTop: '20px' }}>
            <h3>All Todos</h3>
            <div style={{ width: '500px' }}>
                {
                    allTodos.map((e, i) => {
                        return (
                            <div key={i} style={{ display: "flex", alignItems: "center" }}>
                                <TextField value={e.todo} disabled style={{ width: '80%', marginTop: '10px' }} id="outlined-basic" label="Text" variant="outlined" />
                                <Fab size="small" onClick={() => deleteTodo(e.id)} sx={{ marginLeft: '10px' }} aria-label="add">
                                    <Delete sx={{ height: '20px' }} />
                                </Fab>
                                <Fab sx={{ marginLeft: '10px' }} onClick={() => editTodo(e.id, e.todo)} size="small" color="secondary" aria-label="edit">
                                    <EditIcon sx={{ height: '20px' }} />
                                </Fab>
                            </div>
                        );

                    })
                }

            </div>
        </div>
    </>
}
export default TodoIndex;