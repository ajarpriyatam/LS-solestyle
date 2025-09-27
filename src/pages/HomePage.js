import React from "react";
import Layout from "../layouts/Layout";
import MainSection from "../component/MainSection";
import CollectionList from "../component/collections/CollectionList";
import Recommendation from "../component/recommendation/Recommendations";

const HomePage = () => {
  return (
    <Layout>
      <MainSection />
      <Recommendation />
      {/* <CollectionList /> */}
    </Layout>
  );
};

export default HomePage;
