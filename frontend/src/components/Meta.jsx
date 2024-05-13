import React from "react";
import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Shopp",
  description: "We sell the best products at low cost",
  keywords: "electronics, cheap electronics, best electronics products",
};

export default Meta;
