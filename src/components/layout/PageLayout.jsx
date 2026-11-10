// components
import Header from "../Header";
import Footer from "../Footer";

export default function PageLayout({ children = null }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
