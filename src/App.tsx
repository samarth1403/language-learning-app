import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import MainLayout from "./Components/MainLayout"
import { lazy, Suspense } from "react"
import Loader from "./Components/Loader";
import './App.css'
import Header from "./Components/Header";
import Register from "./Components/Register";

const Home = lazy(() => import("./Components/Home"));
const Learning = lazy(() => import("./Components/Learning"));
const Quiz = lazy(() => import("./Components/Quiz"));
const Result = lazy(() => import("./Components/Result"));
const Login = lazy(() => import("./Components/Login"));


const App = () => {
  return (
    <div
      style={{
        backgroundColor: "#E1C6FC",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Router>
        <Header/>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="learning" element={<Learning />} />
              <Route path="quiz" element={<Quiz />} />
              <Route path="result" element={<Result />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register/>}/>
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App