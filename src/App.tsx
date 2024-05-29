import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import CategoryCreate from "./features/categories/pages/CategoryCreate/CategoryCreate";
import { CategoryEdit } from "./features/categories/pages/CategoryEdit/CategoryEdit";
import { CategoryList } from "./features/categories/pages/CategoryList/CategoryList";
import { CastMemberList } from "./features/cast-member/pages/CastMemberList/CastMemberList";
import { CastMemberCreate } from "./features/cast-member/pages/CastMemberCreate/CastMemberCreate";
import { CastMemberEdit } from "./features/cast-member/pages/CastMemberEdit/CastMemberEdit";
import { GenreCreate } from "./features/genre/pages/GenreCreate/GenreCreate";
import { GenreEdit } from "./features/genre/pages/GenreEdit/GenreEdit";
import { GenreList } from "./features/genre/pages/GenreList/GenreList";
import { VideosList } from "./features/videos/pages/VideosList/VideosList";
import { VideosCreate } from "./features/videos/pages/VideosCreate/VideosCreate";
import { VideosEdit } from "./features/videos/pages/VideosEdit/VideosEdit";
import { UploadList } from "./features/uploads/components/UploadList/UploadList";

function App() {
  return (
    <Layout>
      <UploadList />
      <Routes>
        <Route path="/" element={<CategoryList />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/categories/create" element={<CategoryCreate />} />
        <Route path="/categories/edit/:id" element={<CategoryEdit />} />

        <Route path="/cast-members" element={<CastMemberList />} />
        <Route path="/cast-members/create" element={<CastMemberCreate />} />
        <Route path="/cast-members/edit/:id" element={<CastMemberEdit />} />

        <Route path="/genres/create" element={<GenreCreate />} />
        <Route path="/genres/edit" element={<GenreEdit />} />
        <Route path="/genres" element={<GenreList />} />

        <Route path="/videos" element={<VideosList />} />
        <Route path="/videos/create" element={<VideosCreate />} />
        <Route path="/videos/edit/:id" element={<VideosEdit />} />

        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </Layout>
  );
}

export default App;
