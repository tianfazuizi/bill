import { createBrowserRouter } from "react-router-dom";
import Layout from "../pags/Layout";
import New from "../pags/New";
import Month from "../pags/Month";
import Year from "../pags/Year";
import NotFound from "../pags/NotFound";

const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        index:true,
        // path:'/month',
        element:<Month/>
      },
      {
        path:'/year',
        element:<Year/>
      }
    ]
  },
  {
    path:'/new',
    element:<New/>
  },
  {
    path:'*',
    element:<NotFound/>
  }
])

export default router