import { Route, Routes } from "react-router-dom";
import TodoIndex from "../pages/todo";


const ConfigRoutes = () => {
    return <>
        <Routes>
            <Route index element={<TodoIndex />} />
        </Routes>
    </>

}

export default ConfigRoutes;