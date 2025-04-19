import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ClipLoader } from 'react-spinners';
import './FlashbackPage.css';

function FlashbackPage() {
  const { selectedYear } = useParams();
  const navigate = useNavigate();

  const [yearData, setYearData] = useState(null);
  const [books, setBooks] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

   
  const NEWS_API_KEY = 'pub_816053ffa259fab4f3046f61f5a96b9bbdae7';

  useEffect(() => {
    async function fetchData() {
      try {
       
        const wikipediaResponse = await axios.get(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${selectedYear}`
        );
        setYearData(wikipediaResponse.data);

         const booksResponse = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${selectedYear}`
        );
        setBooks(booksResponse.data.items || []);

         const newsResponse = await axios.get(
          `https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&q=India%20${selectedYear}&country=in&language=en`
        );
        setNews(newsResponse.data.results || []);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, [selectedYear]);

  if (loading) {
    return (
      <div className="loading-container">
        <ClipLoader color="#4a3f35" loading={loading} size={50} />
      </div>
    );
  }

  if (!yearData) {
    return <div>No data available for this year.</div>;
  }

  return (
    <div className="flashback-container">
      <button className="back-btn" onClick={() => navigate('/')}>⬅️ Back</button>
      <h2 className="year-title">🔎 Flashback to {selectedYear}</h2>

      <div className="flashback-cards">
        <motion.div 
          className="card"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="card-title">📖 Year Summary</h3>
          <p>{yearData.extract}</p>
        </motion.div>

        <motion.div 
          className="card"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="card-title">📚 Books</h3>
          {books.length > 0 ? (
            <ul className="card-content">
              {books.slice(0, 5).map((book, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">
                    {book.volumeInfo.title} by {book.volumeInfo.authors?.join(', ')}
                  </a>
                </motion.li>
              ))}
            </ul>
          ) : (
            <p>No books found for this year.</p>
          )}
        </motion.div>

        <motion.div 
          className="card"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="card-title">📰 News (India)</h3>
          {news.length > 0 ? (
            <ul className="card-content">
              {news.map((article, index) => (
                <motion.li
                  key={index}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    {article.title}
                  </a>
                </motion.li>
              ))}
            </ul>
          ) : (
            <p>No Indian news found for this year.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default FlashbackPage;
