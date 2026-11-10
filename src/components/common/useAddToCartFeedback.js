// libs
import { useCallback, useEffect, useRef, useState } from "react";

// Keeps the two ProductPage action bars synchronized without a cart backend.
export default function useAddToCartFeedback() {
  const [addedToCart, setAddedToCart] = useState(false);
  const timerRef = useRef(null);

  const handleAddToCart = useCallback(() => {
    setAddedToCart(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setAddedToCart(false), 2000);
  }, []);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const resetFeedback = useCallback(() => {
    clearTimeout(timerRef.current);
    setAddedToCart(false);
  }, []);

  return { addedToCart, handleAddToCart, resetFeedback };
}
