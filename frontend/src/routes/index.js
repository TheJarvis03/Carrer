import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import RegisterPage from '../pages/register';
import UserAccountPage from '../pages/account';
import SearchSchoolsPage from '../pages/search-schools';
import SearchMajorsPage from '../pages/search-majors';
import SearchScoresPage from '../pages/search-scores';
import SearchCareersPage from '../pages/search-careers';
import SchoolDetailPage from '../pages/school-detail';
import CareerDetailPage from '../pages/career-detail';
import GeneralSearchPage from '../pages/general-search';
import NewsPage from '../pages/news';
import MajorDetailPage from '../pages/major-detail';
import ArticleDetailPage from '../pages/article-detail';

// Define route groups
const searchRoutes = [
    { path: '/search', element: <GeneralSearchPage /> },
    { path: '/search/schools', element: <SearchSchoolsPage /> },
    { path: '/search/majors', element: <SearchMajorsPage /> },
    { path: '/search/careers', element: <SearchCareersPage /> },
    { path: '/search/scores', element: <SearchScoresPage /> },
];

const detailRoutes = [
    { path: '/school/:id', element: <SchoolDetailPage /> },
    { path: '/major/:id', element: <MajorDetailPage /> },
    { path: '/career/:id', element: <CareerDetailPage /> },
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
const privateRoutes = [{ path: '/account', element: <UserAccountPage /> }];

export { publicRoutes, privateRoutes };
