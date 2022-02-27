import React from "react";
import styles from "./Home.module.css";
import Banner from "../../images/amazon-banner.jpg";
import Product from "../Product/Product";
import HarryPotterBook from "../../images/Harry Potter Book.jpeg";
import Camera from "../../images/Camera.jpeg";
import Huggies from "../../images/Huggies.jpg";
import Printer from "../../images/3dPrinter.jpg";
import Macbook from "../../images/macbook.jpg";
import Knives from "../../images/knives.jpg";

const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.homeContainer}>
        <img src={Banner} alt="Banner" className={styles.bannerImg} />
        <div className={styles.homeRow}>
          <Product
            title="Wyze Cam Spotlight, Wyze Cam v3 Security Camera with Spotlight Kit, 1080p HD Security Camera with Two-Way Audio and Siren, IP65 Weatherproof, Compatible with Alexa and Google Assistant"
            price={49.96}
            rating={4}
            image={Camera}
          />
        </div>
        <div className={styles.homeRow}>
          <Product
            title="Baby Diapers Size 5, 120 Ct, Huggies Little Snugglers"
            price={52.99}
            rating={5}
            image={Huggies}
          />
          <Product
            title="Harry Potter And The Sorcerers Stone"
            price={10.99}
            rating={5}
            image={HarryPotterBook}
          />
          <Product
            title="Mini 3D Printer for Kids with Removable Magnetic Build Plate 1.75mm Free Test PLA Filament DIY 3D Printers Printing Size 100x100x100mm"
            price={109.99}
            rating={3}
            image={Printer}
          />
        </div>
        <div className={styles.homeRow}>
          <Product
            title="2020 Apple MacBook Pro with Apple M1 Chip (13-inch, 8GB RAM, 256GB SSD Storage) - Space Gray"
            price={1289.99}
            rating={5}
            image={Macbook}
          />
          <Product
            title="Amazon Basics 14-Piece Kitchen Knife Block Set, High-Carbon Stainless Steel Blades with Pine Wood Knife Block"
            price={23.57}
            rating={4}
            image={Knives}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
