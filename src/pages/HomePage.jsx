// libs

import { useEffect, useState } from "react";

// components
import PageLayout from "../components/layout/PageLayout";
import HeroSection from "../components/home/HeroSection";
import CategorySection from "../components/home/CategorySection";
import DiscoverSection from "../components/home/DiscoverSection";
import FeaturedStoresSection from "../components/home/FeaturedStoresSection";

// css
import "./Homepage.css";

// api
import axiosInstance from "../api/axiosInstance";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [allStores, setAllStores] = useState([]);
  const [categories, setCategory] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get("/products?limit=0");

        const fetchedData = response.data.products;

        const shuffledData = [...fetchedData].sort(() => Math.random() - 0.5);

        setProducts(shuffledData);

        const stores = [
          ...new Set(shuffledData.map((product) => product.brand)),
        ];
        setAllStores(stores);

        const allCategory = [
          ...new Set(shuffledData.map((product) => product.category)),
        ];

        setCategory(allCategory);

      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, []);

  return (
    <>
      <title>Homepage</title>
      <PageLayout>
        <HeroSection />
        <CategorySection categories={categories} />
        <DiscoverSection products={products} />
        <FeaturedStoresSection allStores={allStores} />
      </PageLayout>
    </>
  );
}

export default HomePage;
