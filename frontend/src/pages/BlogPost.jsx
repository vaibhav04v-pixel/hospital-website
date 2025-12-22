import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import Button from '../components/Button/Button';
import './Blog.css'; // Reusing blog styles

const BlogPost = () => {
    const { id } = useParams();
    const post = blogPosts.find(p => p.id === parseInt(id));

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    return (
        <div className="blog-post-page" style={{ paddingBottom: '4rem' }}>
            <div className="page-header">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-blue)', textDecoration: 'none', marginBottom: '1rem' }}>
                            <ArrowLeft size={20} /> Back to Blog
                        </Link>
                        <h1>{post.title}</h1>
                        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', flexWrap: 'wrap', color: '#666' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={18} /> {post.date}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><User size={18} /> {post.author}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Tag size={18} /> {post.category}</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="container page-content">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="blog-content-wrapper"
                    style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
                >
                    <div className="blog-hero-image" style={{ height: '400px', width: '100%' }}>
                        <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    <div className="article-content" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8', fontSize: '1.1rem', color: '#333' }}>
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </div>

                    <div style={{ padding: '2rem 3rem', background: '#f8f9fa', borderTop: '1px solid #eee', textAlign: 'center' }}>
                        <h3>Enjoyed this article?</h3>
                        <p style={{ marginBottom: '1.5rem', color: '#666' }}>Share it with your friends or subscribe to our newsletter for more.</p>
                        <Button variant="primary" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
                            Subscribe to Newsletter
                        </Button>
                    </div>
                </motion.div>
            </div>

            {/* Newsletter Section Reused */}
            <div className="newsletter-section" style={{ marginTop: '4rem', background: '#f8f9fa', padding: '4rem 0' }}>
                <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
                    <h2 style={{ marginBottom: '1rem', color: '#1a1a1a' }}>Stay Updated with Health Tips</h2>
                    <p style={{ marginBottom: '2rem', color: '#666' }}>
                        Subscribe to our newsletter to receive the latest medical insights, seasonal care tips, and hospital news directly in your inbox.
                    </p>
                    <div className="newsletter-form" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            style={{
                                flex: 1,
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                minWidth: '250px'
                            }}
                        />
                        <Button variant="primary" onClick={() => alert('Subscribed!')}>Subscribe</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
