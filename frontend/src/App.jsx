import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/navigation';
import Footer from './components/footer';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import UserAccountPage from './pages/account';
import SearchSchoolsPage from './pages/search-schools';
import SearchMajorsPage from './pages/search-majors';
import SearchScoresPage from './pages/search-scores';
import SearchCareersPage from './pages/search-careers';
import SchoolDetailPage from './pages/school-detail';
import CareerDetailPage from './pages/career-detail';
import GeneralSearchPage from './pages/general-search';
import NewsPage from './pages/news';
import MajorDetailPage from './pages/major-detail';
import ArticleDetailPage from './pages/article-detail';
import { careerService } from './services/api';

function App() {
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await careerService.getAll();
        setCareers(response.data);
      } catch (error) {
        console.error('Error fetching careers:', error);
      }
    };

    fetchCareers();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <main className="main-wrapper">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account" element={<UserAccountPage />} />
            <Route path="/search" element={<GeneralSearchPage />} />
            <Route path="/search/schools" element={<SearchSchoolsPage />} />
            <Route path="/search/majors" element={<SearchMajorsPage />} />
            <Route path="/search/careers" element={<SearchCareersPage />} />
            <Route path="/search/scores" element={<SearchScoresPage />} />
            <Route path="/school/:id" element={<SchoolDetailPage />} />
            <Route path="/major/:id" element={<MajorDetailPage />} />
            <Route path="/career/:id" element={<CareerDetailPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/article/:id" element={<ArticleDetailPage />} />
            <Route path="/news/:slug" element={<ArticleDetailPage />} />
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
          <div>
            <h1>Career List</h1>
            {careers.map(career => (
              <div key={career._id}>
                <h2>{career.career_name}</h2>
                <p>{career.description}</p>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;