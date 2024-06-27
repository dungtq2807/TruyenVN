import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { useAuth } from "./components/Auth/AuthContext";
import { useEffect } from "react"; // Thêm useEffect để lấy role từ localStorage
import HomePage from "./components/Page/HomePage";
import LayOutHome from "./components/LayOut/LayOutHomePage";
import LayOutAdmin from "./components/LayOut/LayOutAdmin";
import ProductList from "./components/Admin/Product/ProductList";
import ProductAdd from "./components/Admin/Product/ProductAdd";
import ProductEdit from "./components/Admin/Product/ProductEdit";
import CategoryList from "./components/Admin/Category/CategoryList";
import CategoryAdd from "./components/Admin/Category/CategoryAdd";
import CategoryEdit from "./components/Admin/Category/CategoryEdit";
import ChapterList from "./components/Admin/Chapter/ChapterList";
import ChapterAdd from "./components/Admin/Chapter/ChapterAdd";
import ChapterEdit from "./components/Admin/Chapter/ChapterEdit";
import ProductWithCategory from "./components/Admin/Product/ProductWithCategory";
import ProductUpdateCategory from "./components/Admin/Product/ProductUpdateCategory";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import Test from "./test";
import NotFound from "./components/Page/NotFound/NotFound";
import UserPage from "./components/Page/UserProfile/UserPage";

import ChangePassword from "./components/Page/UserProfile/ChangePassword";
import UserEdit from "./components/Page/UserProfile/UserEdit";
import ListUploadImage from "./components/Admin/Content/ListUploadImage";
import AddUploadImage from "./components/Admin/Content/AddUploadImage";
import EditUploadImage from "./components/Admin/Content/EditUploadImage";
import StoryDetailPage from "./components/Page/StoryDetailPage/StoryDetailPage";
import AllComic from "./components/Page/Product/AllComic";
import ComicReadPage from "./components/Page/Comic/ComicReadPage";
import ListFollowComic from "./components/Admin/FollowComic/ListFollowComic";
import History from "./components/Page/History/History";
import FollowComic from "./components/Page/History/ListFollowComic";
import ListComments from "./components/Admin/Comments/ListComments";
import EditComments from "./components/Admin/Comments/EditComments";
import Comments from "./components/Admin/Comments";
import ProductChapter from "./components/Admin/Chapter";


function App() {
  const { isLoggedIn, role, updateRole } = useAuth(); // Lấy trạng thái đăng nhập, vai trò và hàm cập nhật vai trò từ AuthContext

  useEffect(() => {
    // Lấy role từ localStorage khi component được render
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      updateRole(storedRole); // Cập nhật vai trò từ localStorage
    }
  }, [updateRole]);

  return (
    <>
      <Toaster
        richColors
        position="top-right"
        duration={2000}
        visibleToasts={3}
        expand={true}
      />
      <Routes>
        {/* Route cho trang chủ */}
        <Route path="/" element={<LayOutHome />}>
          <Route index element={<HomePage />} />
          <Route path="test/:id" element={<Test />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
            <Route path="profile" element={<UserPage />}>
              <Route path="edit/:id" element={<UserEdit />} />
              <Route path="changepassword" element={<ChangePassword />} />
              <Route path="history" element={<History />} />
              <Route path="follow" element={<FollowComic />} />
            </Route>
            <Route path="detail/:id" element={<StoryDetailPage />} />
            <Route path="all-comic" element={<AllComic />} />
            <Route path="all-comic/:id" element={<AllComic />} />
            <Route path="chapter/:id" element={<ComicReadPage />} />

        </Route>

        {/* Route cho trang admin */}
        <Route
          path="/admin"
          element={
            isLoggedIn && role === "ADMIN" ? (
              <LayOutAdmin />
            ) : (
              <Navigate to="/signin" />
            )
          }
        >
          <Route path="product">
            <Route index element={<ProductList />} />
            <Route path="add" element={<ProductAdd />} />
            <Route path="edit/:id" element={<ProductEdit />} />
            <Route path="addCate" element={<ProductWithCategory />} />
            <Route path="updateCate/:id" element={<ProductUpdateCategory />} />
          </Route>
          <Route path="category">
            <Route index element={<CategoryList />} />
            <Route path="add" element={<CategoryAdd />} />
            <Route path="edit/:id" element={<CategoryEdit />} />
          </Route>
          <Route path="chapter">
          <Route index element={<ProductChapter />} />
            <Route path=":id" element={<ChapterList />} />
            <Route path="add" element={<ChapterAdd />} />
            <Route path="edit/:id" element={<ChapterEdit />} />
          </Route>
          <Route path="image">
            <Route path=":id" element={<ListUploadImage />} />
            <Route path="add/:id" element={<AddUploadImage />} />
            <Route path="edit/:id" element={<EditUploadImage />} />
          </Route>
          <Route path="follow">
          <Route index element={<ListFollowComic />} />
        </Route>
        <Route path="comments">
        <Route index element={<Comments />} />
        <Route path=":id" element={<ListComments />} />
        <Route path="add/:id" element={<AddUploadImage />} />
        <Route path="edit/:id" element={<EditComments/>} />
      </Route>
        </Route>

        {/* Route cho UserProfile */}

        {/* Điều hướng mặc định */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
