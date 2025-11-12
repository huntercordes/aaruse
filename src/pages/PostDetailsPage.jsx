import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { Icon } from "@iconify/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "../styles/PostDetailsPage.module.css";

export default function PostDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  //  All state hooks at the top
  const [post, setPost] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);

  //  Fetch the post when component loads
  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();
      if (error) console.error("❌ Error fetching post:", error.message);
      else setPost(data);
    };
    fetchPost();
  }, [id]);

  //  Check if current post is a favourite
  useEffect(() => {
    checkIfFavourite();
  }, [id]);

  const checkIfFavourite = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("favourites")
      .select("*")
      .eq("user_id", user.id)
      .eq("post_id", Number(id))
      .maybeSingle();

    setIsFavourite(!!data);
  };

  const handleToggleFavourite = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      alert("Please log in to save favourites.");
      return;
    }

    if (isFavourite) {
      await supabase
        .from("favourites")
        .delete()
        .eq("user_id", user.id)
        .eq("post_id", Number(id));
      setIsFavourite(false);
    } else {
      await supabase
        .from("favourites")
        .insert([{ user_id: user.id, post_id: Number(id) }]);
      setIsFavourite(true);
    }
  };

  const handleAddToBag = async () => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        alert("Please log in to add items to your bag.");
        return;
      }

      const numericId = Number(id);

      // Check if already in bag
      const { data: existing } = await supabase
        .from("shopping_bag")
        .select("*")
        .eq("user_id", user.id)
        .eq("post_id", numericId)
        .maybeSingle();

      if (existing) {
        alert("This item is already in your bag.");
        return;
      }

      // Insert into shopping_bag table
      const { error } = await supabase.from("shopping_bag").insert([
        {
          user_id: user.id,
          post_id: numericId,
        },
      ]);

      if (error) throw error;
      alert("✅ Added to your shopping bag!");
    } catch (err) {
      console.error("❌ Error adding to bag:", err.message);
      alert("Failed to add item to bag. Try again.");
    }
  };

  //  Conditional render comes AFTER all hooks
  if (!post) return <div className={styles.loading}>Loading...</div>;

  const images = post.image_urls || (post.image_url ? [post.image_url] : []);

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.topBar}>
        <Icon
          icon="proicons:arrow-left"
          className={styles.backIcon}
          onClick={() => navigate(-1)}
        />
        <span className={styles.more}>More Details</span>
        <Icon
          icon={isFavourite ? "ph:heart-fill" : "ph:heart-light"}
          className={`${styles.heartIcon} ${
            isFavourite ? styles.activeHeart : ""
          }`}
          onClick={handleToggleFavourite}
        />
      </div>

      {/* Info */}
      <h2 className={styles.title}>{post.title}</h2>
      <div className={styles.detailsRow}>
        <div>
          <p className={styles.label}>Price</p>
          <p className={styles.value}>
            {post.is_free ? "Free" : `${post.price} DKK`}
          </p>
        </div>
        <div>
          <p className={styles.label}>Condition</p>
          <p className={styles.value}>{post.condition || "Unknown"}</p>
        </div>
        <div>
          <p className={styles.label}>Location</p>
          <p className={styles.value}>{post.location_details || "N/A"}</p>
        </div>
      </div>

      {/* Image carousel */}
      <div className={styles.carouselContainer}>
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true }}>
          {images.length > 0 ? (
            images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`${post.title} ${index + 1}`}
                  className={styles.image}
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className={styles.placeholder}></div>
            </SwiperSlide>
          )}
        </Swiper>
      </div>

      {/* About product */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>About the product</h3>
        <div className={styles.detailRow}>
          <span className={styles.label}>Brand</span>
          <span className={styles.value}>{post.brand || "Unknown"}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Description</span>
          <span className={styles.value}>{post.description}</span>
        </div>
      </div>

      {/* Availability */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Availability</h3>
        <p className={styles.availability}>Marked as available yesterday</p>
      </div>

      {/* Buttons */}
      <div className={styles.buttonRow}>
        <button className={styles.contactBtn}>Contact Seller</button>
        <button className={styles.addBtn} onClick={handleAddToBag}>
          Add to bag
        </button>
      </div>
    </div>
  );
}
