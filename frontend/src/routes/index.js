import HomePage from '../pages/home';
import LoginPage from '../pages/auth/login';
import RegisterPage from '../pages/auth/register';
import UserAccountPage from '../pages/auth/account';
// Search pages
import SearchSchoolsPage from '../pages/search/search-schools';
import SearchMajorsPage from '../pages/search/search-majors';
import SearchScoresPage from '../pages/search/search-scores';
import SearchCareersPage from '../pages/search/search-careers';
// Detail pages
import SchoolDetailPage from '../pages/detail/school-detail';
import CareerDetailPage from '../pages/detail/career-detail';
import MajorDetailPage from '../pages/detail/major-detail';
// News pages
import NewsPage from '../pages/news';
import ArticleDetailPage from '../pages/detail/article-detail';
// Admin pages
import AdminDashboardPage from '../pages/admin/dashboard';
import AdminUserPage from '../pages/admin/users';
import AdminSchoolPage from '../pages/admin/schools';
import AdminMajorPage from '../pages/admin/majors';
import AdminCareerPage from '../pages/admin/career';
import AdminNewsPage from '../pages/admin/news';
import ProtectedRoute from '../components/ProtectedRoute';

// Define route groups
const searchRoutes = [
    { path: '/search/schools', element: <SearchSchoolsPage /> },
    { path: '/search/majors', element: <SearchMajorsPage /> },
    { path: '/search/careers', element: <SearchCareersPage /> },
    { path: '/search/scores', element: <SearchScoresPage /> },
];

const detailRoutes = [
    { path: '/school/detail/:code', element: <SchoolDetailPage /> },
    { path: '/major/detail/:code', element: <MajorDetailPage /> },
    { path: '/career/detail/:id', element: <CareerDetailPage /> },
];

const newsRoutes = [
    { path: '/news', element: <NewsPage /> },
    { path: '/article/:id', element: <ArticleDetailPage /> },
    { path: '/news/:slug', element: <ArticleDetailPage /> },
];

const authRoutes = [
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
];

// Public routes that don't require authentication
const publicRoutes = [
    { path: '/', element: <HomePage /> },
    ...authRoutes,
    ...searchRoutes,
    ...detailRoutes,
    ...newsRoutes,
];

// Private routes that require authentication
const privateRoutes = [
    {
        path: '/account',
        element: (
            <ProtectedRoute
                element={<UserAccountPage />}
                requireAdmin={false}
            />
        ),
    },
    {
        path: '/admin/dashboard',
        element: (
            <ProtectedRoute
                element={<AdminDashboardPage />}
                requireAdmin={true}
            />
        ),
    },
    {
        path: '/admin/users',
        element: (
            <ProtectedRoute element={<AdminUserPage />} requireAdmin={true} />
        ),
    },
    {
        path: '/admin/schools',
        element: (
            <ProtectedRoute element={<AdminSchoolPage />} requireAdmin={true} />
        ),
    },
    {
        path: '/admin/majors',
        element: (
            <ProtectedRoute element={<AdminMajorPage />} requireAdmin={true} />
        ),
    },
    {
        path: '/admin/careers',
        element: (
            <ProtectedRoute element={<AdminCareerPage />} requireAdmin={true} />
        ),
    },
    {
        path: '/admin/news',
        element: (
            <ProtectedRoute element={<AdminNewsPage />} requireAdmin={true} />
        ),
    },
];

export { publicRoutes, privateRoutes };
