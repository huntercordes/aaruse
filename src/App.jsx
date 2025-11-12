import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";
import PostPage from "./pages/PostPage";
import PostDetailsPage from "./pages/PostDetailsPage";
import FavouritesPage from "./pages/FavouritesPage";
import { HomeProvider } from "./context/HomeContext";
import PostTypePage from "./pages/PostTypePage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import PostSuccessPage from "./pages/PostSuccessPage";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/" />;
  return children;
}

function App() {
  return (
    <BrowserRouter
      basename={import.meta.env.MODE === "production" ? "/aaruse" : "/"}>
      <HomeProvider>
        <Navbar />
        <Routes>
          <Route path="/aaruse" element={<Navigate to="/" replace />} />

          <Route path="/" element={<LoginPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/posttype"
            element={
              <ProtectedRoute>
                <PostTypePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/post/give"
            element={
              <ProtectedRoute>
                <PostPage type="give" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post/sell"
            element={
              <ProtectedRoute>
                <PostPage type="sell" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post/success/:type"
            element={
              <ProtectedRoute>
                <PostSuccessPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favourites"
            element={
              <ProtectedRoute>
                <FavouritesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/post/:id"
            element={
              <ProtectedRoute>
                <PostDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </HomeProvider>
    </BrowserRouter>
  );
}

export default App;
