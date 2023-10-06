import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import MainLayout from "./Components/MainLayout"
import { lazy, Suspense } from "react"
import Loader from "./Components/Loader";
import './App.css'
import Header from "./Components/Header";
import Register from "./Components/Register";
import Translate from "./Components/Translate";
import PrivateRoute from "./Routing/PrivateRoute";
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
        minHeight: "100vh",
      }}
    >
      <Router>
        <Header />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route
                path="learning"
                element={
                  <PrivateRoute>
                    <Learning />
                  </PrivateRoute>
                }
              />
              <Route
                path="quiz"
                element={
                  <PrivateRoute>
                    <Quiz />
                  </PrivateRoute>
                }
              />
              <Route
                path="result"
                element={
                  <PrivateRoute>
                    <Result />
                  </PrivateRoute>
                }
              />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route
                path="translate"
                element={
                  <PrivateRoute>
                    <Translate />
                  </PrivateRoute>
                }
              />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App