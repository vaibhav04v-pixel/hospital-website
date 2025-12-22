import { motion } from 'framer-motion';
import './Card.css';

const Card = ({ 
  children, 
  className = '', 
  hover = true,
  onClick,
  animate = true 
}) => {
  const cardClasses = `card ${hover ? 'card-hover' : ''} ${className}`;

  if (animate) {
    return (
      <motion.div
        className={cardClasses}
        onClick={onClick}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : {}}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={cardClasses} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
