import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebars from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard/index";
import Team from "./scenes/Author/AuthorData";
import Users from './scenes/Users/Users'
import Form from "./scenes/Form/Form";
import Loginform from "./Login/Login";
import AddAuthor2 from "./scenes/Author/AddAuthor2";
import Post from "./Post/Post";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import EditAuth from "./scenes/Author/EditAuth";
import Comment from "./scenes/Comment/Comment";
import Registration from "./Login/Registration";
import Editpost from "./Post/Editpost";
import Addpost from "./Post/Addpost";
import Addcomment from "./scenes/Comment/Addcomment";
import EditComment from "./scenes/Comment/EditComment";
import Category from "./scenes/Category/Category";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebars />
          <main className="content">
            <Topbar/>
            <Routes>
            <Route path="/Loginform" element={<Loginform/>}></Route>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/users" element={<Users />} />
              <Route path="/AddAuthor2" element={<AddAuthor2/>}></Route>
              <Route path="/form" element={<Form />} />
              <Route path="/EditAuth/:id" element={<EditAuth/>}></Route>
                 <Route path="/post" element={<Post/>}></Route>
         <Route path="/Comment" element={<Comment/>}></Route>
         <Route path="/Registration" element={<Registration/>}></Route>
         <Route path="/Editpost/:id" element={<Editpost/>}></Route>
         <Route path="/Addpost" element={<Addpost/>}></Route>
          <Route path="/Addcomment"  element={<Addcomment/>}></Route>
            <Route path="/EditComment/:id" element={<EditComment/>}></Route>
            <Route path="/Category" element={<Category/>}></Route>

            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
